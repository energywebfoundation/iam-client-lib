# Class: CachedIssuerResolver

[modules/claims](../modules/modules_claims.md).CachedIssuerResolver

## Implements

- `IssuerResolver`

## Table of contents

### Constructors

- [constructor](modules_claims.CachedIssuerResolver.md#constructor)

### Methods

- [getIssuerDefinition](modules_claims.CachedIssuerResolver.md#getissuerdefinition)

## Constructors

### constructor

• **new CachedIssuerResolver**(`domainsService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `domainsService` | [`DomainsService`](modules_domains.DomainsService.md) |

## Methods

### getIssuerDefinition

▸ **getIssuerDefinition**(`namespace`): `Promise`<`IIssuerDefinition`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<`IIssuerDefinition`\>

#### Implementation of

IssuerResolver.getIssuerDefinition
