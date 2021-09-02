# Class: StakingPool

[staking](../modules/staking.md).StakingPool

Abstraction over staking pool smart contract

## Table of contents

### Constructors

- [constructor](staking.StakingPool.md#constructor)

### Methods

- [checkReward](staking.StakingPool.md#checkreward)
- [connect](staking.StakingPool.md#connect)
- [getStake](staking.StakingPool.md#getstake)
- [putStake](staking.StakingPool.md#putstake)
- [requestWithdraw](staking.StakingPool.md#requestwithdraw)
- [requestWithdrawDelay](staking.StakingPool.md#requestwithdrawdelay)
- [withdraw](staking.StakingPool.md#withdraw)
- [withdrawalDelay](staking.StakingPool.md#withdrawaldelay)

## Constructors

### constructor

• **new StakingPool**(`patron`, `address`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `patron` | `Required`<`Signer`\> |
| `address` | `string` |

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

### putStake

▸ **putStake**(`stake`, `transactionSpeed?`): `Promise`<`void`\>

**`description`** Locks stake and starts accumulating reward. If needed stake will be reduced to be able to pay fee

**`emits`** StakingPool.StakePut

#### Parameters

| Name | Type |
| :------ | :------ |
| `stake` | `number` \| `BigNumber` |
| `transactionSpeed` | [`TransactionSpeed`](../enums/staking.TransactionSpeed.md) |

#### Returns

`Promise`<`void`\>

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

### requestWithdrawDelay

▸ **requestWithdrawDelay**(): `Promise`<`number`\>

**`description`** Returns time left to enable request withdraw

#### Returns

`Promise`<`number`\>

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

___

### withdrawalDelay

▸ **withdrawalDelay**(): `Promise`<`number`\>

**`description`** Returns time left to enable withdraw

#### Returns

`Promise`<`number`\>
