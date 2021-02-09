import { providers, Wallet } from "ethers";
import { computePublicKey } from "ethers/utils";
import { SignerFactory } from "../../src/signer/SignerFactory";
import { KmsSignerMock } from "./KmsSignerMock";

const privateKey = "0xde0aac51c154f9d467653ae882da9b77d0699b88d98f8bb4b03fd5e687b00824";
const expectedPublicKey = computePublicKey(privateKey, true).slice(2);
const provider = new providers.JsonRpcProvider("not-used");

describe("SignerFactory", () => {
  it("computes correct publicKey from ethers Wallet signature", async () => {
    const wallet = new Wallet(privateKey);
    const expectedPublicKey = computePublicKey(wallet.privateKey, true).slice(2);
    const provider = new providers.JsonRpcProvider("https://myRPC.org");
    const owner = await SignerFactory.create({ provider, signer: wallet });
    expect(owner.publicKey).toStrictEqual(expectedPublicKey);
  });

  it("computes correct publicKey from km-crypto signature", async () => {
    const mockKmsSigner = new KmsSignerMock(privateKey);
    const owner = await SignerFactory.create({ signer: mockKmsSigner, provider });
    expect(owner.publicKey).toStrictEqual(expectedPublicKey);
  });
});
