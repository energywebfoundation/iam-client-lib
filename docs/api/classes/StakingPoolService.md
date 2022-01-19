# Class: StakingPoolService

Abstraction over staking pool smart contract

## Table of contents

### Constructors

- [constructor](StakingPoolService.md#constructor)

### Methods

- [checkReward](StakingPoolService.md#checkreward)
- [getContributionLimit](StakingPoolService.md#getcontributionlimit)
- [getEnd](StakingPoolService.md#getend)
- [getHardCap](StakingPoolService.md#gethardcap)
- [getRatio](StakingPoolService.md#getratio)
- [getStake](StakingPoolService.md#getstake)
- [getStart](StakingPoolService.md#getstart)
- [getTotalStaked](StakingPoolService.md#gettotalstaked)
- [partialWithdraw](StakingPoolService.md#partialwithdraw)
- [putStake](StakingPoolService.md#putstake)
- [withdraw](StakingPoolService.md#withdraw)

## Constructors

### constructor

• **new StakingPoolService**(`signerService`, `address`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerService` | [`SignerService`](SignerService.md) |
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

### getRatio

▸ **getRatio**(): `Promise`<`BigNumber`\>

#### Returns

`Promise`<`BigNumber`\>

___

### getStake

▸ **getStake**(): `Promise`<[`Stake`](../modules.md#stake)\>

#### Returns

`Promise`<[`Stake`](../modules.md#stake)\>

Stake

___

### getStart

▸ **getStart**(): `Promise`<`BigNumber`\>

#### Returns

`Promise`<`BigNumber`\>

___

### getTotalStaked

▸ **getTotalStaked**(): `Promise`<`BigNumber`\>

#### Returns

`Promise`<`BigNumber`\>

___

### partialWithdraw

▸ **partialWithdraw**(`value`): `Promise`<`ContractReceipt`\>

**`description`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` \| `BigNumber` |

#### Returns

`Promise`<`ContractReceipt`\>

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
