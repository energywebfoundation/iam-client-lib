import WalletConnectProvider from "@walletconnect/web3-provider";
import { providers, Signer, utils, errors } from "ethers";
import { abi1056, address1056, Operator, Resolver } from "@ew-did-registry/did-ethr-resolver";
import { abi as ensResolverContract } from "@ensdomains/resolver/build/contracts/PublicResolver.json";
import { labelhash, namehash } from "../utils/ENS_hash";
import {
  IResolverSettings,
  IServiceEndpoint,
  ProviderTypes
} from "@ew-did-registry/did-resolver-interface";
import { Methods } from "@ew-did-registry/did";
import { DIDDocumentFull } from "@ew-did-registry/did-document";
import { ClaimsIssuer, ClaimsUser, ClaimsVerifier } from "@ew-did-registry/claims";
import { DidStore } from "@ew-did-registry/did-ipfs-store";
import { EnsRegistryFactory } from "../../ethers/EnsRegistryFactory";
import { PublicResolverFactory } from "../../ethers/PublicResolverFactory";
import { EnsRegistry } from "../../ethers/EnsRegistry";
import { PublicResolver } from "../../ethers/PublicResolver";
import { JWT } from "@ew-did-registry/jwt";
import { ICacheServerClient } from "../iam-client-lib";
import { Keys } from "@ew-did-registry/keys";
import { isBrowser } from "../utils/isBrowser";
import { connect, NatsConnection, JSONCodec, Codec } from "nats.ws";
import { ENSRegistryNotInitializedError, MethodNotAvailableInNodeEnvError } from "../errors";

const { hexlify, bigNumberify, Interface } = utils;

export enum MessagingMethod {
  CacheServer = "cacheServer",
  WebRTC = "webRTC",
  SmartContractStorage = "smartContractStorage"
}

type ConnectionOptions = {
  rpcUrl: string;
  chainId?: number;
  infuraId?: string;
  ensResolverAddress?: string;
  ensRegistryAddress?: string;
  ipfsUrl?: string;
  bridgeUrl?: string;
  messagingMethod?: MessagingMethod;
  natsServerUrl?: string;
  cacheClient?: ICacheServerClient;
};

export class IAMBase {
  protected _runningInBrowser: boolean;

  protected _did: string | undefined;
  protected _provider: providers.JsonRpcProvider | undefined;
  protected _walletConnectProvider: WalletConnectProvider | undefined;
  protected _address: string | undefined;
  protected _signer: Signer | undefined;

  protected _resolverSetting: IResolverSettings;
  protected _resolver: Resolver | undefined;
  protected _document: DIDDocumentFull | undefined;
  protected _userClaims: ClaimsUser | undefined;
  protected _issuerClaims: ClaimsIssuer | undefined;
  protected _verifierClaims: ClaimsVerifier | undefined;
  protected _ipfsStore: DidStore;
  protected _jwt: JWT | undefined;

  protected _ensRegistry: EnsRegistry | undefined;
  protected _ensResolver: PublicResolver | undefined;
  protected _ensResolverAddress: string;
  protected _ensRegistryAddress: string;

  protected _cacheClient: ICacheServerClient | undefined;

  protected _natsServerUrl: string | undefined;
  protected _natsConnection: NatsConnection | undefined;
  protected _jsonCodec: Codec<any> | undefined;

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
    chainId = 1,
    infuraId,
    ensRegistryAddress = "0xd7CeF70Ba7efc2035256d828d5287e2D285CD1ac",
    ensResolverAddress = "0x0a97e07c4Df22e2e31872F20C5BE191D5EFc4680",
    ipfsUrl = "https://ipfs.infura.io:5001/api/v0/",
    cacheClient,
    messagingMethod,
    natsServerUrl,
    bridgeUrl = "https://walletconnect.energyweb.org"
  }: ConnectionOptions) {
    this._runningInBrowser = isBrowser();
    this._ensRegistryAddress = ensRegistryAddress;
    this._ensResolverAddress = ensResolverAddress;

    errors.setLogLevel("error");

    if (this._runningInBrowser) {
      this._walletConnectProvider = new WalletConnectProvider({
        rpc: {
          [chainId]: rpcUrl
        },
        infuraId,
        bridge: bridgeUrl
      });
      this._cacheClient = cacheClient;
    }

    this._resolverSetting = {
      provider: {
        uriOrInfo: rpcUrl,
        type: ProviderTypes.HTTP
      },
      abi: abi1056,
      address: address1056,
      method: Methods.Erc1056
    };

    this._ipfsStore = new DidStore(ipfsUrl);
    this._provider = new providers.JsonRpcProvider(rpcUrl);

    if (messagingMethod && messagingMethod === MessagingMethod.CacheServer && natsServerUrl) {
      this._natsServerUrl = natsServerUrl;
      this._jsonCodec = JSONCodec();
    }
  }

  // INITIAL

  protected async init() {
    if (this._runningInBrowser) {
      await this.setupBrowserEnv();
    }
    this.setupUniversalEnv();
  }

  private async setupBrowserEnv() {
    if (this._walletConnectProvider) {
      await this._walletConnectProvider.enable();
      this._signer = new providers.Web3Provider(this._walletConnectProvider).getSigner();
      this.setAddress();
      this.setDid();
      await this.setDocument();
      this.setClaims();
      await this.setupNATS();
    }
  }

  private setupUniversalEnv() {
    this.setResolver();
    this.setJWT();
    this.setupENS();
  }

  private setAddress() {
    if (this._walletConnectProvider) {
      this._address = this._walletConnectProvider.accounts[0];
    }
  }

  private setResolver() {
    if (this._resolverSetting) {
      this._resolver = new Resolver(this._resolverSetting);
    }
  }

  private setDid() {
    this._did = `did:${Methods.Erc1056}:${this._address}`;
  }

  private setupENS() {
    if (this._provider) {
      this._ensRegistry = EnsRegistryFactory.connect(this._ensRegistryAddress, this._provider);
      this._ensResolver = PublicResolverFactory.connect(this._ensResolverAddress, this._provider);
    }
  }

  private async setDocument() {
    if (this._did && this._signer) {
      const document = new DIDDocumentFull(
        this._did,
        new Operator(this._signer, this._resolverSetting)
      );
      await document.create();
      this._document = document;
    }
  }

  private setClaims() {
    if (this._signer && this._document) {
      this._userClaims = new ClaimsUser(this._signer, this._document, this._ipfsStore);
      this._issuerClaims = new ClaimsIssuer(this._signer, this._document, this._ipfsStore);
      this._verifierClaims = new ClaimsVerifier(this._signer, this._document, this._ipfsStore);
    }
  }

  private setJWT() {
    if (this._signer) {
      this._jwt = new JWT(this._signer);
    }
    this._jwt = new JWT(new Keys());
  }

  private async setupNATS() {
    if (this._natsServerUrl) {
      this._natsConnection = await connect({ servers: `ws://${this._natsServerUrl}` });
      console.log(`Nats server connected at ${this._natsConnection.getServer()}`);
    }
  }

  protected async downloadClaims({ services }: { services: IServiceEndpoint[] }) {
    return Promise.all(
      services.map(async ({ serviceEndpoint, ...rest }) => {
        const data = await this._ipfsStore.get(serviceEndpoint);
        const { claimData } = this._jwt?.decode(data) as { claimData: Record<string, string> };
        return {
          serviceEndpoint,
          ...rest,
          ...claimData
        };
      })
    );
  }

  protected async createSubdomain({ subdomain, domain }: { subdomain: string; domain: string }) {
    if (this._signer && this._ensRegistry && this._address) {
      const ensRegistryWithSigner = this._ensRegistry.connect(this._signer);
      const roleHash = labelhash(subdomain) as string;
      const namespaceHash = namehash(domain) as string;
      const ttl = bigNumberify(0);
      const setDomainTx = await ensRegistryWithSigner.setSubnodeRecord(
        namespaceHash,
        roleHash,
        this._address,
        this._ensResolverAddress,
        ttl,
        {
          gasLimit: hexlify(4900000),
          gasPrice: hexlify(0.1)
        }
      );
      await setDomainTx.wait();
      console.log(`Subdomain ${subdomain + "." + domain} created`);
      return;
    }
    throw new MethodNotAvailableInNodeEnvError("Create Subdomain");
  }

  protected async setDomainName({ domain }: { domain: string }) {
    if (this._signer && this._ensResolver) {
      const ensResolverWithSigner = this._ensResolver.connect(this._signer);
      const namespaceHash = namehash(domain) as string;
      const setDomainNameTx = await ensResolverWithSigner.setName(namespaceHash, domain, {
        gasLimit: utils.hexlify(4900000),
        gasPrice: utils.hexlify(0.1)
      });
      await setDomainNameTx.wait();
      console.log(`Set the name of the domain to ${domain}`);
      return;
    }
    throw new MethodNotAvailableInNodeEnvError("Create Subdomain");
  }

  protected async changeSubdomainOwner({
    newOwner,
    label,
    namespace
  }: {
    newOwner: string;
    namespace: string;
    label: string;
  }) {
    if (!this._ensRegistry) {
      throw new ENSRegistryNotInitializedError();
    }
    if (!this._signer) {
      throw new Error("Signer not initialized");
    }
    const ensRegistryWithSigner = this._ensRegistry.connect(this._signer);
    const namespaceHash = namehash(namespace);
    const labelHash = labelhash(label);
    const tx = await ensRegistryWithSigner.setSubnodeOwner(namespaceHash, labelHash, newOwner, {
      gasLimit: hexlify(4900000),
      gasPrice: hexlify(0.1)
    });
    await tx.wait();
  }

  protected async getFilteredDomainsFromEvent({ domain }: { domain: string }) {
    if (this._ensResolver && this._provider) {
      const ensInterface = new Interface(ensResolverContract);
      const Event = this._ensResolver.filters.TextChanged(null, "metadata", null);
      const filter = {
        fromBlock: 0,
        toBlock: "latest",
        address: Event.address,
        topics: [...(Event.topics as string[])]
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
}
