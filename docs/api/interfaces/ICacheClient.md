# Interface: ICacheClient

## Implemented by

- [`CacheClient`](../classes/CacheClient.md)

## Table of contents

### Properties

- [pubKeyAndIdentityToken](ICacheClient.md#pubkeyandidentitytoken)

### Methods

- [addDIDToWatchList](ICacheClient.md#adddidtowatchlist)
- [deleteClaim](ICacheClient.md#deleteclaim)
- [getAppDefinition](ICacheClient.md#getappdefinition)
- [getApplicationRoles](ICacheClient.md#getapplicationroles)
- [getApplicationsByOrganization](ICacheClient.md#getapplicationsbyorganization)
- [getApplicationsByOwner](ICacheClient.md#getapplicationsbyowner)
- [getAssetById](ICacheClient.md#getassetbyid)
- [getAssetHistory](ICacheClient.md#getassethistory)
- [getClaimById](ICacheClient.md#getclaimbyid)
- [getClaimsByIssuer](ICacheClient.md#getclaimsbyissuer)
- [getClaimsByRequester](ICacheClient.md#getclaimsbyrequester)
- [getClaimsBySubject](ICacheClient.md#getclaimsbysubject)
- [getClaimsBySubjects](ICacheClient.md#getclaimsbysubjects)
- [getDIDsForRole](ICacheClient.md#getdidsforrole)
- [getDidDocument](ICacheClient.md#getdiddocument)
- [getNamespaceBySearchPhrase](ICacheClient.md#getnamespacebysearchphrase)
- [getOfferedAssets](ICacheClient.md#getofferedassets)
- [getOrgDefinition](ICacheClient.md#getorgdefinition)
- [getOrgHierarchy](ICacheClient.md#getorghierarchy)
- [getOrganizationRoles](ICacheClient.md#getorganizationroles)
- [getOrganizationsByOwner](ICacheClient.md#getorganizationsbyowner)
- [getOwnedAssets](ICacheClient.md#getownedassets)
- [getPreviouslyOwnedAssets](ICacheClient.md#getpreviouslyownedassets)
- [getRoleDefinition](ICacheClient.md#getroledefinition)
- [getRolesByOwner](ICacheClient.md#getrolesbyowner)
- [getRolesDefinition](ICacheClient.md#getrolesdefinition)
- [getSubOrganizationsByOrganization](ICacheClient.md#getsuborganizationsbyorganization)
- [isAuthEnabled](ICacheClient.md#isauthenabled)
- [issueClaim](ICacheClient.md#issueclaim)
- [login](ICacheClient.md#login)
- [rejectClaim](ICacheClient.md#rejectclaim)
- [requestClaim](ICacheClient.md#requestclaim)

## Properties

### pubKeyAndIdentityToken

• **pubKeyAndIdentityToken**: `undefined` \| [`IPubKeyAndIdentityToken`](IPubKeyAndIdentityToken.md)

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

▸ **getApplicationRoles**(`namespace`): `Promise`<[`IRole`](IRole.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<[`IRole`](IRole.md)[]\>

___

### getApplicationsByOrganization

▸ **getApplicationsByOrganization**(`namespace`): `Promise`<[`IApp`](IApp.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<[`IApp`](IApp.md)[]\>

___

### getApplicationsByOwner

▸ **getApplicationsByOwner**(`owner`): `Promise`<[`IApp`](IApp.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `owner` | `string` |

#### Returns

`Promise`<[`IApp`](IApp.md)[]\>

___

### getAssetById

▸ **getAssetById**(`id`): `Promise`<[`Asset`](Asset.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`<[`Asset`](Asset.md)\>

___

### getAssetHistory

▸ **getAssetHistory**(`id`, `filter?`): `Promise`<[`AssetHistory`](AssetHistory.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `filter?` | [`AssetsFilter`](../modules.md#assetsfilter) |

#### Returns

`Promise`<[`AssetHistory`](AssetHistory.md)[]\>

___

### getClaimById

▸ **getClaimById**(`claimId`): `Promise`<`undefined` \| [`Claim`](Claim.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `claimId` | `string` |

#### Returns

`Promise`<`undefined` \| [`Claim`](Claim.md)\>

___

### getClaimsByIssuer

▸ **getClaimsByIssuer**(`issuer`, `filter?`): `Promise`<[`Claim`](Claim.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `issuer` | `string` |
| `filter?` | [`ClaimsFilter`](../modules.md#claimsfilter) |

#### Returns

`Promise`<[`Claim`](Claim.md)[]\>

___

### getClaimsByRequester

▸ **getClaimsByRequester**(`requester`, `filter?`): `Promise`<[`Claim`](Claim.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `requester` | `string` |
| `filter?` | [`ClaimsFilter`](../modules.md#claimsfilter) |

#### Returns

`Promise`<[`Claim`](Claim.md)[]\>

___

### getClaimsBySubject

▸ **getClaimsBySubject**(`subject`, `filter?`): `Promise`<[`Claim`](Claim.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `subject` | `string` |
| `filter?` | [`ClaimsFilter`](../modules.md#claimsfilter) |

#### Returns

`Promise`<[`Claim`](Claim.md)[]\>

___

### getClaimsBySubjects

▸ **getClaimsBySubjects**(`subjects`): `Promise`<[`Claim`](Claim.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `subjects` | `string`[] |

#### Returns

`Promise`<[`Claim`](Claim.md)[]\>

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

▸ **getNamespaceBySearchPhrase**(`phrase`, `types?`): `Promise`<([`IRole`](IRole.md) \| [`IOrganization`](IOrganization.md) \| [`IApp`](IApp.md))[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `phrase` | `string` |
| `types?` | [`SearchType`](../enums/SearchType.md)[] |

#### Returns

`Promise`<([`IRole`](IRole.md) \| [`IOrganization`](IOrganization.md) \| [`IApp`](IApp.md))[]\>

___

### getOfferedAssets

▸ **getOfferedAssets**(`offeredTo`): `Promise`<[`Asset`](Asset.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `offeredTo` | `string` |

#### Returns

`Promise`<[`Asset`](Asset.md)[]\>

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

▸ **getOrgHierarchy**(`namespace`): `Promise`<[`IOrganization`](IOrganization.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<[`IOrganization`](IOrganization.md)\>

___

### getOrganizationRoles

▸ **getOrganizationRoles**(`namespace`): `Promise`<[`IRole`](IRole.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<[`IRole`](IRole.md)[]\>

___

### getOrganizationsByOwner

▸ **getOrganizationsByOwner**(`owner`, `excludeSubOrgs?`): `Promise`<[`IOrganization`](IOrganization.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `owner` | `string` |
| `excludeSubOrgs?` | `boolean` |

#### Returns

`Promise`<[`IOrganization`](IOrganization.md)[]\>

___

### getOwnedAssets

▸ **getOwnedAssets**(`owner`): `Promise`<[`Asset`](Asset.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `owner` | `string` |

#### Returns

`Promise`<[`Asset`](Asset.md)[]\>

___

### getPreviouslyOwnedAssets

▸ **getPreviouslyOwnedAssets**(`owner`): `Promise`<[`Asset`](Asset.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `owner` | `string` |

#### Returns

`Promise`<[`Asset`](Asset.md)[]\>

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

▸ **getRolesByOwner**(`owner`): `Promise`<[`IRole`](IRole.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `owner` | `string` |

#### Returns

`Promise`<[`IRole`](IRole.md)[]\>

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

▸ **getSubOrganizationsByOrganization**(`namespace`): `Promise`<[`IOrganization`](IOrganization.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<[`IOrganization`](IOrganization.md)[]\>

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
| `message` | [`IClaimIssuance`](IClaimIssuance.md) |

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
| `message` | [`IClaimRejection`](IClaimRejection.md) |

#### Returns

`Promise`<`void`\>

___

### requestClaim

▸ **requestClaim**(`message`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`IClaimRequest`](IClaimRequest.md) |

#### Returns

`Promise`<`void`\>
