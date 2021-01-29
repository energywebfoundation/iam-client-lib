import { providers, Wallet } from 'ethers';
import { computePublicKey } from 'ethers/utils';
import { SignerFactory } from '../../src/signer/SignerFactory';

describe("SignerFactory Test", () => {
  it('computes correct publicKey from ethers Wallet signature', async () => {
    const wallet = new Wallet("de0aac51c154f9d467653ae882da9b77d0699b88d98f8bb4b03fd5e687b00824");
    const expectedPublicKey = computePublicKey(wallet.privateKey, true).slice(2);
    const provider = new providers.JsonRpcProvider("https://myRPC.org");
    const owner = await SignerFactory.create(wallet, provider);
    expect(owner.publicKey).toStrictEqual(expectedPublicKey);
  });
});

