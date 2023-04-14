export * from './types';
export * from './verifiable-credentials-base.service';
import { SignerService } from '../signer';
import { VerifiableCredentialsServiceBase } from './verifiable-credentials-base.service';
import { CacheClient } from '../cache-client/cache-client.service';
export declare const getVerifiableCredentialsService: (signerService: SignerService, cacheClient: CacheClient) => Promise<VerifiableCredentialsServiceBase>;
