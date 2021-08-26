import { Signer, utils, providers } from "ethers";
import { sign } from "@energyweb/km-crypto";

const { computeAddress } = utils;

/**
 * Implementation of ethers Signer in order to test km-crypto
 */
export class KmsSignerMock extends Signer {
    constructor(private readonly privateKey: string) {
        super();
    }

    async signMessage(message: utils.BytesLike) {
        return sign.sign(message, this.privateKey) as string;
    }

    async getAddress() {
        return computeAddress(this.privateKey);
    }

    /* eslint-disable @typescript-eslint/no-unused-vars */
    async sendTransaction(tr: providers.TransactionRequest): Promise<providers.TransactionResponse> {
        throw new Error("sendTransaction is not implemented");
    }

    connect(provider: providers.Provider): Signer {
        throw new Error("KmsSignerMock: Changing of provider is not supported");
    }

    async signTransaction(transaction: utils.Deferrable<providers.TransactionRequest>): Promise<string> {
        throw new Error("KmsSignerMock: Siging transaction is not supported");
    }
}
