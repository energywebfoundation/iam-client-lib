# Class: CacheClient

[modules/cache-client](../modules/modules_cache_client.md).CacheClient

## Implements

- [`ICacheClient`](../interfaces/modules_cache_client.ICacheClient.md)

## Table of contents

### Constructors

- [constructor](modules_cache_client.CacheClient.md#constructor)

### Accessors

- [http](modules_cache_client.CacheClient.md#http)

### Methods

- [addDIDToWatchList](modules_cache_client.CacheClient.md#adddidtowatchlist)
- [addStatusToCredential](modules_cache_client.CacheClient.md#addstatustocredential)
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
- [getClaimsByRevoker](modules_cache_client.CacheClient.md#getclaimsbyrevoker)
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
- [getRolesByRevoker](modules_cache_client.CacheClient.md#getrolesbyrevoker)
- [getRolesDefinition](modules_cache_client.CacheClient.md#getrolesdefinition)
- [getStatusListCredential](modules_cache_client.CacheClient.md#getstatuslistcredential)
- [getSubOrganizationsByOrganization](modules_cache_client.CacheClient.md#getsuborganizationsbyorganization)
- [init](modules_cache_client.CacheClient.md#init)
- [initiateCredentialStatusUpdate](modules_cache_client.CacheClient.md#initiatecredentialstatusupdate)
- [isAuthEnabled](modules_cache_client.CacheClient.md#isauthenabled)
- [isAuthenticated](modules_cache_client.CacheClient.md#isauthenticated)
- [issueClaim](modules_cache_client.CacheClient.md#issueclaim)
- [login](modules_cache_client.CacheClient.md#login)
- [persistCredentialStatusUpdate](modules_cache_client.CacheClient.md#persistcredentialstatusupdate)
- [rejectClaim](modules_cache_client.CacheClient.md#rejectclaim)
- [requestClaim](modules_cache_client.CacheClient.md#requestclaim)

## Constructors

### constructor

• **new CacheClient**(`_signerService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_signerService` | [`SignerService`](modules_signer.SignerService.md) |

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

ICacheClient.addDIDToWatchList

___

### addStatusToCredential

▸ **addStatusToCredential**(`credential`): `Promise`<`Credential`<[`RoleCredentialSubject`](../interfaces/modules_verifiable_credentials.RoleCredentialSubject.md)\> & { `credentialStatus`: `StatusList2021Entry`  }\>

Sets location of the credential status

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `credential` | `Credential`<[`RoleCredentialSubject`](../interfaces/modules_verifiable_credentials.RoleCredentialSubject.md)\> | unsigned credential |

#### Returns

`Promise`<`Credential`<[`RoleCredentialSubject`](../interfaces/modules_verifiable_credentials.RoleCredentialSubject.md)\> & { `credentialStatus`: `StatusList2021Entry`  }\>

credential with reference to status location

___

### authenticate

▸ **authenticate**(): `Promise`<`void`\>

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

ICacheClient.deleteClaim

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

ICacheClient.getAppDefinition

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

ICacheClient.getApplicationRoles

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

ICacheClient.getApplicationsByOrganization

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

ICacheClient.getApplicationsByOwner

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

ICacheClient.getAssetById

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

ICacheClient.getAssetHistory

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

ICacheClient.getClaimById

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

ICacheClient.getClaimsByIssuer

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

ICacheClient.getClaimsByRequester

___

### getClaimsByRevoker

▸ **getClaimsByRevoker**(`revoker`, `__namedParameters?`): `Promise`<[`Claim`](../interfaces/modules_claims.Claim.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `revoker` | `string` |
| `__namedParameters` | [`ClaimsFilter`](../modules/modules_cache_client.md#claimsfilter) |

#### Returns

`Promise`<[`Claim`](../interfaces/modules_claims.Claim.md)[]\>

#### Implementation of

ICacheClient.getClaimsByRevoker

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

ICacheClient.getClaimsBySubject

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

ICacheClient.getClaimsBySubjects

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

ICacheClient.getDIDsForRole

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

ICacheClient.getDidDocument

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

ICacheClient.getNamespaceBySearchPhrase

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

ICacheClient.getOfferedAssets

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

ICacheClient.getOrgDefinition

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

ICacheClient.getOrgHierarchy

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

ICacheClient.getOrganizationRoles

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

ICacheClient.getOrganizationsByOwner

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

ICacheClient.getOwnedAssets

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

ICacheClient.getPreviouslyOwnedAssets

___

### getRoleDefinition

▸ **getRoleDefinition**(`namespace`): `Promise`<`IRoleDefinition` \| `IRoleDefinitionV2`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<`IRoleDefinition` \| `IRoleDefinitionV2`\>

#### Implementation of

ICacheClient.getRoleDefinition

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

ICacheClient.getRolesByOwner

___

### getRolesByRevoker

▸ **getRolesByRevoker**(`revoker`): `Promise`<[`IRole`](../interfaces/modules_domains.IRole.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `revoker` | `string` |

#### Returns

`Promise`<[`IRole`](../interfaces/modules_domains.IRole.md)[]\>

#### Implementation of

ICacheClient.getRolesByRevoker

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

ICacheClient.getRolesDefinition

___

### getStatusListCredential

▸ **getStatusListCredential**(`credential`): `Promise`<``null`` \| [`StatusList2021Credential`](../modules/modules_verifiable_credentials.md#statuslist2021credential)\>

Fetch the StatusList2021Credential object from storage.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `credential` | `VerifiableCredential`<[`RoleCredentialSubject`](../interfaces/modules_verifiable_credentials.RoleCredentialSubject.md)\> | verifiable credential with status list 2021 |

#### Returns

`Promise`<``null`` \| [`StatusList2021Credential`](../modules/modules_verifiable_credentials.md#statuslist2021credential)\>

status list credential if found

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

ICacheClient.getSubOrganizationsByOrganization

___

### init

▸ **init**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

___

### initiateCredentialStatusUpdate

▸ **initiateCredentialStatusUpdate**(`verifiableCredential`): `Promise`<[`StatusList2021UnsignedCredential`](../interfaces/modules_verifiable_credentials.StatusList2021UnsignedCredential.md)\>

Get the StatusList2021Credential object to be signed

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `verifiableCredential` | `VerifiableCredential`<[`RoleCredentialSubject`](../interfaces/modules_verifiable_credentials.RoleCredentialSubject.md)\> | verifiable credential to be revoked |

#### Returns

`Promise`<[`StatusList2021UnsignedCredential`](../interfaces/modules_verifiable_credentials.StatusList2021UnsignedCredential.md)\>

unsigned status list credential

___

### isAuthEnabled

▸ **isAuthEnabled**(): `boolean`

#### Returns

`boolean`

___

### isAuthenticated

▸ **isAuthenticated**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

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

ICacheClient.issueClaim

___

### login

▸ **login**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

___

### persistCredentialStatusUpdate

▸ **persistCredentialStatusUpdate**(`statusListCredential`): `Promise`<[`StatusList2021Credential`](../modules/modules_verifiable_credentials.md#statuslist2021credential)\>

Persist signed StatusList2021Credential object in storage.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `statusListCredential` | [`StatusList2021Credential`](../modules/modules_verifiable_credentials.md#statuslist2021credential) | signed status list |

#### Returns

`Promise`<[`StatusList2021Credential`](../modules/modules_verifiable_credentials.md#statuslist2021credential)\>

status list credential

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

ICacheClient.rejectClaim

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

ICacheClient.requestClaim
