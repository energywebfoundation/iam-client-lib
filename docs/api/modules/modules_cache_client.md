# Module: modules/cache-client

## Table of contents

### Enumerations

- [Order](../enums/modules_cache_client.Order.md)
- [SearchType](../enums/modules_cache_client.SearchType.md)

### Classes

- [CacheClient](../classes/modules_cache_client.CacheClient.md)

### Interfaces

- [CacheServerClientOptions](../interfaces/modules_cache_client.CacheServerClientOptions.md)
- [ICacheClient](../interfaces/modules_cache_client.ICacheClient.md)

### Type Aliases

- [AssetsFilter](modules_cache_client.md#assetsfilter)
- [ClaimsFilter](modules_cache_client.md#claimsfilter)

## Type Aliases

### AssetsFilter

Ƭ **AssetsFilter**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `order?` | [`Order`](../enums/modules_cache_client.Order.md) |
| `skip?` | `number` |
| `take?` | `number` |
| `type?` | [`AssetHistoryEventType`](../enums/modules_assets.AssetHistoryEventType.md) |

___

### ClaimsFilter

Ƭ **ClaimsFilter**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `isAccepted?` | `boolean` |
| `namespace?` | `string` |
