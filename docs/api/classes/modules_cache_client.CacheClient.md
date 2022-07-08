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

[ICacheClient](../interfaces/modules_cache_client.ICacheClient.md).[getClaimsByRevoker](../interfaces/modules_cache_client.ICacheClient.md#getclaimsbyrevoker)

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

▸ **getRoleDefinition**(`namespace`): `Promise`<`IRoleDefinition` \| `IRoleDefinitionV2`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

`Promise`<`IRoleDefinition` \| `IRoleDefinitionV2`\>

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

### getRolesByRevoker

▸ **getRolesByRevoker**(`revoker`): `Promise`<[`IRole`](../interfaces/modules_domains.IRole.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `revoker` | `string` |

#### Returns

`Promise`<[`IRole`](../interfaces/modules_domains.IRole.md)[]\>

#### Implementation of

[ICacheClient](../interfaces/modules_cache_client.ICacheClient.md).[getRolesByRevoker](../interfaces/modules_cache_client.ICacheClient.md#getrolesbyrevoker)

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

[ICacheClient](../interfaces/modules_cache_client.ICacheClient.md).[getSubOrganizationsByOrganization](../interfaces/modules_cache_client.ICacheClient.md#getsuborganizationsbyorganization)

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

#### Implementation of

[ICacheClient](../interfaces/modules_cache_client.ICacheClient.md).[isAuthEnabled](../interfaces/modules_cache_client.ICacheClient.md#isauthenabled)

___

### isAuthenticated

▸ **isAuthenticated**(): `Promise`<`boolean`\>

Checks that auth token has been created, has not expired and corresponds to signer.
This is done by a request to the server because the auth token is stored in an HTTP-only cookie and
so the Javascript has no way to check its validity

#### Returns

`Promise`<`boolean`\>

true if cache client is authenticated server

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
