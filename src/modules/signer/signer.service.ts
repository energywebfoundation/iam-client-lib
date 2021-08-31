import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import detectMetamask from "@metamask/detect-provider";
import { BigNumber, providers, Signer, utils, Wallet } from "ethers";
import { parseUnits } from "@ethersproject/units";
import base64url from "base64url";
import { EventEmitter } from "events";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { IWalletConnectProviderOptions } from "@walletconnect/types";
import { ERROR_MESSAGES } from "../../errors";
import { connectWithKmsClient, connectWithMetamaskClient } from "./walletConnect";
import { WalletProviderType } from "./provider.types";
import { ConfigService } from "@nestjs/config";
import { TransactionOverrides } from "./signer.types";
import { IPubKeyAndIdentityToken } from "../../utils/getPublicKeyAndIdentityToken";
import { ChainConfig } from "../../config/chain.config";
import { detectExecutionEnvironment, ExecutionEnvironment } from "../../utils/detectEnvironment";
import { PUBLIC_KEY, WALLET_PROVIDER } from "../../utils/constants";

const { arrayify, keccak256, recoverPublicKey, computeAddress, computePublicKey, getAddress, hashMessage } = utils;
const { JsonRpcProvider } = providers;

export type EncodedCall = {
    to: string;
    data: string;
    value?: string;
};

export type Transaction = {
    calls: EncodedCall[];
    from: string;
};

@Injectable()
export class SignerService implements OnModuleInit, OnModuleDestroy {
    private _publicKey: string;
    private _chainId: number;

    constructor(private _signer: Required<Signer>, private transactionOverrides?: TransactionOverrides) {}

    async onModuleInit() {
        this.initEventHandlers();
        this._chainId = (await this._signer.provider.getNetwork()).chainId;
    }

    /**
     * Add event handler for certain events
     * @requires to be called after the connection to wallet was initialized
     */
    on(event: "accountChanged" | "networkChanged" | "disconnected", eventHandler: () => void) {
        const provider = this._signer.provider;
        if (provider instanceof EventEmitter) {
            (event === "accountChanged" && provider.on("accountsChanged", eventHandler)) ||
                (event === "networkChanged" && provider.on("networkChanged", eventHandler));
        } else if (provider instanceof WalletConnectProvider) {
            (event === "accountChanged" && provider.wc.on("session_update", eventHandler)) ||
                (event === "disconnected" && provider.wc.on("disconnect", eventHandler)) ||
                (event === "networkChanged" && provider.wc.on("session_update", eventHandler));
        }
    }

    async onModuleDestroy() {
        const provider = this._signer.provider;
        if (provider instanceof WalletConnectProvider) {
            await provider.close();
        }
        this._clearSession();
    }

    get signer() {
        return this._signer;
    }

    get chainId() {
        return this._chainId;
    }

    async send(tx: Transaction) {
        if (!this._signer) {
            throw new Error(ERROR_MESSAGES.SIGNER_NOT_INITIALIZED);
        }
        for await (const call of tx.calls) {
            await (await this._signer.sendTransaction({ ...call, ...this.transactionOverrides })).wait();
        }
    }

    async getPublicKey() {
        if (this._publicKey) return this._publicKey;
        if (this._signer instanceof Wallet) {
            this._publicKey = this._signer.publicKey;
            return this._publicKey;
        }
        this._publicKey = (await this.getPublicKeyAndIdentityToken()).publicKey;
        return this._publicKey;
    }

    async getPublicKeyAndIdentityToken(): Promise<IPubKeyAndIdentityToken> {
        const signer = this._signer;
        if (signer) {
            const header = {
                alg: "ES256",
                typ: "JWT",
            };
            const encodedHeader = base64url(JSON.stringify(header));
            const address = await signer.getAddress();
            const payload = {
                iss: `did:ethr:${address}`,
                claimData: {
                    blockNumber: await signer.provider?.getBlockNumber(),
                },
            };

            const encodedPayload = base64url(JSON.stringify(payload));
            const token = `0x${Buffer.from(`${encodedHeader}.${encodedPayload}`).toString("hex")}`;
            // arrayification is necessary for WalletConnect signatures to work. eth_sign expects message in bytes: https://docs.walletconnect.org/json-rpc-api-methods/ethereum#eth_sign
            // keccak256 hash is applied for Metamask to display a coherent hex value when signing
            const message = arrayify(keccak256(token));
            const sig = await signer.signMessage(message);
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
                return { publicKey, identityToken: `${encodedHeader}.${encodedPayload}.${base64url(sig)}` };
            }
            throw new Error(ERROR_MESSAGES.PUBLIC_KEY_NOT_RECOVERED);
        }
        throw new Error(ERROR_MESSAGES.SIGNER_NOT_INITIALIZED);
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

    private _clearSession() {
        if (detectExecutionEnvironment() === ExecutionEnvironment.BROWSER) {
            localStorage.removeItem(WALLET_PROVIDER);
            localStorage.removeItem(PUBLIC_KEY);
        }
    }

    static async initPrivateKeySigner(configService: ConfigService, privateKey: string) {
        const provider = new JsonRpcProvider({ url: configService.get("rpcUrl") as string });
        return new SignerService(new Wallet(privateKey, provider));
    }

    static async initMetamaskSigner({ initializeMetamask }: { useMetamask?: boolean; initializeMetamask?: boolean }) {
        const metamaskProvider: any = await detectMetamask({
            mustBeMetaMask: true,
        });
        if (!metamaskProvider) {
            throw new Error(ERROR_MESSAGES.METAMASK_EXTENSION_NOT_AVAILABLE);
        }
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
        const signer = new providers.Web3Provider(metamaskProvider).getSigner();

        console.log("metamask chain id:", (await signer.provider.getNetwork()).chainId);
        return new SignerService(signer);
    }

    static async initWalletConnectSigner(
        walletConnectOpts: IWalletConnectProviderOptions = {
            bridge: "https://walletconnect.energyweb.org",
        },
        walletProvider: WalletProviderType,
        ewKeyManagerUrl: string,
        configService: ConfigService,
    ) {
        const transactionOverrides = {
            gasLimit: BigNumber.from(4900000),
            gasPrice: parseUnits("0.1", "gwei"),
        };
        const chainConfigs = configService.get("chainConfiguration") as Record<number, ChainConfig>;
        const rpc = Object.entries(chainConfigs).reduce((urls, [id, config]) => ({ ...urls, [id]: config.rpcUrl }), {});
        let provider: WalletConnectProvider;
        if (walletProvider === WalletProviderType.WalletConnect) {
            provider = await connectWithMetamaskClient({ ...walletConnectOpts, rpc });
        } else if (walletProvider === WalletProviderType.EwKeyManager && ewKeyManagerUrl) {
            provider = await connectWithKmsClient({ ...walletConnectOpts, rpc }, ewKeyManagerUrl);
        } else {
            throw new Error("Can not connect to Wallet Connect client");
        }
        const signer = new providers.Web3Provider(provider).getSigner();
        return new SignerService(signer, transactionOverrides);
    }

    static async initEwKeyManagerSigner() {
        throw new Error("Not implemented");
    }
}
