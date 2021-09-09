import { EwSigner } from "@ew-did-registry/did-ethr-resolver";
import { Signer, providers, utils } from "ethers";

export class Owner extends Signer implements EwSigner {
    constructor(
        public signer: Signer,
        public provider: providers.Provider,
        public publicKey: string,
        public privateKey?: string,
    ) {
        super();
    }

    getAddress() {
        return this.signer.getAddress();
    }
    sendTransaction(transaction: providers.TransactionRequest) {
        return this.signer.sendTransaction(transaction);
    }
    signMessage(message: string | utils.Bytes) {
        return this.signer.signMessage(message);
    }

    /* eslint-disable @typescript-eslint/no-unused-vars */
    signTransaction(transaction: utils.Deferrable<providers.TransactionRequest>): Promise<string> {
        throw new Error("Method not implemented.");
    }
    connect(provider: providers.Provider): Signer {
        throw new Error("Method not implemented.");
    }
}
