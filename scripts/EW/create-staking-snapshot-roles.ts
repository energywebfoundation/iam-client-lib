import { chainConfigs, initWithPrivateKeySigner } from '../../src';

// CONFIG
const CHAIN_ID = 246;
const parentNamespace = `roles.consortiapool.apps.energyweb.auth.ewc`;
const roleName = 'goldpool';

const rpcUrl = chainConfigs()[CHAIN_ID].rpcUrl;

/**
 * Creating staking "snapshot" role 
 */
(async function () {
  const ewOwnerKey = process.env.APP_OWNER_KEY ?? '';
  if (ewOwnerKey == '') {
    console.log("ewOwnerKey not set");
    return;
  }
  const { connectToCacheServer } = await initWithPrivateKeySigner(
    ewOwnerKey,
    rpcUrl
  );
  const { domainsService } = await connectToCacheServer();

  await domainsService.createRole({
    roleName: roleName,
    namespace: parentNamespace,
    data: {
      roleName: roleName,
      roleType: 'app',
      version: 1,
      enrolmentPreconditions: [],
      issuerFields: [
        {
          fieldType: "number",
          label: "stakeAmount",
          required: true
        },
        {
          fieldType: "number",
          label: "minimumBalance",
          required: true
        },
        {
          fieldType: "number",
          label: "snapshotBlock",
          required: true
        },
        {
          fieldType: "number",
          label: "chainId",
          required: true
        },
        {
          fieldType: "text",
          label: "stakingPoolAddress",
          required: true
        },
      ],
      metadata: {},
      issuer: { issuerType: 'DID', did: ['did:ethr:ewc:0x65bA1b185d067522A97834Ab4070A5b413B30b20','did:ethr:ewc:0x607Ad17512FB04Cea9174304E8c7Ac7a08B67baf'] },
      revoker: { revokerType: 'DID', did: ['did:ethr:ewc:0x65bA1b185d067522A97834Ab4070A5b413B30b20'] }
    },
  });
  console.log(`>>> Role ${roleName} is created`);

})();
