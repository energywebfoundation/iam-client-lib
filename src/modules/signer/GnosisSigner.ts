import SafeAppSdk from "@gnosis.pm/safe-apps-sdk";
import { utils } from "ethers";
import { Signer, TransactionOverrides, TransactionRequest } from "./signer.types";

const { bigNumberify } = utils;

/**
 * @class GnosisIam
 * @description Intended for use in Volta Gnosis web interface(https://volta.gnosis-safe.io/).
 * Dapp should provide this class with SafeAppSdk injected by Gnosis interface
 */
export class GnosisSigner implements Signer {
    constructor(private safeAppSdk: SafeAppSdk) {}

    async sendTransaction(transaction: TransactionRequest, overrides?: TransactionOverrides) {
        const safeTxGas = bigNumberify(overrides?.gasLimit || "").toNumber();

        await this.safeAppSdk.txs.send({
            txs: [{ ...transaction, value: transaction.value?.toHexString() || "0x0" }],
            params: {
                safeTxGas,
            },
        });
    }

    async getAddress(): Promise<string> {
        return (await this.safeAppSdk.getSafeInfo()).safeAddress;
    }
}
