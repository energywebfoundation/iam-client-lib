# Class: StakingService

[modules/staking/staking.service](../modules/modules_staking_staking_service.md).StakingService

Inteneded for staking pools management

## Table of contents

### Constructors

- [constructor](modules_staking_staking_service.StakingService.md#constructor)

### Methods

- [allServices](modules_staking_staking_service.StakingService.md#allservices)
- [getPool](modules_staking_staking_service.StakingService.md#getpool)
- [init](modules_staking_staking_service.StakingService.md#init)
- [launchPool](modules_staking_staking_service.StakingService.md#launchpool)
- [create](modules_staking_staking_service.StakingService.md#create)

## Constructors

### constructor

• **new StakingService**(`_signerService`, `_domainsService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_signerService` | [`SignerService`](modules_signer_signer_service.SignerService.md) |
| `_domainsService` | [`DomainsService`](modules_domains_domains_service.DomainsService.md) |

## Methods

### allServices

▸ **allServices**(): `Promise`<[`Service`](../modules/modules_staking_staking_service.md#service)[]\>

**`description`** Returns all services for which pools are launched

#### Returns

`Promise`<[`Service`](../modules/modules_staking_staking_service.md#service)[]\>

___

### getPool

▸ **getPool**(`org`): `Promise`<``null`` \| [`StakingPool`](modules_staking_staking_service.StakingPool.md)\>

**`description`** Returns pool launched for `org` if any

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `org` | `string` | ENS name of organization |

#### Returns

`Promise`<``null`` \| [`StakingPool`](modules_staking_staking_service.StakingPool.md)\>

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

▸ `Static` **create**(`signerService`, `domainsService`): `Promise`<[`StakingService`](modules_staking_staking_service.StakingService.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerService` | [`SignerService`](modules_signer_signer_service.SignerService.md) |
| `domainsService` | [`DomainsService`](modules_domains_domains_service.DomainsService.md) |

#### Returns

`Promise`<[`StakingService`](modules_staking_staking_service.StakingService.md)\>
