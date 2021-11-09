import EKC from "@energyweb/ekc";
import { TransactionRequest, Provider } from "@ethersproject/abstract-provider";
import { Deferrable, resolveProperties } from "@ethersproject/properties";
import { Signer } from "ethers";
import { ERROR_MESSAGES } from "../../errors";

export class EkcSigner extends Signer {
    public provider: Provider;
    private _signer: Signer;

    constructor(public ekc: EKC) {
        super();
        this._signer = ekc.getSigner();
        this.provider = ekc._getProvider();
    }

    static async create(proxyUrl: string) {
        try {
            const ekc = await EKC.init({ proxyUrl });
            await ekc.login({ mode: "popup" });
            return new EkcSigner(ekc);
        } catch (error) {
            throw new Error(ERROR_MESSAGES.ERROR_IN_AZURE_PROVIDER);
        }
    }

    getAddress(): Promise<string> {
        return this._signer.getAddress();
    }

    signMessage(message: string): Promise<string> {
        return this._signer.signMessage(message);
    }

    async signTransaction(transaction: Deferrable<TransactionRequest>): Promise<string> {
        const resolvedTx = await resolveProperties(transaction);
        return this._signer.signTransaction(resolvedTx);
    }

    connect(provider: Provider): Signer {
        return this._signer.connect(provider);
    }
}
