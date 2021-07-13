**[iam-client-lib](../README.md)**

# Class: StakingPoolService

Inteneded for staking pools management

## Hierarchy

* **StakingPoolService**

## Index

### Methods

* [allServices](stakingpoolservice.md#allservices)
* [getPool](stakingpoolservice.md#getpool)
* [launchStakingPool](stakingpoolservice.md#launchstakingpool)
* [init](stakingpoolservice.md#init)

## Methods

### allServices

▸ **allServices**(): Promise\<[Service](../globals.md#service)[]>

**`description`** Returns all services for which pools are launched

**Returns:** Promise\<[Service](../globals.md#service)[]>

___

### getPool

▸ **getPool**(`org`: string): Promise\<[StakingPool](stakingpool.md) \| null>

**`description`** Returns pool launched for `org` if any

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`org` | string | ENS name of organization  |

**Returns:** Promise\<[StakingPool](stakingpool.md) \| null>

___

### launchStakingPool

▸ **launchStakingPool**(`__namedParameters`: { minStakingPeriod: number \| BigNumber ; org: string ; patronRewardPortion: number ; patronRoles: string[] ; principal: BigNumber  }): Promise\<void>

**`description`** Deployes organization staking pool

**`emits`** StakingPoolFactory.StakingPoolLaunched

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { minStakingPeriod: number \| BigNumber ; org: string ; patronRewardPortion: number ; patronRoles: string[] ; principal: BigNumber  } |

**Returns:** Promise\<void>

___

### init

▸ `Static`**init**(`signer`: Required\<Signer>): Promise\<[StakingPoolService](stakingpoolservice.md)>

**`description`** Connects to the same chain as `signer`

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`signer` | Required\<Signer> | Signer with connected provider  |

**Returns:** Promise\<[StakingPoolService](stakingpoolservice.md)>
