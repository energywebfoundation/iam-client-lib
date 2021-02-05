import { Signer } from "ethers";
import { Arrayish, computeAddress } from "ethers/utils";
import { sign } from "@energyweb/km-crypto";
import { TransactionRequest, TransactionResponse } from "ethers/providers";


/**
 * Implementation of ethers Signer in order to test km-crypto
 */
export class KmsSignerMock extends Signer {
  constructor(private readonly privateKey:string) {
    super()
  }

  async signMessage(message: Arrayish) {
    return await sign.sign(message, this.privateKey) as string;
  }

  async getAddress() {
    return await computeAddress(this.privateKey);
  }

  async sendTransaction(tr: TransactionRequest): Promise<TransactionResponse> {
    throw new Error("sendTransaction is not implemented");
  }
}