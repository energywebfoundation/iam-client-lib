import { BigNumber, Network } from "ethers/utils";

export enum WalletType {
    WalletConnect = "WalletConnect",
    EwKeyManager = "EwKeyManager",
}

export type TransactionRequest = {
    to: string;
    data: string;
    value?: BigNumber;
    from: string;
};

export type TransactionOverrides = {
    gasPrice?: BigNumber;
    gasLimit?: BigNumber;
    value?: BigNumber;
    nonce?: BigNumber;
};

export interface Signer {
    sendTransaction(request: TransactionRequest, overrides?: TransactionOverrides): Promise<any>;
    getAddress(): Promise<string>;
    getChainId(): Promise<number>;
}
