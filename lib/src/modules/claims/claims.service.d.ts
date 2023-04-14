import { RoleCredentialSubject } from '@energyweb/credential-governance';
import { VerifiableCredential } from '@ew-did-registry/credentials-interface';
import { Algorithms } from '@ew-did-registry/jwt';
import { IServiceEndpoint } from '@ew-did-registry/did-resolver-interface';
import { CacheClient } from '../cache-client/cache-client.service';
import { DomainsService } from '../domains/domains.service';
import { SignerService } from '../signer/signer.service';
import { Claim, GetClaimsByRequesterOptions, GetClaimsByIssuerOptions, GetClaimsBySubjectOptions, CreateClaimRequestOptions, IssueClaimRequestOptions, RegisterOnchainOptions, RejectClaimRequestOptions, DeleteClaimOptions, IssueClaimOptions, PublishPublicClaimOptions, CreateSelfSignedClaimOptions, GetUserClaimsOptions, RevokeClaimOptions, RevokeMultipleClaimOptions, IsClaimRevokedOptions, ClaimRevocationDetailsOptions, ClaimRevocationDetailsResult, GetClaimsByRevokerOptions, CredentialVerificationResult } from './claims.types';
import { RoleEIP191JWT } from '@energyweb/vc-verification';
import { DidRegistry } from '../did-registry/did-registry.service';
import { ClaimData } from '../did-registry/did.types';
import { VerifiableCredentialsServiceBase } from '../verifiable-credentials';
/**
 * Service responsible for handling the request and issuance of claims.
 * See more information about claims in IAM stack [here](../../../docs/guides/claim.md).
 *
 * ```typescript
 * const { connectToCacheServer } = await initWithPrivateKeySigner(privateKey, rpcUrl);
 * const { connectToDidRegistry } = await connectToCacheServer();
 * const { claimsService } = await connectToDidRegistry();
 * claimsService.getClaimById(claim.id);
 * ```
 */
export declare class ClaimsService {
    private _signerService;
    private _domainsService;
    private _cacheClient;
    private _didRegistry;
    private _verifiableCredentialService;
    private _claimManager;
    private _claimManagerInterface;
    private _claimRevocation;
    private _issuerVerification;
    private _issuerResolver;
    private _credentialResolver;
    private _statusVerifier;
    constructor(_signerService: SignerService, _domainsService: DomainsService, _cacheClient: CacheClient, _didRegistry: DidRegistry, _verifiableCredentialService: VerifiableCredentialsServiceBase);
    static create(signerService: SignerService, domainsService: DomainsService, cacheClient: CacheClient, didRegistry: DidRegistry, verifiableCredentialService: VerifiableCredentialsServiceBase): Promise<ClaimsService>;
    init(): Promise<void>;
    /**
     * A utility function to check the blockchain directly if a DID has a role.
     *
     * ```typescript
     * claimsService.hasOnChainRole('did:ethr:ewc:0x00...0', 'email.roles.iam.ewc', 1);
     * ```
     *
     * @param {string} did The ethr DID to check
     * @param {string} role The role to check (the full namespace)
     * @param {number} version The version to check
     * @return `true` if DID has role at the version. `false` if not.
     */
    hasOnChainRole(did: string, role: string, version: number): Promise<boolean>;
    /**
     * Retrieve claims related to a given subjects.
     *
     * ```typescript
     * claimsService.getClaimsBySubjects(['did:ethr:0x00...0', 'did:ethr:0x00...1', ...]);
     * ```
     *
     * @param {Array<string>} subjects list of subjects
     * @returns list of claims
     */
    getClaimsBySubjects(subjects: string[]): Promise<Claim[]>;
    /**
     * Retrieve claims requested by a given requester with allowing filter by status and parent namespace.
     *
     * ```typescript
     * claimsService.getClaimsByRequester({
     *     did: 'did:ethr:0x00...0',
     *     isAccepted: false,
     *     namespace: 'energyweb.iam.ewc',
     * });
     * ```
     *
     * @param {GetClaimsByRequesterOptions} options object containing options
     * @returns list of claims
     */
    getClaimsByRequester({ did, isAccepted, namespace, }: GetClaimsByRequesterOptions): Promise<Claim[]>;
    /**
     * Retrieve claims issued by a given issuer with allowing filter by status and parent namespace.
     *
     * ```typescript
     * claimsService.getClaimsByIssuer({
     *     did: 'did:ethr:0x00...0',
     *     isAccepted: false,
     *     namespace: 'energyweb.iam.ewc',
     * });
     * ```
     *
     * @param {GetClaimsByIssuerOptions} options object containing options
     * @returns list of claims
     */
    getClaimsByIssuer({ did, isAccepted, namespace, }: GetClaimsByIssuerOptions): Promise<Claim[]>;
    /**
     * Retrieve claims for given subject with allowing filter by status and parent namespace.
     *
     * ```typescript
     * claimsService.getClaimsBySubject({
     *     did: 'did:ethr:0x00...0',
     *     isAccepted: false,
     *     namespace: 'energyweb.iam.ewc',
     * });
     * ```
     *
     * @param {GetClaimsBySubjectOptions} options object containing options
     * @returns list of claims
     */
    getClaimsBySubject({ did, isAccepted, namespace, }: GetClaimsBySubjectOptions): Promise<Claim[]>;
    /**
     * Retrieve all claims that a user can revoke. Allow to filter by namespace
     *
     * ```typescript
     * claimsService.getClaimsByRevoker({
     *  did: 'did:ethr:0x00...0',
     *  namespace: 'energyweb.iam.ewc',
     * });
     * ```
     *
     * @param {GetClaimsByRevokerOptions} options
     * @return list of claims
     */
    getClaimsByRevoker({ did, namespace, }: GetClaimsByRevokerOptions): Promise<Claim[]>;
    /**
     * Retrieve claim with given id.
     *
     * ```typescript
     * const claimId = '7281a130-e2b1-430d-8c14-201010eae901';
     * claimsService.getClaimById(claimId);
     * ```
     *
     * @param {string} claimId claim id
     * @return claim with given id
     */
    getClaimById(claimId: string): Promise<Claim | undefined>;
    /**
     * Allows subject to request for credential by creating and sending a claim request to claim issuer.
     *
     * ```typescript
     * claimsService.createClaimRequest({
     *     claim: {
     *          claimType: 'email.roles.energyweb.iam.ewc',
     *          claimTypeVersion: 1,
     *          requestorFields: [{key: 'foo', value: 'bar'}],
     *     };
     *     subject: 'did:ethr:0x00...0',
     *     registrationTypes: [RegistrationTypes.OnChain, RegistrationTypes.OffChain]
     * });
     * ```
     *
     * @param {CreateClaimRequestOptions} options object containing options
     */
    createClaimRequest({ claim, subject, registrationTypes, }: CreateClaimRequestOptions): Promise<void>;
    /**
     * Issue a claim request by signing both off-chain and on-chain request and persisting result to the cache-server.
     * Optionally, issue on-chain role can be submitted to the ClaimManager contract as well.
     * If `credentialStatus` is not overridden then status from ssi-hub will be set.
     *
     * ```typescript
     * const claim: Claim = await claimsService.getClaimById('7281a130-e2b1-430d-8c14-201010eae901');
     * claimsService.issueClaimRequest({
     *     requester: claim.requester,
     *     token: claim.token,
     *     id: claim.id,
     *     subjectAgreement: claim.subjectAgreement,
     *     registrationTypes: claim.registrationTypes;
     *     issuerFields: [{key: 'foo', value: 'bar'}],
     *     publishOnChain: false,
     * });
     * ```
     *
     * @param {IssueClaimRequestOptions} options object containing options
     */
    issueClaimRequest({ requester, token, id: requestId, subjectAgreement, registrationTypes, issuerFields, publishOnChain, credentialStatusOverride, expirationTimestamp, }: IssueClaimRequestOptions): Promise<void>;
    /**
     * Register issued on-chain claim on Claim Manager contract Can be used by asset owners to register credentials on-chain for their assets.
     *
     * ```typescript
     * const claim: Claim = await claimsService.getClaimById('7281a130-e2b1-430d-8c14-201010eae901');
     * claimsService.registerOnchain({
     *     claimType: claim.claimType,
     *     claimTypeVersion: claim.claimTypeVersion,
     *     subjectAgreement: claim.subjectAgreement,
     *     onChainProof: claim.onChainProof,
     *     acceptedBy: claim.acceptedBy;
     *     subject: claim.subject,
     * });
     * ```
     *
     * @param {RegisterOnchainOptions} claim object containing options
     */
    registerOnchain(claim: RegisterOnchainOptions): Promise<void>;
    /**
     * Reject claim request.
     *
     * ```typescript
     * const claim: Claim = await claimsService.getClaimById('7281a130-e2b1-430d-8c14-201010eae901');
     * claimsService.rejectClaimRequest({
     *     id: claim.id,
     *     requesterDID: claim.requester,
     *     rejectionReason: 'some reason',
     * });
     * ```
     *
     * @param {RejectClaimRequestOptions} options object containing options
     */
    rejectClaimRequest({ id: rejectClaimRequestId, requesterDID, rejectionReason, }: RejectClaimRequestOptions): Promise<void>;
    /**
     * Delete claim request. Works only for pending claims (not issued or rejected).
     *
     * ```typescript
     * claimsService.deleteClaim({
     *     id: '7281a130-e2b1-430d-8c14-201010eae901',
     * });
     * ```
     *
     * @param {DeleteClaimOptions} options object containing options
     */
    deleteClaim({ id: deleteClaimId }: DeleteClaimOptions): Promise<void>;
    /**
     * Issue claim without previous request. Option available for issuers only.
     * If `credentialStatus` is not overridden then status from ssi-hub will be set.
     *
     * ```typescript
     * claimsService.issueClaim({
     *     claim: {
     *          claimType: 'email.roles.energyweb.iam.ewc',
     *          claimTypeVersion: 1,
     *          issuerFields: [{key: 'foo', value: 'bar'}],
     *     };
     *     subject: 'did:ethr:0x00...0',
     *     registrationTypes: [RegistrationTypes.OnChain, RegistrationTypes.OffChain]
     * });
     * ```
     *
     * @param {IssueClaimOptions} options object containing options
     * @return Issued token if registrationTypes includes RegistrationTypes.OffChain
     */
    issueClaim({ subject, registrationTypes, claim, credentialStatusOverride, expirationTimestamp, }: IssueClaimOptions): Promise<string | undefined>;
    /**
     * Generates claim id or returns id of existing claim with same data
     * @param {ClaimData} param.claimData - claim data
     * @returns claim identifier
     */
    getClaimId({ claimData }: {
        claimData: ClaimData;
    }): Promise<string>;
    /**
     * Register role to claim manager contract if registrationTypes includes RegistrationTypes.OnChain
     * Publish role to IPFS and add DID document service if registrationTypes includes RegistrationTypes.OffChain
     *
     * ```typescript
     * const claim: Claim = await claimsService.getClaimById('7281a130-e2b1-430d-8c14-201010eae901');
     * claimsService.publishPublicClaim({
     *     claim: {
     *          token: claim.token,
     *          claimType: claim.claimType,
     *     };
     *     registrationTypes: claim.registrationTypes,
     * });
     * ```
     *
     * @param {PublishPublicClaimOptions} options object containing options
     * @return URl to IPFS if registrationTypes includes RegistrationTypes.OffChain
     */
    publishPublicClaim({ token, // backward compatibility
    registrationTypes, claim, }: PublishPublicClaimOptions): Promise<string | undefined>;
    /**
     * Creates self signed off-chain claim with `data` and adds it to `subject` document. Signer must own or control subject.
     *
     * ```typescript
     * claimsService.createSelfSignedClaim({
     *     data: {
     *          claimType: 'email.roles.energyweb.iam.ewc',
     *          claimTypeVersion: 1,
     *          issuerFields: [{key: 'foo', value: 'bar'}],
     *          profile: {
     *              name: 'John Doe',
     *              birthdate: '1990-01-01',
     *              address: '123 Main St',
     *          },
     *     },
     *     subject: 'did:ethr:volta:0x00...0',
     * });
     * ```
     *
     * @param {CreateSelfSignedClaimOptions} options object containing options
     * @return URl to IPFS
     */
    createSelfSignedClaim({ data, subject, }: CreateSelfSignedClaimOptions): Promise<string>;
    /**
     * Get published off-chain claims of the given subject.
     *
     * ```typescript
     * claimsService.getUserClaims({
     *     did: 'did:ethr:0x00...0',
     * });
     * ```
     *
     * @param {GetUserClaimsOptions} options object containing options
     * @returns Claims containing DID document service endpoints
     */
    getUserClaims({ did, }: GetUserClaimsOptions): Promise<(IServiceEndpoint & Pick<ClaimData, 'claimType' | 'claimTypeVersion'>)[]>;
    /**
     * Create a public claim to prove identity.
     *
     * ```typescript
     * claimsService.createIdentityProof();
     * ```
     *
     * @return JWT token of created identity
     */
    createIdentityProof(): Promise<string>;
    /**
     * Create a public claim to prove identity.
     *
     * ```typescript
     * claimsService.createDelegateProof(
     *     '245a40a9...776071ca57cec',
     *     'did:ethr:0x00...0',
     *     Algorithms.EIP191,
     * );
     * ```
     *
     * @param {String} delegateKey Private key of the delegate in hexadecimal format
     * @param {String} identity DID of the delegate
     * @param {String} algorithm Algorithm used to sign the delegate (EIP191 and ES256 available)
     *
     * @return JWT token of delegate
     */
    createDelegateProof(delegateKey: string, identity: string, algorithm?: Algorithms): Promise<string>;
    /**
     * Get `namespace` from claim type.
     *
     * ```typescript
     * claimsService.getNamespaceFromClaimType(
     *     'email.roles.energyweb.iam.ewc'
     * );
     * ```
     *
     * @param {String} claimType Private key of the delegate in hexadecimal format
     *
     * @return Namespace of given claim type
     */
    getNamespaceFromClaimType(claimType: string): string;
    /**
     * Revoke On-Chain issued claim by `claimId` or given `namespace` and `subject`. Required `claimId` or `claim` parameters.
     *
     * ```typescript
     * claimsService.revokeClaim({
     *     claim: {
     *         namespace: 'root.roles.energyweb.iam.ewc',
     *         subject: 'did:ethr:volta:0x00...0',
     *     },
     *     registrationTypes = [RegistrationTypes.OnChain, RegistrationTypes.OffChain],
     * });
     * ```
     * or
     * ```typescript
     * claimsService.revokeClaim({
     *     claimId: claim.id,
     *     registrationTypes = [RegistrationTypes.OnChain, RegistrationTypes.OffChain],
     * });
     * ```
     *
     * @param {RevokeClaimOptions} options object containing options
     * @return true if claim was revoked
     */
    revokeClaim(options: RevokeClaimOptions): Promise<boolean>;
    /**
     * Revoke On-Chain issued claims of the given namespace for multiple subjects. Namespace must be the same for all subjects.
     * Specify `claims` or `claimIds` parameters.
     *
     * ```typescript
     * claimsService.revokeMultipleClaim({
     *     claims: [{
     *         namespace: 'root.roles.energyweb.iam.ewc',
     *         subject: 'did:ethr:volta:0x00...0',
     *         registrationTypes = [RegistrationTypes.OnChain, RegistrationTypes.OffChain],
     *     },
     *     {
     *         namespace: 'root.roles.energyweb.iam.ewc',
     *         subject: 'did:ethr:volta:0x00...1',
     *         registrationTypes = [RegistrationTypes.OnChain],
     *     }],
     * });
     * ```
     * or
     * ```typescript
     * claimsService.revokeMultipleClaim({
     *     claimIds: ['245a40a9...776071ca57cec', '245a40a9...776071ca57cec'],
     * });
     * ```
     *
     * @param {RevokeMultipleClaimOptions} options object containing options
     */
    revokeMultipleClaim({ claimIds, claims, }: RevokeMultipleClaimOptions): Promise<void>;
    /**
     * Check if On-Chain claim is revoked.
     *
     * ```typescript
     * claimsService.isClaimRevoked({
     *     claim: {
     *         namespace: 'root.roles.energyweb.iam.ewc',
     *         subject: 'did:ethr:volta:0x00...0',
     *     },
     * });
     * ```
     * or
     * ```typescript
     * claimsService.isClaimRevoked({
     *     claimId: claim.id,
     * });
     * ```
     *
     * @param {IsClaimRevokedOptions} options object containing options
     * @return true if claim is revoked
     */
    isClaimRevoked(options: IsClaimRevokedOptions): Promise<boolean>;
    /**
     * Get the revocation details for a subject's On-Chain claim. Returns the revoker and revocationTimeStamp for the revocation.
     *
     * ```typescript
     * claimsService.claimRevocationDetails({
     *     claim: {
     *         namespace: 'root.roles.energyweb.iam.ewc',
     *         subject: 'did:ethr:volta:0x00...0',
     *     },
     * });
     * ```
     * or
     * ```typescript
     * claimsService.claimRevocationDetails({
     *     claimId: claim.id,
     * });
     * ```
     *
     * @param {ClaimRevocationDetailsOptions} options object containing options
     * @return revocation details
     */
    claimRevocationDetails(options: ClaimRevocationDetailsOptions): Promise<ClaimRevocationDetailsResult | undefined>;
    /**
     * Pick up the claim from the params and return the claim data.
     * Choose `claimId` first, then `claim`. Throw an error if both are missing.
     *
     * @param {GetRevocationClaimDetailsOptions} data claim data or claim id
     * @return claim data
     */
    private getRevocationClaimDetails;
    /**
     * Remove `fields` from claim data.
     *
     * @param {ClaimData} data Claim data to remove fields from
     * @return Claim data without fields
     */
    private stripClaimData;
    /**
     * Validates publish public claim parameters depending on off-chain or on-chain registration type. Throws relevant error on invalid data.
     *
     * @param {Array<RegistrationTypes>} registrationTypes Registration types of the claim
     * @param {Object} claim `token` and `claimType` of the claim
     */
    private validatePublishPublicClaimRequest;
    /**
     * Verify if the user is an authorized issuer of a role
     *
     * @param {String} role Registration types of the claim
     */
    private verifyIssuer;
    /**
     * Verify claim request prerequisites for given role and subject. Throws relevant error on invalid data.
     *
     * @param {VerifyEnrolmentPrerequisitesOptions} options object containing options
     */
    private verifyEnrolmentPrerequisites;
    /**
     * Create verifiable credential and wrap it into verifiable presentation.
     *
     * @param {VerifyEnrolmentPrerequisitesOptions} options object containing options
     * @return JSON representation of verifiable presentation
     */
    private issueVerifiablePresentation;
    /**
     * Extract data from claim token.
     *
     * @param {String} token JWT token containing claimType, version and subject
     * @return Claim data
     */
    private extractClaimRequest;
    /**
     * Create subject agreement signature.
     *
     * @param {ApproveRolePublishingOptions} options object containing options
     * @return subject agreement signature
     */
    private approveRolePublishing;
    /**
     * Create on-chain proof signature.
     *
     * @param {String} role role claim type
     * @param {Number} version role version
     * @param {Number} expiry time in seconds when the claim expires
     * @param {String} subject DID of the subject
     *
     * @return on-chain proof signature
     */
    private createOnChainProof;
    /**
     * Verifies:
     * - That credential proof is valid
     * - That credential was issued by authorized issuer
     * - That credential was not revoked
     *
     * @param {VerifiableCredential<RoleCredentialSubject} vc to be verified
     * @return Boolean indicating if verified and array of error messages
     */
    verifyVc(vc: VerifiableCredential<RoleCredentialSubject>): Promise<CredentialVerificationResult>;
    /**
     * Verifies:
     * - That off-chain claim was issued by authorized issuer
     * - That off-chain claim proof is valid
     *
     * @param {OffChainClaim} off chain claim to verify
     * @return Boolean indicating if verified and array of error messages
     */
    verifyRoleEIP191JWT(roleEIP191JWT: RoleEIP191JWT): Promise<CredentialVerificationResult>;
    /**
     * Fetch a credential from storage
     *
     * @param subjectDID The DID to try to resolve a credential for
     * @param roleNamesapce The role to try to get a credential for. Should be a full role namespace (for example, "myrole.roles.myorg.auth.ewc")
     * @return credential if available or undefined if not
     */
    fetchCredential(subjectDID: string, roleNamespace: string): Promise<VerifiableCredential<RoleCredentialSubject> | RoleEIP191JWT | undefined>;
    /**
     * Resolve a credential from storage and verify its proof/signature and its issuer's authority
     *
     * @param subjectDID The DID to try to resolve a credential for
     * @param roleNamesapce The role to try to get a credential for. Should be a full role namespace (for example, "myrole.roles.myorg.auth.ewc")
     * @return void. Returns "Proof Not Verified" error if VC not verified. Returns error if issuer not verified
     */
    resolveCredentialAndVerify(subjectDID: string, roleNamespace: string): Promise<CredentialVerificationResult>;
    /**
     *
     * Set the Verifier for Claim Issuance.
     *
     */
    private _setIssuerVerifier;
    private _setStatusVerifier;
}
