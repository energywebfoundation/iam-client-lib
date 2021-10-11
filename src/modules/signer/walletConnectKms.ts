import WalletConnectProvider from "@walletconnect/web3-provider";
import { SignerService } from "./signer.service";
import { ProviderType } from "./signer.types";
import { providers } from "ethers";

export async function fromKms(bridge: string, kmsServerUrl: string) {
    const walletConnectProvider = new WalletConnectProvider({ bridge });
    walletConnectProvider.wc.on("display_uri", (err, payload) => {
        // uri is expected to be WalletConnect Standard URI https://eips.ethereum.org/EIPS/eip-1328
        const wcUri = payload.params[0];

        const encoded = encodeURIComponent(wcUri);
        const hasQueryString = kmsServerUrl.includes("?");
        const url = `${kmsServerUrl}${hasQueryString ? "&" : "?"}uri=${encoded}`;
        window.open(url, "ew_key_manager");
    });
    await walletConnectProvider.enable();
    const provider = new providers.Web3Provider(walletConnectProvider);
    return new SignerService(provider.getSigner(), ProviderType.WalletConnect);
}
