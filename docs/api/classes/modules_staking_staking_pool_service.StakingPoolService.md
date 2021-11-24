# Class: StakingPoolService

[modules/staking/staking-pool.service](../modules/modules_staking_staking_pool_service.md).StakingPoolService

Abstraction over staking pool smart contract

## Table of contents

### Constructors

- [constructor](modules_staking_staking_pool_service.StakingPoolService.md#constructor)

### Methods

- [checkReward](modules_staking_staking_pool_service.StakingPoolService.md#checkreward)
- [getContributionLimit](modules_staking_staking_pool_service.StakingPoolService.md#getcontributionlimit)
- [getEnd](modules_staking_staking_pool_service.StakingPoolService.md#getend)
- [getHardCap](modules_staking_staking_pool_service.StakingPoolService.md#gethardcap)
- [getStake](modules_staking_staking_pool_service.StakingPoolService.md#getstake)
- [getStart](modules_staking_staking_pool_service.StakingPoolService.md#getstart)
- [partialWithdraw](modules_staking_staking_pool_service.StakingPoolService.md#partialwithdraw)
- [putStake](modules_staking_staking_pool_service.StakingPoolService.md#putstake)
- [withdraw](modules_staking_staking_pool_service.StakingPoolService.md#withdraw)

## Constructors

### constructor

• **new StakingPoolService**(`signerService`, `address`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerService` | [`SignerService`](modules_signer_signer_service.SignerService.md) |
| `address` | `string` |

## Methods

### checkReward

▸ **checkReward**(): `Promise`<`BigNumber`\>

Accumulated reward

#### Returns

`Promise`<`BigNumber`\>

___

### getContributionLimit

▸ **getContributionLimit**(): `Promise`<`BigNumber`\>

#### Returns

`Promise`<`BigNumber`\>

___

### getEnd

▸ **getEnd**(): `Promise`<`BigNumber`\>

#### Returns

`Promise`<`BigNumber`\>

___

### getHardCap

▸ **getHardCap**(): `Promise`<`BigNumber`\>

#### Returns

`Promise`<`BigNumber`\>

___

### getStake

▸ **getStake**(): `Promise`<[`Stake`](../modules/modules_staking_staking_service.md#stake)\>

#### Returns

`Promise`<[`Stake`](../modules/modules_staking_staking_service.md#stake)\>

Stake

___

### getStart

▸ **getStart**(): `Promise`<`BigNumber`\>

#### Returns

`Promise`<`BigNumber`\>

___

### partialWithdraw

▸ **partialWithdraw**(`value`): `Promise`<`void`\>

**`description`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` \| `BigNumber` |

#### Returns

`Promise`<`void`\>

___

### putStake

▸ **putStake**(`stake`): `Promise`<`void`\>

**`description`** Locks stake and starts accumulating reward

**`emits`** StakingPool.StakePut

#### Parameters

| Name | Type |
| :------ | :------ |
| `stake` | `number` \| `BigNumber` |

#### Returns

`Promise`<`void`\>

___

### withdraw

▸ **withdraw**(): `Promise`<`void`\>

**`description`** pays back stake with accumulated reward.

#### Returns

`Promise`<`void`\>
