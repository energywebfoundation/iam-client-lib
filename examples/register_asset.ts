import { setCacheConfig, initWithPrivateKeySigner } from "../src";

const rpcUrl = "https://volta-rpc.energyweb.org";

class DidService {
    constructor() {
        setCacheConfig(73799, {
            url: "https://identitycache-dev.energyweb.org/v1",
            cacheServerSupportsAuth: true,
        });
    }

    public async createOrganization(privateKey: string): Promise<{ did: string }> {
        const iam = await this.initIAM(privateKey);

        return { did: iam.signerService.did };
    }

    public async createDevice(privateKey: string, metadata: Record<string, string | number>): Promise<{ did: string }> {
        const iam = await this.initIAM(privateKey);

        const assetAddress = await iam.assetsService.registerAsset();
        console.log(">>> asset address:", assetAddress);
        const assetDid = `did:ethr:volta:${assetAddress}`;
        console.log(">>> asset: ", await iam.assetsService.getAssetById({ id: assetDid }));
        console.log(">>> owned assets:", await iam.assetsService.getOwnedAssets());

        const claimUrl = await iam.claimsService.createSelfSignedClaim({
            data: metadata,
            subject: assetDid,
        });
        console.log(">>> claim url:", claimUrl);

        await new Promise((r) => setTimeout(r, 30_000));

        console.log(JSON.stringify(await iam.didRegistry.getDidDocument({ did: assetDid, includeClaims: true })));

        return { did: assetDid };
    }

    private async initIAM(privateKey: string) {
        const { connectToCacheServer, signerService } = await initWithPrivateKeySigner(privateKey, rpcUrl);
        const { connectToDidRegistry, assetsService } = await connectToCacheServer();
        const { claimsService, didRegistry } = await connectToDidRegistry();

        return {
            claimsService,
            signerService,
            assetsService,
            didRegistry,
        };
    }
}

async function scenario() {
    const didService = new DidService();
    const privateKey = "0xb09221ebe0201ea67604d8efda003b90395f9211ec498024ac6a320c4f358de0";
    const metadata = { meterId: "SolarM" };
    await didService.createDevice(privateKey, metadata);
}

scenario();
