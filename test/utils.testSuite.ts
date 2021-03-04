import { changeResolver } from '../src/utils/change_resolver';
import { getSubdomains } from '../src/utils/getSubDomains';
import { root, rootOwner, rpcUrl } from './iam.test';
import { org1 } from './organization.testSuite';
import { ensRegistry, ensResolver } from './setup_contracts';
import { namehash } from 'ethers/utils';
import { emptyAddress } from '../src/utils/constants';

export const utilsTests = () => {
  const newResolverAddr = emptyAddress;
  let params;

  beforeAll(() => {
    params = {
      privateKey: rootOwner.privateKey,
      registryAddr: ensRegistry.address,
      resolverAddr: ensResolver.address,
      rpcUrl,
      newResolverAddr
    };
  });

  test('org domain resolver can be changed', async () => {
    params.rootNode = `${org1}.${root}`;

    await changeResolver(params);

    const domains = await getSubdomains({ domain: params.rootNode, ensResolver, ensRegistry, mode: 'ALL' });
    const resolvers = await Promise.all(domains.map(async (domain) => await ensRegistry.resolver(namehash(domain))));

    expect(
      resolvers
        .every((addr) => addr === newResolverAddr))
      .toBe(true);
  });

  test('root resolver can be changed', async () => {
    params.rootNode = `${root}`;

    await ensRegistry.setOwner(namehash('org1-1.org1.root'), '0xE45Ad1e7522288588dA6829A9ea6A09e92FCDe14');
    await ensRegistry.setOwner(namehash('org1.root'), '0xE45Ad1e7522288588dA6829A9ea6A09e92FCDe14');

    await changeResolver(params);

    const domains = await getSubdomains({ domain: params.rootNode, ensResolver, ensRegistry, mode: 'ALL' });
    const resolvers = await Promise.all(domains.map(async (domain) => await ensRegistry.resolver(namehash(domain))));

    expect(
      resolvers
        .every((addr) => addr === newResolverAddr))
      .toBe(true);
  });
};
