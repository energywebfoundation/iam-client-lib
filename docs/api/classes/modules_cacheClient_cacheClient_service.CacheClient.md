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
- [authenticate](modules_cacheClient_cacheClient_service.CacheClient.md#authenticate)
- [deleteClaim](modules_cacheClient_cacheClient_service.CacheClient.md#deleteclaim)
- [getAllowedRolesByIssuer](modules_cacheClient_cacheClient_service.CacheClient.md#getallowedrolesbyissuer)
- [getAppDefinition](modules_cacheClient_cacheClient_service.CacheClient.md#getappdefinition)
- [getApplicationRoles](modules_cacheClient_cacheClient_service.CacheClient.md#getapplicationroles)
- [getApplicationsByOrganization](modules_cacheClient_cacheClient_service.CacheClient.md#getapplicationsbyorganization)
- [getApplicationsByOwner](modules_cacheClient_cacheClient_service.CacheClient.md#getapplicationsbyowner)
- [getAssetById](modules_cacheClient_cacheClient_service.CacheClient.md#getassetbyid)
- [getAssetHistory](modules_cacheClient_cacheClient_service.CacheClient.md#getassethistory)
- [getClaimById](modules_cacheClient_cacheClient_service.CacheClient.md#getclaimbyid)
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
- [getRolesDefinition](modules_cacheClient_cacheClient_service.CacheClient.md#getrolesdefinition)
- [getSubOrganizationsByOrganization](modules_cacheClient_cacheClient_service.CacheClient.md#getsuborganizationsbyorganization)
- [handleError](modules_cacheClient_cacheClient_service.CacheClient.md#handleerror)
- [init](modules_cacheClient_cacheClient_service.CacheClient.md#init)
- [isAuthEnabled](modules_cacheClient_cacheClient_service.CacheClient.md#isauthenabled)
- [issueClaim](modules_cacheClient_cacheClient_service.CacheClient.md#issueclaim)
- [login](modules_cacheClient_cacheClient_service.CacheClient.md#login)
- [rejectClaim](modules_cacheClient_cacheClient_service.CacheClient.md#rejectclaim)
- [requestClaim](modules_cacheClient_cacheClient_service.CacheClient.md#requestclaim)

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

▸ **addDIDToWatchList**(`did`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `did` | `string` |

#### Returns

`Promise`<`void`\>

#### Implementation of

[ICacheClient](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md).[addDIDToWatchList](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md#adddidtowatchlist)

___

### authenticate

▸ **authenticate**(): `Promise`<`void`\>

**`description`** Refreshes access token. If login still fails then signs new identity token and requests access token
After authentication runs previously failed requests

#### Returns

`Promise`<`void`\>

___

### deleteClaim

▸ **deleteClaim**(`id`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`<`void`\>

#### Implementation of

[ICacheClient](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md).[deleteClaim](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md#deleteclaim)

___

### getAllowedRolesByIssuer

▸ **getAllowedRolesByIssuer**(`did`): `Promise`<`string`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `did` | `string` |

#### Returns

`Promise`<`string`[]\>

___

### getAppDefinition

▸ **getAppDefinition**(`namespace`): `Promise`<`IAppDefinition`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<`IAppDefinition`\>

#### Implementation of

[ICacheClient](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md).[getAppDefinition](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md#getappdefinition)

___

### getApplicationRoles

▸ **getApplicationRoles**(`namespace`): `Promise`<[`IRole`](../interfaces/modules_domains_domains_types.IRole.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<[`IRole`](../interfaces/modules_domains_domains_types.IRole.md)[]\>

#### Implementation of

[ICacheClient](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md).[getApplicationRoles](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md#getapplicationroles)

___

### getApplicationsByOrganization

▸ **getApplicationsByOrganization**(`namespace`): `Promise`<[`IApp`](../interfaces/modules_domains_domains_types.IApp.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<[`IApp`](../interfaces/modules_domains_domains_types.IApp.md)[]\>

#### Implementation of

[ICacheClient](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md).[getApplicationsByOrganization](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md#getapplicationsbyorganization)

___

### getApplicationsByOwner

▸ **getApplicationsByOwner**(`owner`, `withRelations?`): `Promise`<[`IApp`](../interfaces/modules_domains_domains_types.IApp.md)[]\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `owner` | `string` | `undefined` |
| `withRelations` | `boolean` | `true` |

#### Returns

`Promise`<[`IApp`](../interfaces/modules_domains_domains_types.IApp.md)[]\>

#### Implementation of

[ICacheClient](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md).[getApplicationsByOwner](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md#getapplicationsbyowner)

___

### getAssetById

▸ **getAssetById**(`id`): `Promise`<[`Asset`](../interfaces/modules_assets_assets_types.Asset.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`<[`Asset`](../interfaces/modules_assets_assets_types.Asset.md)\>

#### Implementation of

[ICacheClient](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md).[getAssetById](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md#getassetbyid)

___

### getAssetHistory

▸ **getAssetHistory**(`id`, `__namedParameters?`): `Promise`<[`AssetHistory`](../interfaces/modules_assets_assets_types.AssetHistory.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `__namedParameters` | [`AssetsFilter`](../modules/modules_cacheClient_cacheClient_types.md#assetsfilter) |

#### Returns

`Promise`<[`AssetHistory`](../interfaces/modules_assets_assets_types.AssetHistory.md)[]\>

#### Implementation of

[ICacheClient](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md).[getAssetHistory](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md#getassethistory)

___

### getClaimById

▸ **getClaimById**(`claimId`): `Promise`<`undefined` \| [`Claim`](../interfaces/modules_claims_claims_types.Claim.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `claimId` | `string` |

#### Returns

`Promise`<`undefined` \| [`Claim`](../interfaces/modules_claims_claims_types.Claim.md)\>

#### Implementation of

[ICacheClient](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md).[getClaimById](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md#getclaimbyid)

___

### getClaimsByIssuer

▸ **getClaimsByIssuer**(`issuer`, `__namedParameters?`): `Promise`<[`Claim`](../interfaces/modules_claims_claims_types.Claim.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `issuer` | `string` |
| `__namedParameters` | [`ClaimsFilter`](../modules/modules_cacheClient_cacheClient_types.md#claimsfilter) |

#### Returns

`Promise`<[`Claim`](../interfaces/modules_claims_claims_types.Claim.md)[]\>

#### Implementation of

[ICacheClient](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md).[getClaimsByIssuer](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md#getclaimsbyissuer)

___

### getClaimsByRequester

▸ **getClaimsByRequester**(`requester`, `__namedParameters?`): `Promise`<[`Claim`](../interfaces/modules_claims_claims_types.Claim.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `requester` | `string` |
| `__namedParameters` | [`ClaimsFilter`](../modules/modules_cacheClient_cacheClient_types.md#claimsfilter) |

#### Returns

`Promise`<[`Claim`](../interfaces/modules_claims_claims_types.Claim.md)[]\>

#### Implementation of

[ICacheClient](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md).[getClaimsByRequester](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md#getclaimsbyrequester)

___

### getClaimsBySubject

▸ **getClaimsBySubject**(`subject`, `__namedParameters?`): `Promise`<[`Claim`](../interfaces/modules_claims_claims_types.Claim.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `subject` | `string` |
| `__namedParameters` | [`ClaimsFilter`](../modules/modules_cacheClient_cacheClient_types.md#claimsfilter) |

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

▸ **getDIDsForRole**(`namespace`): `Promise`<`string`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<`string`[]\>

#### Implementation of

[ICacheClient](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md).[getDIDsForRole](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md#getdidsforrole)

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

#### Implementation of

[ICacheClient](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md).[getDidDocument](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md#getdiddocument)

___

### getNamespaceBySearchPhrase

▸ **getNamespaceBySearchPhrase**(`search`, `types?`): `Promise`<([`IRole`](../interfaces/modules_domains_domains_types.IRole.md) \| [`IOrganization`](../interfaces/modules_domains_domains_types.IOrganization.md) \| [`IApp`](../interfaces/modules_domains_domains_types.IApp.md))[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `search` | `string` |
| `types?` | [`SearchType`](../enums/modules_cacheClient_cacheClient_types.SearchType.md)[] |

#### Returns

`Promise`<([`IRole`](../interfaces/modules_domains_domains_types.IRole.md) \| [`IOrganization`](../interfaces/modules_domains_domains_types.IOrganization.md) \| [`IApp`](../interfaces/modules_domains_domains_types.IApp.md))[]\>

#### Implementation of

[ICacheClient](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md).[getNamespaceBySearchPhrase](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md#getnamespacebysearchphrase)

___

### getOfferedAssets

▸ **getOfferedAssets**(`did`): `Promise`<[`Asset`](../interfaces/modules_assets_assets_types.Asset.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `did` | `string` |

#### Returns

`Promise`<[`Asset`](../interfaces/modules_assets_assets_types.Asset.md)[]\>

#### Implementation of

[ICacheClient](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md).[getOfferedAssets](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md#getofferedassets)

___

### getOrgDefinition

▸ **getOrgDefinition**(`namespace`): `Promise`<`IOrganizationDefinition`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<`IOrganizationDefinition`\>

#### Implementation of

[ICacheClient](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md).[getOrgDefinition](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md#getorgdefinition)

___

### getOrgHierarchy

▸ **getOrgHierarchy**(`namespace`): `Promise`<[`IOrganization`](../interfaces/modules_domains_domains_types.IOrganization.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<[`IOrganization`](../interfaces/modules_domains_domains_types.IOrganization.md)\>

#### Implementation of

[ICacheClient](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md).[getOrgHierarchy](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md#getorghierarchy)

___

### getOrganizationRoles

▸ **getOrganizationRoles**(`namespace`): `Promise`<[`IRole`](../interfaces/modules_domains_domains_types.IRole.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<[`IRole`](../interfaces/modules_domains_domains_types.IRole.md)[]\>

#### Implementation of

[ICacheClient](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md).[getOrganizationRoles](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md#getorganizationroles)

___

### getOrganizationsByOwner

▸ **getOrganizationsByOwner**(`owner`, `withRelations?`): `Promise`<[`IOrganization`](../interfaces/modules_domains_domains_types.IOrganization.md)[]\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `owner` | `string` | `undefined` |
| `withRelations` | `boolean` | `true` |

#### Returns

`Promise`<[`IOrganization`](../interfaces/modules_domains_domains_types.IOrganization.md)[]\>

#### Implementation of

[ICacheClient](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md).[getOrganizationsByOwner](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md#getorganizationsbyowner)

___

### getOwnedAssets

▸ **getOwnedAssets**(`did`): `Promise`<[`Asset`](../interfaces/modules_assets_assets_types.Asset.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `did` | `string` |

#### Returns

`Promise`<[`Asset`](../interfaces/modules_assets_assets_types.Asset.md)[]\>

#### Implementation of

[ICacheClient](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md).[getOwnedAssets](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md#getownedassets)

___

### getPreviouslyOwnedAssets

▸ **getPreviouslyOwnedAssets**(`owner`): `Promise`<[`Asset`](../interfaces/modules_assets_assets_types.Asset.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `owner` | `string` |

#### Returns

`Promise`<[`Asset`](../interfaces/modules_assets_assets_types.Asset.md)[]\>

#### Implementation of

[ICacheClient](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md).[getPreviouslyOwnedAssets](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md#getpreviouslyownedassets)

___

### getRoleDefinition

▸ **getRoleDefinition**(`namespace`): `Promise`<`IRoleDefinition`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<`IRoleDefinition`\>

#### Implementation of

[ICacheClient](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md).[getRoleDefinition](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md#getroledefinition)

___

### getRolesByOwner

▸ **getRolesByOwner**(`owner`): `Promise`<[`IRole`](../interfaces/modules_domains_domains_types.IRole.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `owner` | `string` |

#### Returns

`Promise`<[`IRole`](../interfaces/modules_domains_domains_types.IRole.md)[]\>

#### Implementation of

[ICacheClient](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md).[getRolesByOwner](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md#getrolesbyowner)

___

### getRolesDefinition

▸ **getRolesDefinition**(`namespaces`): `Promise`<`Record`<`string`, `IRoleDefinition`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespaces` | `string`[] |

#### Returns

`Promise`<`Record`<`string`, `IRoleDefinition`\>\>

#### Implementation of

[ICacheClient](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md).[getRolesDefinition](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md#getrolesdefinition)

___

### getSubOrganizationsByOrganization

▸ **getSubOrganizationsByOrganization**(`namespace`): `Promise`<[`IOrganization`](../interfaces/modules_domains_domains_types.IOrganization.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<[`IOrganization`](../interfaces/modules_domains_domains_types.IOrganization.md)[]\>

#### Implementation of

[ICacheClient](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md).[getSubOrganizationsByOrganization](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md#getsuborganizationsbyorganization)

___

### handleError

▸ **handleError**(`error`): `Promise`<`unknown`\>

**`description`** Interceptor of authentication errors. Queues failed requests and starts authentication process.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `error` | `AxiosError`<`any`\> | Intercepted response from failed request |

#### Returns

`Promise`<`unknown`\>

Promise, which resolves with result of resending of failed request

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

▸ **issueClaim**(`issuer`, `message`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `issuer` | `string` |
| `message` | [`IClaimIssuance`](../interfaces/modules_claims_claims_types.IClaimIssuance.md) |

#### Returns

`Promise`<`void`\>

#### Implementation of

[ICacheClient](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md).[issueClaim](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md#issueclaim)

___

### login

▸ **login**(): `Promise`<`void`\>

Verifies current session and establishes new one if needed
https://energyweb.atlassian.net/wiki/spaces/MYEN/pages/2303295607/ICL-+ICS+Auth+Process

#### Returns

`Promise`<`void`\>

#### Implementation of

[ICacheClient](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md).[login](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md#login)

___

### rejectClaim

▸ **rejectClaim**(`issuer`, `message`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `issuer` | `string` |
| `message` | [`IClaimRejection`](../interfaces/modules_claims_claims_types.IClaimRejection.md) |

#### Returns

`Promise`<`void`\>

#### Implementation of

[ICacheClient](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md).[rejectClaim](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md#rejectclaim)

___

### requestClaim

▸ **requestClaim**(`requester`, `message`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `requester` | `string` |
| `message` | [`IClaimRequest`](../interfaces/modules_claims_claims_types.IClaimRequest.md) |

#### Returns

`Promise`<`void`\>

#### Implementation of

[ICacheClient](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md).[requestClaim](../interfaces/modules_cacheClient_ICacheClient.ICacheClient.md#requestclaim)
