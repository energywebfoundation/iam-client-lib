# Module: modules/staking/staking.types

## Table of contents

### Enumerations

- [StakeStatus](../enums/modules_staking_staking_types.StakeStatus.md)

### Type aliases

- [Service](modules_staking_staking_types.md#service)
- [Stake](modules_staking_staking_types.md#stake)
- [StakingPoolProps](modules_staking_staking_types.md#stakingpoolprops)
- [StakingTerms](modules_staking_staking_types.md#stakingterms)

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
| `status` | [`StakeStatus`](../enums/modules_staking_staking_types.StakeStatus.md) |

___

### StakingPoolProps

Ƭ **StakingPoolProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `minStakingPeriod` | `BigNumber` |
| `patronRoles` | `IRoleDefinition`[``"roleName"``][] |
| `terms` | [`StakingTerms`](modules_staking_staking_types.md#stakingterms) |
| `withdrawDelay` | `BigNumber` |

___

### StakingTerms

Ƭ **StakingTerms**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `terms` | `string` |
| `version` | `number` |
