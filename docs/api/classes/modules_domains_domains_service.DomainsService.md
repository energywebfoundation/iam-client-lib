# Class: DomainsService

[modules/domains/domains.service](../modules/modules_domains_domains_service.md).DomainsService

## Table of contents

### Constructors

- [constructor](modules_domains_domains_service.DomainsService.md#constructor)

### Methods

- [changeAppOwnership](modules_domains_domains_service.DomainsService.md#changeappownership)
- [changeOrgOwnership](modules_domains_domains_service.DomainsService.md#changeorgownership)
- [changeRoleOwnership](modules_domains_domains_service.DomainsService.md#changeroleownership)
- [checkExistenceOfDomain](modules_domains_domains_service.DomainsService.md#checkexistenceofdomain)
- [createApplication](modules_domains_domains_service.DomainsService.md#createapplication)
- [createOrganization](modules_domains_domains_service.DomainsService.md#createorganization)
- [createRole](modules_domains_domains_service.DomainsService.md#createrole)
- [deleteApplication](modules_domains_domains_service.DomainsService.md#deleteapplication)
- [deleteOrganization](modules_domains_domains_service.DomainsService.md#deleteorganization)
- [deleteRole](modules_domains_domains_service.DomainsService.md#deleterole)
- [getAllowedRolesByIssuer](modules_domains_domains_service.DomainsService.md#getallowedrolesbyissuer)
- [getAppsOfOrg](modules_domains_domains_service.DomainsService.md#getappsoforg)
- [getDIDsByRole](modules_domains_domains_service.DomainsService.md#getdidsbyrole)
- [getDefinition](modules_domains_domains_service.DomainsService.md#getdefinition)
- [getENSTypesByOwner](modules_domains_domains_service.DomainsService.md#getenstypesbyowner)
- [getENSTypesBySearchPhrase](modules_domains_domains_service.DomainsService.md#getenstypesbysearchphrase)
- [getOrgHierarchy](modules_domains_domains_service.DomainsService.md#getorghierarchy)
- [getRolesByNamespace](modules_domains_domains_service.DomainsService.md#getrolesbynamespace)
- [getSubOrgsByOrgNamespace](modules_domains_domains_service.DomainsService.md#getsuborgsbyorgnamespace)
- [getSubdomains](modules_domains_domains_service.DomainsService.md#getsubdomains)
- [init](modules_domains_domains_service.DomainsService.md#init)
- [isOwner](modules_domains_domains_service.DomainsService.md#isowner)
- [namespacesWithRelations](modules_domains_domains_service.DomainsService.md#namespaceswithrelations)
- [readName](modules_domains_domains_service.DomainsService.md#readname)
- [registrationTypesOfRoles](modules_domains_domains_service.DomainsService.md#registrationtypesofroles)
- [setRoleDefinition](modules_domains_domains_service.DomainsService.md#setroledefinition)
- [updateLegacyDefinition](modules_domains_domains_service.DomainsService.md#updatelegacydefinition)
- [validateOwnership](modules_domains_domains_service.DomainsService.md#validateownership)
- [create](modules_domains_domains_service.DomainsService.md#create)

## Constructors

### constructor

• **new DomainsService**(`_signerService`, `_cacheClient`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_signerService` | [`SignerService`](modules_signer_signer_service.SignerService.md) |
| `_cacheClient` | [`CacheClient`](modules_cacheClient_cacheClient_service.CacheClient.md) |

## Methods

### changeAppOwnership

▸ **changeAppOwnership**(`__namedParameters`): `Promise`<`undefined` \| { `info`: `string` ; `next`: (`__namedParameters`: { `retryCheck?`: `boolean`  }) => `Promise`<`undefined` \| `TransactionReceipt`\> ; `tx`: `EncodedCall`  }[]\>

changeAppOwnership

**`description`** change owner ship of app subdomain and all app owned subdomains

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.namespace` | `string` |
| `__namedParameters.newOwner` | `string` |
| `__namedParameters.returnSteps?` | `boolean` |

#### Returns

`Promise`<`undefined` \| { `info`: `string` ; `next`: (`__namedParameters`: { `retryCheck?`: `boolean`  }) => `Promise`<`undefined` \| `TransactionReceipt`\> ; `tx`: `EncodedCall`  }[]\>

return array of steps needed to change ownership

___

### changeOrgOwnership

▸ **changeOrgOwnership**(`__namedParameters`): `Promise`<`undefined` \| { `info`: `string` ; `next`: (`__namedParameters`: { `retryCheck?`: `boolean`  }) => `Promise`<`undefined` \| `TransactionReceipt`\> ; `tx`: `EncodedCall`  }[]\>

changeOrgOwnership

**`description`** change owner ship of org subdomain and all org owned roles subdomains

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.namespace` | `string` |
| `__namedParameters.newOwner` | `string` |
| `__namedParameters.returnSteps?` | `boolean` |
| `__namedParameters.withSubdomains?` | `boolean` |

#### Returns

`Promise`<`undefined` \| { `info`: `string` ; `next`: (`__namedParameters`: { `retryCheck?`: `boolean`  }) => `Promise`<`undefined` \| `TransactionReceipt`\> ; `tx`: `EncodedCall`  }[]\>

return array of steps needed to change ownership

___

### changeRoleOwnership

▸ **changeRoleOwnership**(`__namedParameters`): `Promise`<`void`\>

changeRoleOwnership

**`description`** change ownership of role subdomain

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.namespace` | `string` |
| `__namedParameters.newOwner` | `string` |

#### Returns

`Promise`<`void`\>

___

### checkExistenceOfDomain

▸ **checkExistenceOfDomain**(`__namedParameters`): `Promise`<`boolean`\>

checkExistenceOfDomain

**`description`** check existence of domain in ENS registry

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.domain` | `string` |

#### Returns

`Promise`<`boolean`\>

true or false whatever the domain is present

___

### createApplication

▸ **createApplication**(`__namedParameters`): `Promise`<`undefined` \| { `info`: `string` = "Set subdomain for application"; `next`: () => `Promise`<`void`\> ; `tx`: `EncodedCall`  }[]\>

createApp

**`description`** creates role (create subdomain, sets the domain name and sets the role definition to metadata record in ENS Domain)

**`description`** creates roles subdomain for the app namespace

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.appName` | `string` |
| `__namedParameters.data` | `IAppDefinition` |
| `__namedParameters.namespace` | `string` |
| `__namedParameters.returnSteps?` | `boolean` |

#### Returns

`Promise`<`undefined` \| { `info`: `string` = "Set subdomain for application"; `next`: () => `Promise`<`void`\> ; `tx`: `EncodedCall`  }[]\>

___

### createOrganization

▸ **createOrganization**(`__namedParameters`): `Promise`<`undefined` \| { `info`: `string` = "Create organization subdomain"; `next`: () => `Promise`<`void`\> ; `tx`: `EncodedCall`  }[]\>

createOrganization

**`description`** creates organization (create subdomain, sets the domain name and sets the role definition to metadata record in ENS Domain)

**`description`** and sets subdomain for roles and app for org namespace

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.data` | `IOrganizationDefinition` |
| `__namedParameters.namespace` | `string` |
| `__namedParameters.orgName` | `string` |
| `__namedParameters.returnSteps?` | `boolean` |

#### Returns

`Promise`<`undefined` \| { `info`: `string` = "Create organization subdomain"; `next`: () => `Promise`<`void`\> ; `tx`: `EncodedCall`  }[]\>

___

### createRole

▸ **createRole**(`__namedParameters`): `Promise`<`undefined` \| { `info`: `string` = "Create subdomain for role"; `next`: () => `Promise`<`void`\> ; `tx`: `EncodedCall`  }[]\>

createRole

**`description`** creates role (create subdomain, sets the domain name and sets the role definition to metadata record in ENS Domain)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.data` | `IRoleDefinition` |
| `__namedParameters.namespace` | `string` |
| `__namedParameters.returnSteps?` | `boolean` |
| `__namedParameters.roleName` | `string` |

#### Returns

`Promise`<`undefined` \| { `info`: `string` = "Create subdomain for role"; `next`: () => `Promise`<`void`\> ; `tx`: `EncodedCall`  }[]\>

information (true/false) if the role was created

___

### deleteApplication

▸ **deleteApplication**(`__namedParameters`): `Promise`<`undefined` \| { `info`: `string` ; `next`: (`__namedParameters`: { `retryCheck?`: `boolean`  }) => `Promise`<`undefined` \| `TransactionReceipt`\> ; `tx`: `EncodedCall`  }[]\>

deleteApplication

**`description`** delete application and roles

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.namespace` | `string` |
| `__namedParameters.returnSteps?` | `boolean` |

#### Returns

`Promise`<`undefined` \| { `info`: `string` ; `next`: (`__namedParameters`: { `retryCheck?`: `boolean`  }) => `Promise`<`undefined` \| `TransactionReceipt`\> ; `tx`: `EncodedCall`  }[]\>

___

### deleteOrganization

▸ **deleteOrganization**(`__namedParameters`): `Promise`<`undefined` \| { `info`: `string` ; `next`: (`__namedParameters`: { `retryCheck?`: `boolean`  }) => `Promise`<`undefined` \| `TransactionReceipt`\> ; `tx`: `EncodedCall`  }[]\>

deleteOrganization

**`description`** delete organization and roles

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.namespace` | `string` |
| `__namedParameters.returnSteps?` | `boolean` |

#### Returns

`Promise`<`undefined` \| { `info`: `string` ; `next`: (`__namedParameters`: { `retryCheck?`: `boolean`  }) => `Promise`<`undefined` \| `TransactionReceipt`\> ; `tx`: `EncodedCall`  }[]\>

___

### deleteRole

▸ **deleteRole**(`__namedParameters`): `Promise`<`void`\>

deleteRole

**`description`** delete role

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.namespace` | `string` |

#### Returns

`Promise`<`void`\>

___

### getAllowedRolesByIssuer

▸ **getAllowedRolesByIssuer**(`did`): `Promise`<`string`[]\>

getAllowedRolesByIssuer

**`description`** get all roles that a DID can issue, given its role credentials and all role definitions

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `did` | `string` | DID of issuer |

#### Returns

`Promise`<`string`[]\>

array of roles that the DID can issue

___

### getAppsOfOrg

▸ **getAppsOfOrg**(`org`): `Promise`<[`IApp`](../interfaces/modules_domains_domains_types.IApp.md)[]\>

getENSTypesByOwner

**`description`** get all applications for organization namespace

#### Parameters

| Name | Type |
| :------ | :------ |
| `org` | `string` |

#### Returns

`Promise`<[`IApp`](../interfaces/modules_domains_domains_types.IApp.md)[]\>

array of subdomains or empty array when there is no subdomains

___

### getDIDsByRole

▸ **getDIDsByRole**(`role`): `Promise`<`string`[]\>

getDIDsByRole

**`description`** get all users did which have certain role

#### Parameters

| Name | Type |
| :------ | :------ |
| `role` | `string` |

#### Returns

`Promise`<`string`[]\>

array of did's

___

### getDefinition

▸ **getDefinition**(`__namedParameters`): `Promise`<`IRoleDefinition` \| `IOrganizationDefinition` \| `IAppDefinition`\>

getRoleDefinition

**`description`** get role definition form ens domain metadata record

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.namespace` | `string` |
| `__namedParameters.type` | [`NamespaceType`](../enums/modules_domains_domains_types.NamespaceType.md) |

#### Returns

`Promise`<`IRoleDefinition` \| `IOrganizationDefinition` \| `IAppDefinition`\>

metadata string or empty string when there is no metadata

___

### getENSTypesByOwner

▸ **getENSTypesByOwner**(`__namedParameters`): `Promise`<[`IRole`](../interfaces/modules_domains_domains_types.IRole.md)[]\> \| `Promise`<[`IOrganization`](../interfaces/modules_domains_domains_types.IOrganization.md)[]\> \| `Promise`<[`IApp`](../interfaces/modules_domains_domains_types.IApp.md)[]\>

getENSTypesByOwner

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.owner` | `string` |
| `__namedParameters.type` | [`NamespaceType`](../enums/modules_domains_domains_types.NamespaceType.md) |
| `__namedParameters.withRelations?` | `boolean` |

#### Returns

`Promise`<[`IRole`](../interfaces/modules_domains_domains_types.IRole.md)[]\> \| `Promise`<[`IOrganization`](../interfaces/modules_domains_domains_types.IOrganization.md)[]\> \| `Promise`<[`IApp`](../interfaces/modules_domains_domains_types.IApp.md)[]\>

___

### getENSTypesBySearchPhrase

▸ **getENSTypesBySearchPhrase**(`search`, `types?`): `Promise`<([`IRole`](../interfaces/modules_domains_domains_types.IRole.md) \| [`IOrganization`](../interfaces/modules_domains_domains_types.IOrganization.md) \| [`IApp`](../interfaces/modules_domains_domains_types.IApp.md))[]\>

getENSTypesBySearchPhrase

#### Parameters

| Name | Type |
| :------ | :------ |
| `search` | `string` |
| `types?` | [`SearchType`](../enums/modules_cacheClient_cacheClient_types.SearchType.md)[] |

#### Returns

`Promise`<([`IRole`](../interfaces/modules_domains_domains_types.IRole.md) \| [`IOrganization`](../interfaces/modules_domains_domains_types.IOrganization.md) \| [`IApp`](../interfaces/modules_domains_domains_types.IApp.md))[]\>

___

### getOrgHierarchy

▸ **getOrgHierarchy**(`namespace`): `Promise`<[`IOrganization`](../interfaces/modules_domains_domains_types.IOrganization.md)\>

getOrgHierarchy

**`description`** get all hierarchy of an organization (20 levels deep)

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<[`IOrganization`](../interfaces/modules_domains_domains_types.IOrganization.md)\>

organization with all nested subOrgs

___

### getRolesByNamespace

▸ **getRolesByNamespace**(`__namedParameters`): `Promise`<[`IRole`](../interfaces/modules_domains_domains_types.IRole.md)[]\>

getRolesByNamespace

**`description`** get all subdomains for certain domain

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.namespace` | `string` |
| `__namedParameters.parentType` | [`Application`](../enums/modules_domains_domains_types.NamespaceType.md#application) \| [`Organization`](../enums/modules_domains_domains_types.NamespaceType.md#organization) |

#### Returns

`Promise`<[`IRole`](../interfaces/modules_domains_domains_types.IRole.md)[]\>

array of subdomains or empty array when there is no subdomains

___

### getSubOrgsByOrgNamespace

▸ **getSubOrgsByOrgNamespace**(`namespace`): `Promise`<[`IOrganization`](../interfaces/modules_domains_domains_types.IOrganization.md)[]\>

getSubOrgsByOrgNamespace

**`description`** get all sub organizations for organization namespace

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<[`IOrganization`](../interfaces/modules_domains_domains_types.IOrganization.md)[]\>

array of subdomains or empty array when there is no subdomains

___

### getSubdomains

▸ **getSubdomains**(`__namedParameters`): `Promise`<`string`[]\>

getSubdomains

**`description`** get all subdomains for certain domain

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.domain` | `string` |
| `__namedParameters.mode?` | ``"ALL"`` \| ``"FIRSTLEVEL"`` |

#### Returns

`Promise`<`string`[]\>

array of subdomains or empty array when there is no subdomains

___

### init

▸ **init**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

___

### isOwner

▸ **isOwner**(`__namedParameters`): `Promise`<`boolean`\>

isOwner

**`description`** check ownership of the domain

**`default`** if user is not specified it will check the current logged user

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.domain` | `string` |
| `__namedParameters.user?` | `string` |

#### Returns

`Promise`<`boolean`\>

true or false whatever the passed is user is a owner of domain

___

### namespacesWithRelations

▸ **namespacesWithRelations**(`namespaces`): `Promise`<{ `namespace`: `string` ; `owner`: `string`  }[]\>

**`description`** Collects all namespaces related data. Currently its includes only owner

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespaces` | `string`[] |

#### Returns

`Promise`<{ `namespace`: `string` ; `owner`: `string`  }[]\>

___

### readName

▸ **readName**(`namehash`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namehash` | `string` |

#### Returns

`Promise`<`string`\>

___

### registrationTypesOfRoles

▸ **registrationTypesOfRoles**(`roles`): `Promise`<`Record`<`string`, `Set`<[`RegistrationTypes`](../enums/modules_claims_claims_types.RegistrationTypes.md)\>\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `roles` | `string`[] |

#### Returns

`Promise`<`Record`<`string`, `Set`<[`RegistrationTypes`](../enums/modules_claims_claims_types.RegistrationTypes.md)\>\>\>

___

### setRoleDefinition

▸ **setRoleDefinition**(`__namedParameters`): `Promise`<`void`\>

setRoleDefinition

**`description`** sets role definition in ENS domain

**`description`** please use it only when you want to update role definitions for already created role (domain)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.data` | `IRoleDefinition` \| `IOrganizationDefinition` \| `IAppDefinition` |
| `__namedParameters.domain` | `string` |

#### Returns

`Promise`<`void`\>

___

### updateLegacyDefinition

▸ **updateLegacyDefinition**(`domain`, `data`): `Promise`<`boolean`\>

In initial version of Switchboard, role definitions where contained in ENS PublicResolver.
However, in order for key properties of role definitions to be readable on-chain, a new RoleDefinitionResolver is used.
This function sets the resolver in the ENS to the new contract for definitions that are pointing to the old contract

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `domain` | `string` | domain to potentially update |
| `data` | `IRoleDefinition` \| `IOrganizationDefinition` \| `IAppDefinition` | definition to apply to domain |

#### Returns

`Promise`<`boolean`\>

___

### validateOwnership

▸ **validateOwnership**(`__namedParameters`): `Promise`<`string`[]\>

validateOwnership

**`description`** check ownership of the domain and subdomains of org, app or role

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.namespace` | `string` |
| `__namedParameters.type` | [`NamespaceType`](../enums/modules_domains_domains_types.NamespaceType.md) |

#### Returns

`Promise`<`string`[]\>

true or false whatever the passed is user is a owner of org, app or role

___

### create

▸ `Static` **create**(`signerService`, `cacheClient`): `Promise`<[`DomainsService`](modules_domains_domains_service.DomainsService.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerService` | [`SignerService`](modules_signer_signer_service.SignerService.md) |
| `cacheClient` | [`CacheClient`](modules_cacheClient_cacheClient_service.CacheClient.md) |

#### Returns

`Promise`<[`DomainsService`](modules_domains_domains_service.DomainsService.md)\>
