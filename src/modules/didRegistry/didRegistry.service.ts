import { Wallet, providers } from "ethers";
import { AxiosError } from "axios";
import { KeyType } from "@ew-did-registry/keys";
import { JWT } from "@ew-did-registry/jwt";
import { ProxyOperator } from "@ew-did-registry/proxyidentity";
import { addressOf, EwSigner, Operator } from "@ew-did-registry/did-ethr-resolver";
import {
    DIDAttribute,
    Encoding,
    IServiceEndpoint,
    IUpdateData,
    KeyTags,
    ProviderTypes,
} from "@ew-did-registry/did-resolver-interface";
import { DIDDocumentFull, IDIDDocumentFull } from "@ew-did-registry/did-document";
import { DidStore } from "@ew-did-registry/did-ipfs-store";
import { Methods } from "@ew-did-registry/did";
import { ClaimsIssuer, ClaimsUser, IProofData, IPublicClaim } from "@ew-did-registry/claims";
import { SignerService } from "../signer/signer.service";
import { ERROR_MESSAGES } from "../../errors";
import { CacheClient } from "../cacheClient/cacheClient.service";
import { ClaimData } from "../didRegistry/did.types";
import { chainConfigs } from "../../config/chain.config";
import { AssetsService } from "../assets/assets.service";

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
        private _ipfsUrl = "https://ipfs.infura.io:5001/api/v0/",
    ) {
        this._signerService.onInit(this.init.bind(this));
    }

    static async connect(
        signerService: SignerService,
        cacheClient: CacheClient,
        assetsService: AssetsService,
        ipfsUrl?: string,
    ) {
        const registry = new DidRegistry(signerService, cacheClient, assetsService, ipfsUrl);
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

    async getDidDocument({
        did = this._did,
        includeClaims = true,
    }: { did?: string; includeClaims?: boolean } | undefined = {}) {
        if (this._cacheClient) {
            try {
                const didDoc = await this._cacheClient.getDidDocument(did, includeClaims);
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
                      services: document.service && document.service.length > 0 ? document.service : [],
                  })
                : [],
        };
    }

    /**
     * createPublicClaim
     *
     * @description create a public claim based on data provided
     * @returns JWT token of created claim
     *
     */
    async createPublicClaim({ data, subject }: { data: ClaimData; subject?: string }) {
        if (subject) {
            return this._userClaims.createPublicClaim(data, { subject, issuer: "" });
        }
        return this._userClaims.createPublicClaim(data);
    }

    async createProofClaim({
        claimUrl,
        encryptedSaltedFields,
    }: {
        claimUrl: string;
        encryptedSaltedFields: IProofData;
    }) {
        await this._userClaims.createProofClaim(claimUrl, encryptedSaltedFields);
    }

    /**
     * issuePublicClaim
     *
     * @description issue a public claim
     * @returns return issued token
     *
     */
    async issuePublicClaim({ token, publicClaim }: { token?: string; publicClaim?: IPublicClaim }) {
        if (publicClaim) {
            return this._issuerClaims.issuePublicClaim(publicClaim);
        }
        if (token) {
            return this._issuerClaims.issuePublicClaim(token);
        }
        throw new Error("unable to issue Public Claim");
    }

    /**
     * verifyPublicClaim
     *
     * @description verifies issued token of claim
     * @returns public claim data
     *
     */
    async verifyPublicClaim(token: string, iss: string) {
        return this._userClaims.verifySignature(token, iss);
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
    async updateDocument(options: {
        didAttribute: DIDAttribute;
        data: IUpdateData;
        did?: string;
        validity?: number;
    }): Promise<boolean> {
        const { didAttribute, data, validity, did } = options;

        if (!did) {
            const updated = await this._document.update(didAttribute, data, validity);
            return Boolean(updated);
        } else if (!(await this._assetsService.getOwnedAssets()).find((a) => a.document.id === did)) {
            throw new Error(ERROR_MESSAGES.CAN_NOT_UPDATE_NOT_CONTROLLED_DOCUMENT);
        }

        const updateData: IUpdateData = {
            algo: KeyType.Secp256k1,
            encoding: Encoding.HEX,
            ...data,
        };

        const { didRegistryAddress: didContractAddress } = chainConfigs()[this._signerService.chainId];
        const operator = new ProxyOperator(this._identityOwner, { address: didContractAddress }, addressOf(did));
        const update = await operator.update(did, didAttribute, updateData);

        return Boolean(update);
    }

    /**
     * revokeDidDocument
     *
     * @description revokes did document
     * @returns information (true/false) if the DID document was revoked
     *
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

        this._did = `did:${Methods.Erc1056}:${await signer.getAddress()}`;
        const address = chainConfigs()[this._signerService.chainId].didRegistryAddress;
        this._operator = new Operator(this._identityOwner, { address });
    }

    private setJWT() {
        this._jwt = new JWT(this._identityOwner);
    }

    private async _setDocument() {
        this._document = new DIDDocumentFull(this._did, this._operator);
        if (this._cacheClient) {
            const cachedDoc = await this._cacheClient.getDidDocument(this._did);
            const pubKey = cachedDoc.publicKey.find((pk) => pk.id.endsWith(KeyTags.OWNER));
            if (!pubKey) {
                await this._document.create();
            }
        }
    }

    private _setClaims() {
        this._userClaims = new ClaimsUser(this._identityOwner, this._document, this._ipfsStore);
        this._issuerClaims = new ClaimsIssuer(this._identityOwner, this._document, this._ipfsStore);
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
            }),
        );
    }
}
