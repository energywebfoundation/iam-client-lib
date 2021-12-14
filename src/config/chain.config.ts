import { VoltaAddress1056 } from "@ew-did-registry/did-ethr-resolver";
import { Chain } from "@ew-did-registry/did";
import {
    VOLTA_DOMAIN_NOTIFER_ADDRESS,
    VOLTA_ENS_REGISTRY_ADDRESS,
    VOLTA_PUBLIC_RESOLVER_ADDRESS,
    VOLTA_RESOLVER_V1_ADDRESS,
    VOLTA_IDENTITY_MANAGER_ADDRESS,
    VOLTA_CLAIM_MANAGER_ADDRESS,
    VOLTA_STAKING_POOL_FACTORY_ADDRESS,
    EWC_CHAIN_ID,
} from "@energyweb/iam-contracts";
import { VOLTA_CHAIN_ID } from "../utils/constants";

export interface ChainConfig {
    chainName: string;
    chainDisplayName: string;
    rpcUrl: string;
    ensRegistryAddress: string;
    ensResolverAddress: string;
    ensPublicResolverAddress: string;
    domainNotifierAddress: string;
    assetManagerAddress: string;
    didRegistryAddress: string;
    claimManagerAddress: string;
    stakingPoolFactoryAddress: string;
}

export type ChainId = number;

// TODO: Would be better if some of these were in @energyweb/iam-contracts
const EWC_CLAIM_MANAGER_ADDRESS = "0x23b026631A6f265d17CFee8aa6ced1B244f3920C";
const EWC_ENS_REGISTRY_ADDRESS = "0x0A6d64413c07E10E890220BBE1c49170080C6Ca0";
const EWC_RESOLVER_V1_ADDRESS = "0x70ad37DfeB1C05290F4bBd22188FA19Bc154A0ea";
const EWC_PUBLIC_RESOLVER_ADDRESS = "0xA517983Bd4Af4DF0Ed9b52DA4BC405d0A95eE7E2";
const EWC_DOMAIN_NOTIFER_ADDRESS = "0x5491Db3cC1f3AFf6C229e061735F92936004da3c";
const EWC_IDENTITY_MANAGER_ADDRESS = "0x2d1569f3a2006d21c0dc60eb13c8557b63ce5a8d";
const EwcAddress1056 = "0xE29672f34e92b56C9169f9D485fFc8b9A136BCE4";

/**
 * Set of parameters to configure connection to chain with id received from wallet.
 * If configuration for some chain is missing or should be reconfigured use `setChainConfig` before class instantiation
 */
const chainConfig: Record<number, ChainConfig> = {
    [VOLTA_CHAIN_ID]: {
        chainName: Chain.VOLTA,
        chainDisplayName: "Energy Web Volta Testnet",
        rpcUrl: "https://volta-rpc.energyweb.org/",
        ensRegistryAddress: VOLTA_ENS_REGISTRY_ADDRESS,
        ensResolverAddress: VOLTA_RESOLVER_V1_ADDRESS,
        ensPublicResolverAddress: VOLTA_PUBLIC_RESOLVER_ADDRESS,
        domainNotifierAddress: VOLTA_DOMAIN_NOTIFER_ADDRESS,
        assetManagerAddress: VOLTA_IDENTITY_MANAGER_ADDRESS,
        didRegistryAddress: VoltaAddress1056,
        claimManagerAddress: VOLTA_CLAIM_MANAGER_ADDRESS,
        stakingPoolFactoryAddress: VOLTA_STAKING_POOL_FACTORY_ADDRESS,
    },
    [EWC_CHAIN_ID]: {
        chainName: Chain.EWC,
        chainDisplayName: "Energy Web Chain",
        rpcUrl: "https://rpc.energyweb.org/",
        ensRegistryAddress: EWC_ENS_REGISTRY_ADDRESS,
        ensResolverAddress: EWC_RESOLVER_V1_ADDRESS,
        ensPublicResolverAddress: EWC_PUBLIC_RESOLVER_ADDRESS,
        domainNotifierAddress: EWC_DOMAIN_NOTIFER_ADDRESS,
        assetManagerAddress: EWC_IDENTITY_MANAGER_ADDRESS,
        didRegistryAddress: EwcAddress1056,
        claimManagerAddress: EWC_CLAIM_MANAGER_ADDRESS,
        stakingPoolFactoryAddress: "", // This is not deployed on EWC
    },
};

export const chainConfigs = () => ({ ...chainConfig });

/**
 * Used to override existing chain configuration or add a missing one
 * Configuration must be set before constructing `IAM`
 */
export const setChainConfig = (chainId: ChainId, config: Partial<ChainConfig>) => {
    chainConfig[chainId] = { ...chainConfig[chainId], ...config };
};
