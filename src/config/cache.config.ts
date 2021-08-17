import { CacheServerClientOptions } from "../modules/cacheClient/cacheClient.service";
import { VOLTA_CHAIN_ID } from "../constants";

export default () => ({ cacheConfig });

const cacheConfig: Record<number, CacheServerClientOptions> = {
    [VOLTA_CHAIN_ID]: {
        url: "https://volta-identitycache.energyweb.org/",
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
