# Class: CacheServerClient

[cacheServerClient/cacheServerClient](../modules/cacheServerClient_cacheServerClient.md).CacheServerClient

## Implements

- [`ICacheServerClient`](../interfaces/cacheServerClient_ICacheServerClient.ICacheServerClient.md)

## Table of contents

### Constructors

- [constructor](cacheServerClient_cacheServerClient.CacheServerClient.md#constructor)

### Properties

- [pubKeyAndIdentityToken](cacheServerClient_cacheServerClient.CacheServerClient.md#pubkeyandidentitytoken)

### Methods

- [addDIDToWatchList](cacheServerClient_cacheServerClient.CacheServerClient.md#adddidtowatchlist)
- [addFailedRequest](cacheServerClient_cacheServerClient.CacheServerClient.md#addfailedrequest)
- [deleteClaim](cacheServerClient_cacheServerClient.CacheServerClient.md#deleteclaim)
- [getAppDefinition](cacheServerClient_cacheServerClient.CacheServerClient.md#getappdefinition)
- [getApplicationRoles](cacheServerClient_cacheServerClient.CacheServerClient.md#getapplicationroles)
- [getApplicationsByOrganization](cacheServerClient_cacheServerClient.CacheServerClient.md#getapplicationsbyorganization)
- [getApplicationsByOwner](cacheServerClient_cacheServerClient.CacheServerClient.md#getapplicationsbyowner)
- [getAssetById](cacheServerClient_cacheServerClient.CacheServerClient.md#getassetbyid)
- [getAssetHistory](cacheServerClient_cacheServerClient.CacheServerClient.md#getassethistory)
- [getClaimsByIssuer](cacheServerClient_cacheServerClient.CacheServerClient.md#getclaimsbyissuer)
- [getClaimsByRequester](cacheServerClient_cacheServerClient.CacheServerClient.md#getclaimsbyrequester)
- [getClaimsBySubject](cacheServerClient_cacheServerClient.CacheServerClient.md#getclaimsbysubject)
- [getClaimsBySubjects](cacheServerClient_cacheServerClient.CacheServerClient.md#getclaimsbysubjects)
- [getDIDsForRole](cacheServerClient_cacheServerClient.CacheServerClient.md#getdidsforrole)
- [getDidDocument](cacheServerClient_cacheServerClient.CacheServerClient.md#getdiddocument)
- [getNamespaceBySearchPhrase](cacheServerClient_cacheServerClient.CacheServerClient.md#getnamespacebysearchphrase)
- [getOfferedAssets](cacheServerClient_cacheServerClient.CacheServerClient.md#getofferedassets)
- [getOrgDefinition](cacheServerClient_cacheServerClient.CacheServerClient.md#getorgdefinition)
- [getOrgHierarchy](cacheServerClient_cacheServerClient.CacheServerClient.md#getorghierarchy)
- [getOrganizationRoles](cacheServerClient_cacheServerClient.CacheServerClient.md#getorganizationroles)
- [getOrganizationsByOwner](cacheServerClient_cacheServerClient.CacheServerClient.md#getorganizationsbyowner)
- [getOwnedAssets](cacheServerClient_cacheServerClient.CacheServerClient.md#getownedassets)
- [getPreviouslyOwnedAssets](cacheServerClient_cacheServerClient.CacheServerClient.md#getpreviouslyownedassets)
- [getRoleDefinition](cacheServerClient_cacheServerClient.CacheServerClient.md#getroledefinition)
- [getRolesByOwner](cacheServerClient_cacheServerClient.CacheServerClient.md#getrolesbyowner)
- [getSubOrganizationsByOrganization](cacheServerClient_cacheServerClient.CacheServerClient.md#getsuborganizationsbyorganization)
- [handleRefreshToken](cacheServerClient_cacheServerClient.CacheServerClient.md#handlerefreshtoken)
- [handleUnauthorized](cacheServerClient_cacheServerClient.CacheServerClient.md#handleunauthorized)
- [isAuthEnabled](cacheServerClient_cacheServerClient.CacheServerClient.md#isauthenabled)
- [issueClaim](cacheServerClient_cacheServerClient.CacheServerClient.md#issueclaim)
- [login](cacheServerClient_cacheServerClient.CacheServerClient.md#login)
- [rejectClaim](cacheServerClient_cacheServerClient.CacheServerClient.md#rejectclaim)
- [requestClaim](cacheServerClient_cacheServerClient.CacheServerClient.md#requestclaim)
- [testLogin](cacheServerClient_cacheServerClient.CacheServerClient.md#testlogin)

## Constructors

### constructor

• **new CacheServerClient**(`__namedParameters`, `signer`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`CacheServerClientOptions`](../interfaces/cacheServerClient_cacheServerClient.CacheServerClientOptions.md) |
| `signer` | `Signer` |

## Properties

### pubKeyAndIdentityToken

• **pubKeyAndIdentityToken**: `undefined` \| [`IPubKeyAndIdentityToken`](../interfaces/utils_getPublicKeyAndIdentityToken.IPubKeyAndIdentityToken.md)

#### Implementation of

[ICacheServerClient](../interfaces/cacheServerClient_ICacheServerClient.ICacheServerClient.md).[pubKeyAndIdentityToken](../interfaces/cacheServerClient_ICacheServerClient.ICacheServerClient.md#pubkeyandidentitytoken)

## Methods

### addDIDToWatchList

▸ **addDIDToWatchList**(`__namedParameters`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Pick`<[`ClaimsQueryParams`](../modules/cacheServerClient_cacheServerClient_types.md#claimsqueryparams), ``"did"``\> |

#### Returns

`Promise`<`void`\>

#### Implementation of

[ICacheServerClient](../interfaces/cacheServerClient_ICacheServerClient.ICacheServerClient.md).[addDIDToWatchList](../interfaces/cacheServerClient_ICacheServerClient.ICacheServerClient.md#adddidtowatchlist)

___

### addFailedRequest

▸ **addFailedRequest**(`callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`token?`: `string`) => `void` |

#### Returns

`void`

___

### deleteClaim

▸ **deleteClaim**(`__namedParameters`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Pick`<[`ClaimsQueryParams`](../modules/cacheServerClient_cacheServerClient_types.md#claimsqueryparams), ``"claimId"``\> |

#### Returns

`Promise`<`void`\>

#### Implementation of

[ICacheServerClient](../interfaces/cacheServerClient_ICacheServerClient.ICacheServerClient.md).[deleteClaim](../interfaces/cacheServerClient_ICacheServerClient.ICacheServerClient.md#deleteclaim)

___

### getAppDefinition

▸ **getAppDefinition**(`__namedParameters`): `Promise`<`IAppDefinition`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |

#### Returns

`Promise`<`IAppDefinition`\>

#### Implementation of

[ICacheServerClient](../interfaces/cacheServerClient_ICacheServerClient.ICacheServerClient.md).[getAppDefinition](../interfaces/cacheServerClient_ICacheServerClient.ICacheServerClient.md#getappdefinition)

___

### getApplicationRoles

▸ **getApplicationRoles**(`__namedParameters`): `Promise`<[`IRole`](../interfaces/cacheServerClient_cacheServerClient_types.IRole.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Pick`<[`ClaimsQueryParams`](../modules/cacheServerClient_cacheServerClient_types.md#claimsqueryparams), ``"namespace"``\> |

#### Returns

`Promise`<[`IRole`](../interfaces/cacheServerClient_cacheServerClient_types.IRole.md)[]\>

#### Implementation of

[ICacheServerClient](../interfaces/cacheServerClient_ICacheServerClient.ICacheServerClient.md).[getApplicationRoles](../interfaces/cacheServerClient_ICacheServerClient.ICacheServerClient.md#getapplicationroles)

___

### getApplicationsByOrganization

▸ **getApplicationsByOrganization**(`__namedParameters`): `Promise`<[`IApp`](../interfaces/cacheServerClient_cacheServerClient_types.IApp.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Pick`<[`ClaimsQueryParams`](../modules/cacheServerClient_cacheServerClient_types.md#claimsqueryparams), ``"namespace"``\> |

#### Returns

`Promise`<[`IApp`](../interfaces/cacheServerClient_cacheServerClient_types.IApp.md)[]\>

#### Implementation of

[ICacheServerClient](../interfaces/cacheServerClient_ICacheServerClient.ICacheServerClient.md).[getApplicationsByOrganization](../interfaces/cacheServerClient_ICacheServerClient.ICacheServerClient.md#getapplicationsbyorganization)

___

### getApplicationsByOwner

▸ **getApplicationsByOwner**(`__namedParameters`): `Promise`<[`IApp`](../interfaces/cacheServerClient_cacheServerClient_types.IApp.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Pick`<[`ClaimsQueryParams`](../modules/cacheServerClient_cacheServerClient_types.md#claimsqueryparams), ``"owner"``\> |

#### Returns

`Promise`<[`IApp`](../interfaces/cacheServerClient_cacheServerClient_types.IApp.md)[]\>

#### Implementation of

[ICacheServerClient](../interfaces/cacheServerClient_ICacheServerClient.ICacheServerClient.md).[getApplicationsByOwner](../interfaces/cacheServerClient_ICacheServerClient.ICacheServerClient.md#getapplicationsbyowner)

___

### getAssetById

▸ **getAssetById**(`__namedParameters`): `Promise`<[`Asset`](../interfaces/cacheServerClient_cacheServerClient_types.Asset.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Pick`<[`ClaimsQueryParams`](../modules/cacheServerClient_cacheServerClient_types.md#claimsqueryparams), ``"id"``\> |

#### Returns

`Promise`<[`Asset`](../interfaces/cacheServerClient_cacheServerClient_types.Asset.md)\>

#### Implementation of

[ICacheServerClient](../interfaces/cacheServerClient_ICacheServerClient.ICacheServerClient.md).[getAssetById](../interfaces/cacheServerClient_ICacheServerClient.ICacheServerClient.md#getassetbyid)

___

### getAssetHistory

▸ **getAssetHistory**(`__namedParameters`): `Promise`<[`AssetHistory`](../interfaces/cacheServerClient_cacheServerClient_types.AssetHistory.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Pick`<[`ClaimsQueryParams`](../modules/cacheServerClient_cacheServerClient_types.md#claimsqueryparams), ``"type"`` \| ``"id"`` \| ``"order"`` \| ``"take"`` \| ``"skip"``\> |

#### Returns

`Promise`<[`AssetHistory`](../interfaces/cacheServerClient_cacheServerClient_types.AssetHistory.md)[]\>

#### Implementation of

[ICacheServerClient](../interfaces/cacheServerClient_ICacheServerClient.ICacheServerClient.md).[getAssetHistory](../interfaces/cacheServerClient_ICacheServerClient.ICacheServerClient.md#getassethistory)

___

### getClaimsByIssuer

▸ **getClaimsByIssuer**(`__namedParameters`): `Promise`<[`Claim`](../interfaces/cacheServerClient_cacheServerClient_types.Claim.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Pick`<[`ClaimsQueryParams`](../modules/cacheServerClient_cacheServerClient_types.md#claimsqueryparams), ``"did"`` \| ``"isAccepted"`` \| ``"parentNamespace"``\> |

#### Returns

`Promise`<[`Claim`](../interfaces/cacheServerClient_cacheServerClient_types.Claim.md)[]\>

#### Implementation of

[ICacheServerClient](../interfaces/cacheServerClient_ICacheServerClient.ICacheServerClient.md).[getClaimsByIssuer](../interfaces/cacheServerClient_ICacheServerClient.ICacheServerClient.md#getclaimsbyissuer)

___

### getClaimsByRequester

▸ **getClaimsByRequester**(`__namedParameters`): `Promise`<[`Claim`](../interfaces/cacheServerClient_cacheServerClient_types.Claim.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Pick`<[`ClaimsQueryParams`](../modules/cacheServerClient_cacheServerClient_types.md#claimsqueryparams), ``"did"`` \| ``"isAccepted"`` \| ``"parentNamespace"``\> |

#### Returns

`Promise`<[`Claim`](../interfaces/cacheServerClient_cacheServerClient_types.Claim.md)[]\>

#### Implementation of

[ICacheServerClient](../interfaces/cacheServerClient_ICacheServerClient.ICacheServerClient.md).[getClaimsByRequester](../interfaces/cacheServerClient_ICacheServerClient.ICacheServerClient.md#getclaimsbyrequester)

___

### getClaimsBySubject

▸ **getClaimsBySubject**(`__namedParameters`): `Promise`<[`Claim`](../interfaces/cacheServerClient_cacheServerClient_types.Claim.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Pick`<[`ClaimsQueryParams`](../modules/cacheServerClient_cacheServerClient_types.md#claimsqueryparams), ``"did"`` \| ``"isAccepted"`` \| ``"parentNamespace"``\> |

#### Returns

`Promise`<[`Claim`](../interfaces/cacheServerClient_cacheServerClient_types.Claim.md)[]\>

#### Implementation of

[ICacheServerClient](../interfaces/cacheServerClient_ICacheServerClient.ICacheServerClient.md).[getClaimsBySubject](../interfaces/cacheServerClient_ICacheServerClient.ICacheServerClient.md#getclaimsbysubject)

___

### getClaimsBySubjects

▸ **getClaimsBySubjects**(`subjects`): `Promise`<[`Claim`](../interfaces/cacheServerClient_cacheServerClient_types.Claim.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `subjects` | `string`[] |

#### Returns

`Promise`<[`Claim`](../interfaces/cacheServerClient_cacheServerClient_types.Claim.md)[]\>

#### Implementation of

[ICacheServerClient](../interfaces/cacheServerClient_ICacheServerClient.ICacheServerClient.md).[getClaimsBySubjects](../interfaces/cacheServerClient_ICacheServerClient.ICacheServerClient.md#getclaimsbysubjects)

___

### getDIDsForRole

▸ **getDIDsForRole**(`__namedParameters`): `Promise`<`string`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Pick`<[`ClaimsQueryParams`](../modules/cacheServerClient_cacheServerClient_types.md#claimsqueryparams), ``"namespace"``\> |

#### Returns

`Promise`<`string`[]\>

#### Implementation of

[ICacheServerClient](../interfaces/cacheServerClient_ICacheServerClient.ICacheServerClient.md).[getDIDsForRole](../interfaces/cacheServerClient_ICacheServerClient.ICacheServerClient.md#getdidsforrole)

___

### getDidDocument

▸ **getDidDocument**(`__namedParameters`): `Promise`<`IDIDDocument`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Pick`<[`ClaimsQueryParams`](../modules/cacheServerClient_cacheServerClient_types.md#claimsqueryparams), ``"did"`` \| ``"includeClaims"``\> |

#### Returns

`Promise`<`IDIDDocument`\>

#### Implementation of

[ICacheServerClient](../interfaces/cacheServerClient_ICacheServerClient.ICacheServerClient.md).[getDidDocument](../interfaces/cacheServerClient_ICacheServerClient.ICacheServerClient.md#getdiddocument)

___

### getNamespaceBySearchPhrase

▸ **getNamespaceBySearchPhrase**(`__namedParameters`): `Promise`<([`IOrganization`](../interfaces/cacheServerClient_cacheServerClient_types.IOrganization.md) \| [`IApp`](../interfaces/cacheServerClient_cacheServerClient_types.IApp.md) \| [`IRole`](../interfaces/cacheServerClient_cacheServerClient_types.IRole.md))[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Pick`<[`ClaimsQueryParams`](../modules/cacheServerClient_cacheServerClient_types.md#claimsqueryparams), ``"types"`` \| ``"search"``\> |

#### Returns

`Promise`<([`IOrganization`](../interfaces/cacheServerClient_cacheServerClient_types.IOrganization.md) \| [`IApp`](../interfaces/cacheServerClient_cacheServerClient_types.IApp.md) \| [`IRole`](../interfaces/cacheServerClient_cacheServerClient_types.IRole.md))[]\>

#### Implementation of

[ICacheServerClient](../interfaces/cacheServerClient_ICacheServerClient.ICacheServerClient.md).[getNamespaceBySearchPhrase](../interfaces/cacheServerClient_ICacheServerClient.ICacheServerClient.md#getnamespacebysearchphrase)

___

### getOfferedAssets

▸ **getOfferedAssets**(`__namedParameters`): `Promise`<[`Asset`](../interfaces/cacheServerClient_cacheServerClient_types.Asset.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Pick`<[`ClaimsQueryParams`](../modules/cacheServerClient_cacheServerClient_types.md#claimsqueryparams), ``"did"``\> |

#### Returns

`Promise`<[`Asset`](../interfaces/cacheServerClient_cacheServerClient_types.Asset.md)[]\>

#### Implementation of

[ICacheServerClient](../interfaces/cacheServerClient_ICacheServerClient.ICacheServerClient.md).[getOfferedAssets](../interfaces/cacheServerClient_ICacheServerClient.ICacheServerClient.md#getofferedassets)

___

### getOrgDefinition

▸ **getOrgDefinition**(`__namedParameters`): `Promise`<`IOrganizationDefinition`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Pick`<[`ClaimsQueryParams`](../modules/cacheServerClient_cacheServerClient_types.md#claimsqueryparams), ``"namespace"``\> |

#### Returns

`Promise`<`IOrganizationDefinition`\>

#### Implementation of

[ICacheServerClient](../interfaces/cacheServerClient_ICacheServerClient.ICacheServerClient.md).[getOrgDefinition](../interfaces/cacheServerClient_ICacheServerClient.ICacheServerClient.md#getorgdefinition)

___

### getOrgHierarchy

▸ **getOrgHierarchy**(`__namedParameters`): `Promise`<[`IOrganization`](../interfaces/cacheServerClient_cacheServerClient_types.IOrganization.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Pick`<[`ClaimsQueryParams`](../modules/cacheServerClient_cacheServerClient_types.md#claimsqueryparams), ``"namespace"``\> |

#### Returns

`Promise`<[`IOrganization`](../interfaces/cacheServerClient_cacheServerClient_types.IOrganization.md)\>

#### Implementation of

[ICacheServerClient](../interfaces/cacheServerClient_ICacheServerClient.ICacheServerClient.md).[getOrgHierarchy](../interfaces/cacheServerClient_ICacheServerClient.ICacheServerClient.md#getorghierarchy)

___

### getOrganizationRoles

▸ **getOrganizationRoles**(`__namedParameters`): `Promise`<[`IRole`](../interfaces/cacheServerClient_cacheServerClient_types.IRole.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Pick`<[`ClaimsQueryParams`](../modules/cacheServerClient_cacheServerClient_types.md#claimsqueryparams), ``"namespace"``\> |

#### Returns

`Promise`<[`IRole`](../interfaces/cacheServerClient_cacheServerClient_types.IRole.md)[]\>

#### Implementation of

[ICacheServerClient](../interfaces/cacheServerClient_ICacheServerClient.ICacheServerClient.md).[getOrganizationRoles](../interfaces/cacheServerClient_ICacheServerClient.ICacheServerClient.md#getorganizationroles)

___

### getOrganizationsByOwner

▸ **getOrganizationsByOwner**(`__namedParameters`): `Promise`<[`IOrganization`](../interfaces/cacheServerClient_cacheServerClient_types.IOrganization.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Pick`<[`ClaimsQueryParams`](../modules/cacheServerClient_cacheServerClient_types.md#claimsqueryparams), ``"owner"`` \| ``"excludeSubOrgs"``\> |

#### Returns

`Promise`<[`IOrganization`](../interfaces/cacheServerClient_cacheServerClient_types.IOrganization.md)[]\>

#### Implementation of

[ICacheServerClient](../interfaces/cacheServerClient_ICacheServerClient.ICacheServerClient.md).[getOrganizationsByOwner](../interfaces/cacheServerClient_ICacheServerClient.ICacheServerClient.md#getorganizationsbyowner)

___

### getOwnedAssets

▸ **getOwnedAssets**(`__namedParameters`): `Promise`<[`Asset`](../interfaces/cacheServerClient_cacheServerClient_types.Asset.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Pick`<[`ClaimsQueryParams`](../modules/cacheServerClient_cacheServerClient_types.md#claimsqueryparams), ``"did"``\> |

#### Returns

`Promise`<[`Asset`](../interfaces/cacheServerClient_cacheServerClient_types.Asset.md)[]\>

#### Implementation of

[ICacheServerClient](../interfaces/cacheServerClient_ICacheServerClient.ICacheServerClient.md).[getOwnedAssets](../interfaces/cacheServerClient_ICacheServerClient.ICacheServerClient.md#getownedassets)

___

### getPreviouslyOwnedAssets

▸ **getPreviouslyOwnedAssets**(`__namedParameters`): `Promise`<[`Asset`](../interfaces/cacheServerClient_cacheServerClient_types.Asset.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Pick`<[`ClaimsQueryParams`](../modules/cacheServerClient_cacheServerClient_types.md#claimsqueryparams), ``"owner"``\> |

#### Returns

`Promise`<[`Asset`](../interfaces/cacheServerClient_cacheServerClient_types.Asset.md)[]\>

#### Implementation of

[ICacheServerClient](../interfaces/cacheServerClient_ICacheServerClient.ICacheServerClient.md).[getPreviouslyOwnedAssets](../interfaces/cacheServerClient_ICacheServerClient.ICacheServerClient.md#getpreviouslyownedassets)

___

### getRoleDefinition

▸ **getRoleDefinition**(`__namedParameters`): `Promise`<`IRoleDefinition`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Pick`<[`ClaimsQueryParams`](../modules/cacheServerClient_cacheServerClient_types.md#claimsqueryparams), ``"namespace"``\> |

#### Returns

`Promise`<`IRoleDefinition`\>

#### Implementation of

[ICacheServerClient](../interfaces/cacheServerClient_ICacheServerClient.ICacheServerClient.md).[getRoleDefinition](../interfaces/cacheServerClient_ICacheServerClient.ICacheServerClient.md#getroledefinition)

___

### getRolesByOwner

▸ **getRolesByOwner**(`__namedParameters`): `Promise`<[`IRole`](../interfaces/cacheServerClient_cacheServerClient_types.IRole.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Pick`<[`ClaimsQueryParams`](../modules/cacheServerClient_cacheServerClient_types.md#claimsqueryparams), ``"owner"``\> |

#### Returns

`Promise`<[`IRole`](../interfaces/cacheServerClient_cacheServerClient_types.IRole.md)[]\>

#### Implementation of

[ICacheServerClient](../interfaces/cacheServerClient_ICacheServerClient.ICacheServerClient.md).[getRolesByOwner](../interfaces/cacheServerClient_ICacheServerClient.ICacheServerClient.md#getrolesbyowner)

___

### getSubOrganizationsByOrganization

▸ **getSubOrganizationsByOrganization**(`__namedParameters`): `Promise`<[`IOrganization`](../interfaces/cacheServerClient_cacheServerClient_types.IOrganization.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Pick`<[`ClaimsQueryParams`](../modules/cacheServerClient_cacheServerClient_types.md#claimsqueryparams), ``"namespace"``\> |

#### Returns

`Promise`<[`IOrganization`](../interfaces/cacheServerClient_cacheServerClient_types.IOrganization.md)[]\>

#### Implementation of

[ICacheServerClient](../interfaces/cacheServerClient_ICacheServerClient.ICacheServerClient.md).[getSubOrganizationsByOrganization](../interfaces/cacheServerClient_ICacheServerClient.ICacheServerClient.md#getsuborganizationsbyorganization)

___

### handleRefreshToken

▸ **handleRefreshToken**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

___

### handleUnauthorized

▸ **handleUnauthorized**(`error`): `Promise`<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `AxiosError`<`any`\> |

#### Returns

`Promise`<`unknown`\>

___

### isAuthEnabled

▸ **isAuthEnabled**(): `boolean`

#### Returns

`boolean`

#### Implementation of

[ICacheServerClient](../interfaces/cacheServerClient_ICacheServerClient.ICacheServerClient.md).[isAuthEnabled](../interfaces/cacheServerClient_ICacheServerClient.ICacheServerClient.md#isauthenabled)

___

### issueClaim

▸ **issueClaim**(`__namedParameters`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`IssueClaim`](../modules/cacheServerClient_cacheServerClient_types.md#issueclaim) |

#### Returns

`Promise`<`void`\>

#### Implementation of

[ICacheServerClient](../interfaces/cacheServerClient_ICacheServerClient.ICacheServerClient.md).[issueClaim](../interfaces/cacheServerClient_ICacheServerClient.ICacheServerClient.md#issueclaim)

___

### login

▸ **login**(): `Promise`<`Object`\>

#### Returns

`Promise`<`Object`\>

#### Implementation of

[ICacheServerClient](../interfaces/cacheServerClient_ICacheServerClient.ICacheServerClient.md).[login](../interfaces/cacheServerClient_ICacheServerClient.ICacheServerClient.md#login)

___

### rejectClaim

▸ **rejectClaim**(`__namedParameters`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`RejectClaim`](../modules/cacheServerClient_cacheServerClient_types.md#rejectclaim) |

#### Returns

`Promise`<`void`\>

#### Implementation of

[ICacheServerClient](../interfaces/cacheServerClient_ICacheServerClient.ICacheServerClient.md).[rejectClaim](../interfaces/cacheServerClient_ICacheServerClient.ICacheServerClient.md#rejectclaim)

___

### requestClaim

▸ **requestClaim**(`__namedParameters`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`RequestClaim`](../modules/cacheServerClient_cacheServerClient_types.md#requestclaim) |

#### Returns

`Promise`<`void`\>

#### Implementation of

[ICacheServerClient](../interfaces/cacheServerClient_ICacheServerClient.ICacheServerClient.md).[requestClaim](../interfaces/cacheServerClient_ICacheServerClient.ICacheServerClient.md#requestclaim)

___

### testLogin

▸ **testLogin**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Implementation of

[ICacheServerClient](../interfaces/cacheServerClient_ICacheServerClient.ICacheServerClient.md).[testLogin](../interfaces/cacheServerClient_ICacheServerClient.ICacheServerClient.md#testlogin)
