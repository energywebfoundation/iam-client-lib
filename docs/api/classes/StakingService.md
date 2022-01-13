# Class: StakingService

Inteneded for staking pools management

## Table of contents

### Constructors

- [constructor](StakingService.md#constructor)

### Methods

- [allServices](StakingService.md#allservices)
- [getPool](StakingService.md#getpool)
- [init](StakingService.md#init)
- [launchPool](StakingService.md#launchpool)
- [create](StakingService.md#create)

## Constructors

### constructor

• **new StakingService**(`_signerService`, `_domainsService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_signerService` | [`SignerService`](SignerService.md) |
| `_domainsService` | [`DomainsService`](DomainsService.md) |

## Methods

### allServices

▸ **allServices**(): `Promise`<[`Service`](../modules.md#service)[]\>

**`description`** Returns all services for which pools are launched

#### Returns

`Promise`<[`Service`](../modules.md#service)[]\>

___

### getPool

▸ **getPool**(`org`): `Promise`<``null`` \| [`StakingPool`](StakingPool.md)\>

**`description`** Returns pool launched for `org` if any

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `org` | `string` | ENS name of organization |

#### Returns

`Promise`<``null`` \| [`StakingPool`](StakingPool.md)\>

___

### init

▸ **init**(): `Promise`<`void`\>

**`description`** Connects to the same chain as `signer`. The signer must be connected

#### Returns

`Promise`<`void`\>

___

### launchPool

▸ **launchPool**(`__namedParameters`): `Promise`<`void`\>

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

### create

▸ `Static` **create**(`signerService`, `domainsService`): `Promise`<[`StakingService`](StakingService.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerService` | [`SignerService`](SignerService.md) |
| `domainsService` | [`DomainsService`](DomainsService.md) |

#### Returns

`Promise`<[`StakingService`](StakingService.md)\>
