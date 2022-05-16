export * from './types';
export * from './verifiable-credentials-base.service';

import { SignerService } from '../signer';
import { VerifiableCredentialsServiceBase } from './verifiable-credentials-base.service';
import { ExecutionEnvironment, executionEnvironment } from '../../utils';
import { DomainsService } from '../domains';

export const getVerifiableCredentialsService = async (
  signerService: SignerService,
  domainsService: DomainsService
): Promise<VerifiableCredentialsServiceBase> => {
  let service: VerifiableCredentialsServiceBase;
  if (executionEnvironment() === ExecutionEnvironment.NODE) {
    service = await import('./verifiable-credentials-node.service').then(
      (module) =>
        module.VerifiableCredentialsServiceNode.create(
          signerService,
          domainsService
        )
    );
  } else {
    service = await import('./verifiable-credentials-web.service').then(
      (module) =>
        module.VerifiableCredentialsServiceWeb.create(
          signerService,
          domainsService
        )
    );
  }

  return service;
};
