# Class: GnosisIam

[GnosisIam](../modules/GnosisIam.md).GnosisIam

**`description`** Intended for use in Volta Gnosis web interface(https://volta.gnosis-safe.io/).
Dapp should provide this class with SafeAppSdk injected by Gnosis interface. This class intoduces
notion of controlled domain as that which is owned by gnosis wallet controlled by Iam signer.
The domain ownership functionality has been redefined accordingly.

## Hierarchy

- [`IAM`](iam.IAM.md)

  ↳ **`GnosisIam`**

## Table of contents

### Constructors

- [constructor](GnosisIam.GnosisIam-1.md#constructor)

### Accessors

- [address](GnosisIam.GnosisIam-1.md#address)
- [safeAddress](GnosisIam.GnosisIam-1.md#safeaddress)

### Methods

- [acceptAssetOffer](GnosisIam.GnosisIam-1.md#acceptassetoffer)
- [cancelAssetOffer](GnosisIam.GnosisIam-1.md#cancelassetoffer)
- [changeAppOwnership](GnosisIam.GnosisIam-1.md#changeappownership)
- [changeOrgOwnership](GnosisIam.GnosisIam-1.md#changeorgownership)
- [changeRoleOwnership](GnosisIam.GnosisIam-1.md#changeroleownership)
- [checkExistenceOfDomain](GnosisIam.GnosisIam-1.md#checkexistenceofdomain)
- [closeConnection](GnosisIam.GnosisIam-1.md#closeconnection)
- [connectToCacheServer](GnosisIam.GnosisIam-1.md#connecttocacheserver)
- [connectToDIDRegistry](GnosisIam.GnosisIam-1.md#connecttodidregistry)
- [createApplication](GnosisIam.GnosisIam-1.md#createapplication)
- [createClaimRequest](GnosisIam.GnosisIam-1.md#createclaimrequest)
- [createDelegateProof](GnosisIam.GnosisIam-1.md#createdelegateproof)
- [createIdentityProof](GnosisIam.GnosisIam-1.md#createidentityproof)
- [createOrganization](GnosisIam.GnosisIam-1.md#createorganization)
- [createProofClaim](GnosisIam.GnosisIam-1.md#createproofclaim)
- [createPublicClaim](GnosisIam.GnosisIam-1.md#createpublicclaim)
- [createRole](GnosisIam.GnosisIam-1.md#createrole)
- [createSelfSignedClaim](GnosisIam.GnosisIam-1.md#createselfsignedclaim)
- [decodeJWTToken](GnosisIam.GnosisIam-1.md#decodejwttoken)
- [deleteApplication](GnosisIam.GnosisIam-1.md#deleteapplication)
- [deleteClaim](GnosisIam.GnosisIam-1.md#deleteclaim)
- [deleteOrganization](GnosisIam.GnosisIam-1.md#deleteorganization)
- [deleteRole](GnosisIam.GnosisIam-1.md#deleterole)
- [getAllowedRolesByIssuer](GnosisIam.GnosisIam-1.md#getallowedrolesbyissuer)
- [getAppsByOrgNamespace](GnosisIam.GnosisIam-1.md#getappsbyorgnamespace)
- [getAssetById](GnosisIam.GnosisIam-1.md#getassetbyid)
- [getAssetHistory](GnosisIam.GnosisIam-1.md#getassethistory)
- [getClaimsByIssuer](GnosisIam.GnosisIam-1.md#getclaimsbyissuer)
- [getClaimsByRequester](GnosisIam.GnosisIam-1.md#getclaimsbyrequester)
- [getClaimsBySubject](GnosisIam.GnosisIam-1.md#getclaimsbysubject)
- [getClaimsBySubjects](GnosisIam.GnosisIam-1.md#getclaimsbysubjects)
- [getDefinition](GnosisIam.GnosisIam-1.md#getdefinition)
- [getDid](GnosisIam.GnosisIam-1.md#getdid)
- [getDidDocument](GnosisIam.GnosisIam-1.md#getdiddocument)
- [getENSTypesByOwner](GnosisIam.GnosisIam-1.md#getenstypesbyowner)
- [getENSTypesBySearchPhrase](GnosisIam.GnosisIam-1.md#getenstypesbysearchphrase)
- [getOfferedAssets](GnosisIam.GnosisIam-1.md#getofferedassets)
- [getOrgHierarchy](GnosisIam.GnosisIam-1.md#getorghierarchy)
- [getOwnedAssets](GnosisIam.GnosisIam-1.md#getownedassets)
- [getPreviouslyOwnedAssets](GnosisIam.GnosisIam-1.md#getpreviouslyownedassets)
- [getProviderType](GnosisIam.GnosisIam-1.md#getprovidertype)
- [getRoleDIDs](GnosisIam.GnosisIam-1.md#getroledids)
- [getRolesByNamespace](GnosisIam.GnosisIam-1.md#getrolesbynamespace)
- [getRolesDefinition](GnosisIam.GnosisIam-1.md#getrolesdefinition)
- [getSigner](GnosisIam.GnosisIam-1.md#getsigner)
- [getSubOrgsByOrgNamespace](GnosisIam.GnosisIam-1.md#getsuborgsbyorgnamespace)
- [getSubdomains](GnosisIam.GnosisIam-1.md#getsubdomains)
- [getUserClaims](GnosisIam.GnosisIam-1.md#getuserclaims)
- [initializeConnection](GnosisIam.GnosisIam-1.md#initializeconnection)
- [isConnected](GnosisIam.GnosisIam-1.md#isconnected)
- [isOwner](GnosisIam.GnosisIam-1.md#isowner)
- [isSessionActive](GnosisIam.GnosisIam-1.md#issessionactive)
- [issueClaim](GnosisIam.GnosisIam-1.md#issueclaim)
- [issueClaimRequest](GnosisIam.GnosisIam-1.md#issueclaimrequest)
- [issuePublicClaim](GnosisIam.GnosisIam-1.md#issuepublicclaim)
- [namespacesWithRelations](GnosisIam.GnosisIam-1.md#namespaceswithrelations)
- [offerAsset](GnosisIam.GnosisIam-1.md#offerasset)
- [on](GnosisIam.GnosisIam-1.md#on)
- [publishPublicClaim](GnosisIam.GnosisIam-1.md#publishpublicclaim)
- [registerAsset](GnosisIam.GnosisIam-1.md#registerasset)
- [registrationTypesOfRoles](GnosisIam.GnosisIam-1.md#registrationtypesofroles)
- [rejectAssetOffer](GnosisIam.GnosisIam-1.md#rejectassetoffer)
- [rejectClaimRequest](GnosisIam.GnosisIam-1.md#rejectclaimrequest)
- [revokeDidDocument](GnosisIam.GnosisIam-1.md#revokediddocument)
- [setRoleDefinition](GnosisIam.GnosisIam-1.md#setroledefinition)
- [subscribeTo](GnosisIam.GnosisIam-1.md#subscribeto)
- [unsubscribeFrom](GnosisIam.GnosisIam-1.md#unsubscribefrom)
- [updateDidDocument](GnosisIam.GnosisIam-1.md#updatediddocument)
- [validateOwnership](GnosisIam.GnosisIam-1.md#validateownership)
- [verifyPublicClaim](GnosisIam.GnosisIam-1.md#verifypublicclaim)
- [isMetamaskExtensionPresent](GnosisIam.GnosisIam-1.md#ismetamaskextensionpresent)

## Constructors

### constructor

• **new GnosisIam**(`safeAppSdk`, `iamOpts`)

IAM Constructor

#### Parameters

| Name | Type |
| :------ | :------ |
| `safeAppSdk` | `SafeAppsSDK` |
| `iamOpts` | [`ConnectionOptions`](../modules/iam_iam_base.md#connectionoptions) |

#### Overrides

[IAM](iam.IAM.md).[constructor](iam.IAM.md#constructor)

## Accessors

### address

• `get` **address**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

___

### safeAddress

• `get` **safeAddress**(): `string`

#### Returns

`string`

## Methods

### acceptAssetOffer

▸ **acceptAssetOffer**(`__namedParameters`): `Promise`<`void`\>

**`description`** Accept an offered Asset

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.assetDID` | `string` |

#### Returns

`Promise`<`void`\>

#### Inherited from

[IAM](iam.IAM.md).[acceptAssetOffer](iam.IAM.md#acceptassetoffer)

___

### cancelAssetOffer

▸ **cancelAssetOffer**(`__namedParameters`): `Promise`<`void`\>

**`description`** Cancel an Asset offer

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.assetDID` | `string` |

#### Returns

`Promise`<`void`\>

#### Inherited from

[IAM](iam.IAM.md).[cancelAssetOffer](iam.IAM.md#cancelassetoffer)

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

#### Inherited from

[IAM](iam.IAM.md).[changeAppOwnership](iam.IAM.md#changeappownership)

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

#### Inherited from

[IAM](iam.IAM.md).[changeOrgOwnership](iam.IAM.md#changeorgownership)

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

#### Inherited from

[IAM](iam.IAM.md).[changeRoleOwnership](iam.IAM.md#changeroleownership)

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

#### Inherited from

[IAM](iam.IAM.md).[checkExistenceOfDomain](iam.IAM.md#checkexistenceofdomain)

___

### closeConnection

▸ **closeConnection**(): `Promise`<`void`\>

**`description`** Closes the connection between application and the signer's wallet

#### Returns

`Promise`<`void`\>

#### Inherited from

[IAM](iam.IAM.md).[closeConnection](iam.IAM.md#closeconnection)

___

### connectToCacheServer

▸ **connectToCacheServer**(): `Promise`<`void`\>

**`description`** Establishes connection to the cache serverand sets public key and identity token

#### Returns

`Promise`<`void`\>

#### Inherited from

[IAM](iam.IAM.md).[connectToCacheServer](iam.IAM.md#connecttocacheserver)

___

### connectToDIDRegistry

▸ **connectToDIDRegistry**(): `Promise`<`void`\>

**`description`** Creates the signer's DID document if it does not exist

#### Returns

`Promise`<`void`\>

#### Inherited from

[IAM](iam.IAM.md).[connectToDIDRegistry](iam.IAM.md#connecttodidregistry)

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

#### Inherited from

[IAM](iam.IAM.md).[createApplication](iam.IAM.md#createapplication)

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

#### Inherited from

[IAM](iam.IAM.md).[createClaimRequest](iam.IAM.md#createclaimrequest)

___

### createDelegateProof

▸ **createDelegateProof**(`delegateKey`, `rpcUrl`, `identity`): `Promise`<`string`\>

**`description`** create a proof of identity delegate

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `delegateKey` | `string` | private key of the delegate |
| `rpcUrl` | `string` | the url of the blockchain provider |
| `identity` | `string` | Did of the delegate |

#### Returns

`Promise`<`string`\>

token of delegate

#### Inherited from

[IAM](iam.IAM.md).[createDelegateProof](iam.IAM.md#createdelegateproof)

___

### createIdentityProof

▸ **createIdentityProof**(): `Promise`<`string`\>

**`description`** create a public claim to prove identity

#### Returns

`Promise`<`string`\>

JWT token of created identity

#### Inherited from

[IAM](iam.IAM.md).[createIdentityProof](iam.IAM.md#createidentityproof)

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

#### Inherited from

[IAM](iam.IAM.md).[createOrganization](iam.IAM.md#createorganization)

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

#### Inherited from

[IAM](iam.IAM.md).[createProofClaim](iam.IAM.md#createproofclaim)

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

#### Inherited from

[IAM](iam.IAM.md).[createPublicClaim](iam.IAM.md#createpublicclaim)

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

#### Inherited from

[IAM](iam.IAM.md).[createRole](iam.IAM.md#createrole)

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

#### Inherited from

[IAM](iam.IAM.md).[createSelfSignedClaim](iam.IAM.md#createselfsignedclaim)

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

#### Inherited from

[IAM](iam.IAM.md).[decodeJWTToken](iam.IAM.md#decodejwttoken)

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

#### Inherited from

[IAM](iam.IAM.md).[deleteApplication](iam.IAM.md#deleteapplication)

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

#### Inherited from

[IAM](iam.IAM.md).[deleteClaim](iam.IAM.md#deleteclaim)

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

#### Inherited from

[IAM](iam.IAM.md).[deleteOrganization](iam.IAM.md#deleteorganization)

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

#### Inherited from

[IAM](iam.IAM.md).[deleteRole](iam.IAM.md#deleterole)

___

### getAllowedRolesByIssuer

▸ **getAllowedRolesByIssuer**(`__namedParameters`): `Promise`<`string`[]\>

getAllowedRolesByIssuer

**`description`** get all roles that a DID can issue, given its role credentials and all role definitions

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `__namedParameters` | `Object` | - |
| `__namedParameters.did` | `string` | DID of issuer |

#### Returns

`Promise`<`string`[]\>

array of roles that the DID can issue

#### Inherited from

[IAM](iam.IAM.md).[getAllowedRolesByIssuer](iam.IAM.md#getallowedrolesbyissuer)

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

#### Inherited from

[IAM](iam.IAM.md).[getAppsByOrgNamespace](iam.IAM.md#getappsbyorgnamespace)

___

### getAssetById

▸ **getAssetById**(`__namedParameters`): `Promise`<[`Asset`](../interfaces/cacheServerClient_cacheServerClient_types.Asset.md)\>

**`description`** Get Asset by Id

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `__namedParameters` | `Object` | - |
| `__namedParameters.id` | `string` | Asset Id |

#### Returns

`Promise`<[`Asset`](../interfaces/cacheServerClient_cacheServerClient_types.Asset.md)\>

Asset

#### Inherited from

[IAM](iam.IAM.md).[getAssetById](iam.IAM.md#getassetbyid)

___

### getAssetHistory

▸ **getAssetHistory**(`__namedParameters`): `Promise`<[`AssetHistory`](../interfaces/cacheServerClient_cacheServerClient_types.AssetHistory.md)[]\>

**`description`** Get history of a given Asset Id

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

Asset[] || []

#### Inherited from

[IAM](iam.IAM.md).[getAssetHistory](iam.IAM.md#getassethistory)

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

#### Inherited from

[IAM](iam.IAM.md).[getClaimsByIssuer](iam.IAM.md#getclaimsbyissuer)

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

#### Inherited from

[IAM](iam.IAM.md).[getClaimsByRequester](iam.IAM.md#getclaimsbyrequester)

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

#### Inherited from

[IAM](iam.IAM.md).[getClaimsBySubject](iam.IAM.md#getclaimsbysubject)

___

### getClaimsBySubjects

▸ **getClaimsBySubjects**(`subjects`): `Promise`<[`Claim`](../interfaces/cacheServerClient_cacheServerClient_types.Claim.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `subjects` | `string`[] |

#### Returns

`Promise`<[`Claim`](../interfaces/cacheServerClient_cacheServerClient_types.Claim.md)[]\>

#### Inherited from

[IAM](iam.IAM.md).[getClaimsBySubjects](iam.IAM.md#getclaimsbysubjects)

___

### getDefinition

▸ **getDefinition**(`__namedParameters`): `Promise`<`IRoleDefinition` \| `IAppDefinition` \| `IOrganizationDefinition`\>

getDefinition

**`description`** get role definition form ens domain metadata record

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.namespace` | `string` |
| `__namedParameters.type` | [`ENSNamespaceTypes`](../enums/iam.ENSNamespaceTypes.md) |

#### Returns

`Promise`<`IRoleDefinition` \| `IAppDefinition` \| `IOrganizationDefinition`\>

metadata string or empty string when there is no metadata

#### Inherited from

[IAM](iam.IAM.md).[getDefinition](iam.IAM.md#getdefinition)

___

### getDid

▸ **getDid**(): `undefined` \| `string`

Get DID

#### Returns

`undefined` \| `string`

did string if connected to wallet, if not returns undefined

#### Inherited from

[IAM](iam.IAM.md).[getDid](iam.IAM.md#getdid)

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

#### Inherited from

[IAM](iam.IAM.md).[getDidDocument](iam.IAM.md#getdiddocument)

___

### getENSTypesByOwner

▸ **getENSTypesByOwner**(`__namedParameters`): `Promise`<[`IOrganization`](../interfaces/cacheServerClient_cacheServerClient_types.IOrganization.md)[]\> \| `Promise`<[`IApp`](../interfaces/cacheServerClient_cacheServerClient_types.IApp.md)[]\> \| `Promise`<[`IRole`](../interfaces/cacheServerClient_cacheServerClient_types.IRole.md)[]\>

getENSTypesByOwner

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.owner` | `string` |
| `__namedParameters.type` | [`ENSNamespaceTypes`](../enums/iam.ENSNamespaceTypes.md) |

#### Returns

`Promise`<[`IOrganization`](../interfaces/cacheServerClient_cacheServerClient_types.IOrganization.md)[]\> \| `Promise`<[`IApp`](../interfaces/cacheServerClient_cacheServerClient_types.IApp.md)[]\> \| `Promise`<[`IRole`](../interfaces/cacheServerClient_cacheServerClient_types.IRole.md)[]\>

#### Overrides

[IAM](iam.IAM.md).[getENSTypesByOwner](iam.IAM.md#getenstypesbyowner)

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

#### Inherited from

[IAM](iam.IAM.md).[getENSTypesBySearchPhrase](iam.IAM.md#getenstypesbysearchphrase)

___

### getOfferedAssets

▸ **getOfferedAssets**(`__namedParameters?`): `Promise`<[`Asset`](../interfaces/cacheServerClient_cacheServerClient_types.Asset.md)[]\>

**`description`** Get all Assets offered to current User

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.did?` | `string` |

#### Returns

`Promise`<[`Asset`](../interfaces/cacheServerClient_cacheServerClient_types.Asset.md)[]\>

Asset[] || []

#### Inherited from

[IAM](iam.IAM.md).[getOfferedAssets](iam.IAM.md#getofferedassets)

___

### getOrgHierarchy

▸ **getOrgHierarchy**(`__namedParameters`): `Promise`<[`IOrganization`](../interfaces/cacheServerClient_cacheServerClient_types.IOrganization.md)\>

getOrgHierarchy

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.namespace` | `string` |

#### Returns

`Promise`<[`IOrganization`](../interfaces/cacheServerClient_cacheServerClient_types.IOrganization.md)\>

#### Overrides

[IAM](iam.IAM.md).[getOrgHierarchy](iam.IAM.md#getorghierarchy)

___

### getOwnedAssets

▸ **getOwnedAssets**(`__namedParameters?`): `Promise`<[`Asset`](../interfaces/cacheServerClient_cacheServerClient_types.Asset.md)[]\>

**`description`** Retrieve all owned assets for the User's DID

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.did?` | `string` |

#### Returns

`Promise`<[`Asset`](../interfaces/cacheServerClient_cacheServerClient_types.Asset.md)[]\>

#### Inherited from

[IAM](iam.IAM.md).[getOwnedAssets](iam.IAM.md#getownedassets)

___

### getPreviouslyOwnedAssets

▸ **getPreviouslyOwnedAssets**(`__namedParameters`): `Promise`<[`Asset`](../interfaces/cacheServerClient_cacheServerClient_types.Asset.md)[]\>

**`description`** Get previously owned asset for a given DID

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.owner` | `string` |

#### Returns

`Promise`<[`Asset`](../interfaces/cacheServerClient_cacheServerClient_types.Asset.md)[]\>

Asset[] || []

#### Inherited from

[IAM](iam.IAM.md).[getPreviouslyOwnedAssets](iam.IAM.md#getpreviouslyownedassets)

___

### getProviderType

▸ **getProviderType**(): [`WalletProvider`](../enums/types_WalletProvider.WalletProvider.md)

Get the current initialized provider type

#### Returns

[`WalletProvider`](../enums/types_WalletProvider.WalletProvider.md)

provider type if the session is active if not undefined

#### Inherited from

[IAM](iam.IAM.md).[getProviderType](iam.IAM.md#getprovidertype)

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

#### Inherited from

[IAM](iam.IAM.md).[getRoleDIDs](iam.IAM.md#getroledids)

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

#### Inherited from

[IAM](iam.IAM.md).[getRolesByNamespace](iam.IAM.md#getrolesbynamespace)

___

### getRolesDefinition

▸ **getRolesDefinition**(`__namedParameters`): `Promise`<`Record`<`string`, `IRoleDefinition`\>\>

getRolesDefinition

**`description`** get roles definition form ens domain metadata record

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.namespaces` | `string`[] |

#### Returns

`Promise`<`Record`<`string`, `IRoleDefinition`\>\>

array of metadata strings

#### Inherited from

[IAM](iam.IAM.md).[getRolesDefinition](iam.IAM.md#getrolesdefinition)

___

### getSigner

▸ **getSigner**(): `undefined` \| `JsonRpcSigner` \| `Signer`

Get signer

#### Returns

`undefined` \| `JsonRpcSigner` \| `Signer`

JsonRpcSigner if connected to wallet, if not returns undefined

#### Inherited from

[IAM](iam.IAM.md).[getSigner](iam.IAM.md#getsigner)

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

#### Inherited from

[IAM](iam.IAM.md).[getSubOrgsByOrgNamespace](iam.IAM.md#getsuborgsbyorgnamespace)

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

#### Inherited from

[IAM](iam.IAM.md).[getSubdomains](iam.IAM.md#getsubdomains)

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

#### Inherited from

[IAM](iam.IAM.md).[getUserClaims](iam.IAM.md#getuserclaims)

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

#### Inherited from

[IAM](iam.IAM.md).[initializeConnection](iam.IAM.md#initializeconnection)

___

### isConnected

▸ **isConnected**(): `boolean`

isConnected

#### Returns

`boolean`

info if the connection to wallet/signer is already established

#### Inherited from

[IAM](iam.IAM.md).[isConnected](iam.IAM.md#isconnected)

___

### isOwner

▸ **isOwner**(`__namedParameters`): `Promise`<`boolean`\>

**`description`** Checks whether the `domain` is owned by `user` or by
gnosis wallet controlled by `user`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.domain` | `string` |
| `__namedParameters.user?` | `string` |

#### Returns

`Promise`<`boolean`\>

#### Overrides

[IAM](iam.IAM.md).[isOwner](iam.IAM.md#isowner)

___

### isSessionActive

▸ **isSessionActive**(): `boolean`

**`description`** Checks if the session is active

#### Returns

`boolean`

boolean that indicates the session state

#### Inherited from

[IAM](iam.IAM.md).[isSessionActive](iam.IAM.md#issessionactive)

___

### issueClaim

▸ **issueClaim**(`__namedParameters`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.claim` | `Object` |
| `__namedParameters.claim.claimType` | `string` |
| `__namedParameters.claim.claimTypeVersion` | `number` |
| `__namedParameters.claim.fields` | { `key`: `string` ; `value`: `string` \| `number`  }[] |
| `__namedParameters.subject` | `string` |

#### Returns

`Promise`<`string`\>

#### Inherited from

[IAM](iam.IAM.md).[issueClaim](iam.IAM.md#issueclaim)

___

### issueClaimRequest

▸ **issueClaimRequest**(`__namedParameters`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.claimParams?` | `Record`<`string`, `string`\> |
| `__namedParameters.id` | `string` |
| `__namedParameters.registrationTypes` | [`RegistrationTypes`](../enums/cacheServerClient_cacheServerClient_types.RegistrationTypes.md)[] |
| `__namedParameters.requester` | `string` |
| `__namedParameters.subjectAgreement` | `string` |
| `__namedParameters.token` | `string` |

#### Returns

`Promise`<`void`\>

#### Inherited from

[IAM](iam.IAM.md).[issueClaimRequest](iam.IAM.md#issueclaimrequest)

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

#### Inherited from

[IAM](iam.IAM.md).[issuePublicClaim](iam.IAM.md#issuepublicclaim)

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

#### Inherited from

[IAM](iam.IAM.md).[namespacesWithRelations](iam.IAM.md#namespaceswithrelations)

___

### offerAsset

▸ **offerAsset**(`__namedParameters`): `Promise`<`void`\>

**`description`** Offer asset to a given address

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.assetDID` | `string` |
| `__namedParameters.offerTo` | `string` |

#### Returns

`Promise`<`void`\>

#### Inherited from

[IAM](iam.IAM.md).[offerAsset](iam.IAM.md#offerasset)

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

[IAM](iam.IAM.md).[on](iam.IAM.md#on)

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

#### Inherited from

[IAM](iam.IAM.md).[publishPublicClaim](iam.IAM.md#publishpublicclaim)

___

### registerAsset

▸ **registerAsset**(): `Promise`<`string`\>

**`description`** Registers a new Asset to the User

#### Returns

`Promise`<`string`\>

Asset DID

#### Inherited from

[IAM](iam.IAM.md).[registerAsset](iam.IAM.md#registerasset)

___

### registrationTypesOfRoles

▸ **registrationTypesOfRoles**(`roles`): `Promise`<`Record`<`string`, `Set`<[`RegistrationTypes`](../enums/cacheServerClient_cacheServerClient_types.RegistrationTypes.md)\>\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `roles` | `string`[] |

#### Returns

`Promise`<`Record`<`string`, `Set`<[`RegistrationTypes`](../enums/cacheServerClient_cacheServerClient_types.RegistrationTypes.md)\>\>\>

#### Inherited from

[IAM](iam.IAM.md).[registrationTypesOfRoles](iam.IAM.md#registrationtypesofroles)

___

### rejectAssetOffer

▸ **rejectAssetOffer**(`__namedParameters`): `Promise`<`void`\>

**`description`** Reject an offered Asset

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.assetDID` | `string` |

#### Returns

`Promise`<`void`\>

#### Inherited from

[IAM](iam.IAM.md).[rejectAssetOffer](iam.IAM.md#rejectassetoffer)

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

#### Inherited from

[IAM](iam.IAM.md).[rejectClaimRequest](iam.IAM.md#rejectclaimrequest)

___

### revokeDidDocument

▸ **revokeDidDocument**(): `Promise`<`boolean`\>

revokeDidDocument

**`description`** revokes did document

#### Returns

`Promise`<`boolean`\>

information (true/false) if the DID document was revoked

#### Inherited from

[IAM](iam.IAM.md).[revokeDidDocument](iam.IAM.md#revokediddocument)

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
| `__namedParameters.data` | `IRoleDefinition` \| `IAppDefinition` \| `IOrganizationDefinition` |
| `__namedParameters.domain` | `string` |

#### Returns

`Promise`<`void`\>

#### Inherited from

[IAM](iam.IAM.md).[setRoleDefinition](iam.IAM.md#setroledefinition)

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

#### Inherited from

[IAM](iam.IAM.md).[subscribeTo](iam.IAM.md#subscribeto)

___

### unsubscribeFrom

▸ **unsubscribeFrom**(`subscriptionId`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `subscriptionId` | `number` |

#### Returns

`Promise`<`void`\>

#### Inherited from

[IAM](iam.IAM.md).[unsubscribeFrom](iam.IAM.md#unsubscribefrom)

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

#### Inherited from

[IAM](iam.IAM.md).[updateDidDocument](iam.IAM.md#updatediddocument)

___

### validateOwnership

▸ **validateOwnership**(`__namedParameters`): `Promise`<`string`[]\>

validateOwnership

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.namespace` | `string` |
| `__namedParameters.type` | [`ENSNamespaceTypes`](../enums/iam.ENSNamespaceTypes.md) |

#### Returns

`Promise`<`string`[]\>

#### Overrides

[IAM](iam.IAM.md).[validateOwnership](iam.IAM.md#validateownership)

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

#### Inherited from

[IAM](iam.IAM.md).[verifyPublicClaim](iam.IAM.md#verifypublicclaim)

___

### isMetamaskExtensionPresent

▸ `Static` **isMetamaskExtensionPresent**(): `Promise`<`Object`\>

#### Returns

`Promise`<`Object`\>

#### Inherited from

[IAM](iam.IAM.md).[isMetamaskExtensionPresent](iam.IAM.md#ismetamaskextensionpresent)
