import { BigNumber, providers } from 'ethers';
import { TypedDataDomain, TypedDataField } from '@ethersproject/abstract-signer';
import { IPubKeyAndIdentityToken, ProviderType, ProviderEvent, AccountInfo, SignerT } from './signer.types';
export declare type ServiceInitializer = () => Promise<void>;
/**
 * Service responsible for signing messages and sending transactions to the blockchain
 *
 * ```typescript
 * const { signerService } = await initWithPrivateKeySigner(privateKey, rpcUrl);
 * signerService.signMessage(...);
 * ```
 */
export declare class SignerService {
    private _signer;
    private _providerType;
    private _publicKey;
    private _isEthSigner;
    private _identityToken;
    private _address;
    private _account;
    private _chainId;
    private _chainName;
    private _chainDisplayName;
    private _servicesInitializers;
    private _walletEventListeners;
    constructor(_signer: Required<SignerT>, _providerType: ProviderType);
    init(): Promise<void>;
    /**
     * Registers reinitialization of dependent service on signer reconnection
     */
    onInit(initializer: ServiceInitializer): void;
    emit(e: ProviderEvent): Promise<void>;
    on(event: ProviderEvent, cb: any): void;
    /**
     * Add event handler for certain events
     * @requires to be called after the connection to wallet was initialized
     */
    initEventHandlers(): void;
    connect(signer: Required<SignerT>, providerType: ProviderType): Promise<void>;
    /**
     * The instance of the `ether` library signer in use by the service
     *
     * ```typescript
     * signerService.signer;
     * ```
     *
     * @return signer
     */
    get signer(): Required<SignerT>;
    /**
     * If signer is EIP-191 compliant https://eips.ethereum.org/EIPS/eip-191.
     *
     * ```typescript
     * signerService.isEthSigner;
     * ```
     *
     * @return true if the signer is EIP-191 compliant.
     */
    get isEthSigner(): boolean;
    /**
     * Get user address.
     *
     * ```typescript
     * signerService.address;
     * ```
     *
     * @return user address
     */
    get address(): string;
    /**
     * Get account info, including chain id, chain name and user address.
     *
     * ```typescript
     * signerService.accountInfo;
     * ```
     *
     * @return account info
     */
    get accountInfo(): AccountInfo;
    /**
     * Get connection provider.
     *
     * ```typescript
     * signerService.provider;
     * ```
     *
     * @return connection provider
     */
    get provider(): providers.Provider;
    /**
     * Get current connection chain id.
     *
     * ```typescript
     * signerService.chainId;
     * ```
     *
     * @return chain id
     */
    get chainId(): number;
    /**
     * Get provider type of current signer connection.
     *
     * ```typescript
     * signerService.providerType;
     * ```
     *
     * @return provider type
     */
    get providerType(): ProviderType;
    /**
     * Get current user DID
     *
     * ```typescript
     * signerService.did;
     * ```
     *
     * @return DID
     */
    get did(): string;
    /**
     * Get current user DID address with hex representation of the chain id.
     *
     * ```typescript
     * signerService.didHex;
     * ```
     *
     * @return DID address
     */
    get didHex(): string;
    /**
     * Get current user balance.
     *
     * ```typescript
     * signerService.getBalance();
     * ```
     *
     * @return user balance
     */
    balance(): Promise<BigNumber>;
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
    send({ to, data, value, }: providers.TransactionRequest): Promise<providers.TransactionReceipt>;
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
    call({ to, data }: providers.TransactionRequest): Promise<string>;
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
    signMessage(message: Uint8Array): Promise<string>;
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
    signTypedData(domain: TypedDataDomain, types: Record<string, Array<TypedDataField>>, message: Record<string, unknown>): Promise<string>;
    /**
     * Close connection with the signer wallet.
     *
     * ```typescript
     * signerService.closeConnection();
     * ```
     *
     * @return true if connection was closed
     */
    closeConnection(): Promise<boolean>;
    /**
     * Get current user public key.
     *
     * ```typescript
     * signerService.publicKey();
     * ```
     *
     * @return public key
     */
    publicKey(): Promise<string>;
    /**
     * Get current chain name.
     *
     * ```typescript
     * signerService.chainName();
     * ```
     *
     * @return chain name
     */
    chainName(): string;
    /**
     * Generate public key and identity token for authentication purposes.
     *
     * ```typescript
     * signerService.publicKeyAndIdentityToken();
     * ```
     * @param force when true recalculates token even if it is already present
     * @return object with public key and identity token
     */
    publicKeyAndIdentityToken(force?: boolean): Promise<IPubKeyAndIdentityToken>;
    /**
     * Generate public key and identity token for authentication purposes.
     *
     * @return object with public key and identity token
     */
    private _calculatePubKeyAndIdentityToken;
    /**
     * Set `_isEthSigner` value based on a signed message.
     * Generates a test message and signs it.
     */
    private _setIsEthrSigner;
}
