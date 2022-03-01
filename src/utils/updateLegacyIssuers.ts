import {
  DomainHierarchy,
  DomainReader,
  DomainTransactionFactoryV2,
  IRoleDefinitionV2,
  ResolverContractType,
} from '@energyweb/credential-governance';
import { providers } from 'ethers';
import { Methods } from '@ew-did-registry/did';
import { Signer } from 'ethers';
import { isValidDID } from './did';
import { ENSRegistry__factory } from '../../ethers/factories/ENSRegistry__factory';
import { labelhash, namehash } from './ensHash';
import { ChainId, chainConfigs } from '../config';
import { castToV2 } from '..';
import { getLogger } from '../config/logger.config';
import { SignerT } from '../modules/signer';

const { JsonRpcProvider } = providers;

// TODO: implement this function
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateLegacyIssuers = (a: string, b: Wallet, c: number): any[] => {
  a;
  b;
  c;
  throw new Error('Method not implemented.');
};

/**
 * @description - Checks that role issuers of all roles under `rootDomain` contains method-specific-id and adds it if missing
 * `signer` must own `rootDomain` on `targetChain`
 */
export const updateLegacyRoles = async ({
  rootDomain,
  signer,
  chainId,
  dryRun = true,
}: {
  rootDomain: string;
  signer: SignerT;
  chainId: ChainId;
  dryRun?: boolean;
}) => {
  const {
    transactionFactory,
    chainName,
    provider,
    domainHierarchy,
    domainReader,
    ensRegistry,
    ensResolverV2Address,
  } = await initDomains(signer, chainId);

  const updated: Record<string, unknown>[] = [];
  const update = async (domain: string) => {
    const domainHash = namehash(domain);

    const subnodes = await domainHierarchy.getSubdomainsUsingResolver({
      domain,
      mode: 'FIRSTLEVEL',
    });

    const resolver = await ensRegistry.resolver(domainHash);
    if (resolver !== ensResolverV2Address) {
      let def;
      try {
        def = await domainReader.read({ node: domainHash });
      } catch (e) {
        getLogger().error(`Can not read ${domain}`); // 'apps' and 'roles'
      }

      // migrate `roles` and `apps`
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

      if (!dryRun) {
        await (
          await ensRegistry.setResolver(domainHash, ensResolverV2Address)
        ).wait();
      }
      // migrate domain definition
      let updateDomainTx;
      if (DomainReader.isRoleDefinition(def)) {
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
      if (!dryRun) {
        await (
          await signer.connect(provider).sendTransaction(updateDomainTx)
        ).wait();
      }
    }

    for await (const nodeName of subnodes) {
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
    }
  };

  await update(rootDomain);
  return updated;
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
    domainNotifierAddress: domainNotifierAddress,
    publicResolverAddress: ensPublicResolverAddress,
  });
  return {
    provider,
    ensRegistry,
    domainReader,
    transactionFactory,
    domainHierarchy,
    ensResolverV2Address,
    ensResolverAddress,
    ensPublicResolverAddress,
    chainName,
  };
};
