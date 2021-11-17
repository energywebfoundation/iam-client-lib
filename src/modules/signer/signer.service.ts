import { BigNumber, providers, utils, Wallet, ethers, Signer } from "ethers";
import base64url from "base64url";
import WalletConnectProvider from "@walletconnect/ethereum-provider";
import { Methods } from "@ew-did-registry/did";
import { ERROR_MESSAGES } from "../../errors/ErrorMessages";
import { chainConfigs } from "../../config/chain.config";
import { ExecutionEnvironment, executionEnvironment } from "../../utils/detectEnvironment";
import { IPubKeyAndIdentityToken, ProviderType, ProviderEvent, AccountInfo, PUBLIC_KEY } from "./signer.types";
import { EkcSigner } from "./ekcSigner";

const { arrayify, keccak256, recoverPublicKey, computeAddress, computePublicKey, getAddress, hashMessage } = utils;
export type ServiceInitializer = () => Promise<void>;
export class SignerService {
    private _publicKey: string;
    private _identityToken: string;
    private _address: string;
    private _account: string;

    private _chainId: number;
    private _chainName: string;

    private _servicesInitializers: ServiceInitializer[] = [];

    private _walletEventListeners: { event: ProviderEvent; cb: any }[] = [];

    constructor(private _signer: Required<Signer>, private _providerType: ProviderType) {}

    async init() {
        if (executionEnvironment() === ExecutionEnvironment.BROWSER) {
            this._publicKey = localStorage.getItem(PUBLIC_KEY) as string;
        }
        this._address = await this.signer.getAddress();
        this._chainId = (await this._signer.provider.getNetwork()).chainId;
        this._chainName = chainConfigs()[this._chainId].chainName;
        if (this._signer instanceof providers.JsonRpcSigner) {
            this._account = (await this._signer.provider.listAccounts())[0];
        } else if (this._signer instanceof Wallet) {
            this._account = this._address;
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
        for await (const { event, cb } of this._walletEventListeners) {
            if (event === e) {
                await cb();
            }
        }
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
            this.on(ProviderEvent.Disconnected, this.closeConnection());
        }
    }

    get signer() {
        return this._signer;
    }

    get address() {
        return this._address;
    }

    get accountInfo(): AccountInfo {
        return { account: this._account, chainId: this._chainId, chainName: this._chainName };
    }

    get provider() {
        return this._signer.provider;
    }

    get chainId() {
        return this._chainId;
    }

    async balance() {
        return this.signer.getBalance();
    }

    get providerType() {
        return this._providerType;
    }

    get did() {
        return `did:${Methods.Erc1056}:${this._address}`;
    }

    async send({ to, data, value }: providers.TransactionRequest): Promise<providers.TransactionReceipt> {
        const tx = { to, from: this.address, data, ...(value && { value: BigNumber.from(value) }) };
        const receipt = await (await this._signer.sendTransaction(tx)).wait();
        return receipt;
    }

    async signMessage(message: Uint8Array) {
        return this.signer.signMessage(message);
    }

    async connect(signer: Required<ethers.Signer>, providerType: ProviderType) {
        this._signer = signer;
        this._providerType = providerType;
        await this.init();
    }

    async closeConnection() {
        if (this._signer instanceof WalletConnectProvider) {
            await this._signer.disconnect();
        } else if (this._signer instanceof EkcSigner) {
            try {
                await this._signer.ekc.logout({ mode: "popup" });
                return false;
            } catch (error) {
                console.log("error in azure logout ", error);
            }
        }
        return true;
    }

    async publicKey() {
        if (this._publicKey) return this._publicKey;
        else if (this._signer instanceof Wallet) {
            this._publicKey = this._signer.publicKey;
        } else {
            this._publicKey = (await this.publicKeyAndIdentityToken()).publicKey;
        }
        return this._publicKey;
    }

    async publicKeyAndIdentityToken(): Promise<IPubKeyAndIdentityToken> {
        if (!this._publicKey || !this._identityToken) {
            await this._calculatePubKeyAndIdentityToken();
        }
        return {
            publicKey: this._publicKey,
            identityToken: this._identityToken,
        };
    }

    private async _calculatePubKeyAndIdentityToken() {
        const header = {
            alg: "ES256",
            typ: "JWT",
        };
        const encodedHeader = base64url(JSON.stringify(header));
        const address = this._address;
        const payload = {
            iss: `did:ethr:${address}`,
            claimData: {
                blockNumber: await this._signer.provider.getBlockNumber(),
            },
        };

        const encodedPayload = base64url(JSON.stringify(payload));
        const token = `0x${Buffer.from(`${encodedHeader}.${encodedPayload}`).toString("hex")}`;
        // arrayification is necessary for WalletConnect signatures to work. eth_sign expects message in bytes: https://docs.walletconnect.org/json-rpc-api-methods/ethereum#eth_sign
        // keccak256 hash is applied for Metamask to display a coherent hex value when signing
        const message = arrayify(keccak256(token));
        const sig = await this.signMessage(message);
        const recoverValidatedPublicKey = (signedMessage: Uint8Array): string | undefined => {
            const publicKey = recoverPublicKey(signedMessage, sig);
            if (getAddress(address) === getAddress(computeAddress(publicKey))) {
                return computePublicKey(publicKey, true).slice(2);
            }
            return undefined;
        };

        // Computation of the digest in order to recover the public key under the assumption
        // that signature was performed as per the eth_sign spec (https://eth.wiki/json-rpc/API#eth_sign)
        // In the event that the wallet isn't prefixing & hashing message as per spec, attempt recovery without digest
        const digest = arrayify(hashMessage(message));
        const publicKey = recoverValidatedPublicKey(digest) ?? recoverValidatedPublicKey(message);
        if (publicKey) {
            this._publicKey = publicKey;
            this._identityToken = `${encodedHeader}.${encodedPayload}.${base64url(sig)}`;
        } else {
            throw new Error(ERROR_MESSAGES.PUBLIC_KEY_NOT_RECOVERED);
        }
    }
}
