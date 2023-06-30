import { EWC_CHAIN_ID } from '@energyweb/credential-governance';
import { Wallet } from 'ethers';
import { transferDomain } from '../src/utils/transfer-domains';

export const domains = ['energyweb.iam.ewc'];
export const newOwner = '0x205801aAbf81B65B3b7C52041991994d6c2e9F9d';
export const ewcPrivateKey = Wallet.createRandom().privateKey;

(async function () {
  try {
    for await (const rootDomain of domains) {
      await transferDomain({
        rootDomain,
        signer: new Wallet(ewcPrivateKey),
        newOwner,
        chainId: EWC_CHAIN_ID,
        dryRun: true,
      });
    }
    process.stdout.write('Domains are transferred\n');
  } catch (e) {
    process.stderr.write(`Error transferring domains: ${e}\n`);
  }
})();
