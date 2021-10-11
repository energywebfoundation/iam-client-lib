import Web3Provider from "@walletconnect/web3-provider";
import QRCodeModal from "@walletconnect/qrcode-modal";
import { ProviderType } from "./signer.types";
import { SignerService } from "./signer.service";
import { providers } from "ethers";

export const fromWalletConnectMetamask = async (bridge: string): Promise<SignerService> => {
    const metamaskProvider = await createProvider(bridge);
    const provider = new providers.Web3Provider(metamaskProvider);
    return new SignerService(provider.getSigner(), ProviderType.Metamask);
};

const createProvider = async (bridge: string) => {
    const walletConnectProvider = new Web3Provider({ bridge, qrcodeModal: QRCodeModal });
    await walletConnectProvider.enable();
    return walletConnectProvider;
};
