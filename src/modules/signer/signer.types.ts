export enum ProviderType {
  WalletConnect = 'WalletConnect',
  EwKeyManager = 'EwKeyManager',
  MetaMask = 'MetaMask',
  PrivateKey = 'PrivateKey',
  Gnosis = 'Gnosis',
  EKC = 'Enterprise Key Connect',
}

export enum ProviderEvent {
  /**
   * Metamask events https://docs.metamask.io/guide/ethereum-provider.html#events
   */
  AccountChanged = 'accountsChanged',
  NetworkChanged = 'networkChanged',
  /**
   * WalletConnect events https://docs.walletconnect.com/1.0/client-api#register-event-subscription
   */
  Disconnected = 'disconnect',
  SessionUpdate = 'session_update',
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

export const PUBLIC_KEY = 'PublicKey';
export const IS_ETH_SIGNER = 'isEthSigner';
