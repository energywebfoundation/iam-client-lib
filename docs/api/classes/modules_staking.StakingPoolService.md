# Class: StakingPoolService

[modules/staking](../modules/modules_staking.md).StakingPoolService

Abstraction over staking pool smart contract

## Table of contents

### Constructors

- [constructor](modules_staking.StakingPoolService.md#constructor)

### Methods

- [checkReward](modules_staking.StakingPoolService.md#checkreward)
- [getContributionLimit](modules_staking.StakingPoolService.md#getcontributionlimit)
- [getEnd](modules_staking.StakingPoolService.md#getend)
- [getHardCap](modules_staking.StakingPoolService.md#gethardcap)
- [getRatio](modules_staking.StakingPoolService.md#getratio)
- [getStake](modules_staking.StakingPoolService.md#getstake)
- [getStart](modules_staking.StakingPoolService.md#getstart)
- [getTotalStaked](modules_staking.StakingPoolService.md#gettotalstaked)
- [partialWithdraw](modules_staking.StakingPoolService.md#partialwithdraw)
- [putStake](modules_staking.StakingPoolService.md#putstake)
- [withdraw](modules_staking.StakingPoolService.md#withdraw)

## Constructors

### constructor

• **new StakingPoolService**(`signerService`, `address`): [`StakingPoolService`](modules_staking.StakingPoolService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerService` | [`SignerService`](modules_signer.SignerService.md) |
| `address` | `string` |

#### Returns

[`StakingPoolService`](modules_staking.StakingPoolService.md)

## Methods

### checkReward

▸ **checkReward**(): `Promise`\<`BigNumber`\>

Accumulated reward

#### Returns

`Promise`\<`BigNumber`\>

___

### getContributionLimit

▸ **getContributionLimit**(): `Promise`\<`BigNumber`\>

#### Returns

`Promise`\<`BigNumber`\>

___

### getEnd

▸ **getEnd**(): `Promise`\<`BigNumber`\>

#### Returns

`Promise`\<`BigNumber`\>

___

### getHardCap

▸ **getHardCap**(): `Promise`\<`BigNumber`\>

#### Returns

`Promise`\<`BigNumber`\>

___

### getRatio

▸ **getRatio**(): `Promise`\<`BigNumber`\>

#### Returns

`Promise`\<`BigNumber`\>

___

### getStake

▸ **getStake**(): `Promise`\<[`Stake`](../modules/modules_staking.md#stake)\>

#### Returns

`Promise`\<[`Stake`](../modules/modules_staking.md#stake)\>

Stake

___

### getStart

▸ **getStart**(): `Promise`\<`BigNumber`\>

#### Returns

`Promise`\<`BigNumber`\>

___

### getTotalStaked

▸ **getTotalStaked**(): `Promise`\<`BigNumber`\>

#### Returns

`Promise`\<`BigNumber`\>

___

### partialWithdraw

▸ **partialWithdraw**(`value`): `Promise`\<`ContractReceipt`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` \| `BigNumber` |

#### Returns

`Promise`\<`ContractReceipt`\>

**`Description`**

___

### putStake

▸ **putStake**(`stake`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `stake` | `number` \| `BigNumber` |

#### Returns

`Promise`\<`void`\>

**`Description`**

Locks stake and starts accumulating reward

**`Emits`**

StakingPool.StakePut

___

### withdraw

▸ **withdraw**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

**`Description`**

pays back stake with accumulated reward.
