import WalletConnectProvider from "@walletconnect/web3-provider";
import { providers, Signer, utils, errors, Wallet } from "ethers";
import { ethrReg, Operator, Resolver, VoltaAddress1056 } from "@ew-did-registry/did-ethr-resolver";
import { abi as ensResolverContract } from "@ensdomains/resolver/build/contracts/PublicResolver.json";
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
import { ICacheServerClient } from "../cacheServerClient/cacheServerClient";
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
import { Provider } from "ethers/providers";
import { Owner as IdentityOwner } from "../signer/Signer";
import { WalletProvider } from "../types/WalletProvider";
import { SignerFactory } from "../signer/SignerFactory";

const { hexlify, bigNumberify, Interface } = utils;
const { abi: abi1056 } = ethrReg;

export const VOLTA_CHAIN_ID = 73799;

export enum MessagingMethod {
  CacheServer = "cacheServer",
  WebRTC = "webRTC",
  SmartContractStorage = "smartContractStorage"
}

export type ConnectionOptions = {
  rpcUrl: string;
  chainId?: number;
  infuraId?: string;
  ensResolverAddress?: string;
  ensRegistryAddress?: string;
  didContractAddress?: string;
  ipfsUrl?: string;
  bridgeUrl?: string;
  messagingMethod?: MessagingMethod;
  natsServerUrl?: string;
  cacheClient?: ICacheServerClient;
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

export const emptyAddress = "0x0000000000000000000000000000000000000000";

export const WALLET_PROVIDER = "WalletProvider";
export const PUBLIC_KEY = "PublicKey";

/**
 * @class
 */
export class IAMBase {
  protected _runningInBrowser: boolean;
  protected _connectionOptions: {
    rpcUrl: string;
    chainId: number;
    privateKey?: string;
    bridgeUrl: string;
    infuraId?: string;
  };

  protected _did: string | undefined;
  protected _provider: providers.JsonRpcProvider;
  protected _walletConnectProvider: WalletConnectProvider | undefined;
  protected _address: string | undefined;
  protected _signer: Signer | undefined;
  protected _safeAddress: string | undefined;
  protected _didSigner: IdentityOwner | undefined;
  protected _transactionOverrides: TransactionOverrides = {};
  protected _providerType: WalletProvider | undefined;
  protected _publicKey: string | undefined;

  protected _registrySetting: RegistrySettings;
  protected _resolver: Resolver | undefined;
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

  protected _cacheClient: ICacheServerClient | undefined;

  protected _natsServerUrl: string | undefined;
  protected _natsConnection: NatsConnection | undefined;
  protected _jsonCodec: Codec<any> | undefined;

  private readonly _ewKeyManagerUrl: string;
  private ttl = bigNumberify(0);

  /**
   * IAM Constructor
   *
   * @param {object} options connection options to connect with wallet connect
   * @param {string} options.rpcUrl url to the ethereum network
   * @param {number} options.chainID id of chain, default = 1
   * @param {number} options.infuraId id of infura network, default = undefined
   *
   */
  public constructor({
    rpcUrl,
    chainId = VOLTA_CHAIN_ID,
    infuraId,
    ensRegistryAddress = "0xd7CeF70Ba7efc2035256d828d5287e2D285CD1ac",
    ensResolverAddress = "0x0a97e07c4Df22e2e31872F20C5BE191D5EFc4680",
    ipfsUrl = "https://ipfs.infura.io:5001/api/v0/",
    cacheClient,
    messagingMethod,
    natsServerUrl,
    bridgeUrl = "https://walletconnect.energyweb.org",
    privateKey,
    didContractAddress = VoltaAddress1056,
    ewKeyManagerUrl = "https://km.aws.energyweb.org/connect/new"
  }: ConnectionOptions) {
    this._runningInBrowser = isBrowser();
    this._ensRegistryAddress = ensRegistryAddress;
    this._ensResolverAddress = ensResolverAddress;

    errors.setLogLevel("error");

    this._connectionOptions = {
      chainId,
      privateKey,
      rpcUrl,
      bridgeUrl,
      infuraId
    };

    this._cacheClient = cacheClient;

    this._registrySetting = {
      abi: abi1056,
      address: didContractAddress,
      method: Methods.Erc1056
    };

    this._ipfsStore = new DidStore(ipfsUrl);
    this._provider = new providers.JsonRpcProvider(rpcUrl);
    this._ensRegistry = EnsRegistryFactory.connect(this._ensRegistryAddress, this._provider);
    this._ensResolver = PublicResolverFactory.connect(this._ensResolverAddress, this._provider);
    if (this._runningInBrowser && process.env.NODE_ENV !== "test") {
      this._providerType = (sessionStorage.getItem(WALLET_PROVIDER) as WalletProvider) || undefined;
      this._publicKey = sessionStorage.getItem(PUBLIC_KEY) || undefined;
    }

    if (messagingMethod && messagingMethod === MessagingMethod.CacheServer && natsServerUrl) {
      this._natsServerUrl = natsServerUrl;
      this._jsonCodec = JSONCodec();
    }

    this._ewKeyManagerUrl = ewKeyManagerUrl;
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
    const signerChainId = (await this._signer?.provider?.getNetwork())?.chainId;
    if (signerChainId !== VOLTA_CHAIN_ID) {
      throw new Error(ERROR_MESSAGES.NOT_CONNECTED_TO_VOLTA);
    }
    if (this._runningInBrowser) {
      await this.setupNATS();
    }
    if (this._signer) {
      this._didSigner = await SignerFactory.create({
        provider: this._provider,
        signer: this._signer,
        publicKey: this._publicKey
      });
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
    if (!this._provider) {
      throw new Error(ERROR_MESSAGES.NO_PROVIDER);
    }

    if (!this._runningInBrowser && !this._connectionOptions.privateKey) {
      throw new Error(ERROR_MESSAGES.NO_PRIVATE_KEY);
    }

    if (this._connectionOptions.privateKey) {
      this._signer = new Wallet(this._connectionOptions.privateKey, this._provider);
      return;
    }

    if (walletProvider === WalletProvider.MetaMask) {
      const metamaskProvider: any = await detectMetamask({
        mustBeMetaMask: true
      });
      if (!metamaskProvider) {
        throw new Error(ERROR_MESSAGES.METAMASK_EXTENSION_NOT_AVAILABLE);
      }
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

      metamaskProvider.on("networkChanged", () => {
        this.closeConnection();
      });
      metamaskProvider.on("accountsChanged", () => {
        this.closeConnection();
      });

      this._providerType = walletProvider;
      return;
    }
    if (
      walletProvider === WalletProvider.EwKeyManager ||
      walletProvider === WalletProvider.WalletConnect
    ) {
      this._transactionOverrides = {
        gasLimit: hexlify(4900000),
        gasPrice: hexlify(0.1)
      };

      const showQRCode = !(walletProvider === WalletProvider.EwKeyManager);

      this._walletConnectProvider = new WalletConnectProvider({
        rpc: {
          [this._connectionOptions.chainId]: this._connectionOptions.rpcUrl
        },
        infuraId: this._connectionOptions.infuraId,
        bridge: this._connectionOptions.bridgeUrl,
        qrcode: showQRCode
      });

      if (walletProvider === WalletProvider.EwKeyManager) {
        this._walletConnectProvider.wc.on("display_uri", (err, payload) => {
          // uri is expected to be WalletConnect Standard URI https://eips.ethereum.org/EIPS/eip-1328
          const wcUri = payload.params[0];

          const encoded = encodeURIComponent(wcUri);
          const hasQueryString = this._ewKeyManagerUrl.includes("?");
          const url = `${this._ewKeyManagerUrl}${hasQueryString ? "&" : "?"}uri=${encoded}`;
          window.open(url, "_blank");
        });
      }

      await this._walletConnectProvider.enable();

      this._walletConnectProvider.wc.on("session_update", () => {
        this.closeConnection();
      });

      this._walletConnectProvider.wc.on("disconnect", () => {
        this.closeConnection();
      });

      this._signer = new providers.Web3Provider(this._walletConnectProvider).getSigner();
      this._providerType = walletProvider;
      return;
    }
    throw new Error(ERROR_MESSAGES.WALLET_TYPE_NOT_PROVIDED);
  }

  private storeSession() {
    if (this._runningInBrowser && this._didSigner) {
      sessionStorage.setItem(WALLET_PROVIDER, this._providerType as string);
      sessionStorage.setItem(PUBLIC_KEY, this._didSigner.publicKey);
    }
  }

  protected clearSession() {
    if (this._runningInBrowser) {
      sessionStorage.removeItem(WALLET_PROVIDER);
      sessionStorage.removeItem(PUBLIC_KEY);
    }
  }

  /**
   * Close connection to wallet
   * @description closes the connection between dApp and the wallet
   *
   */

  async closeConnection() {
    if (this._walletConnectProvider) {
      await this._walletConnectProvider.close();
    }
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
      this._resolver = new Resolver(this._provider as Provider, this._registrySetting);
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

  private async setupNATS() {
    if (this._natsServerUrl) {
      try {
        let protocol = "ws";
        if (this._natsServerUrl.indexOf("https://") === 0) {
          protocol = "wss";
        }
        const timeout = 3000;
        // this race condition duplicate timeout is there because unable to catch the error that occurs when NATS.ws timeouts
        const connection = await Promise.race<NatsConnection | undefined>([
          connect({
            servers: `${protocol}://${this._natsServerUrl}`,
            timeout
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
          claimData: Record<string, string>;
        };
        return {
          serviceEndpoint,
          ...rest,
          ...claimData,
          ...claimRest
        };
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

  protected async getFilteredDomainsFromEvent({ domain }: { domain: string }) {
    if (this._ensResolver && this._provider) {
      const ensInterface = new Interface(ensResolverContract);
      const Event = this._ensResolver.filters.TextChanged(null, "metadata", null);
      const filter = {
        fromBlock: 0,
        toBlock: "latest",
        address: Event.address,
        topics: Event.topics || []
      };
      const logs = await this._provider.getLogs(filter);
      const rawLogs = logs.map(log => {
        const parsedLog = ensInterface.parseLog(log);
        return parsedLog.values;
      });
      const domains = await Promise.all(
        rawLogs.map(async ({ node }) => {
          return this._ensResolver?.name(node);
        })
      );
      const uniqDomains: Record<string, unknown> = {};
      for (const item of domains) {
        if (item && item.endsWith(domain) && !uniqDomains[item]) {
          uniqDomains[item] = null;
        }
      }
      return Object.keys(uniqDomains);
    }
    return [];
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
        "metadata",
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
}
