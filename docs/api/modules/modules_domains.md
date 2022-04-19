# Module: modules/domains

## Table of contents

### Enumerations

- [NamespaceType](../enums/modules_domains.NamespaceType.md)

### Classes

- [DomainsService](../classes/modules_domains.DomainsService.md)

### Interfaces

- [IApp](../interfaces/modules_domains.IApp.md)
- [IOrganization](../interfaces/modules_domains.IOrganization.md)
- [IRole](../interfaces/modules_domains.IRole.md)

### Type aliases

- [MulticallTx](modules_domains.md#multicalltx)

### Variables

- [NODE\_FIELDS\_KEY](modules_domains.md#node_fields_key)

### Functions

- [castToV2](modules_domains.md#casttov2)

## Type aliases

### MulticallTx

Ƭ **MulticallTx**: { `info`: `string` ; `tx`: `EncodedCall` ; `next`: (`opts?`: { `retryCheck?`: `boolean`  }) => `Promise`<`undefined` \| `TransactionReceipt`\>  }[]

## Variables

### NODE\_FIELDS\_KEY

• `Const` **NODE\_FIELDS\_KEY**: ``"metadata"``

## Functions

### castToV2

▸ **castToV2**(`roleDef`): `IRoleDefinitionV2`

#### Parameters

| Name | Type |
| :------ | :------ |
| `roleDef` | `IRoleDefinition` \| `IRoleDefinitionV2` |

#### Returns

`IRoleDefinitionV2`
