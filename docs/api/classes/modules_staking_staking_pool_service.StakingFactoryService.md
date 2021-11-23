# Class: StakingFactoryService

[modules/staking/staking-pool.service](../modules/modules_staking_staking_pool_service.md).StakingFactoryService

Intended for staking pool

## Table of contents

### Constructors

- [constructor](modules_staking_staking_pool_service.StakingFactoryService.md#constructor)

### Methods

- [allServices](modules_staking_staking_pool_service.StakingFactoryService.md#allservices)
- [getPool](modules_staking_staking_pool_service.StakingFactoryService.md#getpool)
- [create](modules_staking_staking_pool_service.StakingFactoryService.md#create)

## Constructors

### constructor

• **new StakingFactoryService**(`_signerService`, `_domainsService`)

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

▸ **getPool**(): `Promise`<[`StakingPoolService`](modules_staking_staking_pool_service.StakingPoolService.md)\>

**`description`** Returns pool launched for energyweb org

#### Returns

`Promise`<[`StakingPoolService`](modules_staking_staking_pool_service.StakingPoolService.md)\>

___

### create

▸ `Static` **create**(`signerService`, `domainsService`): `Promise`<[`StakingFactoryService`](modules_staking_staking_pool_service.StakingFactoryService.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerService` | [`SignerService`](modules_signer_signer_service.SignerService.md) |
| `domainsService` | [`DomainsService`](modules_domains_domains_service.DomainsService.md) |

#### Returns

`Promise`<[`StakingFactoryService`](modules_staking_staking_pool_service.StakingFactoryService.md)\>
