// import { EWC_CHAIN_ID, VOLTA_CHAIN_ID } from '@energyweb/credential-governance';

export interface CredentialStorageOptions {
  url: string;
}

const credentialStorageConfig: Record<number, CredentialStorageOptions> = {
  // [VOLTA_CHAIN_ID]: {
  //   // TODO: add storage url
  //   url: '...',
  // },
  // [EWC_CHAIN_ID]: {
  //   // TODO: add storage url
  //   url: '...',
  // },
};

/**
 * Used to override existing cache server configuration or add a missing one
 * Configuration must be set before constructing `IAM`
 */
export const setCredentialStorageConfig = (
  chainId: number,
  options: Partial<CredentialStorageOptions>
) => {
  credentialStorageConfig[chainId] = {
    ...credentialStorageConfig[chainId],
    ...options,
  };
};

export const credentialStorageConfigs = () => ({ ...credentialStorageConfig });
