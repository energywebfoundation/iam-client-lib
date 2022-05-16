import {
  prepareIssueCredential,
  completeIssueCredential,
  verifyCredential,
  verifyPresentation,
} from 'didkit-wasm';
import {
  prepareIssuePresentation,
  completeIssuePresentation,
} from '@spruceid/didkit-wasm';
import { SignerService } from '../signer';
import { VerifiableCredentialsServiceBase } from './verifiable-credentials-base.service';
import { DomainsService } from '../domains';

export class VerifiableCredentialsServiceWeb extends VerifiableCredentialsServiceBase {
  protected prepareIssueCredential: (
    credential: string,
    linked_data_proof_options: string,
    public_key: string
  ) => Promise<string>;
  protected completeIssueCredential: (
    credential: string,
    preparation: string,
    signature: string
  ) => Promise<string>;
  protected verifyCredential: (
    vc: string,
    proof_options: string
  ) => Promise<string>;

  protected prepareIssuePresentation: (
    presentation: string,
    linked_data_proof_options: string,
    public_key: string
  ) => Promise<string>;
  protected completeIssuePresentation: (
    presentation: string,
    preparation: string,
    signature: string
  ) => Promise<string>;
  protected verifyPresentation: (
    vp: string,
    proof_options: string
  ) => Promise<string>;

  constructor(_signerService: SignerService, domainsService: DomainsService) {
    super(_signerService, domainsService);

    this.completeIssueCredential = completeIssueCredential;
    this.prepareIssueCredential = prepareIssueCredential;
    this.verifyCredential = verifyCredential;

    this.prepareIssuePresentation = prepareIssuePresentation;
    this.completeIssuePresentation = completeIssuePresentation;
    this.verifyPresentation = verifyPresentation;
  }

  static async create(
    signerService: SignerService,
    domainsService: DomainsService
  ) {
    const service = new VerifiableCredentialsServiceWeb(
      signerService,
      domainsService
    );
    return service;
  }
}
