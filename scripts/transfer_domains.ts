import { EWC_CHAIN_ID } from '@energyweb/iam-contracts';
import { Wallet } from 'ethers';
import { transferDomain } from '../src/utils/domains';
import { domains, ewcPrivateKey } from './data';

export const newOwner = '0x3451aaEDD3f25204D483aADCF060e344155DEB02';

(async function() {
  try {
    for await (let rootDomain of domains) {
      await transferDomain({
        rootDomain,
        signer: new Wallet(ewcPrivateKey),
        newOwner,
        chainId: EWC_CHAIN_ID,
        dryRun: true,
      });
    }
    console.log('Domains are transferred');
  } catch (e) {
    console.error('Error transferring domains:', e);
  }
})();
