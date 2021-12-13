import { CacheServerClientOptions } from "../modules/cacheClient/cacheClient.types";
import { VOLTA_CHAIN_ID } from "../utils/constants";

const cacheConfig: Record<number, CacheServerClientOptions> = {
    [VOLTA_CHAIN_ID]: {
        url: "https://identitycache-dev.energyweb.org/v1/",
        cacheServerSupportsAuth: true,
    },
};

/**
 * Used to override existing cache server configuration or add a missing one
 * Configuration must be set before constructing `IAM`
 */
export const setCacheConfig = (chainId: number, options: Partial<CacheServerClientOptions>) => {
    cacheConfig[chainId] = { ...cacheConfig[chainId], ...options };
};

export const cacheConfigs = () => ({ ...cacheConfig });
