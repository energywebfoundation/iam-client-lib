import { VoltaAddress1056 } from "@ew-did-registry/did-ethr-resolver";
import { VOLTA_CHAIN_ID } from "./iam-base";
import { ChainConfig } from "./models";

/**
   * Set of parameters to configure connection to chain with id received from wallet.
   * If configuration for some chain is missing or should be reconfigured use `setChainConfig` before class instantiation
   */
export const chainConfigs: Record<number, ChainConfig> = {
  [VOLTA_CHAIN_ID]: {
    rpcUrl: "https://volta-rpc-vkn5r5zx4ke71f9hcu0c.energyweb.org/",
    ensRegistryAddress: "0xd7CeF70Ba7efc2035256d828d5287e2D285CD1ac",
    ensResolverAddress: "0x0a97e07c4Df22e2e31872F20C5BE191D5EFc4680",
    didContractAddress: VoltaAddress1056,
    cacheServerUrl: "https://identitycache-dev.energyweb.org/",
  }
};

/**
 * Used to override existing configuration or add a missing one
 * Configuration must be set before constructing `IAM`
 */
export const setChainConfig = function (chainId: number, config: Partial<ChainConfig>) {
  chainConfigs[chainId] = { ...chainConfigs[chainId], ...config };
};
