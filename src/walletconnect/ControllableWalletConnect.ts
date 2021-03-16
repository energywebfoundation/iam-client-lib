import WalletConnect from "@walletconnect/client";
import { IWalletConnectOptions, ICreateSessionOptions } from "@walletconnect/types";

/**
 * Extension of WalletConnect client that allows session creation to be disabled
 * This is helpful to be sure that session creation won't be attempted after closing 
 * the connection. See [MYEN-625](https://energyweb.atlassian.net/browse/MYEN-625)
 */
export class ControllableWalletConnect extends WalletConnect {
  public canCreateSession = true;

  constructor(connectorOpts: IWalletConnectOptions) {
    super(connectorOpts);
  }

  public async createSession(opts?: ICreateSessionOptions): Promise<void> {
    if (this.canCreateSession) {
      super.createSession(opts);
    }
  }
}