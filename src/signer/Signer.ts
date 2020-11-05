import WalletConnectProvider from "@walletconnect/web3-provider";
import { Signer } from "ethers";
import { Provider, TransactionRequest } from "ethers/providers";
import {
  Arrayish,
  recoverPublicKey,
  computePublicKey,
  keccak256,
  hashMessage,
  arrayify
} from "ethers/utils";

export class IdentityOwner extends Signer {
  public publicKey: string | undefined;
  constructor(private signer: Signer, public provider: Provider) {
    super();
  }

  async initPublicKey() {
    const address = await this.signer.getAddress();
    const hash = keccak256(address);
    const digest = hashMessage(arrayify(hash));
    if (((this.signer?.provider as any)?.provider as WalletConnectProvider)?.isWalletConnect) {
      const sig = await this.signMessage(arrayify(digest));
      this.publicKey = computePublicKey(recoverPublicKey(digest, sig), true).slice(2);
      return;
    }
    const sig = await this.signMessage(arrayify(hash));
    this.publicKey = computePublicKey(recoverPublicKey(digest, sig), true).slice(2);
  }
  getAddress() {
    return this.signer.getAddress();
  }
  sendTransaction(transaction: TransactionRequest) {
    return this.signer.sendTransaction(transaction);
  }
  signMessage(message: Arrayish) {
    return this.signer.signMessage(message);
  }
}
