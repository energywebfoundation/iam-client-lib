import { Wallet } from 'ethers';
import { namehash, bigNumberify } from 'ethers/utils';
import chai, { should } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { Keys } from '@ew-did-registry/keys';
import { IAM, ENSNamespaceTypes } from '../src/iam';
import { deployContracts, provider } from './utils';
import { EnsRegistryFactory } from '../ethers/EnsRegistryFactory';
import { PublicResolverFactory } from '../ethers/PublicResolverFactory';
import { EnsRegistry } from '../ethers/EnsRegistry';
import { PublicResolver } from '../ethers/PublicResolver';
import { labelhash } from '../src/utils/ENS_hash';

chai.use(should);
chai.use(chaiAsPromised);

let ensRegistry: EnsRegistry;
let ensResolver: PublicResolver;
const ownerKeys = new Keys();
const { privateKey } = ownerKeys;
const signer = new Wallet(privateKey, provider);

describe('IAM tests', function () {
  let iam: IAM;
  const root = 'root';

  beforeAll(async function () {
    const { ensRegistryAddress, ensResolverAddress, didContractAddress } = await deployContracts(privateKey);
    iam = new IAM({
      rpcUrl: 'http://localhost:8544/',
      chainId: 9,
      ensRegistryAddress,
      ensResolverAddress,
      didContractAddress,
      privateKey
    });
    try {
      await iam.initializeConnection({
        useMetamaskExtension: false,
        reinitializeMetamask: false
      });
    } catch (e) {
      console.error('>>> Error initializing connection:', e);
    }
    ensRegistry = EnsRegistryFactory.connect(ensRegistryAddress, signer);
    ensResolver = PublicResolverFactory.connect(ensResolverAddress, signer);
  });

  test('root node should be created', async () => {
    const tx = await ensRegistry.setSubnodeRecord(namehash(''), labelhash(root), signer.address, ensResolver.address, bigNumberify(0));
    await tx.wait();

    expect(await iam.checkExistenceOfDomain({ domain: root })).toBe(true);
  });

  describe('Organization creation tests', function () {
    const org = 'org1';
    const orgName = 'Organization 1';
    let steps: { next: () => Promise<void> }[];
    let nodenameIsSet: Promise<void>;

    beforeAll(async function () {
      steps = await iam.createOrganization({ orgName: org, namespace: root, data: { orgName }, returnSteps: true });

      nodenameIsSet = new Promise<void>((resolve) => {
        const filter = ensResolver.filters.NameChanged(namehash(`${org}.${root}`), null);
        ensResolver.on(filter, (node: string, name: string) => {
          expect(namehash(`${org}.${root}`)).toBe(node);
          expect(`${org}.${root}`).toBe(name);
          resolve();
        });
      });

      for (const { next } of steps) {
        await next();
      }
    });

    test('org node should be created', async () => {
      expect(await iam.checkExistenceOfDomain({ domain: `${org}.${root}` })).toBe(true);
    });

    test('app node should be created', async () => {
      expect(await iam.checkExistenceOfDomain({ domain: `${ENSNamespaceTypes.Application}.${org}.${root}` })).toBe(true);
    });

    test('roles node should be created', async () => {
      expect(await iam.checkExistenceOfDomain({ domain: `${ENSNamespaceTypes.Roles}.${org}.${root}` })).toBe(true);
    });

    test('org ENS name should be set', async () => {
      return nodenameIsSet.should.be.fulfilled;
    });

    test('org domain should be under root domain', async () => {
      expect(await iam.getSubdomains({ domain: root })).toContain(org);
    });
  });
});
