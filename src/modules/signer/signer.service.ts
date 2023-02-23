import { BigNumber, providers, utils, Wallet } from 'ethers';
import {
  TypedDataDomain,
  TypedDataField,
} from '@ethersproject/abstract-signer';
import WalletConnectProvider from '@walletconnect/ethereum-provider';
import { Methods } from '@ew-did-registry/did';
import { ERROR_MESSAGES } from '../../errors/error-messages';
import { chainConfigs } from '../../config/chain.config';
import {
  ExecutionEnvironment,
  executionEnvironment,
} from '../../utils/detect-environment';
import {
  ProviderType,
  ProviderEvent,
  AccountInfo,
  PUBLIC_KEY,
  IS_ETH_SIGNER,
  SignerT,
} from './signer.types';
import { EkcSigner } from './ekc.signer';
import { computeAddress } from 'ethers/lib/utils';
import { getLogger } from '../../config/logger.config';

const { arrayify, recoverPublicKey, getAddress, hashMessage, verifyMessage } =
  utils;
export type ServiceInitializer = () => Promise<void>;

/**
 * Service responsible for signing messages and sending transactions to the blockchain
 *
 * ```typescript
 * const { signerService } = await initWithPrivateKeySigner(privateKey, rpcUrl);
 * signerService.signMessage(...);
 * ```
 */
export class SignerService {
  private _publicKey: string;
  private _isEthSigner: boolean;
  private _address: string;
  private _account: string;

  private _chainId: number;
  private _chainName: string;
  private _chainDisplayName: string;

  private _servicesInitializers: ServiceInitializer[] = [];

  private _walletEventListeners: { event: ProviderEvent; cb: () => void }[] =
    [];

  constructor(
    private _signer: Required<SignerT>,
    private _providerType: ProviderType
  ) {}

  async init() {
    if (executionEnvironment() === ExecutionEnvironment.BROWSER) {
      this._publicKey = localStorage.getItem(PUBLIC_KEY) as string;
    }
    this._address = await this.signer.getAddress();
    this._chainId = (await this._signer.provider.getNetwork()).chainId;
    this._chainDisplayName = chainConfigs()[this._chainId].chainDisplayName;
    this._chainName = chainConfigs()[this._chainId].chainName;
    if (this._signer instanceof providers.JsonRpcSigner) {
      this._account = (await this._signer.provider.listAccounts())[0];
    } else if (this._signer instanceof Wallet) {
      this._account = this._address;
    }
    // web app is responsible for clearing of isEthSigner on logout
    if (executionEnvironment() === ExecutionEnvironment.BROWSER) {
      const isEthSigner = localStorage.getItem(IS_ETH_SIGNER);
      if (isEthSigner === 'true') {
        this._isEthSigner = true;
      } else if (isEthSigner === 'false') {
        this._isEthSigner = false;
      }
    } else {
      this.sign('determine signer');
    }

    /**
     * @todo provide general way to initialize with previously saved key
     */
    this.initEventHandlers();

    for await (const initializer of this._servicesInitializers) {
      await initializer();
    }
  }

  /**
   * Registers reinitialization of dependent service on signer reconnection
   */
  onInit(initializer: ServiceInitializer) {
    this._servicesInitializers.push(initializer);
  }

  async emit(e: ProviderEvent) {
    await Promise.all(
      this._walletEventListeners
        .map(({ event, cb }) => {
          return e === event ? cb() : null;
        })
        .filter(Boolean)
    );
  }

  on(event: ProviderEvent, cb) {
    this._walletEventListeners.push({ event, cb });
  }

  /**
   * Add event handler for certain events
   * @requires to be called after the connection to wallet was initialized
   */
  initEventHandlers() {
    const accChangedHandler = async () => {
      await this.closeConnection();
      await this.init();
    };
    if (this._providerType === ProviderType.MetaMask) {
      this.on(ProviderEvent.AccountChanged, accChangedHandler);
      this.on(ProviderEvent.NetworkChanged, accChangedHandler);
    } else if (this._providerType === ProviderType.WalletConnect) {
      this.on(ProviderEvent.SessionUpdate, accChangedHandler);
      this.on(ProviderEvent.Disconnected, this.closeConnection);
    }
  }

  async connect(signer: Required<SignerT>, providerType: ProviderType) {
    this._signer = signer;
    this._providerType = providerType;
    await this.init();
  }

  /**
   * The instance of the `ether` library signer in use by the service
   *
   * ```typescript
   * signerService.signer;
   * ```
   *
   * @return signer
   */
  get signer() {
    return this._signer;
  }

  /**
   * If signer is EIP-191 compliant https://eips.ethereum.org/EIPS/eip-191.
   *
   * ```typescript
   * signerService.isEthSigner;
   * ```
   *
   * @return true if the signer is EIP-191 compliant.
   */
  get isEthSigner() {
    return this._isEthSigner;
  }

  /**
   * Get user address.
   *
   * ```typescript
   * signerService.address;
   * ```
   *
   * @return user address
   */
  get address() {
    return this._address;
  }

  /**
   * Get account info, including chain id, chain name and user address.
   *
   * ```typescript
   * signerService.accountInfo;
   * ```
   *
   * @return account info
   */
  get accountInfo(): AccountInfo {
    return {
      account: this._account,
      chainId: this._chainId,
      chainName: this._chainDisplayName,
    };
  }

  /**
   * Get connection provider.
   *
   * ```typescript
   * signerService.provider;
   * ```
   *
   * @return connection provider
   */
  get provider() {
    return this._signer.provider;
  }

  /**
   * Get current connection chain id.
   *
   * ```typescript
   * signerService.chainId;
   * ```
   *
   * @return chain id
   */
  get chainId() {
    return this._chainId;
  }

  /**
   * Get provider type of current signer connection.
   *
   * ```typescript
   * signerService.providerType;
   * ```
   *
   * @return provider type
   */
  get providerType() {
    return this._providerType;
  }

  /**
   * Get current user DID
   *
   * ```typescript
   * signerService.did;
   * ```
   *
   * @return DID
   */
  get did() {
    return `did:${Methods.Erc1056}:${this.chainName()}:${this._address}`;
  }

  /**
   * Get current user DID address with hex representation of the chain id.
   *
   * ```typescript
   * signerService.didHex;
   * ```
   *
   * @return DID address
   */
  get didHex() {
    return `did:${Methods.Erc1056}:${`0x${this.chainId.toString(
      16
    )}`}:${this._address.toLowerCase()}`;
  }

  /**
   * Get current user balance.
   *
   * ```typescript
   * signerService.getBalance();
   * ```
   *
   * @return user balance
   */
  async balance() {
    return this.signer.getBalance();
  }

  /**
   * Send transaction to the blockchain.
   *
   * ```typescript
   * signerService.send({
   *     to: ':0x00...0',
   *     data: contract.interface.encodeFunctionData(...)
   * });
   * ```
   *
   * @param {TransactionRequest} options object with options
   * @return transaction receipt
   */
  async send({
    to,
    data,
    value,
  }: providers.TransactionRequest): Promise<providers.TransactionReceipt> {
    const tx = {
      to,
      from: this.address,
      data,
      ...(value && { value: BigNumber.from(value) }),
    };
    const receipt = await (await this._signer.sendTransaction(tx)).wait();
    return receipt;
  }

  /**
   * Makes a (readonly) call to a smart contract.
   * https://docs.ethers.io/v5/single-page/#/v5/api/providers/provider/-%23-Provider-call
   *
   * ```typescript
   * signerService.call({
   *     to: ':0x00...0',
   *     data: contract.interface.encodeFunctionData(...)
   * });
   * ```
   *
   * @param {TransactionRequest} options object with options
   * @return the result of the call
   */
  async call({ to, data }: providers.TransactionRequest): Promise<string> {
    const tx = { to, from: this.address, data };
    const result = await this._signer.call(tx);
    return result;
  }

  /**
   * Tries to create `eth_sign` conformant signature (https://eth.wiki/json-rpc/API#eth_sign).
   * Whether or not to hash the message prior to signature is depends on whether is signer EIP-191 compliant.
   * When running in browser `isEthSigner` variable should be stored in local storage.
   *
   * ```typescript
   * signerService.signMessage(arrayify('Hello World'));
   * ```
   *
   * @param {Uint8Array} message The message to be signed. The message should have binary representation to avoid confusion of text with hexadecimal binary data
   * @return the signature
   */
  async signMessage(message: Uint8Array): Promise<string> {
    if (this._isEthSigner === undefined) {
      throw new Error(ERROR_MESSAGES.IS_ETH_SIGNER_NOT_SET);
    }
    const messageHash = this._isEthSigner
      ? message
      : arrayify(hashMessage(message));
    const sig = await this.signer.signMessage(messageHash);
    if (getAddress(this._address) !== getAddress(verifyMessage(message, sig))) {
      throw new Error(ERROR_MESSAGES.NON_ETH_SIGN_SIGNATURE);
    }
    return sig;
  }

  /**
   * Signs message with whatever signing implementation underlying signer provides. Unlike `signMessage` this method does not guaraties that signature will conform to EIP-191
   * @param message Stringified message
   */
  async sign(message: string): Promise<string> {
    const messageBytes = Buffer.from(message);
    const signature = await this.signer.signMessage(messageBytes);
    if (!this._publicKey || this._isEthSigner === undefined) {
      await this._determineSigner(messageBytes, signature);
    }
    return signature;
  }

  /**
   * Tries to create conformant EIP-712 signature (https://eips.ethereum.org/EIPS/eip-712).
   *
   * ```typescript
   * signerService.signTypedData(
   *     { name: 'MyToken', version: '1.0' },
   *     { Model: [{ name: 'name', type: 'string' }, { name: 'type', type: 'string' }] },
   *     { name: 'MyToken', type: 'erc721' },
   * );
   * ```
   *
   * @param {TypedDataDomain} domain EIP-712 domain object
   * @param {Record<string, Array<TypedDataField>>} types EIP-712 types object
   * @param {Record<string, unknown>} message EIP-712 message object
   * @return the signature
   */
  async signTypedData(
    domain: TypedDataDomain,
    types: Record<string, Array<TypedDataField>>,
    message: Record<string, unknown>
  ): Promise<string> {
    if (!this.signer?._signTypedData) {
      throw new Error(ERROR_MESSAGES.SIGN_TYPED_DATA_NOT_SUPPORTED);
    }

    delete types['EIP712Domain'];
    return await this.signer._signTypedData(domain, types, message);
  }

  /**
   * Close connection with the signer wallet.
   *
   * ```typescript
   * signerService.closeConnection();
   * ```
   *
   * @return true if connection was closed
   */
  async closeConnection(): Promise<boolean> {
    if (this._signer instanceof WalletConnectProvider) {
      await this._signer.disconnect();
    } else if (this._signer instanceof EkcSigner) {
      try {
        await this._signer.ekc.logout({ mode: 'popup' });
        return false;
      } catch (error) {
        getLogger().info(`error in azure logout ${(error as Error).message}`);
      }
    }
    return true;
  }

  /**
   * Get current user public key.
   *
   * ```typescript
   * signerService.publicKey();
   * ```
   *
   * @return public key
   */
  async publicKey(): Promise<string> {
    if (this._publicKey) return this._publicKey;
    else if (this._signer instanceof Wallet) {
      this._publicKey = this._signer.publicKey;
    } else {
      await this.sign('determine signer');
    }
    return this._publicKey;
  }

  /**
   * Get current chain name.
   *
   * ```typescript
   * signerService.chainName();
   * ```
   *
   * @return chain name
   */
  chainName(): string {
    return this._chainName;
  }

  /**
   * Generate public key and identity token for authentication purposes.
   *
   * @return object with public key and identity token
   */
  private async _determineSigner(message: Buffer, signature: string) {
    // Computation of the digest in order to recover the public key under the assumption
    // that signature was performed as per the eth_sign spec (https://eth.wiki/json-rpc/API#eth_sign)
    const prefixedMessage = arrayify(hashMessage(message));
    const keyFromMessage = recoverPublicKey(message, signature);
    const keyFromPrefixedMessage = recoverPublicKey(prefixedMessage, signature);
    if (getAddress(this._address) === computeAddress(keyFromMessage)) {
      this._publicKey = keyFromMessage;
      this._isEthSigner = false;
    } else if (
      getAddress(this._address) === computeAddress(keyFromPrefixedMessage)
    ) {
      this._publicKey = keyFromPrefixedMessage;
      this._isEthSigner = true;
    } else {
      throw new Error(ERROR_MESSAGES.NON_ETH_SIGN_SIGNATURE);
    }
  }
}
