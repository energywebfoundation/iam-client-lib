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

▸ **addDIDToWatchList**(`__namedParameters`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.did` | `string` |

#### Returns

`Promise`<`void`\>

___

### deleteClaim

▸ **deleteClaim**(`__namedParameters`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.claimId` | `string` |

#### Returns

`Promise`<`void`\>

___

### getAppDefinition

▸ **getAppDefinition**(`__namedParameters`): `Promise`<`IAppDefinition`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.namespace` | `string` |

#### Returns

`Promise`<`IAppDefinition`\>

___

### getApplicationRoles

▸ **getApplicationRoles**(`__namedParameters`): `Promise`<[`IRole`](cacheServerClient_cacheServerClient_types.IRole.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.namespace` | `string` |

#### Returns

`Promise`<[`IRole`](cacheServerClient_cacheServerClient_types.IRole.md)[]\>

___

### getApplicationsByOrganization

▸ **getApplicationsByOrganization**(`__namedParameters`): `Promise`<[`IApp`](cacheServerClient_cacheServerClient_types.IApp.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.namespace` | `string` |

#### Returns

`Promise`<[`IApp`](cacheServerClient_cacheServerClient_types.IApp.md)[]\>

___

### getApplicationsByOwner

▸ **getApplicationsByOwner**(`__namedParameters`): `Promise`<[`IApp`](cacheServerClient_cacheServerClient_types.IApp.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.owner` | `string` |

#### Returns

`Promise`<[`IApp`](cacheServerClient_cacheServerClient_types.IApp.md)[]\>

___

### getAssetById

▸ **getAssetById**(`__namedParameters`): `Promise`<[`Asset`](cacheServerClient_cacheServerClient_types.Asset.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.id` | `string` |

#### Returns

`Promise`<[`Asset`](cacheServerClient_cacheServerClient_types.Asset.md)\>

___

### getAssetHistory

▸ **getAssetHistory**(`__namedParameters`): `Promise`<[`AssetHistory`](cacheServerClient_cacheServerClient_types.AssetHistory.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.id` | `string` |
| `__namedParameters.order?` | [`Order`](../enums/cacheServerClient_cacheServerClient_types.Order.md) |
| `__namedParameters.skip?` | `number` |
| `__namedParameters.take?` | `number` |
| `__namedParameters.type?` | [`AssetHistoryEventType`](../enums/cacheServerClient_cacheServerClient_types.AssetHistoryEventType.md) |

#### Returns

`Promise`<[`AssetHistory`](cacheServerClient_cacheServerClient_types.AssetHistory.md)[]\>

___

### getClaimsByIssuer

▸ **getClaimsByIssuer**(`__namedParameters`): `Promise`<[`Claim`](cacheServerClient_cacheServerClient_types.Claim.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.did` | `string` |
| `__namedParameters.isAccepted?` | `boolean` |
| `__namedParameters.parentNamespace?` | `string` |

#### Returns

`Promise`<[`Claim`](cacheServerClient_cacheServerClient_types.Claim.md)[]\>

___

### getClaimsByRequester

▸ **getClaimsByRequester**(`__namedParameters`): `Promise`<[`Claim`](cacheServerClient_cacheServerClient_types.Claim.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.did` | `string` |
| `__namedParameters.isAccepted?` | `boolean` |
| `__namedParameters.parentNamespace?` | `string` |

#### Returns

`Promise`<[`Claim`](cacheServerClient_cacheServerClient_types.Claim.md)[]\>

___

### getClaimsBySubject

▸ **getClaimsBySubject**(`__namedParameters`): `Promise`<[`Claim`](cacheServerClient_cacheServerClient_types.Claim.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.did` | `string` |
| `__namedParameters.isAccepted?` | `boolean` |
| `__namedParameters.parentNamespace?` | `string` |

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
| `__namedParameters` | `Object` |
| `__namedParameters.namespace` | `string` |

#### Returns

`Promise`<`string`[]\>

___

### getDidDocument

▸ **getDidDocument**(`__namedParameters`): `Promise`<`IDIDDocument`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.did` | `string` |
| `__namedParameters.includeClaims?` | `boolean` |

#### Returns

`Promise`<`IDIDDocument`\>

___

### getNamespaceBySearchPhrase

▸ **getNamespaceBySearchPhrase**(`__namedParameters`): `Promise`<([`IOrganization`](cacheServerClient_cacheServerClient_types.IOrganization.md) \| [`IApp`](cacheServerClient_cacheServerClient_types.IApp.md) \| [`IRole`](cacheServerClient_cacheServerClient_types.IRole.md))[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.search` | `string` |
| `__namedParameters.types?` | (``"App"`` \| ``"Org"`` \| ``"Role"``)[] |

#### Returns

`Promise`<([`IOrganization`](cacheServerClient_cacheServerClient_types.IOrganization.md) \| [`IApp`](cacheServerClient_cacheServerClient_types.IApp.md) \| [`IRole`](cacheServerClient_cacheServerClient_types.IRole.md))[]\>

___

### getOfferedAssets

▸ **getOfferedAssets**(`__namedParameters`): `Promise`<[`Asset`](cacheServerClient_cacheServerClient_types.Asset.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.did` | `string` |

#### Returns

`Promise`<[`Asset`](cacheServerClient_cacheServerClient_types.Asset.md)[]\>

___

### getOrgDefinition

▸ **getOrgDefinition**(`__namedParameters`): `Promise`<`IOrganizationDefinition`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.namespace` | `string` |

#### Returns

`Promise`<`IOrganizationDefinition`\>

___

### getOrgHierarchy

▸ **getOrgHierarchy**(`__namedParameters`): `Promise`<[`IOrganization`](cacheServerClient_cacheServerClient_types.IOrganization.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.namespace` | `string` |

#### Returns

`Promise`<[`IOrganization`](cacheServerClient_cacheServerClient_types.IOrganization.md)\>

___

### getOrganizationRoles

▸ **getOrganizationRoles**(`__namedParameters`): `Promise`<[`IRole`](cacheServerClient_cacheServerClient_types.IRole.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.namespace` | `string` |

#### Returns

`Promise`<[`IRole`](cacheServerClient_cacheServerClient_types.IRole.md)[]\>

___

### getOrganizationsByOwner

▸ **getOrganizationsByOwner**(`__namedParameters`): `Promise`<[`IOrganization`](cacheServerClient_cacheServerClient_types.IOrganization.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.excludeSubOrgs` | `boolean` |
| `__namedParameters.owner` | `string` |

#### Returns

`Promise`<[`IOrganization`](cacheServerClient_cacheServerClient_types.IOrganization.md)[]\>

___

### getOwnedAssets

▸ **getOwnedAssets**(`__namedParameters`): `Promise`<[`Asset`](cacheServerClient_cacheServerClient_types.Asset.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.did` | `string` |

#### Returns

`Promise`<[`Asset`](cacheServerClient_cacheServerClient_types.Asset.md)[]\>

___

### getPreviouslyOwnedAssets

▸ **getPreviouslyOwnedAssets**(`__namedParameters`): `Promise`<[`Asset`](cacheServerClient_cacheServerClient_types.Asset.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.owner` | `string` |

#### Returns

`Promise`<[`Asset`](cacheServerClient_cacheServerClient_types.Asset.md)[]\>

___

### getRoleDefinition

▸ **getRoleDefinition**(`__namedParameters`): `Promise`<`IRoleDefinition`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.namespace` | `string` |

#### Returns

`Promise`<`IRoleDefinition`\>

___

### getRolesByOwner

▸ **getRolesByOwner**(`__namedParameters`): `Promise`<[`IRole`](cacheServerClient_cacheServerClient_types.IRole.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.owner` | `string` |

#### Returns

`Promise`<[`IRole`](cacheServerClient_cacheServerClient_types.IRole.md)[]\>

___

### getSubOrganizationsByOrganization

▸ **getSubOrganizationsByOrganization**(`__namedParameters`): `Promise`<[`IOrganization`](cacheServerClient_cacheServerClient_types.IOrganization.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.namespace` | `string` |

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
| `__namedParameters` | `Object` |
| `__namedParameters.did` | `string` |
| `__namedParameters.message` | [`IClaimIssuance`](iam.IClaimIssuance.md) |

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
| `__namedParameters` | `Object` |
| `__namedParameters.did` | `string` |
| `__namedParameters.message` | [`IClaimRejection`](iam.IClaimRejection.md) |

#### Returns

`Promise`<`void`\>

___

### requestClaim

▸ **requestClaim**(`__namedParameters`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.did` | `string` |
| `__namedParameters.message` | [`IClaimRequest`](iam.IClaimRequest.md) |

#### Returns

`Promise`<`void`\>

___

### testLogin

▸ **testLogin**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>
