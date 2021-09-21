# Class: StakingPoolService

[staking](../modules/staking.md).StakingPoolService

Inteneded for staking pools management

## Table of contents

### Methods

- [allServices](staking.StakingPoolService.md#allservices)
- [getPool](staking.StakingPoolService.md#getpool)
- [launchStakingPool](staking.StakingPoolService.md#launchstakingpool)
- [init](staking.StakingPoolService.md#init)

## Methods

### allServices

▸ **allServices**(): `Promise`<[`Service`](../modules/staking.md#service)[]\>

**`description`** Returns all services for which pools are launched

#### Returns

`Promise`<[`Service`](../modules/staking.md#service)[]\>

___

### getPool

▸ **getPool**(`org`): `Promise`<``null`` \| [`StakingPool`](staking.StakingPool.md)\>

**`description`** Returns pool launched for `org` if any

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `org` | `string` | ENS name of organization |

#### Returns

`Promise`<``null`` \| [`StakingPool`](staking.StakingPool.md)\>

___

### launchStakingPool

▸ **launchStakingPool**(`__namedParameters`): `Promise`<`void`\>

**`description`** Deployes organization staking pool

**`emits`** StakingPoolFactory.StakingPoolLaunched

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `__namedParameters` | `Object` | - |
| `__namedParameters.minStakingPeriod` | `number` \| `BigNumber` | minimum staking period in seconds |
| `__namedParameters.org` | `string` | organization ENS name |
| `__namedParameters.patronRewardPortion` | `number` | patron's part of the reward in fractions of thousandth |
| `__namedParameters.patronRoles` | `string`[] | roles required to stake |
| `__namedParameters.principal` | `BigNumber` | stake put by service provider when pool is launched |

#### Returns

`Promise`<`void`\>

___

### init

▸ `Static` **init**(`signer`): `Promise`<[`StakingPoolService`](staking.StakingPoolService.md)\>

**`description`** Connects to the same chain as `signer`. The signer must be connected

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `signer` | `Signer` | Signer with connected provider |

#### Returns

`Promise`<[`StakingPoolService`](staking.StakingPoolService.md)\>
