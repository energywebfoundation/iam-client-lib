# Class: DomainsService

[modules/domains](../modules/modules_domains.md).DomainsService

Service responsible for handling the request to ENS, creating roles/organizations/applications namespaces.
See more information about ENS and domains in IAM stack [here](https://energy-web-foundation.gitbook.io/energy-web/how-tos-and-tutorials/using-the-ethereum-name-service-ens).

```typescript
const { connectToCacheServer } = await initWithPrivateKeySigner(privateKey, rpcUrl);
const { domainsService } = await connectToCacheServer();
domainsService.createOrganization(...);
```

## Table of contents

### Constructors

- [constructor](modules_domains.DomainsService.md#constructor)

### Methods

- [changeAppOwnership](modules_domains.DomainsService.md#changeappownership)
- [changeOrgOwnership](modules_domains.DomainsService.md#changeorgownership)
- [changeRoleOwnership](modules_domains.DomainsService.md#changeroleownership)
- [checkExistenceOfDomain](modules_domains.DomainsService.md#checkexistenceofdomain)
- [createApplication](modules_domains.DomainsService.md#createapplication)
- [createOrganization](modules_domains.DomainsService.md#createorganization)
- [createRole](modules_domains.DomainsService.md#createrole)
- [deleteApplication](modules_domains.DomainsService.md#deleteapplication)
- [deleteOrganization](modules_domains.DomainsService.md#deleteorganization)
- [deleteRole](modules_domains.DomainsService.md#deleterole)
- [getAllowedRolesByIssuer](modules_domains.DomainsService.md#getallowedrolesbyissuer)
- [getAppsOfOrg](modules_domains.DomainsService.md#getappsoforg)
- [getDIDsByRole](modules_domains.DomainsService.md#getdidsbyrole)
- [getDefinition](modules_domains.DomainsService.md#getdefinition)
- [getENSTypesByOwner](modules_domains.DomainsService.md#getenstypesbyowner)
- [getENSTypesBySearchPhrase](modules_domains.DomainsService.md#getenstypesbysearchphrase)
- [getOrgHierarchy](modules_domains.DomainsService.md#getorghierarchy)
- [getRolesByNamespace](modules_domains.DomainsService.md#getrolesbynamespace)
- [getSubOrgsByOrgNamespace](modules_domains.DomainsService.md#getsuborgsbyorgnamespace)
- [getSubdomains](modules_domains.DomainsService.md#getsubdomains)
- [init](modules_domains.DomainsService.md#init)
- [isOwner](modules_domains.DomainsService.md#isowner)
- [namespacesWithRelations](modules_domains.DomainsService.md#namespaceswithrelations)
- [readName](modules_domains.DomainsService.md#readname)
- [registrationTypesOfRoles](modules_domains.DomainsService.md#registrationtypesofroles)
- [setRoleDefinition](modules_domains.DomainsService.md#setroledefinition)
- [updateLegacyDefinition](modules_domains.DomainsService.md#updatelegacydefinition)
- [validateOwnership](modules_domains.DomainsService.md#validateownership)
- [create](modules_domains.DomainsService.md#create)

## Constructors

### constructor

• **new DomainsService**(`_signerService`, `_cacheClient`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_signerService` | [`SignerService`](modules_signer.SignerService.md) |
| `_cacheClient` | [`CacheClient`](modules_cache_client.CacheClient.md) |

## Methods

### changeAppOwnership

▸ **changeAppOwnership**(`options`): `Promise`<`undefined` \| [`ReturnStepWithRetryCheck`](../interfaces/modules_domains.ReturnStepWithRetryCheck.md)[]\>

Change owner of application domain.

```typescript
domainsService.changeAppOwnership({
    namespace: 'auth.apps.energyweb.iam.ewc',
    newOwner: '0x00...0',
    returnSteps: true,
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`ChangeAppOwnershipOptions`](../interfaces/modules_domains.ChangeAppOwnershipOptions.md) | object containing options |

#### Returns

`Promise`<`undefined` \| [`ReturnStepWithRetryCheck`](../interfaces/modules_domains.ReturnStepWithRetryCheck.md)[]\>

array of steps if `returnSteps` is true

___

### changeOrgOwnership

▸ **changeOrgOwnership**(`options`): `Promise`<`undefined` \| [`MulticallTx`](../modules/modules_domains.md#multicalltx)\>

Change owner of organization domain including all subdomains.

```typescript
domainsService.changeOrgOwnership({
    namespace: 'energyweb.iam.ewc',
    newOwner: '0x00...0',
    returnSteps: true,
    withSubdomains: true,
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`ChangeOrgOwnershipOptions`](../interfaces/modules_domains.ChangeOrgOwnershipOptions.md) | object containing options |

#### Returns

`Promise`<`undefined` \| [`MulticallTx`](../modules/modules_domains.md#multicalltx)\>

array of steps if `returnSteps` is true

___

### changeRoleOwnership

▸ **changeRoleOwnership**(`options`): `Promise`<`void`\>

Change owner of role domain.

```typescript
domainsService.changeRoleOwnership({
    namespace: 'root.roles.energyweb.iam.ewc',
    newOwner: '0x00...0',
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`ChangeRoleOwnershipOptions`](../interfaces/modules_domains.ChangeRoleOwnershipOptions.md) | object containing options |

#### Returns

`Promise`<`void`\>

___

### checkExistenceOfDomain

▸ **checkExistenceOfDomain**(`options`): `Promise`<`boolean`\>

Check if domain exists in ENS registry.

```typescript
domainsService.checkExistenceOfDomain({
    domain: 'some.energyweb.iam.ewc',
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`CheckExistenceOfDomainOptions`](../interfaces/modules_domains.CheckExistenceOfDomainOptions.md) | object containing options |

#### Returns

`Promise`<`boolean`\>

true if domain exists, false otherwise

___

### createApplication

▸ **createApplication**(`options`): `Promise`<`undefined` \| [`ReturnStep`](../interfaces/modules_domains.ReturnStep.md)[]\>

Create application domain with given definition for given namespace.
Also includes creating subdomain for roles. (roles.yourApp.apps.yourOrg.ewc).

```typescript
domainsService.createApplication({
    appName: 'auth',
    namespace: 'apps.energyweb.iam.ewc',
    data: {
        appName: 'Auth service',
    },
    returnSteps: true,
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`CreateApplicationOptions`](../interfaces/modules_domains.CreateApplicationOptions.md) | object containing options |

#### Returns

`Promise`<`undefined` \| [`ReturnStep`](../interfaces/modules_domains.ReturnStep.md)[]\>

array of steps if `returnSteps` is true

___

### createOrganization

▸ **createOrganization**(`options`): `Promise`<`undefined` \| [`ReturnStep`](../interfaces/modules_domains.ReturnStep.md)[]\>

Create organization domain with given definition for given namespace.
Also includes creating subdomains for roles and applications. (roles.yourOrg.ewc, apps.yourOrg.ewc).

```typescript
domainsService.createOrganization({
    orgName: 'auth',
    namespace: 'energyweb.iam.ewc',
    data: {
        orgName: 'Auth service',
    },
    returnSteps: true,
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`CreateOrganizationOptions`](../interfaces/modules_domains.CreateOrganizationOptions.md) | object containing options |

#### Returns

`Promise`<`undefined` \| [`ReturnStep`](../interfaces/modules_domains.ReturnStep.md)[]\>

array of steps if `returnSteps` is true

___

### createRole

▸ **createRole**(`options`): `Promise`<`undefined` \| [`ReturnStep`](../interfaces/modules_domains.ReturnStep.md)[]\>

Create role domain with given definition for given namespace.

```typescript
domainsService.createRole({
    appName: 'root',
    namespace: 'roles.energyweb.iam.ewc',
    data: {
        version: 1,
        issuer: {
            issuerType: 'DID',
            did: ['did:ethr:volta:0x00...0'],
        },
        revoker: {
            issuerType: 'DID',
            did: ['did:ethr:volta:0x00...0'],
        },
        enrolmentPreconditions: [],
    },
    returnSteps: true,
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`CreateRoleOptions`](../interfaces/modules_domains.CreateRoleOptions.md) | object containing options |

#### Returns

`Promise`<`undefined` \| [`ReturnStep`](../interfaces/modules_domains.ReturnStep.md)[]\>

array of steps if `returnSteps` is true

___

### deleteApplication

▸ **deleteApplication**(`options`): `Promise`<`undefined` \| [`ReturnStepWithRetryCheck`](../interfaces/modules_domains.ReturnStepWithRetryCheck.md)[]\>

Delete application domain and all subdomains.

```typescript
domainsService.deleteApplication({
    namespace: 'auth.apps.energyweb.iam.ewc',
    returnSteps: true,
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`DeleteApplicationOptions`](../interfaces/modules_domains.DeleteApplicationOptions.md) | object containing options |

#### Returns

`Promise`<`undefined` \| [`ReturnStepWithRetryCheck`](../interfaces/modules_domains.ReturnStepWithRetryCheck.md)[]\>

array of steps if `returnSteps` is true

___

### deleteOrganization

▸ **deleteOrganization**(`options`): `Promise`<`undefined` \| [`ReturnStepWithRetryCheck`](../interfaces/modules_domains.ReturnStepWithRetryCheck.md)[]\>

Delete organization domain and all subdomains.

```typescript
domainsService.deleteOrganization({
    namespace: 'energyweb.iam.ewc',
    returnSteps: true,
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`DeleteOrganizationOptions`](../interfaces/modules_domains.DeleteOrganizationOptions.md) | object containing options |

#### Returns

`Promise`<`undefined` \| [`ReturnStepWithRetryCheck`](../interfaces/modules_domains.ReturnStepWithRetryCheck.md)[]\>

array of steps if `returnSteps` is true

___

### deleteRole

▸ **deleteRole**(`options`): `Promise`<`void`\>

Delete role domain.

```typescript
domainsService.deleteRole({
    namespace: 'auth.roles.energyweb.iam.ewc',
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`DeleteRoleOptions`](../interfaces/modules_domains.DeleteRoleOptions.md) | object containing options |

#### Returns

`Promise`<`void`\>

___

### getAllowedRolesByIssuer

▸ **getAllowedRolesByIssuer**(`did`): `Promise`<[`IRole`](../interfaces/modules_domains.IRole.md)[]\>

Get all roles that a DID can issue.

```typescript
domainsService.getAllowedRolesByIssuer('did:ethr:0x00...0');
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `did` | `string` | issuer DID |

#### Returns

`Promise`<[`IRole`](../interfaces/modules_domains.IRole.md)[]\>

array of roles that the DID can issue

___

### getAppsOfOrg

▸ **getAppsOfOrg**(`org`): `Promise`<[`IApp`](../interfaces/modules_domains.IApp.md)[]\>

Fetch all applications for organization namespace.

```typescript
domainsService.getAppsOfOrg('energyweb.iam.ewc');
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `org` | `string` | organization namespace |

#### Returns

`Promise`<[`IApp`](../interfaces/modules_domains.IApp.md)[]\>

array of applications

___

### getDIDsByRole

▸ **getDIDsByRole**(`role`): `Promise`<`string`[]\>

Get users did which have certain role.

```typescript
domainsService.getDIDsByRole('auth.roles.energyweb.iam.ewc');
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `role` | `string` | role namespace |

#### Returns

`Promise`<`string`[]\>

array of users DID

___

### getDefinition

▸ **getDefinition**(`options`): `Promise`<`IRoleDefinition` \| `IOrganizationDefinition` \| `IAppDefinition`\>

Fetch cached domain definition for organization, application or role.

```typescript
domainsService.getDefinition({
    type: NamespaceType.Role,
    namespace: 'auth.roles.energyweb.iam.ewc',
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`GetDefinitionOptions`](../interfaces/modules_domains.GetDefinitionOptions.md) | object containing options |

#### Returns

`Promise`<`IRoleDefinition` \| `IOrganizationDefinition` \| `IAppDefinition`\>

domain definition

___

### getENSTypesByOwner

▸ **getENSTypesByOwner**(`options`): `Promise`<[`IRole`](../interfaces/modules_domains.IRole.md)[] \| [`IOrganization`](../interfaces/modules_domains.IOrganization.md)[] \| [`IApp`](../interfaces/modules_domains.IApp.md)[]\>

Get all organization/application/role for certain owner.

```typescript
domainsService.getENSTypesByOwner({
    type: NamespaceType.Organization,
    owner: '0x00...0',
    withRelations: true,
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`GetENSTypesByOwnerOptions`](../interfaces/modules_domains.GetENSTypesByOwnerOptions.md) | object containing options |

#### Returns

`Promise`<[`IRole`](../interfaces/modules_domains.IRole.md)[] \| [`IOrganization`](../interfaces/modules_domains.IOrganization.md)[] \| [`IApp`](../interfaces/modules_domains.IApp.md)[]\>

array of organizations/applications/roles for certain owner

___

### getENSTypesBySearchPhrase

▸ **getENSTypesBySearchPhrase**(`search`, `types?`): `Promise`<([`IRole`](../interfaces/modules_domains.IRole.md) \| [`IOrganization`](../interfaces/modules_domains.IOrganization.md) \| [`IApp`](../interfaces/modules_domains.IApp.md))[]\>

Search for organization/application/role with a given search phrase.

```typescript
domainsService.getENSTypesBySearchPhrase({
    types: [SearchType.App, SearchType.Org, SearchType.Role],
    search: 'energyweb',
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `search` | `string` | search phrase |
| `types?` | [`SearchType`](../enums/modules_cache_client.SearchType.md)[] | ENS types to search |

#### Returns

`Promise`<([`IRole`](../interfaces/modules_domains.IRole.md) \| [`IOrganization`](../interfaces/modules_domains.IOrganization.md) \| [`IApp`](../interfaces/modules_domains.IApp.md))[]\>

array of founded organizations/applications/roles

___

### getOrgHierarchy

▸ **getOrgHierarchy**(`namespace`): `Promise`<[`IOrganization`](../interfaces/modules_domains.IOrganization.md)\>

Get organization hierarchy. Max 20 levels deep.

```typescript
domainsService.getOrgHierarchy('energyweb.iam.ewc');
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `namespace` | `string` | organization namespace |

#### Returns

`Promise`<[`IOrganization`](../interfaces/modules_domains.IOrganization.md)\>

organization with all nested sub-organizations

___

### getRolesByNamespace

▸ **getRolesByNamespace**(`options`): `Promise`<[`IRole`](../interfaces/modules_domains.IRole.md)[]\>

Fetch all roles subdomains for certain domain.

```typescript
domainsService.getRolesByNamespace({
    parentType: NamespaceType.Application,
    namespace: 'auth.apps.energyweb.iam.ewc',
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`GetRolesByNamespaceOptions`](../interfaces/modules_domains.GetRolesByNamespaceOptions.md) | object containing options |

#### Returns

`Promise`<[`IRole`](../interfaces/modules_domains.IRole.md)[]\>

array of role subdomains

___

### getSubOrgsByOrgNamespace

▸ **getSubOrgsByOrgNamespace**(`namespace`): `Promise`<[`IOrganization`](../interfaces/modules_domains.IOrganization.md)[]\>

Fetch all sub-organizations for organization namespace.

```typescript
domainsService.getSubOrgsByOrgNamespace('energyweb.iam.ewc');
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `namespace` | `string` | organization namespace |

#### Returns

`Promise`<[`IOrganization`](../interfaces/modules_domains.IOrganization.md)[]\>

array of sub-organizations

___

### getSubdomains

▸ **getSubdomains**(`options`): `Promise`<`string`[]\>

Fetch subdomains for certain domain.

```typescript
domainsService.getSubdomains({
    domain: 'energyweb.iam.ewc',
    mode: 'ALL',
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`GetSubdomainsOptions`](../interfaces/modules_domains.GetSubdomainsOptions.md) | object containing options |

#### Returns

`Promise`<`string`[]\>

array of subdomains

___

### init

▸ **init**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

___

### isOwner

▸ **isOwner**(`options`): `Promise`<`boolean`\>

Check if user is owner of the domain.

```typescript
domainsService.isOwner({
    domain: 'energyweb.iam.ewc',
    user: '0x00...0',
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`IsOwnerOptions`](../interfaces/modules_domains.IsOwnerOptions.md) | object containing options |

#### Returns

`Promise`<`boolean`\>

true if user is owner, false otherwise

___

### namespacesWithRelations

▸ **namespacesWithRelations**(`namespaces`): `Promise`<{ `namespace`: `string` ; `owner`: `string`  }[]\>

Collect related data for given domain. Currently only related data is owner.

```typescript
domainsService.namespacesWithRelations(['root.roles.energyweb.iam.ewc', 'admin.roles.energyweb.iam.ewc']);

@param {Array<String>} namespaces array of namespaces
@return object containing registration types for given roles as keys

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

▸ **registrationTypesOfRoles**(`roles`): `Promise`<`Record`<`string`, `Set`<[`RegistrationTypes`](../enums/modules_claims.RegistrationTypes.md)\>\>\>

Get possible registration types for given roles.

```typescript
domainsService.registrationTypesOfRoles(['root.roles.energyweb.iam.ewc', 'admin.roles.energyweb.iam.ewc']);

@param {Array<String>} roles array of roles
@return object containing registration types for given roles as keys

#### Parameters

| Name | Type |
| :------ | :------ |
| `roles` | `string`[] |

#### Returns

`Promise`<`Record`<`string`, `Set`<[`RegistrationTypes`](../enums/modules_claims.RegistrationTypes.md)\>\>\>

___

### setRoleDefinition

▸ **setRoleDefinition**(`options`): `Promise`<`void`\>

Update ENS domain definition for already created domain.

```typescript
domainsService.setRoleDefinition({
    name: 'auth.apps.energyweb.iam.ewc',
    data: {
        appName: 'Auth service',
    }
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`SetRoleDefinitionOptions`](../interfaces/modules_domains.SetRoleDefinitionOptions.md) | object containing options |

#### Returns

`Promise`<`void`\>

___

### updateLegacyDefinition

▸ **updateLegacyDefinition**(`domain`, `data`): `Promise`<`boolean`\>

Move domain to latest version of resolver.

In initial version, role definitions where contained in ENS PublicResolver.
However, in order for key properties of role definitions to be readable on-chain, a new RoleDefinitionResolver is used.
This function sets the resolver in the ENS to the new contract for definitions that are pointing to the old contract.

```typescript
domainsService.updateLegacyDefinition({
    namespace: 'energyweb.iam.ewc',
    data: {
         orgName: 'Energy Web Foundation',
    },
});

@param {String} domain domain namespace to update
@param {DomainDefinition} data definition to apply to domain
@return true if domain was updated, false otherwise

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `data` | [`DomainDefinition`](../modules/modules_domains.md#domaindefinition) |

#### Returns

`Promise`<`boolean`\>

___

### validateOwnership

▸ **validateOwnership**(`options`): `Promise`<`string`[]\>

Get not owned domains in given namespace for current user.

```typescript
domainsService.validateOwnership({
    namespace: 'energyweb.iam.ewc',
    type: NamespaceType.Organization,
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`ValidateOwnershipOptions`](../interfaces/modules_domains.ValidateOwnershipOptions.md) | object containing options |

#### Returns

`Promise`<`string`[]\>

array of not owned domains

___

### create

▸ `Static` **create**(`signerService`, `cacheClient`): `Promise`<[`DomainsService`](modules_domains.DomainsService.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerService` | [`SignerService`](modules_signer.SignerService.md) |
| `cacheClient` | [`CacheClient`](modules_cache_client.CacheClient.md) |

#### Returns

`Promise`<[`DomainsService`](modules_domains.DomainsService.md)\>
