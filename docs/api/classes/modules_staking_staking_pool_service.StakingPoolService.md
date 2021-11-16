# Class: StakingPoolService

[modules/staking/staking-pool.service](../modules/modules_staking_staking_pool_service.md).StakingPoolService

Abstraction over staking pool smart contract

## Table of contents

### Constructors

- [constructor](modules_staking_staking_pool_service.StakingPoolService.md#constructor)

### Methods

- [checkReward](modules_staking_staking_pool_service.StakingPoolService.md#checkreward)
- [getStake](modules_staking_staking_pool_service.StakingPoolService.md#getstake)
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

### getStake

▸ **getStake**(): `Promise`<[`Stake`](../modules/modules_staking_staking_service.md#stake)\>

#### Returns

`Promise`<[`Stake`](../modules/modules_staking_staking_service.md#stake)\>

Stake

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
