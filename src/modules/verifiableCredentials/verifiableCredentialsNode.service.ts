import {
  prepareIssueCredential,
  completeIssueCredential,
  verifyCredential,
} from 'didkit-wasm-node';
import { SignerService } from '../signer';
import { VerifiableCredentialsServiceBase } from './verifiableCredentialsBase.service';

export class VerifiableCredentialsServiceNode extends VerifiableCredentialsServiceBase {
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
    const service = new VerifiableCredentialsServiceNode(signerService);
    return service;
  }
}
