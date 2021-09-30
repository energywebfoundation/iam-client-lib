# Class: AssetsService

[modules/assets/assets.service](../modules/modules_assets_assets_service.md).AssetsService

## Table of contents

### Constructors

- [constructor](modules_assets_assets_service.AssetsService.md#constructor)

### Methods

- [acceptAssetOffer](modules_assets_assets_service.AssetsService.md#acceptassetoffer)
- [cancelAssetOffer](modules_assets_assets_service.AssetsService.md#cancelassetoffer)
- [getAssetById](modules_assets_assets_service.AssetsService.md#getassetbyid)
- [getAssetHistory](modules_assets_assets_service.AssetsService.md#getassethistory)
- [getOfferedAssets](modules_assets_assets_service.AssetsService.md#getofferedassets)
- [getOwnedAssets](modules_assets_assets_service.AssetsService.md#getownedassets)
- [getPreviouslyOwnedAssets](modules_assets_assets_service.AssetsService.md#getpreviouslyownedassets)
- [init](modules_assets_assets_service.AssetsService.md#init)
- [offerAsset](modules_assets_assets_service.AssetsService.md#offerasset)
- [registerAsset](modules_assets_assets_service.AssetsService.md#registerasset)
- [rejectAssetOffer](modules_assets_assets_service.AssetsService.md#rejectassetoffer)
- [create](modules_assets_assets_service.AssetsService.md#create)

## Constructors

### constructor

• **new AssetsService**(`_signerService`, `_cacheClient`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_signerService` | [`SignerService`](modules_signer_signer_service.SignerService.md) |
| `_cacheClient` | [`CacheClient`](modules_cacheClient_cacheClient_service.CacheClient.md) |

## Methods

### acceptAssetOffer

▸ **acceptAssetOffer**(`__namedParameters`): `Promise`<`void`\>

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

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.assetDID` | `string` |

#### Returns

`Promise`<`void`\>

___

### getAssetById

▸ **getAssetById**(`__namedParameters`): `Promise`<[`Asset`](../interfaces/modules_assets_assets_types.Asset.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.id` | `string` |

#### Returns

`Promise`<[`Asset`](../interfaces/modules_assets_assets_types.Asset.md)\>

___

### getAssetHistory

▸ **getAssetHistory**(`__namedParameters`): `Promise`<[`AssetHistory`](../interfaces/modules_assets_assets_types.AssetHistory.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.id` | `string` |
| `__namedParameters.order?` | [`Order`](../enums/modules_cacheClient_cacheClient_types.Order.md) |
| `__namedParameters.skip?` | `number` |
| `__namedParameters.take?` | `number` |
| `__namedParameters.type?` | [`AssetHistoryEventType`](../enums/modules_assets_assets_types.AssetHistoryEventType.md) |

#### Returns

`Promise`<[`AssetHistory`](../interfaces/modules_assets_assets_types.AssetHistory.md)[]\>

___

### getOfferedAssets

▸ **getOfferedAssets**(`__namedParameters?`): `Promise`<[`Asset`](../interfaces/modules_assets_assets_types.Asset.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.did?` | `string` |

#### Returns

`Promise`<[`Asset`](../interfaces/modules_assets_assets_types.Asset.md)[]\>

___

### getOwnedAssets

▸ **getOwnedAssets**(`__namedParameters?`): `Promise`<[`Asset`](../interfaces/modules_assets_assets_types.Asset.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.did?` | `string` |

#### Returns

`Promise`<[`Asset`](../interfaces/modules_assets_assets_types.Asset.md)[]\>

___

### getPreviouslyOwnedAssets

▸ **getPreviouslyOwnedAssets**(`__namedParameters`): `Promise`<[`Asset`](../interfaces/modules_assets_assets_types.Asset.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.owner` | `string` |

#### Returns

`Promise`<[`Asset`](../interfaces/modules_assets_assets_types.Asset.md)[]\>

___

### init

▸ **init**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

___

### offerAsset

▸ **offerAsset**(`__namedParameters`): `Promise`<`void`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `__namedParameters` | `Object` | - |
| `__namedParameters.assetDID` | `string` | - |
| `__namedParameters.offerTo` | `string` | recepient address |

#### Returns

`Promise`<`void`\>

___

### registerAsset

▸ **registerAsset**(): `Promise`<`string`\>

#### Returns

`Promise`<`string`\>

___

### rejectAssetOffer

▸ **rejectAssetOffer**(`__namedParameters`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.assetDID` | `string` |

#### Returns

`Promise`<`void`\>

___

### create

▸ `Static` **create**(`signerService`, `cacheClient`): `Promise`<[`AssetsService`](modules_assets_assets_service.AssetsService.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerService` | [`SignerService`](modules_signer_signer_service.SignerService.md) |
| `cacheClient` | [`CacheClient`](modules_cacheClient_cacheClient_service.CacheClient.md) |

#### Returns

`Promise`<[`AssetsService`](modules_assets_assets_service.AssetsService.md)\>
