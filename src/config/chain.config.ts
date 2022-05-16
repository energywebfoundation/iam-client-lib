import { VoltaAddress1056 } from '@ew-did-registry/did-ethr-resolver';
import { Chain } from '@ew-did-registry/did';
import {
  VOLTA_DOMAIN_NOTIFER_ADDRESS,
  VOLTA_ENS_REGISTRY_ADDRESS,
  VOLTA_PUBLIC_RESOLVER_ADDRESS,
  VOLTA_RESOLVER_V1_ADDRESS,
  VOLTA_IDENTITY_MANAGER_ADDRESS,
  VOLTA_CLAIM_MANAGER_ADDRESS,
  EWC_CHAIN_ID,
  EWC_ADDRESS_1056,
  EWC_CLAIM_MANAGER_ADDRESS,
  EWC_DOMAIN_NOTIFER_ADDRESS,
  EWC_ENS_REGISTRY_ADDRESS,
  EWC_IDENTITY_MANAGER_ADDRESS,
  EWC_PUBLIC_RESOLVER_ADDRESS,
  EWC_RESOLVER_V2_ADDRESS,
  VOLTA_RESOLVER_V2_ADDRESS,
} from '@energyweb/credential-governance';
import { VOLTA_CHAIN_ID } from '../utils/constants';

const VOLTA_STAKING_POOL_FACTORY_ADDRESS =
  '0x4b2A127680320eD980beAa7aD9b2447B96BC32fC';
export interface ChainConfig {
  chainName: Chain;
  chainDisplayName: string;
  rpcUrl: string;
  ensRegistryAddress: string;
  ensResolverV2Address: string;
  ensResolverAddress: string;
  ensPublicResolverAddress: string;
  domainNotifierAddress: string;
  assetManagerAddress: string;
  didRegistryAddress: string;
  claimManagerAddress: string;
  stakingPoolFactoryAddress: string;
  credentialRevocationRegistryAddress: string;
  claimsRevocationRegistryAddress: string;
}

export type ChainId = number;

/**
 * Set of parameters to configure connection to chain with id received from wallet.
 * If configuration for some chain is missing or should be reconfigured use `setChainConfig` before class instantiation
 */
const chainConfig: Record<number, ChainConfig> = {
  [VOLTA_CHAIN_ID]: {
    chainName: Chain.VOLTA,
    chainDisplayName: 'Energy Web Volta Testnet',
    rpcUrl: 'https://volta-rpc.energyweb.org/',
    ensRegistryAddress: VOLTA_ENS_REGISTRY_ADDRESS,
    ensResolverV2Address: VOLTA_RESOLVER_V2_ADDRESS,
    ensResolverAddress: VOLTA_RESOLVER_V1_ADDRESS,
    ensPublicResolverAddress: VOLTA_PUBLIC_RESOLVER_ADDRESS,
    domainNotifierAddress: VOLTA_DOMAIN_NOTIFER_ADDRESS,
    assetManagerAddress: VOLTA_IDENTITY_MANAGER_ADDRESS,
    didRegistryAddress: VoltaAddress1056,
    claimManagerAddress: VOLTA_CLAIM_MANAGER_ADDRESS,
    stakingPoolFactoryAddress: VOLTA_STAKING_POOL_FACTORY_ADDRESS,
    // TODO: add addresses to @energyweb/credential-governance
    credentialRevocationRegistryAddress:
      '0x018Ae0454a3e2f77048a455dD731bB669a218959',
    claimsRevocationRegistryAddress:
      '0x58E0F80FB9DE06eb77F27bC7f93468946E89Cc11',
  },
  [EWC_CHAIN_ID]: {
    chainName: Chain.EWC,
    chainDisplayName: 'Energy Web Chain',
    rpcUrl: 'https://rpc.energyweb.org/',
    ensRegistryAddress: EWC_ENS_REGISTRY_ADDRESS,
    ensResolverV2Address: EWC_RESOLVER_V2_ADDRESS,
    ensResolverAddress: EWC_RESOLVER_V2_ADDRESS,
    ensPublicResolverAddress: EWC_PUBLIC_RESOLVER_ADDRESS,
    domainNotifierAddress: EWC_DOMAIN_NOTIFER_ADDRESS,
    assetManagerAddress: EWC_IDENTITY_MANAGER_ADDRESS,
    didRegistryAddress: EWC_ADDRESS_1056,
    claimManagerAddress: EWC_CLAIM_MANAGER_ADDRESS,
    stakingPoolFactoryAddress: '', // This is not deployed on EWC
    credentialRevocationRegistryAddress: '', // This is not deployed on EWC
    claimsRevocationRegistryAddress: '', // This is not deployed on EWC
  },
};

export const chainConfigs = () => ({ ...chainConfig });

/**
 * Used to override existing chain configuration or add a missing one
 * Configuration must be set before constructing `IAM`
 */
export const setChainConfig = (
  chainId: ChainId,
  config: Partial<ChainConfig>
) => {
  chainConfig[chainId] = { ...chainConfig[chainId], ...config };
};
