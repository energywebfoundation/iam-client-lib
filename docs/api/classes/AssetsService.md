# Class: AssetsService

## Table of contents

### Constructors

- [constructor](AssetsService.md#constructor)

### Methods

- [acceptAssetOffer](AssetsService.md#acceptassetoffer)
- [cancelAssetOffer](AssetsService.md#cancelassetoffer)
- [getAssetById](AssetsService.md#getassetbyid)
- [getAssetHistory](AssetsService.md#getassethistory)
- [getOfferedAssets](AssetsService.md#getofferedassets)
- [getOwnedAssets](AssetsService.md#getownedassets)
- [getPreviouslyOwnedAssets](AssetsService.md#getpreviouslyownedassets)
- [init](AssetsService.md#init)
- [offerAsset](AssetsService.md#offerasset)
- [registerAsset](AssetsService.md#registerasset)
- [rejectAssetOffer](AssetsService.md#rejectassetoffer)
- [create](AssetsService.md#create)

## Constructors

### constructor

• **new AssetsService**(`_signerService`, `_cacheClient`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_signerService` | [`SignerService`](SignerService.md) |
| `_cacheClient` | [`CacheClient`](CacheClient.md) |

## Methods

### acceptAssetOffer

▸ **acceptAssetOffer**(`__namedParameters`): `Promise`<`void`\>

**`description`** Accept an offered Asset

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.assetDID` | `string` |

#### Returns

`Promise`<`void`\>

___

### cancelAssetOffer

▸ **cancelAssetOffer**(`__namedParameters`): `Promise`<`void`\>

**`description`** Cancel an Asset offer

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.assetDID` | `string` |

#### Returns

`Promise`<`void`\>

___

### getAssetById

▸ **getAssetById**(`id`): `Promise`<[`Asset`](../interfaces/Asset.md)\>

**`description`** Get Asset by Id

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `Object` | Asset Id |
| `id.id` | `string` | - |

#### Returns

`Promise`<[`Asset`](../interfaces/Asset.md)\>

Asset

___

### getAssetHistory

▸ **getAssetHistory**(`__namedParameters`): `Promise`<[`AssetHistory`](../interfaces/AssetHistory.md)[]\>

**`description`** Get history of a given Asset Id

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.id` | `string` |
| `__namedParameters.order?` | [`Order`](../enums/Order.md) |
| `__namedParameters.skip?` | `number` |
| `__namedParameters.take?` | `number` |
| `__namedParameters.type?` | [`AssetHistoryEventType`](../enums/AssetHistoryEventType.md) |

#### Returns

`Promise`<[`AssetHistory`](../interfaces/AssetHistory.md)[]\>

Asset[] || []

___

### getOfferedAssets

▸ **getOfferedAssets**(`__namedParameters?`): `Promise`<[`Asset`](../interfaces/Asset.md)[]\>

**`description`** Get all Assets offered to current User

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.did?` | `string` |

#### Returns

`Promise`<[`Asset`](../interfaces/Asset.md)[]\>

Asset[] || []

___

### getOwnedAssets

▸ **getOwnedAssets**(`__namedParameters?`): `Promise`<[`Asset`](../interfaces/Asset.md)[]\>

**`description`** Retrieve all owned assets for the User's DID

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.did?` | `string` |

#### Returns

`Promise`<[`Asset`](../interfaces/Asset.md)[]\>

___

### getPreviouslyOwnedAssets

▸ **getPreviouslyOwnedAssets**(`__namedParameters`): `Promise`<[`Asset`](../interfaces/Asset.md)[]\>

**`description`** Get previously owned asset for a given DID

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.owner` | `string` |

#### Returns

`Promise`<[`Asset`](../interfaces/Asset.md)[]\>

Asset[] || []

___

### init

▸ **init**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

___

### offerAsset

▸ **offerAsset**(`__namedParameters`): `Promise`<`void`\>

**`description`** Offer asset to a given address

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.assetDID` | `string` |
| `__namedParameters.offerTo` | `string` |

#### Returns

`Promise`<`void`\>

___

### registerAsset

▸ **registerAsset**(): `Promise`<`string`\>

**`description`** Registers a new Asset to the User

#### Returns

`Promise`<`string`\>

Asset DID

___

### rejectAssetOffer

▸ **rejectAssetOffer**(`__namedParameters`): `Promise`<`void`\>

**`description`** Reject an offered Asset

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.assetDID` | `string` |

#### Returns

`Promise`<`void`\>

___

### create

▸ `Static` **create**(`signerService`, `cacheClient`): `Promise`<[`AssetsService`](AssetsService.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerService` | [`SignerService`](SignerService.md) |
| `cacheClient` | [`CacheClient`](CacheClient.md) |

#### Returns

`Promise`<[`AssetsService`](AssetsService.md)\>
