import { Signer, utils, providers } from "ethers";
import { sign } from "@energyweb/km-crypto";

const { computeAddress } = utils;

/**
 * Implementation of ethers Signer in order to test km-crypto
 */
export class KmsSignerMock extends Signer {
  constructor(private readonly privateKey:string) {
    super();
  }

  async signMessage(message: utils.Arrayish) {
    return sign.sign(message, this.privateKey) as string;
  }

  async getAddress() {
    return computeAddress(this.privateKey);
  }

  async sendTransaction(tr: providers.TransactionRequest): Promise<providers.TransactionResponse> {
    throw new Error("sendTransaction is not implemented");
  }
}