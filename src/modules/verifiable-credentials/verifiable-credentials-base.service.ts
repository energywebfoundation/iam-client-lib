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
  verifiablePresentationWithCredentialEIP712Types,
} from './types';
import { ERROR_MESSAGES } from '../../errors';

/**
 * Service responsible for managing verifiable credentials and presentations.
 * You can read more about verifiable credentials data model [here](https://www.w3.org/TR/vc-data-model/).
 *
 * ```typescript
 * const { connectToCacheServer } = await initWithPrivateKeySigner(privateKey, rpcUrl);
 * const { connectToDidRegistry } = await connectToCacheServer();
 * const { verifiableCredentialsService } = await connectToDidRegistry();
 * verifiableCredentialsService.createRoleVC(...);
 * ```
 * */
export abstract class VerifiableCredentialsServiceBase {
  /**
   * Get prepared data for signing a credential.
   *
   * @param {String} credential - The credential object in JSON format
   * @param {String} linked_data_proof_options - The proof options in JSON format
   * @param {String} public_key - Information about public key that credential will be signed in JSON format
   * @returns {Promise<String>} JSON stringified prepared data (including EIP712 types and credential with proof ready for signing)
   */
  protected abstract prepareIssueCredential(
    credential: string,
    linked_data_proof_options: string,
    public_key: string
  ): Promise<string>;

  /**
   * Get verifiable credential object.
   *
   * @param {String} credential - The credential object in JSON format
   * @param {String} preparation - Output of `prepareIssueCredential` method
   * @param {String} signature - Signature of the credential
   * @returns {Promise<String>} verifiable credential object in JSON format
   */
  protected abstract completeIssueCredential(
    credential: string,
    preparation: string,
    signature: string
  ): Promise<string>;

  /**
   * Verify given verifiable credential.
   *
   * @param {String} vc - The verifiable credential object in JSON format
   * @param {String} proof_options - The proof options in JSON format
   * @returns {Promise<String>} object with results of verification  in JSON format
   */
  protected abstract verifyCredential(
    vc: string,
    proof_options: string
  ): Promise<string>;

  /**
   * Get prepared data for signing a presentation.
   *
   * @param {String} presentation - The presentation object in JSON format
   * @param {String} linked_data_proof_options - The proof options in JSON format
   * @param {String} public_key - Information about public key that presentation will be signed in JSON format
   * @returns {Promise<String>} JSON stringified prepared data (including EIP712 types and presentation with proof ready for signing)
   */
  protected abstract prepareIssuePresentation(
    presentation: string,
    linked_data_proof_options: string,
    public_key: string
  ): Promise<string>;

  /**
   * Get verifiable presentation object.
   *
   * @param {String} presentation - The presentation object in JSON format
   * @param {String} preparation - Output of `prepareIssuePresentation` method
   * @param {String} signature - Signature of the presentation
   * @returns {Promise<String>} verifiable presentation object in JSON format
   */
  protected abstract completeIssuePresentation(
    presentation: string,
    preparation: string,
    signature: string
  ): Promise<string>;

  /**
   * Verify given verifiable presentation (included verifiable credentials are not verified).
   *
   * @param {String} vp - The verifiable presentation object in JSON format
   * @param {String} proof_options - The proof options in JSON format
   * @returns {Promise<String>} object with results of verification in JSON format
   */
  protected abstract verifyPresentation(
    vp: string,
    proof_options: string
  ): Promise<string>;

  constructor(protected readonly _signerService: SignerService) {}

  // * Should be overridden by the implementation
  static async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    signerService: SignerService
  ): Promise<VerifiableCredentialsServiceBase> {
    throw new Error('Not implemented');
  }

  /**
   * Initialize credential exchange. Only vc-api exchanges currently supported.
   *
   * ```typescript
   * verifiableCredentialsService.initiateExchange({
   *     type: VC_API_EXCHANGE,
   *     url: 'http://localhost:3000',
   * });
   * ```
   * @param {ExchangeInvitation} options object with options
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
        // TODO
        const selectResults = {} as any;
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

  /* Create a Energy Web role verifiable credential with EIP712 signature.
   *
   * ```typescript
   * verifiableCredentialsService.createRoleVC({
   *      id: 'did:ethr:volta:0x00...0',
   *      namespace: 'root.roles.energyweb.iam.ewc',
   *      version: '1',
   * });
   * ```
   * @param {RoleCredentialSubjectParams} credentialParams role credential parameters
   * @param {ProofOptions} proofOptions proof options
   * @returns verifiable credential object
   */
  public async createRoleVC(
    credentialParams: RoleCredentialSubjectParams,
    proofOptions?: ProofOptions
  ): Promise<VerifiableCredential<RoleCredentialSubject>> {
    const did = this._signerService.didHex;

    const credentialObject = this.createCredential(credentialParams);
    const eip712MessageSchema = {
      // TODO: generate types from the credential
      ...JSON.parse(JSON.stringify(verifiableCredentialEIP712Types)),
      EIP712Domain: [],
    };

    if (credentialParams?.expirationDate) {
      eip712MessageSchema.VerifiableCredential.push({
        name: 'expirationDate',
        type: 'string',
      });
    }

    const proofOptionsObject = {
      verificationMethod:
        proofOptions?.verificationMethod || did + '#controller',
      proofPurpose: proofOptions?.proofPurpose || 'assertionMethod',
      eip712Domain: {
        primaryType: 'VerifiableCredential',
        domain: {},
        messageSchema: eip712MessageSchema,
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

  /**
   * Create a presentation with given verifiable credentials. Allow create presentation for a given presentation definition.
   *
   * ```typescript
   * verifiableCredentialsService.createPresentation([...credentials]);
   * ```
   * @param {VerifiableCredential<RoleCredentialSubject>[]} verifiableCredential role credential parameters
   * @param {CreatePresentationParams} options presentation options
   * @returns presentation
   */
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

  /**
   * Create a verifiable presentation with given verifiable credentials and EIP712 signature.
   *
   * ```typescript
   * verifiableCredentialsService.createVerifiablePresentation([...credentials]);
   * ```
   * @param {VerifiableCredential<RoleCredentialSubject>[]} verifiableCredential role credential parameters
   * @param {ProofOptions} options proof options
   * @returns verifiable presentation
   */
  public async createVerifiablePresentation(
    verifiableCredential: VerifiableCredential<RoleCredentialSubject>[],
    options?: ProofOptions
  ): Promise<VerifiablePresentation> {
    const did = this._signerService.didHex;

    // TODO: generate types from the presentation
    const types: typeof verifiablePresentationWithCredentialEIP712Types =
      JSON.parse(
        JSON.stringify(verifiablePresentationWithCredentialEIP712Types)
      );

    const { oneVCHasExpirationDate, allVCHaveExpirationDate } =
      verifiableCredential.reduce(
        (acc, vc) => {
          const hasExpirationDate = !!vc.expirationDate;
          return {
            oneVCHasExpirationDate:
              acc.oneVCHasExpirationDate || hasExpirationDate,
            allVCHaveExpirationDate:
              acc.allVCHaveExpirationDate && hasExpirationDate,
          };
        },
        {
          oneVCHasExpirationDate: false,
          allVCHaveExpirationDate: true,
        }
      );

    if (oneVCHasExpirationDate && !allVCHaveExpirationDate) {
      throw new Error(
        'Expected all Verifiable Credential to have expiration date'
      );
    }

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

    if (allVCHaveExpirationDate) {
      types.VerifiableCredential.push({
        name: 'expirationDate',
        type: 'string',
      });
    }

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

  /**
   * Verify a given credential or presentation. Throws an error if the credential or presentation proof is not valid.
   *
   * ```typescript
   * await verifiableCredentialsService.verify(credential);
   * await verifiableCredentialsService.verify(presentation);
   * ```
   * @param {VerifiablePresentation | VerifiableCredential} vp verifiable presentation or credential
   * @param {ProofOptions} options proof options
   * @returns true if the proof is valid
   */
  public async verify<T extends ICredentialSubject>(
    vp: VerifiablePresentation | VerifiableCredential<T>,
    options?: ProofOptions
  ): Promise<boolean> {
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
      vp.type.includes('VerifiableCredential') &&
      'expirationDate' in vp &&
      vp.expirationDate
    ) {
      const expirationDate = new Date(vp.expirationDate).getTime();
      const currentDate = Date.now();

      if (expirationDate < currentDate) {
        throw new Error(`Verifiable Credential is expired.`);
      }
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

  /**
   * Create a credential with given parameters.
   *
   * @param {RoleCredentialSubjectParams} params verifiable presentation or credential
   * @returns Energy Web credential
   */
  private createCredential(
    params: RoleCredentialSubjectParams
  ): Credential<RoleCredentialSubject> {
    const credential: Credential<RoleCredentialSubject> = {
      // TODO: Host EWF VC Context and Vocabulary
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

    if (params.expirationDate) {
      credential.expirationDate = params.expirationDate.toISOString();
    }

    return credential;
  }
}
