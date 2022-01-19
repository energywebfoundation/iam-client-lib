# Class: StakingPool

Abstraction over staking pool smart contract

## Table of contents

### Constructors

- [constructor](StakingPool.md#constructor)

### Methods

- [checkReward](StakingPool.md#checkreward)
- [getStake](StakingPool.md#getstake)
- [putStake](StakingPool.md#putstake)
- [requestWithdraw](StakingPool.md#requestwithdraw)
- [requestWithdrawDelay](StakingPool.md#requestwithdrawdelay)
- [withdraw](StakingPool.md#withdraw)
- [withdrawalDelay](StakingPool.md#withdrawaldelay)

## Constructors

### constructor

• **new StakingPool**(`signerService`, `address`)

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

### getStake

▸ **getStake**(`patron?`): `Promise`<[`Stake`](../modules.md#stake)\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `patron?` | `string` | staker address |

#### Returns

`Promise`<[`Stake`](../modules.md#stake)\>

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

### requestWithdraw

▸ **requestWithdraw**(): `Promise`<`void`\>

**`description`** Stops accumulating of the reward and prepars stake to withdraw after withdraw delay.
Withdraw request unavailable until minimum staking period ends

#### Returns

`Promise`<`void`\>

___

### requestWithdrawDelay

▸ **requestWithdrawDelay**(): `Promise`<`number`\>

**`description`** Returns time left to enable request withdraw

#### Returns

`Promise`<`number`\>

___

### withdraw

▸ **withdraw**(): `Promise`<`void`\>

**`description`** pays back stake with accumulated reward. Withdrawn unavailable until withdrawn delay ends

**`emits`** StakingPool.StakeWithdrawn

#### Returns

`Promise`<`void`\>

___

### withdrawalDelay

▸ **withdrawalDelay**(): `Promise`<`number`\>

**`description`** Returns time left to enable withdraw

#### Returns

`Promise`<`number`\>
