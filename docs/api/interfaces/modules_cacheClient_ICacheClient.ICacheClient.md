# Interface: ICacheClient

[modules/cacheClient/ICacheClient](../modules/modules_cacheClient_ICacheClient.md).ICacheClient

## Implemented by

- [`CacheClient`](../classes/modules_cacheClient_cacheClient_service.CacheClient.md)

## Table of contents

### Properties

- [pubKeyAndIdentityToken](modules_cacheClient_ICacheClient.ICacheClient.md#pubkeyandidentitytoken)

### Methods

- [addDIDToWatchList](modules_cacheClient_ICacheClient.ICacheClient.md#adddidtowatchlist)
- [deleteClaim](modules_cacheClient_ICacheClient.ICacheClient.md#deleteclaim)
- [getAppDefinition](modules_cacheClient_ICacheClient.ICacheClient.md#getappdefinition)
- [getApplicationRoles](modules_cacheClient_ICacheClient.ICacheClient.md#getapplicationroles)
- [getApplicationsByOrganization](modules_cacheClient_ICacheClient.ICacheClient.md#getapplicationsbyorganization)
- [getApplicationsByOwner](modules_cacheClient_ICacheClient.ICacheClient.md#getapplicationsbyowner)
- [getAssetById](modules_cacheClient_ICacheClient.ICacheClient.md#getassetbyid)
- [getAssetHistory](modules_cacheClient_ICacheClient.ICacheClient.md#getassethistory)
- [getClaimsByIssuer](modules_cacheClient_ICacheClient.ICacheClient.md#getclaimsbyissuer)
- [getClaimsByRequester](modules_cacheClient_ICacheClient.ICacheClient.md#getclaimsbyrequester)
- [getClaimsBySubject](modules_cacheClient_ICacheClient.ICacheClient.md#getclaimsbysubject)
- [getClaimsBySubjects](modules_cacheClient_ICacheClient.ICacheClient.md#getclaimsbysubjects)
- [getDIDsForRole](modules_cacheClient_ICacheClient.ICacheClient.md#getdidsforrole)
- [getDidDocument](modules_cacheClient_ICacheClient.ICacheClient.md#getdiddocument)
- [getNamespaceBySearchPhrase](modules_cacheClient_ICacheClient.ICacheClient.md#getnamespacebysearchphrase)
- [getOfferedAssets](modules_cacheClient_ICacheClient.ICacheClient.md#getofferedassets)
- [getOrgDefinition](modules_cacheClient_ICacheClient.ICacheClient.md#getorgdefinition)
- [getOrgHierarchy](modules_cacheClient_ICacheClient.ICacheClient.md#getorghierarchy)
- [getOrganizationRoles](modules_cacheClient_ICacheClient.ICacheClient.md#getorganizationroles)
- [getOrganizationsByOwner](modules_cacheClient_ICacheClient.ICacheClient.md#getorganizationsbyowner)
- [getOwnedAssets](modules_cacheClient_ICacheClient.ICacheClient.md#getownedassets)
- [getPreviouslyOwnedAssets](modules_cacheClient_ICacheClient.ICacheClient.md#getpreviouslyownedassets)
- [getRoleDefinition](modules_cacheClient_ICacheClient.ICacheClient.md#getroledefinition)
- [getRolesByOwner](modules_cacheClient_ICacheClient.ICacheClient.md#getrolesbyowner)
- [getRolesDefinition](modules_cacheClient_ICacheClient.ICacheClient.md#getrolesdefinition)
- [getSubOrganizationsByOrganization](modules_cacheClient_ICacheClient.ICacheClient.md#getsuborganizationsbyorganization)
- [isAuthEnabled](modules_cacheClient_ICacheClient.ICacheClient.md#isauthenabled)
- [issueClaim](modules_cacheClient_ICacheClient.ICacheClient.md#issueclaim)
- [login](modules_cacheClient_ICacheClient.ICacheClient.md#login)
- [rejectClaim](modules_cacheClient_ICacheClient.ICacheClient.md#rejectclaim)
- [requestClaim](modules_cacheClient_ICacheClient.ICacheClient.md#requestclaim)
- [testLogin](modules_cacheClient_ICacheClient.ICacheClient.md#testlogin)

## Properties

### pubKeyAndIdentityToken

• **pubKeyAndIdentityToken**: `undefined` \| [`IPubKeyAndIdentityToken`](modules_signer_signer_types.IPubKeyAndIdentityToken.md)

## Methods

### addDIDToWatchList

▸ **addDIDToWatchList**(`did`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `did` | `string` |

#### Returns

`Promise`<`void`\>

___

### deleteClaim

▸ **deleteClaim**(`claimId`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `claimId` | `string` |

#### Returns

`Promise`<`void`\>

___

### getAppDefinition

▸ **getAppDefinition**(`namespace`): `Promise`<`IAppDefinition`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<`IAppDefinition`\>

___

### getApplicationRoles

▸ **getApplicationRoles**(`namespace`): `Promise`<[`IRole`](modules_domains_domains_types.IRole.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<[`IRole`](modules_domains_domains_types.IRole.md)[]\>

___

### getApplicationsByOrganization

▸ **getApplicationsByOrganization**(`namespace`): `Promise`<[`IApp`](modules_domains_domains_types.IApp.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<[`IApp`](modules_domains_domains_types.IApp.md)[]\>

___

### getApplicationsByOwner

▸ **getApplicationsByOwner**(`owner`): `Promise`<[`IApp`](modules_domains_domains_types.IApp.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `owner` | `string` |

#### Returns

`Promise`<[`IApp`](modules_domains_domains_types.IApp.md)[]\>

___

### getAssetById

▸ **getAssetById**(`id`): `Promise`<[`Asset`](modules_assets_assets_types.Asset.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`<[`Asset`](modules_assets_assets_types.Asset.md)\>

___

### getAssetHistory

▸ **getAssetHistory**(`id`, `filter?`): `Promise`<[`AssetHistory`](modules_assets_assets_types.AssetHistory.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `filter?` | [`AssetsFilter`](../modules/modules_cacheClient_cacheClient_types.md#assetsfilter) |

#### Returns

`Promise`<[`AssetHistory`](modules_assets_assets_types.AssetHistory.md)[]\>

___

### getClaimsByIssuer

▸ **getClaimsByIssuer**(`issuer`, `filter?`): `Promise`<[`Claim`](modules_claims_claims_types.Claim.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `issuer` | `string` |
| `filter?` | [`ClaimsFilter`](../modules/modules_cacheClient_cacheClient_types.md#claimsfilter) |

#### Returns

`Promise`<[`Claim`](modules_claims_claims_types.Claim.md)[]\>

___

### getClaimsByRequester

▸ **getClaimsByRequester**(`requester`, `filter?`): `Promise`<[`Claim`](modules_claims_claims_types.Claim.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `requester` | `string` |
| `filter?` | [`ClaimsFilter`](../modules/modules_cacheClient_cacheClient_types.md#claimsfilter) |

#### Returns

`Promise`<[`Claim`](modules_claims_claims_types.Claim.md)[]\>

___

### getClaimsBySubject

▸ **getClaimsBySubject**(`subject`, `filter?`): `Promise`<[`Claim`](modules_claims_claims_types.Claim.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `subject` | `string` |
| `filter?` | [`ClaimsFilter`](../modules/modules_cacheClient_cacheClient_types.md#claimsfilter) |

#### Returns

`Promise`<[`Claim`](modules_claims_claims_types.Claim.md)[]\>

___

### getClaimsBySubjects

▸ **getClaimsBySubjects**(`subjects`): `Promise`<[`Claim`](modules_claims_claims_types.Claim.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `subjects` | `string`[] |

#### Returns

`Promise`<[`Claim`](modules_claims_claims_types.Claim.md)[]\>

___

### getDIDsForRole

▸ **getDIDsForRole**(`namespace`): `Promise`<`string`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<`string`[]\>

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

___

### getNamespaceBySearchPhrase

▸ **getNamespaceBySearchPhrase**(`phrase`, `types?`): `Promise`<([`IRole`](modules_domains_domains_types.IRole.md) \| [`IOrganization`](modules_domains_domains_types.IOrganization.md) \| [`IApp`](modules_domains_domains_types.IApp.md))[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `phrase` | `string` |
| `types?` | [`SearchType`](../enums/modules_cacheClient_cacheClient_types.SearchType.md)[] |

#### Returns

`Promise`<([`IRole`](modules_domains_domains_types.IRole.md) \| [`IOrganization`](modules_domains_domains_types.IOrganization.md) \| [`IApp`](modules_domains_domains_types.IApp.md))[]\>

___

### getOfferedAssets

▸ **getOfferedAssets**(`offeredTo`): `Promise`<[`Asset`](modules_assets_assets_types.Asset.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `offeredTo` | `string` |

#### Returns

`Promise`<[`Asset`](modules_assets_assets_types.Asset.md)[]\>

___

### getOrgDefinition

▸ **getOrgDefinition**(`namespace`): `Promise`<`IOrganizationDefinition`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<`IOrganizationDefinition`\>

___

### getOrgHierarchy

▸ **getOrgHierarchy**(`namespace`): `Promise`<[`IOrganization`](modules_domains_domains_types.IOrganization.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<[`IOrganization`](modules_domains_domains_types.IOrganization.md)\>

___

### getOrganizationRoles

▸ **getOrganizationRoles**(`namespace`): `Promise`<[`IRole`](modules_domains_domains_types.IRole.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<[`IRole`](modules_domains_domains_types.IRole.md)[]\>

___

### getOrganizationsByOwner

▸ **getOrganizationsByOwner**(`owner`, `excludeSubOrgs?`): `Promise`<[`IOrganization`](modules_domains_domains_types.IOrganization.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `owner` | `string` |
| `excludeSubOrgs?` | `boolean` |

#### Returns

`Promise`<[`IOrganization`](modules_domains_domains_types.IOrganization.md)[]\>

___

### getOwnedAssets

▸ **getOwnedAssets**(`owner`): `Promise`<[`Asset`](modules_assets_assets_types.Asset.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `owner` | `string` |

#### Returns

`Promise`<[`Asset`](modules_assets_assets_types.Asset.md)[]\>

___

### getPreviouslyOwnedAssets

▸ **getPreviouslyOwnedAssets**(`owner`): `Promise`<[`Asset`](modules_assets_assets_types.Asset.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `owner` | `string` |

#### Returns

`Promise`<[`Asset`](modules_assets_assets_types.Asset.md)[]\>

___

### getRoleDefinition

▸ **getRoleDefinition**(`namespace`): `Promise`<`IRoleDefinition`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<`IRoleDefinition`\>

___

### getRolesByOwner

▸ **getRolesByOwner**(`owner`): `Promise`<[`IRole`](modules_domains_domains_types.IRole.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `owner` | `string` |

#### Returns

`Promise`<[`IRole`](modules_domains_domains_types.IRole.md)[]\>

___

### getRolesDefinition

▸ **getRolesDefinition**(`namespace`): `Promise`<`Record`<`string`, `IRoleDefinition`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string`[] |

#### Returns

`Promise`<`Record`<`string`, `IRoleDefinition`\>\>

___

### getSubOrganizationsByOrganization

▸ **getSubOrganizationsByOrganization**(`namespace`): `Promise`<[`IOrganization`](modules_domains_domains_types.IOrganization.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<[`IOrganization`](modules_domains_domains_types.IOrganization.md)[]\>

___

### isAuthEnabled

▸ **isAuthEnabled**(): `boolean`

#### Returns

`boolean`

___

### issueClaim

▸ **issueClaim**(`issuer`, `message`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `issuer` | `string` |
| `message` | [`IClaimIssuance`](modules_claims_claims_types.IClaimIssuance.md) |

#### Returns

`Promise`<`void`\>

___

### login

▸ **login**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

___

### rejectClaim

▸ **rejectClaim**(`issuer`, `message`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `issuer` | `string` |
| `message` | [`IClaimRejection`](modules_claims_claims_types.IClaimRejection.md) |

#### Returns

`Promise`<`void`\>

___

### requestClaim

▸ **requestClaim**(`requester`, `message`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `requester` | `string` |
| `message` | [`IClaimRequest`](modules_claims_claims_types.IClaimRequest.md) |

#### Returns

`Promise`<`void`\>

___

### testLogin

▸ **testLogin**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>
