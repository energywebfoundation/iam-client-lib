import {
  prepareIssueCredential,
  completeIssueCredential,
  verifyCredential,
} from 'didkit-wasm';
import { SignerService } from '../signer';
import { VerifiableCredentialsServiceBase } from './verifiableCredentialsBase.service';

export class VerifiableCredentialsServiceWeb extends VerifiableCredentialsServiceBase {
  prepareIssueCredential: (
    credential: string,
    linked_data_proof_options: string,
    public_key: string
  ) => Promise<string>;
  completeIssueCredential: (
    credential: string,
    preparation: string,
    signature: string
  ) => Promise<string>;
  verifyCredential: (vc: string, proof_options: string) => Promise<string>;

  constructor(_signerService: SignerService) {
    super(_signerService);

    this.completeIssueCredential = completeIssueCredential;
    this.prepareIssueCredential = prepareIssueCredential;
    this.verifyCredential = verifyCredential;
  }

  static async create(signerService: SignerService) {
    const service = new VerifiableCredentialsServiceWeb(signerService);
    return service;
  }
}
