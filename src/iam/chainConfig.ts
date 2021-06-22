import { VoltaAddress1056 } from "@ew-did-registry/did-ethr-resolver";
import {
  VOLTA_DOMAIN_NOTIFER_ADDRESS,
  VOLTA_ENS_REGISTRY_ADDRESS,
  VOLTA_PUBLIC_RESOLVER_ADDRESS,
  VOLTA_RESOLVER_V1_ADDRESS
} from "@energyweb/iam-contracts";
import { CacheServerClientOptions } from "../cacheServerClient/cacheServerClient";
import { MessagingMethod } from "../utils/constants";

const VOLTA_CHAIN_ID = 73799;
export interface ChainConfig {
  rpcUrl: string,
  ensRegistryAddress: string;
  ensResolverAddress: string;
  ensPublicResolverAddress?: string;
  domainNotifierAddress: string;
  assetManagerAddress: string;
  didContractAddress: string;
  claimManagerAddress: string;
}

export interface MessagingOptions {
  messagingMethod: MessagingMethod;
  natsServerUrl: string;
}

/**
 * Set of parameters to configure connection to chain with id received from wallet.
 * If configuration for some chain is missing or should be reconfigured use `setChainConfig` before class instantiation
 */
export const chainConfigs: Record<number, ChainConfig> = {
  [VOLTA_CHAIN_ID]: {
    rpcUrl: "https://volta-rpc.com",
    ensRegistryAddress: VOLTA_ENS_REGISTRY_ADDRESS,
    ensResolverAddress: VOLTA_RESOLVER_V1_ADDRESS,
    ensPublicResolverAddress: VOLTA_PUBLIC_RESOLVER_ADDRESS,
    domainNotifierAddress: VOLTA_DOMAIN_NOTIFER_ADDRESS,
    // TODO: export from did-lib
    assetManagerAddress: "0xE258fA7D1cc8964D0dEB7204Df947bCa42b2c940",
    didContractAddress: VoltaAddress1056,
    // TODO: export from iam-contracts
    claimManagerAddress: "0x2F259e307D0Ba78902391c070e7b4aA043E74DBB"
  }
};

export const cacheServerClientOptions: Record<number, CacheServerClientOptions> = {
  [VOLTA_CHAIN_ID]: {
    url: "https://volta-identitycache.energyweb.org/",
    cacheServerSupportsAuth: true
  }
};

export const messagingOptions: Record<number, MessagingOptions> = {
  [VOLTA_CHAIN_ID]: {
    messagingMethod: MessagingMethod.Nats,
    natsServerUrl: "https://volta-identityevents.energyweb.org/"
  }
};

/**
 * Used to override existing chain configuration or add a missing one
 * Configuration must be set before constructing `IAM`
 */
export const setChainConfig = (chainId: number, config: Partial<ChainConfig>) => {
  chainConfigs[chainId] = { ...chainConfigs[chainId], ...config };
};

/**
 * Used to override existing cache server configuration or add a missing one
 * Configuration must be set before constructing `IAM`
 */
export const setCacheClientOptions = (
  chainId: number,
  options: Partial<CacheServerClientOptions>
) => {
  cacheServerClientOptions[chainId] = { ...cacheServerClientOptions[chainId], ...options };
};

/**
 * Used to override existing messaging configuration or add a missing one
 * Configuration must be set before constructing `IAM`
 */

export const setMessagingOptions = (chainId: number, options: Partial<MessagingOptions>) => {
  messagingOptions[chainId] = { ...messagingOptions[chainId], ...options };
};
