# Module: utils/change\_resolver

## Table of contents

### Interfaces

- [ChangeResolverParams](../interfaces/utils_change_resolver.ChangeResolverParams.md)

### Functions

- [changeResolver](utils_change_resolver.md#changeresolver)

## Functions

### changeResolver

▸ **changeResolver**(`__namedParameters`): `Promise`<`void`\>

**`description`** - Updates resolver on all subnodes of `parentNode`.
Script logic is not align with PublicResolver design, therefore it should not be used yet
Migration should consist from:
 - changing resolver
 - reading by DomainReader
 - creating new role or domain in PublicResolver with DomainTransactionFactory
Also this script should reside in iam-contract (until it is merged with iam-lib/did-reg)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`ChangeResolverParams`](../interfaces/utils_change_resolver.ChangeResolverParams.md) |

#### Returns

`Promise`<`void`\>
