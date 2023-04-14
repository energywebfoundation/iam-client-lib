import { Chain } from '@ew-did-registry/did';
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
export declare type ChainId = number;
export declare const chainConfigs: () => {
    [x: number]: ChainConfig;
};
/**
 * Used to override existing chain configuration or add a missing one
 * Configuration must be set before constructing `IAM`
 */
export declare const setChainConfig: (chainId: ChainId, config: Partial<ChainConfig>) => void;
