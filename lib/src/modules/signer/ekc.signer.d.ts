import EKC from '@energyweb/ekc';
import { TransactionRequest } from '@ethersproject/abstract-provider';
import { TypedDataSigner } from '@ethersproject/abstract-signer';
import { Deferrable } from '@ethersproject/properties';
import { Signer, providers } from 'ethers';
export declare class EkcSigner extends Signer implements TypedDataSigner {
    ekc: EKC;
    provider: providers.Provider;
    private _signer;
    constructor(ekc: EKC);
    static create(proxyUrl: string): Promise<EkcSigner>;
    getAddress(): Promise<string>;
    signMessage(message: string): Promise<string>;
    signTransaction(transaction: Deferrable<TransactionRequest>): Promise<string>;
    connect(provider: providers.Provider): Signer;
    _signTypedData(): Promise<string>;
}
