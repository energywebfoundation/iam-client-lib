import { EWC_CHAIN_ID } from '@energyweb/credential-governance';
import { Wallet } from 'ethers';
import { updateLegacyDomains } from '../src/utils/domains';
import { domains, ewcPrivateKey } from './data';
import { getLogger } from '../src/config/logger.config';

(async function () {
  const logger = getLogger();
  try {
    for await (const rootDomain of domains) {
      await updateLegacyDomains({
        rootDomain,
        signer: new Wallet(ewcPrivateKey),
        chainId: EWC_CHAIN_ID,
        dryRun: true,
      });
    }
    logger.info('Domains are updated');
  } catch (e) {
    logger.error(`Error updating domains: ${e}`);
  }
})();
