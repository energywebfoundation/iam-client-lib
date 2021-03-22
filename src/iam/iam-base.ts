import { providers, Signer, utils, errors, Wallet } from "ethers";
import { ethrReg, Operator, Resolver } from "@ew-did-registry/did-ethr-resolver";
import { labelhash, namehash } from "../utils/ENS_hash";
import { IServiceEndpoint, RegistrySettings } from "@ew-did-registry/did-resolver-interface";
import { Methods } from "@ew-did-registry/did";
import { DIDDocumentFull } from "@ew-did-registry/did-document";
import { ClaimsIssuer, ClaimsUser, ClaimsVerifier } from "@ew-did-registry/claims";
import { DidStore } from "@ew-did-registry/did-ipfs-store";
import { EnsRegistryFactory } from "../../ethers/EnsRegistryFactory";
import { PublicResolverFactory } from "../../ethers/PublicResolverFactory";
import { EnsRegistry } from "../../ethers/EnsRegistry";
import { PublicResolver } from "../../ethers/PublicResolver";
import { JWT } from "@ew-did-registry/jwt";
import { ICacheServerClient } from "../cacheServerClient/ICacheServerClient";
import { isBrowser } from "../utils/isBrowser";
import { connect, NatsConnection, JSONCodec, Codec } from "nats.ws";
import { ERROR_MESSAGES } from "../errors";
import {
  IAppDefinition,
  IOrganizationDefinition,
  IRoleDefinition
} from "../cacheServerClient/cacheServerClient.types";
import difference from "lodash.difference";
import { TransactionOverrides } from "../../ethers";
import detectMetamask from "@metamask/detect-provider";
import { Owner as IdentityOwner } from "../signer/Signer";
import { WalletProvider } from "../types/WalletProvider";
import { SignerFactory } from "../signer/SignerFactory";
import { CacheServerClient } from "../cacheServerClient/cacheServerClient";
import { emptyAddress, MessagingMethod, NODE_FIELDS_KEY, PUBLIC_KEY, WALLET_PROVIDER } from "../utils/constants";
import {
  cacheServerClientOptions,
  chainConfigs,
  messagingOptions,
  MessagingOptions
} from "./chainConfig";
import { WalletConnectService } from "../walletconnect/WalletConnectService";

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

export type EncodedCall = {
  to: string;
  data: string;
  value?: string;
};

export type Transaction = {
  calls: EncodedCall[];
  from: string;
};

export interface ClaimData extends Record<string, unknown> {
  profile?: any;
  claimType?: string;
  claimTypeVersion?: string;
}

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
  protected _transactionOverrides: TransactionOverrides = {};
  protected _providerType: WalletProvider | undefined;
  protected _publicKey: string | undefined;

  protected _registrySetting: RegistrySettings;
  protected _resolver: Resolver;
  protected _document: DIDDocumentFull | undefined;
  protected _userClaims: ClaimsUser | undefined;
  protected _issuerClaims: ClaimsIssuer | undefined;
  protected _verifierClaims: ClaimsVerifier | undefined;
  protected _ipfsStore: DidStore;
  protected _jwt: JWT | undefined;

  protected _ensRegistry: EnsRegistry;
  protected _ensResolver: PublicResolver;
  protected _ensResolverAddress: string;
  protected _ensRegistryAddress: string;

  protected _cacheClient: ICacheServerClient;

  protected _messagingOptions: MessagingOptions;
  protected _natsConnection: NatsConnection | undefined;
  protected _jsonCodec: Codec<any> | undefined;

  private ttl = bigNumberify(0);

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
    ewKeyManagerUrl = "https://km.aws.energyweb.org/connect/new"
  }: ConnectionOptions = {}) {
    this._runningInBrowser = isBrowser();
    errors.setLogLevel("error");

    this._connectionOptions = {
      privateKey,
      rpcUrl,
      bridgeUrl,
      infuraId
    };

    this._ipfsStore = new DidStore(ipfsUrl);

    if (this._runningInBrowser) {
      this._providerType = localStorage.getItem(WALLET_PROVIDER) as WalletProvider;
      const publicKey = localStorage.getItem(PUBLIC_KEY);
      if (publicKey) {
        this._publicKey = publicKey;
      }
    }

    this._walletConnectService = new WalletConnectService(bridgeUrl, infuraId, ewKeyManagerUrl);
  }

  // INITIAL

  protected async init({
    initializeMetamask,
    walletProvider: walletProvider
  }: {
    initializeMetamask?: boolean;
    walletProvider?: WalletProvider;
  }) {
    await this.initSigner({ walletProvider, initializeMetamask });
    await this.initChain();
    this.initEventHandlers();

    if (this._runningInBrowser) {
      await this.setupMessaging();
    }
    if (this._signer) {
      this._didSigner = await SignerFactory.create({
        provider: this._provider,
        signer: this._signer,
        publicKey: this._publicKey
      });
      this._publicKey = this._didSigner.publicKey;
      this._didSigner.identityToken &&
        (await this.loginToCacheServer(this._didSigner.identityToken));
      await this.setAddress();
      this.setDid();
      await this.setDocument();
      this.setClaims();
    }
    this.setResolver();
    this.setJWT();
    this.storeSession();
  }

  private async initSigner({
    initializeMetamask,
    walletProvider
  }: {
    useMetamask?: boolean;
    initializeMetamask?: boolean;
    walletProvider?: WalletProvider;
  }) {
    const { privateKey, rpcUrl } = this._connectionOptions;

    if (!this._runningInBrowser) {
      if (!privateKey) {
        throw new Error(ERROR_MESSAGES.NO_PRIVATE_KEY);
      }
      if (!rpcUrl) {
        throw new Error(ERROR_MESSAGES.NO_RPC_URL);
      }
    }

    if (privateKey && rpcUrl) {
      this._provider = new JsonRpcProvider({ url: rpcUrl });
      this._signer = new Wallet(privateKey, this._provider);
      return;
    }

    if (walletProvider === WalletProvider.MetaMask) {
      const metamaskProvider: any = await detectMetamask({
        mustBeMetaMask: true
      });
      if (!metamaskProvider) {
        throw new Error(ERROR_MESSAGES.METAMASK_EXTENSION_NOT_AVAILABLE);
      }
      this._metamaskProvider = metamaskProvider;
      const requestObject = {
        method: initializeMetamask ? "wallet_requestPermissions" : "eth_accounts",
        params: [
          {
            eth_accounts: {}
          }
        ]
      };
      const accounts: string[] = await metamaskProvider.request(requestObject);

      if (!initializeMetamask && accounts.length < 1) {
        await metamaskProvider.request({
          method: "wallet_requestPermissions",
          params: [
            {
              eth_accounts: {}
            }
          ]
        });
      }
      this._signer = new providers.Web3Provider(metamaskProvider).getSigner();

      this._providerType = walletProvider;
      this._provider = this._signer.provider as providers.Web3Provider;
      console.log("metamask chain id:", (await this._provider.getNetwork()).chainId);
      return;
    }
    if (
      walletProvider &&
      [WalletProvider.EwKeyManager, WalletProvider.WalletConnect].includes(walletProvider)
    ) {
      this._transactionOverrides = {
        gasLimit: hexlify(4900000),
        gasPrice: hexlify(0.1)
      };
      await this._walletConnectService.initialize(walletProvider);
      const wcProvider = this._walletConnectService.getProvider();
      this._signer = new providers.Web3Provider(wcProvider).getSigner();
      this._provider = this._signer.provider as providers.Web3Provider;
      this._providerType = walletProvider;
      return;
    }
    throw new Error(ERROR_MESSAGES.WALLET_TYPE_NOT_PROVIDED);
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
        isMetamask === false &&
          this._walletConnectService.getProvider()?.wc.on("disconnect", eventHandler);
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

  private async loginToCacheServer(token: string) {
    if (this._cacheClient) {
      await this._cacheClient.login(token);
    }
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
    this._did = `did:${Methods.Erc1056}:${this._address}`;
  }

  private async setDocument() {
    if (this._did && this._didSigner) {
      const document = new DIDDocumentFull(
        this._did,
        new Operator(this._didSigner, this._registrySetting)
      );
      await document.create();
      this._document = document;
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
    if (this._didSigner) {
      this._jwt = new JWT(this._didSigner);
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
            pingInterval: 50 * 1000
          }),
          new Promise<undefined>(resolve => setTimeout(resolve, timeout))
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
          ...claimRest
        } as IServiceEndpoint & ClaimData;
      })
    );
  }

  protected createSubdomainTx({
    domain,
    nodeName,
    owner = this._address as string
  }: {
    domain: string;
    nodeName: string;
    owner?: string;
  }): EncodedCall {
    return {
      to: this._ensRegistryAddress,
      data: this._ensRegistry.interface.functions.setSubnodeRecord.encode([
        namehash(domain),
        labelhash(nodeName),
        owner,
        this._ensResolverAddress,
        this.ttl
      ])
    };
  }

  protected setDomainNameTx({ domain }: { domain: string }): EncodedCall {
    const namespaceHash = namehash(domain) as string;
    return {
      to: this._ensResolverAddress,
      data: this._ensResolver?.interface.functions.setName.encode([namespaceHash, domain])
    };
  }

  protected changeSubdomainOwnerTx({
    newOwner,
    label,
    namespace
  }: {
    newOwner: string;
    namespace: string;
    label: string;
  }): EncodedCall {
    return {
      to: this._ensRegistryAddress,
      data: this._ensRegistry.interface.functions.setSubnodeOwner.encode([
        namehash(namespace),
        labelhash(label),
        newOwner
      ])
    };
  }

  protected changeDomainOwnerTx({
    newOwner,
    namespace
  }: {
    newOwner: string;
    namespace: string;
  }): EncodedCall {
    return {
      to: this._ensRegistryAddress,
      data: this._ensRegistry.interface.functions.setOwner.encode([namehash(namespace), newOwner])
    };
  }

  protected async validateIssuers({ issuer, namespace }: { issuer: string[]; namespace: string }) {
    const roleHash = namehash(namespace);
    const metadata = await this._ensResolver.text(roleHash, "metadata");
    const definition = JSON.parse(metadata) as IRoleDefinition;
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
      data: this._ensRegistry.interface.functions.setSubnodeRecord.encode([
        namehash(node),
        labelhash(label),
        emptyAddress,
        emptyAddress,
        this.ttl
      ])
    };
  }

  protected async deleteDomain({ namespace }: { namespace: string }) {
    if (!this._signer) {
      throw new Error(ERROR_MESSAGES.SIGNER_NOT_INITIALIZED);
    }
    await this.send({
      calls: [this.deleteDomainTx({ namespace })],
      from: await this.getOwner({ namespace })
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
      data: this._ensRegistry.interface.functions.setRecord.encode([
        namehash(namespace),
        emptyAddress,
        emptyAddress,
        this.ttl
      ])
    };
  }

  protected setDomainDefinitionTx({
    domain,
    data
  }: {
    domain: string;
    data: IAppDefinition | IOrganizationDefinition | IRoleDefinition;
  }): EncodedCall {
    return {
      to: this._ensResolverAddress,
      data: this._ensResolver.interface.functions.setText.encode([
        namehash(domain),
        NODE_FIELDS_KEY,
        JSON.stringify(data)
      ])
    };
  }

  protected async deleteSubdomain({ namespace }: { namespace: string }) {
    if (!this._signer) {
      throw new Error(ERROR_MESSAGES.SIGNER_NOT_INITIALIZED);
    }
    await this.send({
      calls: [this.deleteSubdomainTx({ namespace })],
      from: await this.getOwner({
        namespace: namespace
          .split(".")
          .slice(1)
          .join("")
      })
    });
  }

  private async initChain() {
    const { chainId } = await this._provider.getNetwork();
    const { ensRegistryAddress, ensResolverAddress, didContractAddress } = chainConfigs[chainId];

    if (!ensRegistryAddress)
      throw new Error(`Chain config for chainId: ${chainId} does not contain ensRegistryAddress`);
    if (!ensResolverAddress)
      throw new Error(`Chain config for chainId: ${chainId} does not contain ensResolverAddress`);
    if (!didContractAddress)
      throw new Error(`Chain config for chainId: ${chainId} does not contain didContractAddress`);

    this._registrySetting = {
      address: didContractAddress,
      abi: abi1056,
      method: Methods.Erc1056
    };

    this._ensRegistryAddress = ensRegistryAddress;
    this._ensResolverAddress = ensResolverAddress;
    this._ensRegistry = EnsRegistryFactory.connect(ensRegistryAddress, this._provider);
    this._ensResolver = PublicResolverFactory.connect(ensResolverAddress, this._provider);

    const cacheOptions = cacheServerClientOptions[chainId];

    cacheOptions.url && (this._cacheClient = new CacheServerClient(cacheOptions));

    this._messagingOptions = messagingOptions[chainId];
  }
}
