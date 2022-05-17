# Module: modules/cache-client

## Table of contents

### Enumerations

- [Order](../enums/modules_cache_client.Order.md)
- [SearchType](../enums/modules_cache_client.SearchType.md)

### Classes

- [CacheClient](../classes/modules_cache_client.CacheClient.md)

### Interfaces

- [AuthTokens](../interfaces/modules_cache_client.AuthTokens.md)
- [CacheServerClientOptions](../interfaces/modules_cache_client.CacheServerClientOptions.md)
- [ICacheClient](../interfaces/modules_cache_client.ICacheClient.md)

### Type aliases

- [AssetsFilter](modules_cache_client.md#assetsfilter)
- [ClaimsFilter](modules_cache_client.md#claimsfilter)

### Variables

- [TEST\_LOGIN\_ENDPOINT](modules_cache_client.md#test_login_endpoint)

## Type aliases

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

## Variables

### TEST\_LOGIN\_ENDPOINT

• `Const` **TEST\_LOGIN\_ENDPOINT**: ``"/auth/status"``
