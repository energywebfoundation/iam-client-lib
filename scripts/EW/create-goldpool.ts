import { chainConfigs, initWithPrivateKeySigner, NamespaceType } from '../../src';
// const EWC_CHAIN_ID = 246;
const VOLTA_CHAIN_ID = 73799;
const rpcUrl = chainConfigs()[VOLTA_CHAIN_ID].rpcUrl;

/**
 * Creating role 
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

  const goldPoolRole = 'goldpoolscripttest2';
  const namespace = `consortiapool.apps.energyweb.iam.ewc`;
  await domainsService.createRole({
    roleName: goldPoolRole,
    namespace: `roles.consortiapool.apps.energyweb.iam.ewc`,
    data: {
      roleName: goldPoolRole,
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
      ],
      metadata: {},
      // issuer: { issuerType: 'DID', did: ['did:ethr:ewc:0x65bA1b185d067522A97834Ab4070A5b413B30b20','did:ethr:ewc:0x607Ad17512FB04Cea9174304E8c7Ac7a08B67baf'] },
      issuer: { issuerType: 'DID', did: ['did:ethr:volta:0x627306090abaB3A6e1400e9345bC60c78a8BEf57','did:ethr:volta:0x5f757211976c68136041C439c3b3e699b3312882'] },
      revoker: { revokerType: 'DID', did: [] }
    },
  });
  console.log(await domainsService.getRolesByNamespace({ parentType: NamespaceType.Application, namespace: namespace }));
  console.log(`>>> Role ${goldPoolRole} is created`);

})();
