import { JWT } from '@ew-did-registry/jwt';
import { EwSigner } from '@ew-did-registry/did-ethr-resolver';
import { IDIDDocument, IPublicKey, IServiceEndpoint, RegistrySettings } from '@ew-did-registry/did-resolver-interface';
import { DidStore } from '@ew-did-registry/did-ipfs-store';
import { SignerService } from '../signer/signer.service';
import { CacheClient } from '../cache-client/cache-client.service';
import { CreatePublicClaimOptions, DecodeJWTTokenOptions, GetDidDelegatesOptions, GetDIDDocumentOptions, GetDidPublicKeysOptions, GetServicesOptions, IpfsConfig, IssuePublicClaimOptions, UpdateDocumentOptions, UpdateSignedDidDelegateOptions, UpdateSignedDidPublicKeyOptions } from './did.types';
import { AssetsService } from '../assets/assets.service';
/**
 * Service responsible for handling the DID Document management.
 * See more information about DID in IAM stack [here](https://energy-web-foundation.gitbook.io/energy-web/foundational-concepts/self-sovereign-identity#decentralized-identifiers-dids).
 *
 * ```typescript
 * const { connectToCacheServer } = await initWithPrivateKeySigner(privateKey, rpcUrl);
 * const { connectToDidRegistry } = await connectToCacheServer();
 * const { didRegistry } = await connectToDidRegistry();
 * didRegistry.getDidDocument();
 * ```
 */
export declare class DidRegistry {
    private _signerService;
    private _cacheClient;
    private _assetsService;
    private _ipfsConfig;
    private _identityOwner;
    private _operator;
    private _did;
    private _document;
    private _ipfsStore;
    private _jwt;
    private _userClaims;
    private _issuerClaims;
    constructor(_signerService: SignerService, _cacheClient: CacheClient, _assetsService: AssetsService, _ipfsConfig: IpfsConfig);
    static connect(signerService: SignerService, cacheClient: CacheClient, assetsService: AssetsService, ipfsConfig: IpfsConfig): Promise<DidRegistry>;
    get jwt(): JWT;
    get ipfsStore(): DidStore;
    get identityOwner(): EwSigner;
    init(): Promise<void>;
    /**
     * Retrieve DID Document of the given DID from SSI-Hub if possible, otherwise from blockchain.
     * Optionally include claims object within services in the document.
     *
     * ```typescript
     * didRegistry.getDidDocument({
     *     did: 'did:ethr:volta:0x00...0',
     *     includeClaims: true,
     * });
     * ```
     * @param {GetDIDDocumentOptions} options object with options
     * @return DID document
     */
    getDidDocument({ did, includeClaims, }?: GetDIDDocumentOptions): Promise<IDIDDocument>;
    /**
     * Gets services from DID document of the given DID.
     *
     * ```typescript
     * didRegistry.getServices({
     *     did: 'did:ethr:volta:0x00...0',
     * });
     * ```
     * @param {GetServicesOptions} options object with options
     * @returns list of claims
     */
    getServices({ did, }?: GetServicesOptions): Promise<IServiceEndpoint[]>;
    /**
     * Gets public keys from DID document of the given DID.
     *
     * ```typescript
     * didRegistry.getDidPublicKeys({
     *     did: 'did:ethr:volta:0x00...0',
     * });
     * ```
     * @param {GetDidPublicKeysOptions} options object with options
     * @returns list of public keys
     */
    getDidPublicKeys({ did, }?: GetDidPublicKeysOptions): Promise<IPublicKey[]>;
    /**
     * Gets delegates from DID document of the given DID.
     *
     * ```typescript
     * didRegistry.getDidDelegates({
     *     did: 'did:ethr:volta:0x00...0',
     * });
     * ```
     * @param {GetDidDelegatesOptions} options object with options
     * @returns list of delegates
     */
    getDidDelegates({ did, }?: GetDidDelegatesOptions): Promise<string[] | undefined>;
    get registrySettings(): RegistrySettings;
    /**
     * Create a public claim with provided data.
     *
     * ```typescript
     * didRegistry.createPublicClaim({
     *     data: {
     *         claimType: 'root.roles.energyweb.iam.ewc',
     *         claimTypeVersion: 1,
     *     },
     *     subject: 'did:ethr:volta:0x00...0',
     * });
     * ```
     * @param {CreatePublicClaimOptions} options object with options
     * @return JWT token of created claim
     */
    createPublicClaim({ data, subject, }: CreatePublicClaimOptions): Promise<string>;
    /**
     * If token provided issue new token signed by issuer,
     * otherwise create a new claim token based on provided public claim data.
     *
     * ```typescript
     * didRegistry.issuePublicClaim({
     *     token: 'eyJh...VCJ9.ey...IyfQ.SflK...sw5c',
     *     publicClaim: {
     *         did: 'did:ethr:volta:0x00...0',
     *         signer: 'did:ethr:volta:0x00...1',
     *         claimData: {
     *             claimType: 'root.roles.energyweb.iam.ewc',
     *         },
     *     },
     * });
     * ```
     * @param {IssuePublicClaimOptions} options object with options
     * @return JWT token of created claim
     */
    issuePublicClaim({ token, publicClaim, }: IssuePublicClaimOptions): Promise<string>;
    /**
     * Verifies issued token of the public claim.
     *
     * ```typescript
     * didRegistry.verifyPublicClaim({
     *     token: 'eyJh...VCJ9.ey...IyfQ.SflK...sw5c',
     *     iss: 'did:ethr:volta:0x00...0',
     * });
     * ```
     * @param {String} token JWT token of the public claim
     * @param {String} iss DID of the issuer
     * @return DID of the authenticated identity on successful verification or null otherwise
     */
    verifyPublicClaim(token: string, iss: string): Promise<string | null>;
    /**
     * Update DID document of the given DID with provided data.
     *
     * ```typescript
     * didRegistry.updateDocument({
     *     didAttribute: DIDAttribute.PublicKey,
     *     data: publicKey,
     *     validity: 60 * 60 * 1000,
     *     did: 'did:ethr:volta:0x00...0',
     * });
     *
     * @param {UpdateDocumentOptions} options object with options
     * @return true if document was updated successfully
     */
    updateDocument({ didAttribute, data, validity, did, }: UpdateDocumentOptions): Promise<boolean>;
    /**
     * Adds public key to the DID document of given DID.
     *
     * ```typescript
     * didRegistry.updateSignedDidPublicKey({
     *     did: 'did:ethr:volta:0x00...0',
     *     publicKey: publicKey,
     *     validity: 60 * 60 * 1000,
     *     algo: KeyType.Secp256k1,
     *     type: PubKeyType.SignatureAuthentication2018,
     *     tag: '#main-key',
     * });
     *
     * @param {UpdateSignedDidPublicKeyOptions} options object with options
     * @return true if document was updated successfully
     */
    updateSignedDidPublicKey({ did, publicKey, validity, algo, type, tag, }: UpdateSignedDidPublicKeyOptions): Promise<boolean>;
    /**
     * Updates delegate of the DID document of given DID.
     *
     * ```typescript
     * didRegistry.updateSignedDidDelegate({
     *     did: 'did:ethr:volta:0x00...0',
     *     delegatePublicKey: delegatePublicKey,
     *     validity: 60 * 60 * 1000,
     *     algo: KeyType.Secp256k1,
     *     type: PubKeyType.SignatureAuthentication2018,
     * });
     *
     * @param {UpdateSignedDidDelegateOptions} options object with options
     * @return true if document was updated successfully
     */
    updateSignedDidDelegate({ did, delegatePublicKey, validity, algo, type, }: UpdateSignedDidDelegateOptions): Promise<boolean>;
    /**
     * Create DID document of the current user if not exists.
     *
     * ```typescript
     * didRegistry.createDocument();
     * ```
     *
     * @return true if document was created successfully
     */
    createDocument(): Promise<boolean>;
    /**
     * Revoke DID document of the current user.
     *
     * ```typescript
     * didRegistry.revokeDidDocument();
     * ```
     *
     * @return true if document was revoked successfully
     */
    revokeDidDocument(): Promise<boolean>;
    /**
     * Validate that claim contains issuer and claimData.
     *
     * ```typescript
     * didRegistry.isClaim(token: Record<string, string | number | object>);
     * ```
     *
     * @return boolean
     */
    isClaim(claim: any): claim is {
        iss: string;
        sub: string;
        claimData: unknown;
    };
    /**
     * Decode JWT token of the public claim.
     *
     * ```typescript
     * didRegistry.decodeJWTToken({
     *     token: 'eyJh...VCJ9.ey...IyfQ.SflK...sw5c',
     * });
     * ```
     * @param {DecodeJWTTokenOptions} options object with options
     * @return payload of the JWT token
     */
    decodeJWTToken({ token }: DecodeJWTTokenOptions): Promise<unknown>;
    /**
     * Get `DIDDocumentFull` class of the given DID
     *
     * ```typescript
     * didRegistry.getDIDDocFull('did:ethr:volta:0x00...0');
     * ```
     * @param {String} did DID of the document
     * @return `DIDDocumentFull` object
     */
    private getDIDDocFull;
    /**
     * Set operator based on current configs
     *
     * ```typescript
     * didRegistry._setOperator();
     * ```
     */
    private _setOperator;
    /**
     * Set JWT
     *
     * ```typescript
     * didRegistry.setJWT();
     * ```
     */
    private setJWT;
    /**
     * Set document of the current user
     *
     * ```typescript
     * didRegistry._setDocument();
     * ```
     */
    private _setDocument;
    /**
     * Set claims user and claims issuer class
     *
     * ```typescript
     * didRegistry._setClaims();
     * ```
     */
    private _setClaims;
    /**
     * Download document claims from IPFS
     *
     * ```typescript
     * const document = await didRegistry.getDidDocument();
     * didRegistry.downloadClaims(document.services);
     * ```
     *
     * @param {DownloadClaimsOptions} options object with options
     * @returns resolved claims
     */
    private downloadClaims;
    /**
     * Validates update document request. Throws error if validation fails.
     *
     * ```typescript
     * didRegistry.validDateUpdateDocumentRequest({
     *     didAttribute: DIDAttribute.PublicKey,
     *     data: publicKey,
     *     did: 'did:ethr:volta:0x00...0',
     * });
     * ```
     *
     * @param {ValidDateUpdateDocumentRequestOptions} options object with options
     *
     */
    private validDateUpdateDocumentRequest;
    /**
     * Check if given value is a valid IPFS CID.
     *
     * ```typescript
     * didRegistry.isCID('Qm...');
     * ```
     *
     * @param {Any} hash value to check
     *
     */
    private isCID;
}
