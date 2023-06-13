# Interface: ICacheClient

[modules/cache-client](../modules/modules_cache_client.md).ICacheClient

## Implemented by

- [`CacheClient`](../classes/modules_cache_client.CacheClient.md)

## Table of contents

### Properties

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
- [issueClaim](modules_cache_client.ICacheClient.md#issueclaim)
- [rejectClaim](modules_cache_client.ICacheClient.md#rejectclaim)
- [requestClaim](modules_cache_client.ICacheClient.md#requestclaim)

## Properties

### addDIDToWatchList

• **addDIDToWatchList**: (`did`: `string`) => `Promise`<`void`\>

#### Type declaration

▸ (`did`): `Promise`<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `did` | `string` |

##### Returns

`Promise`<`void`\>

___

### deleteClaim

• **deleteClaim**: (`claimId`: `string`) => `Promise`<`void`\>

#### Type declaration

▸ (`claimId`): `Promise`<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `claimId` | `string` |

##### Returns

`Promise`<`void`\>

___

### getAppDefinition

• **getAppDefinition**: (`namespace`: `string`) => `Promise`<`IAppDefinition`\>

#### Type declaration

▸ (`namespace`): `Promise`<`IAppDefinition`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

##### Returns

`Promise`<`IAppDefinition`\>

___

### getApplicationRoles

• **getApplicationRoles**: (`namespace`: `string`) => `Promise`<[`IRole`](modules_domains.IRole.md)[]\>

#### Type declaration

▸ (`namespace`): `Promise`<[`IRole`](modules_domains.IRole.md)[]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

##### Returns

`Promise`<[`IRole`](modules_domains.IRole.md)[]\>

___

### getApplicationsByOrganization

• **getApplicationsByOrganization**: (`namespace`: `string`) => `Promise`<[`IApp`](modules_domains.IApp.md)[]\>

#### Type declaration

▸ (`namespace`): `Promise`<[`IApp`](modules_domains.IApp.md)[]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

##### Returns

`Promise`<[`IApp`](modules_domains.IApp.md)[]\>

___

### getApplicationsByOwner

• **getApplicationsByOwner**: (`owner`: `string`) => `Promise`<[`IApp`](modules_domains.IApp.md)[]\>

#### Type declaration

▸ (`owner`): `Promise`<[`IApp`](modules_domains.IApp.md)[]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `owner` | `string` |

##### Returns

`Promise`<[`IApp`](modules_domains.IApp.md)[]\>

___

### getAssetById

• **getAssetById**: (`id`: `string`) => `Promise`<[`Asset`](modules_assets.Asset.md)\>

#### Type declaration

▸ (`id`): `Promise`<[`Asset`](modules_assets.Asset.md)\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

##### Returns

`Promise`<[`Asset`](modules_assets.Asset.md)\>

___

### getAssetHistory

• **getAssetHistory**: (`id`: `string`, `filter?`: [`AssetsFilter`](../modules/modules_cache_client.md#assetsfilter)) => `Promise`<[`AssetHistory`](modules_assets.AssetHistory.md)[]\>

#### Type declaration

▸ (`id`, `filter?`): `Promise`<[`AssetHistory`](modules_assets.AssetHistory.md)[]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `filter?` | [`AssetsFilter`](../modules/modules_cache_client.md#assetsfilter) |

##### Returns

`Promise`<[`AssetHistory`](modules_assets.AssetHistory.md)[]\>

___

### getClaimById

• **getClaimById**: (`claimId`: `string`) => `Promise`<`undefined` \| [`Claim`](modules_claims.Claim.md)\>

#### Type declaration

▸ (`claimId`): `Promise`<`undefined` \| [`Claim`](modules_claims.Claim.md)\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `claimId` | `string` |

##### Returns

`Promise`<`undefined` \| [`Claim`](modules_claims.Claim.md)\>

___

### getClaimsByIssuer

• **getClaimsByIssuer**: (`issuer`: `string`, `filter?`: [`ClaimsFilter`](../modules/modules_cache_client.md#claimsfilter)) => `Promise`<[`Claim`](modules_claims.Claim.md)[]\>

#### Type declaration

▸ (`issuer`, `filter?`): `Promise`<[`Claim`](modules_claims.Claim.md)[]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `issuer` | `string` |
| `filter?` | [`ClaimsFilter`](../modules/modules_cache_client.md#claimsfilter) |

##### Returns

`Promise`<[`Claim`](modules_claims.Claim.md)[]\>

___

### getClaimsByRequester

• **getClaimsByRequester**: (`requester`: `string`, `filter?`: [`ClaimsFilter`](../modules/modules_cache_client.md#claimsfilter)) => `Promise`<[`Claim`](modules_claims.Claim.md)[]\>

#### Type declaration

▸ (`requester`, `filter?`): `Promise`<[`Claim`](modules_claims.Claim.md)[]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `requester` | `string` |
| `filter?` | [`ClaimsFilter`](../modules/modules_cache_client.md#claimsfilter) |

##### Returns

`Promise`<[`Claim`](modules_claims.Claim.md)[]\>

___

### getClaimsByRevoker

• **getClaimsByRevoker**: (`revoker`: `string`, `filter?`: [`ClaimsFilter`](../modules/modules_cache_client.md#claimsfilter)) => `Promise`<[`Claim`](modules_claims.Claim.md)[]\>

#### Type declaration

▸ (`revoker`, `filter?`): `Promise`<[`Claim`](modules_claims.Claim.md)[]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `revoker` | `string` |
| `filter?` | [`ClaimsFilter`](../modules/modules_cache_client.md#claimsfilter) |

##### Returns

`Promise`<[`Claim`](modules_claims.Claim.md)[]\>

___

### getClaimsBySubject

• **getClaimsBySubject**: (`subject`: `string`, `filter?`: [`ClaimsFilter`](../modules/modules_cache_client.md#claimsfilter)) => `Promise`<[`Claim`](modules_claims.Claim.md)[]\>

#### Type declaration

▸ (`subject`, `filter?`): `Promise`<[`Claim`](modules_claims.Claim.md)[]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `subject` | `string` |
| `filter?` | [`ClaimsFilter`](../modules/modules_cache_client.md#claimsfilter) |

##### Returns

`Promise`<[`Claim`](modules_claims.Claim.md)[]\>

___

### getClaimsBySubjects

• **getClaimsBySubjects**: (`subjects`: `string`[]) => `Promise`<[`Claim`](modules_claims.Claim.md)[]\>

#### Type declaration

▸ (`subjects`): `Promise`<[`Claim`](modules_claims.Claim.md)[]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `subjects` | `string`[] |

##### Returns

`Promise`<[`Claim`](modules_claims.Claim.md)[]\>

___

### getDIDsForRole

• **getDIDsForRole**: (`namespace`: `string`) => `Promise`<`string`[]\>

#### Type declaration

▸ (`namespace`): `Promise`<`string`[]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

##### Returns

`Promise`<`string`[]\>

___

### getDidDocument

• **getDidDocument**: (`did`: `string`, `includeClaims?`: `boolean`) => `Promise`<`IDIDDocument`\>

#### Type declaration

▸ (`did`, `includeClaims?`): `Promise`<`IDIDDocument`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `did` | `string` |
| `includeClaims?` | `boolean` |

##### Returns

`Promise`<`IDIDDocument`\>

___

### getNamespaceBySearchPhrase

• **getNamespaceBySearchPhrase**: (`phrase`: `string`, `types?`: [`SearchType`](../enums/modules_cache_client.SearchType.md)[]) => `Promise`<([`IRole`](modules_domains.IRole.md) \| [`IOrganization`](modules_domains.IOrganization.md) \| [`IApp`](modules_domains.IApp.md))[]\>

#### Type declaration

▸ (`phrase`, `types?`): `Promise`<([`IRole`](modules_domains.IRole.md) \| [`IOrganization`](modules_domains.IOrganization.md) \| [`IApp`](modules_domains.IApp.md))[]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `phrase` | `string` |
| `types?` | [`SearchType`](../enums/modules_cache_client.SearchType.md)[] |

##### Returns

`Promise`<([`IRole`](modules_domains.IRole.md) \| [`IOrganization`](modules_domains.IOrganization.md) \| [`IApp`](modules_domains.IApp.md))[]\>

___

### getOfferedAssets

• **getOfferedAssets**: (`offeredTo`: `string`) => `Promise`<[`Asset`](modules_assets.Asset.md)[]\>

#### Type declaration

▸ (`offeredTo`): `Promise`<[`Asset`](modules_assets.Asset.md)[]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `offeredTo` | `string` |

##### Returns

`Promise`<[`Asset`](modules_assets.Asset.md)[]\>

___

### getOrgDefinition

• **getOrgDefinition**: (`namespace`: `string`) => `Promise`<`IOrganizationDefinition`\>

#### Type declaration

▸ (`namespace`): `Promise`<`IOrganizationDefinition`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

##### Returns

`Promise`<`IOrganizationDefinition`\>

___

### getOrgHierarchy

• **getOrgHierarchy**: (`namespace`: `string`) => `Promise`<[`IOrganization`](modules_domains.IOrganization.md)\>

#### Type declaration

▸ (`namespace`): `Promise`<[`IOrganization`](modules_domains.IOrganization.md)\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

##### Returns

`Promise`<[`IOrganization`](modules_domains.IOrganization.md)\>

___

### getOrganizationRoles

• **getOrganizationRoles**: (`namespace`: `string`) => `Promise`<[`IRole`](modules_domains.IRole.md)[]\>

#### Type declaration

▸ (`namespace`): `Promise`<[`IRole`](modules_domains.IRole.md)[]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

##### Returns

`Promise`<[`IRole`](modules_domains.IRole.md)[]\>

___

### getOrganizationsByOwner

• **getOrganizationsByOwner**: (`owner`: `string`, `excludeSubOrgs?`: `boolean`) => `Promise`<[`IOrganization`](modules_domains.IOrganization.md)[]\>

#### Type declaration

▸ (`owner`, `excludeSubOrgs?`): `Promise`<[`IOrganization`](modules_domains.IOrganization.md)[]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `owner` | `string` |
| `excludeSubOrgs?` | `boolean` |

##### Returns

`Promise`<[`IOrganization`](modules_domains.IOrganization.md)[]\>

___

### getOwnedAssets

• **getOwnedAssets**: (`owner`: `string`) => `Promise`<[`Asset`](modules_assets.Asset.md)[]\>

#### Type declaration

▸ (`owner`): `Promise`<[`Asset`](modules_assets.Asset.md)[]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `owner` | `string` |

##### Returns

`Promise`<[`Asset`](modules_assets.Asset.md)[]\>

___

### getPreviouslyOwnedAssets

• **getPreviouslyOwnedAssets**: (`owner`: `string`) => `Promise`<[`Asset`](modules_assets.Asset.md)[]\>

#### Type declaration

▸ (`owner`): `Promise`<[`Asset`](modules_assets.Asset.md)[]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `owner` | `string` |

##### Returns

`Promise`<[`Asset`](modules_assets.Asset.md)[]\>

___

### getRoleDefinition

• **getRoleDefinition**: (`namespace`: `string`) => `Promise`<`IRoleDefinition`\>

#### Type declaration

▸ (`namespace`): `Promise`<`IRoleDefinition`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

##### Returns

`Promise`<`IRoleDefinition`\>

___

### getRolesByOwner

• **getRolesByOwner**: (`owner`: `string`) => `Promise`<[`IRole`](modules_domains.IRole.md)[]\>

#### Type declaration

▸ (`owner`): `Promise`<[`IRole`](modules_domains.IRole.md)[]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `owner` | `string` |

##### Returns

`Promise`<[`IRole`](modules_domains.IRole.md)[]\>

___

### getRolesByRevoker

• **getRolesByRevoker**: (`revoker`: `string`) => `Promise`<[`IRole`](modules_domains.IRole.md)[]\>

#### Type declaration

▸ (`revoker`): `Promise`<[`IRole`](modules_domains.IRole.md)[]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `revoker` | `string` |

##### Returns

`Promise`<[`IRole`](modules_domains.IRole.md)[]\>

___

### getRolesDefinition

• **getRolesDefinition**: (`namespace`: `string`[]) => `Promise`<`Record`<`string`, `IRoleDefinition`\>\>

#### Type declaration

▸ (`namespace`): `Promise`<`Record`<`string`, `IRoleDefinition`\>\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string`[] |

##### Returns

`Promise`<`Record`<`string`, `IRoleDefinition`\>\>

___

### getSubOrganizationsByOrganization

• **getSubOrganizationsByOrganization**: (`namespace`: `string`) => `Promise`<[`IOrganization`](modules_domains.IOrganization.md)[]\>

#### Type declaration

▸ (`namespace`): `Promise`<[`IOrganization`](modules_domains.IOrganization.md)[]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

##### Returns

`Promise`<[`IOrganization`](modules_domains.IOrganization.md)[]\>

___

### issueClaim

• **issueClaim**: (`issuer`: `string`, `message`: [`IClaimIssuance`](modules_claims.IClaimIssuance.md)) => `Promise`<`void`\>

#### Type declaration

▸ (`issuer`, `message`): `Promise`<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `issuer` | `string` |
| `message` | [`IClaimIssuance`](modules_claims.IClaimIssuance.md) |

##### Returns

`Promise`<`void`\>

___

### rejectClaim

• **rejectClaim**: (`issuer`: `string`, `message`: [`IClaimRejection`](modules_claims.IClaimRejection.md)) => `Promise`<`void`\>

#### Type declaration

▸ (`issuer`, `message`): `Promise`<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `issuer` | `string` |
| `message` | [`IClaimRejection`](modules_claims.IClaimRejection.md) |

##### Returns

`Promise`<`void`\>

___

### requestClaim

• **requestClaim**: (`message`: [`IClaimRequest`](modules_claims.IClaimRequest.md)) => `Promise`<`void`\>

#### Type declaration

▸ (`message`): `Promise`<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`IClaimRequest`](modules_claims.IClaimRequest.md) |

##### Returns

`Promise`<`void`\>
