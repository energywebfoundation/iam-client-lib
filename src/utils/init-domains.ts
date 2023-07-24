import {
  DomainHierarchy,
  DomainReader,
  DomainTransactionFactoryV2,
  ResolverContractType,
} from '@energyweb/credential-governance';
import { providers, Wallet } from 'ethers';
import { DomainNotifier__factory } from '../../ethers/factories/DomainNotifier__factory';
import { ENSRegistry__factory } from '../../ethers/factories/ENSRegistry__factory';
import { chainConfigs, ChainId } from '../config';

const { JsonRpcProvider } = providers;

export const initDomains = async (signer: Wallet, chainId: ChainId) => {
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
