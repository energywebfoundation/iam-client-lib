import { providers } from "ethers";
import { SignerService } from "./signer.service";
import { ProviderType } from "./signer.types";
import { createWalletConnectProvider } from "./walletConnectMetamask";

export async function fromKms(bridge: string, kmsServerUrl: string, infuraId?: string) {
    const walletConnectProvider = createWalletConnectProvider(bridge, infuraId);
    walletConnectProvider.on("display_uri", (_, payload) => {
        const wcUri = payload.params[0];
        const encoded = encodeURIComponent(wcUri);
        const hasQueryString = kmsServerUrl.includes("?");
        const url = `${kmsServerUrl}${hasQueryString ? "&" : "?"}uri=${encoded}`;
        window.open(url, "ew_key_manager");
    });
    await walletConnectProvider.enable();
    const provider = new providers.Web3Provider(walletConnectProvider);
    const signerService = new SignerService(provider.getSigner(), ProviderType.WalletConnect);
    await signerService.init();
    return signerService;
}
