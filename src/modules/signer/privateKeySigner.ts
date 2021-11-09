import { providers, Wallet } from "ethers";
import { SignerService } from "./signer.service";
import { ProviderType } from "./signer.types";

const { JsonRpcProvider } = providers;

export const fromPrivateKey = async (privateKey: string, rpcUrl: string) => {
    const provider = new JsonRpcProvider({ url: rpcUrl });
    const signerService = new SignerService(new Wallet(privateKey).connect(provider), ProviderType.PrivateKey);
    await signerService.init();
    return signerService;
};
