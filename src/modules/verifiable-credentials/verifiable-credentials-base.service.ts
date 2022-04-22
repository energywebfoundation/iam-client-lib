import { ICredentialSubject, PEX } from '@sphereon/pex';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import {
  VerifiableCredential,
  VerifiablePresentation,
  Credential,
  Presentation,
  ExchangeInvitation,
  VC_API_EXCHANGE,
  VpRequest,
  VpRequestQueryType,
  ExchangeResponse,
  ContinueExchangeCredentials,
  ContinueExchangeSelections,
  VpRequestPresentationDefinitionQuery,
} from '@ew-did-registry/credentials-interface';
import { SignerService } from '../signer';
import {
  ProofOptions,
  VerifyVerifiableCredentialResults,
  RoleCredentialSubjectParams,
  RoleCredentialSubject,
  CreatePresentationParams,
  verifiableCredentialEIP712Types,
  verifiablePresentationEIP712Types,
  verifiablePresentationWithCredentialEIP712Types,
} from './types';
import VCStorageClient from './storage-client';
import { ERROR_MESSAGES } from '../../errors';

export abstract class VerifiableCredentialsServiceBase {
  /**
   * @param {string} credential - The credential object in JSON format
   * @param {string} linked_data_proof_options - The proof options in JSON format
   * @param {string} public_key - Information about public key that credential will be signed in JSON format
   * @description get prepared data for signing a credential
   * @returns {Promise<string>} JSON stringified prepared data (including EIP712 types and credential with proof ready for signing)
   */
  protected abstract prepareIssueCredential(
    credential: string,
    linked_data_proof_options: string,
    public_key: string
  ): Promise<string>;

  /**
   * @param {string} credential - The credential object in JSON format
   * @param {string} preparation - Output of `prepareIssueCredential` method
   * @param {string} signature - Signature of the credential
   * @description get verifiable credential object
   * @returns {Promise<string>} verifiable credential object in JSON format
   */
  protected abstract completeIssueCredential(
    credential: string,
    preparation: string,
    signature: string
  ): Promise<string>;

  /**
   * @param {string} vc - The verifiable credential object in JSON format
   * @param {string} proof_options - The proof options in JSON format
   * @description verify given verifiable credential
   * @returns {Promise<string>} object with results of verification  in JSON format
   */
  protected abstract verifyCredential(
    vc: string,
    proof_options: string
  ): Promise<string>;

  /**
   * @param {string} presentation - The presentation object in JSON format
   * @param {string} linked_data_proof_options - The proof options in JSON format
   * @param {string} public_key - Information about public key that presentation will be signed in JSON format
   * @description get prepared data for signing a presentation
   * @returns {Promise<string>} JSON stringified prepared data (including EIP712 types and presentation with proof ready for signing)
   */
  protected abstract prepareIssuePresentation(
    presentation: string,
    linked_data_proof_options: string,
    public_key: string
  ): Promise<string>;

  /**
   * @param {string} presentation - The presentation object in JSON format
   * @param {string} preparation - Output of `prepareIssuePresentation` method
   * @param {string} signature - Signature of the presentation
   * @description get verifiable presentation object
   * @returns {Promise<string>} verifiable presentation object in JSON format
   */
  protected abstract completeIssuePresentation(
    presentation: string,
    preparation: string,
    signature: string
  ): Promise<string>;

  /**
   * @param {string} vp - The verifiable presentation object in JSON format
   * @param {string} proof_options - The proof options in JSON format
   * @description verify given verifiable presentation (included verifiable credentials are not verified)
   * @returns {Promise<string>} object with results of verification in JSON format
   */
  protected abstract verifyPresentation(
    vp: string,
    proof_options: string
  ): Promise<string>;

  constructor(
    protected readonly _signerService: SignerService,
    private readonly _storage: VCStorageClient
  ) {}

  /**
   * @description The type of the exchange. Only vc-api exchanges currently supported.
   * @returns credentials query with matching verifiable presentations
   */
  async initiateExchange({
    type,
    url,
  }: ExchangeInvitation): Promise<ContinueExchangeSelections> {
    if (type !== VC_API_EXCHANGE) {
      throw new Error('Only VC-API exchange is supported');
    }

    const { data: vpRequest } = await axios.post<VpRequest>(url);
    const credentialQuery = vpRequest.query.find(
      (q) => q.type === VpRequestQueryType.presentationDefinition
    )?.credentialQuery as VpRequestPresentationDefinitionQuery[];

    return Promise.all(
      credentialQuery.map(async ({ presentationDefinition }) => {
        const selectResults =
          await this._storage.getCredentialsByPresentationDefinition(
            presentationDefinition
          );
        return {
          presentationDefinition,
          selectResults,
        };
      })
    );
  }

  /**
   * @description Sends credentials requested by issuer and returns either issued credentials or next credentials request
   *
   * @param params.vpRequest credentials required to continue exchange
   * @returns issued credentials or request of additional credentials
   */
  public async continueExchange({
    vpRequest: {
      challenge,
      interact: { service },
    },
    credentials,
  }: ContinueExchangeCredentials<RoleCredentialSubject>) {
    const requiredPresentation = await this.createVerifiablePresentation(
      credentials,
      {
        challenge,
      }
    );

    const {
      data: { errors, vpRequest: nextVpRequest, vp: requestedPresentation },
    } = await axios.put<ExchangeResponse>(service[0].serviceEndpoint, {
      presentation: requiredPresentation,
    });
    if (errors.length > 0) {
      console.dir(errors, { depth: 20 });
      throw new Error(ERROR_MESSAGES.ERROR_CONTINUING_EXCHANGE);
    }
    if (nextVpRequest) {
      return nextVpRequest;
    }
    return requestedPresentation;
  }

  // * Should be overridden by the implementation
  static async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    signerService: SignerService,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    storage: VCStorageClient
  ): Promise<VerifiableCredentialsServiceBase> {
    throw new Error('Not implemented');
  }

  // TODO: Host EWF VC Context and Vocab
  private createCredential(
    params: RoleCredentialSubjectParams
  ): Credential<RoleCredentialSubject> {
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
        id: params.id,
      },
    };
    return credential;
  }

  public async createRoleVC(
    credentialParams: RoleCredentialSubjectParams,
    proofOptions?: ProofOptions
  ): Promise<VerifiableCredential<RoleCredentialSubject>> {
    const did = this._signerService.didHex;

    const credentialObject = this.createCredential(credentialParams);
    const proofOptionsObject = {
      verificationMethod:
        proofOptions?.verificationMethod || did + '#controller',
      proofPurpose: proofOptions?.proofPurpose || 'assertionMethod',
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
      JSON.stringify(proofOptionsObject),
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
    ) as VerifiableCredential<RoleCredentialSubject>;
  }

  public createPresentation(
    verifiableCredential: VerifiableCredential<RoleCredentialSubject>[],
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
    verifiableCredential: VerifiableCredential<RoleCredentialSubject>[],
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
    switch (vp.type.includes('VerifiablePresentation')) {
      case true:
        verifyFunc = this.verifyPresentation;
        break;
      case false:
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
      vp.type.includes('VerifiablePresentation') &&
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
