import { Keys } from "@ew-did-registry/keys";
import { OfferableIdentityFactory } from "../ethers/OfferableIdentityFactory";
import { IAM } from "../src/iam";
import { emptyAddress } from "../src/utils/constants";
import { iam, provider, rootOwner, rpcUrl } from "./iam.test";
import { replenish } from "./setup_contracts";
import { PubKeyType } from '@ew-did-registry/did-resolver-interface/src/models/operator';
import { DIDAttribute } from '@ew-did-registry/did-resolver-interface';

export const assetsTests = () => {
  test("asset should be created", async () => {
    const assetAddress = await iam.registerAsset();
    const assetContract = OfferableIdentityFactory.connect(assetAddress, provider);
    const owner = await assetContract.owner();
    expect(owner).toBe(rootOwner.getAddress());
  });
  test("asset should be offered", async () => {
    const assetAddress = await iam.registerAsset();
    const newOwner = new Keys();
    await iam.offerAsset({
      assetDID: `did:ethr:${assetAddress}`,
      offerTo: `did:ethr:${newOwner.getAddress()}`
    });
    const assetContract = OfferableIdentityFactory.connect(assetAddress, provider);
    const offered = await assetContract.offeredTo();
    expect(offered).toBe(newOwner.getAddress());
  });
  test("asset should be able to cancel offer", async () => {
    const assetAddress = await iam.registerAsset();
    const newOwner = new Keys();
    const assetDID = `did:ethr:${assetAddress}`;
    await iam.offerAsset({
      assetDID,
      offerTo: `did:ethr:${newOwner.getAddress()}`
    });
    const assetContract = OfferableIdentityFactory.connect(assetAddress, provider);
    const offered = await assetContract.offeredTo();
    expect(offered).toBe(newOwner.getAddress());
    await iam.cancelAssetOffer({ assetDID });
    const notOffered = await assetContract.offeredTo();
    expect(notOffered).toBe(emptyAddress);
  });
  test("asset should be able to accept offer", async () => {
    const assetAddress = await iam.registerAsset();
    const newOwner = new Keys();
    await replenish(newOwner.getAddress());
    const assetDID = `did:ethr:${assetAddress}`;
    await iam.offerAsset({ assetDID, offerTo: `did:ethr:${newOwner.getAddress()}` });
    const newOwnerIAM = new IAM({
      privateKey: newOwner.privateKey,
      rpcUrl
    });
    await newOwnerIAM.initializeConnection();
    await newOwnerIAM.acceptAssetOffer({
      assetDID
    });
    const assetContract = OfferableIdentityFactory.connect(assetAddress, provider);
    const owner = await assetContract.owner();
    const offeredTo = await assetContract.offeredTo();
    expect(owner).toBe(newOwner.getAddress());
    expect(offeredTo).toBe(emptyAddress);
  });

  test("asset should be able to reject offer", async () => {
    const assetAddress = await iam.registerAsset();
    const newOwner = new Keys();
    await replenish(newOwner.getAddress());
    const assetDID = `did:ethr:${assetAddress}`;
    await iam.offerAsset({ assetDID, offerTo: `did:ethr:${newOwner.getAddress()}` });
    const newOwnerIAM = new IAM({
      privateKey: newOwner.privateKey,
      rpcUrl
    });
    await newOwnerIAM.initializeConnection();
    await newOwnerIAM.rejectAssetOffer({
      assetDID
    });
    const assetContract = OfferableIdentityFactory.connect(assetAddress, provider);
    const owner = await assetContract.owner();
    const offeredTo = await assetContract.offeredTo();
    expect(owner).toBe(rootOwner.getAddress());
    expect(offeredTo).toBe(emptyAddress);
  });

  test("update asset did document", async () => {
    const assetAddress = await iam.registerAsset();
    const update = await iam.updateDidDocument({
      didAttribute: DIDAttribute.PublicKey,
      did: `did:ethr:${assetAddress}`,
      data: {type: PubKeyType.SignatureAuthentication2018, value: { publicKey: `0x${new Keys().publicKey}`, tag: 'key-1' }}
    });
    expect(update).toBeTruthy();
  });
};
