export enum ProviderType {
    WalletConnect = "WalletConnect",
    EwKeyManager = "EwKeyManager",
    MetaMask = "MetaMask",
    PrivateKey = "PrivateKey",
    Gnosis = "Gnosis",
}

export enum ProviderEvent {
    AccountChanged = "accountChanged",
    NetworkChanged = "networkChanged",
    Disconnected = "disconnected",
    SessionUpdate = "session_update",
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

export const PUBLIC_KEY = "PublicKey";
