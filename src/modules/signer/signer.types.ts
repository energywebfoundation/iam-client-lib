export enum ProviderType {
    WalletConnect = "WalletConnect",
    EwKeyManager = "EwKeyManager",
    Metamask = "MetaMask",
    PrivateKey = "PrivateKey",
    Gnosis = "Gnosis",
}

export interface IPubKeyAndIdentityToken {
    publicKey: string;
    identityToken: string;
}

export type AccountInfo = {
    chainName: string;
    chainId: number;
    account: string;
};

export const WALLET_PROVIDER = "WalletProvider";
export const PUBLIC_KEY = "PublicKey";
