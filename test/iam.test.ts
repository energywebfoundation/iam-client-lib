import { namehash, bigNumberify } from 'ethers/utils';
import { Keys } from '@ew-did-registry/keys';
import { IAM, ENSNamespaceTypes } from '../src/iam';
import { deployContracts, ensRegistry, ensResolver, didContract } from './utils';
import { labelhash } from '../src/utils/ENS_hash';
import { orgTests } from './organization.testSuite';
import { appsTests } from './application.testSuite';

export const rootOwner = new Keys();
const { privateKey } = rootOwner;

export const root = 'root';
export let iam: IAM;

describe('IAM tests', function () {
  beforeAll(async function () {
    await deployContracts(privateKey);

    iam = new IAM({
      rpcUrl: 'http://localhost:8544/',
      chainId: 9,
      ensRegistryAddress: ensRegistry.address,
      ensResolverAddress: ensResolver.address,
      didContractAddress: didContract.address,
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
  });

  test('can create root node', async () => {
    const tx = await ensRegistry.setSubnodeRecord(namehash(''), labelhash(root), rootOwner.getAddress(), ensResolver.address, bigNumberify(0));
    await tx.wait();

    expect(await iam.checkExistenceOfDomain({ domain: root })).toBe(true);
    expect(await iam.isOwner({ domain: root, user: rootOwner.getAddress() }));
    expect(await iam.isOwner({ domain: `${ENSNamespaceTypes.Application}.${root}`, user: rootOwner.getAddress() }));
    expect(await iam.isOwner({ domain: `${ENSNamespaceTypes.Roles}.${root}`, user: rootOwner.getAddress() }));
  });

  describe('Organization tests', () => orgTests());
  describe('Apllication tests', () => appsTests());
});
