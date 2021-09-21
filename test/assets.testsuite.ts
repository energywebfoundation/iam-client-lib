import { Keys } from "@ew-did-registry/keys";
import { OfferableIdentity__factory } from "../ethers/factories/OfferableIdentity__factory";
import { IAM } from "../src/iam";
import { emptyAddress } from "../src/utils/constants";
import { rootOwner, createIam } from "./iam.test";
import { replenish, provider, rpcUrl } from "./setup_contracts";
import { PubKeyType } from "@ew-did-registry/did-resolver-interface/src/models/operator";
import { Algorithms, DIDAttribute, Encoding } from "@ew-did-registry/did-resolver-interface";
import { Methods } from "@ew-did-registry/did";

export const assetsTests = () => {
    let rootOwnerIam: IAM;

    beforeAll(async () => {
        rootOwnerIam = await createIam(rootOwner.privateKey, { createDocument: true });
    });

    test("asset should be created", async () => {
        const assetAddress = await rootOwnerIam.registerAsset();
        const assetContract = OfferableIdentity__factory.connect(assetAddress, provider);
        const owner = await assetContract.owner();
        expect(owner).toBe(rootOwner.address);
    });
    test("asset should be offered", async () => {
        const assetAddress = await rootOwnerIam.registerAsset();
        const newOwner = new Keys();
        await rootOwnerIam.offerAsset({
            assetDID: `did:ethr:${assetAddress}`,
            offerTo: `${newOwner.getAddress()}`,
        });
        const assetContract = OfferableIdentity__factory.connect(assetAddress, provider);
        const offered = await assetContract.offeredTo();
        expect(offered).toBe(newOwner.getAddress());
    });
    test("asset should be able to cancel offer", async () => {
        const assetAddress = await rootOwnerIam.registerAsset();
        const newOwner = new Keys();
        const assetDID = `did:ethr:${assetAddress}`;
        await rootOwnerIam.offerAsset({
            assetDID,
            offerTo: `${newOwner.getAddress()}`,
        });
        const assetContract = OfferableIdentity__factory.connect(assetAddress, provider);
        const offered = await assetContract.offeredTo();
        expect(offered).toBe(newOwner.getAddress());
        await rootOwnerIam.cancelAssetOffer({ assetDID });
        const notOffered = await assetContract.offeredTo();
        expect(notOffered).toBe(emptyAddress);
    });
    test("asset should be able to accept offer", async () => {
        const assetAddress = await rootOwnerIam.registerAsset();
        const newOwner = new Keys();
        await replenish(newOwner.getAddress());
        const assetDID = `did:ethr:${assetAddress}`;
        await rootOwnerIam.offerAsset({ assetDID, offerTo: `${newOwner.getAddress()}` });
        const newOwnerIAM = new IAM({
            privateKey: newOwner.privateKey,
            rpcUrl,
        });
        await newOwnerIAM.initializeConnection({ initCacheServer: false, createDocument: false });
        await newOwnerIAM.acceptAssetOffer({
            assetDID,
        });
        const assetContract = OfferableIdentity__factory.connect(assetAddress, provider);
        const owner = await assetContract.owner();
        const offeredTo = await assetContract.offeredTo();
        expect(owner).toBe(newOwner.getAddress());
        expect(offeredTo).toBe(emptyAddress);
    });

    test("asset should be able to reject offer", async () => {
        const assetAddress = await rootOwnerIam.registerAsset();
        const newOwner = new Keys();
        await replenish(newOwner.getAddress());
        const assetDID = `did:ethr:${assetAddress}`;
        await rootOwnerIam.offerAsset({ assetDID, offerTo: `${newOwner.getAddress()}` });
        const newOwnerIAM = new IAM({
            privateKey: newOwner.privateKey,
            rpcUrl,
        });
        await newOwnerIAM.initializeConnection({ initCacheServer: false, createDocument: false });
        await newOwnerIAM.rejectAssetOffer({
            assetDID,
        });
        const assetContract = OfferableIdentity__factory.connect(assetAddress, provider);
        const owner = await assetContract.owner();
        const offeredTo = await assetContract.offeredTo();
        expect(owner).toBe(rootOwner.address);
        expect(offeredTo).toBe(emptyAddress);
    });

    test("update did document for asset", async () => {
        const assetAddress = await rootOwnerIam.registerAsset();

        const asset1 = await rootOwnerIam.getDidDocument({ did: `did:${Methods.Erc1056}:${assetAddress}` });
        expect(asset1.publicKey.length).toBe(0);

        const update = await rootOwnerIam.updateDidDocument({
            didAttribute: DIDAttribute.PublicKey,
            did: `did:ethr:${assetAddress}`,
            data: {
                algo: Algorithms.Secp256k1,
                encoding: Encoding.HEX,
                type: PubKeyType.SignatureAuthentication2018,
                value: { tag: "key-1", publicKey: `0x${new Keys().publicKey}` },
            },
        });
        expect(update).toBeTruthy();

        const asset = await rootOwnerIam.getDidDocument({ did: `did:${Methods.Erc1056}:${assetAddress}` });
        expect(asset.publicKey.length).toBe(1);

        const did = `did:${Methods.Erc1056}:${assetAddress}#key-1`;
        const type = "Secp256k1sigAuth";
        expect(asset.publicKey.find((asset) => asset.id === did && asset.type === type)).toBeTruthy();
    });
};
