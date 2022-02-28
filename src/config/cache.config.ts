import { EWC_CHAIN_ID, VOLTA_CHAIN_ID } from '@energyweb/iam-contracts';
import { CacheServerClientOptions } from '../modules/cacheClient/cacheClient.types';

const cacheConfig: Record<number, CacheServerClientOptions> = {
  [VOLTA_CHAIN_ID]: {
    url: 'https://identitycache-staging.energyweb.org/v1/',
    cacheServerSupportsAuth: true,
  },
  [EWC_CHAIN_ID]: {
    url: 'https://identitycache.energyweb.org/v1/',
    cacheServerSupportsAuth: true,
  },
};

/**
 * Used to override existing cache server configuration or add a missing one
 * Configuration must be set before constructing `IAM`
 */
export const setCacheConfig = (
  chainId: number,
  options: Partial<CacheServerClientOptions>
) => {
  cacheConfig[chainId] = { ...cacheConfig[chainId], ...options };
};

export const cacheConfigs = () => ({ ...cacheConfig });
