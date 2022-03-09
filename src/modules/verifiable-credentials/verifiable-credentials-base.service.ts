import { ICredentialSubject, PEX } from '@sphereon/pex';
import { v4 as uuid } from 'uuid';
import { SignerService } from '../signer';
import {
  verifiableCredentialEIP712Types,
  verifiablePresentationEIP712Types,
  verifiablePresentationWithCredentialEIP712Types,
} from './eip712.types';
import {
  VerifiableCredential,
  VerifiablePresentation,
  ProofOptions,
  VerifyVerifiableCredentialResults,
  CreateCredentialParams,
  EWFCredentialSubject,
  Credential,
  Presentation,
  CreatePresentationParams,
} from './verifiable-credentials.types';

export abstract class VerifiableCredentialsServiceBase {
  protected abstract prepareIssueCredential: (
    credential: string,
    linked_data_proof_options: string,
    public_key: string
  ) => Promise<string>;
  protected abstract completeIssueCredential: (
    credential: string,
    preparation: string,
    signature: string
  ) => Promise<string>;
  protected abstract verifyCredential: (
    vc: string,
    proof_options: string
  ) => Promise<string>;

  protected abstract prepareIssuePresentation(
    presentation: string,
    linked_data_proof_options: string,
    public_key: string
  ): Promise<string>;
  protected abstract completeIssuePresentation(
    presentation: string,
    preparation: string,
    signature: string
  ): Promise<string>;
  protected abstract verifyPresentation(
    vp: string,
    proof_options: string
  ): Promise<string>;

  constructor(protected readonly _signerService: SignerService) {}

  static async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    signerService: SignerService
  ): Promise<VerifiableCredentialsServiceBase> {
    throw new Error('Not implemented');
  }

  // TODO: Host EWF VC Context and Vocab
  private createCredential(
    params: CreateCredentialParams
  ): Credential<EWFCredentialSubject> {
    const credential = {
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      id: 'urn:uuid:' + uuid(),
      type: ['VerifiableCredential', 'EWFRole'],
      issuer: this._signerService.didHex,
      issuanceDate: new Date().toISOString(),
      credentialSubject: {
        role: {
          namespace: params.namespace,
          version: params.version,
        },
        issuerFields: params.issuerFields
          ? [
              ...params.issuerFields.map((field) => ({
                ...field,
                value: field.value.toString(),
              })),
            ]
          : [],
        id: params.subject,
      },
    };
    return credential;
  }

  public async createVerifiableCredential(
    credentialOptions: CreateCredentialParams,
    options?: ProofOptions
  ): Promise<VerifiableCredential<EWFCredentialSubject>> {
    const did = this._signerService.didHex;

    const credentialObject = this.createCredential(credentialOptions);
    const proofOptions = {
      verificationMethod: options?.verificationMethod || did + '#controller',
      proofPurpose: options?.proofPurpose || 'assertionMethod',
      eip712Domain: {
        primaryType: 'VerifiableCredential',
        domain: {},
        messageSchema: {
          // TODO: generate types from the credential
          ...verifiableCredentialEIP712Types,
          EIP712Domain: [],
        },
      },
    };

    const keyType = {
      kty: 'EC',
      crv: 'secp256k1',
      alg: 'ES256K-R',
      key_ops: ['signTypedData'],
    };

    const stringifyCredential = JSON.stringify(credentialObject);
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

    return JSON.parse(
      signedCredential
    ) as VerifiableCredential<EWFCredentialSubject>;
  }

  public createPresentation(
    verifiableCredential: VerifiableCredential<EWFCredentialSubject>[],
    options?: CreatePresentationParams
  ): Presentation {
    const did = this._signerService.didHex;
    const pex = new PEX();

    if (options?.presentationDefinition) {
      return {
        ...pex.presentationFrom(
          options.presentationDefinition,
          verifiableCredential,
          did
        ),
        id: 'urn:uuid:' + uuid(),
      } as Presentation;
    }

    return {
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      id: 'urn:uuid:' + uuid(),
      type: ['VerifiablePresentation'],
      holder: did,
      verifiableCredential,
    };
  }

  public async createVerifiablePresentation(
    verifiableCredential: VerifiableCredential<EWFCredentialSubject>[],
    options?: ProofOptions
  ): Promise<VerifiablePresentation> {
    const did = this._signerService.didHex;

    // TODO: generate types from the presentation
    const types = verifiableCredential
      ? verifiablePresentationWithCredentialEIP712Types
      : verifiablePresentationEIP712Types;

    const presentationTemplate = {
      ...this.createPresentation(verifiableCredential),
      proof: {
        '@context': 'https://w3id.org/security/suites/eip712sig-2021/v1',
        type: 'EthereumEip712Signature2021',
        created: new Date().toISOString(),
        verificationMethod: options?.verificationMethod || did + '#controller',
        proofPurpose: options?.proofPurpose || 'authentication',
      },
    };

    const signature = await this._signerService.signTypedData(
      {},
      { ...types },
      presentationTemplate
    );

    return {
      ...presentationTemplate,
      proof: {
        ...presentationTemplate.proof,
        proofValue: signature,
        eip712Domain: {
          domain: {},
          messageSchema: types,
          primaryType: 'VerifiablePresentation',
        },
      },
    };
  }

  public async verify<T extends ICredentialSubject>(
    vp: VerifiablePresentation | VerifiableCredential<T>,
    options?: ProofOptions
  ) {
    let verifyFunc: (vp: string, proof_options: string) => Promise<string>;
    switch (vp.proof.eip712Domain.primaryType) {
      case 'VerifiablePresentation':
        verifyFunc = this.verifyPresentation;
        break;
      case 'VerifiableCredential':
        verifyFunc = this.verifyCredential;
        break;
      default:
        throw new Error(
          'Unsupported verifiable credential or presentation type'
        );
    }

    const verifyResultsString = await verifyFunc(
      JSON.stringify(vp),
      JSON.stringify(options || {})
    );

    const verifyResults = JSON.parse(
      verifyResultsString
    ) as VerifyVerifiableCredentialResults;

    if (verifyResults.errors.length) {
      throw new Error(
        `Verifiable Credential or Presentation is invalid, errors: ${verifyResults.errors.join(
          ', '
        )}`
      );
    }

    if (
      vp.proof.eip712Domain.primaryType === 'VerifiablePresentation' &&
      'verifiableCredential' in vp &&
      vp.verifiableCredential &&
      Array.isArray(vp.verifiableCredential)
    ) {
      const vcsVerification = await Promise.all([
        ...vp.verifiableCredential.map((vc) => this.verify(vc)),
      ]);

      return vcsVerification.every(Boolean);
    }

    return true;
  }
}
