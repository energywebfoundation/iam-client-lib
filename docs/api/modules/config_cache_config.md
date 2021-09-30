# Module: config/cache.config

## Table of contents

### Functions

- [cacheConfigs](config_cache_config.md#cacheconfigs)
- [setCacheConfig](config_cache_config.md#setcacheconfig)

## Functions

### cacheConfigs

▸ `Const` **cacheConfigs**(): `Object`

#### Returns

`Object`

___

### setCacheConfig

▸ `Const` **setCacheConfig**(`chainId`, `options`): `void`

Used to override existing cache server configuration or add a missing one
Configuration must be set before constructing `IAM`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | `number` |
| `options` | `Partial`<[`CacheServerClientOptions`](../interfaces/modules_cacheClient_cacheClient_types.CacheServerClientOptions.md)\> |

#### Returns

`void`
