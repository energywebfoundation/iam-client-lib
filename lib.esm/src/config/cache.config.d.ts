import { CacheServerClientOptions } from '../modules/cache-client/cache-client.types';
/**
 * Used to override existing cache server configuration or add a missing one
 * Configuration must be set before constructing `IAM`
 */
export declare const setCacheConfig: (chainId: number, options: Partial<CacheServerClientOptions>) => void;
export declare const cacheConfigs: () => {
    [x: number]: CacheServerClientOptions;
};
