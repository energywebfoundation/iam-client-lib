import { IdentityOwner } from "@ew-did-registry/did-resolver-interface";
import { Signer } from "ethers";
import { Provider, TransactionRequest } from "ethers/providers";
import { Arrayish } from "ethers/utils";

export class Owner extends Signer implements IdentityOwner {
  constructor(
    private signer: Signer,
    public provider: Provider,
    public publicKey: string,
    public identityToken?: string,
    public privateKey?: string
  ) {
    super();
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
