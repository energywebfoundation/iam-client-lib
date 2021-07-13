**[iam-client-lib](../README.md)**

# Class: StakingPool

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
* [withdraw](stakingpool.md#withdraw)

## Constructors

### constructor

\+ **new StakingPool**(`pool`: StakingPoolContract): [StakingPool](stakingpool.md)

#### Parameters:

Name | Type |
------ | ------ |
`pool` | StakingPoolContract |

**Returns:** [StakingPool](stakingpool.md)

## Methods

### checkReward

▸ **checkReward**(): Promise\<BigNumber>

**Returns:** Promise\<BigNumber>

___

### connect

▸ **connect**(`signer`: Signer): [StakingPool](stakingpool.md)

#### Parameters:

Name | Type |
------ | ------ |
`signer` | Signer |

**Returns:** [StakingPool](stakingpool.md)

___

### getStake

▸ **getStake**(`patron?`: undefined \| string): Promise\<[Stake](../globals.md#stake)>

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`patron?` | undefined \| string |   |

**Returns:** Promise\<[Stake](../globals.md#stake)>

___

### putStake

▸ **putStake**(`stake`: BigNumber): Promise\<void>

**`description`** Locks stake and starts accumulating reward

**`emits`** StakingPool.StakePut

#### Parameters:

Name | Type |
------ | ------ |
`stake` | BigNumber |

**Returns:** Promise\<void>

___

### requestWithdraw

▸ **requestWithdraw**(): Promise\<void>

**`description`** Stops accumulating of the reward and prepars stake to withdraw after withdraw delay.
Withdraw request unavailable until minimum staking period ends

**Returns:** Promise\<void>

___

### withdraw

▸ **withdraw**(): Promise\<void>

**`description`** pays back stake with accumulated reward. Withdrawn unavailable until withdrawn delay ends

**`emits`** StakingPool.StakeWithdrawn

**Returns:** Promise\<void>
