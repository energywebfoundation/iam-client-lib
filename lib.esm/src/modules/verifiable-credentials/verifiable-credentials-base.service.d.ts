import { ICredentialSubject, IPresentationDefinition, SelectResults } from '@sphereon/pex';
import { VerifiableCredential, VerifiablePresentation, Credential, Presentation, ExchangeInvitation, VpRequest, ContinueExchangeCredentials, ContinueExchangeSelections } from '@ew-did-registry/credentials-interface';
import { SignerService } from '../signer';
import { ProofOptions, RoleCredentialSubjectParams, RoleCredentialSubject, CreatePresentationParams, StatusList2021Credential, CredentialRevocationDetailsResult } from './types';
import { CacheClient } from '../cache-client';
/**
 * Service responsible for managing verifiable credentials and presentations.
 * You can read more about verifiable credentials data model [here](https://www.w3.org/TR/vc-data-model/).
 *
 * ```typescript
 * const { verifiableCredentialsService } = await initWithPrivateKeySigner(privateKey, rpcUrl);
 * verifiableCredentialsService.createRoleVC(...);
 * ```
 * */
export declare abstract class VerifiableCredentialsServiceBase {
    protected readonly _signerService: SignerService;
    protected readonly _cacheClient: CacheClient;
    /**
     * Get prepared data for signing a credential.
     *
     * @param {String} credential - The credential object in JSON format
     * @param {String} linked_data_proof_options - The proof options in JSON format
     * @param {String} public_key - Information about public key that credential will be signed in JSON format
     * @returns {Promise<String>} JSON stringified prepared data (including EIP712 types and credential with proof ready for signing)
     */
    protected abstract prepareIssueCredential(credential: string, linked_data_proof_options: string, public_key: string): Promise<string>;
    /**
     * Get verifiable credential object.
     *
     * @param {String} credential - The credential object in JSON format
     * @param {String} preparation - Output of `prepareIssueCredential` method
     * @param {String} signature - Signature of the credential
     * @returns {Promise<String>} verifiable credential object in JSON format
     */
    protected abstract completeIssueCredential(credential: string, preparation: string, signature: string): Promise<string>;
    /**
     * Verify given verifiable credential.
     *
     * @param {String} vc - The verifiable credential object in JSON format
     * @param {String} proof_options - The proof options in JSON format
     * @returns {Promise<String>} object with results of verification  in JSON format
     */
    protected abstract verifyCredential(vc: string, proof_options: string): Promise<string>;
    /**
     * Get prepared data for signing a presentation.
     *
     * @param {String} presentation - The presentation object in JSON format
     * @param {String} linked_data_proof_options - The proof options in JSON format
     * @param {String} public_key - Information about public key that presentation will be signed in JSON format
     * @returns {Promise<String>} JSON stringified prepared data (including EIP712 types and presentation with proof ready for signing)
     */
    protected abstract prepareIssuePresentation(presentation: string, linked_data_proof_options: string, public_key: string): Promise<string>;
    /**
     * Get verifiable presentation object.
     *
     * @param {String} presentation - The presentation object in JSON format
     * @param {String} preparation - Output of `prepareIssuePresentation` method
     * @param {String} signature - Signature of the presentation
     * @returns {Promise<String>} verifiable presentation object in JSON format
     */
    protected abstract completeIssuePresentation(presentation: string, preparation: string, signature: string): Promise<string>;
    /**
     * Verify given verifiable presentation (included verifiable credentials are not verified).
     *
     * @param {String} vp - The verifiable presentation object in JSON format
     * @param {String} proof_options - The proof options in JSON format
     * @returns {Promise<String>} object with results of verification in JSON format
     */
    protected abstract verifyPresentation(vp: string, proof_options: string): Promise<string>;
    constructor(_signerService: SignerService, _cacheClient: CacheClient);
    static create(signerService: SignerService, cacheClient: CacheClient): Promise<VerifiableCredentialsServiceBase>;
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
    initiateExchange({ type, url, }: ExchangeInvitation): Promise<ContinueExchangeSelections>;
    /**
     * @description Sends credentials requested by issuer and returns either issued credentials or next credentials request
     *
     * @param params.vpRequest credentials required to continue exchange
     * @returns issued credentials or request of additional credentials
     */
    continueExchange({ vpRequest: { challenge, interact: { service }, }, credentials, }: ContinueExchangeCredentials<RoleCredentialSubject>): Promise<VerifiablePresentation | VpRequest | undefined>;
    createRoleVC(credentialParams: RoleCredentialSubjectParams, proofOptions?: ProofOptions): Promise<VerifiableCredential<RoleCredentialSubject>>;
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
    createPresentation(verifiableCredential: VerifiableCredential<RoleCredentialSubject>[], options?: CreatePresentationParams): Presentation;
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
    createVerifiablePresentation(verifiableCredential: VerifiableCredential<RoleCredentialSubject>[], options?: ProofOptions): Promise<VerifiablePresentation>;
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
    verify<T extends ICredentialSubject>(vcOrVp: VerifiablePresentation | VerifiableCredential<T>, options?: ProofOptions): Promise<boolean>;
    /**
     * Returns issued role verifiable credentials which matches definition.
     *
     * ```typescript
     * await verifiableCredentialsService.getCredentialsByDefinition(presentationDefinition);
     * ```
     *
     * @param presentationDefinition credential requirements
     * @returns results of matching each role verifiable credential to definition
     */
    getCredentialsByDefinition(presentationDefinition: IPresentationDefinition): Promise<SelectResults>;
    /**
     * Create a credential with given parameters.
     *
     * ```typescript
     * await verifiableCredentialsService.createCredential({
     *     id: 'did:ethr:ewc:0x...00',
     *     namespace: 'root.energyweb.iam.ewc',
     *     version: '1',
     *     issuerFields: [],
     *     expirationDate: new Date(),
     * });
     * ```
     *
     * @param {RoleCredentialSubjectParams} params verifiable credential parameters
     * @returns Energy Web credential
     */
    createCredential(params: RoleCredentialSubjectParams): Credential<RoleCredentialSubject>;
    /**
     * Revoke given verifiable credential with StatusList2021.
     *
     * ```typescript
     * await verifiableCredentialsService.revokeCredential(credential);
     * ```
     *
     * @param {VerifiableCredential<RoleCredentialSubject>} credential verifiable credential
     * @return StatusList2021Credential
     */
    revokeCredential(credential: VerifiableCredential<RoleCredentialSubject>): Promise<StatusList2021Credential>;
    /**
     * Check if given verifiable credential is revoked.
     *
     * ```typescript
     * await verifiableCredentialsService.isRevoked(credential);
     * ```
     *
     * @param {VerifiableCredential<RoleCredentialSubject>} credential verifiable credential
     * @return true if credential is revoked
     */
    isRevoked(credential: VerifiableCredential<RoleCredentialSubject>): Promise<boolean>;
    /**
     * Get the credentials revocation details.
     *
     * ```typescript
     * await verifiableCredentialsService.revocationDetails(credential);
     * ```
     *
     * @param {VerifiableCredential<RoleCredentialSubject>} credential verifiable credential
     * @return revoker and revocationTimeStamp for the revocation
     */
    revocationDetails(credential: VerifiableCredential<RoleCredentialSubject>): Promise<CredentialRevocationDetailsResult | null>;
    /**
     * We have observed that pex may have bugs when dealing with subject_is_issuer credentials
     * and when handling a presentation definition with more than one input descriptor.
     * This could be related to these issues:
     *    - https://github.com/Sphereon-Opensource/pex/issues/96
     *    - https://github.com/Sphereon-Opensource/pex/issues/91
     * We are therefore trying to simplify the input to pex so remove the possibility of it generating incorrect results.
     * Once the above issues are fixed, pex can be updated and perhaps this filtering will not needed.
     *
     * @param {InputDescriptorV1 | InputDescriptorV2} descriptors input descriptors
     * @returns filtered input descriptors
     */
    private filterSelfSignDescriptors;
}
