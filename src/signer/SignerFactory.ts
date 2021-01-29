import { Signer } from "ethers";
import { Provider } from "ethers/providers";
import { computeAddress, computePublicKey, getAddress, hashMessage, recoverPublicKey } from "ethers/utils";
import { ERROR_MESSAGES } from "../iam/iam-base";
import { Owner } from "./Signer";

export class SignerFactory {
  static async create(signer: Signer, provider: Provider, privateKey?: string): Promise<Owner> {
    const publicKey = await this.getPublicKey(signer);
    return new Owner(
      signer,
      provider,
      publicKey,
      privateKey
    );
  }

  private static async getPublicKey(signer: Signer): Promise<string> {
    if (signer) {
      const address = await signer.getAddress();
      const message = address;
      const sig = await signer.signMessage(message);
      const recoverValidatedPublicKey = (signedMessage: string): string | undefined => {
        const publicKey = recoverPublicKey(signedMessage, sig);
        if (getAddress(address) === getAddress(computeAddress(publicKey))) {
          return computePublicKey(publicKey, true).slice(2);
        }
        return undefined;
      }

      // Computation of the digest in order to recover the public key under the assumption
      // that signature was performed as per the eth_sign spec (https://eth.wiki/json-rpc/API#eth_sign)
      // In the event that the wallet isn't prefixing & hashing message as per spec, attempt recovery without digest
      const digest = hashMessage(message);
      const publicKey = recoverValidatedPublicKey(digest) ?? recoverValidatedPublicKey(message);
      if (publicKey) return publicKey;
    }
    throw new Error(ERROR_MESSAGES.SIGNER_NOT_INITIALIZED);
  }
}