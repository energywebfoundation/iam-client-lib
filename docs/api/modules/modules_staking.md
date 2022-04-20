# Module: modules/staking

## Table of contents

### Enumerations

- [StakeStatus](../enums/modules_staking.StakeStatus.md)

### Classes

- [StakingFactoryService](../classes/modules_staking.StakingFactoryService.md)
- [StakingPoolService](../classes/modules_staking.StakingPoolService.md)

### Type aliases

- [Service](modules_staking.md#service)
- [Stake](modules_staking.md#stake)

## Type aliases

### Service

Ƭ **Service**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `org` | `string` | organization ENS name |
| `pool` | `string` | pool address |
| `provider` | `string` | provider address |

___

### Stake

Ƭ **Stake**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | `BigNumber` |
| `depositEnd` | `BigNumber` |
| `depositStart` | `BigNumber` |
| `status` | [`StakeStatus`](../enums/modules_staking.StakeStatus.md) |
