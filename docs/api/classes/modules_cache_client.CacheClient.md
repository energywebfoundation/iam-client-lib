# Class: CacheClient

[modules/cache-client](../modules/modules_cache_client.md).CacheClient

## Implements

- [`ICacheClient`](../interfaces/modules_cache_client.ICacheClient.md)

## Table of contents

### Constructors

- [constructor](modules_cache_client.CacheClient.md#constructor)

### Properties

- [pubKeyAndIdentityToken](modules_cache_client.CacheClient.md#pubkeyandidentitytoken)

### Accessors

- [http](modules_cache_client.CacheClient.md#http)

### Methods

- [addDIDToWatchList](modules_cache_client.CacheClient.md#adddidtowatchlist)
- [authenticate](modules_cache_client.CacheClient.md#authenticate)
- [deleteClaim](modules_cache_client.CacheClient.md#deleteclaim)
- [getAllowedRolesByIssuer](modules_cache_client.CacheClient.md#getallowedrolesbyissuer)
- [getAppDefinition](modules_cache_client.CacheClient.md#getappdefinition)
- [getApplicationRoles](modules_cache_client.CacheClient.md#getapplicationroles)
- [getApplicationsByOrganization](modules_cache_client.CacheClient.md#getapplicationsbyorganization)
- [getApplicationsByOwner](modules_cache_client.CacheClient.md#getapplicationsbyowner)
- [getAssetById](modules_cache_client.CacheClient.md#getassetbyid)
- [getAssetHistory](modules_cache_client.CacheClient.md#getassethistory)
- [getClaimById](modules_cache_client.CacheClient.md#getclaimbyid)
- [getClaimsByIssuer](modules_cache_client.CacheClient.md#getclaimsbyissuer)
- [getClaimsByRequester](modules_cache_client.CacheClient.md#getclaimsbyrequester)
- [getClaimsBySubject](modules_cache_client.CacheClient.md#getclaimsbysubject)
- [getClaimsBySubjects](modules_cache_client.CacheClient.md#getclaimsbysubjects)
- [getDIDsForRole](modules_cache_client.CacheClient.md#getdidsforrole)
- [getDidDocument](modules_cache_client.CacheClient.md#getdiddocument)
- [getNamespaceBySearchPhrase](modules_cache_client.CacheClient.md#getnamespacebysearchphrase)
- [getOfferedAssets](modules_cache_client.CacheClient.md#getofferedassets)
- [getOrgDefinition](modules_cache_client.CacheClient.md#getorgdefinition)
- [getOrgHierarchy](modules_cache_client.CacheClient.md#getorghierarchy)
- [getOrganizationRoles](modules_cache_client.CacheClient.md#getorganizationroles)
- [getOrganizationsByOwner](modules_cache_client.CacheClient.md#getorganizationsbyowner)
- [getOwnedAssets](modules_cache_client.CacheClient.md#getownedassets)
- [getPreviouslyOwnedAssets](modules_cache_client.CacheClient.md#getpreviouslyownedassets)
- [getRoleDefinition](modules_cache_client.CacheClient.md#getroledefinition)
- [getRolesByOwner](modules_cache_client.CacheClient.md#getrolesbyowner)
- [getRolesDefinition](modules_cache_client.CacheClient.md#getrolesdefinition)
- [getSubOrganizationsByOrganization](modules_cache_client.CacheClient.md#getsuborganizationsbyorganization)
- [handleError](modules_cache_client.CacheClient.md#handleerror)
- [init](modules_cache_client.CacheClient.md#init)
- [isAuthEnabled](modules_cache_client.CacheClient.md#isauthenabled)
- [issueClaim](modules_cache_client.CacheClient.md#issueclaim)
- [login](modules_cache_client.CacheClient.md#login)
- [rejectClaim](modules_cache_client.CacheClient.md#rejectclaim)
- [requestClaim](modules_cache_client.CacheClient.md#requestclaim)

## Constructors

### constructor

• **new CacheClient**(`_signerService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_signerService` | [`SignerService`](modules_signer.SignerService.md) |

## Properties

### pubKeyAndIdentityToken

• **pubKeyAndIdentityToken**: `undefined` \| [`IPubKeyAndIdentityToken`](../interfaces/modules_signer.IPubKeyAndIdentityToken.md)

#### Implementation of

[ICacheClient](../interfaces/modules_cache_client.ICacheClient.md).[pubKeyAndIdentityToken](../interfaces/modules_cache_client.ICacheClient.md#pubkeyandidentitytoken)

## Accessors

### http

• `get` **http**(): `AxiosInstance`

#### Returns

`AxiosInstance`

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

[ICacheClient](../interfaces/modules_cache_client.ICacheClient.md).[addDIDToWatchList](../interfaces/modules_cache_client.ICacheClient.md#adddidtowatchlist)

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

[ICacheClient](../interfaces/modules_cache_client.ICacheClient.md).[deleteClaim](../interfaces/modules_cache_client.ICacheClient.md#deleteclaim)

___

### getAllowedRolesByIssuer

▸ **getAllowedRolesByIssuer**(`did`): `Promise`<[`IRole`](../interfaces/modules_domains.IRole.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `did` | `string` |

#### Returns

`Promise`<[`IRole`](../interfaces/modules_domains.IRole.md)[]\>

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

[ICacheClient](../interfaces/modules_cache_client.ICacheClient.md).[getAppDefinition](../interfaces/modules_cache_client.ICacheClient.md#getappdefinition)

___

### getApplicationRoles

▸ **getApplicationRoles**(`namespace`): `Promise`<[`IRole`](../interfaces/modules_domains.IRole.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<[`IRole`](../interfaces/modules_domains.IRole.md)[]\>

#### Implementation of

[ICacheClient](../interfaces/modules_cache_client.ICacheClient.md).[getApplicationRoles](../interfaces/modules_cache_client.ICacheClient.md#getapplicationroles)

___

### getApplicationsByOrganization

▸ **getApplicationsByOrganization**(`namespace`): `Promise`<[`IApp`](../interfaces/modules_domains.IApp.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<[`IApp`](../interfaces/modules_domains.IApp.md)[]\>

#### Implementation of

[ICacheClient](../interfaces/modules_cache_client.ICacheClient.md).[getApplicationsByOrganization](../interfaces/modules_cache_client.ICacheClient.md#getapplicationsbyorganization)

___

### getApplicationsByOwner

▸ **getApplicationsByOwner**(`owner`, `withRelations?`): `Promise`<[`IApp`](../interfaces/modules_domains.IApp.md)[]\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `owner` | `string` | `undefined` |
| `withRelations` | `boolean` | `true` |

#### Returns

`Promise`<[`IApp`](../interfaces/modules_domains.IApp.md)[]\>

#### Implementation of

[ICacheClient](../interfaces/modules_cache_client.ICacheClient.md).[getApplicationsByOwner](../interfaces/modules_cache_client.ICacheClient.md#getapplicationsbyowner)

___

### getAssetById

▸ **getAssetById**(`id`): `Promise`<[`Asset`](../interfaces/modules_assets.Asset.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`<[`Asset`](../interfaces/modules_assets.Asset.md)\>

#### Implementation of

[ICacheClient](../interfaces/modules_cache_client.ICacheClient.md).[getAssetById](../interfaces/modules_cache_client.ICacheClient.md#getassetbyid)

___

### getAssetHistory

▸ **getAssetHistory**(`id`, `__namedParameters?`): `Promise`<[`AssetHistory`](../interfaces/modules_assets.AssetHistory.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `__namedParameters` | [`AssetsFilter`](../modules/modules_cache_client.md#assetsfilter) |

#### Returns

`Promise`<[`AssetHistory`](../interfaces/modules_assets.AssetHistory.md)[]\>

#### Implementation of

[ICacheClient](../interfaces/modules_cache_client.ICacheClient.md).[getAssetHistory](../interfaces/modules_cache_client.ICacheClient.md#getassethistory)

___

### getClaimById

▸ **getClaimById**(`claimId`): `Promise`<`undefined` \| [`Claim`](../interfaces/modules_claims.Claim.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `claimId` | `string` |

#### Returns

`Promise`<`undefined` \| [`Claim`](../interfaces/modules_claims.Claim.md)\>

#### Implementation of

[ICacheClient](../interfaces/modules_cache_client.ICacheClient.md).[getClaimById](../interfaces/modules_cache_client.ICacheClient.md#getclaimbyid)

___

### getClaimsByIssuer

▸ **getClaimsByIssuer**(`issuer`, `__namedParameters?`): `Promise`<[`Claim`](../interfaces/modules_claims.Claim.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `issuer` | `string` |
| `__namedParameters` | [`ClaimsFilter`](../modules/modules_cache_client.md#claimsfilter) |

#### Returns

`Promise`<[`Claim`](../interfaces/modules_claims.Claim.md)[]\>

#### Implementation of

[ICacheClient](../interfaces/modules_cache_client.ICacheClient.md).[getClaimsByIssuer](../interfaces/modules_cache_client.ICacheClient.md#getclaimsbyissuer)

___

### getClaimsByRequester

▸ **getClaimsByRequester**(`requester`, `__namedParameters?`): `Promise`<[`Claim`](../interfaces/modules_claims.Claim.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `requester` | `string` |
| `__namedParameters` | [`ClaimsFilter`](../modules/modules_cache_client.md#claimsfilter) |

#### Returns

`Promise`<[`Claim`](../interfaces/modules_claims.Claim.md)[]\>

#### Implementation of

[ICacheClient](../interfaces/modules_cache_client.ICacheClient.md).[getClaimsByRequester](../interfaces/modules_cache_client.ICacheClient.md#getclaimsbyrequester)

___

### getClaimsBySubject

▸ **getClaimsBySubject**(`subject`, `__namedParameters?`): `Promise`<[`Claim`](../interfaces/modules_claims.Claim.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `subject` | `string` |
| `__namedParameters` | [`ClaimsFilter`](../modules/modules_cache_client.md#claimsfilter) |

#### Returns

`Promise`<[`Claim`](../interfaces/modules_claims.Claim.md)[]\>

#### Implementation of

[ICacheClient](../interfaces/modules_cache_client.ICacheClient.md).[getClaimsBySubject](../interfaces/modules_cache_client.ICacheClient.md#getclaimsbysubject)

___

### getClaimsBySubjects

▸ **getClaimsBySubjects**(`subjects`): `Promise`<[`Claim`](../interfaces/modules_claims.Claim.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `subjects` | `string`[] |

#### Returns

`Promise`<[`Claim`](../interfaces/modules_claims.Claim.md)[]\>

#### Implementation of

[ICacheClient](../interfaces/modules_cache_client.ICacheClient.md).[getClaimsBySubjects](../interfaces/modules_cache_client.ICacheClient.md#getclaimsbysubjects)

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

[ICacheClient](../interfaces/modules_cache_client.ICacheClient.md).[getDIDsForRole](../interfaces/modules_cache_client.ICacheClient.md#getdidsforrole)

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

[ICacheClient](../interfaces/modules_cache_client.ICacheClient.md).[getDidDocument](../interfaces/modules_cache_client.ICacheClient.md#getdiddocument)

___

### getNamespaceBySearchPhrase

▸ **getNamespaceBySearchPhrase**(`search`, `types?`): `Promise`<([`IRole`](../interfaces/modules_domains.IRole.md) \| [`IOrganization`](../interfaces/modules_domains.IOrganization.md) \| [`IApp`](../interfaces/modules_domains.IApp.md))[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `search` | `string` |
| `types?` | [`SearchType`](../enums/modules_cache_client.SearchType.md)[] |

#### Returns

`Promise`<([`IRole`](../interfaces/modules_domains.IRole.md) \| [`IOrganization`](../interfaces/modules_domains.IOrganization.md) \| [`IApp`](../interfaces/modules_domains.IApp.md))[]\>

#### Implementation of

[ICacheClient](../interfaces/modules_cache_client.ICacheClient.md).[getNamespaceBySearchPhrase](../interfaces/modules_cache_client.ICacheClient.md#getnamespacebysearchphrase)

___

### getOfferedAssets

▸ **getOfferedAssets**(`did`): `Promise`<[`Asset`](../interfaces/modules_assets.Asset.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `did` | `string` |

#### Returns

`Promise`<[`Asset`](../interfaces/modules_assets.Asset.md)[]\>

#### Implementation of

[ICacheClient](../interfaces/modules_cache_client.ICacheClient.md).[getOfferedAssets](../interfaces/modules_cache_client.ICacheClient.md#getofferedassets)

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

[ICacheClient](../interfaces/modules_cache_client.ICacheClient.md).[getOrgDefinition](../interfaces/modules_cache_client.ICacheClient.md#getorgdefinition)

___

### getOrgHierarchy

▸ **getOrgHierarchy**(`namespace`): `Promise`<[`IOrganization`](../interfaces/modules_domains.IOrganization.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<[`IOrganization`](../interfaces/modules_domains.IOrganization.md)\>

#### Implementation of

[ICacheClient](../interfaces/modules_cache_client.ICacheClient.md).[getOrgHierarchy](../interfaces/modules_cache_client.ICacheClient.md#getorghierarchy)

___

### getOrganizationRoles

▸ **getOrganizationRoles**(`namespace`): `Promise`<[`IRole`](../interfaces/modules_domains.IRole.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<[`IRole`](../interfaces/modules_domains.IRole.md)[]\>

#### Implementation of

[ICacheClient](../interfaces/modules_cache_client.ICacheClient.md).[getOrganizationRoles](../interfaces/modules_cache_client.ICacheClient.md#getorganizationroles)

___

### getOrganizationsByOwner

▸ **getOrganizationsByOwner**(`owner`, `withRelations?`): `Promise`<[`IOrganization`](../interfaces/modules_domains.IOrganization.md)[]\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `owner` | `string` | `undefined` |
| `withRelations` | `boolean` | `true` |

#### Returns

`Promise`<[`IOrganization`](../interfaces/modules_domains.IOrganization.md)[]\>

#### Implementation of

[ICacheClient](../interfaces/modules_cache_client.ICacheClient.md).[getOrganizationsByOwner](../interfaces/modules_cache_client.ICacheClient.md#getorganizationsbyowner)

___

### getOwnedAssets

▸ **getOwnedAssets**(`did`): `Promise`<[`Asset`](../interfaces/modules_assets.Asset.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `did` | `string` |

#### Returns

`Promise`<[`Asset`](../interfaces/modules_assets.Asset.md)[]\>

#### Implementation of

[ICacheClient](../interfaces/modules_cache_client.ICacheClient.md).[getOwnedAssets](../interfaces/modules_cache_client.ICacheClient.md#getownedassets)

___

### getPreviouslyOwnedAssets

▸ **getPreviouslyOwnedAssets**(`owner`): `Promise`<[`Asset`](../interfaces/modules_assets.Asset.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `owner` | `string` |

#### Returns

`Promise`<[`Asset`](../interfaces/modules_assets.Asset.md)[]\>

#### Implementation of

[ICacheClient](../interfaces/modules_cache_client.ICacheClient.md).[getPreviouslyOwnedAssets](../interfaces/modules_cache_client.ICacheClient.md#getpreviouslyownedassets)

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

[ICacheClient](../interfaces/modules_cache_client.ICacheClient.md).[getRoleDefinition](../interfaces/modules_cache_client.ICacheClient.md#getroledefinition)

___

### getRolesByOwner

▸ **getRolesByOwner**(`owner`): `Promise`<[`IRole`](../interfaces/modules_domains.IRole.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `owner` | `string` |

#### Returns

`Promise`<[`IRole`](../interfaces/modules_domains.IRole.md)[]\>

#### Implementation of

[ICacheClient](../interfaces/modules_cache_client.ICacheClient.md).[getRolesByOwner](../interfaces/modules_cache_client.ICacheClient.md#getrolesbyowner)

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

[ICacheClient](../interfaces/modules_cache_client.ICacheClient.md).[getRolesDefinition](../interfaces/modules_cache_client.ICacheClient.md#getrolesdefinition)

___

### getSubOrganizationsByOrganization

▸ **getSubOrganizationsByOrganization**(`namespace`): `Promise`<[`IOrganization`](../interfaces/modules_domains.IOrganization.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<[`IOrganization`](../interfaces/modules_domains.IOrganization.md)[]\>

#### Implementation of

[ICacheClient](../interfaces/modules_cache_client.ICacheClient.md).[getSubOrganizationsByOrganization](../interfaces/modules_cache_client.ICacheClient.md#getsuborganizationsbyorganization)

___

### handleError

▸ **handleError**(`error`): `Promise`<`unknown`\>

**`description`** Interceptor of authentication errors. Queues failed requests and starts authentication process.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `error` | `AxiosError`<`unknown`, `any`\> | Intercepted response from failed request |

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

[ICacheClient](../interfaces/modules_cache_client.ICacheClient.md).[isAuthEnabled](../interfaces/modules_cache_client.ICacheClient.md#isauthenabled)

___

### issueClaim

▸ **issueClaim**(`issuer`, `message`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `issuer` | `string` |
| `message` | [`IClaimIssuance`](../interfaces/modules_claims.IClaimIssuance.md) |

#### Returns

`Promise`<`void`\>

#### Implementation of

[ICacheClient](../interfaces/modules_cache_client.ICacheClient.md).[issueClaim](../interfaces/modules_cache_client.ICacheClient.md#issueclaim)

___

### login

▸ **login**(): `Promise`<`void`\>

Verifies current session and establishes new one if needed
https://energyweb.atlassian.net/wiki/spaces/MYEN/pages/2303295607/ICL-+ICS+Auth+Process

#### Returns

`Promise`<`void`\>

#### Implementation of

[ICacheClient](../interfaces/modules_cache_client.ICacheClient.md).[login](../interfaces/modules_cache_client.ICacheClient.md#login)

___

### rejectClaim

▸ **rejectClaim**(`issuer`, `message`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `issuer` | `string` |
| `message` | [`IClaimRejection`](../interfaces/modules_claims.IClaimRejection.md) |

#### Returns

`Promise`<`void`\>

#### Implementation of

[ICacheClient](../interfaces/modules_cache_client.ICacheClient.md).[rejectClaim](../interfaces/modules_cache_client.ICacheClient.md#rejectclaim)

___

### requestClaim

▸ **requestClaim**(`message`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`IClaimRequest`](../interfaces/modules_claims.IClaimRequest.md) |

#### Returns

`Promise`<`void`\>

#### Implementation of

[ICacheClient](../interfaces/modules_cache_client.ICacheClient.md).[requestClaim](../interfaces/modules_cache_client.ICacheClient.md#requestclaim)
