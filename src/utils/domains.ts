import {
  IRoleDefinitionV2,
  emptyAddress,
  NamespaceType,
  castToV2,
  ChainId,
  chainConfigs,
} from '..';
import {
  DomainHierarchy,
  DomainReader,
  DomainTransactionFactoryV2,
  ResolverContractType,
} from './domains-build.js';
import { BigNumber, providers } from 'ethers';
import { Methods } from '@ew-did-registry/did';
import { Signer } from 'ethers';
import { isValidDID } from './did';
import { namehash, labelhash } from './ens-hash';
import { ENSRegistry__factory } from '../../ethers/factories/ENSRegistry__factory';
import { DomainNotifier__factory } from '../../ethers/factories/DomainNotifier__factory';

const { JsonRpcProvider } = providers;

/**
 * @description - Checks that role issuers of all roles under `rootDomain` contains method-specific-id and adds it if missing
 * `signer` must own `rootDomain` on `targetChain`
 */
export const updateLegacyDomains = async ({
  rootDomain,
  signer,
  chainId,
  dryRun = true,
}: {
  rootDomain: string;
  signer: Signer;
  chainId: ChainId;
  dryRun?: boolean;
}) => {
  const {
    transactionFactory,
    chainName,
    provider,
    domainHierarchy,
    domainNotifier,
    domainReader,
    ensRegistry,
    ensResolverV2Address,
  } = await initDomains(signer, chainId);

  const updated: Record<string, unknown>[] = [];
  const update = async (domain: string) => {
    const domainHash = namehash(domain);

    let def;
    try {
      def = await domainReader.read({ node: domainHash });
    } catch (e) {
      // 'apps' and 'roles'
      console.log(`Unable to read ${domain}`, (<Error>e).message);
      if (
        !(
          domain.startsWith(NamespaceType.Application) ||
          domain.startsWith(NamespaceType.Role) ||
          domain.startsWith(NamespaceType.Organization)
        )
      ) {
        console.log(`deleting malformed ${domain}...`);
        await (
          await ensRegistry.setRecord(
            domainHash,
            emptyAddress,
            emptyAddress,
            BigNumber.from(0)
          )
        ).wait();
        return;
      }
    }

    // const resolver = await ensRegistry.resolver(domainHash);
    if (!dryRun /*&& resolver !== ensResolverV2Address*/) {
      await (
        await ensRegistry.setResolver(domainHash, ensResolverV2Address)
      ).wait();
      // migrate domain definition
      let updateDomainTx;
      if (def) {
        if (DomainReader.isRoleDefinition(def)) {
          // in some legacy roles issuer.issuerType = {}
          if (def.issuer?.did?.length) {
            def.issuer.issuerType = 'DID';
          } else if (def.issuer.roleName) {
            def.issuer.issuerType = 'ROLE';
          } else {
            throw new Error(`Unable to set issuer type of ${domain}`);
          }
          const {
            issuer: { did },
            version,
          } = def;
          const updatedDef: IRoleDefinitionV2 = castToV2({
            ...def,
            issuer: {
              ...def.issuer,
              did: did?.map((d) =>
                isValidDID(d)
                  ? d
                  : `did:${Methods.Erc1056}:${chainName}:${d
                      .split(':')
                      .slice(-1)}`
              ),
            },
            version: parseInt(version.toString(), 10),
          });
          updated.push({ domain, legacyDef: def, updatedDef });
          updateDomainTx = transactionFactory.newRole({
            domain,
            roleDefinition: updatedDef,
          });
        } else {
          updateDomainTx = transactionFactory.newDomain({
            domain,
            domainDefinition: def,
          });
        }
        await (
          await signer.connect(provider).sendTransaction(updateDomainTx)
        ).wait();
      }
    }
    if (!dryRun) {
      await (
        await signer
          .connect(provider)
          .sendTransaction(transactionFactory.setDomainNameTx({ domain }))
      ).wait();
      console.log(`set name ${await domainReader.readName(domainHash)}`);
    }

    const subnodes = await domainHierarchy.getSubdomainsUsingResolver({
      domain,
      mode: 'FIRSTLEVEL',
    });
    if (def) {
      if (
        DomainReader.isOrgDefinition(def) ||
        DomainReader.isAppDefinition(def)
      ) {
        subnodes.push(`roles.${domain}`);
      }
      if (DomainReader.isOrgDefinition(def)) {
        subnodes.push(`apps.${domain}`);
      }
    }
    console.log(`subnodes of ${domain} are`, subnodes);
    for await (const nodeName of subnodes) {
      console.group();
      const label = nodeName.split('.')[0];
      const labelHash = labelhash(label);
      const nodeHash = namehash(nodeName);
      const owner = await ensRegistry.owner(nodeHash);
      if (!dryRun) {
        await (
          await ensRegistry.setSubnodeOwner(
            domainHash,
            labelHash,
            await signer.getAddress()
          )
        ).wait();
      }
      await update(nodeName);
      if (!dryRun) {
        await (
          await ensRegistry.setSubnodeOwner(domainHash, labelHash, owner)
        ).wait();
      }
      console.groupEnd();
    }
    await (await domainNotifier.domainUpdated(domainHash)).wait();
  };

  await update(rootDomain);
  return updated;
};

export const transferDomain = async ({
  rootDomain,
  signer,
  newOwner,
  chainId,
  dryRun = true,
}: {
  rootDomain: string;
  signer: Signer;
  newOwner: string;
  chainId: ChainId;
  dryRun?: boolean;
}) => {
  const { domainHierarchy, domainReader, ensRegistry } = await initDomains(
    signer,
    chainId
  );
  const transferred: Record<string, unknown>[] = [];
  const transfer = async (domain: string) => {
    console.log(`> transferring ${domain}`);
    const domainHash = namehash(domain);

    let def;
    try {
      def = await domainReader.read({ node: domainHash });
    } catch (e) {
      // 'apps' and 'roles'
      console.log(`Unable to read ${domain}`, (<Error>e).message);
    }

    const subnodes = await domainHierarchy.getSubdomainsUsingResolver({
      domain,
      mode: 'FIRSTLEVEL',
    });
    if (def) {
      if (
        DomainReader.isOrgDefinition(def) ||
        DomainReader.isAppDefinition(def)
      ) {
        subnodes.push(`roles.${domain}`);
      }
      if (DomainReader.isOrgDefinition(def)) {
        subnodes.push(`apps.${domain}`);
      }
      if (domain === 'engie.auth.ewc') {
        subnodes.push(`orgs.${domain}`);
      }
    }
    console.log(`subnodes of ${domain} are`, subnodes);
    for await (const nodeName of subnodes) {
      console.group();
      const label = nodeName.split('.')[0];
      const labelHash = labelhash(label);
      if (!dryRun) {
        await (
          await ensRegistry.setSubnodeOwner(
            domainHash,
            labelHash,
            await signer.getAddress()
          )
        ).wait();
      }
      await transfer(nodeName);
      console.groupEnd();
    }
    if (!dryRun) {
      await (await ensRegistry.setOwner(domainHash, newOwner)).wait();
    }
    return transferred;
  };

  await transfer(rootDomain);
};

export const initDomains = async (signer: Signer, chainId: ChainId) => {
  const {
    rpcUrl,
    ensRegistryAddress,
    ensResolverV2Address,
    ensResolverAddress,
    ensPublicResolverAddress,
    domainNotifierAddress,
    chainName,
  } = chainConfigs()[chainId];
  const provider = new JsonRpcProvider(rpcUrl);

  const ensRegistry = new ENSRegistry__factory(
    ENSRegistry__factory.createInterface(),
    ENSRegistry__factory.bytecode
  )
    .attach(ensRegistryAddress)
    .connect(signer.connect(provider));
  const domainReader = new DomainReader({
    ensRegistryAddress,
    provider,
  });
  ensResolverV2Address &&
    domainReader.addKnownResolver({
      chainId,
      address: ensResolverV2Address,
      type: ResolverContractType.RoleDefinitionResolver_v2,
    });
  ensResolverAddress &&
    domainReader.addKnownResolver({
      chainId,
      address: ensResolverAddress,
      type: ResolverContractType.RoleDefinitionResolver_v1,
    });
  ensPublicResolverAddress &&
    domainReader.addKnownResolver({
      chainId,
      address: ensPublicResolverAddress,
      type: ResolverContractType.PublicResolver,
    });

  const transactionFactory = new DomainTransactionFactoryV2({
    domainResolverAddress: ensResolverV2Address,
  });
  const domainHierarchy = new DomainHierarchy({
    domainReader: domainReader,
    ensRegistryAddress: ensRegistryAddress,
    provider,
    domainNotifierAddress,
    publicResolverAddress: ensPublicResolverAddress,
  });
  const domainNotifier = new DomainNotifier__factory(
    DomainNotifier__factory.createInterface(),
    DomainNotifier__factory.bytecode
  )
    .attach(domainNotifierAddress)
    .connect(signer.connect(provider));
  return {
    provider,
    ensRegistry,
    domainReader,
    transactionFactory,
    domainHierarchy,
    domainNotifier,
    ensResolverV2Address,
    ensResolverAddress,
    ensPublicResolverAddress,
    chainName,
  };
};
