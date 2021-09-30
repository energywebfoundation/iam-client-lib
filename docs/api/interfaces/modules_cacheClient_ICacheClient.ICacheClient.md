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

▸ **getApplicationRoles**(`__namedParameters`): `Promise`<[`IRole`](modules_domains_domains_types.IRole.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.namespace` | `string` |

#### Returns

`Promise`<[`IRole`](modules_domains_domains_types.IRole.md)[]\>

___

### getApplicationsByOrganization

▸ **getApplicationsByOrganization**(`__namedParameters`): `Promise`<[`IApp`](modules_domains_domains_types.IApp.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.namespace` | `string` |

#### Returns

`Promise`<[`IApp`](modules_domains_domains_types.IApp.md)[]\>

___

### getApplicationsByOwner

▸ **getApplicationsByOwner**(`__namedParameters`): `Promise`<[`IApp`](modules_domains_domains_types.IApp.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.owner` | `string` |

#### Returns

`Promise`<[`IApp`](modules_domains_domains_types.IApp.md)[]\>

___

### getAssetById

▸ **getAssetById**(`__namedParameters`): `Promise`<[`Asset`](modules_assets_assets_types.Asset.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.id` | `string` |

#### Returns

`Promise`<[`Asset`](modules_assets_assets_types.Asset.md)\>

___

### getAssetHistory

▸ **getAssetHistory**(`__namedParameters`): `Promise`<[`AssetHistory`](modules_assets_assets_types.AssetHistory.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.id` | `string` |
| `__namedParameters.order?` | [`Order`](../enums/modules_cacheClient_cacheClient_types.Order.md) |
| `__namedParameters.skip?` | `number` |
| `__namedParameters.take?` | `number` |
| `__namedParameters.type?` | [`AssetHistoryEventType`](../enums/modules_assets_assets_types.AssetHistoryEventType.md) |

#### Returns

`Promise`<[`AssetHistory`](modules_assets_assets_types.AssetHistory.md)[]\>

___

### getClaimsByIssuer

▸ **getClaimsByIssuer**(`__namedParameters`): `Promise`<[`Claim`](modules_claims_claims_types.Claim.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.did` | `string` |
| `__namedParameters.isAccepted?` | `boolean` |
| `__namedParameters.parentNamespace?` | `string` |

#### Returns

`Promise`<[`Claim`](modules_claims_claims_types.Claim.md)[]\>

___

### getClaimsByRequester

▸ **getClaimsByRequester**(`__namedParameters`): `Promise`<[`Claim`](modules_claims_claims_types.Claim.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.did` | `string` |
| `__namedParameters.isAccepted?` | `boolean` |
| `__namedParameters.parentNamespace?` | `string` |

#### Returns

`Promise`<[`Claim`](modules_claims_claims_types.Claim.md)[]\>

___

### getClaimsBySubject

▸ **getClaimsBySubject**(`__namedParameters`): `Promise`<[`Claim`](modules_claims_claims_types.Claim.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.did` | `string` |
| `__namedParameters.isAccepted?` | `boolean` |
| `__namedParameters.parentNamespace?` | `string` |

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

▸ **getNamespaceBySearchPhrase**(`__namedParameters`): `Promise`<([`IRole`](modules_domains_domains_types.IRole.md) \| [`IOrganization`](modules_domains_domains_types.IOrganization.md) \| [`IApp`](modules_domains_domains_types.IApp.md))[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.search` | `string` |
| `__namedParameters.types?` | (``"App"`` \| ``"Org"`` \| ``"Role"``)[] |

#### Returns

`Promise`<([`IRole`](modules_domains_domains_types.IRole.md) \| [`IOrganization`](modules_domains_domains_types.IOrganization.md) \| [`IApp`](modules_domains_domains_types.IApp.md))[]\>

___

### getOfferedAssets

▸ **getOfferedAssets**(`__namedParameters`): `Promise`<[`Asset`](modules_assets_assets_types.Asset.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.did` | `string` |

#### Returns

`Promise`<[`Asset`](modules_assets_assets_types.Asset.md)[]\>

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

▸ **getOrgHierarchy**(`__namedParameters`): `Promise`<[`IOrganization`](modules_domains_domains_types.IOrganization.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.namespace` | `string` |

#### Returns

`Promise`<[`IOrganization`](modules_domains_domains_types.IOrganization.md)\>

___

### getOrganizationRoles

▸ **getOrganizationRoles**(`__namedParameters`): `Promise`<[`IRole`](modules_domains_domains_types.IRole.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.namespace` | `string` |

#### Returns

`Promise`<[`IRole`](modules_domains_domains_types.IRole.md)[]\>

___

### getOrganizationsByOwner

▸ **getOrganizationsByOwner**(`__namedParameters`): `Promise`<[`IOrganization`](modules_domains_domains_types.IOrganization.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.excludeSubOrgs` | `boolean` |
| `__namedParameters.owner` | `string` |

#### Returns

`Promise`<[`IOrganization`](modules_domains_domains_types.IOrganization.md)[]\>

___

### getOwnedAssets

▸ **getOwnedAssets**(`__namedParameters`): `Promise`<[`Asset`](modules_assets_assets_types.Asset.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.did` | `string` |

#### Returns

`Promise`<[`Asset`](modules_assets_assets_types.Asset.md)[]\>

___

### getPreviouslyOwnedAssets

▸ **getPreviouslyOwnedAssets**(`__namedParameters`): `Promise`<[`Asset`](modules_assets_assets_types.Asset.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.owner` | `string` |

#### Returns

`Promise`<[`Asset`](modules_assets_assets_types.Asset.md)[]\>

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

▸ **getRolesByOwner**(`__namedParameters`): `Promise`<[`IRole`](modules_domains_domains_types.IRole.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.owner` | `string` |

#### Returns

`Promise`<[`IRole`](modules_domains_domains_types.IRole.md)[]\>

___

### getSubOrganizationsByOrganization

▸ **getSubOrganizationsByOrganization**(`__namedParameters`): `Promise`<[`IOrganization`](modules_domains_domains_types.IOrganization.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.namespace` | `string` |

#### Returns

`Promise`<[`IOrganization`](modules_domains_domains_types.IOrganization.md)[]\>

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
| `__namedParameters.message` | [`IClaimIssuance`](modules_claims_claims_types.IClaimIssuance.md) |

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
| `__namedParameters.message` | [`IClaimRejection`](modules_claims_claims_types.IClaimRejection.md) |

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
| `__namedParameters.message` | [`IClaimRequest`](modules_claims_claims_types.IClaimRequest.md) |

#### Returns

`Promise`<`void`\>

___

### testLogin

▸ **testLogin**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>
