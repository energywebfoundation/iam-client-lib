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
- [getSubOrganizationsByOrganization](cacheServerClient_ICacheServerClient.ICacheServerClient.md#getsuborganizationsbyorganization)
- [isAuthEnabled](cacheServerClient_ICacheServerClient.ICacheServerClient.md#isauthenabled)
- [issueClaim](cacheServerClient_ICacheServerClient.ICacheServerClient.md#issueclaim)
- [login](cacheServerClient_ICacheServerClient.ICacheServerClient.md#login)
- [rejectClaim](cacheServerClient_ICacheServerClient.ICacheServerClient.md#rejectclaim)
- [requestClaim](cacheServerClient_ICacheServerClient.ICacheServerClient.md#requestclaim)
- [testLogin](cacheServerClient_ICacheServerClient.ICacheServerClient.md#testlogin)

## Properties

### pubKeyAndIdentityToken

• **pubKeyAndIdentityToken**: `undefined` \| [`IPubKeyAndIdentityToken`](utils_getPublicKeyAndIdentityToken.IPubKeyAndIdentityToken.md)

## Methods

### addDIDToWatchList

▸ **addDIDToWatchList**(`params`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`AddDIDToWatchListParams`](cacheServerClient_ICacheServerClient.AddDIDToWatchListParams.md) |

#### Returns

`Promise`<`void`\>

___

### deleteClaim

▸ **deleteClaim**(`params`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`DeleteClaimParams`](cacheServerClient_ICacheServerClient.DeleteClaimParams.md) |

#### Returns

`Promise`<`void`\>

___

### getAppDefinition

▸ **getAppDefinition**(`params`): `Promise`<`IAppDefinition`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`GetAppDefinitionParams`](cacheServerClient_ICacheServerClient.GetAppDefinitionParams.md) |

#### Returns

`Promise`<`IAppDefinition`\>

___

### getApplicationRoles

▸ **getApplicationRoles**(`params`): `Promise`<[`IRole`](cacheServerClient_cacheServerClient_types.IRole.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`GetApplicationRolesParams`](cacheServerClient_ICacheServerClient.GetApplicationRolesParams.md) |

#### Returns

`Promise`<[`IRole`](cacheServerClient_cacheServerClient_types.IRole.md)[]\>

___

### getApplicationsByOrganization

▸ **getApplicationsByOrganization**(`params`): `Promise`<[`IApp`](cacheServerClient_cacheServerClient_types.IApp.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`GetApplicationsByOrganizationParams`](cacheServerClient_ICacheServerClient.GetApplicationsByOrganizationParams.md) |

#### Returns

`Promise`<[`IApp`](cacheServerClient_cacheServerClient_types.IApp.md)[]\>

___

### getApplicationsByOwner

▸ **getApplicationsByOwner**(`params`): `Promise`<[`IApp`](cacheServerClient_cacheServerClient_types.IApp.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`GetApplicationsByOwnerParams`](cacheServerClient_ICacheServerClient.GetApplicationsByOwnerParams.md) |

#### Returns

`Promise`<[`IApp`](cacheServerClient_cacheServerClient_types.IApp.md)[]\>

___

### getAssetById

▸ **getAssetById**(`params`): `Promise`<[`Asset`](cacheServerClient_cacheServerClient_types.Asset.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`GetAssetByIdParams`](cacheServerClient_ICacheServerClient.GetAssetByIdParams.md) |

#### Returns

`Promise`<[`Asset`](cacheServerClient_cacheServerClient_types.Asset.md)\>

___

### getAssetHistory

▸ **getAssetHistory**(`params`): `Promise`<[`AssetHistory`](cacheServerClient_cacheServerClient_types.AssetHistory.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`GetAssetHistoryParams`](cacheServerClient_ICacheServerClient.GetAssetHistoryParams.md) |

#### Returns

`Promise`<[`AssetHistory`](cacheServerClient_cacheServerClient_types.AssetHistory.md)[]\>

___

### getClaimsByIssuer

▸ **getClaimsByIssuer**(`params`): `Promise`<[`Claim`](cacheServerClient_cacheServerClient_types.Claim.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`GetClaimsByIssuerParams`](cacheServerClient_ICacheServerClient.GetClaimsByIssuerParams.md) |

#### Returns

`Promise`<[`Claim`](cacheServerClient_cacheServerClient_types.Claim.md)[]\>

___

### getClaimsByRequester

▸ **getClaimsByRequester**(`params`): `Promise`<[`Claim`](cacheServerClient_cacheServerClient_types.Claim.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`GetClaimsByRequesterParams`](cacheServerClient_ICacheServerClient.GetClaimsByRequesterParams.md) |

#### Returns

`Promise`<[`Claim`](cacheServerClient_cacheServerClient_types.Claim.md)[]\>

___

### getClaimsBySubject

▸ **getClaimsBySubject**(`params`): `Promise`<[`Claim`](cacheServerClient_cacheServerClient_types.Claim.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`GetClaimsBySubjectParams`](cacheServerClient_ICacheServerClient.GetClaimsBySubjectParams.md) |

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

▸ **getDIDsForRole**(`params`): `Promise`<`string`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`GetDIDsForRoleParams`](cacheServerClient_ICacheServerClient.GetDIDsForRoleParams.md) |

#### Returns

`Promise`<`string`[]\>

___

### getDidDocument

▸ **getDidDocument**(`params`): `Promise`<`IDIDDocument`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`GetDidDocumentParams`](cacheServerClient_ICacheServerClient.GetDidDocumentParams.md) |

#### Returns

`Promise`<`IDIDDocument`\>

___

### getNamespaceBySearchPhrase

▸ **getNamespaceBySearchPhrase**(`params`): `Promise`<([`IOrganization`](cacheServerClient_cacheServerClient_types.IOrganization.md) \| [`IApp`](cacheServerClient_cacheServerClient_types.IApp.md) \| [`IRole`](cacheServerClient_cacheServerClient_types.IRole.md))[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`GetNamespaceBySearchPhraseParams`](cacheServerClient_ICacheServerClient.GetNamespaceBySearchPhraseParams.md) |

#### Returns

`Promise`<([`IOrganization`](cacheServerClient_cacheServerClient_types.IOrganization.md) \| [`IApp`](cacheServerClient_cacheServerClient_types.IApp.md) \| [`IRole`](cacheServerClient_cacheServerClient_types.IRole.md))[]\>

___

### getOfferedAssets

▸ **getOfferedAssets**(`params`): `Promise`<[`Asset`](cacheServerClient_cacheServerClient_types.Asset.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`GetOfferedAssetsParams`](cacheServerClient_ICacheServerClient.GetOfferedAssetsParams.md) |

#### Returns

`Promise`<[`Asset`](cacheServerClient_cacheServerClient_types.Asset.md)[]\>

___

### getOrgDefinition

▸ **getOrgDefinition**(`params`): `Promise`<`IOrganizationDefinition`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`GetOrgDefinitionParams`](cacheServerClient_ICacheServerClient.GetOrgDefinitionParams.md) |

#### Returns

`Promise`<`IOrganizationDefinition`\>

___

### getOrgHierarchy

▸ **getOrgHierarchy**(`params`): `Promise`<[`IOrganization`](cacheServerClient_cacheServerClient_types.IOrganization.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`GetOrgHierarchyParams`](cacheServerClient_ICacheServerClient.GetOrgHierarchyParams.md) |

#### Returns

`Promise`<[`IOrganization`](cacheServerClient_cacheServerClient_types.IOrganization.md)\>

___

### getOrganizationRoles

▸ **getOrganizationRoles**(`params`): `Promise`<[`IRole`](cacheServerClient_cacheServerClient_types.IRole.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`GetOrganizationRolesParams`](cacheServerClient_ICacheServerClient.GetOrganizationRolesParams.md) |

#### Returns

`Promise`<[`IRole`](cacheServerClient_cacheServerClient_types.IRole.md)[]\>

___

### getOrganizationsByOwner

▸ **getOrganizationsByOwner**(`params`): `Promise`<[`IOrganization`](cacheServerClient_cacheServerClient_types.IOrganization.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`GetOrganizationsByOwnerParams`](cacheServerClient_ICacheServerClient.GetOrganizationsByOwnerParams.md) |

#### Returns

`Promise`<[`IOrganization`](cacheServerClient_cacheServerClient_types.IOrganization.md)[]\>

___

### getOwnedAssets

▸ **getOwnedAssets**(`params`): `Promise`<[`Asset`](cacheServerClient_cacheServerClient_types.Asset.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`GetOwnedAssetsParams`](cacheServerClient_ICacheServerClient.GetOwnedAssetsParams.md) |

#### Returns

`Promise`<[`Asset`](cacheServerClient_cacheServerClient_types.Asset.md)[]\>

___

### getPreviouslyOwnedAssets

▸ **getPreviouslyOwnedAssets**(`params`): `Promise`<[`Asset`](cacheServerClient_cacheServerClient_types.Asset.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`GetPreviouslyOwnedAssetsParams`](cacheServerClient_ICacheServerClient.GetPreviouslyOwnedAssetsParams.md) |

#### Returns

`Promise`<[`Asset`](cacheServerClient_cacheServerClient_types.Asset.md)[]\>

___

### getRoleDefinition

▸ **getRoleDefinition**(`params`): `Promise`<`IRoleDefinition`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`GetRoleDefinitionParams`](cacheServerClient_ICacheServerClient.GetRoleDefinitionParams.md) |

#### Returns

`Promise`<`IRoleDefinition`\>

___

### getRolesByOwner

▸ **getRolesByOwner**(`params`): `Promise`<[`IRole`](cacheServerClient_cacheServerClient_types.IRole.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`GetRolesByOwnerParams`](cacheServerClient_ICacheServerClient.GetRolesByOwnerParams.md) |

#### Returns

`Promise`<[`IRole`](cacheServerClient_cacheServerClient_types.IRole.md)[]\>

___

### getSubOrganizationsByOrganization

▸ **getSubOrganizationsByOrganization**(`params`): `Promise`<[`IOrganization`](cacheServerClient_cacheServerClient_types.IOrganization.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`GetetSubOrganizationsByOrganizationParams`](cacheServerClient_ICacheServerClient.GetetSubOrganizationsByOrganizationParams.md) |

#### Returns

`Promise`<[`IOrganization`](cacheServerClient_cacheServerClient_types.IOrganization.md)[]\>

___

### isAuthEnabled

▸ **isAuthEnabled**(): `boolean`

#### Returns

`boolean`

___

### issueClaim

▸ **issueClaim**(`params`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`IssueClaimParams`](cacheServerClient_ICacheServerClient.IssueClaimParams.md) |

#### Returns

`Promise`<`void`\>

___

### login

▸ **login**(): `Promise`<`Object`\>

#### Returns

`Promise`<`Object`\>

___

### rejectClaim

▸ **rejectClaim**(`params`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`RejectClaimParams`](cacheServerClient_ICacheServerClient.RejectClaimParams.md) |

#### Returns

`Promise`<`void`\>

___

### requestClaim

▸ **requestClaim**(`params`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`RequestClaimParams`](cacheServerClient_ICacheServerClient.RequestClaimParams.md) |

#### Returns

`Promise`<`void`\>

___

### testLogin

▸ **testLogin**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>
