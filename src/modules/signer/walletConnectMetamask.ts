import Web3Provider from "@walletconnect/ethereum-provider";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import { ICreateSessionOptions } from "@walletconnect/types";
import { ProviderEvent, ProviderType } from "./signer.types";
import { SignerService } from "./signer.service";
import { providers } from "ethers";
import { chainConfigs } from "../../config/chain.config";

export const fromWalletConnectMetamask = async (bridge: string, infuraId?: string): Promise<SignerService> => {
    const walletProvider = createWalletConnectProvider(bridge, infuraId);
    await walletProvider.enable();
    const provider = new providers.Web3Provider(walletProvider);
    const signerService = new SignerService(provider.getSigner(), ProviderType.WalletConnect);
    walletProvider.on(ProviderEvent.Disconnected, () => signerService.emit(ProviderEvent.Disconnected));
    walletProvider.on(ProviderEvent.SessionUpdate, () => signerService.emit(ProviderEvent.SessionUpdate));
    await signerService.init();
    return signerService;
};

export const createWalletConnectProvider = (bridge: string, infuraId?: string) => {
    const rpc = Object.entries(chainConfigs()).reduce((urls, [id, config]) => ({ ...urls, [id]: config.rpcUrl }), {});
    const walletConnectProvider = new Web3Provider({
        rpc,
        connector: new Connector({ bridge, qrcodeModal: QRCodeModal }),
        infuraId,
        chainId: 73799,
    });
    return walletConnectProvider;
};

class Connector extends WalletConnect {
    public async createSession(opts?: ICreateSessionOptions): Promise<void> {
        await super.createSession(opts);
    }
}
