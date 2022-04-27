# Class: AssetsService

[modules/assets](../modules/modules_assets.md).AssetsService

Service responsible for handling the asset creation and management.
See more information about assets in IAM stack [here](../../../docs/guides/asset.md).

```typescript
const { connectToCacheServer } = await initWithPrivateKeySigner(privateKey, rpcUrl);
const { assetsService } = await connectToCacheServer();
assetsService.registerAsset();
```

## Table of contents

### Constructors

- [constructor](modules_assets.AssetsService.md#constructor)

### Methods

- [acceptAssetOffer](modules_assets.AssetsService.md#acceptassetoffer)
- [cancelAssetOffer](modules_assets.AssetsService.md#cancelassetoffer)
- [getAssetById](modules_assets.AssetsService.md#getassetbyid)
- [getAssetHistory](modules_assets.AssetsService.md#getassethistory)
- [getAssetOwner](modules_assets.AssetsService.md#getassetowner)
- [getOfferedAssets](modules_assets.AssetsService.md#getofferedassets)
- [getOwnedAssets](modules_assets.AssetsService.md#getownedassets)
- [getPreviouslyOwnedAssets](modules_assets.AssetsService.md#getpreviouslyownedassets)
- [init](modules_assets.AssetsService.md#init)
- [offerAsset](modules_assets.AssetsService.md#offerasset)
- [registerAsset](modules_assets.AssetsService.md#registerasset)
- [rejectAssetOffer](modules_assets.AssetsService.md#rejectassetoffer)
- [create](modules_assets.AssetsService.md#create)

## Constructors

### constructor

• **new AssetsService**(`_signerService`, `_cacheClient`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_signerService` | [`SignerService`](modules_signer.SignerService.md) |
| `_cacheClient` | [`CacheClient`](modules_cache_client.CacheClient.md) |

## Methods

### acceptAssetOffer

▸ **acceptAssetOffer**(`options`): `Promise`<`void`\>

Accept an offered asset.

```typescript
assetsService.acceptAssetOffer({
    assetDID: 'did:ethr:volta:0x000...1',
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`AcceptAssetOfferOptions`](../interfaces/modules_assets.AcceptAssetOfferOptions.md) | object containing options |

#### Returns

`Promise`<`void`\>

___

### cancelAssetOffer

▸ **cancelAssetOffer**(`options`): `Promise`<`void`\>

Cancel an asset offer.

```typescript
assetsService.cancelAssetOffer({
    assetDID: 'did:ethr:volta:0x000...1',
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`CancelAssetOfferOptions`](../interfaces/modules_assets.CancelAssetOfferOptions.md) | object containing options |

#### Returns

`Promise`<`void`\>

___

### getAssetById

▸ **getAssetById**(`options`): `Promise`<[`Asset`](../interfaces/modules_assets.Asset.md)\>

Retrieve asset by id.

```typescript
assetsService.getAssetById({
    id: 'did:ethr:volta:0x000...1',
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`GetAssetByIdOptions`](../interfaces/modules_assets.GetAssetByIdOptions.md) | object containing options |

#### Returns

`Promise`<[`Asset`](../interfaces/modules_assets.Asset.md)\>

asset

___

### getAssetHistory

▸ **getAssetHistory**(`options`): `Promise`<[`AssetHistory`](../interfaces/modules_assets.AssetHistory.md)[]\>

Retrieve history of a given asset DID

```typescript
assetsService.getAssetHistory({
    id: 'did:ethr:volta:0x000...1',
    order: Order.ASC,
    take: 5,
    skip: 0,
    type: AssetHistoryEventType.ASSET_OFFERED,
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`GetAssetHistoryOptions`](../interfaces/modules_assets.GetAssetHistoryOptions.md) | object containing options |

#### Returns

`Promise`<[`AssetHistory`](../interfaces/modules_assets.AssetHistory.md)[]\>

asset history

___

### getAssetOwner

▸ **getAssetOwner**(`id`): `Promise`<`string`\>

Retrieve DID of the asset owner of the given asset DID.

```typescript
assetsService.getAssetOwner('did:ethr:volta:0x000...1');
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | DID of the asset |

#### Returns

`Promise`<`string`\>

asset owner DID

___

### getOfferedAssets

▸ **getOfferedAssets**(`options`): `Promise`<[`Asset`](../interfaces/modules_assets.Asset.md)[]\>

Retrieve assets offered to the given user.

```typescript
assetsService.getOfferedAssets({
    did: 'did:ethr:volta:0x000...1',
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`GetOfferedAssetsOptions`](../interfaces/modules_assets.GetOfferedAssetsOptions.md) | object containing options |

#### Returns

`Promise`<[`Asset`](../interfaces/modules_assets.Asset.md)[]\>

offered assets

___

### getOwnedAssets

▸ **getOwnedAssets**(`options?`): `Promise`<[`Asset`](../interfaces/modules_assets.Asset.md)[]\>

Retrieve owned assets of the given user.

```typescript
assetsService.getOwnedAssets({
    did: 'did:ethr:volta:0x000...1',
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`GetOwnedAssetsOptions`](../interfaces/modules_assets.GetOwnedAssetsOptions.md) | object containing options |

#### Returns

`Promise`<[`Asset`](../interfaces/modules_assets.Asset.md)[]\>

owned assets

___

### getPreviouslyOwnedAssets

▸ **getPreviouslyOwnedAssets**(`options`): `Promise`<[`Asset`](../interfaces/modules_assets.Asset.md)[]\>

Retrieve previously owned assets of the given user.

```typescript
assetsService.getPreviouslyOwnedAssets({
    owner: 'did:ethr:volta:0x000...1',
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`GetPreviouslyOwnedAssetsOptions`](../interfaces/modules_assets.GetPreviouslyOwnedAssetsOptions.md) | object containing options |

#### Returns

`Promise`<[`Asset`](../interfaces/modules_assets.Asset.md)[]\>

previously owned assets

___

### init

▸ **init**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

___

### offerAsset

▸ **offerAsset**(`options`): `Promise`<`void`\>

Send an asset offer transfer to a given address

```typescript
assetsService.offerAsset({
    assetDID: 'did:ethr:volta:0x000...1',
    offerTo: '0x000...2',
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`OfferAssetOptions`](../interfaces/modules_assets.OfferAssetOptions.md) | object containing options |

#### Returns

`Promise`<`void`\>

___

### registerAsset

▸ **registerAsset**(): `Promise`<`string`\>

Register a new asset to the user.

```typescript
assetsService.registerAsset();
```

#### Returns

`Promise`<`string`\>

asset address

___

### rejectAssetOffer

▸ **rejectAssetOffer**(`options`): `Promise`<`void`\>

Reject an offered asset.

```typescript
assetsService.rejectAssetOffer({
    assetDID: 'did:ethr:volta:0x000...1',
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`RejectAssetOfferOptions`](../interfaces/modules_assets.RejectAssetOfferOptions.md) | object containing options |

#### Returns

`Promise`<`void`\>

___

### create

▸ `Static` **create**(`signerService`, `cacheClient`): `Promise`<[`AssetsService`](modules_assets.AssetsService.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerService` | [`SignerService`](modules_signer.SignerService.md) |
| `cacheClient` | [`CacheClient`](modules_cache_client.CacheClient.md) |

#### Returns

`Promise`<[`AssetsService`](modules_assets.AssetsService.md)\>
