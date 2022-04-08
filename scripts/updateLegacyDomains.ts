import { VOLTA_CHAIN_ID } from '@energyweb/credential-governance';
import { Wallet } from 'ethers';
import { updateLegacyDomains } from '../src/utils/updateLegacyDomains';

export const domains = [
  // 'OKE.iam.ewc', // not owned
  // 'XKerZ.iam.ewc', // not owned
];

export const owners = [
  // '0x5f757211976c68136041C439c3b3e699b3312882',
  // '0x0a7E465C1a354De9a6a51CCcE84A50Fe1A210Eb3',
];

export const privateKey = '';

(async function () {
  try {
    for await (const rootDomain of domains) {
      await updateLegacyDomains({
        rootDomain,
        signer: new Wallet(privateKey),
        chainId: VOLTA_CHAIN_ID,
        dryRun: false,
      });
    }
    console.log('Resolvers are updated');
  } catch (e) {
    console.error('Error replacing resolver:', e);
  }
})();
