import { transferEwcEngie } from '../src/utils/domains';
import { ewcPrivateKey } from './data';

export const engieOwner = '0x3451aaEDD3f25204D483aADCF060e344155DEB02';

(async function() {
  try {
    await transferEwcEngie(ewcPrivateKey);
    console.log('EWC Engie is transferred');
  } catch (e) {
    console.error('Error transferring domains:', e);
  }
})();
