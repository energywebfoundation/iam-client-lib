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
import {
  ENSRegistryNotInitializedError,
  ENSResolverNotInitializedError,
  MethodNotAvailableInNodeEnvError
} from "../errors";
import { IRoleDefinition } from "../cacheServerClient/cacheServerClient.types";
import difference from "lodash.difference";
import { TransactionOverrides } from "../../ethers";
import detectMetamask from "@metamask/detect-provider";
import { Provider } from "ethers/providers";
import { Owner as IdentityOwner } from "../signer/Signer";
import { arrayify, computePublicKey, hashMessage, keccak256, recoverPublicKey } from "ethers/utils";

const { hexlify, bigNumberify, Interface } = utils;
const { abi: abi1056 } = ethrReg;

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
  didContractAddress?: string;
  ipfsUrl?: string;
  bridgeUrl?: string;
  messagingMethod?: MessagingMethod;
  natsServerUrl?: string;
  cacheClient?: ICacheServerClient;
  privateKey?: string;
};

export const emptyAddress = "0x0000000000000000000000000000000000000000";

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
  protected _provider: providers.JsonRpcProvider | undefined;
  protected _walletConnectProvider: WalletConnectProvider | undefined;
  protected _address: string | undefined;
  protected _signer: Signer | undefined;
  protected _didSigner: IdentityOwner | undefined;
  protected _transactionOverrides: TransactionOverrides = {};

  protected _registrySetting: RegistrySettings;
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
    bridgeUrl = "https://walletconnect.energyweb.org",
    privateKey,
    didContractAddress = VoltaAddress1056
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

    if (messagingMethod && messagingMethod === MessagingMethod.CacheServer && natsServerUrl) {
      this._natsServerUrl = natsServerUrl;
      this._jsonCodec = JSONCodec();
    }
  }

  // INITIAL

  protected async init({
    useMetamask,
    initializeMetamask
  }: {
    useMetamask: boolean;
    initializeMetamask?: boolean;
  }) {
    await this.setupProvider({ useMetamask, initializeMetamask });
    if (this._runningInBrowser) {
      await this.setupBrowserEnv();
    }
    this.setupUniversalEnv();
  }

  private async setupBrowserEnv() {
    await this.setAddress();
    this.setDid();
    await this.setDocument();
    this.setClaims();
    await this.setupNATS();
  }

  private setupUniversalEnv() {
    this.setResolver();
    this.setJWT();
    this.setupENS();
  }

  private async setupProvider({
    useMetamask,
    initializeMetamask
  }: {
    useMetamask: boolean;
    initializeMetamask?: boolean;
  }) {
    this._provider = new providers.JsonRpcProvider(this._connectionOptions.rpcUrl);
    if (this._connectionOptions.privateKey) {
      this._signer = new Wallet(this._connectionOptions.privateKey, this._provider);
      const publicKey = await this.getPublicKey();
      this._didSigner = new IdentityOwner(
        this._signer,
        this._provider,
        publicKey,
        this._connectionOptions.privateKey
      );
      return;
    }
    if (this._runningInBrowser) {
      const metamaskProvider = (await detectMetamask({
        mustBeMetaMask: true
      })) as any;
      if (metamaskProvider && useMetamask) {
        if (initializeMetamask) {
          await metamaskProvider.request({
            method: "wallet_requestPermissions",
            params: [
              {
                eth_accounts: {}
              }
            ]
          });
        } else {
          const accounts: string[] = await metamaskProvider.request({
            method: "eth_accounts",
            params: [
              {
                eth_accounts: {}
              }
            ]
          });
          if (accounts.length < 1) {
            await metamaskProvider.request({
              method: "wallet_requestPermissions",
              params: [
                {
                  eth_accounts: {}
                }
              ]
            });
          }
        }
        const provider = new providers.Web3Provider(metamaskProvider);
        this._signer = provider.getSigner();
        const publicKey = await this.getPublicKey();
        this._didSigner = new IdentityOwner(this._signer, this._provider, publicKey);
        return;
      }
      this._transactionOverrides = {
        gasLimit: hexlify(4900000),
        gasPrice: hexlify(0.1)
      };
      this._walletConnectProvider = new WalletConnectProvider({
        rpc: {
          [this._connectionOptions.chainId]: this._connectionOptions.rpcUrl
        },
        infuraId: this._connectionOptions.infuraId,
        bridge: this._connectionOptions.bridgeUrl
      });
      await this._walletConnectProvider.enable();
      this._signer = new providers.Web3Provider(this._walletConnectProvider).getSigner();
      const publicKey = await this.getPublicKey();
      this._didSigner = new IdentityOwner(this._signer, this._provider, publicKey);
    }
  }

  private async getPublicKey() {
    if (this._signer) {
      const address = await this._signer.getAddress();
      const hash = keccak256(address);
      const digest = hashMessage(arrayify(hash));
      if (((this._signer?.provider as any)?.provider as WalletConnectProvider)?.isWalletConnect) {
        const sig = await this._signer.signMessage(arrayify(digest));
        return computePublicKey(recoverPublicKey(digest, sig), true).slice(2);
      }
      const sig = await this._signer.signMessage(arrayify(hash));
      return computePublicKey(recoverPublicKey(digest, sig), true).slice(2);
    }
    throw new Error("Signer not initialized");
  }

  private async setAddress() {
    if (this._signer) {
      this._address = await this._signer.getAddress();
    }
  }

  private setResolver() {
    if (this._registrySetting) {
      this._resolver = new Resolver(this._provider as Provider, this._registrySetting);
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
    throw new Error("Signer not available");
  }

  private async setupNATS() {
    if (this._natsServerUrl) {
      let protocol = "ws";
      if (this._natsServerUrl.indexOf("https://") === 0) {
        protocol = "wss";
      }
      this._natsConnection = await connect({ servers: `${protocol}://${this._natsServerUrl}` });
      console.log(`Nats server connected at ${this._natsConnection.getServer()}`);
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
        this._transactionOverrides
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
      const setDomainNameTx = await ensResolverWithSigner.setName(
        namespaceHash,
        domain,
        this._transactionOverrides
      );
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
    const tx = await ensRegistryWithSigner.setSubnodeOwner(
      namespaceHash,
      labelHash,
      newOwner,
      this._transactionOverrides
    );
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

  protected async validateIssuers({ issuer, namespace }: { issuer: string[]; namespace: string }) {
    if (!this._ensResolver) {
      throw new ENSResolverNotInitializedError();
    }
    const roleHash = namehash(namespace);
    const metadata = await this._ensResolver.text(roleHash, "metadata");
    const definition = JSON.parse(metadata) as IRoleDefinition;
    const diff = difference(issuer, definition.issuer.did || []);
    if (diff.length > 0) {
      throw new Error(`Issuer validation failed for: ${diff.join(", ")}`);
    }
  }

  protected async deleteSubdomain({ namespace }: { namespace: string }) {
    if (this._signer && this._ensRegistry) {
      const ensRegistryWithSigner = this._ensRegistry.connect(this._signer);
      const namespaceArray = namespace.split(".");
      const label = namespaceArray[0];
      const node = namespaceArray.slice(1).join(".");
      const labelHash = labelhash(label);
      const nodeHash = namehash(node);
      const ttl = bigNumberify(0);
      const tx = await ensRegistryWithSigner.setSubnodeRecord(
        nodeHash,
        labelHash,
        emptyAddress,
        emptyAddress,
        ttl,
        this._transactionOverrides
      );
      await tx.wait();
      return;
    }
    throw new MethodNotAvailableInNodeEnvError("deleteSubdomain");
  }

  protected async getOwner({ namespace }: { namespace: string }) {
    if (this._ensRegistry) {
      const node = namehash(namespace);
      return this._ensRegistry.owner(node);
    }
    throw new ENSRegistryNotInitializedError();
  }
}
