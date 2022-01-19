# Class: StakingFactoryService

Intended for staking pool

## Table of contents

### Constructors

- [constructor](StakingFactoryService.md#constructor)

### Methods

- [allServices](StakingFactoryService.md#allservices)
- [getPool](StakingFactoryService.md#getpool)
- [create](StakingFactoryService.md#create)

## Constructors

### constructor

• **new StakingFactoryService**(`_signerService`, `_domainsService`)

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

▸ **getPool**(): `Promise`<[`StakingPoolService`](StakingPoolService.md)\>

**`description`** Returns pool launched for energyweb org

#### Returns

`Promise`<[`StakingPoolService`](StakingPoolService.md)\>

___

### create

▸ `Static` **create**(`signerService`, `domainsService`): `Promise`<[`StakingFactoryService`](StakingFactoryService.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerService` | [`SignerService`](SignerService.md) |
| `domainsService` | [`DomainsService`](DomainsService.md) |

#### Returns

`Promise`<[`StakingFactoryService`](StakingFactoryService.md)\>
