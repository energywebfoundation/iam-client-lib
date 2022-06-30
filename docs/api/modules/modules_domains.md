# Module: modules/domains

## Table of contents

### Enumerations

- [NamespaceType](../enums/modules_domains.NamespaceType.md)

### Classes

- [DomainsService](../classes/modules_domains.DomainsService.md)

### Interfaces

- [ChangeAppOwnershipOptions](../interfaces/modules_domains.ChangeAppOwnershipOptions.md)
- [ChangeOrgOwnershipOptions](../interfaces/modules_domains.ChangeOrgOwnershipOptions.md)
- [ChangeRoleOwnershipOptions](../interfaces/modules_domains.ChangeRoleOwnershipOptions.md)
- [CheckExistenceOfDomainOptions](../interfaces/modules_domains.CheckExistenceOfDomainOptions.md)
- [CreateApplicationOptions](../interfaces/modules_domains.CreateApplicationOptions.md)
- [CreateOrganizationOptions](../interfaces/modules_domains.CreateOrganizationOptions.md)
- [CreateRoleOptions](../interfaces/modules_domains.CreateRoleOptions.md)
- [DeleteApplicationOptions](../interfaces/modules_domains.DeleteApplicationOptions.md)
- [DeleteOrganizationOptions](../interfaces/modules_domains.DeleteOrganizationOptions.md)
- [DeleteRoleOptions](../interfaces/modules_domains.DeleteRoleOptions.md)
- [GetDefinitionOptions](../interfaces/modules_domains.GetDefinitionOptions.md)
- [GetENSTypesByOwnerOptions](../interfaces/modules_domains.GetENSTypesByOwnerOptions.md)
- [GetRolesByNamespaceOptions](../interfaces/modules_domains.GetRolesByNamespaceOptions.md)
- [GetSubdomainsOptions](../interfaces/modules_domains.GetSubdomainsOptions.md)
- [IApp](../interfaces/modules_domains.IApp.md)
- [IOrganization](../interfaces/modules_domains.IOrganization.md)
- [IRole](../interfaces/modules_domains.IRole.md)
- [IsOwnerOptions](../interfaces/modules_domains.IsOwnerOptions.md)
- [ReturnStep](../interfaces/modules_domains.ReturnStep.md)
- [ReturnStepWithRetryCheck](../interfaces/modules_domains.ReturnStepWithRetryCheck.md)
- [SetRoleDefinitionOptions](../interfaces/modules_domains.SetRoleDefinitionOptions.md)
- [ValidateOwnershipOptions](../interfaces/modules_domains.ValidateOwnershipOptions.md)

### Type aliases

- [DomainDefinition](modules_domains.md#domaindefinition)
- [MulticallTx](modules_domains.md#multicalltx)

### Variables

- [NODE\_FIELDS\_KEY](modules_domains.md#node_fields_key)

### Functions

- [castToV2](modules_domains.md#casttov2)

## Type aliases

### DomainDefinition

Ƭ **DomainDefinition**: `IAppDefinition` \| `IOrganizationDefinition` \| `IRoleDefinition` \| `IRoleDefinitionV2`

___

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
