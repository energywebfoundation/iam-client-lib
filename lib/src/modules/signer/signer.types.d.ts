import { TypedDataSigner } from '@ethersproject/abstract-signer';
import { Signer } from 'ethers';
export declare enum ProviderType {
    WalletConnect = "WalletConnect",
    EwKeyManager = "EwKeyManager",
    MetaMask = "MetaMask",
    PrivateKey = "PrivateKey",
    Gnosis = "Gnosis",
    EKC = "Enterprise Key Connect"
}
export declare enum ProviderEvent {
    /**
     * Metamask events https://docs.metamask.io/guide/ethereum-provider.html#events
     */
    AccountChanged = "accountsChanged",
    NetworkChanged = "networkChanged",
    /**
     * WalletConnect events https://docs.walletconnect.com/1.0/client-api#register-event-subscription
     */
    Disconnected = "disconnect",
    SessionUpdate = "session_update"
}
export interface IPubKeyAndIdentityToken {
    publicKey: string;
    identityToken: string;
}
export declare type AccountInfo = {
    chainName: string;
    chainId: number;
    account: string;
};
export declare const PUBLIC_KEY = "PublicKey";
export declare const IS_ETH_SIGNER = "isEthSigner";
export declare type SignerT = Signer & TypedDataSigner;
