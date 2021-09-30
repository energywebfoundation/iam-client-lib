# Module: config/chain.config

## Table of contents

### Interfaces

- [ChainConfig](../interfaces/config_chain_config.ChainConfig.md)

### Type aliases

- [ChainId](config_chain_config.md#chainid)

### Functions

- [chainConfigs](config_chain_config.md#chainconfigs)
- [setChainConfig](config_chain_config.md#setchainconfig)

## Type aliases

### ChainId

Ƭ **ChainId**: `number`

## Functions

### chainConfigs

▸ `Const` **chainConfigs**(): `Object`

#### Returns

`Object`

___

### setChainConfig

▸ `Const` **setChainConfig**(`chainId`, `config`): `void`

Used to override existing chain configuration or add a missing one
Configuration must be set before constructing `IAM`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | `number` |
| `config` | `Partial`<[`ChainConfig`](../interfaces/config_chain_config.ChainConfig.md)\> |

#### Returns

`void`
