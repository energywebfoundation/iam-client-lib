import { EWC_CHAIN_ID } from '@energyweb/credential-governance';
import { Wallet } from 'ethers';
import { transferDomain } from '../src/utils/domains';
import { domains, ewcPrivateKey } from './data';
import { getLogger } from '../src/config/logger.config';

export const newOwner = '0x3451aaEDD3f25204D483aADCF060e344155DEB02';

(async function () {
  const logger = getLogger();
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
    logger.info('Domains are transferred');
  } catch (e) {
    logger.error(`Error transferring domains: ${e}`);
  }
})();
