import { providers, Signer, utils, errors, Wallet } from "ethers";
import { DomainReader, DomainTransactionFactory, DomainHierarchy } from "@energyweb/iam-contracts";
import { ethrReg, Operator, Resolver } from "@ew-did-registry/did-ethr-resolver";
import { namehash } from "../utils/ENS_hash";
import { IServiceEndpoint, RegistrySettings, KeyTags, IPublicKey } from "@ew-did-registry/did-resolver-interface";
import { Methods } from "@ew-did-registry/did";
import { DIDDocumentFull } from "@ew-did-registry/did-document";
import { ClaimsIssuer, ClaimsUser, ClaimsVerifier } from "@ew-did-registry/claims";
import { DidStore } from "@ew-did-registry/did-ipfs-store";
import { ClaimManager } from "@energyweb/iam-contracts/dist";
import { EnsRegistry } from "../../ethers/EnsRegistry";
import { JWT } from "@ew-did-registry/jwt";
import { ICacheClient } from "../modules/cacheClient/ICacheClient";
import { isBrowser } from "../utils/isBrowser";
import { connect, NatsConnection, JSONCodec, Codec } from "nats.ws";
import { ERROR_MESSAGES } from "../errors";
  import { ClaimData } from "../modules/cacheClient/cacheClient.types";
import difference from "lodash.difference";
import { TransactionOverrides } from "../../ethers";
import detectMetamask from "@metamask/detect-provider";
import { Owner as IdentityOwner, Owner } from "../modules/didRegistry/Owner";
import { WalletProvider } from "../types/WalletProvider";
import { CacheClient } from "../modules/cacheClient/cacheClient.service";
import { MessagingMethod, PUBLIC_KEY, WALLET_PROVIDER } from "../utils/constants";
import { cacheServerClientOptions, MessagingOptions } from "./chainConfig";
import { WalletConnectService } from "../walletconnect/WalletConnectService";
import { IdentityManager } from "../../ethers/IdentityManager";
import { getPublicKeyAndIdentityToken, IPubKeyAndIdentityToken } from "../utils/getPublicKeyAndIdentityToken";

const { hexlify, bigNumberify } = utils;
const { JsonRpcProvider } = providers;
const { abi: abi1056 } = ethrReg;

export type ConnectionOptions = {
    /** only required in node env */
    rpcUrl?: string;
    infuraId?: string;
    ipfsUrl?: string;
    bridgeUrl?: string;
    privateKey?: string;
    ewKeyManagerUrl?: string;
};

/**
 * @class
 */
export class IAMBase {
    protected _runningInBrowser: boolean;
    protected _connectionOptions: ConnectionOptions;

    protected _did: string | undefined;
    protected _provider: providers.JsonRpcProvider;
    protected _metamaskProvider: { on: any; request: any } | undefined;
    protected _walletConnectService: WalletConnectService;
    protected _address: string | undefined;
    protected _signer: Signer | undefined;
    protected _safeAddress: string | undefined;
    protected _didSigner: IdentityOwner | undefined;
    protected _identityToken: string | undefined;
    protected _transactionOverrides: TransactionOverrides = {};
    protected _providerType: WalletProvider | undefined;
    protected _publicKey: string | undefined | null;

    protected _registrySetting: RegistrySettings;
    protected _resolver: Resolver;
    protected _document: DIDDocumentFull | undefined;
    protected _userClaims: ClaimsUser | undefined;
    protected _issuerClaims: ClaimsIssuer | undefined;
    protected _verifierClaims: ClaimsVerifier | undefined;
    protected _ipfsStore: DidStore;
    protected _jwt: JWT | undefined;

    protected _ensRegistry: EnsRegistry;
    protected _domainDefinitionTransactionFactory: DomainTransactionFactory;
    protected _domainDefinitionReader: DomainReader;
    protected _domainHierarchy: DomainHierarchy;
    protected _ensResolverAddress: string;
    protected _ensRegistryAddress: string;

    protected _assetManager: IdentityManager;
    protected _claimManager: ClaimManager;

    protected _cacheClient: ICacheClient;

    protected _messagingOptions: MessagingOptions;
    protected _natsConnection: NatsConnection | undefined;
    protected _jsonCodec: Codec<any> | undefined;

    /**
     * IAM Constructor
     *
     */
    public constructor({
        rpcUrl,
        infuraId,
        ipfsUrl = "https://ipfs.infura.io:5001/api/v0/",
        bridgeUrl = "https://walletconnect.energyweb.org",
        privateKey,
        ewKeyManagerUrl = "https://km.aws.energyweb.org/connect/new",
    }: ConnectionOptions = {}) {
        this._runningInBrowser = isBrowser();
        errors.setLogLevel("error");

        this._connectionOptions = {
            privateKey,
            rpcUrl,
            bridgeUrl,
            infuraId,
        };

        this._ipfsStore = new DidStore(ipfsUrl);

        // Need to get providerType and publicKey in constructor because they are used
        // to infer if the session is active.
        if (this._runningInBrowser) {
            this._providerType = localStorage.getItem(WALLET_PROVIDER) as WalletProvider;
            this._publicKey = localStorage.getItem(PUBLIC_KEY);
        }

        this._walletConnectService = new WalletConnectService(bridgeUrl, infuraId, ewKeyManagerUrl);
    }

    // INITIAL

    protected async init({
        initializeMetamask,
        walletProvider: walletProvider,
    }: {
        initializeMetamask?: boolean;
        walletProvider?: WalletProvider;
    }) {
        await this.initSigner({ walletProvider, initializeMetamask });
        await this.setAddress();
        this.setDid();
        this.initEventHandlers();

        if (this._runningInBrowser) {
            await this.setupMessaging();
        }

        this.setResolver();
        this.setJWT();
        this.storeSession();
    }

    /**
     * @description creates users DID document if it is not yet exist
     */
    async connectToDIDRegistry() {
        if (!this._signer) {
            throw new Error(ERROR_MESSAGES.SIGNER_NOT_INITIALIZED);
        }
        if (!this._publicKey) {
            const { publicKey, identityToken } = await getPublicKeyAndIdentityToken(this._signer);
            this._publicKey = publicKey;
            this._identityToken = identityToken;
        }
        this._didSigner = new Owner(this._signer, this._provider, this._publicKey);
        await this.setDocument();
        this.setClaims();
    }

    /**
     * Check if session is active
     *
     * @returns boolean that indicates the session state
     */
    public isSessionActive() {
        return Boolean(this._publicKey) && Boolean(this._providerType);
    }

    private storeSession() {
        if (this._runningInBrowser && this._didSigner) {
            this._providerType && localStorage.setItem(WALLET_PROVIDER, this._providerType as string);
            this._didSigner.publicKey && localStorage.setItem(PUBLIC_KEY, this._didSigner.publicKey);
        }
    }

    protected clearSession() {
        if (this._runningInBrowser) {
            localStorage.removeItem(WALLET_PROVIDER);
            localStorage.removeItem(PUBLIC_KEY);
        }
    }

    /**
     * Add event handler for certain events
     * @requires to be called after the connection to wallet was initialized
     */
    on(event: "accountChanged" | "networkChanged" | "disconnected", eventHandler: () => void) {
        if (!this._providerType) return;
        const isMetamask = this._providerType === WalletProvider.MetaMask;
        switch (event) {
            case "accountChanged": {
                isMetamask
                    ? this._metamaskProvider?.on("accountsChanged", eventHandler)
                    : this._walletConnectService.getProvider().wc.on("session_update", eventHandler);
                break;
            }
            case "disconnected": {
                isMetamask === false && this._walletConnectService.getProvider()?.wc.on("disconnect", eventHandler);
                break;
            }
            case "networkChanged": {
                isMetamask
                    ? this._metamaskProvider?.on("networkChanged", eventHandler)
                    : this._walletConnectService.getProvider().wc.on("session_update", eventHandler);
                break;
            }
            default:
                throw new Error("Event not supported");
        }
    }

    private initEventHandlers() {
        this.on("accountChanged", () => {
            this.closeConnection();
        });
        this.on("disconnected", () => {
            this.closeConnection();
        });
        this.on("networkChanged", () => {
            this.closeConnection();
        });
    }

    /**
     * Close connection to wallet
     * @description closes the connection between dApp and the wallet
     *
     */
    async closeConnection() {
        await this._walletConnectService.closeConnection();
        this.clearSession();
        this._did = undefined;
        this._address = undefined;
        this._signer = undefined;
    }

    private async loginToCacheServer(): Promise<IPubKeyAndIdentityToken | undefined> {
        if (this._signer && this._cacheClient && this._cacheClient.isAuthEnabled()) {
            // If session isn't active then assume that user has never signed in or has signed out
            if (!this.isSessionActive()) {
                const { pubKeyAndIdentityToken } = await this._cacheClient.login();
                return pubKeyAndIdentityToken;
            }
            // session is active so maybe user has signed in before.
            // Test cache-server login to confirm that their tokens are still valid
            else {
                await this._cacheClient.testLogin();
                // Expect that if login generated pubKey&IdToken, then will be accessible as property of cacheClient
                return this._cacheClient.pubKeyAndIdentityToken;
            }
        }
        return undefined;
    }

    protected async setAddress() {
        if (this._signer) {
            this._address = await this._signer.getAddress();
        }
    }

    get address() {
        return this._address;
    }

    private setResolver() {
        if (this._registrySetting) {
            this._resolver = new Resolver(this._provider as providers.Provider, this._registrySetting);
        }
    }

    

    

    private setClaims() {
        if (this._didSigner && this._document) {
            this._userClaims = new ClaimsUser(this._didSigner, this._document, this._ipfsStore);
            this._issuerClaims = new ClaimsIssuer(this._didSigner, this._document, this._ipfsStore);
            this._verifierClaims = new ClaimsVerifier(this._didSigner, this._document, this._ipfsStore);
        }
    }

    private setJWT() {
        if (this._signer) {
            this._jwt = new JWT(this._signer);
            return;
        }
        throw new Error(ERROR_MESSAGES.SIGNER_NOT_INITIALIZED);
    }

    private async setupMessaging() {
        const { messagingMethod, natsServerUrl } = this._messagingOptions || {};
        if (natsServerUrl && messagingMethod === MessagingMethod.Nats) {
            this._jsonCodec = JSONCodec();
            try {
                let protocol = "ws";
                if (natsServerUrl.indexOf("https://") === 0) {
                    protocol = "wss";
                }
                const timeout = 3000;
                // this race condition duplicate timeout is there because unable to catch the error that occurs when NATS.ws timeouts
                const connection = await Promise.race<NatsConnection | undefined>([
                    connect({
                        servers: `${protocol}://${natsServerUrl}`,
                        timeout,
                        pingInterval: 50 * 1000,
                    }),
                    new Promise<undefined>((resolve) => setTimeout(resolve, timeout)),
                ]);

                if (!connection) return;
                this._natsConnection = connection;
            } catch (err) {
                console.log(err);
            }
        }
    }

    

    protected async validateIssuers({ issuer, namespace }: { issuer: string[]; namespace: string }) {
        const roleHash = namehash(namespace);
        const definition = await this._domainDefinitionReader.read({ node: roleHash });
        if (!DomainReader.isRoleDefinition(definition)) {
            throw new Error("Domain is not a role definition");
        }
        const diff = difference(issuer, definition.issuer.did || []);
        if (diff.length > 0) {
            throw new Error(`Issuer validation failed for: ${diff.join(", ")}`);
        }
    }

    // ### ASSETS ###
}
