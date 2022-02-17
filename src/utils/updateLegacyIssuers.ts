import {
  DomainHierarchy,
  DomainReader,
  DomainTransactionFactory,
  IRoleDefinition,
  ResolverContractType,
} from '@energyweb/iam-contracts';
import { providers } from 'ethers';
import { Methods } from '@ew-did-registry/did';
import { Signer } from 'ethers';
import { isValidDID } from './did';
import { ENSRegistry__factory } from '../../ethers/factories/ENSRegistry__factory';
import { labelhash, namehash } from './ensHash';
import { ChainId, chainConfigs } from '../config';

const { JsonRpcProvider } = providers;

/**
 * @description - Checks that role issuers of all roles under `rootDomain` contains method-specific-id and adds it if missing
 * `signer` must own `rootDomain` on `targetChain`
 */
export const updateLegacyIssuers = async (
  rootDomain: string,
  signer: Signer,
  chainId: ChainId,
  dryRun = true
) => {
  const {
    transactionFactory,
    chainName,
    provider,
    domainHierarchy,
    domainReader,
    ensRegistry,
    ensResolverV2Address,
  } = await initDomains(signer, chainId);

  const updated = new Array();
  const update = async (domain: string) => {
    const domainHash = namehash(domain);
    const def = await domainReader.read({ node: domainHash });
    let subnodes = await domainHierarchy.getSubdomainsUsingResolver({
      domain,
      mode: 'FIRSTLEVEL',
    });
    if (DomainReader.isOrgDefinition(def) || DomainReader.isAppDefinition(def)) {
      subnodes = subnodes.concat(
        await domainHierarchy.getSubdomainsUsingResolver({
          domain: `roles.${domain}`,
          mode: 'FIRSTLEVEL',
        })
      );
    }
    if (DomainReader.isOrgDefinition(def)) {
      subnodes = subnodes.concat(
        await domainHierarchy.getSubdomainsUsingResolver({
          domain: `apps.${domain}`,
          mode: 'FIRSTLEVEL',
        })
      );
    }

    const resolver = await ensRegistry.resolver(domainHash);
    if (resolver !== ensResolverV2Address) {
      if (!dryRun) {
        await (await ensRegistry.setResolver(domain, ensResolverV2Address)).wait();
      }
      let updateDomainTx;
      if (DomainReader.isRoleDefinition(def)) {
        const {
          issuer: { did },
          version,
        } = def;
        const updatedDef: IRoleDefinition = {
          ...def,
          issuer: {
            ...def.issuer,
            did: did?.map((d) =>
              isValidDID(d) ? d : `did:${Methods.Erc1056}:${chainName}:${d.split(':').slice(-1)}`
            ),
          },
          version: parseInt(version.toString(), 10),
        };
        updated.push({ domain, legacyDef: def, updatedDef });
        updateDomainTx = transactionFactory.newRole({ domain, roleDefinition: updatedDef });
      } else {
        updateDomainTx = transactionFactory.newDomain({ domain, domainDefinition: def });
      }
      if (!dryRun) {
        await (await signer.connect(provider).sendTransaction(updateDomainTx)).wait();
      }
    }

    for await (const nodeName of subnodes) {
      const label = nodeName.split('.')[0];
      const labelHash = labelhash(label);
      const nodeHash = namehash(nodeName);
      const owner = await ensRegistry.owner(nodeHash);
      if (!dryRun) {
        await (
          await ensRegistry.setSubnodeOwner(domainHash, labelHash, await signer.getAddress())
        ).wait();
      }
      await update(nodeName);
      if (!dryRun) {
        await (await ensRegistry.setSubnodeOwner(domainHash, labelHash, owner)).wait();
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

  const transactionFactory = new DomainTransactionFactory({
    domainResolverAddress: ensResolverAddress,
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
