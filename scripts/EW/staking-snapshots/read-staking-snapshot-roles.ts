import { chainConfigs, initWithPrivateKeySigner, NamespaceType } from '../../../src';

// CONFIG
const CHAIN_ID = 246;
const namespace = `consortiapool.apps.energyweb.auth.ewc`;

const rpcUrl = chainConfigs()[CHAIN_ID].rpcUrl;

/**
 * Confirm role properties
 */
(async function () {
  const arbitraryPrivateKey = process.env.SOME_KEY ?? '';
  if (arbitraryPrivateKey == '') {
    console.log("key not set");
    return;
  }
  const { connectToCacheServer } = await initWithPrivateKeySigner(
    arbitraryPrivateKey,
    rpcUrl
  );
  const { domainsService } = await connectToCacheServer();

  const domains = await domainsService.getRolesByNamespace({ parentType: NamespaceType.Application, namespace: namespace });
  const snap4Role = domains.filter(d => d.name == "snapshot4")[0];
  const silverRole = domains.filter(d => d.name == "silverpool")[0];
  const goldRole = domains.filter(d => d.name == "goldpool")[0];
  console.log(snap4Role.definition);
  console.log(silverRole.definition);
  console.log(goldRole.definition);
  // domains.forEach(d => {
  //   console.log(d.definition)
  // })
})();
