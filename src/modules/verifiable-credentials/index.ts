export * from './types';
export * from './verifiable-credentials-base.service';

import { SignerService } from '../signer';
import { VerifiableCredentialsServiceBase } from './verifiable-credentials-base.service';
import { ExecutionEnvironment, executionEnvironment } from '../../utils';
import VCStorageClient from './storage-client';

export const getVerifiableCredentialsService = async (
  signerService: SignerService,
  storage: VCStorageClient
): Promise<VerifiableCredentialsServiceBase> => {
  let service: VerifiableCredentialsServiceBase;
  if (executionEnvironment() === ExecutionEnvironment.NODE) {
    service = await import('./verifiable-credentials-node.service').then(
      (module) =>
        module.VerifiableCredentialsServiceNode.create(signerService, storage)
    );
  } else {
    service = await import('./verifiable-credentials-web.service').then(
      (module) =>
        module.VerifiableCredentialsServiceWeb.create(signerService, storage)
    );
  }

  return service;
};
