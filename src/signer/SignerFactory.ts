import base64url from "base64url";
import { Signer } from "ethers";
import { Provider } from "ethers/providers";
import {
  arrayify,
  computeAddress,
  computePublicKey,
  getAddress,
  hashMessage,
  keccak256,
  recoverPublicKey
} from "ethers/utils";
import { ERROR_MESSAGES } from "../errors";
import { Owner } from "./Signer";

export class SignerFactory {
  static async create({
    signer,
    provider,
    privateKey,
    publicKey: savedPublicKey
  }: {
    signer: Signer;
    provider: Provider;
    privateKey?: string;
    publicKey?: string;
  }): Promise<Owner> {
    const { publicKey, identityToken } = savedPublicKey
      ? { publicKey: savedPublicKey, identityToken: undefined }
      : await this.getPublicKeyAndIdentityToken(signer);
    return new Owner(signer, provider, publicKey, identityToken, privateKey);
  }

  private static async getPublicKeyAndIdentityToken(signer: Signer) {
    if (signer) {
      const header = {
        alg: "ES256",
        typ: "JWT"
      };
      const encodedHeader = base64url(JSON.stringify(header));
      const address = await signer.getAddress();
      const payload = {
        iss: `did:ethr:${address}`,
        claimData: {
          blockNumber: await signer.provider?.getBlockNumber()
        }
      };

      const encodedPayload = base64url(JSON.stringify(payload));
      const token = `0x${Buffer.from(`${encodedHeader}.${encodedPayload}`).toString("hex")}`;
      // arrayification is necessary for WalletConnect signatures to work. eth_sign expects message in bytes: https://docs.walletconnect.org/json-rpc-api-methods/ethereum#eth_sign
      // keccak256 hash is applied for Metamask to display a coherent hex value when signing
      const message = arrayify(keccak256(token));
      const sig = await signer.signMessage(message);
      const recoverValidatedPublicKey = (signedMessage: Uint8Array): string | undefined => {
        const publicKey = recoverPublicKey(signedMessage, sig);
        if (getAddress(address) === getAddress(computeAddress(publicKey))) {
          return computePublicKey(publicKey, true).slice(2);
        }
        return undefined;
      };

      // Computation of the digest in order to recover the public key under the assumption
      // that signature was performed as per the eth_sign spec (https://eth.wiki/json-rpc/API#eth_sign)
      // In the event that the wallet isn't prefixing & hashing message as per spec, attempt recovery without digest
      const digest = arrayify(hashMessage(message));
      const publicKey = recoverValidatedPublicKey(digest) ?? recoverValidatedPublicKey(message);
      if (publicKey) {
        return { publicKey, identityToken: `${encodedHeader}.${encodedPayload}.${base64url(sig)}` };
      }
      throw new Error(ERROR_MESSAGES.PUBLIC_KEY_NOT_RECOVERED);
    }
    throw new Error(ERROR_MESSAGES.SIGNER_NOT_INITIALIZED);
  }
}
