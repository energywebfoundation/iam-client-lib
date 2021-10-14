# Interface: ICacheServerClient

[cacheServerClient/ICacheServerClient](../modules/cacheServerClient_ICacheServerClient.md).ICacheServerClient

## Implemented by

- [`CacheServerClient`](../classes/cacheServerClient_cacheServerClient.CacheServerClient.md)

## Table of contents

### Properties

- [pubKeyAndIdentityToken](cacheServerClient_ICacheServerClient.ICacheServerClient.md#pubkeyandidentitytoken)

### Methods

- [addDIDToWatchList](cacheServerClient_ICacheServerClient.ICacheServerClient.md#adddidtowatchlist)
- [deleteClaim](cacheServerClient_ICacheServerClient.ICacheServerClient.md#deleteclaim)
- [getAppDefinition](cacheServerClient_ICacheServerClient.ICacheServerClient.md#getappdefinition)
- [getApplicationRoles](cacheServerClient_ICacheServerClient.ICacheServerClient.md#getapplicationroles)
- [getApplicationsByOrganization](cacheServerClient_ICacheServerClient.ICacheServerClient.md#getapplicationsbyorganization)
- [getApplicationsByOwner](cacheServerClient_ICacheServerClient.ICacheServerClient.md#getapplicationsbyowner)
- [getAssetById](cacheServerClient_ICacheServerClient.ICacheServerClient.md#getassetbyid)
- [getAssetHistory](cacheServerClient_ICacheServerClient.ICacheServerClient.md#getassethistory)
- [getClaimsByIssuer](cacheServerClient_ICacheServerClient.ICacheServerClient.md#getclaimsbyissuer)
- [getClaimsByRequester](cacheServerClient_ICacheServerClient.ICacheServerClient.md#getclaimsbyrequester)
- [getClaimsBySubject](cacheServerClient_ICacheServerClient.ICacheServerClient.md#getclaimsbysubject)
- [getClaimsBySubjects](cacheServerClient_ICacheServerClient.ICacheServerClient.md#getclaimsbysubjects)
- [getDIDsForRole](cacheServerClient_ICacheServerClient.ICacheServerClient.md#getdidsforrole)
- [getDidDocument](cacheServerClient_ICacheServerClient.ICacheServerClient.md#getdiddocument)
- [getNamespaceBySearchPhrase](cacheServerClient_ICacheServerClient.ICacheServerClient.md#getnamespacebysearchphrase)
- [getOfferedAssets](cacheServerClient_ICacheServerClient.ICacheServerClient.md#getofferedassets)
- [getOrgDefinition](cacheServerClient_ICacheServerClient.ICacheServerClient.md#getorgdefinition)
- [getOrgHierarchy](cacheServerClient_ICacheServerClient.ICacheServerClient.md#getorghierarchy)
- [getOrganizationRoles](cacheServerClient_ICacheServerClient.ICacheServerClient.md#getorganizationroles)
- [getOrganizationsByOwner](cacheServerClient_ICacheServerClient.ICacheServerClient.md#getorganizationsbyowner)
- [getOwnedAssets](cacheServerClient_ICacheServerClient.ICacheServerClient.md#getownedassets)
- [getPreviouslyOwnedAssets](cacheServerClient_ICacheServerClient.ICacheServerClient.md#getpreviouslyownedassets)
- [getRoleDefinition](cacheServerClient_ICacheServerClient.ICacheServerClient.md#getroledefinition)
- [getRolesByOwner](cacheServerClient_ICacheServerClient.ICacheServerClient.md#getrolesbyowner)
- [getRolesDefinition](cacheServerClient_ICacheServerClient.ICacheServerClient.md#getrolesdefinition)
- [getSubOrganizationsByOrganization](cacheServerClient_ICacheServerClient.ICacheServerClient.md#getsuborganizationsbyorganization)
- [isAuthEnabled](cacheServerClient_ICacheServerClient.ICacheServerClient.md#isauthenabled)
- [issueClaim](cacheServerClient_ICacheServerClient.ICacheServerClient.md#issueclaim)
- [login](cacheServerClient_ICacheServerClient.ICacheServerClient.md#login)
- [rejectClaim](cacheServerClient_ICacheServerClient.ICacheServerClient.md#rejectclaim)
- [requestClaim](cacheServerClient_ICacheServerClient.ICacheServerClient.md#requestclaim)
- [saveIssuedToken](cacheServerClient_ICacheServerClient.ICacheServerClient.md#saveissuedtoken)
- [testLogin](cacheServerClient_ICacheServerClient.ICacheServerClient.md#testlogin)

## Properties

### pubKeyAndIdentityToken

• **pubKeyAndIdentityToken**: `undefined` \| [`IPubKeyAndIdentityToken`](utils_getPublicKeyAndIdentityToken.IPubKeyAndIdentityToken.md)

## Methods

### addDIDToWatchList

▸ **addDIDToWatchList**(`__namedParameters`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Pick`<[`ClaimsQueryParams`](../modules/cacheServerClient_cacheServerClient_types.md#claimsqueryparams), ``"did"``\> |

#### Returns

`Promise`<`void`\>

___

### deleteClaim

▸ **deleteClaim**(`__namedParameters`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Pick`<[`ClaimsQueryParams`](../modules/cacheServerClient_cacheServerClient_types.md#claimsqueryparams), ``"claimId"``\> |

#### Returns

`Promise`<`void`\>

___

### getAppDefinition

▸ **getAppDefinition**(`__namedParameters`): `Promise`<`IAppDefinition`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Pick`<[`ClaimsQueryParams`](../modules/cacheServerClient_cacheServerClient_types.md#claimsqueryparams), ``"namespace"``\> |

#### Returns

`Promise`<`IAppDefinition`\>

___

### getApplicationRoles

▸ **getApplicationRoles**(`__namedParameters`): `Promise`<[`IRole`](cacheServerClient_cacheServerClient_types.IRole.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Pick`<[`ClaimsQueryParams`](../modules/cacheServerClient_cacheServerClient_types.md#claimsqueryparams), ``"namespace"``\> |

#### Returns

`Promise`<[`IRole`](cacheServerClient_cacheServerClient_types.IRole.md)[]\>

___

### getApplicationsByOrganization

▸ **getApplicationsByOrganization**(`__namedParameters`): `Promise`<[`IApp`](cacheServerClient_cacheServerClient_types.IApp.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Pick`<[`ClaimsQueryParams`](../modules/cacheServerClient_cacheServerClient_types.md#claimsqueryparams), ``"namespace"``\> |

#### Returns

`Promise`<[`IApp`](cacheServerClient_cacheServerClient_types.IApp.md)[]\>

___

### getApplicationsByOwner

▸ **getApplicationsByOwner**(`__namedParameters`): `Promise`<[`IApp`](cacheServerClient_cacheServerClient_types.IApp.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Pick`<[`ClaimsQueryParams`](../modules/cacheServerClient_cacheServerClient_types.md#claimsqueryparams), ``"owner"``\> |

#### Returns

`Promise`<[`IApp`](cacheServerClient_cacheServerClient_types.IApp.md)[]\>

___

### getAssetById

▸ **getAssetById**(`__namedParameters`): `Promise`<[`Asset`](cacheServerClient_cacheServerClient_types.Asset.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Pick`<[`ClaimsQueryParams`](../modules/cacheServerClient_cacheServerClient_types.md#claimsqueryparams), ``"id"``\> |

#### Returns

`Promise`<[`Asset`](cacheServerClient_cacheServerClient_types.Asset.md)\>

___

### getAssetHistory

▸ **getAssetHistory**(`__namedParameters`): `Promise`<[`AssetHistory`](cacheServerClient_cacheServerClient_types.AssetHistory.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Pick`<[`ClaimsQueryParams`](../modules/cacheServerClient_cacheServerClient_types.md#claimsqueryparams), ``"type"`` \| ``"id"`` \| ``"order"`` \| ``"take"`` \| ``"skip"``\> |

#### Returns

`Promise`<[`AssetHistory`](cacheServerClient_cacheServerClient_types.AssetHistory.md)[]\>

___

### getClaimsByIssuer

▸ **getClaimsByIssuer**(`__namedParameters`): `Promise`<[`Claim`](cacheServerClient_cacheServerClient_types.Claim.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Pick`<[`ClaimsQueryParams`](../modules/cacheServerClient_cacheServerClient_types.md#claimsqueryparams), ``"did"`` \| ``"isAccepted"`` \| ``"parentNamespace"``\> |

#### Returns

`Promise`<[`Claim`](cacheServerClient_cacheServerClient_types.Claim.md)[]\>

___

### getClaimsByRequester

▸ **getClaimsByRequester**(`__namedParameters`): `Promise`<[`Claim`](cacheServerClient_cacheServerClient_types.Claim.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Pick`<[`ClaimsQueryParams`](../modules/cacheServerClient_cacheServerClient_types.md#claimsqueryparams), ``"did"`` \| ``"isAccepted"`` \| ``"parentNamespace"``\> |

#### Returns

`Promise`<[`Claim`](cacheServerClient_cacheServerClient_types.Claim.md)[]\>

___

### getClaimsBySubject

▸ **getClaimsBySubject**(`__namedParameters`): `Promise`<[`Claim`](cacheServerClient_cacheServerClient_types.Claim.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Pick`<[`ClaimsQueryParams`](../modules/cacheServerClient_cacheServerClient_types.md#claimsqueryparams), ``"did"`` \| ``"isAccepted"`` \| ``"parentNamespace"``\> |

#### Returns

`Promise`<[`Claim`](cacheServerClient_cacheServerClient_types.Claim.md)[]\>

___

### getClaimsBySubjects

▸ **getClaimsBySubjects**(`subjects`): `Promise`<[`Claim`](cacheServerClient_cacheServerClient_types.Claim.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `subjects` | `string`[] |

#### Returns

`Promise`<[`Claim`](cacheServerClient_cacheServerClient_types.Claim.md)[]\>

___

### getDIDsForRole

▸ **getDIDsForRole**(`__namedParameters`): `Promise`<`string`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Pick`<[`ClaimsQueryParams`](../modules/cacheServerClient_cacheServerClient_types.md#claimsqueryparams), ``"namespace"``\> |

#### Returns

`Promise`<`string`[]\>

___

### getDidDocument

▸ **getDidDocument**(`__namedParameters`): `Promise`<`IDIDDocument`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Pick`<[`ClaimsQueryParams`](../modules/cacheServerClient_cacheServerClient_types.md#claimsqueryparams), ``"did"`` \| ``"includeClaims"``\> |

#### Returns

`Promise`<`IDIDDocument`\>

___

### getNamespaceBySearchPhrase

▸ **getNamespaceBySearchPhrase**(`__namedParameters`): `Promise`<([`IOrganization`](cacheServerClient_cacheServerClient_types.IOrganization.md) \| [`IApp`](cacheServerClient_cacheServerClient_types.IApp.md) \| [`IRole`](cacheServerClient_cacheServerClient_types.IRole.md))[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Pick`<[`ClaimsQueryParams`](../modules/cacheServerClient_cacheServerClient_types.md#claimsqueryparams), ``"types"`` \| ``"search"``\> |

#### Returns

`Promise`<([`IOrganization`](cacheServerClient_cacheServerClient_types.IOrganization.md) \| [`IApp`](cacheServerClient_cacheServerClient_types.IApp.md) \| [`IRole`](cacheServerClient_cacheServerClient_types.IRole.md))[]\>

___

### getOfferedAssets

▸ **getOfferedAssets**(`__namedParameters`): `Promise`<[`Asset`](cacheServerClient_cacheServerClient_types.Asset.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Pick`<[`ClaimsQueryParams`](../modules/cacheServerClient_cacheServerClient_types.md#claimsqueryparams), ``"did"``\> |

#### Returns

`Promise`<[`Asset`](cacheServerClient_cacheServerClient_types.Asset.md)[]\>

___

### getOrgDefinition

▸ **getOrgDefinition**(`__namedParameters`): `Promise`<`IOrganizationDefinition`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Pick`<[`ClaimsQueryParams`](../modules/cacheServerClient_cacheServerClient_types.md#claimsqueryparams), ``"namespace"``\> |

#### Returns

`Promise`<`IOrganizationDefinition`\>

___

### getOrgHierarchy

▸ **getOrgHierarchy**(`__namedParameters`): `Promise`<[`IOrganization`](cacheServerClient_cacheServerClient_types.IOrganization.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Pick`<[`ClaimsQueryParams`](../modules/cacheServerClient_cacheServerClient_types.md#claimsqueryparams), ``"namespace"``\> |

#### Returns

`Promise`<[`IOrganization`](cacheServerClient_cacheServerClient_types.IOrganization.md)\>

___

### getOrganizationRoles

▸ **getOrganizationRoles**(`__namedParameters`): `Promise`<[`IRole`](cacheServerClient_cacheServerClient_types.IRole.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Pick`<[`ClaimsQueryParams`](../modules/cacheServerClient_cacheServerClient_types.md#claimsqueryparams), ``"namespace"``\> |

#### Returns

`Promise`<[`IRole`](cacheServerClient_cacheServerClient_types.IRole.md)[]\>

___

### getOrganizationsByOwner

▸ **getOrganizationsByOwner**(`__namedParameters`): `Promise`<[`IOrganization`](cacheServerClient_cacheServerClient_types.IOrganization.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Pick`<[`ClaimsQueryParams`](../modules/cacheServerClient_cacheServerClient_types.md#claimsqueryparams), ``"owner"`` \| ``"excludeSubOrgs"``\> |

#### Returns

`Promise`<[`IOrganization`](cacheServerClient_cacheServerClient_types.IOrganization.md)[]\>

___

### getOwnedAssets

▸ **getOwnedAssets**(`__namedParameters`): `Promise`<[`Asset`](cacheServerClient_cacheServerClient_types.Asset.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Pick`<[`ClaimsQueryParams`](../modules/cacheServerClient_cacheServerClient_types.md#claimsqueryparams), ``"did"``\> |

#### Returns

`Promise`<[`Asset`](cacheServerClient_cacheServerClient_types.Asset.md)[]\>

___

### getPreviouslyOwnedAssets

▸ **getPreviouslyOwnedAssets**(`__namedParameters`): `Promise`<[`Asset`](cacheServerClient_cacheServerClient_types.Asset.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Pick`<[`ClaimsQueryParams`](../modules/cacheServerClient_cacheServerClient_types.md#claimsqueryparams), ``"owner"``\> |

#### Returns

`Promise`<[`Asset`](cacheServerClient_cacheServerClient_types.Asset.md)[]\>

___

### getRoleDefinition

▸ **getRoleDefinition**(`__namedParameters`): `Promise`<`IRoleDefinition`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Pick`<[`ClaimsQueryParams`](../modules/cacheServerClient_cacheServerClient_types.md#claimsqueryparams), ``"namespace"``\> |

#### Returns

`Promise`<`IRoleDefinition`\>

___

### getRolesByOwner

▸ **getRolesByOwner**(`__namedParameters`): `Promise`<[`IRole`](cacheServerClient_cacheServerClient_types.IRole.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Pick`<[`ClaimsQueryParams`](../modules/cacheServerClient_cacheServerClient_types.md#claimsqueryparams), ``"owner"``\> |

#### Returns

`Promise`<[`IRole`](cacheServerClient_cacheServerClient_types.IRole.md)[]\>

___

### getRolesDefinition

▸ **getRolesDefinition**(`namespaces`): `Promise`<`Record`<`string`, `IRoleDefinition`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespaces` | `string`[] |

#### Returns

`Promise`<`Record`<`string`, `IRoleDefinition`\>\>

___

### getSubOrganizationsByOrganization

▸ **getSubOrganizationsByOrganization**(`__namedParameters`): `Promise`<[`IOrganization`](cacheServerClient_cacheServerClient_types.IOrganization.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Pick`<[`ClaimsQueryParams`](../modules/cacheServerClient_cacheServerClient_types.md#claimsqueryparams), ``"namespace"``\> |

#### Returns

`Promise`<[`IOrganization`](cacheServerClient_cacheServerClient_types.IOrganization.md)[]\>

___

### isAuthEnabled

▸ **isAuthEnabled**(): `boolean`

#### Returns

`boolean`

___

### issueClaim

▸ **issueClaim**(`__namedParameters`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`IssueClaim`](../modules/cacheServerClient_cacheServerClient_types.md#issueclaim) |

#### Returns

`Promise`<`void`\>

___

### login

▸ **login**(): `Promise`<`Object`\>

#### Returns

`Promise`<`Object`\>

___

### rejectClaim

▸ **rejectClaim**(`__namedParameters`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`RejectClaim`](../modules/cacheServerClient_cacheServerClient_types.md#rejectclaim) |

#### Returns

`Promise`<`void`\>

___

### requestClaim

▸ **requestClaim**(`__namedParameters`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`RequestClaim`](../modules/cacheServerClient_cacheServerClient_types.md#requestclaim) |

#### Returns

`Promise`<`void`\>

___

### saveIssuedToken

▸ **saveIssuedToken**(`__namedParameters`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Pick`<[`ClaimsQueryParams`](../modules/cacheServerClient_cacheServerClient_types.md#claimsqueryparams), ``"issuedToken"``\> |

#### Returns

`Promise`<`void`\>

___

### testLogin

▸ **testLogin**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>
