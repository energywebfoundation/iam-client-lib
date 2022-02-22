import { VOLTA_CHAIN_ID } from '@energyweb/iam-contracts';
import { providers } from 'ethers';
import { Wallet } from 'ethers';
import { updateLegacyIssuers } from '../../src/utils/updateLegacyIssuers';
import util from 'util';

const { JsonRpcProvider } = providers;

describe.skip('Domains migration', () => {
  let rootOwner: Wallet;
  const root = 'spotify.apps.dmitryfesenko.iam.ewc';
  const ganacheUrl = 'http://localhost:8544';

  beforeAll(async () => {
    rootOwner = Wallet.createRandom().connect(new JsonRpcProvider(ganacheUrl));
  });

  test(
    'Role definitions should be migrated',
    async () => {
      const updatedDomains = await updateLegacyIssuers(
        root,
        rootOwner,
        VOLTA_CHAIN_ID
      );
      updatedDomains.forEach((d) => {
        console.group(d.domain);
        console.log('def:', util.inspect(d.legacyDef, { depth: 5 }));
        console.log('updated def:', util.inspect(d.updatedDef, { depth: 5 }));
        console.groupEnd();
      });
    },
    10 * 60 * 1000
  );
});
