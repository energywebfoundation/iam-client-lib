# Module: modules/staking/staking.service

## Table of contents

### Enumerations

- [StakeStatus](../enums/modules_staking_staking_service.StakeStatus.md)

### Classes

- [StakingPool](../classes/modules_staking_staking_service.StakingPool.md)
- [StakingService](../classes/modules_staking_staking_service.StakingService.md)

### Type aliases

- [Service](modules_staking_staking_service.md#service)
- [Stake](modules_staking_staking_service.md#stake)

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
| `status` | [`StakeStatus`](../enums/modules_staking_staking_service.StakeStatus.md) |
