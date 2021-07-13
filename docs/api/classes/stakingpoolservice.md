**[iam-client-lib](../README.md)**

# Class: StakingPoolService

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

**Returns:** Promise\<[Service](../globals.md#service)[]>

___

### getPool

▸ **getPool**(`org`: string): Promise\<[StakingPool](stakingpool.md)>

#### Parameters:

Name | Type |
------ | ------ |
`org` | string |

**Returns:** Promise\<[StakingPool](stakingpool.md)>

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

#### Parameters:

Name | Type |
------ | ------ |
`signer` | Required\<Signer> |

**Returns:** Promise\<[StakingPoolService](stakingpoolservice.md)>
