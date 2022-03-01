import { SignerService } from '../signer';
import {
  SignedVerifiableCredential,
  SignVerifiableCredentialOptions,
  VerifiableCredential,
  VerifyVerifiableCredentialOptions,
  VerifyVerifiableCredentialResults,
} from './verifiableCredentials.types';

export abstract class VerifiableCredentialsServiceBase {
  abstract prepareIssueCredential: (
    credential: string,
    linked_data_proof_options: string,
    public_key: string
  ) => Promise<string>;
  abstract completeIssueCredential: (
    credential: string,
    preparation: string,
    signature: string
  ) => Promise<string>;
  abstract verifyCredential: (
    vc: string,
    proof_options: string
  ) => Promise<string>;

  constructor(protected readonly _signerService: SignerService) {}

  static async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    signerService: SignerService
  ): Promise<VerifiableCredentialsServiceBase> {
    throw new Error('Not implemented');
  }

  public async verifyVerifiableCredential<T>(
    vc: SignedVerifiableCredential<T>,
    options?: VerifyVerifiableCredentialOptions
  ) {
    const verifyResultsString = await this.verifyCredential(
      JSON.stringify(vc),
      JSON.stringify(options || {})
    );

    const verifyResults = JSON.parse(
      verifyResultsString
    ) as VerifyVerifiableCredentialResults;

    if (verifyResults.errors.length) {
      throw new Error(
        `Verifiable Credential is invalid, errors: ${verifyResults.errors.join(
          ', '
        )}`
      );
    }

    return true;
  }

  public async signVerifiableCredential<T>(
    credential: VerifiableCredential<T>,
    options?: SignVerifiableCredentialOptions
  ) {
    const did = credential.issuer;

    const proofOptions = {
      verificationMethod: options?.verificationMethod || did + '#controller',
      proofPurpose: options?.proofPurpose || 'assertionMethod',
      eip712Domain: {
        primaryType: 'VerifiableCredential',
        domain: {
          name: 'EWF Verifiable Credential',
          ...options?.domain,
        },
        messageSchema: {
          EIP712Domain: [{ name: 'name', type: 'string' }],
          VerifiableCredential: [
            { name: '@context', type: 'string[]' },
            { name: 'id', type: 'string' },
            { name: 'type', type: 'string[]' },
            { name: 'issuer', type: 'string' },
            { name: 'issuanceDate', type: 'string' },
            { name: 'credentialSubject', type: 'CredentialSubject' },
            { name: 'proof', type: 'Proof' },
          ],
          CredentialSubject: [
            { name: 'address', type: 'string' },
            { name: 'sameAs', type: 'string' },
          ],
          Proof: [
            { name: '@context', type: 'string' },
            { name: 'verificationMethod', type: 'string' },
            { name: 'created', type: 'string' },
            { name: 'proofPurpose', type: 'string' },
            { name: 'type', type: 'string' },
          ],
        },
      },
    };

    const keyType = {
      kty: 'EC',
      crv: 'secp256k1',
      alg: 'ES256K-R',
      key_ops: ['signTypedData'],
    };

    const stringifyCredential = JSON.stringify(credential);
    const preparedVC = await this.prepareIssueCredential(
      stringifyCredential,
      JSON.stringify(proofOptions),
      JSON.stringify(keyType)
    );
    const preparation = JSON.parse(preparedVC);

    const typedData = preparation.signingInput;
    if (!typedData || !typedData.primaryType) {
      throw new Error('Expected EIP-712 TypedData');
    }

    delete typedData.types['EIP712Domain'];

    const signature = await this._signerService.signTypedData(
      typedData.domain,
      typedData.types,
      typedData.message
    );

    const signedCredential = await this.completeIssueCredential(
      stringifyCredential,
      preparedVC,
      signature
    );

    return JSON.parse(signedCredential) as SignedVerifiableCredential<T>;
  }
}
