import { Wallet } from 'ethers';
import { namehash, bigNumberify } from 'ethers/utils';
import chai, { should } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { Keys } from '@ew-did-registry/keys';
import { IAM } from '../src/iam';
import { deployContracts, provider } from './utils';
import { EnsRegistryFactory } from '../ethers/EnsRegistryFactory';
import { PublicResolverFactory } from '../ethers/PublicResolverFactory';
import { EnsRegistry } from '../ethers/EnsRegistry';
import { PublicResolver } from '../ethers/PublicResolver';
import { labelhash } from '../src/utils/ENS_hash';
import { orgTests } from './create-organization.testSuite';

chai.use(should);
chai.use(chaiAsPromised);

let ensRegistry: EnsRegistry;
let ensResolver: PublicResolver;
const ownerKeys = new Keys();
const { privateKey } = ownerKeys;
const signer = new Wallet(privateKey, provider);

describe('IAM tests', function () {
  // const context: { iam: IAM | null, root: string, ensResolver: PublicResolver | null } = { iam: null, root: '', ensResolver: null };
  const context: any = {};

  beforeAll(async function () {
    const { ensRegistryAddress, ensResolverAddress, didContractAddress } = await deployContracts(privateKey);
    const iam = new IAM({
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
    Object.assign(context, { iam, ensResolver, root: 'root' });
  });

  test('root node should be created', async () => {
    const { iam, root } = context;

    const tx = await ensRegistry.setSubnodeRecord(namehash(''), labelhash(root), signer.address, ensResolver.address, bigNumberify(0));
    await tx.wait();

    expect(await iam.checkExistenceOfDomain({ domain: root })).toBe(true);
  });

  describe('Organization creation tests', () => orgTests(context));
});
