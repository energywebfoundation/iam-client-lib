import { EWC_CHAIN_ID } from '@energyweb/credential-governance';
import { Wallet } from 'ethers';
import { updateLegacyDomains } from '../src/utils/domains';
import { domains, ewcPrivateKey } from './data';

(async function () {
  try {
    for await (let rootDomain of domains) {
      await updateLegacyDomains({
        rootDomain,
        signer: new Wallet(ewcPrivateKey),
        chainId: EWC_CHAIN_ID,
        dryRun: true,
      });
    }
    console.log('Domains are updated');
  } catch (e) {
    console.error('Error updating domains:', e);
  }
})();
