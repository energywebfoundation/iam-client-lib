# Class: StakingPool

[staking](../modules/staking.md).StakingPool

Abstraction over staking pool smart contract

## Table of contents

### Constructors

- [constructor](staking.StakingPool.md#constructor)

### Properties

- [minStakingPeriod](staking.StakingPool.md#minstakingperiod)
- [patronRewardPortion](staking.StakingPool.md#patronrewardportion)
- [patronRoles](staking.StakingPool.md#patronroles)
- [principal](staking.StakingPool.md#principal)
- [totalStake](staking.StakingPool.md#totalstake)
- [withdrawDelay](staking.StakingPool.md#withdrawdelay)

### Methods

- [checkReward](staking.StakingPool.md#checkreward)
- [connect](staking.StakingPool.md#connect)
- [getStake](staking.StakingPool.md#getstake)
- [init](staking.StakingPool.md#init)
- [putStake](staking.StakingPool.md#putstake)
- [remainingRequestWithdrawDelay](staking.StakingPool.md#remainingrequestwithdrawdelay)
- [remainingWithdrawDelay](staking.StakingPool.md#remainingwithdrawdelay)
- [requestWithdraw](staking.StakingPool.md#requestwithdraw)
- [withdraw](staking.StakingPool.md#withdraw)

## Constructors

### constructor

• **new StakingPool**(`patron`, `address`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `patron` | `Required`<`Signer`\> |
| `address` | `string` |

## Properties

### minStakingPeriod

• **minStakingPeriod**: `number`

___

### patronRewardPortion

• **patronRewardPortion**: `number`

___

### patronRoles

• **patronRoles**: `string`[]

___

### principal

• **principal**: `BigNumber`

___

### totalStake

• **totalStake**: `BigNumber`

___

### withdrawDelay

• **withdrawDelay**: `number`

## Methods

### checkReward

▸ **checkReward**(): `Promise`<`BigNumber`\>

Accumulated reward

#### Returns

`Promise`<`BigNumber`\>

___

### connect

▸ **connect**(`signer`): [`StakingPool`](staking.StakingPool.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `signer` | `Signer` | Signer connected to provider |

#### Returns

[`StakingPool`](staking.StakingPool.md)

___

### getStake

▸ **getStake**(`patron?`): `Promise`<[`Stake`](../modules/staking.md#stake)\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `patron?` | `string` | staker address |

#### Returns

`Promise`<[`Stake`](../modules/staking.md#stake)\>

Stake

___

### init

▸ **init**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

___

### putStake

▸ **putStake**(`stake`, `transactionSpeed?`): `Promise`<`void`\>

**`description`** Locks stake and starts accumulating reward

**`emits`** StakingPool.StakePut

#### Parameters

| Name | Type |
| :------ | :------ |
| `stake` | `number` \| `BigNumber` |
| `transactionSpeed` | [`TransactionSpeed`](../enums/staking.TransactionSpeed.md) |

#### Returns

`Promise`<`void`\>

___

### remainingRequestWithdrawDelay

▸ **remainingRequestWithdrawDelay**(): `Promise`<`number`\>

**`description`** Returns time left to enable request withdraw

#### Returns

`Promise`<`number`\>

___

### remainingWithdrawDelay

▸ **remainingWithdrawDelay**(): `Promise`<`number`\>

**`description`** Returns time left to enable withdraw

#### Returns

`Promise`<`number`\>

___

### requestWithdraw

▸ **requestWithdraw**(`transactionSpeed?`): `Promise`<`void`\>

**`description`** Stops accumulating of the reward and prepars stake to withdraw after withdraw delay.
Withdraw request unavailable until minimum staking period ends

#### Parameters

| Name | Type |
| :------ | :------ |
| `transactionSpeed` | [`TransactionSpeed`](../enums/staking.TransactionSpeed.md) |

#### Returns

`Promise`<`void`\>

___

### withdraw

▸ **withdraw**(`transactionSpeed?`): `Promise`<`void`\>

**`description`** pays back stake with accumulated reward. Withdrawn unavailable until withdrawn delay ends

**`emits`** StakingPool.StakeWithdrawn

#### Parameters

| Name | Type |
| :------ | :------ |
| `transactionSpeed` | [`TransactionSpeed`](../enums/staking.TransactionSpeed.md) |

#### Returns

`Promise`<`void`\>
