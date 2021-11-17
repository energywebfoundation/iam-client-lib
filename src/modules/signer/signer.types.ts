export enum ProviderType {
    WalletConnect = "WalletConnect",
    EwKeyManager = "EwKeyManager",
    MetaMask = "MetaMask",
    PrivateKey = "PrivateKey",
    Gnosis = "Gnosis",
    EKC = "Enterprise Key Connect",
}

export enum ProviderEvent {
    AccountChanged = "accountsChanged",
    NetworkChanged = "networkChanged",
    Disconnected = "disconnect",
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
