import { Injectable, Optional } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Wallet, providers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { addressOf, EwJsonRpcSigner, EwPrivateKeySigner, IdentityOwner, Operator } from "@ew-did-registry/did-ethr-resolver";
import {
    Algorithms,
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
import { SignerService } from "../signer/signer.service";
import { ERROR_MESSAGES } from "../../errors";
import { CacheClient } from "../cacheClient/cacheClient.service";
import { ClaimData } from "../cacheClient/cacheClient.types";
import { AxiosError } from "axios";
import { JWT } from "@ew-did-registry/jwt";
import { ProxyOperator } from "@ew-did-registry/proxyidentity";
import { ChainConfig } from "../../config/chain.config";

const { JsonRpcProvider, Web3Provider } = providers;

@Injectable()
export class DidRegistry {
    private _identityOwner: IdentityOwner;
    private _operator: Operator;
    private _did: string;
    private _document: IDIDDocumentFull;
    private _ipfsStore: DidStore;
    private _jwt: JWT;

    constructor(
        private _signerService: SignerService,
        private _configService: ConfigService,
        private _ipfsUrl = "https://ipfs.infura.io:5001/api/v0/",
        @Optional() private _cacheClient: CacheClient,
    ) {}

    async connectToDIDRegistry() {
        this._ipfsStore = new DidStore(this._ipfsUrl);
        await this._setOperator();
        this.setJWT();
        await this._setDocument();
    }

    private async _setOperator() {
        const signer = this._signerService.signer;
        const provider = signer.provider;
        const publicKey = await this._signerService.getPublicKey();
        if (signer instanceof Wallet && provider instanceof JsonRpcProvider) {
            this._identityOwner = IdentityOwner.fromPrivateKeySigner(
                new EwPrivateKeySigner(signer.privateKey, {
                    type: ProviderTypes.HTTP,
                    uriOrInfo: provider.connection.url,
                }),
            );
        } else if (provider instanceof WalletConnectProvider) {
            this._identityOwner = IdentityOwner.fromJsonRpcSigner(new EwJsonRpcSigner(provider), publicKey);
        } else if (provider instanceof Web3Provider) {
            this._identityOwner = IdentityOwner.fromJsonRpcSigner(
                new EwJsonRpcSigner(provider.jsonRpcFetchFunc),
                publicKey,
            );
        } else {
            throw new Error(ERROR_MESSAGES.PROVIDER_NOT_INITIALIZED);
        }

        this._did = `did:${Methods}:${await signer.getAddress()}`;
        const address = this._configService.get("didContractAddress");
        this._operator = new Operator(this._identityOwner, { address });
    }

    private setJWT() {
        this._jwt = new JWT(this._identityOwner);
        return;
        throw new Error(ERROR_MESSAGES.SIGNER_NOT_INITIALIZED);
    }

    private async _setDocument() {
        this._document = new DIDDocumentFull(this._did, this._operator);
        if (this._cacheClient) {
            const cachedDoc = await this._cacheClient.getDidDocument({ did: this._did });
            const pubKey = cachedDoc.publicKey.find((pk) => pk.id.endsWith(KeyTags.OWNER));
            if (!pubKey) {
                await this._document.create();
            }
        }
    }

    async getDidDocument({
        did = this._did,
        includeClaims = true,
    }: { did?: string; includeClaims?: boolean } | undefined = {}) {
        if (this._cacheClient) {
            try {
                const didDoc = await this._cacheClient.getDidDocument({ did, includeClaims });
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
    async updateDidDocument(options: {
        didAttribute: DIDAttribute;
        data: IUpdateData;
        did?: string;
        validity?: number;
    }): Promise<boolean> {
        const { didAttribute, data, validity, did } = options;

        if (!did) {
            const updated = await this._document.update(didAttribute, data, validity);
            return Boolean(updated);
        }

        const updateData: IUpdateData = {
            algo: Algorithms.Secp256k1,
            encoding: Encoding.HEX,
            ...data,
        };

        const chainId = (await this._signerService.signer.provider.getNetwork()).chainId;
        const chainConfig = this._configService.get<ChainConfig>(`chainConfiguration.${chainId}`) as ChainConfig;
        const operator = new ProxyOperator(
            this._identityOwner,
            { address: chainConfig.didContractAddress },
            addressOf(did),
        );
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
        if (this._document) {
            await this._document.deactivate();
            return true;
        }
        throw new Error(ERROR_MESSAGES.DID_DOCUMENT_NOT_INITIALIZED);
    }

    async decodeJWTToken({ token }: { token: string }) {
        if (!this._jwt) {
            throw new Error(ERROR_MESSAGES.JWT_NOT_INITIALIZED);
        }
        return this._jwt.decode(token);
    }
}
