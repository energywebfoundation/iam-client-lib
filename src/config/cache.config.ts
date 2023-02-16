import { EWC_CHAIN_ID, VOLTA_CHAIN_ID } from '@energyweb/credential-governance';
import { CacheServerClientOptions } from '../modules/cache-client/cache-client.types';

const defaultConfig: Record<number, CacheServerClientOptions> = {
  [VOLTA_CHAIN_ID]: {
    url: 'https://identitycache-staging.energyweb.org/v1/',
    cacheServerSupportsAuth: true,
    auth: {
      domain: 'https://switchboard-dev.energyweb.org',
    },
  },
  [EWC_CHAIN_ID]: {
    url: 'https://identitycache.energyweb.org/v1/',
    cacheServerSupportsAuth: true,
    auth: { domain: 'https://switchboard.energyweb.org' },
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
  defaultConfig[chainId] = { ...defaultConfig[chainId], ...options };
};

export const cacheConfigs = () => ({ ...defaultConfig });
