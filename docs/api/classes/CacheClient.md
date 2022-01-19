# Class: CacheClient

## Implements

- [`ICacheClient`](../interfaces/ICacheClient.md)

## Table of contents

### Constructors

- [constructor](CacheClient.md#constructor)

### Properties

- [pubKeyAndIdentityToken](CacheClient.md#pubkeyandidentitytoken)

### Methods

- [addDIDToWatchList](CacheClient.md#adddidtowatchlist)
- [authenticate](CacheClient.md#authenticate)
- [deleteClaim](CacheClient.md#deleteclaim)
- [getAllowedRolesByIssuer](CacheClient.md#getallowedrolesbyissuer)
- [getAppDefinition](CacheClient.md#getappdefinition)
- [getApplicationRoles](CacheClient.md#getapplicationroles)
- [getApplicationsByOrganization](CacheClient.md#getapplicationsbyorganization)
- [getApplicationsByOwner](CacheClient.md#getapplicationsbyowner)
- [getAssetById](CacheClient.md#getassetbyid)
- [getAssetHistory](CacheClient.md#getassethistory)
- [getClaimById](CacheClient.md#getclaimbyid)
- [getClaimsByIssuer](CacheClient.md#getclaimsbyissuer)
- [getClaimsByRequester](CacheClient.md#getclaimsbyrequester)
- [getClaimsBySubject](CacheClient.md#getclaimsbysubject)
- [getClaimsBySubjects](CacheClient.md#getclaimsbysubjects)
- [getDIDsForRole](CacheClient.md#getdidsforrole)
- [getDidDocument](CacheClient.md#getdiddocument)
- [getNamespaceBySearchPhrase](CacheClient.md#getnamespacebysearchphrase)
- [getOfferedAssets](CacheClient.md#getofferedassets)
- [getOrgDefinition](CacheClient.md#getorgdefinition)
- [getOrgHierarchy](CacheClient.md#getorghierarchy)
- [getOrganizationRoles](CacheClient.md#getorganizationroles)
- [getOrganizationsByOwner](CacheClient.md#getorganizationsbyowner)
- [getOwnedAssets](CacheClient.md#getownedassets)
- [getPreviouslyOwnedAssets](CacheClient.md#getpreviouslyownedassets)
- [getRoleDefinition](CacheClient.md#getroledefinition)
- [getRolesByOwner](CacheClient.md#getrolesbyowner)
- [getRolesDefinition](CacheClient.md#getrolesdefinition)
- [getSubOrganizationsByOrganization](CacheClient.md#getsuborganizationsbyorganization)
- [handleError](CacheClient.md#handleerror)
- [init](CacheClient.md#init)
- [isAuthEnabled](CacheClient.md#isauthenabled)
- [issueClaim](CacheClient.md#issueclaim)
- [login](CacheClient.md#login)
- [rejectClaim](CacheClient.md#rejectclaim)
- [requestClaim](CacheClient.md#requestclaim)

## Constructors

### constructor

• **new CacheClient**(`_signerService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_signerService` | [`SignerService`](SignerService.md) |

## Properties

### pubKeyAndIdentityToken

• **pubKeyAndIdentityToken**: `undefined` \| [`IPubKeyAndIdentityToken`](../interfaces/IPubKeyAndIdentityToken.md)

#### Implementation of

[ICacheClient](../interfaces/ICacheClient.md).[pubKeyAndIdentityToken](../interfaces/ICacheClient.md#pubkeyandidentitytoken)

## Methods

### addDIDToWatchList

▸ **addDIDToWatchList**(`did`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `did` | `string` |

#### Returns

`Promise`<`void`\>

#### Implementation of

[ICacheClient](../interfaces/ICacheClient.md).[addDIDToWatchList](../interfaces/ICacheClient.md#adddidtowatchlist)

___

### authenticate

▸ **authenticate**(): `Promise`<`void`\>

**`description`** Refreshes access token. If login still fails then signs new identity token and requests access token
After authentication runs previously failed requests

#### Returns

`Promise`<`void`\>

___

### deleteClaim

▸ **deleteClaim**(`id`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`<`void`\>

#### Implementation of

[ICacheClient](../interfaces/ICacheClient.md).[deleteClaim](../interfaces/ICacheClient.md#deleteclaim)

___

### getAllowedRolesByIssuer

▸ **getAllowedRolesByIssuer**(`did`): `Promise`<`string`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `did` | `string` |

#### Returns

`Promise`<`string`[]\>

___

### getAppDefinition

▸ **getAppDefinition**(`namespace`): `Promise`<`IAppDefinition`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<`IAppDefinition`\>

#### Implementation of

[ICacheClient](../interfaces/ICacheClient.md).[getAppDefinition](../interfaces/ICacheClient.md#getappdefinition)

___

### getApplicationRoles

▸ **getApplicationRoles**(`namespace`): `Promise`<[`IRole`](../interfaces/IRole.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<[`IRole`](../interfaces/IRole.md)[]\>

#### Implementation of

[ICacheClient](../interfaces/ICacheClient.md).[getApplicationRoles](../interfaces/ICacheClient.md#getapplicationroles)

___

### getApplicationsByOrganization

▸ **getApplicationsByOrganization**(`namespace`): `Promise`<[`IApp`](../interfaces/IApp.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<[`IApp`](../interfaces/IApp.md)[]\>

#### Implementation of

[ICacheClient](../interfaces/ICacheClient.md).[getApplicationsByOrganization](../interfaces/ICacheClient.md#getapplicationsbyorganization)

___

### getApplicationsByOwner

▸ **getApplicationsByOwner**(`owner`, `withRelations?`): `Promise`<[`IApp`](../interfaces/IApp.md)[]\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `owner` | `string` | `undefined` |
| `withRelations` | `boolean` | `true` |

#### Returns

`Promise`<[`IApp`](../interfaces/IApp.md)[]\>

#### Implementation of

[ICacheClient](../interfaces/ICacheClient.md).[getApplicationsByOwner](../interfaces/ICacheClient.md#getapplicationsbyowner)

___

### getAssetById

▸ **getAssetById**(`id`): `Promise`<[`Asset`](../interfaces/Asset.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`<[`Asset`](../interfaces/Asset.md)\>

#### Implementation of

[ICacheClient](../interfaces/ICacheClient.md).[getAssetById](../interfaces/ICacheClient.md#getassetbyid)

___

### getAssetHistory

▸ **getAssetHistory**(`id`, `__namedParameters?`): `Promise`<[`AssetHistory`](../interfaces/AssetHistory.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `__namedParameters` | [`AssetsFilter`](../modules.md#assetsfilter) |

#### Returns

`Promise`<[`AssetHistory`](../interfaces/AssetHistory.md)[]\>

#### Implementation of

[ICacheClient](../interfaces/ICacheClient.md).[getAssetHistory](../interfaces/ICacheClient.md#getassethistory)

___

### getClaimById

▸ **getClaimById**(`claimId`): `Promise`<`undefined` \| [`Claim`](../interfaces/Claim.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `claimId` | `string` |

#### Returns

`Promise`<`undefined` \| [`Claim`](../interfaces/Claim.md)\>

#### Implementation of

[ICacheClient](../interfaces/ICacheClient.md).[getClaimById](../interfaces/ICacheClient.md#getclaimbyid)

___

### getClaimsByIssuer

▸ **getClaimsByIssuer**(`issuer`, `__namedParameters?`): `Promise`<[`Claim`](../interfaces/Claim.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `issuer` | `string` |
| `__namedParameters` | [`ClaimsFilter`](../modules.md#claimsfilter) |

#### Returns

`Promise`<[`Claim`](../interfaces/Claim.md)[]\>

#### Implementation of

[ICacheClient](../interfaces/ICacheClient.md).[getClaimsByIssuer](../interfaces/ICacheClient.md#getclaimsbyissuer)

___

### getClaimsByRequester

▸ **getClaimsByRequester**(`requester`, `__namedParameters?`): `Promise`<[`Claim`](../interfaces/Claim.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `requester` | `string` |
| `__namedParameters` | [`ClaimsFilter`](../modules.md#claimsfilter) |

#### Returns

`Promise`<[`Claim`](../interfaces/Claim.md)[]\>

#### Implementation of

[ICacheClient](../interfaces/ICacheClient.md).[getClaimsByRequester](../interfaces/ICacheClient.md#getclaimsbyrequester)

___

### getClaimsBySubject

▸ **getClaimsBySubject**(`subject`, `__namedParameters?`): `Promise`<[`Claim`](../interfaces/Claim.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `subject` | `string` |
| `__namedParameters` | [`ClaimsFilter`](../modules.md#claimsfilter) |

#### Returns

`Promise`<[`Claim`](../interfaces/Claim.md)[]\>

#### Implementation of

[ICacheClient](../interfaces/ICacheClient.md).[getClaimsBySubject](../interfaces/ICacheClient.md#getclaimsbysubject)

___

### getClaimsBySubjects

▸ **getClaimsBySubjects**(`subjects`): `Promise`<[`Claim`](../interfaces/Claim.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `subjects` | `string`[] |

#### Returns

`Promise`<[`Claim`](../interfaces/Claim.md)[]\>

#### Implementation of

[ICacheClient](../interfaces/ICacheClient.md).[getClaimsBySubjects](../interfaces/ICacheClient.md#getclaimsbysubjects)

___

### getDIDsForRole

▸ **getDIDsForRole**(`namespace`): `Promise`<`string`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<`string`[]\>

#### Implementation of

[ICacheClient](../interfaces/ICacheClient.md).[getDIDsForRole](../interfaces/ICacheClient.md#getdidsforrole)

___

### getDidDocument

▸ **getDidDocument**(`did`, `includeClaims?`): `Promise`<`IDIDDocument`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `did` | `string` |
| `includeClaims?` | `boolean` |

#### Returns

`Promise`<`IDIDDocument`\>

#### Implementation of

[ICacheClient](../interfaces/ICacheClient.md).[getDidDocument](../interfaces/ICacheClient.md#getdiddocument)

___

### getNamespaceBySearchPhrase

▸ **getNamespaceBySearchPhrase**(`search`, `types?`): `Promise`<([`IRole`](../interfaces/IRole.md) \| [`IOrganization`](../interfaces/IOrganization.md) \| [`IApp`](../interfaces/IApp.md))[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `search` | `string` |
| `types?` | [`SearchType`](../enums/SearchType.md)[] |

#### Returns

`Promise`<([`IRole`](../interfaces/IRole.md) \| [`IOrganization`](../interfaces/IOrganization.md) \| [`IApp`](../interfaces/IApp.md))[]\>

#### Implementation of

[ICacheClient](../interfaces/ICacheClient.md).[getNamespaceBySearchPhrase](../interfaces/ICacheClient.md#getnamespacebysearchphrase)

___

### getOfferedAssets

▸ **getOfferedAssets**(`did`): `Promise`<[`Asset`](../interfaces/Asset.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `did` | `string` |

#### Returns

`Promise`<[`Asset`](../interfaces/Asset.md)[]\>

#### Implementation of

[ICacheClient](../interfaces/ICacheClient.md).[getOfferedAssets](../interfaces/ICacheClient.md#getofferedassets)

___

### getOrgDefinition

▸ **getOrgDefinition**(`namespace`): `Promise`<`IOrganizationDefinition`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<`IOrganizationDefinition`\>

#### Implementation of

[ICacheClient](../interfaces/ICacheClient.md).[getOrgDefinition](../interfaces/ICacheClient.md#getorgdefinition)

___

### getOrgHierarchy

▸ **getOrgHierarchy**(`namespace`): `Promise`<[`IOrganization`](../interfaces/IOrganization.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<[`IOrganization`](../interfaces/IOrganization.md)\>

#### Implementation of

[ICacheClient](../interfaces/ICacheClient.md).[getOrgHierarchy](../interfaces/ICacheClient.md#getorghierarchy)

___

### getOrganizationRoles

▸ **getOrganizationRoles**(`namespace`): `Promise`<[`IRole`](../interfaces/IRole.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<[`IRole`](../interfaces/IRole.md)[]\>

#### Implementation of

[ICacheClient](../interfaces/ICacheClient.md).[getOrganizationRoles](../interfaces/ICacheClient.md#getorganizationroles)

___

### getOrganizationsByOwner

▸ **getOrganizationsByOwner**(`owner`, `withRelations?`): `Promise`<[`IOrganization`](../interfaces/IOrganization.md)[]\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `owner` | `string` | `undefined` |
| `withRelations` | `boolean` | `true` |

#### Returns

`Promise`<[`IOrganization`](../interfaces/IOrganization.md)[]\>

#### Implementation of

[ICacheClient](../interfaces/ICacheClient.md).[getOrganizationsByOwner](../interfaces/ICacheClient.md#getorganizationsbyowner)

___

### getOwnedAssets

▸ **getOwnedAssets**(`did`): `Promise`<[`Asset`](../interfaces/Asset.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `did` | `string` |

#### Returns

`Promise`<[`Asset`](../interfaces/Asset.md)[]\>

#### Implementation of

[ICacheClient](../interfaces/ICacheClient.md).[getOwnedAssets](../interfaces/ICacheClient.md#getownedassets)

___

### getPreviouslyOwnedAssets

▸ **getPreviouslyOwnedAssets**(`owner`): `Promise`<[`Asset`](../interfaces/Asset.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `owner` | `string` |

#### Returns

`Promise`<[`Asset`](../interfaces/Asset.md)[]\>

#### Implementation of

[ICacheClient](../interfaces/ICacheClient.md).[getPreviouslyOwnedAssets](../interfaces/ICacheClient.md#getpreviouslyownedassets)

___

### getRoleDefinition

▸ **getRoleDefinition**(`namespace`): `Promise`<`IRoleDefinition`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<`IRoleDefinition`\>

#### Implementation of

[ICacheClient](../interfaces/ICacheClient.md).[getRoleDefinition](../interfaces/ICacheClient.md#getroledefinition)

___

### getRolesByOwner

▸ **getRolesByOwner**(`owner`): `Promise`<[`IRole`](../interfaces/IRole.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `owner` | `string` |

#### Returns

`Promise`<[`IRole`](../interfaces/IRole.md)[]\>

#### Implementation of

[ICacheClient](../interfaces/ICacheClient.md).[getRolesByOwner](../interfaces/ICacheClient.md#getrolesbyowner)

___

### getRolesDefinition

▸ **getRolesDefinition**(`namespaces`): `Promise`<`Record`<`string`, `IRoleDefinition`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespaces` | `string`[] |

#### Returns

`Promise`<`Record`<`string`, `IRoleDefinition`\>\>

#### Implementation of

[ICacheClient](../interfaces/ICacheClient.md).[getRolesDefinition](../interfaces/ICacheClient.md#getrolesdefinition)

___

### getSubOrganizationsByOrganization

▸ **getSubOrganizationsByOrganization**(`namespace`): `Promise`<[`IOrganization`](../interfaces/IOrganization.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<[`IOrganization`](../interfaces/IOrganization.md)[]\>

#### Implementation of

[ICacheClient](../interfaces/ICacheClient.md).[getSubOrganizationsByOrganization](../interfaces/ICacheClient.md#getsuborganizationsbyorganization)

___

### handleError

▸ **handleError**(`error`): `Promise`<`unknown`\>

**`description`** Interceptor of authentication errors. Queues failed requests and starts authentication process.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `error` | `AxiosError`<`any`, `any`\> | Intercepted response from failed request |

#### Returns

`Promise`<`unknown`\>

Promise, which resolves with result of resending of failed request

___

### init

▸ **init**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

___

### isAuthEnabled

▸ **isAuthEnabled**(): `boolean`

#### Returns

`boolean`

#### Implementation of

[ICacheClient](../interfaces/ICacheClient.md).[isAuthEnabled](../interfaces/ICacheClient.md#isauthenabled)

___

### issueClaim

▸ **issueClaim**(`issuer`, `message`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `issuer` | `string` |
| `message` | [`IClaimIssuance`](../interfaces/IClaimIssuance.md) |

#### Returns

`Promise`<`void`\>

#### Implementation of

[ICacheClient](../interfaces/ICacheClient.md).[issueClaim](../interfaces/ICacheClient.md#issueclaim)

___

### login

▸ **login**(): `Promise`<`void`\>

Verifies current session and establishes new one if needed
https://energyweb.atlassian.net/wiki/spaces/MYEN/pages/2303295607/ICL-+ICS+Auth+Process

#### Returns

`Promise`<`void`\>

#### Implementation of

[ICacheClient](../interfaces/ICacheClient.md).[login](../interfaces/ICacheClient.md#login)

___

### rejectClaim

▸ **rejectClaim**(`issuer`, `message`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `issuer` | `string` |
| `message` | [`IClaimRejection`](../interfaces/IClaimRejection.md) |

#### Returns

`Promise`<`void`\>

#### Implementation of

[ICacheClient](../interfaces/ICacheClient.md).[rejectClaim](../interfaces/ICacheClient.md#rejectclaim)

___

### requestClaim

▸ **requestClaim**(`message`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`IClaimRequest`](../interfaces/IClaimRequest.md) |

#### Returns

`Promise`<`void`\>

#### Implementation of

[ICacheClient](../interfaces/ICacheClient.md).[requestClaim](../interfaces/ICacheClient.md#requestclaim)
