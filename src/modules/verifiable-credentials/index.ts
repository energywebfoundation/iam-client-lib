export * from './types';
export * from './verifiable-credentials-base.service';

import { SignerService } from '../signer';
import { VerifiableCredentialsServiceBase } from './verifiable-credentials-base.service';
import { ExecutionEnvironment, executionEnvironment } from '../../utils';
import { CacheClient } from '../cache-client/cache-client.service';

export const getVerifiableCredentialsService = async (
  signerService: SignerService,
  cacheClient: CacheClient
): Promise<VerifiableCredentialsServiceBase> => {
  let service: VerifiableCredentialsServiceBase;
  if (executionEnvironment() === ExecutionEnvironment.NODE) {
    service = await import('./verifiable-credentials-node.service').then(
      (module) =>
        module.VerifiableCredentialsServiceNode.create(
          signerService,
          cacheClient
        )
    );
  } else {
    service = await import('./verifiable-credentials-web.service').then(
      (module) =>
        module.VerifiableCredentialsServiceWeb.create(
          signerService,
          cacheClient
        )
    );
  }

  return service;
};
