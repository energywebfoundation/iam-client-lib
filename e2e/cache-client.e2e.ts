import { initWithPrivateKeySigner, setCacheConfig } from '../src';

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
    const projectId = '2DCe3TNAHzzmoSBrcPyWx4NOyrv';
    const projectSecret = 'ef64ce66962c5de8146a841529abd14c';
    const auth =
      'Basic ' +
      Buffer.from(projectId + ':' + projectSecret).toString('base64');
    const ipfsClientConfig = {
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https',
      headers: {
        authorization: auth,
      },
    };
    const { claimsService, didRegistry } = await connectToDidRegistry(
      ipfsClientConfig
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
  }, 120000);
});
