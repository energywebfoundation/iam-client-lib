import { SignerService } from '../signer/signer.service';
import { CacheClient } from '../cache-client';
import { VerifiableCredentialsServiceBase } from './verifiable-credentials-base.service';

export class VerifiableCredentialsServiceNode extends VerifiableCredentialsServiceBase {

  constructor(_signerService: SignerService, _cacheClient: CacheClient) {
    super(_signerService, _cacheClient);
  }

  protected completeIssueCredential(
    credential: string,
    preparation: string,
    signature: string
  ): Promise<string> {
    return import('didkit-wasm-node').then(({ completeIssueCredential }) =>
      completeIssueCredential(credential, preparation, signature)
    );
  }

  protected prepareIssueCredential(
    credential: string,
    linked_data_proof_options: string,
    public_key: string
  ): Promise<string> {
    return import('didkit-wasm-node').then(({ prepareIssueCredential }) =>
      prepareIssueCredential(credential, linked_data_proof_options, public_key)
    );
  }

  protected verifyCredential(
    vc: string,
    proof_options: string
  ): Promise<string> {
    return import('didkit-wasm-node').then(({ verifyCredential }) =>
      verifyCredential(vc, proof_options)
    );
  }

  protected prepareIssuePresentation(
    presentation: string,
    linked_data_proof_options: string,
    public_key: string
  ): Promise<string> {
    return import('@spruceid/didkit-wasm-node').then(
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
    return import('@spruceid/didkit-wasm-node').then(
      ({ completeIssuePresentation }) =>
        completeIssuePresentation(presentation, preparation, signature)
    );
  }

  protected verifyPresentation(
    vp: string,
    proof_options: string
  ): Promise<string> {
    return import('didkit-wasm-node').then(({ verifyPresentation }) =>
      verifyPresentation(vp, proof_options)
    );
  }

  static async create(signerService: SignerService, cacheClient: CacheClient) {
    const service = new VerifiableCredentialsServiceNode(
      signerService,
      cacheClient
    );
    return service;
  }
}
