import { IdentityOwner } from "@ew-did-registry/did-resolver-interface";
import { Signer, providers, utils } from "ethers";


export class Owner extends Signer implements IdentityOwner {
  constructor(
    private signer: Signer,
    public provider: providers.Provider,
    public publicKey: string,
    public identityToken?: string,
    public privateKey?: string
  ) {
    super();
  }

  getAddress() {
    return this.signer.getAddress();
  }
  sendTransaction(transaction: providers.TransactionRequest) {
    return this.signer.sendTransaction(transaction);
  }
  signMessage(message: utils.Arrayish) {
    return this.signer.signMessage(message);
  }
}
