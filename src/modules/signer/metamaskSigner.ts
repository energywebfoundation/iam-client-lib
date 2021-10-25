import { providers } from "ethers";
import detectMetamask from "@metamask/detect-provider";
import { ERROR_MESSAGES } from "../../errors";
import { ProviderType } from "./signer.types";
import { SignerService } from "./signer.service";

export const fromMetaMask = async (): Promise<SignerService> => {
    const signerService = new SignerService(await createMetamaskSigner(), ProviderType.MetaMask);
    await signerService.init();
    return signerService;
};

const createMetamaskSigner = async () => {
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
    const signer = new providers.Web3Provider(metamaskProvider).getSigner();

    console.log("metamask chain id:", (await signer.provider.getNetwork()).chainId);
    return signer;
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
