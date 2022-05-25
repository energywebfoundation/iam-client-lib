import { Wallet, providers, BigNumber } from 'ethers';
import { CID } from 'multiformats/cid';
import { KeyType } from '@ew-did-registry/keys';
import { JWT } from '@ew-did-registry/jwt';
import { ProxyOperator } from '@ew-did-registry/proxyidentity';
import {
  addressOf,
  EwSigner,
  Operator,
} from '@ew-did-registry/did-ethr-resolver';
import {
  DIDAttribute,
  Encoding,
  IDIDDocument,
  IPublicKey,
  IServiceEndpoint,
  IUpdateData,
  KeyTags,
  ProviderTypes,
  PubKeyType,
  RegistrySettings,
} from '@ew-did-registry/did-resolver-interface';
import {
  DIDDocumentFull,
  IDIDDocumentFull,
} from '@ew-did-registry/did-document';
import { DidStore } from '@ew-did-registry/did-ipfs-store';
import { Methods } from '@ew-did-registry/did';
import {
  ClaimsIssuer,
  ClaimsUser,
  ProofVerifier,
} from '@ew-did-registry/claims';
import { SignerService } from '../signer/signer.service';
import { ERROR_MESSAGES } from '../../errors';
import { CacheClient } from '../cache-client/cache-client.service';
import {
  ClaimData,
  CreatePublicClaimOptions,
  DecodeJWTTokenOptions,
  DownloadClaimsOptions,
  GetDidDelegatesOptions,
  GetDIDDocumentOptions,
  GetDidPublicKeysOptions,
  GetServicesOptions,
  IssuePublicClaimOptions,
  UpdateDocumentOptions,
  UpdateSignedDidDelegateOptions,
  UpdateSignedDidPublicKeyOptions,
  ValidDateUpdateDocumentRequestOptions,
} from './did.types';
import { chainConfigs } from '../../config/chain.config';
import { AssetsService } from '../assets/assets.service';
import {
  UpdateServicePoint,
  UpdateDelegate,
  UpdatePublicKey,
} from './did-registry.validation';
import { getLogger } from '../../config/logger.config';

const { JsonRpcProvider } = providers;

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
export class DidRegistry {
  private _identityOwner: EwSigner;
  private _operator: Operator;
  private _did: string;
  private _document: IDIDDocumentFull;
  private _ipfsStore: DidStore;
  private _jwt: JWT;
  private _userClaims: ClaimsUser;
  private _issuerClaims: ClaimsIssuer;

  constructor(
    private _signerService: SignerService,
    private _cacheClient: CacheClient,
    private _assetsService: AssetsService,
    private _ipfsUrl = 'https://ipfs.infura.io:5001/api/v0/'
  ) {
    this._signerService.onInit(this.init.bind(this));
  }

  static async connect(
    signerService: SignerService,
    cacheClient: CacheClient,
    assetsService: AssetsService,
    ipfsUrl?: string
  ) {
    const registry = new DidRegistry(
      signerService,
      cacheClient,
      assetsService,
      ipfsUrl
    );
    await registry.init();
    return registry;
  }

  get jwt() {
    return this._jwt;
  }

  // temporarily, to allow claim service to save claim
  get ipfsStore() {
    return this._ipfsStore;
  }

  get identityOwner() {
    return this._identityOwner;
  }

  async init() {
    this._ipfsStore = new DidStore(this._ipfsUrl);
    await this._setOperator();
    this.setJWT();
    await this._setDocument();
    this._setClaims();
  }

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
  async getDidDocument({
    did = this._did,
    includeClaims = true,
  }: GetDIDDocumentOptions = {}): Promise<IDIDDocument> {
    getLogger().info(`Getting DID document for ${did}`);
    if (this._cacheClient) {
      try {
        const didDoc = await this._cacheClient.getDidDocument(
          did,
          includeClaims
        );
        // TODO: implement includeClaims
        return didDoc;
      } catch (err) {
        getLogger().info(err);
        throw err;
      }
    }

    const document = await this._operator.read(did);
    return {
      ...document,
      service: includeClaims
        ? await this.downloadClaims({
            services:
              document.service && document.service.length > 0
                ? document.service
                : [],
          })
        : [],
    };
  }

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
  async getServices({
    did = this._signerService.did,
  }: GetServicesOptions = {}): Promise<IServiceEndpoint[]> {
    const didDocument = await this.getDidDocument({ did });
    return didDocument?.service;
  }

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
  async getDidPublicKeys({
    did = this._signerService.did,
  }: GetDidPublicKeysOptions = {}): Promise<IPublicKey[]> {
    const didDocument = await this.getDidDocument({ did });
    return didDocument?.publicKey;
  }

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
  async getDidDelegates({
    did = this._signerService.did,
  }: GetDidDelegatesOptions = {}): Promise<string[] | undefined> {
    const didDocument = await this.getDidDocument({ did });
    return didDocument?.delegates;
  }

  get registrySettings(): RegistrySettings {
    return {
      address: chainConfigs()[this._signerService.chainId].didRegistryAddress,
    };
  }

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
  async createPublicClaim({
    data,
    subject,
  }: CreatePublicClaimOptions): Promise<string> {
    if (subject) {
      return this._userClaims.createPublicClaim(data, { subject, issuer: '' });
    }
    return this._userClaims.createPublicClaim(data);
  }

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
  async issuePublicClaim({
    token,
    publicClaim,
    expirationTimestamp,
  }: IssuePublicClaimOptions): Promise<string> {
    const params = publicClaim || token;
    if (params) {
      return this._issuerClaims.issuePublicClaim(params, expirationTimestamp);
    }

    throw new Error(
      'Unable to issue public claim: `token` or `publicClaim` must be provided'
    );
  }

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
  async verifyPublicClaim(token: string, iss: string): Promise<string | null> {
    const issuerDoc = await this.getDidDocument({
      did: iss,
      includeClaims: true,
    });
    const verifier = new ProofVerifier(issuerDoc);
    return verifier.verifyAssertionProof(token);
  }

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
  async updateDocument({
    didAttribute,
    data,
    validity,
    did = this._signerService.did,
  }: UpdateDocumentOptions): Promise<boolean> {
    this.validDateUpdateDocumentRequest({
      didAttribute,
      data,
      did,
    });

    const didDocument = await this.getDIDDocFull(did);
    const updateData: IUpdateData = {
      algo: KeyType.Secp256k1,
      encoding: Encoding.HEX,
      ...data,
    };

    const update = await didDocument.update(didAttribute, updateData, validity);

    return update._hex !== BigNumber.from(0)._hex;
  }

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
  async updateSignedDidPublicKey({
    did = this._signerService.did,
    publicKey,
    validity,
    algo = KeyType.Secp256k1,
    type = PubKeyType.SignatureAuthentication2018,
    tag = '',
  }: UpdateSignedDidPublicKeyOptions): Promise<boolean> {
    if (!publicKey)
      throw new Error(
        ERROR_MESSAGES.CAN_NOT_UPDATE_DOCUMENT_PROPERTIES_INVALID_OR_MISSING +
          'publicKey'
      );
    const didDocument = await this.getDIDDocFull(did);
    const isDIdDocUpdated = await didDocument.updatePublicKey({
      publicKey,
      did: this._signerService.did,
      algo,
      type,
      tag,
      validity,
    });
    return Boolean(isDIdDocUpdated);
  }

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
  async updateSignedDidDelegate({
    did = this._signerService.did,
    delegatePublicKey,
    validity,
    algo = KeyType.Secp256k1,
    type = PubKeyType.SignatureAuthentication2018,
  }: UpdateSignedDidDelegateOptions): Promise<boolean> {
    if (!delegatePublicKey)
      throw new Error(
        ERROR_MESSAGES.CAN_NOT_UPDATE_DOCUMENT_PROPERTIES_INVALID_OR_MISSING +
          'delegatePublicKey'
      );
    const didDocument = await this.getDIDDocFull(did);
    const isDIdDocUpdated = await didDocument.updateDelegate({
      delegatePublicKey,
      algo,
      type,
      validity,
    });
    return Boolean(isDIdDocUpdated);
  }

  /**
   * Create DID document of the current user if not exists.
   *
   * ```typescript
   * didRegistry.createDocument();
   * ```
   *
   * @return true if document was created successfully
   */
  async createDocument(): Promise<boolean> {
    if (this._cacheClient) {
      const cachedDoc = await this._cacheClient.getDidDocument(this._did);
      const pubKey = cachedDoc.publicKey.find((pk) =>
        pk.id.endsWith(KeyTags.OWNER)
      );
      if (!pubKey) {
        return this._document.create();
      }
      return true;
    }
    return this._document.create();
  }

  /**
   * Revoke DID document of the current user.
   *
   * ```typescript
   * didRegistry.revokeDidDocument();
   * ```
   *
   * @return true if document was revoked successfully
   */
  async revokeDidDocument(): Promise<boolean> {
    await this._document.deactivate();
    return true;
  }

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
  async decodeJWTToken({ token }: DecodeJWTTokenOptions) {
    return this._jwt.decode(token);
  }

  /**
   * Get `DIDDocumentFull` class of the given DID
   *
   * ```typescript
   * didRegistry.getDIDDocFull('did:ethr:volta:0x00...0');
   * ```
   * @param {String} did DID of the document
   * @return `DIDDocumentFull` object
   */
  private async getDIDDocFull(did: string): Promise<IDIDDocumentFull> {
    if (did === this._signerService.did) {
      return this._document;
    } else {
      const assetDID = (await this._assetsService.getOwnedAssets()).find(
        (a) => a.document.id === did
      )?.id;
      if (!assetDID) {
        throw new Error(ERROR_MESSAGES.CAN_NOT_UPDATE_NOT_CONTROLLED_DOCUMENT);
      }

      const { didRegistryAddress: didContractAddress } =
        chainConfigs()[this._signerService.chainId];
      const operator = new ProxyOperator(
        this._identityOwner,
        { address: didContractAddress },
        addressOf(assetDID)
      );
      return new DIDDocumentFull(did, operator);
    }
  }

  /**
   * Set operator based on current configs
   *
   * ```typescript
   * didRegistry._setOperator();
   * ```
   */
  private async _setOperator(): Promise<void> {
    const signer = this._signerService.signer;
    const provider = signer.provider;
    const publicKey = await this._signerService.publicKey();
    if (signer instanceof Wallet && provider instanceof JsonRpcProvider) {
      this._identityOwner = EwSigner.fromPrivateKey(signer.privateKey, {
        type: ProviderTypes.HTTP,
        uriOrInfo: provider.connection.url,
      });
    } else if (provider instanceof JsonRpcProvider) {
      this._identityOwner = EwSigner.fromEthersSigner(signer, publicKey);
    } else {
      /** @todo from EIP1193Provider */
      throw new Error(ERROR_MESSAGES.UNKNOWN_PROVIDER);
    }

    this._did = `did:${
      Methods.Erc1056
    }:${this._signerService.chainName()}:${await signer.getAddress()}`;
    const address =
      chainConfigs()[this._signerService.chainId].didRegistryAddress;
    this._operator = new Operator(this._identityOwner, { address });
  }

  /**
   * Set JWT
   *
   * ```typescript
   * didRegistry.setJWT();
   * ```
   */
  private setJWT(): void {
    this._jwt = new JWT(this._identityOwner);
  }

  /**
   * Set document of the current user
   *
   * ```typescript
   * didRegistry._setDocument();
   * ```
   */
  private _setDocument(): void {
    this._document = new DIDDocumentFull(this._did, this._operator);
  }

  /**
   * Set claims user and claims issuer class
   *
   * ```typescript
   * didRegistry._setClaims();
   * ```
   */
  private _setClaims(): void {
    this._userClaims = new ClaimsUser(
      this._identityOwner,
      this._document,
      this._ipfsStore
    );
    this._issuerClaims = new ClaimsIssuer(
      this._identityOwner,
      this._document,
      this._ipfsStore
    );
  }

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
  private async downloadClaims({
    services,
  }: DownloadClaimsOptions): Promise<(IServiceEndpoint & ClaimData)[]> {
    return Promise.all(
      services.map(async ({ serviceEndpoint, ...rest }) => {
        if (!this.isCID(serviceEndpoint)) {
          return { serviceEndpoint, ...rest };
        }

        const data = await this._ipfsStore.get(serviceEndpoint);
        const { claimData, ...claimRest } = this._jwt?.decode(data) as {
          claimData: ClaimData;
        };
        return {
          serviceEndpoint,
          ...rest,
          ...claimData,
          ...claimRest,
        } as IServiceEndpoint & ClaimData;
      })
    );
  }

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
  private validDateUpdateDocumentRequest({
    didAttribute,
    data,
    did,
  }: ValidDateUpdateDocumentRequestOptions): void {
    const rq = { didAttribute, data, did };
    try {
      switch (didAttribute) {
        case DIDAttribute.ServicePoint:
          UpdateServicePoint.check(rq);
          break;
        case DIDAttribute.Authenticate:
          UpdateDelegate.check(rq);
          break;
        case DIDAttribute.PublicKey:
          UpdatePublicKey.check(rq);
          break;
        default:
          throw new Error('didAttribute invalida or missing');
      }
    } catch (e) {
      throw new Error(
        ERROR_MESSAGES.CAN_NOT_UPDATE_DOCUMENT_PROPERTIES_INVALID_OR_MISSING +
          (e as Error).message
      );
    }
  }

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
  private isCID(hash: unknown): boolean {
    try {
      if (typeof hash === 'string') {
        return Boolean(CID.parse(hash));
      }

      if (hash instanceof Uint8Array) {
        return Boolean(CID.decode(hash));
      }

      return Boolean(CID.asCID(hash));
    } catch (e) {
      return false;
    }
  }
}
