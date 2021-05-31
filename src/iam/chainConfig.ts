import { VoltaAddress1056 } from "@ew-did-registry/did-ethr-resolver";
import { CacheServerClientOptions } from "../cacheServerClient/cacheServerClient";
import { MessagingMethod } from "../utils/constants";

const VOLTA_CHAIN_ID = 73799;
export interface ChainConfig {
  rpcUrl: string;
  ensRegistryAddress: string;
  ensResolverAddress: string;
  assetManagerAddress: string;
  didContractAddress: string;
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
    rpcUrl: "https://volta-rpc-vkn5r5zx4ke71f9hcu0c.energyweb.org/",
    ensRegistryAddress: "0xd7CeF70Ba7efc2035256d828d5287e2D285CD1ac",
    ensResolverAddress: "0x0a97e07c4Df22e2e31872F20C5BE191D5EFc4680",
    assetManagerAddress: "0xE258fA7D1cc8964D0dEB7204Df947bCa42b2c940",
    didContractAddress: VoltaAddress1056
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
export const setChainConfig = function(chainId: number, config: Partial<ChainConfig>) {
  chainConfigs[chainId] = { ...chainConfigs[chainId], ...config };
};

/**
 * Used to override existing cache server configuration or add a missing one
 * Configuration must be set before constructing `IAM`
 */
export const setCacheClientOptions = function(
  chainId: number,
  options: Partial<CacheServerClientOptions>
) {
  cacheServerClientOptions[chainId] = { ...cacheServerClientOptions[chainId], ...options };
};

/**
 * Used to override existing messaging configuration or add a missing one
 * Configuration must be set before constructing `IAM`
 */

export const setMessagingOptions = function(chainId: number, options: Partial<MessagingOptions>) {
  messagingOptions[chainId] = { ...messagingOptions[chainId], ...options };
};
