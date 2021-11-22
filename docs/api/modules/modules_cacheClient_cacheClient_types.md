# Module: modules/cacheClient/cacheClient.types

## Table of contents

### Enumerations

- [Order](../enums/modules_cacheClient_cacheClient_types.Order.md)
- [SearchType](../enums/modules_cacheClient_cacheClient_types.SearchType.md)

### Interfaces

- [CacheServerClientOptions](../interfaces/modules_cacheClient_cacheClient_types.CacheServerClientOptions.md)

### Type aliases

- [AssetsFilter](modules_cacheClient_cacheClient_types.md#assetsfilter)
- [ClaimsFilter](modules_cacheClient_cacheClient_types.md#claimsfilter)

### Variables

- [TEST\_LOGIN\_ENDPOINT](modules_cacheClient_cacheClient_types.md#test_login_endpoint)

## Type aliases

### AssetsFilter

Ƭ **AssetsFilter**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `order?` | [`Order`](../enums/modules_cacheClient_cacheClient_types.Order.md) |
| `skip?` | `number` |
| `take?` | `number` |
| `type?` | [`AssetHistoryEventType`](../enums/modules_assets_assets_types.AssetHistoryEventType.md) |

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

• `Const` **TEST\_LOGIN\_ENDPOINT**: ``"/assets/owner/"``
