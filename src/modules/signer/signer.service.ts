import { Injectable } from "@nestjs/common";
import detectMetamask from "@metamask/detect-provider";
import { TransactionOverrides } from "@energyweb/iam-contracts/dist/ethers-v4";
import { providers, Signer, utils, Wallet } from "ethers";
import { ERROR_MESSAGES } from "../../errors";
import { WalletConnectService } from "./WalletConnectService";
import { WalletProviderType } from "./provider.types";
import { ConfigService } from "@nestjs/config";

const { hexlify } = utils;
const { JsonRpcProvider } = providers;

export type EncodedCall = {
    to: string;
    data: string;
    value?: string;
};

export type Transaction = {
    calls: EncodedCall[];
    from: string;
};

@Injectable()
export class SignerService {
    constructor(private _signer: Required<Signer>, private transactionOverrides?: TransactionOverrides) {}

    get signer() {
        return this._signer;
    }

    async send(tx: Transaction) {
        if (!this._signer) {
            throw new Error(ERROR_MESSAGES.SIGNER_NOT_INITIALIZED);
        }
        for await (const call of tx.calls) {
            await (await this._signer.sendTransaction({ ...call, ...this.transactionOverrides })).wait();
        }
    }

    static async initPrivateKeySigner(configService: ConfigService, privateKey: string) {
        const provider = new JsonRpcProvider({ url: configService.get("rpcUrl") as string });
        return new SignerService(new Wallet(privateKey, provider));
    }

    static async initMetamaskSigner({ initializeMetamask }: { useMetamask?: boolean; initializeMetamask?: boolean }) {
        const metamaskProvider: any = await detectMetamask({
            mustBeMetaMask: true,
        });
        if (!metamaskProvider) {
            throw new Error(ERROR_MESSAGES.METAMASK_EXTENSION_NOT_AVAILABLE);
        }
        const requestObject = {
            method: initializeMetamask ? "wallet_requestPermissions" : "eth_accounts",
            params: [
                {
                    eth_accounts: {},
                },
            ],
        };
        const accounts: string[] = await metamaskProvider.request(requestObject);

        if (!initializeMetamask && accounts.length < 1) {
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
        return new SignerService(signer);
    }

    static async initWalletConnectSigner({
        bridgeUrl = "https://walletconnect.energyweb.org",
        infuraId,
        ewKeyManagerUrl,
        walletProvider,
    }: {
        bridgeUrl?: string;
        infuraId: string;
        ewKeyManagerUrl?: string;
        walletProvider: WalletProviderType;
    }) {
        const transactionOverrides = {
            gasLimit: hexlify(4900000),
            gasPrice: hexlify(0.1),
        };
        const walletConnectService = new WalletConnectService(bridgeUrl, infuraId, ewKeyManagerUrl);
        await walletConnectService.initialize(walletProvider);
        const wcProvider = walletConnectService.getProvider();
        const signer = new providers.Web3Provider(wcProvider).getSigner();
        return new SignerService(signer, transactionOverrides);
    }

    static async initEwKeyManagerSigner() {
        throw new Error("Not implemented");
    }
}
