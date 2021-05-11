import { Wallet, utils } from "ethers";
import { getPublicKeyAndIdentityToken } from "../../src/utils/getPublicKeyAndIdentityToken";
import { KmsSignerMock } from "../signer/KmsSignerMock";

const { computePublicKey } = utils;

const privateKey = "0xde0aac51c154f9d467653ae882da9b77d0699b88d98f8bb4b03fd5e687b00824";
const expectedPublicKey = computePublicKey(privateKey, true).slice(2);

describe("getPublicKeyAndIdentityToken", () => {
  it("computes correct publicKey from ethers Wallet signature", async () => {
    const wallet = new Wallet(privateKey);
    const expectedPublicKey = computePublicKey(wallet.privateKey, true).slice(2);
    const pubKeyAndToken = await getPublicKeyAndIdentityToken(wallet);
    expect(pubKeyAndToken.publicKey).toStrictEqual(expectedPublicKey);
  });

  it("computes correct publicKey from km-crypto signature", async () => {
    const mockKmsSigner = new KmsSignerMock(privateKey);
    const pubKeyAndToken = await getPublicKeyAndIdentityToken(mockKmsSigner);
    expect(pubKeyAndToken.publicKey).toStrictEqual(expectedPublicKey);
  });
});
