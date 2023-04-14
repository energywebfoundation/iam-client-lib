import { SignerService } from '../signer';
import { VerifiableCredentialsServiceBase } from './verifiable-credentials-base.service';
import { CacheClient } from '../cache-client';
export declare class VerifiableCredentialsServiceWeb extends VerifiableCredentialsServiceBase {
    protected prepareIssueCredential: (credential: string, linked_data_proof_options: string, public_key: string) => Promise<string>;
    protected completeIssueCredential: (credential: string, preparation: string, signature: string) => Promise<string>;
    protected verifyCredential: (vc: string, proof_options: string) => Promise<string>;
    protected prepareIssuePresentation: (presentation: string, linked_data_proof_options: string, public_key: string) => Promise<string>;
    protected completeIssuePresentation: (presentation: string, preparation: string, signature: string) => Promise<string>;
    protected verifyPresentation: (vp: string, proof_options: string) => Promise<string>;
    constructor(_signerService: SignerService, _cacheClient: CacheClient);
    static create(signerService: SignerService, cacheClient: CacheClient): Promise<VerifiableCredentialsServiceWeb>;
}
