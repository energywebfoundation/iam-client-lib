import { VOLTA_CHAIN_ID } from '@energyweb/credential-governance';
import { Wallet } from 'ethers';
import { transferDomain } from '../src/utils/transfer-domains';

export const domains = ['energyweb.iam.ewc'];
export const newOwner = '';
export const ownerPrivKey = Wallet.createRandom().privateKey;

(async function () {
  try {
    for await (const rootDomain of domains) {
      await transferDomain({
        rootDomain,
        signer: new Wallet(ownerPrivKey),
        newOwner,
        chainId: VOLTA_CHAIN_ID,
        dryRun: true,
      });
    }
    process.stdout.write('Domains are transferred\n');
  } catch (e) {
    process.stderr.write(`Error transferring domains: ${e}\n`);
  }
})();
