# Interface: ICacheClient

[modules/cache-client](../modules/modules_cache_client.md).ICacheClient

## Implemented by

- [`CacheClient`](../classes/modules_cache_client.CacheClient.md)

## Table of contents

### Properties

- [pubKeyAndIdentityToken](modules_cache_client.ICacheClient.md#pubkeyandidentitytoken)

### Methods

- [addDIDToWatchList](modules_cache_client.ICacheClient.md#adddidtowatchlist)
- [deleteClaim](modules_cache_client.ICacheClient.md#deleteclaim)
- [getAppDefinition](modules_cache_client.ICacheClient.md#getappdefinition)
- [getApplicationRoles](modules_cache_client.ICacheClient.md#getapplicationroles)
- [getApplicationsByOrganization](modules_cache_client.ICacheClient.md#getapplicationsbyorganization)
- [getApplicationsByOwner](modules_cache_client.ICacheClient.md#getapplicationsbyowner)
- [getAssetById](modules_cache_client.ICacheClient.md#getassetbyid)
- [getAssetHistory](modules_cache_client.ICacheClient.md#getassethistory)
- [getClaimById](modules_cache_client.ICacheClient.md#getclaimbyid)
- [getClaimsByIssuer](modules_cache_client.ICacheClient.md#getclaimsbyissuer)
- [getClaimsByRequester](modules_cache_client.ICacheClient.md#getclaimsbyrequester)
- [getClaimsByRevoker](modules_cache_client.ICacheClient.md#getclaimsbyrevoker)
- [getClaimsBySubject](modules_cache_client.ICacheClient.md#getclaimsbysubject)
- [getClaimsBySubjects](modules_cache_client.ICacheClient.md#getclaimsbysubjects)
- [getDIDsForRole](modules_cache_client.ICacheClient.md#getdidsforrole)
- [getDidDocument](modules_cache_client.ICacheClient.md#getdiddocument)
- [getNamespaceBySearchPhrase](modules_cache_client.ICacheClient.md#getnamespacebysearchphrase)
- [getOfferedAssets](modules_cache_client.ICacheClient.md#getofferedassets)
- [getOrgDefinition](modules_cache_client.ICacheClient.md#getorgdefinition)
- [getOrgHierarchy](modules_cache_client.ICacheClient.md#getorghierarchy)
- [getOrganizationRoles](modules_cache_client.ICacheClient.md#getorganizationroles)
- [getOrganizationsByOwner](modules_cache_client.ICacheClient.md#getorganizationsbyowner)
- [getOwnedAssets](modules_cache_client.ICacheClient.md#getownedassets)
- [getPreviouslyOwnedAssets](modules_cache_client.ICacheClient.md#getpreviouslyownedassets)
- [getRoleDefinition](modules_cache_client.ICacheClient.md#getroledefinition)
- [getRolesByOwner](modules_cache_client.ICacheClient.md#getrolesbyowner)
- [getRolesByRevoker](modules_cache_client.ICacheClient.md#getrolesbyrevoker)
- [getRolesDefinition](modules_cache_client.ICacheClient.md#getrolesdefinition)
- [getSubOrganizationsByOrganization](modules_cache_client.ICacheClient.md#getsuborganizationsbyorganization)
- [isAuthEnabled](modules_cache_client.ICacheClient.md#isauthenabled)
- [issueClaim](modules_cache_client.ICacheClient.md#issueclaim)
- [login](modules_cache_client.ICacheClient.md#login)
- [rejectClaim](modules_cache_client.ICacheClient.md#rejectclaim)
- [requestClaim](modules_cache_client.ICacheClient.md#requestclaim)

## Properties

### pubKeyAndIdentityToken

• **pubKeyAndIdentityToken**: `undefined` \| [`IPubKeyAndIdentityToken`](modules_signer.IPubKeyAndIdentityToken.md)

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

▸ **getApplicationRoles**(`namespace`): `Promise`<[`IRole`](modules_domains.IRole.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<[`IRole`](modules_domains.IRole.md)[]\>

___

### getApplicationsByOrganization

▸ **getApplicationsByOrganization**(`namespace`): `Promise`<[`IApp`](modules_domains.IApp.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<[`IApp`](modules_domains.IApp.md)[]\>

___

### getApplicationsByOwner

▸ **getApplicationsByOwner**(`owner`): `Promise`<[`IApp`](modules_domains.IApp.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `owner` | `string` |

#### Returns

`Promise`<[`IApp`](modules_domains.IApp.md)[]\>

___

### getAssetById

▸ **getAssetById**(`id`): `Promise`<[`Asset`](modules_assets.Asset.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`<[`Asset`](modules_assets.Asset.md)\>

___

### getAssetHistory

▸ **getAssetHistory**(`id`, `filter?`): `Promise`<[`AssetHistory`](modules_assets.AssetHistory.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `filter?` | [`AssetsFilter`](../modules/modules_cache_client.md#assetsfilter) |

#### Returns

`Promise`<[`AssetHistory`](modules_assets.AssetHistory.md)[]\>

___

### getClaimById

▸ **getClaimById**(`claimId`): `Promise`<`undefined` \| [`Claim`](modules_claims.Claim.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `claimId` | `string` |

#### Returns

`Promise`<`undefined` \| [`Claim`](modules_claims.Claim.md)\>

___

### getClaimsByIssuer

▸ **getClaimsByIssuer**(`issuer`, `filter?`): `Promise`<[`Claim`](modules_claims.Claim.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `issuer` | `string` |
| `filter?` | [`ClaimsFilter`](../modules/modules_cache_client.md#claimsfilter) |

#### Returns

`Promise`<[`Claim`](modules_claims.Claim.md)[]\>

___

### getClaimsByRequester

▸ **getClaimsByRequester**(`requester`, `filter?`): `Promise`<[`Claim`](modules_claims.Claim.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `requester` | `string` |
| `filter?` | [`ClaimsFilter`](../modules/modules_cache_client.md#claimsfilter) |

#### Returns

`Promise`<[`Claim`](modules_claims.Claim.md)[]\>

___

### getClaimsByRevoker

▸ **getClaimsByRevoker**(`revoker`, `filter?`): `Promise`<[`Claim`](modules_claims.Claim.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `revoker` | `string` |
| `filter?` | [`ClaimsFilter`](../modules/modules_cache_client.md#claimsfilter) |

#### Returns

`Promise`<[`Claim`](modules_claims.Claim.md)[]\>

___

### getClaimsBySubject

▸ **getClaimsBySubject**(`subject`, `filter?`): `Promise`<[`Claim`](modules_claims.Claim.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `subject` | `string` |
| `filter?` | [`ClaimsFilter`](../modules/modules_cache_client.md#claimsfilter) |

#### Returns

`Promise`<[`Claim`](modules_claims.Claim.md)[]\>

___

### getClaimsBySubjects

▸ **getClaimsBySubjects**(`subjects`): `Promise`<[`Claim`](modules_claims.Claim.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `subjects` | `string`[] |

#### Returns

`Promise`<[`Claim`](modules_claims.Claim.md)[]\>

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

▸ **getNamespaceBySearchPhrase**(`phrase`, `types?`): `Promise`<([`IRole`](modules_domains.IRole.md) \| [`IOrganization`](modules_domains.IOrganization.md) \| [`IApp`](modules_domains.IApp.md))[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `phrase` | `string` |
| `types?` | [`SearchType`](../enums/modules_cache_client.SearchType.md)[] |

#### Returns

`Promise`<([`IRole`](modules_domains.IRole.md) \| [`IOrganization`](modules_domains.IOrganization.md) \| [`IApp`](modules_domains.IApp.md))[]\>

___

### getOfferedAssets

▸ **getOfferedAssets**(`offeredTo`): `Promise`<[`Asset`](modules_assets.Asset.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `offeredTo` | `string` |

#### Returns

`Promise`<[`Asset`](modules_assets.Asset.md)[]\>

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

▸ **getOrgHierarchy**(`namespace`): `Promise`<[`IOrganization`](modules_domains.IOrganization.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<[`IOrganization`](modules_domains.IOrganization.md)\>

___

### getOrganizationRoles

▸ **getOrganizationRoles**(`namespace`): `Promise`<[`IRole`](modules_domains.IRole.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<[`IRole`](modules_domains.IRole.md)[]\>

___

### getOrganizationsByOwner

▸ **getOrganizationsByOwner**(`owner`, `excludeSubOrgs?`): `Promise`<[`IOrganization`](modules_domains.IOrganization.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `owner` | `string` |
| `excludeSubOrgs?` | `boolean` |

#### Returns

`Promise`<[`IOrganization`](modules_domains.IOrganization.md)[]\>

___

### getOwnedAssets

▸ **getOwnedAssets**(`owner`): `Promise`<[`Asset`](modules_assets.Asset.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `owner` | `string` |

#### Returns

`Promise`<[`Asset`](modules_assets.Asset.md)[]\>

___

### getPreviouslyOwnedAssets

▸ **getPreviouslyOwnedAssets**(`owner`): `Promise`<[`Asset`](modules_assets.Asset.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `owner` | `string` |

#### Returns

`Promise`<[`Asset`](modules_assets.Asset.md)[]\>

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

▸ **getRolesByOwner**(`owner`): `Promise`<[`IRole`](modules_domains.IRole.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `owner` | `string` |

#### Returns

`Promise`<[`IRole`](modules_domains.IRole.md)[]\>

___

### getRolesByRevoker

▸ **getRolesByRevoker**(`revoker`): `Promise`<[`IRole`](modules_domains.IRole.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `revoker` | `string` |

#### Returns

`Promise`<[`IRole`](modules_domains.IRole.md)[]\>

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

▸ **getSubOrganizationsByOrganization**(`namespace`): `Promise`<[`IOrganization`](modules_domains.IOrganization.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<[`IOrganization`](modules_domains.IOrganization.md)[]\>

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
| `message` | [`IClaimIssuance`](modules_claims.IClaimIssuance.md) |

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
| `message` | [`IClaimRejection`](modules_claims.IClaimRejection.md) |

#### Returns

`Promise`<`void`\>

___

### requestClaim

▸ **requestClaim**(`message`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`IClaimRequest`](modules_claims.IClaimRequest.md) |

#### Returns

`Promise`<`void`\>
