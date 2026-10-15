import { Wallet } from 'ethers';
import { ethAddrPattern } from '@ew-did-registry/did';
import { replenish, rpcUrl, setupENS } from './utils/setup-contracts';
import {
  AssetsService,
  CacheClient,
  fromPrivateKey,
  AssetNotExist,
} from '../src';

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

  test('should throw AssetNotExist when getting owner of not existing asset', async () => {
    mockGetAssetById.mockResolvedValueOnce(undefined);
    const id = '<ASSET DID>';
    expect(assetsService.getAssetOwner(id)).rejects.toEqual(
      new AssetNotExist(id)
    );
  });

  /**
   * @todo when ssi hub is included in test environment
   */
  test.todo('should be able to get asset owner');

  test.todo('owner should be able to offer asset');
  test.todo('owner should not be able to offer asset to himself');
  test.todo('owner should not be able to offer asset to asset');

  test.todo('owner should be able to cancel offer');

  test.todo('receiver should be able to accept offer');

  test.todo('receiver should be able to reject offer');

  test.todo('owner should be able to update asset document');
});
