# Class: IAM

[iam](../modules/iam.md).IAM

Decentralized Identity and Access Management (IAM) Type

## Hierarchy

- [`IAMBase`](iam_iam_base.IAMBase.md)

  ↳ **`IAM`**

  ↳↳ [`GnosisIam`](GnosisIam.GnosisIam-1.md)

## Table of contents

### Constructors

- [constructor](iam.IAM.md#constructor)

### Accessors

- [address](iam.IAM.md#address)

### Methods

- [acceptAssetOffer](iam.IAM.md#acceptassetoffer)
- [cancelAssetOffer](iam.IAM.md#cancelassetoffer)
- [changeAppOwnership](iam.IAM.md#changeappownership)
- [changeOrgOwnership](iam.IAM.md#changeorgownership)
- [changeRoleOwnership](iam.IAM.md#changeroleownership)
- [checkExistenceOfDomain](iam.IAM.md#checkexistenceofdomain)
- [closeConnection](iam.IAM.md#closeconnection)
- [connectToCacheServer](iam.IAM.md#connecttocacheserver)
- [connectToDIDRegistry](iam.IAM.md#connecttodidregistry)
- [createApplication](iam.IAM.md#createapplication)
- [createClaimRequest](iam.IAM.md#createclaimrequest)
- [createIdentityProof](iam.IAM.md#createidentityproof)
- [createOrganization](iam.IAM.md#createorganization)
- [createProofClaim](iam.IAM.md#createproofclaim)
- [createPublicClaim](iam.IAM.md#createpublicclaim)
- [createRole](iam.IAM.md#createrole)
- [createSelfSignedClaim](iam.IAM.md#createselfsignedclaim)
- [decodeJWTToken](iam.IAM.md#decodejwttoken)
- [deleteApplication](iam.IAM.md#deleteapplication)
- [deleteClaim](iam.IAM.md#deleteclaim)
- [deleteOrganization](iam.IAM.md#deleteorganization)
- [deleteRole](iam.IAM.md#deleterole)
- [getAppsByOrgNamespace](iam.IAM.md#getappsbyorgnamespace)
- [getAssetById](iam.IAM.md#getassetbyid)
- [getAssetHistory](iam.IAM.md#getassethistory)
- [getClaimsByIssuer](iam.IAM.md#getclaimsbyissuer)
- [getClaimsByRequester](iam.IAM.md#getclaimsbyrequester)
- [getClaimsBySubject](iam.IAM.md#getclaimsbysubject)
- [getClaimsBySubjects](iam.IAM.md#getclaimsbysubjects)
- [getDefinition](iam.IAM.md#getdefinition)
- [getDid](iam.IAM.md#getdid)
- [getDidDocument](iam.IAM.md#getdiddocument)
- [getENSTypesByOwner](iam.IAM.md#getenstypesbyowner)
- [getENSTypesBySearchPhrase](iam.IAM.md#getenstypesbysearchphrase)
- [getOfferedAssets](iam.IAM.md#getofferedassets)
- [getOrgHierarchy](iam.IAM.md#getorghierarchy)
- [getOwnedAssets](iam.IAM.md#getownedassets)
- [getPreviouslyOwnedAssets](iam.IAM.md#getpreviouslyownedassets)
- [getProviderType](iam.IAM.md#getprovidertype)
- [getRoleDIDs](iam.IAM.md#getroledids)
- [getRolesByNamespace](iam.IAM.md#getrolesbynamespace)
- [getSigner](iam.IAM.md#getsigner)
- [getSubOrgsByOrgNamespace](iam.IAM.md#getsuborgsbyorgnamespace)
- [getSubdomains](iam.IAM.md#getsubdomains)
- [getUserClaims](iam.IAM.md#getuserclaims)
- [initializeConnection](iam.IAM.md#initializeconnection)
- [isConnected](iam.IAM.md#isconnected)
- [isOwner](iam.IAM.md#isowner)
- [isSessionActive](iam.IAM.md#issessionactive)
- [issueClaimRequest](iam.IAM.md#issueclaimrequest)
- [issuePublicClaim](iam.IAM.md#issuepublicclaim)
- [namespacesWithRelations](iam.IAM.md#namespaceswithrelations)
- [offerAsset](iam.IAM.md#offerasset)
- [on](iam.IAM.md#on)
- [publishPublicClaim](iam.IAM.md#publishpublicclaim)
- [registerAsset](iam.IAM.md#registerasset)
- [registrationTypesOfRoles](iam.IAM.md#registrationtypesofroles)
- [rejectAssetOffer](iam.IAM.md#rejectassetoffer)
- [rejectClaimRequest](iam.IAM.md#rejectclaimrequest)
- [revokeDidDocument](iam.IAM.md#revokediddocument)
- [setRoleDefinition](iam.IAM.md#setroledefinition)
- [subscribeTo](iam.IAM.md#subscribeto)
- [unsubscribeFrom](iam.IAM.md#unsubscribefrom)
- [updateDidDocument](iam.IAM.md#updatediddocument)
- [validateOwnership](iam.IAM.md#validateownership)
- [verifyPublicClaim](iam.IAM.md#verifypublicclaim)
- [isMetamaskExtensionPresent](iam.IAM.md#ismetamaskextensionpresent)

## Constructors

### constructor

• **new IAM**(`__namedParameters?`)

IAM Constructor

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`ConnectionOptions`](../modules/iam_iam_base.md#connectionoptions) |

#### Inherited from

[IAMBase](iam_iam_base.IAMBase.md).[constructor](iam_iam_base.IAMBase.md#constructor)

## Accessors

### address

• `get` **address**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

## Methods

### acceptAssetOffer

▸ **acceptAssetOffer**(`__namedParameters`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.assetDID` | `string` |

#### Returns

`Promise`<`void`\>

___

### cancelAssetOffer

▸ **cancelAssetOffer**(`__namedParameters`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.assetDID` | `string` |

#### Returns

`Promise`<`void`\>

___

### changeAppOwnership

▸ **changeAppOwnership**(`__namedParameters`): `Promise`<{ `info`: `string` ; `next`: (`__namedParameters`: { `retryCheck?`: `boolean`  }) => `Promise`<`void`\> ; `tx`: [`EncodedCall`](../modules/iam_iam_base.md#encodedcall)  }[]\>

changeAppOwnership

**`description`** change owner ship of app subdomain and all app owned subdomains

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.namespace` | `string` |
| `__namedParameters.newOwner` | `string` |
| `__namedParameters.returnSteps?` | `boolean` |

#### Returns

`Promise`<{ `info`: `string` ; `next`: (`__namedParameters`: { `retryCheck?`: `boolean`  }) => `Promise`<`void`\> ; `tx`: [`EncodedCall`](../modules/iam_iam_base.md#encodedcall)  }[]\>

return array of steps needed to change ownership

___

### changeOrgOwnership

▸ **changeOrgOwnership**(`__namedParameters`): `Promise`<{ `info`: `string` ; `next`: (`__namedParameters`: { `retryCheck?`: `boolean`  }) => `Promise`<`void`\> ; `tx`: [`EncodedCall`](../modules/iam_iam_base.md#encodedcall)  }[]\>

changeOrgOwnership

**`description`** change owner ship of org subdomain and all org owned roles subdomains

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.namespace` | `string` |
| `__namedParameters.newOwner` | `string` |
| `__namedParameters.returnSteps?` | `boolean` |

#### Returns

`Promise`<{ `info`: `string` ; `next`: (`__namedParameters`: { `retryCheck?`: `boolean`  }) => `Promise`<`void`\> ; `tx`: [`EncodedCall`](../modules/iam_iam_base.md#encodedcall)  }[]\>

return array of steps needed to change ownership

___

### changeRoleOwnership

▸ **changeRoleOwnership**(`__namedParameters`): `Promise`<`void`\>

changeRoleOwnership

**`description`** change ownership of role subdomain

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.namespace` | `string` |
| `__namedParameters.newOwner` | `string` |

#### Returns

`Promise`<`void`\>

___

### checkExistenceOfDomain

▸ **checkExistenceOfDomain**(`__namedParameters`): `Promise`<`boolean`\>

checkExistenceOfDomain

**`description`** check existence of domain in ENS registry

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.domain` | `string` |

#### Returns

`Promise`<`boolean`\>

true or false whatever the domain is present

___

### closeConnection

▸ **closeConnection**(): `Promise`<`void`\>

**`description`** Closes the connection between application and the signer's wallet

#### Returns

`Promise`<`void`\>

#### Inherited from

[IAMBase](iam_iam_base.IAMBase.md).[closeConnection](iam_iam_base.IAMBase.md#closeconnection)

___

### connectToCacheServer

▸ **connectToCacheServer**(): `Promise`<`void`\>

**`description`** Establishes connection to the cache serverand sets public key and identity token

#### Returns

`Promise`<`void`\>

#### Inherited from

[IAMBase](iam_iam_base.IAMBase.md).[connectToCacheServer](iam_iam_base.IAMBase.md#connecttocacheserver)

___

### connectToDIDRegistry

▸ **connectToDIDRegistry**(): `Promise`<`void`\>

**`description`** Creates the signer's DID document if it does not exist

#### Returns

`Promise`<`void`\>

#### Inherited from

[IAMBase](iam_iam_base.IAMBase.md).[connectToDIDRegistry](iam_iam_base.IAMBase.md#connecttodidregistry)

___

### createApplication

▸ **createApplication**(`__namedParameters`): `Promise`<{ `info`: `string` = "Set subdomain for application"; `next`: () => `Promise`<`void`\> ; `tx`: [`EncodedCall`](../modules/iam_iam_base.md#encodedcall)  }[]\>

createApp

**`description`** creates role (create subdomain, sets the domain name and sets the role definition to metadata record in ENS Domain)

**`description`** creates roles subdomain for the app namespace

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.appName` | `string` |
| `__namedParameters.data` | `IAppDefinition` |
| `__namedParameters.namespace` | `string` |
| `__namedParameters.returnSteps?` | `boolean` |

#### Returns

`Promise`<{ `info`: `string` = "Set subdomain for application"; `next`: () => `Promise`<`void`\> ; `tx`: [`EncodedCall`](../modules/iam_iam_base.md#encodedcall)  }[]\>

___

### createClaimRequest

▸ **createClaimRequest**(`__namedParameters`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.claim` | `Object` |
| `__namedParameters.claim.claimType` | `string` |
| `__namedParameters.claim.claimTypeVersion` | `number` |
| `__namedParameters.claim.fields` | { `key`: `string` ; `value`: `string` \| `number`  }[] |
| `__namedParameters.registrationTypes?` | [`RegistrationTypes`](../enums/cacheServerClient_cacheServerClient_types.RegistrationTypes.md)[] |
| `__namedParameters.subject?` | `string` |

#### Returns

`Promise`<`void`\>

___

### createIdentityProof

▸ **createIdentityProof**(): `Promise`<`string`\>

#### Returns

`Promise`<`string`\>

___

### createOrganization

▸ **createOrganization**(`__namedParameters`): `Promise`<{ `info`: `string` = "Create organization subdomain"; `next`: () => `Promise`<`void`\> ; `tx`: [`EncodedCall`](../modules/iam_iam_base.md#encodedcall)  }[]\>

createOrganization

**`description`** creates organization (create subdomain, sets the domain name and sets the role definition to metadata record in ENS Domain)

**`description`** and sets subdomain for roles and app for org namespace

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.data` | `IOrganizationDefinition` |
| `__namedParameters.namespace` | `string` |
| `__namedParameters.orgName` | `string` |
| `__namedParameters.returnSteps?` | `boolean` |

#### Returns

`Promise`<{ `info`: `string` = "Create organization subdomain"; `next`: () => `Promise`<`void`\> ; `tx`: [`EncodedCall`](../modules/iam_iam_base.md#encodedcall)  }[]\>

___

### createProofClaim

▸ **createProofClaim**(`__namedParameters`): `Promise`<`string`\>

createProofClaim

**`description`** creates a proof of a claim

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.claimUrl` | `string` |
| `__namedParameters.saltedFields` | `ISaltedFields` |

#### Returns

`Promise`<`string`\>

proof token

___

### createPublicClaim

▸ **createPublicClaim**(`__namedParameters`): `Promise`<`string`\>

createPublicClaim

**`description`** create a public claim based on data provided

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.data` | [`ClaimData`](../interfaces/cacheServerClient_cacheServerClient_types.ClaimData.md) |
| `__namedParameters.subject?` | `string` |

#### Returns

`Promise`<`string`\>

JWT token of created claim

___

### createRole

▸ **createRole**(`__namedParameters`): `Promise`<{ `info`: `string` = "Create subdomain for role"; `next`: () => `Promise`<`void`\> ; `tx`: [`EncodedCall`](../modules/iam_iam_base.md#encodedcall)  }[]\>

createRole

**`description`** creates role (create subdomain, sets the domain name and sets the role definition to metadata record in ENS Domain)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.data` | `IRoleDefinition` |
| `__namedParameters.namespace` | `string` |
| `__namedParameters.returnSteps?` | `boolean` |
| `__namedParameters.roleName` | `string` |

#### Returns

`Promise`<{ `info`: `string` = "Create subdomain for role"; `next`: () => `Promise`<`void`\> ; `tx`: [`EncodedCall`](../modules/iam_iam_base.md#encodedcall)  }[]\>

information (true/false) if the role was created

___

### createSelfSignedClaim

▸ **createSelfSignedClaim**(`__namedParameters`): `Promise`<`string`\>

createSelfSignedClaim

**`description`** creates self signed claim and upload the data to ipfs

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.data` | [`ClaimData`](../interfaces/cacheServerClient_cacheServerClient_types.ClaimData.md) |
| `__namedParameters.subject?` | `string` |

#### Returns

`Promise`<`string`\>

___

### decodeJWTToken

▸ **decodeJWTToken**(`__namedParameters`): `Promise`<`string` \| { [key: string]: `string` \| `object`;  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.token` | `string` |

#### Returns

`Promise`<`string` \| { [key: string]: `string` \| `object`;  }\>

___

### deleteApplication

▸ **deleteApplication**(`__namedParameters`): `Promise`<{ `info`: `string` ; `next`: (`__namedParameters`: { `retryCheck?`: `boolean`  }) => `Promise`<`void`\> ; `tx`: [`EncodedCall`](../modules/iam_iam_base.md#encodedcall)  }[]\>

deleteApplication

**`description`** delete application and roles

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.namespace` | `string` |
| `__namedParameters.returnSteps?` | `boolean` |

#### Returns

`Promise`<{ `info`: `string` ; `next`: (`__namedParameters`: { `retryCheck?`: `boolean`  }) => `Promise`<`void`\> ; `tx`: [`EncodedCall`](../modules/iam_iam_base.md#encodedcall)  }[]\>

___

### deleteClaim

▸ **deleteClaim**(`__namedParameters`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.id` | `string` |

#### Returns

`Promise`<`void`\>

___

### deleteOrganization

▸ **deleteOrganization**(`__namedParameters`): `Promise`<{ `info`: `string` ; `next`: (`__namedParameters`: { `retryCheck?`: `boolean`  }) => `Promise`<`void`\> ; `tx`: [`EncodedCall`](../modules/iam_iam_base.md#encodedcall)  }[]\>

deleteOrganization

**`description`** delete organization and roles

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.namespace` | `string` |
| `__namedParameters.returnSteps?` | `boolean` |

#### Returns

`Promise`<{ `info`: `string` ; `next`: (`__namedParameters`: { `retryCheck?`: `boolean`  }) => `Promise`<`void`\> ; `tx`: [`EncodedCall`](../modules/iam_iam_base.md#encodedcall)  }[]\>

___

### deleteRole

▸ **deleteRole**(`__namedParameters`): `Promise`<`void`\>

deleteRole

**`description`** delete role

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.namespace` | `string` |

#### Returns

`Promise`<`void`\>

___

### getAppsByOrgNamespace

▸ **getAppsByOrgNamespace**(`__namedParameters`): `Promise`<[`IApp`](../interfaces/cacheServerClient_cacheServerClient_types.IApp.md)[]\>

getENSTypesByOwner

**`description`** get all applications for organization namespace

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.namespace` | `string` |

#### Returns

`Promise`<[`IApp`](../interfaces/cacheServerClient_cacheServerClient_types.IApp.md)[]\>

array of subdomains or empty array when there is no subdomains

___

### getAssetById

▸ **getAssetById**(`__namedParameters`): `Promise`<[`Asset`](../interfaces/cacheServerClient_cacheServerClient_types.Asset.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.id` | `string` |

#### Returns

`Promise`<[`Asset`](../interfaces/cacheServerClient_cacheServerClient_types.Asset.md)\>

___

### getAssetHistory

▸ **getAssetHistory**(`__namedParameters`): `Promise`<[`AssetHistory`](../interfaces/cacheServerClient_cacheServerClient_types.AssetHistory.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.id` | `string` |
| `__namedParameters.order?` | [`Order`](../enums/cacheServerClient_cacheServerClient_types.Order.md) |
| `__namedParameters.skip?` | `number` |
| `__namedParameters.take?` | `number` |
| `__namedParameters.type?` | [`AssetHistoryEventType`](../enums/cacheServerClient_cacheServerClient_types.AssetHistoryEventType.md) |

#### Returns

`Promise`<[`AssetHistory`](../interfaces/cacheServerClient_cacheServerClient_types.AssetHistory.md)[]\>

___

### getClaimsByIssuer

▸ **getClaimsByIssuer**(`__namedParameters`): `Promise`<[`Claim`](../interfaces/cacheServerClient_cacheServerClient_types.Claim.md)[]\>

**`description`** - Returns claims for given issuer. Allows filtering by status and parent namespace

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.did` | `string` |
| `__namedParameters.isAccepted?` | `boolean` |
| `__namedParameters.parentNamespace?` | `string` |

#### Returns

`Promise`<[`Claim`](../interfaces/cacheServerClient_cacheServerClient_types.Claim.md)[]\>

___

### getClaimsByRequester

▸ **getClaimsByRequester**(`__namedParameters`): `Promise`<[`Claim`](../interfaces/cacheServerClient_cacheServerClient_types.Claim.md)[]\>

**`description`** - Returns claims for given requester. Allows filtering by status and parent namespace

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.did` | `string` |
| `__namedParameters.isAccepted?` | `boolean` |
| `__namedParameters.parentNamespace?` | `string` |

#### Returns

`Promise`<[`Claim`](../interfaces/cacheServerClient_cacheServerClient_types.Claim.md)[]\>

___

### getClaimsBySubject

▸ **getClaimsBySubject**(`__namedParameters`): `Promise`<[`Claim`](../interfaces/cacheServerClient_cacheServerClient_types.Claim.md)[]\>

**`description`** - Returns claims for given subject. Allows filtering by status and parent namespace

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.did` | `string` |
| `__namedParameters.isAccepted?` | `boolean` |
| `__namedParameters.parentNamespace?` | `string` |

#### Returns

`Promise`<[`Claim`](../interfaces/cacheServerClient_cacheServerClient_types.Claim.md)[]\>

___

### getClaimsBySubjects

▸ **getClaimsBySubjects**(`subjects`): `Promise`<[`Claim`](../interfaces/cacheServerClient_cacheServerClient_types.Claim.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `subjects` | `string`[] |

#### Returns

`Promise`<[`Claim`](../interfaces/cacheServerClient_cacheServerClient_types.Claim.md)[]\>

___

### getDefinition

▸ **getDefinition**(`__namedParameters`): `Promise`<`IAppDefinition` \| `IRoleDefinition` \| `IOrganizationDefinition`\>

getRoleDefinition

**`description`** get role definition form ens domain metadata record

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.namespace` | `string` |
| `__namedParameters.type` | [`ENSNamespaceTypes`](../enums/iam.ENSNamespaceTypes.md) |

#### Returns

`Promise`<`IAppDefinition` \| `IRoleDefinition` \| `IOrganizationDefinition`\>

metadata string or empty string when there is no metadata

___

### getDid

▸ **getDid**(): `undefined` \| `string`

Get DID

#### Returns

`undefined` \| `string`

did string if connected to wallet, if not returns undefined

___

### getDidDocument

▸ **getDidDocument**(`__namedParameters?`): `Promise`<`Object`\>

getDidDocument

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `undefined` \| { `did?`: `string` ; `includeClaims?`: `boolean`  } |

#### Returns

`Promise`<`Object`\>

whole did document if connected, if not returns null

___

### getENSTypesByOwner

▸ **getENSTypesByOwner**(`__namedParameters`): `Promise`<[`IOrganization`](../interfaces/cacheServerClient_cacheServerClient_types.IOrganization.md)[]\> \| `Promise`<[`IApp`](../interfaces/cacheServerClient_cacheServerClient_types.IApp.md)[]\> \| `Promise`<[`IRole`](../interfaces/cacheServerClient_cacheServerClient_types.IRole.md)[]\>

getENSTypesByOwner

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.excludeSubOrgs?` | `boolean` |
| `__namedParameters.owner` | `string` |
| `__namedParameters.type` | [`ENSNamespaceTypes`](../enums/iam.ENSNamespaceTypes.md) |

#### Returns

`Promise`<[`IOrganization`](../interfaces/cacheServerClient_cacheServerClient_types.IOrganization.md)[]\> \| `Promise`<[`IApp`](../interfaces/cacheServerClient_cacheServerClient_types.IApp.md)[]\> \| `Promise`<[`IRole`](../interfaces/cacheServerClient_cacheServerClient_types.IRole.md)[]\>

___

### getENSTypesBySearchPhrase

▸ **getENSTypesBySearchPhrase**(`__namedParameters`): `Promise`<([`IOrganization`](../interfaces/cacheServerClient_cacheServerClient_types.IOrganization.md) \| [`IApp`](../interfaces/cacheServerClient_cacheServerClient_types.IApp.md) \| [`IRole`](../interfaces/cacheServerClient_cacheServerClient_types.IRole.md))[]\>

getENSTypesBySearchPhrase

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.search` | `string` |
| `__namedParameters.types?` | (``"App"`` \| ``"Org"`` \| ``"Role"``)[] |

#### Returns

`Promise`<([`IOrganization`](../interfaces/cacheServerClient_cacheServerClient_types.IOrganization.md) \| [`IApp`](../interfaces/cacheServerClient_cacheServerClient_types.IApp.md) \| [`IRole`](../interfaces/cacheServerClient_cacheServerClient_types.IRole.md))[]\>

___

### getOfferedAssets

▸ **getOfferedAssets**(`__namedParameters?`): `Promise`<[`Asset`](../interfaces/cacheServerClient_cacheServerClient_types.Asset.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.did?` | `string` |

#### Returns

`Promise`<[`Asset`](../interfaces/cacheServerClient_cacheServerClient_types.Asset.md)[]\>

___

### getOrgHierarchy

▸ **getOrgHierarchy**(`__namedParameters`): `Promise`<[`IOrganization`](../interfaces/cacheServerClient_cacheServerClient_types.IOrganization.md)\>

getOrgHierarchy

**`description`** get all hierarchy of an organization (20 levels deep)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.namespace` | `string` |

#### Returns

`Promise`<[`IOrganization`](../interfaces/cacheServerClient_cacheServerClient_types.IOrganization.md)\>

organization with all nested subOrgs

___

### getOwnedAssets

▸ **getOwnedAssets**(`__namedParameters?`): `Promise`<[`Asset`](../interfaces/cacheServerClient_cacheServerClient_types.Asset.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.did?` | `string` |

#### Returns

`Promise`<[`Asset`](../interfaces/cacheServerClient_cacheServerClient_types.Asset.md)[]\>

___

### getPreviouslyOwnedAssets

▸ **getPreviouslyOwnedAssets**(`__namedParameters`): `Promise`<[`Asset`](../interfaces/cacheServerClient_cacheServerClient_types.Asset.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.owner` | `string` |

#### Returns

`Promise`<[`Asset`](../interfaces/cacheServerClient_cacheServerClient_types.Asset.md)[]\>

___

### getProviderType

▸ **getProviderType**(): `undefined` \| [`WalletProvider`](../enums/types_WalletProvider.WalletProvider.md)

Get the current initialized provider type

#### Returns

`undefined` \| [`WalletProvider`](../enums/types_WalletProvider.WalletProvider.md)

provider type if the session is active if not undefined

___

### getRoleDIDs

▸ **getRoleDIDs**(`__namedParameters`): `Promise`<`string`[]\>

getRoleDIDs

**`description`** get all users did which have certain role

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.namespace` | `string` |

#### Returns

`Promise`<`string`[]\>

array of did's

___

### getRolesByNamespace

▸ **getRolesByNamespace**(`__namedParameters`): `Promise`<[`IRole`](../interfaces/cacheServerClient_cacheServerClient_types.IRole.md)[]\>

getRolesByNamespace

**`description`** get all subdomains for certain domain

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.namespace` | `string` |
| `__namedParameters.parentType` | [`Application`](../enums/iam.ENSNamespaceTypes.md#application) \| [`Organization`](../enums/iam.ENSNamespaceTypes.md#organization) |

#### Returns

`Promise`<[`IRole`](../interfaces/cacheServerClient_cacheServerClient_types.IRole.md)[]\>

array of subdomains or empty array when there is no subdomains

___

### getSigner

▸ **getSigner**(): `undefined` \| `JsonRpcSigner` \| `Signer`

Get signer

#### Returns

`undefined` \| `JsonRpcSigner` \| `Signer`

JsonRpcSigner if connected to wallet, if not returns undefined

___

### getSubOrgsByOrgNamespace

▸ **getSubOrgsByOrgNamespace**(`__namedParameters`): `Promise`<[`IOrganization`](../interfaces/cacheServerClient_cacheServerClient_types.IOrganization.md)[]\>

getSubOrgsByOrgNamespace

**`description`** get all sub organizations for organization namespace

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.namespace` | `string` |

#### Returns

`Promise`<[`IOrganization`](../interfaces/cacheServerClient_cacheServerClient_types.IOrganization.md)[]\>

array of subdomains or empty array when there is no subdomains

___

### getSubdomains

▸ **getSubdomains**(`__namedParameters`): `Promise`<`string`[]\>

getSubdomains

**`description`** get all subdomains for certain domain

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.domain` | `string` |
| `__namedParameters.mode?` | ``"ALL"`` \| ``"FIRSTLEVEL"`` |

#### Returns

`Promise`<`string`[]\>

array of subdomains or empty array when there is no subdomains

___

### getUserClaims

▸ **getUserClaims**(`__namedParameters?`): `Promise`<`IServiceEndpoint` & [`ClaimData`](../interfaces/cacheServerClient_cacheServerClient_types.ClaimData.md)[]\>

getUserClaims

**`description`** get user claims

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `undefined` \| { `did?`: `string`  } |

#### Returns

`Promise`<`IServiceEndpoint` & [`ClaimData`](../interfaces/cacheServerClient_cacheServerClient_types.ClaimData.md)[]\>

___

### initializeConnection

▸ **initializeConnection**(`__namedParameters?`): `Promise`<[`InitializeData`](../modules/iam.md#initializedata)\>

Initialize connection to wallet

**`description`** creates web3 provider and establishes secure connection to selected wallet

**`summary`** if not connected to wallet will show connection modal, but if already connected (data stored in localStorage) will only return initial data without showing modal

**`requires`** needs to be called before any of other methods

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.createDocument?` | `boolean` |
| `__namedParameters.initCacheServer?` | `boolean` |
| `__namedParameters.reinitializeMetamask?` | `boolean` |
| `__namedParameters.walletProvider?` | [`WalletProvider`](../enums/types_WalletProvider.WalletProvider.md) |

#### Returns

`Promise`<[`InitializeData`](../modules/iam.md#initializedata)\>

did string, status of connection and info if the user closed the wallet selection modal

___

### isConnected

▸ **isConnected**(): `boolean`

isConnected

#### Returns

`boolean`

info if the connection to wallet/signer is already established

___

### isOwner

▸ **isOwner**(`__namedParameters`): `Promise`<`boolean`\>

isOwner

**`description`** check ownership of the domain

**`default`** if user is not specified it will check the current logged user

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.domain` | `string` |
| `__namedParameters.user?` | `string` |

#### Returns

`Promise`<`boolean`\>

true or false whatever the passed is user is a owner of domain

___

### isSessionActive

▸ **isSessionActive**(): `boolean`

**`description`** Checks if the session is active

#### Returns

`boolean`

boolean that indicates the session state

#### Inherited from

[IAMBase](iam_iam_base.IAMBase.md).[isSessionActive](iam_iam_base.IAMBase.md#issessionactive)

___

### issueClaimRequest

▸ **issueClaimRequest**(`__namedParameters`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.id` | `string` |
| `__namedParameters.registrationTypes` | [`RegistrationTypes`](../enums/cacheServerClient_cacheServerClient_types.RegistrationTypes.md)[] |
| `__namedParameters.requester` | `string` |
| `__namedParameters.subjectAgreement` | `string` |
| `__namedParameters.token` | `string` |

#### Returns

`Promise`<`void`\>

___

### issuePublicClaim

▸ **issuePublicClaim**(`__namedParameters`): `Promise`<`string`\>

issuePublicClaim

**`description`** issue a public claim

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.publicClaim?` | `IPublicClaim` |
| `__namedParameters.token?` | `string` |

#### Returns

`Promise`<`string`\>

return issued token

___

### namespacesWithRelations

▸ **namespacesWithRelations**(`namespaces`): `Promise`<{ `namespace`: `string` ; `owner`: `string`  }[]\>

**`description`** Collects all namespaces related data. Currently its includes only owner

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespaces` | `string`[] |

#### Returns

`Promise`<{ `namespace`: `string` ; `owner`: `string`  }[]\>

___

### offerAsset

▸ **offerAsset**(`__namedParameters`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.assetDID` | `string` |
| `__namedParameters.offerTo` | `string` |

#### Returns

`Promise`<`void`\>

___

### on

▸ **on**(`event`, `eventHandler`): `void`

**`description`** Defines event handlers for change of account, change of network, disconnection

**`requires`** to be called after the connection to wallet was initialized

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"accountChanged"`` \| ``"networkChanged"`` \| ``"disconnected"`` |
| `eventHandler` | () => `void` |

#### Returns

`void`

#### Inherited from

[IAMBase](iam_iam_base.IAMBase.md).[on](iam_iam_base.IAMBase.md#on)

___

### publishPublicClaim

▸ **publishPublicClaim**(`__namedParameters`): `Promise`<`string`\>

publishPublicClaim

**`description`** store claim data in ipfs and save url to DID document services

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.token` | `string` |

#### Returns

`Promise`<`string`\>

ulr to ipfs

___

### registerAsset

▸ **registerAsset**(): `Promise`<`string`\>

#### Returns

`Promise`<`string`\>

___

### registrationTypesOfRoles

▸ **registrationTypesOfRoles**(`roles`): `Promise`<`Record`<`string`, `Set`<[`RegistrationTypes`](../enums/cacheServerClient_cacheServerClient_types.RegistrationTypes.md)\>\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `roles` | `string`[] |

#### Returns

`Promise`<`Record`<`string`, `Set`<[`RegistrationTypes`](../enums/cacheServerClient_cacheServerClient_types.RegistrationTypes.md)\>\>\>

___

### rejectAssetOffer

▸ **rejectAssetOffer**(`__namedParameters`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.assetDID` | `string` |

#### Returns

`Promise`<`void`\>

___

### rejectClaimRequest

▸ **rejectClaimRequest**(`__namedParameters`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.id` | `string` |
| `__namedParameters.requesterDID` | `string` |

#### Returns

`Promise`<`void`\>

___

### revokeDidDocument

▸ **revokeDidDocument**(): `Promise`<`boolean`\>

revokeDidDocument

**`description`** revokes did document

#### Returns

`Promise`<`boolean`\>

information (true/false) if the DID document was revoked

___

### setRoleDefinition

▸ **setRoleDefinition**(`__namedParameters`): `Promise`<`void`\>

setRoleDefinition

**`description`** sets role definition in ENS domain

**`description`** please use it only when you want to update role definitions for already created role (domain)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.data` | `IAppDefinition` \| `IRoleDefinition` \| `IOrganizationDefinition` |
| `__namedParameters.domain` | `string` |

#### Returns

`Promise`<`void`\>

___

### subscribeTo

▸ **subscribeTo**(`__namedParameters`): `Promise`<`undefined` \| `number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.subject?` | `string` |
| `__namedParameters.messageHandler` | (`data`: [`IMessage`](../interfaces/iam.IMessage.md)) => `void` |

#### Returns

`Promise`<`undefined` \| `number`\>

___

### unsubscribeFrom

▸ **unsubscribeFrom**(`subscriptionId`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `subscriptionId` | `number` |

#### Returns

`Promise`<`void`\>

___

### updateDidDocument

▸ **updateDidDocument**(`options`): `Promise`<`boolean`\>

**`description`** updates did document based on data provided

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | Options to connect with blockchain |
| `options.data` | `IUpdateData` | New attribute value |
| `options.did?` | `string` | Asset did to be updated |
| `options.didAttribute` | `DIDAttribute` | Type of document to be updated |
| `options.validity?` | `number` | Time (s) for the attribute to expire |

#### Returns

`Promise`<`boolean`\>

true if document is updated successfuly

___

### validateOwnership

▸ **validateOwnership**(`__namedParameters`): `Promise`<`string`[]\>

validateOwnership

**`description`** check ownership of the domain and subdomains of org, app or role

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.namespace` | `string` |
| `__namedParameters.type` | [`ENSNamespaceTypes`](../enums/iam.ENSNamespaceTypes.md) |

#### Returns

`Promise`<`string`[]\>

true or false whatever the passed is user is a owner of org, app or role

___

### verifyPublicClaim

▸ **verifyPublicClaim**(`__namedParameters`): `Promise`<`IPublicClaim`\>

verifyPublicClaim

**`description`** verifies issued token of claim

**`throws`** if the proof failed

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.claimUrl` | `string` |

#### Returns

`Promise`<`IPublicClaim`\>

public claim data

___

### isMetamaskExtensionPresent

▸ `Static` **isMetamaskExtensionPresent**(): `Promise`<`Object`\>

#### Returns

`Promise`<`Object`\>
