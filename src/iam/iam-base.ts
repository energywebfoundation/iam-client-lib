import { providers, Signer, utils, Wallet, BigNumber, ethers } from "ethers";
import EKC from "@energyweb/ekc";
import {
    DomainReader,
    DomainTransactionFactory,
    DomainHierarchy,
    ResolverContractType,
} from "@energyweb/iam-contracts";
import { EwSigner, Operator, Resolver } from "@ew-did-registry/did-ethr-resolver";
import { labelhash, namehash } from "../utils/ENS_hash";
import {
    IServiceEndpoint,
    RegistrySettings,
    KeyTags,
    IPublicKey,
    ProviderTypes,
} from "@ew-did-registry/did-resolver-interface";
import { Methods } from "@ew-did-registry/did";
import { DIDDocumentFull } from "@ew-did-registry/did-document";
import { ClaimsIssuer, ClaimsUser, ClaimsVerifier } from "@ew-did-registry/claims";
import { DidStore } from "@ew-did-registry/did-ipfs-store";
import { ENSRegistry } from "../../ethers/ENSRegistry";
import { ENSRegistry__factory } from "../../ethers/factories/ENSRegistry__factory";
import { ClaimManager__factory } from "../../ethers/factories/ClaimManager__factory";
import { ClaimManager } from "../../ethers/ClaimManager";
import { JWT } from "@ew-did-registry/jwt";
import { ICacheServerClient } from "../cacheServerClient/ICacheServerClient";
import { detectExecutionEnvironment, ExecutionEnvironment } from "../utils/detectEnvironment";
import { connect, NatsConnection, Codec, JSONCodec } from "nats.ws";
import { ERROR_MESSAGES } from "../errors";
import { ClaimData } from "../cacheServerClient/cacheServerClient.types";
import difference from "lodash.difference";
import detectMetamask from "@metamask/detect-provider";
import { WalletProvider } from "../types/WalletProvider";
import { CacheServerClient } from "../cacheServerClient/cacheServerClient";
import { emptyAddress, MessagingMethod, PUBLIC_KEY, WALLET_PROVIDER } from "../utils/constants";
import { cacheServerClientOptions, chainConfigs, messagingOptions, MessagingOptions } from "./chainConfig";
import { WalletConnectService } from "../walletconnect/WalletConnectService";
import { OfferableIdentity__factory } from "../../ethers/factories/OfferableIdentity__factory";
import { IdentityManager__factory } from "../../ethers/factories/IdentityManager__factory";
import { IdentityManager } from "../../ethers/IdentityManager";
import { getPublicKeyAndIdentityToken, IPubKeyAndIdentityToken } from "../utils/getPublicKeyAndIdentityToken";
import { AccountInfo } from "../iam";

const { parseUnits } = utils;
const { JsonRpcProvider } = providers;

export type ConnectionOptions = {
    /** only required in node env */
    rpcUrl?: string;
    infuraId?: string;
    ipfsUrl?: string;
    bridgeUrl?: string;
    privateKey?: string;
    ewKeyManagerUrl?: string;
    proxyUrl?: string;
};

export type EncodedCall = {
    to: string;
    data: string;
    value?: string;
};

export type Transaction = {
    calls: EncodedCall[];
    from: string;
};

/**
 * @class
 */
export class IAMBase {
    protected _executionEnvironment: ExecutionEnvironment;
    protected _connectionOptions: ConnectionOptions;

    protected _did: string | undefined;
    protected _provider: providers.JsonRpcProvider;
    protected _metamaskProvider: { on: any; request: any } | undefined;
    protected _walletConnectService: WalletConnectService;
    protected _address: string | undefined;
    protected _signer: Signer | undefined;
    protected _safeAddress: string | undefined;
    protected _didSigner: EwSigner | undefined;
    protected _identityToken: string | undefined;
    protected _transactionOverrides: utils.Deferrable<providers.TransactionRequest> = {};
    protected _providerType: WalletProvider;
    protected _publicKey: string | undefined | null;

    protected _registrySetting: RegistrySettings;
    protected _resolver: Resolver;
    protected _document: DIDDocumentFull | undefined;
    protected _userClaims: ClaimsUser | undefined;
    protected _issuerClaims: ClaimsIssuer | undefined;
    protected _verifierClaims: ClaimsVerifier | undefined;
    protected _ipfsStore: DidStore;
    protected _jwt: JWT | undefined;

    protected _ensRegistry: ENSRegistry;
    protected _domainDefinitionTransactionFactory: DomainTransactionFactory;
    protected _domainDefinitionReader: DomainReader;
    protected _domainHierarchy: DomainHierarchy;
    protected _ensResolverAddress: string;
    protected _ensRegistryAddress: string;

    protected _assetManager: IdentityManager;
    protected _claimManager: ClaimManager;

    protected _cacheClient: ICacheServerClient;

    protected _messagingOptions: MessagingOptions;
    protected _natsConnection: NatsConnection | undefined;
    protected _jsonCodec: Codec<any> | undefined;

    private _ekc: EKC | undefined;

    private ttl = BigNumber.from(0);

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
        proxyUrl = "http://localhost:5000/api/v1",
    }: ConnectionOptions = {}) {
        this._executionEnvironment = detectExecutionEnvironment();

        ethers.utils.Logger.setLogLevel(utils.Logger.levels.ERROR);

        this._connectionOptions = {
            privateKey,
            rpcUrl,
            bridgeUrl,
            infuraId,
            proxyUrl,
        };

        this._ipfsStore = new DidStore(ipfsUrl);

        // Need to get providerType and publicKey in constructor because they are used
        // to infer if the session is active.
        if (this._executionEnvironment === ExecutionEnvironment.BROWSER) {
            this._providerType = localStorage.getItem(WALLET_PROVIDER) as WalletProvider;
            this._publicKey = localStorage.getItem(PUBLIC_KEY);
        }

        if (this._executionEnvironment === ExecutionEnvironment.NODE) {
            this._providerType = WalletProvider.PrivateKey;
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
    }): Promise<AccountInfo | undefined> {
        const accountInfo = await this.initSigner({ walletProvider, initializeMetamask });
        await this.setAddress();
        this.setDid();
        await this.initChain();
        this.initEventHandlers();

        if (this._executionEnvironment === ExecutionEnvironment.BROWSER) {
            await this.setupMessaging();
        }

        this.setResolver();
        this.setJWT();
        return accountInfo;
    }

    private async initSigner({
        initializeMetamask,
        walletProvider,
    }: {
        useMetamask?: boolean;
        initializeMetamask?: boolean;
        walletProvider?: WalletProvider;
    }): Promise<AccountInfo | undefined> {
        const { privateKey, rpcUrl, proxyUrl } = this._connectionOptions;

        if (walletProvider === WalletProvider.PrivateKey) {
            this.initWithPrivateKey(privateKey, rpcUrl);
            this._providerType = walletProvider;
            return;
        }

        if (walletProvider === WalletProvider.MetaMask) {
            const metamaskProvider: any = await detectMetamask({
                mustBeMetaMask: true,
            });
            if (!metamaskProvider) {
                throw new Error(ERROR_MESSAGES.METAMASK_EXTENSION_NOT_AVAILABLE);
            }
            this._metamaskProvider = metamaskProvider;
            const requestObject = {
                method: initializeMetamask ? "wallet_requestPermissions" : "eth_accounts",
                params: [
                    {
                        eth_accounts: {},
                    },
                ],
            };
            const accounts: string[] = await metamaskProvider.request(requestObject);

            if (!initializeMetamask && accounts.length < 1) {
                await metamaskProvider.request({
                    method: "wallet_requestPermissions",
                    params: [
                        {
                            eth_accounts: {},
                        },
                    ],
                });
            }
            this._providerType = walletProvider;
            this._provider = new providers.Web3Provider(metamaskProvider);
            this._signer = this._provider.getSigner();

            const { chainId } = await this._provider.getNetwork();
            console.log("metamask chain id:", chainId);

            return {
                account: accounts[0],
                chainId: chainId,
                chainName: chainConfigs[chainId].chainName,
            };
        }
        if (walletProvider && [WalletProvider.EwKeyManager, WalletProvider.WalletConnect].includes(walletProvider)) {
            this._transactionOverrides = {
                gasLimit: BigNumber.from(4900000),
                gasPrice: parseUnits("0.01", "gwei"),
            };
            await this._walletConnectService.initialize(walletProvider);
            const wcProvider = this._walletConnectService.getProvider();
            this._provider = new providers.Web3Provider(wcProvider);
            this._signer = this._provider.getSigner();
            this._providerType = walletProvider;
            return;
        }
        if (walletProvider === WalletProvider.EKC) {
            if (!proxyUrl) {
                throw new Error(ERROR_MESSAGES.EKC_PROXY_NOT_PROVIDED);
            }
            try {
                // proxyUrl should be
                this._ekc = await EKC.init({ proxyUrl });
                await this._ekc.login({ mode: "popup" });
            } catch (error) {
                throw new Error(ERROR_MESSAGES.ERROR_IN_AZURE_PROVIDER);
            }
            this._signer = this._ekc.getSigner() as Signer;
            this._provider = this._signer.provider as providers.JsonRpcProvider;
            this._providerType = walletProvider;
            return;
        }
        throw new Error(ERROR_MESSAGES.WALLET_TYPE_NOT_PROVIDED);
    }

    private initWithPrivateKey(privateKey, rpcUrl) {
        if (!privateKey) {
            throw new Error(ERROR_MESSAGES.PRIVATE_KEY_NOT_PROVIDED);
        }
        if (!rpcUrl) {
            throw new Error(ERROR_MESSAGES.RPC_URL_NOT_PROVIDED);
        }
        this._provider = new JsonRpcProvider({ url: rpcUrl });
        this._signer = new Wallet(privateKey, this._provider);
    }

    /**
     * @description Establishes connection to the cache serverand sets public key and identity token
     */
    async connectToCacheServer() {
        const { chainId } = await this._provider.getNetwork();
        const cacheOptions = cacheServerClientOptions[chainId];
        if (!this._signer) {
            throw new Error(ERROR_MESSAGES.SIGNER_NOT_INITIALIZED);
        }
        if (!cacheOptions.url) {
            throw new Error(ERROR_MESSAGES.CACHE_SERVER_NOT_REGISTERED);
        }
        this._cacheClient = new CacheServerClient(cacheOptions, this._signer);
        const fromCacheLogin = await this.loginToCacheServer();
        this._publicKey = fromCacheLogin?.publicKey ?? this._publicKey;
        this._identityToken = fromCacheLogin?.identityToken;
    }

    /**
     * @description Creates the signer's DID document if it does not exist
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
        if (this._signer instanceof Wallet) {
            this._didSigner = EwSigner.fromPrivateKey(this._signer.privateKey, {
                type: ProviderTypes.HTTP,
                uriOrInfo: this._provider.connection.url,
            });
        } else if (this._signer instanceof providers.JsonRpcSigner || this._providerType === WalletProvider.EKC) {
            this._didSigner = EwSigner.fromEthersSigner(this._signer, this._publicKey);
        } else {
            throw new Error(ERROR_MESSAGES.PROVIDER_NOT_INITIALIZED);
        }
        await this.setDocument();
        this.setClaims();
        this.storeSession();
    }

    /**
     * @description Checks if the session is active
     * @returns boolean that indicates the session state
     */
    public isSessionActive() {
        return Boolean(this._publicKey) && Boolean(this._providerType);
    }

    private storeSession() {
        if (this._executionEnvironment === ExecutionEnvironment.BROWSER && this._didSigner) {
            this._providerType && localStorage.setItem(WALLET_PROVIDER, this._providerType as string);
            this._didSigner.publicKey && localStorage.setItem(PUBLIC_KEY, this._didSigner.publicKey);
        }
    }

    protected clearSession() {
        if (this._executionEnvironment === ExecutionEnvironment.BROWSER) {
            localStorage.removeItem(WALLET_PROVIDER);
            localStorage.removeItem(PUBLIC_KEY);
        }
    }

    /**
     * @description Defines event handlers for change of account, change of network, disconnection
     * @requires to be called after the connection to wallet was initialized
     */
    on(event: "accountChanged" | "networkChanged" | "disconnected", eventHandler: () => void) {
        const providersThatHandleEvents = [
            WalletProvider.WalletConnect,
            WalletProvider.EwKeyManager,
            WalletProvider.MetaMask,
        ];
        if (!providersThatHandleEvents.includes(this._providerType)) {
            return;
        }
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
     * @description Closes the connection between application and the signer's wallet
     */
    async closeConnection() {
        if (this._providerType === WalletProvider.EKC) {
            await this._ekc?.logout({ mode: "popup" });
        }
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

    private setDid() {
        if (this._address) {
            this._did = `did:${Methods.Erc1056}:${this._address}`;
        }
    }

    private async setDocument() {
        if (this._did && this._didSigner) {
            this._document = new DIDDocumentFull(this._did, new Operator(this._didSigner, this._registrySetting));
            let pubKey: IPublicKey | undefined;
            if (this._cacheClient) {
                const cachedDoc = await this._cacheClient.getDidDocument({ did: this._did });
                pubKey = cachedDoc.publicKey.find((pk) => pk.id.endsWith(KeyTags.OWNER));
            }
            if (!pubKey) {
                await this._document.create();
            }
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

    protected async downloadClaims({ services }: { services: IServiceEndpoint[] }) {
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

    protected createSubdomainTx({
        domain,
        nodeName,
        owner = this._address as string,
    }: {
        domain: string;
        nodeName: string;
        owner?: string;
    }): EncodedCall {
        return {
            to: this._ensRegistryAddress,
            data: this._ensRegistry.interface.encodeFunctionData("setSubnodeRecord", [
                namehash(domain),
                labelhash(nodeName),
                owner,
                this._ensResolverAddress,
                this.ttl,
            ]),
        };
    }

    protected changeSubdomainOwnerTx({
        newOwner,
        label,
        namespace,
    }: {
        newOwner: string;
        namespace: string;
        label: string;
    }): EncodedCall {
        return {
            to: this._ensRegistryAddress,
            data: this._ensRegistry.interface.encodeFunctionData("setSubnodeOwner", [
                namehash(namespace),
                labelhash(label),
                newOwner,
            ]),
        };
    }

    protected changeDomainOwnerTx({ newOwner, namespace }: { newOwner: string; namespace: string }): EncodedCall {
        return {
            to: this._ensRegistryAddress,
            data: this._ensRegistry.interface.encodeFunctionData("setOwner", [namehash(namespace), newOwner]),
        };
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

    protected deleteSubdomainTx({ namespace }: { namespace: string }): EncodedCall {
        const namespaceArray = namespace.split(".");
        const node = namespaceArray.slice(1).join(".");
        const label = namespaceArray[0];
        return {
            to: this._ensRegistryAddress,
            data: this._ensRegistry.interface.encodeFunctionData("setSubnodeRecord", [
                namehash(node),
                labelhash(label),
                emptyAddress,
                emptyAddress,
                this.ttl,
            ]),
        };
    }

    protected async deleteDomain({ namespace }: { namespace: string }) {
        if (!this._signer) {
            throw new Error(ERROR_MESSAGES.SIGNER_NOT_INITIALIZED);
        }
        await this.send({
            calls: [this.deleteDomainTx({ namespace })],
            from: await this.getOwner({ namespace }),
        });
    }

    protected async getOwner({ namespace }: { namespace: string }) {
        const node = namehash(namespace);
        return this._ensRegistry.owner(node);
    }

    protected async send(tx: Transaction) {
        if (!this._signer) {
            throw new Error(ERROR_MESSAGES.SIGNER_NOT_INITIALIZED);
        }
        for await (const call of tx.calls) {
            await (await this._signer.sendTransaction({ ...call, ...this._transactionOverrides })).wait();
        }
    }

    protected deleteDomainTx({ namespace }: { namespace: string }): EncodedCall {
        return {
            to: this._ensRegistryAddress,
            data: this._ensRegistry.interface.encodeFunctionData("setRecord", [
                namehash(namespace),
                emptyAddress,
                emptyAddress,
                this.ttl,
            ]),
        };
    }

    protected async deleteSubdomain({ namespace }: { namespace: string }) {
        if (!this._signer) {
            throw new Error(ERROR_MESSAGES.SIGNER_NOT_INITIALIZED);
        }
        await this.send({
            calls: [this.deleteSubdomainTx({ namespace })],
            from: await this.getOwner({
                namespace: namespace.split(".").slice(1).join(""),
            }),
        });
    }

    private async initChain() {
        const { chainId } = await this._provider.getNetwork();
        const {
            ensRegistryAddress,
            ensResolverAddress,
            ensPublicResolverAddress,
            domainNotifierAddress,
            didContractAddress,
            assetManagerAddress,
            claimManagerAddress,
        } = chainConfigs[chainId];

        if (!ensRegistryAddress)
            throw new Error(`Chain config for chainId: ${chainId} does not contain ensRegistryAddress`);
        if (!ensResolverAddress)
            throw new Error(`Chain config for chainId: ${chainId} does not contain ensResolverAddress`);
        if (!didContractAddress)
            throw new Error(`Chain config for chainId: ${chainId} does not contain didContractAddress`);
        if (!assetManagerAddress)
            throw new Error(`Chain config for chainId: ${chainId} does not contain assetManagerContractAddress`);
        if (!claimManagerAddress) {
            throw new Error(`Chain config for chainId: ${chainId} does not contain claimManagerAddress`);
        }
        if (!this._signer) {
            throw new Error(ERROR_MESSAGES.SIGNER_NOT_INITIALIZED);
        }

        this._registrySetting = {
            address: didContractAddress,
            method: Methods.Erc1056,
        };

        this._ensRegistryAddress = ensRegistryAddress;
        this._ensResolverAddress = ensResolverAddress;
        this._assetManager = IdentityManager__factory.connect(assetManagerAddress, this._signer);
        this._ensRegistry = ENSRegistry__factory.connect(ensRegistryAddress, this._provider);
        this._domainDefinitionReader = new DomainReader({ ensRegistryAddress, provider: this._provider });
        ensPublicResolverAddress &&
            this._domainDefinitionReader.addKnownResolver({
                chainId,
                address: ensPublicResolverAddress,
                type: ResolverContractType.PublicResolver,
            });
        ensResolverAddress &&
            this._domainDefinitionReader.addKnownResolver({
                chainId,
                address: ensResolverAddress,
                type: ResolverContractType.RoleDefinitionResolver_v1,
            });
        this._domainDefinitionTransactionFactory = new DomainTransactionFactory({
            domainResolverAddress: ensResolverAddress,
        });
        this._domainHierarchy = new DomainHierarchy({
            domainReader: this._domainDefinitionReader,
            ensRegistryAddress: this._ensRegistry.address,
            provider: this._provider,
            domainNotifierAddress: domainNotifierAddress,
            publicResolverAddress: ensPublicResolverAddress,
        });
        this._claimManager = ClaimManager__factory.connect(claimManagerAddress, this._signer);

        this._messagingOptions = messagingOptions[chainId];
    }

    // ### ASSETS ###

    protected offerAssetTx({
        offerTo,
        assetContractAddress,
    }: {
        offerTo: string;
        assetContractAddress: string;
    }): EncodedCall {
        const asset = OfferableIdentity__factory.connect(assetContractAddress, this._provider);
        return {
            data: asset.interface.encodeFunctionData("offer", [offerTo]),
            to: assetContractAddress,
        };
    }

    protected acceptOfferTx({ assetContractAddress }: { assetContractAddress: string }): EncodedCall {
        const asset = OfferableIdentity__factory.connect(assetContractAddress, this._provider);
        return {
            data: asset.interface.encodeFunctionData("acceptOffer"),
            to: assetContractAddress,
        };
    }

    protected rejectOfferTx({ assetContractAddress }: { assetContractAddress: string }): EncodedCall {
        const asset = OfferableIdentity__factory.connect(assetContractAddress, this._provider);
        return {
            data: asset.interface.encodeFunctionData("rejectOffer"),
            to: assetContractAddress,
        };
    }

    protected cancelOfferTx({ assetContractAddress }: { assetContractAddress: string }): EncodedCall {
        const asset = OfferableIdentity__factory.connect(assetContractAddress, this._provider);
        return {
            data: asset.interface.encodeFunctionData("cancelOffer"),
            to: assetContractAddress,
        };
    }
}
