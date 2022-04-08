import { transferDomains } from '../src/utils/updateLegacyDomains';
import { domains, owners, privateKey } from './updateLegacyDomains';

(async function () {
  await transferDomains(domains, owners, privateKey);
})();
