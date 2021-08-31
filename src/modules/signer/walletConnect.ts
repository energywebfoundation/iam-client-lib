import WalletConnectProvider from "@walletconnect/web3-provider";
import QRCodeModal from "@walletconnect/qrcode-modal";
import { IWalletConnectProviderOptions } from "@walletconnect/types";

export async function connectWithMetamaskClient(opts: IWalletConnectProviderOptions) {
    const walletConnectProvider = new WalletConnectProvider({ ...opts, qrcodeModal: QRCodeModal });
    await walletConnectProvider.enable();
    return walletConnectProvider;
}

export async function connectWithKmsClient(opts: IWalletConnectProviderOptions, ewKeyManagerUrl: string) {
    const walletConnectProvider = new WalletConnectProvider(opts);
    walletConnectProvider.wc.on("display_uri", (err, payload) => {
        // uri is expected to be WalletConnect Standard URI https://eips.ethereum.org/EIPS/eip-1328
        const wcUri = payload.params[0];

        const encoded = encodeURIComponent(wcUri);
        const hasQueryString = ewKeyManagerUrl.includes("?");
        const url = `${ewKeyManagerUrl}${hasQueryString ? "&" : "?"}uri=${encoded}`;
        window.open(url, "ew_key_manager");
    });
    await walletConnectProvider.enable();
    return walletConnectProvider;
}
