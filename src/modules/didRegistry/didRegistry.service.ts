import { Wallet, providers } from 'ethers';
import { AxiosError } from 'axios';
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
  IPublicKey,
  IServiceEndpoint,
  IUpdateData,
  KeyTags,
  ProviderTypes,
  PubKeyType,
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
  IPublicClaim,
  ProofVerifier,
} from '@ew-did-registry/claims';
import { SignerService } from '../signer/signer.service';
import { ERROR_MESSAGES } from '../../errors';
import { CacheClient } from '../cacheClient/cacheClient.service';
import { ClaimData } from '../didRegistry/did.types';
import { chainConfigs } from '../../config/chain.config';
import { AssetsService } from '../assets/assets.service';

const { JsonRpcProvider } = providers;

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

  async init() {
    this._ipfsStore = new DidStore(this._ipfsUrl);
    await this._setOperator();
    this.setJWT();
    await this._setDocument();
    this._setClaims();
  }

  private async getDIDDocFull(did) {
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

  async getDidDocument({
    did = this._did,
    includeClaims = true,
  }: { did?: string; includeClaims?: boolean } | undefined = {}) {
    if (this._cacheClient) {
      try {
        const didDoc = await this._cacheClient.getDidDocument(
          did,
          includeClaims
        );
        return {
          ...didDoc,
          service: didDoc.service as (IServiceEndpoint & ClaimData)[],
        };
      } catch (err) {
        if ((err as AxiosError).response?.status === 401) {
          throw err;
        }
        console.log(err);
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
   * @description gets list of services endpoints from User's DID document
   * @returns list of claims
   */
  async getServices({
    did = this._signerService.did,
  }: { did?: string } | undefined = {}) {
    const { service } = (await this.getDidDocument({ did })) || {};
    return service;
  }

  /**
   * @description get public keys from User's DID document
   * @returns list of public keys
   */
  async getDidPublicKeys({
    did = this._signerService.did,
  }): Promise<IPublicKey[]> {
    return (await this.getDidDocument({ did: did, includeClaims: false }))
      .publicKey;
  }

  /**
   * @description get public keys from DID's document
   * @returns list of DID's delegates
   */
  async getDidDelegates({ did = this._did }): Promise<string[] | undefined> {
    return (await this.getDidDocument({ did: did, includeClaims: true }))
      .delegates;
  }

  /**
   * @description create a public claim based on data provided
   * @returns JWT token of created claim
   */
  async createPublicClaim({
    data,
    subject,
  }: {
    data: ClaimData;
    subject?: string;
  }) {
    if (subject) {
      return this._userClaims.createPublicClaim(data, { subject, issuer: '' });
    }
    return this._userClaims.createPublicClaim(data);
  }

  /**
   * @description issue a public claim
   * @returns return issued token
   */
  async issuePublicClaim({
    token,
    publicClaim,
  }: {
    token?: string;
    publicClaim?: IPublicClaim;
  }) {
    if (publicClaim) {
      return this._issuerClaims.issuePublicClaim(publicClaim);
    }
    if (token) {
      return this._issuerClaims.issuePublicClaim(token);
    }
    throw new Error('unable to issue Public Claim');
  }

  /**
   * @description verifies issued token of claim
   * @returns public claim data
   */
  async verifyPublicClaim(token: string, iss: string) {
    const issuerDoc = await this.getDidDocument({
      did: iss,
      includeClaims: true,
    });
    const verifier = new ProofVerifier(issuerDoc);
    return verifier.verifyAssertionProof(token);
  }

  /**
   * @param options Options to connect with blockchain
   *
   * @param options.didAttribute Type of document to be updated
   *
   * @param options.data New attribute value
   * @param options.did Asset did to be updated
   * @param options.validity Time (s) for the attribute to expire
   *
   * @description updates did document based on data provided
   * @returns true if document is updated successfuly
   *
   */
  async updateDocument({
    didAttribute,
    data,
    validity,
    did = this._signerService.did,
  }: {
    didAttribute: DIDAttribute;
    data: IUpdateData;
    did?: string;
    validity?: number;
  }): Promise<boolean> {
    const didDocument = await this.getDIDDocFull(did);
    const updateData: IUpdateData = {
      algo: KeyType.Secp256k1,
      encoding: Encoding.HEX,
      ...data,
    };

    const update = await didDocument.update(didAttribute, updateData, validity);

    return Boolean(update);
  }

  /**
   * @description Adds public key to the document of controlled `did`
   * @returns true if document is updated successfuly
   */
  async updateSignedDidPublicKey({
    did = this._signerService.did,
    publicKey,
    validity,
    algo = KeyType.Secp256k1,
    type = PubKeyType.SignatureAuthentication2018,
    tag = '',
  }: {
    did: string;
    publicKey: string;
    algo: KeyType;
    type: PubKeyType;
    tag: string;
    validity?: number;
  }): Promise<boolean> {
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
   * @description updates delegate of the document of controlled `did`
   * @returns true if document is updated successfuly
   */
  async updateSignedDidDelegate({
    did = this._signerService.did,
    delegatePublicKey,
    validity,
    algo = KeyType.Secp256k1,
    type = PubKeyType.SignatureAuthentication2018,
  }: {
    did: string;
    delegatePublicKey: string;
    algo: KeyType;
    type: PubKeyType;
    validity?: number;
  }): Promise<boolean> {
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
   * @description create did document if not exists
   * @returns true if document is created successfully
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
   * @description revokes did document
   * @returns information (true/false) if the DID document was revoked
   */
  async revokeDidDocument(): Promise<boolean> {
    await this._document.deactivate();
    return true;
  }

  async decodeJWTToken({ token }: { token: string }) {
    return this._jwt.decode(token);
  }

  private async _setOperator() {
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

  private setJWT() {
    this._jwt = new JWT(this._identityOwner);
  }

  private async _setDocument() {
    this._document = new DIDDocumentFull(this._did, this._operator);
  }

  private _setClaims() {
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

  private async downloadClaims({ services }: { services: IServiceEndpoint[] }) {
    return Promise.all(
      services.map(async ({ serviceEndpoint, ...rest }) => {
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
}
