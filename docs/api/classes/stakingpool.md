**[iam-client-lib](../README.md)**

# Class: StakingPool

Abstraction over staking pool smart contract

## Hierarchy

* **StakingPool**

## Index

### Constructors

* [constructor](stakingpool.md#constructor)

### Methods

* [checkReward](stakingpool.md#checkreward)
* [connect](stakingpool.md#connect)
* [getStake](stakingpool.md#getstake)
* [putStake](stakingpool.md#putstake)
* [requestWithdraw](stakingpool.md#requestwithdraw)
* [requestWithdrawDelay](stakingpool.md#requestwithdrawdelay)
* [withdraw](stakingpool.md#withdraw)
* [withdrawalDelay](stakingpool.md#withdrawaldelay)

## Constructors

### constructor

\+ **new StakingPool**(`patron`: Required\<Signer>, `address`: string): [StakingPool](stakingpool.md)

#### Parameters:

Name | Type |
------ | ------ |
`patron` | Required\<Signer> |
`address` | string |

**Returns:** [StakingPool](stakingpool.md)

## Methods

### checkReward

▸ **checkReward**(): Promise\<BigNumber>

Accumulated reward

**Returns:** Promise\<BigNumber>

___

### connect

▸ **connect**(`signer`: Signer): [StakingPool](stakingpool.md)

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`signer` | Signer | Signer connected to provider  |

**Returns:** [StakingPool](stakingpool.md)

___

### getStake

▸ **getStake**(`patron?`: undefined \| string): Promise\<[Stake](../globals.md#stake)>

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`patron?` | undefined \| string | staker address |

**Returns:** Promise\<[Stake](../globals.md#stake)>

Stake

___

### putStake

▸ **putStake**(`stake`: BigNumber \| number): Promise\<void>

**`description`** Locks stake and starts accumulating reward

**`emits`** StakingPool.StakePut

#### Parameters:

Name | Type |
------ | ------ |
`stake` | BigNumber \| number |

**Returns:** Promise\<void>

___

### requestWithdraw

▸ **requestWithdraw**(): Promise\<void>

**`description`** Stops accumulating of the reward and prepars stake to withdraw after withdraw delay.
Withdraw request unavailable until minimum staking period ends

**Returns:** Promise\<void>

___

### requestWithdrawDelay

▸ **requestWithdrawDelay**(): Promise\<BigNumber>

**`description`** Returns time left to enable request withdraw

**Returns:** Promise\<BigNumber>

___

### withdraw

▸ **withdraw**(): Promise\<void>

**`description`** pays back stake with accumulated reward. Withdrawn unavailable until withdrawn delay ends

**`emits`** StakingPool.StakeWithdrawn

**Returns:** Promise\<void>

___

### withdrawalDelay

▸ **withdrawalDelay**(): Promise\<BigNumber>

**`description`** Returns time left to enable withdraw

**Returns:** Promise\<BigNumber>
