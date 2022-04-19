# Module: modules/cacheClient

## Table of contents

### Enumerations

- [Order](../enums/modules_cacheClient.Order.md)
- [SearchType](../enums/modules_cacheClient.SearchType.md)

### Classes

- [CacheClient](../classes/modules_cacheClient.CacheClient.md)

### Interfaces

- [CacheServerClientOptions](../interfaces/modules_cacheClient.CacheServerClientOptions.md)
- [ICacheClient](../interfaces/modules_cacheClient.ICacheClient.md)

### Type aliases

- [AssetsFilter](modules_cacheClient.md#assetsfilter)
- [ClaimsFilter](modules_cacheClient.md#claimsfilter)

### Variables

- [TEST\_LOGIN\_ENDPOINT](modules_cacheClient.md#test_login_endpoint)

## Type aliases

### AssetsFilter

Ƭ **AssetsFilter**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `order?` | [`Order`](../enums/modules_cacheClient.Order.md) |
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
