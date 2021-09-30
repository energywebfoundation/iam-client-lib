# Class: CacheClient

[modules/cacheClient/cacheClient.service](../modules/modules_cacheClient_cacheClient_service.md).CacheClient

## Implements

- [`ICacheClient`](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md)

## Table of contents

### Constructors

- [constructor](modules_cacheClient_cacheClient_service.CacheClient.md#constructor)

### Properties

- [pubKeyAndIdentityToken](modules_cacheClient_cacheClient_service.CacheClient.md#pubkeyandidentitytoken)

### Methods

- [addDIDToWatchList](modules_cacheClient_cacheClient_service.CacheClient.md#adddidtowatchlist)
- [addFailedRequest](modules_cacheClient_cacheClient_service.CacheClient.md#addfailedrequest)
- [deleteClaim](modules_cacheClient_cacheClient_service.CacheClient.md#deleteclaim)
- [getAppDefinition](modules_cacheClient_cacheClient_service.CacheClient.md#getappdefinition)
- [getApplicationRoles](modules_cacheClient_cacheClient_service.CacheClient.md#getapplicationroles)
- [getApplicationsByOrganization](modules_cacheClient_cacheClient_service.CacheClient.md#getapplicationsbyorganization)
- [getApplicationsByOwner](modules_cacheClient_cacheClient_service.CacheClient.md#getapplicationsbyowner)
- [getAssetById](modules_cacheClient_cacheClient_service.CacheClient.md#getassetbyid)
- [getAssetHistory](modules_cacheClient_cacheClient_service.CacheClient.md#getassethistory)
- [getClaimsByIssuer](modules_cacheClient_cacheClient_service.CacheClient.md#getclaimsbyissuer)
- [getClaimsByRequester](modules_cacheClient_cacheClient_service.CacheClient.md#getclaimsbyrequester)
- [getClaimsBySubject](modules_cacheClient_cacheClient_service.CacheClient.md#getclaimsbysubject)
- [getClaimsBySubjects](modules_cacheClient_cacheClient_service.CacheClient.md#getclaimsbysubjects)
- [getDIDsForRole](modules_cacheClient_cacheClient_service.CacheClient.md#getdidsforrole)
- [getDidDocument](modules_cacheClient_cacheClient_service.CacheClient.md#getdiddocument)
- [getNamespaceBySearchPhrase](modules_cacheClient_cacheClient_service.CacheClient.md#getnamespacebysearchphrase)
- [getOfferedAssets](modules_cacheClient_cacheClient_service.CacheClient.md#getofferedassets)
- [getOrgDefinition](modules_cacheClient_cacheClient_service.CacheClient.md#getorgdefinition)
- [getOrgHierarchy](modules_cacheClient_cacheClient_service.CacheClient.md#getorghierarchy)
- [getOrganizationRoles](modules_cacheClient_cacheClient_service.CacheClient.md#getorganizationroles)
- [getOrganizationsByOwner](modules_cacheClient_cacheClient_service.CacheClient.md#getorganizationsbyowner)
- [getOwnedAssets](modules_cacheClient_cacheClient_service.CacheClient.md#getownedassets)
- [getPreviouslyOwnedAssets](modules_cacheClient_cacheClient_service.CacheClient.md#getpreviouslyownedassets)
- [getRoleDefinition](modules_cacheClient_cacheClient_service.CacheClient.md#getroledefinition)
- [getRolesByOwner](modules_cacheClient_cacheClient_service.CacheClient.md#getrolesbyowner)
- [getSubOrganizationsByOrganization](modules_cacheClient_cacheClient_service.CacheClient.md#getsuborganizationsbyorganization)
- [handleRefreshToken](modules_cacheClient_cacheClient_service.CacheClient.md#handlerefreshtoken)
- [handleUnauthorized](modules_cacheClient_cacheClient_service.CacheClient.md#handleunauthorized)
- [init](modules_cacheClient_cacheClient_service.CacheClient.md#init)
- [isAuthEnabled](modules_cacheClient_cacheClient_service.CacheClient.md#isauthenabled)
- [issueClaim](modules_cacheClient_cacheClient_service.CacheClient.md#issueclaim)
- [login](modules_cacheClient_cacheClient_service.CacheClient.md#login)
- [rejectClaim](modules_cacheClient_cacheClient_service.CacheClient.md#rejectclaim)
- [requestClaim](modules_cacheClient_cacheClient_service.CacheClient.md#requestclaim)
- [testLogin](modules_cacheClient_cacheClient_service.CacheClient.md#testlogin)

## Constructors

### constructor

• **new CacheClient**(`_signerService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_signerService` | [`SignerService`](modules_signer_signer_service.SignerService.md) |

## Properties

### pubKeyAndIdentityToken

• **pubKeyAndIdentityToken**: `undefined` \| [`IPubKeyAndIdentityToken`](../interfaces/modules_signer_signer_types.IPubKeyAndIdentityToken.md)

#### Implementation of

[ICacheClient](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md).[pubKeyAndIdentityToken](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md#pubkeyandidentitytoken)

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

#### Implementation of

[ICacheClient](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md).[addDIDToWatchList](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md#adddidtowatchlist)

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
| `__namedParameters` | `Object` |
| `__namedParameters.claimId` | `string` |

#### Returns

`Promise`<`void`\>

#### Implementation of

[ICacheClient](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md).[deleteClaim](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md#deleteclaim)

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

#### Implementation of

[ICacheClient](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md).[getAppDefinition](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md#getappdefinition)

___

### getApplicationRoles

▸ **getApplicationRoles**(`__namedParameters`): `Promise`<[`IRole`](../interfaces/modules_domains_domains_types.IRole.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.namespace` | `string` |

#### Returns

`Promise`<[`IRole`](../interfaces/modules_domains_domains_types.IRole.md)[]\>

#### Implementation of

[ICacheClient](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md).[getApplicationRoles](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md#getapplicationroles)

___

### getApplicationsByOrganization

▸ **getApplicationsByOrganization**(`__namedParameters`): `Promise`<[`IApp`](../interfaces/modules_domains_domains_types.IApp.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.namespace` | `string` |

#### Returns

`Promise`<[`IApp`](../interfaces/modules_domains_domains_types.IApp.md)[]\>

#### Implementation of

[ICacheClient](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md).[getApplicationsByOrganization](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md#getapplicationsbyorganization)

___

### getApplicationsByOwner

▸ **getApplicationsByOwner**(`__namedParameters`): `Promise`<[`IApp`](../interfaces/modules_domains_domains_types.IApp.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.owner` | `string` |

#### Returns

`Promise`<[`IApp`](../interfaces/modules_domains_domains_types.IApp.md)[]\>

#### Implementation of

[ICacheClient](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md).[getApplicationsByOwner](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md#getapplicationsbyowner)

___

### getAssetById

▸ **getAssetById**(`__namedParameters`): `Promise`<[`Asset`](../interfaces/modules_assets_assets_types.Asset.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.id` | `string` |

#### Returns

`Promise`<[`Asset`](../interfaces/modules_assets_assets_types.Asset.md)\>

#### Implementation of

[ICacheClient](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md).[getAssetById](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md#getassetbyid)

___

### getAssetHistory

▸ **getAssetHistory**(`__namedParameters`): `Promise`<[`AssetHistory`](../interfaces/modules_assets_assets_types.AssetHistory.md)[]\>

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

`Promise`<[`AssetHistory`](../interfaces/modules_assets_assets_types.AssetHistory.md)[]\>

#### Implementation of

[ICacheClient](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md).[getAssetHistory](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md#getassethistory)

___

### getClaimsByIssuer

▸ **getClaimsByIssuer**(`__namedParameters`): `Promise`<[`Claim`](../interfaces/modules_claims_claims_types.Claim.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.did` | `string` |
| `__namedParameters.isAccepted?` | `boolean` |
| `__namedParameters.namespace?` | `string` |

#### Returns

`Promise`<[`Claim`](../interfaces/modules_claims_claims_types.Claim.md)[]\>

#### Implementation of

[ICacheClient](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md).[getClaimsByIssuer](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md#getclaimsbyissuer)

___

### getClaimsByRequester

▸ **getClaimsByRequester**(`__namedParameters`): `Promise`<[`Claim`](../interfaces/modules_claims_claims_types.Claim.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.did` | `string` |
| `__namedParameters.isAccepted?` | `boolean` |
| `__namedParameters.namespace?` | `string` |

#### Returns

`Promise`<[`Claim`](../interfaces/modules_claims_claims_types.Claim.md)[]\>

#### Implementation of

[ICacheClient](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md).[getClaimsByRequester](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md#getclaimsbyrequester)

___

### getClaimsBySubject

▸ **getClaimsBySubject**(`__namedParameters`): `Promise`<[`Claim`](../interfaces/modules_claims_claims_types.Claim.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.did` | `string` |
| `__namedParameters.isAccepted?` | `boolean` |
| `__namedParameters.namespace?` | `string` |

#### Returns

`Promise`<[`Claim`](../interfaces/modules_claims_claims_types.Claim.md)[]\>

#### Implementation of

[ICacheClient](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md).[getClaimsBySubject](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md#getclaimsbysubject)

___

### getClaimsBySubjects

▸ **getClaimsBySubjects**(`subjects`): `Promise`<[`Claim`](../interfaces/modules_claims_claims_types.Claim.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `subjects` | `string`[] |

#### Returns

`Promise`<[`Claim`](../interfaces/modules_claims_claims_types.Claim.md)[]\>

#### Implementation of

[ICacheClient](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md).[getClaimsBySubjects](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md#getclaimsbysubjects)

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

#### Implementation of

[ICacheClient](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md).[getDIDsForRole](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md#getdidsforrole)

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

#### Implementation of

[ICacheClient](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md).[getDidDocument](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md#getdiddocument)

___

### getNamespaceBySearchPhrase

▸ **getNamespaceBySearchPhrase**(`__namedParameters`): `Promise`<([`IRole`](../interfaces/modules_domains_domains_types.IRole.md) \| [`IOrganization`](../interfaces/modules_domains_domains_types.IOrganization.md) \| [`IApp`](../interfaces/modules_domains_domains_types.IApp.md))[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.search` | `string` |
| `__namedParameters.types?` | (``"App"`` \| ``"Org"`` \| ``"Role"``)[] |

#### Returns

`Promise`<([`IRole`](../interfaces/modules_domains_domains_types.IRole.md) \| [`IOrganization`](../interfaces/modules_domains_domains_types.IOrganization.md) \| [`IApp`](../interfaces/modules_domains_domains_types.IApp.md))[]\>

#### Implementation of

[ICacheClient](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md).[getNamespaceBySearchPhrase](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md#getnamespacebysearchphrase)

___

### getOfferedAssets

▸ **getOfferedAssets**(`__namedParameters`): `Promise`<[`Asset`](../interfaces/modules_assets_assets_types.Asset.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.did` | `string` |

#### Returns

`Promise`<[`Asset`](../interfaces/modules_assets_assets_types.Asset.md)[]\>

#### Implementation of

[ICacheClient](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md).[getOfferedAssets](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md#getofferedassets)

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

#### Implementation of

[ICacheClient](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md).[getOrgDefinition](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md#getorgdefinition)

___

### getOrgHierarchy

▸ **getOrgHierarchy**(`__namedParameters`): `Promise`<[`IOrganization`](../interfaces/modules_domains_domains_types.IOrganization.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.namespace` | `string` |

#### Returns

`Promise`<[`IOrganization`](../interfaces/modules_domains_domains_types.IOrganization.md)\>

#### Implementation of

[ICacheClient](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md).[getOrgHierarchy](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md#getorghierarchy)

___

### getOrganizationRoles

▸ **getOrganizationRoles**(`__namedParameters`): `Promise`<[`IRole`](../interfaces/modules_domains_domains_types.IRole.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.namespace` | `string` |

#### Returns

`Promise`<[`IRole`](../interfaces/modules_domains_domains_types.IRole.md)[]\>

#### Implementation of

[ICacheClient](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md).[getOrganizationRoles](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md#getorganizationroles)

___

### getOrganizationsByOwner

▸ **getOrganizationsByOwner**(`__namedParameters`): `Promise`<[`IOrganization`](../interfaces/modules_domains_domains_types.IOrganization.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.excludeSubOrgs` | `boolean` |
| `__namedParameters.owner` | `string` |

#### Returns

`Promise`<[`IOrganization`](../interfaces/modules_domains_domains_types.IOrganization.md)[]\>

#### Implementation of

[ICacheClient](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md).[getOrganizationsByOwner](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md#getorganizationsbyowner)

___

### getOwnedAssets

▸ **getOwnedAssets**(`__namedParameters`): `Promise`<[`Asset`](../interfaces/modules_assets_assets_types.Asset.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.did` | `string` |

#### Returns

`Promise`<[`Asset`](../interfaces/modules_assets_assets_types.Asset.md)[]\>

#### Implementation of

[ICacheClient](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md).[getOwnedAssets](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md#getownedassets)

___

### getPreviouslyOwnedAssets

▸ **getPreviouslyOwnedAssets**(`__namedParameters`): `Promise`<[`Asset`](../interfaces/modules_assets_assets_types.Asset.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.owner` | `string` |

#### Returns

`Promise`<[`Asset`](../interfaces/modules_assets_assets_types.Asset.md)[]\>

#### Implementation of

[ICacheClient](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md).[getPreviouslyOwnedAssets](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md#getpreviouslyownedassets)

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

#### Implementation of

[ICacheClient](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md).[getRoleDefinition](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md#getroledefinition)

___

### getRolesByOwner

▸ **getRolesByOwner**(`__namedParameters`): `Promise`<[`IRole`](../interfaces/modules_domains_domains_types.IRole.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.owner` | `string` |

#### Returns

`Promise`<[`IRole`](../interfaces/modules_domains_domains_types.IRole.md)[]\>

#### Implementation of

[ICacheClient](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md).[getRolesByOwner](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md#getrolesbyowner)

___

### getSubOrganizationsByOrganization

▸ **getSubOrganizationsByOrganization**(`__namedParameters`): `Promise`<[`IOrganization`](../interfaces/modules_domains_domains_types.IOrganization.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.namespace` | `string` |

#### Returns

`Promise`<[`IOrganization`](../interfaces/modules_domains_domains_types.IOrganization.md)[]\>

#### Implementation of

[ICacheClient](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md).[getSubOrganizationsByOrganization](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md#getsuborganizationsbyorganization)

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

[ICacheClient](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md).[isAuthEnabled](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md#isauthenabled)

___

### issueClaim

▸ **issueClaim**(`__namedParameters`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.did` | `string` |
| `__namedParameters.message` | [`IClaimIssuance`](../interfaces/modules_claims_claims_types.IClaimIssuance.md) |

#### Returns

`Promise`<`void`\>

#### Implementation of

[ICacheClient](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md).[issueClaim](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md#issueclaim)

___

### login

▸ **login**(): `Promise`<`Object`\>

#### Returns

`Promise`<`Object`\>

#### Implementation of

[ICacheClient](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md).[login](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md#login)

___

### rejectClaim

▸ **rejectClaim**(`__namedParameters`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.did` | `string` |
| `__namedParameters.message` | [`IClaimRejection`](../interfaces/modules_claims_claims_types.IClaimRejection.md) |

#### Returns

`Promise`<`void`\>

#### Implementation of

[ICacheClient](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md).[rejectClaim](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md#rejectclaim)

___

### requestClaim

▸ **requestClaim**(`__namedParameters`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.did` | `string` |
| `__namedParameters.message` | [`IClaimRequest`](../interfaces/modules_claims_claims_types.IClaimRequest.md) |

#### Returns

`Promise`<`void`\>

#### Implementation of

[ICacheClient](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md).[requestClaim](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md#requestclaim)

___

### testLogin

▸ **testLogin**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Implementation of

[ICacheClient](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md).[testLogin](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md#testlogin)
