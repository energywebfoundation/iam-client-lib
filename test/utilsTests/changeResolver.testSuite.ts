import { changeResolver, ChangeResolverParams } from '../../src/utils/change_resolver';
import { getSubdomains } from '../../src/utils/getSubDomains';
import { root, rootOwner, rpcUrl } from '../iam.test';
import { org1 } from '../organization.testSuite';
import { ensRegistry, ensResolver, provider } from '../setup_contracts';
import { namehash } from 'ethers/utils';
import { NODE_FIELDS_KEY } from '../../src/utils/constants';
import { Contract, Wallet } from 'ethers';
import { PublicResolverFactory } from '../../ethers/PublicResolverFactory';

export const changeResolverTests = () => {
  let newResolverAddr: string;
  let newResolver: Contract;
  let params: Omit<ChangeResolverParams, 'rootNode'>;

  beforeAll(async () => {
    const wallet = new Wallet(rootOwner.privateKey, provider);
    newResolver = await (new PublicResolverFactory(wallet).deploy(ensRegistry.address));
    newResolverAddr = newResolver.address;
    params = {
      privateKey: rootOwner.privateKey,
      registryAddr: ensRegistry.address,
      resolverAddr: ensResolver.address,
      rpcUrl,
      newResolverAddr
    };
  });

  test('org domain resolver can be changed', async () => {
    const rootNode = `${org1}.${root}`;

    await changeResolver({ ...params, rootNode });

    const domains = await getSubdomains({ domain: rootNode, ensResolver, ensRegistry, mode: 'ALL' });
    const resolvers = await Promise.all(domains.map(async (domain) => await ensRegistry.resolver(namehash(domain))));

    expect(
      resolvers
        .every((addr) => addr === newResolverAddr))
      .toBe(true);
  });

  test('root resolver can be changed', async () => {
    const rootNode = `${root}`;

    await ensRegistry.setOwner(namehash('org1-1.org1.root'), '0xE45Ad1e7522288588dA6829A9ea6A09e92FCDe14');
    await ensRegistry.setOwner(namehash('org1.root'), '0xE45Ad1e7522288588dA6829A9ea6A09e92FCDe14');

    await changeResolver({ ...params, rootNode });

    const nodes = await getSubdomains({ domain: rootNode, ensResolver, ensRegistry, mode: "ALL" });

    const nodeDefs = await Promise.all(nodes.map(async (domain) => ({
      name: await ensResolver.name(namehash(domain)),
      fields: await ensResolver.text(namehash(domain), NODE_FIELDS_KEY),
      owner: await ensRegistry.owner(namehash(domain)),
    })
    ));

    const resolvers = await Promise.all(nodes.map(async (node) => await ensRegistry.resolver(namehash(node))));

    await changeResolver({ ...params, rootNode });

    expect(
      resolvers
        .every((addr) => addr === newResolverAddr))
      .toBe(true);

    /** node names, definitions and owners should be migrated along with nodes */
    expect(nodeDefs).toEqual(await Promise.all(nodes.map(async (domain) => ({
      name: await newResolver.name(namehash(domain)),
      fields: await newResolver.text(namehash(domain), NODE_FIELDS_KEY),
      owner: await ensRegistry.owner(namehash(domain)),
    })
    )));
  });
};