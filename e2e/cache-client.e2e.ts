import { initWithPrivateKeySigner, setCacheConfig } from '../src';
import { shutDownIpfsDaemon, spawnIpfsDaemon } from './utils/setup-ipfs';

const rpcUrl = 'https://volta-rpc.energyweb.org';
const privateKey = '';

describe.skip('Cache client', () => {
  test('Asset owner should be able to update asset document', async () => {
    setCacheConfig(73799, {
      url: 'https://identitycache-dev.energyweb.org/v1',
      cacheServerSupportsAuth: true,
    });

    const metadata = { meterId: 'SolarM' };

    const { connectToCacheServer } = await initWithPrivateKeySigner(
      privateKey,
      rpcUrl
    );
    const { connectToDidRegistry, assetsService } =
      await connectToCacheServer();
    const { claimsService, didRegistry } = await connectToDidRegistry(
      await spawnIpfsDaemon()
    );

    const assetAddress = await assetsService.registerAsset();
    const assetDid = `did:ethr:volta:${assetAddress}`;

    const claimUrl = await claimsService.createSelfSignedClaim({
      data: metadata,
      subject: assetDid,
    });

    await new Promise((r) => setTimeout(r, 30_000));

    const assetDoc = await didRegistry.getDidDocument({
      did: assetDid,
      includeClaims: true,
    });
    expect(
      assetDoc.service.some(
        (s) =>
          s.serviceEndpoint === claimUrl &&
          expect(s).toEqual(expect.objectContaining(metadata))
      )
    );
    await shutDownIpfsDaemon();
  }, 120000);
});
