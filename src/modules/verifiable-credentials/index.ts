export * from './types';
export * from './verifiable-credentials-base.service';

import { SignerService } from '../signer';
import { VerifiableCredentialsServiceBase } from './verifiable-credentials-base.service';
import { ExecutionEnvironment, executionEnvironment } from '../../utils';
import { CacheClient } from '../cache-client/cache-client.service';
import { VerifiableCredentialsServiceNode } from './verifiable-credentials-node.service';

export const getVerifiableCredentialsService = async (
  signerService: SignerService,
  cacheClient: CacheClient
): Promise<VerifiableCredentialsServiceBase> => {
  let service: VerifiableCredentialsServiceBase;
  if (executionEnvironment() === ExecutionEnvironment.NODE) {
    service = await VerifiableCredentialsServiceNode.create(
      signerService,
      cacheClient
    );
  } else {
    throw new Error();
  }

  return service;
};
