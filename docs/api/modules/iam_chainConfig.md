# Module: iam/chainConfig

## Table of contents

### Interfaces

- [ChainConfig](../interfaces/iam_chainConfig.ChainConfig.md)
- [MessagingOptions](../interfaces/iam_chainConfig.MessagingOptions.md)

### Variables

- [cacheServerClientOptions](iam_chainConfig.md#cacheserverclientoptions)
- [chainConfigs](iam_chainConfig.md#chainconfigs)
- [messagingOptions](iam_chainConfig.md#messagingoptions)

### Functions

- [setCacheClientOptions](iam_chainConfig.md#setcacheclientoptions)
- [setChainConfig](iam_chainConfig.md#setchainconfig)
- [setMessagingOptions](iam_chainConfig.md#setmessagingoptions)

## Variables

### cacheServerClientOptions

• `Const` **cacheServerClientOptions**: `Record`<`number`, [`CacheServerClientOptions`](../interfaces/cacheServerClient_cacheServerClient.CacheServerClientOptions.md)\>

___

### chainConfigs

• `Const` **chainConfigs**: `Record`<`number`, [`ChainConfig`](../interfaces/iam_chainConfig.ChainConfig.md)\>

Set of parameters to configure connection to chain with id received from wallet.
If configuration for some chain is missing or should be reconfigured use `setChainConfig` before class instantiation

___

### messagingOptions

• `Const` **messagingOptions**: `Record`<`number`, [`MessagingOptions`](../interfaces/iam_chainConfig.MessagingOptions.md)\>

## Functions

### setCacheClientOptions

▸ `Const` **setCacheClientOptions**(`chainId`, `options`): `void`

Used to override existing cache server configuration or add a missing one
Configuration must be set before constructing `IAM`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | `number` |
| `options` | `Partial`<[`CacheServerClientOptions`](../interfaces/cacheServerClient_cacheServerClient.CacheServerClientOptions.md)\> |

#### Returns

`void`

___

### setChainConfig

▸ `Const` **setChainConfig**(`chainId`, `config`): `void`

Used to override existing chain configuration or add a missing one
Configuration must be set before constructing `IAM`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | `number` |
| `config` | `Partial`<[`ChainConfig`](../interfaces/iam_chainConfig.ChainConfig.md)\> |

#### Returns

`void`

___

### setMessagingOptions

▸ `Const` **setMessagingOptions**(`chainId`, `options`): `void`

Used to override existing messaging configuration or add a missing one
Configuration must be set before constructing `IAM`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | `number` |
| `options` | `Partial`<[`MessagingOptions`](../interfaces/iam_chainConfig.MessagingOptions.md)\> |

#### Returns

`void`
