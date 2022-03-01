export * from './verifiableCredentials.types';
export * from './verifiableCredentialsBase.service';

import { SignerService } from '../signer';
import { VerifiableCredentialsServiceBase } from './verifiableCredentialsBase.service';
import { ExecutionEnvironment, executionEnvironment } from '../../utils';

export const getVerifiableCredentialsService = async (
  signerService: SignerService
): Promise<VerifiableCredentialsServiceBase> => {
  let service: VerifiableCredentialsServiceBase;
  if (executionEnvironment() === ExecutionEnvironment.NODE) {
    service = await import('./verifiableCredentialsNode.service').then(
      (module) => module.VerifiableCredentialsServiceNode.create(signerService)
    );
  } else {
    service = await import('./verifiableCredentialsWeb.service').then(
      (module) => module.VerifiableCredentialsServiceWeb.create(signerService)
    );
  }

  return service;
};
