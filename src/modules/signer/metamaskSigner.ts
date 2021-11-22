import { providers } from "ethers";
import detectMetamask from "@metamask/detect-provider";
import { ERROR_MESSAGES } from "../../errors";
import { ProviderType, ProviderEvent } from "./signer.types";
import { SignerService } from "./signer.service";

export const fromMetaMask = async (): Promise<SignerService> => {
    const provider = await createMetamaskProvider();
    const signer = new providers.Web3Provider(provider).getSigner();
    console.log("metamask chain id:", (await signer.provider.getNetwork()).chainId);
    const signerService = new SignerService(signer, ProviderType.MetaMask);
    provider.on(ProviderEvent.AccountChanged, () => signerService.emit(ProviderEvent.AccountChanged));
    provider.on(ProviderEvent.NetworkChanged, () => signerService.emit(ProviderEvent.NetworkChanged));
    await signerService.init();

    return signerService;
};

const createMetamaskProvider = async () => {
    const metamaskProvider: any = await detectMetamask({
        mustBeMetaMask: true,
    });
    if (!metamaskProvider) {
        throw new Error(ERROR_MESSAGES.METAMASK_PROVIDER_NOT_DETECTED);
    }
    const requestObject = {
        method: "eth_accounts",
        params: [
            {
                eth_accounts: {},
            },
        ],
    };
    const accounts: string[] = await metamaskProvider.request(requestObject);

    if (accounts.length < 1) {
        await metamaskProvider.request({
            method: "wallet_requestPermissions",
            params: [
                {
                    eth_accounts: {},
                },
            ],
        });
    }

    return metamaskProvider;
};

export const isMetamaskExtensionPresent = async () => {
    const provider = (await detectMetamask({ mustBeMetaMask: true })) as
        | {
              request: any;
          }
        | undefined;

    const chainId = (await provider?.request({
        method: "eth_chainId",
    })) as number | undefined;

    return { isMetamaskPresent: !!provider, chainId };
};
