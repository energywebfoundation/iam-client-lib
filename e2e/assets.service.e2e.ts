import { Wallet } from 'ethers';
import { ethAddrPattern } from '@ew-did-registry/did';
import { replenish, rpcUrl, setupENS } from './utils/setup-contracts';
import { AssetsService, CacheClient, fromPrivateKey } from '../src';

const mockGetAssetById = jest.fn();
const mockGetOwnedAssets = jest.fn();
jest.mock('../src/modules/cache-client/cache-client.service', () => {
  return {
    CacheClient: jest.fn().mockImplementation(() => {
      return {
        getAssetById: mockGetAssetById,
        getOwnedAssets: mockGetOwnedAssets,
      };
    }),
  };
});

describe('Assets tests', () => {
  let assetsService: AssetsService;
  const rootOwnerWallet = Wallet.createRandom();
  const rootOwnerAddress = rootOwnerWallet.address;

  beforeEach(async () => {
    jest.clearAllMocks();
    await replenish(rootOwnerAddress);
    await setupENS(rootOwnerAddress);
    const signerService = await fromPrivateKey(
      rootOwnerWallet.privateKey,
      rpcUrl
    );
    const mockedCacheClient = new CacheClient(signerService);
    assetsService = await AssetsService.create(
      signerService,
      mockedCacheClient
    );
  });

  test('asset should be created', async () => {
    mockGetAssetById.mockReturnValueOnce({});
    const assetAddress = await assetsService.registerAsset();
    expect(assetAddress).toEqual(expect.stringMatching(ethAddrPattern));
  });

  // As for now assets service just forwards calls to cache service, tests will make sense when asssets service will be able to communicate with IdentityManager
  test.todo('owner should be able to offer asset');

  test.todo('asset should be able to cancel offer');

  test.todo('asset should be able to accept offer');

  test.todo('asset should be able to reject offer');

  test.todo('update did document for asset');
});
