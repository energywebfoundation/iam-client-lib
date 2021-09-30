import Web3Provider from "@walletconnect/web3-provider";
import QRCodeModal from "@walletconnect/qrcode-modal";
import { IWalletConnectProviderOptions } from "@walletconnect/types";
import { ProviderType } from "./signer.types";
import { SignerService } from "./signer.service";
import { providers } from "ethers";

export const fromWalletConnectMetamask = async (
    walletConnectOpts: IWalletConnectProviderOptions = {
        bridge: "https://walletconnect.energyweb.org",
    },
): Promise<SignerService> => {
    const metamaskProvider = await createProvider(walletConnectOpts);
    const provider = new providers.Web3Provider(metamaskProvider);
    return new SignerService(provider.getSigner(), ProviderType.Metamask);
};

const createProvider = async (opts: IWalletConnectProviderOptions) => {
    const walletConnectProvider = new Web3Provider({ ...opts, qrcodeModal: QRCodeModal });
    await walletConnectProvider.enable();
    return walletConnectProvider;
};
