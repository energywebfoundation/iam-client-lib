import WalletConnectProvider from "@walletconnect/web3-provider";
import QRCodeModal from "@walletconnect/qrcode-modal";
import { ControllableWalletConnect } from "./ControllableWalletConnect";
import { WalletProvider } from "../types/WalletProvider";
import { chainConfigs } from "../iam/chainConfig";

/**
 * Encapsulates a WalletConnect connection
 */
export class WalletConnectService {
    private readonly _ewKeyManagerUrl: string | undefined;
    private readonly _infuraId: string | undefined;
    private readonly _bridgeUrl: string;
    protected _walletConnectProvider: WalletConnectProvider | undefined;
    protected _walletConnectClient: ControllableWalletConnect | undefined;

    constructor(bridgeUrl: string, infuraId?: string, ewKeyManagerUrl?: string) {
        this._ewKeyManagerUrl = ewKeyManagerUrl;
        this._bridgeUrl = bridgeUrl;
        this._infuraId = infuraId;
    }

    async initialize(walletProvider: WalletProvider) {
        const showQRCode = !(walletProvider === WalletProvider.EwKeyManager);

        this._walletConnectClient = new ControllableWalletConnect({
            bridge: this._bridgeUrl,
            qrcodeModal: showQRCode ? QRCodeModal : undefined,
        });

        const rpc = Object.entries(chainConfigs).reduce((urls, [id, config]) => ({ ...urls, [id]: config.rpcUrl }), {});

        this._walletConnectProvider = new WalletConnectProvider({
            rpc,
            infuraId: this._infuraId,
            connector: this._walletConnectClient,
        });

        if (walletProvider === WalletProvider.EwKeyManager) {
            if (!this._ewKeyManagerUrl) {
                throw Error("EwKeyManager provider type specified but no url was provided.");
            }
            const ewKeyManagerUrl = this._ewKeyManagerUrl;
            this._walletConnectProvider.wc.on("display_uri", (err, payload) => {
                // uri is expected to be WalletConnect Standard URI https://eips.ethereum.org/EIPS/eip-1328
                const wcUri = payload.params[0];

                const encoded = encodeURIComponent(wcUri);
                const hasQueryString = ewKeyManagerUrl.includes("?");
                const url = `${this._ewKeyManagerUrl}${hasQueryString ? "&" : "?"}uri=${encoded}`;
                window.open(url, "ew_key_manager");
            });
        }

        await this._walletConnectProvider.enable();
    }

    /**
     * @requires intialize be called first
     * @returns the WalletConnectProvider of this instance
     */
    getProvider(): WalletConnectProvider {
        if (!this._walletConnectProvider) {
            throw Error("call initalize() to initialize provider first");
        }
        return this._walletConnectProvider;
    }

    async closeConnection(): Promise<void> {
        if (this._walletConnectClient) {
            // Setting to false to that WalletConnect library doesn't
            // try to recreate session after closing
            this._walletConnectClient.canCreateSession = false;
        }
        if (this._walletConnectProvider) {
            await this._walletConnectProvider.close();
        }
    }

    isConnected(): boolean {
        return this._walletConnectProvider?.connected ?? false;
    }
}
