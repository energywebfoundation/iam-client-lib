# Module: staking

## Table of contents

### Enumerations

- [StakeStatus](../enums/staking.StakeStatus.md)
- [TransactionSpeed](../enums/staking.TransactionSpeed.md)

### Classes

- [StakingPool](../classes/staking.StakingPool.md)
- [StakingPoolService](../classes/staking.StakingPoolService.md)

### Type aliases

- [Service](staking.md#service)
- [Stake](staking.md#stake)

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
| `status` | [`StakeStatus`](../enums/staking.StakeStatus.md) |
