import { SignerService } from '../signer';
import { VerifiableCredentialsServiceBase } from './verifiable-credentials-base.service';
import { CacheClient } from '../cache-client';

export class VerifiableCredentialsServiceWeb extends VerifiableCredentialsServiceBase {

  constructor(_signerService: SignerService, _cacheClient: CacheClient) {
    super(_signerService, _cacheClient);
  }

  protected prepareIssueCredential(
    credential: string,
    linked_data_proof_options: string,
    public_key: string
  ): Promise<string> {
    return import('didkit-wasm').then(({ prepareIssueCredential }) =>
      prepareIssueCredential(credential, linked_data_proof_options, public_key)
    );
  }

  protected completeIssueCredential(
    credential: string,
    preparation: string,
    signature: string
  ): Promise<string> {
    return import('didkit-wasm').then(({ completeIssueCredential }) =>
      completeIssueCredential(credential, preparation, signature)
    );
  }

  protected verifyCredential(
    vc: string,
    proof_options: string
  ): Promise<string> {
    return import('didkit-wasm').then(({ verifyCredential }) =>
      verifyCredential(vc, proof_options)
    );
  }

  protected prepareIssuePresentation(
    presentation: string,
    linked_data_proof_options: string,
    public_key: string
  ): Promise<string> {
    return import('@spruceid/didkit-wasm').then(
      ({ prepareIssuePresentation }) =>
        prepareIssuePresentation(
          presentation,
          linked_data_proof_options,
          public_key
        )
    );
  }

  protected completeIssuePresentation(
    presentation: string,
    preparation: string,
    signature: string
  ): Promise<string> {
    return import('@spruceid/didkit-wasm').then(
      ({ completeIssuePresentation }) =>
        completeIssuePresentation(preparation, preparation, signature)
    );
  }

  protected verifyPresentation(
    vp: string,
    proof_options: string
  ): Promise<string> {
    return import('@spruceid/didkit-wasm').then(({ verifyPresentation }) =>
      verifyPresentation(vp, proof_options)
    );
  }

  static async create(signerService: SignerService, cacheClient: CacheClient) {
    const service = new VerifiableCredentialsServiceWeb(
      signerService,
      cacheClient
    );
    return service;
  }
}
