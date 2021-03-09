**[iam-client-lib](../README.md)**

# Class: GnosisIam

**`description`** Intended for use in Volta Gnosis web interface(https://volta.gnosis-safe.io/).
Dapp should provide this class with SafeAppSdk injected by Gnosis interface. This class intoduces
notion of controlled domain as that which is owned by gnosis wallet controlled by Iam signer.
The domain ownership functionality has been redefined accordingly.

## Hierarchy

* [IAM](iam.md)

  ↳ **GnosisIam**

## Index

### Constructors

* [constructor](gnosisiam.md#constructor)

### Accessors

* [address](gnosisiam.md#address)
* [safeAddress](gnosisiam.md#safeaddress)

### Methods

* [changeAppOwnership](gnosisiam.md#changeappownership)
* [changeOrgOwnership](gnosisiam.md#changeorgownership)
* [changeRoleOwnership](gnosisiam.md#changeroleownership)
* [checkExistenceOfDomain](gnosisiam.md#checkexistenceofdomain)
* [closeConnection](gnosisiam.md#closeconnection)
* [createApplication](gnosisiam.md#createapplication)
* [createClaimRequest](gnosisiam.md#createclaimrequest)
* [createIdentityProof](gnosisiam.md#createidentityproof)
* [createOrganization](gnosisiam.md#createorganization)
* [createProofClaim](gnosisiam.md#createproofclaim)
* [createPublicClaim](gnosisiam.md#createpublicclaim)
* [createRole](gnosisiam.md#createrole)
* [createSelfSignedClaim](gnosisiam.md#createselfsignedclaim)
* [decodeJWTToken](gnosisiam.md#decodejwttoken)
* [deleteApplication](gnosisiam.md#deleteapplication)
* [deleteClaim](gnosisiam.md#deleteclaim)
* [deleteOrganization](gnosisiam.md#deleteorganization)
* [deleteRole](gnosisiam.md#deleterole)
* [getAppsByOrgNamespace](gnosisiam.md#getappsbyorgnamespace)
* [getDefinition](gnosisiam.md#getdefinition)
* [getDid](gnosisiam.md#getdid)
* [getDidDocument](gnosisiam.md#getdiddocument)
* [getENSTypesByOwner](gnosisiam.md#getenstypesbyowner)
* [getENSTypesBySearchPhrase](gnosisiam.md#getenstypesbysearchphrase)
* [getIssuedClaims](gnosisiam.md#getissuedclaims)
* [getOrgHierarchy](gnosisiam.md#getorghierarchy)
* [getProviderType](gnosisiam.md#getprovidertype)
* [getRequestedClaims](gnosisiam.md#getrequestedclaims)
* [getRoleDIDs](gnosisiam.md#getroledids)
* [getRolesByNamespace](gnosisiam.md#getrolesbynamespace)
* [getSigner](gnosisiam.md#getsigner)
* [getSubOrgsByOrgNamespace](gnosisiam.md#getsuborgsbyorgnamespace)
* [getSubdomains](gnosisiam.md#getsubdomains)
* [getUserClaims](gnosisiam.md#getuserclaims)
* [initializeConnection](gnosisiam.md#initializeconnection)
* [isConnected](gnosisiam.md#isconnected)
* [isOwner](gnosisiam.md#isowner)
* [isSessionActive](gnosisiam.md#issessionactive)
* [issueClaimRequest](gnosisiam.md#issueclaimrequest)
* [issuePublicClaim](gnosisiam.md#issuepublicclaim)
* [namespacesWithRelations](gnosisiam.md#namespaceswithrelations)
* [on](gnosisiam.md#on)
* [publishPublicClaim](gnosisiam.md#publishpublicclaim)
* [rejectClaimRequest](gnosisiam.md#rejectclaimrequest)
* [revokeDidDocument](gnosisiam.md#revokediddocument)
* [setRoleDefinition](gnosisiam.md#setroledefinition)
* [subscribeToMessages](gnosisiam.md#subscribetomessages)
* [unsubscribeFromMessages](gnosisiam.md#unsubscribefrommessages)
* [updateDidDocument](gnosisiam.md#updatediddocument)
* [validateOwnership](gnosisiam.md#validateownership)
* [verifyPublicClaim](gnosisiam.md#verifypublicclaim)
* [isMetamaskExtensionPresent](gnosisiam.md#ismetamaskextensionpresent)

## Constructors

### constructor

\+ **new GnosisIam**(`safeAppSdk`: SafeAppSdk, `iamOpts`: [ConnectionOptions](../globals.md#connectionoptions)): [GnosisIam](gnosisiam.md)

*Overrides [IAMBase](iambase.md).[constructor](iambase.md#constructor)*

#### Parameters:

Name | Type |
------ | ------ |
`safeAppSdk` | SafeAppSdk |
`iamOpts` | [ConnectionOptions](../globals.md#connectionoptions) |

**Returns:** [GnosisIam](gnosisiam.md)

## Accessors

### address

• get **address**(): undefined \| string

*Inherited from [IAMBase](iambase.md).[address](iambase.md#address)*

**Returns:** undefined \| string

___

### safeAddress

• get **safeAddress**(): string

**Returns:** string

## Methods

### changeAppOwnership

▸ **changeAppOwnership**(`__namedParameters`: { namespace: string ; newOwner: string ; returnSteps: undefined \| false \| true  }): Promise\<{ info: string = \`Changing ownership of ${namespace}\`; tx: [EncodedCall](../globals.md#encodedcall) ; next: (\_\_namedParameters: { retryCheck: undefined \| false \| true  }) => Promise\<void>  }[]>

*Inherited from [IAM](iam.md).[changeAppOwnership](iam.md#changeappownership)*

changeAppOwnership

**`description`** change owner ship of app subdomain and all app owned subdomains

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { namespace: string ; newOwner: string ; returnSteps: undefined \| false \| true  } |

**Returns:** Promise\<{ info: string = \`Changing ownership of ${namespace}\`; tx: [EncodedCall](../globals.md#encodedcall) ; next: (\_\_namedParameters: { retryCheck: undefined \| false \| true  }) => Promise\<void>  }[]>

return array of steps needed to change ownership

___

### changeOrgOwnership

▸ **changeOrgOwnership**(`__namedParameters`: { namespace: string ; newOwner: string ; returnSteps: boolean = false }): Promise\<{ info: string = \`Changing ownership of ${namespace}\`; tx: [EncodedCall](../globals.md#encodedcall) ; next: (\_\_namedParameters: { retryCheck: undefined \| false \| true  }) => Promise\<void>  }[]>

*Inherited from [IAM](iam.md).[changeOrgOwnership](iam.md#changeorgownership)*

changeOrgOwnership

**`description`** change owner ship of org subdomain and all org owned roles subdomains

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { namespace: string ; newOwner: string ; returnSteps: boolean = false } |

**Returns:** Promise\<{ info: string = \`Changing ownership of ${namespace}\`; tx: [EncodedCall](../globals.md#encodedcall) ; next: (\_\_namedParameters: { retryCheck: undefined \| false \| true  }) => Promise\<void>  }[]>

return array of steps needed to change ownership

___

### changeRoleOwnership

▸ **changeRoleOwnership**(`__namedParameters`: { namespace: string ; newOwner: string  }): Promise\<void>

*Inherited from [IAM](iam.md).[changeRoleOwnership](iam.md#changeroleownership)*

changeRoleOwnership

**`description`** change ownership of role subdomain

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { namespace: string ; newOwner: string  } |

**Returns:** Promise\<void>

___

### checkExistenceOfDomain

▸ **checkExistenceOfDomain**(`__namedParameters`: { domain: string  }): Promise\<boolean>

*Inherited from [IAM](iam.md).[checkExistenceOfDomain](iam.md#checkexistenceofdomain)*

checkExistenceOfDomain

**`description`** check existence of domain in ENS registry

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { domain: string  } |

**Returns:** Promise\<boolean>

true or false whatever the domain is present

___

### closeConnection

▸ **closeConnection**(): Promise\<void>

*Inherited from [IAMBase](iambase.md).[closeConnection](iambase.md#closeconnection)*

Close connection to wallet

**`description`** closes the connection between dApp and the wallet

**Returns:** Promise\<void>

___

### createApplication

▸ **createApplication**(`__namedParameters`: { appName: string ; data: [IAppDefinition](../interfaces/iappdefinition.md) ; domain: string ; returnSteps: undefined \| false \| true  }): Promise\<{ next: () => Promise\<void>  }[]>

*Inherited from [IAM](iam.md).[createApplication](iam.md#createapplication)*

createApp

**`description`** creates role (create subdomain, sets the domain name and sets the role definition to metadata record in ENS Domain)

**`description`** creates roles subdomain for the app namespace

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { appName: string ; data: [IAppDefinition](../interfaces/iappdefinition.md) ; domain: string ; returnSteps: undefined \| false \| true  } |

**Returns:** Promise\<{ next: () => Promise\<void>  }[]>

___

### createClaimRequest

▸ **createClaimRequest**(`__namedParameters`: { claim: { claimType: string ; fields: { key: string ; value: string \| number  }[]  } ; issuer: string[]  }): Promise\<void>

*Inherited from [IAM](iam.md).[createClaimRequest](iam.md#createclaimrequest)*

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { claim: { claimType: string ; fields: { key: string ; value: string \| number  }[]  } ; issuer: string[]  } |

**Returns:** Promise\<void>

___

### createIdentityProof

▸ **createIdentityProof**(): Promise\<string>

*Inherited from [IAM](iam.md).[createIdentityProof](iam.md#createidentityproof)*

**Returns:** Promise\<string>

___

### createOrganization

▸ **createOrganization**(`__namedParameters`: { data: [IOrganizationDefinition](../interfaces/iorganizationdefinition.md) ; namespace: string ; orgName: string ; returnSteps: undefined \| false \| true  }): Promise\<{ next: () => Promise\<void>  }[]>

*Inherited from [IAM](iam.md).[createOrganization](iam.md#createorganization)*

createOrganization

**`description`** creates organization (create subdomain, sets the domain name and sets the role definition to metadata record in ENS Domain)

**`description`** and sets subdomain for roles and app for org namespace

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { data: [IOrganizationDefinition](../interfaces/iorganizationdefinition.md) ; namespace: string ; orgName: string ; returnSteps: undefined \| false \| true  } |

**Returns:** Promise\<{ next: () => Promise\<void>  }[]>

___

### createProofClaim

▸ **createProofClaim**(`__namedParameters`: { claimUrl: string ; saltedFields: ISaltedFields  }): Promise\<string>

*Inherited from [IAM](iam.md).[createProofClaim](iam.md#createproofclaim)*

createProofClaim

**`description`** creates a proof of a claim

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { claimUrl: string ; saltedFields: ISaltedFields  } |

**Returns:** Promise\<string>

proof token

___

### createPublicClaim

▸ **createPublicClaim**(`__namedParameters`: { data: [ClaimData](../interfaces/claimdata.md) ; subject: undefined \| string  }): Promise\<string>

*Inherited from [IAM](iam.md).[createPublicClaim](iam.md#createpublicclaim)*

createPublicClaim

**`description`** create a public claim based on data provided

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { data: [ClaimData](../interfaces/claimdata.md) ; subject: undefined \| string  } |

**Returns:** Promise\<string>

JWT token of created claim

___

### createRole

▸ **createRole**(`__namedParameters`: { data: [IRoleDefinition](../interfaces/iroledefinition.md) ; namespace: string ; returnSteps: undefined \| false \| true ; roleName: string  }): Promise\<{ next: () => Promise\<void>  }[]>

*Inherited from [IAM](iam.md).[createRole](iam.md#createrole)*

createRole

**`description`** creates role (create subdomain, sets the domain name and sets the role definition to metadata record in ENS Domain)

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { data: [IRoleDefinition](../interfaces/iroledefinition.md) ; namespace: string ; returnSteps: undefined \| false \| true ; roleName: string  } |

**Returns:** Promise\<{ next: () => Promise\<void>  }[]>

information (true/false) if the role was created

___

### createSelfSignedClaim

▸ **createSelfSignedClaim**(`__namedParameters`: { data: [ClaimData](../interfaces/claimdata.md) ; subject: undefined \| string  }): Promise\<string>

*Inherited from [IAM](iam.md).[createSelfSignedClaim](iam.md#createselfsignedclaim)*

createSelfSignedClaim

**`description`** creates self signed claim and upload the data to ipfs

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { data: [ClaimData](../interfaces/claimdata.md) ; subject: undefined \| string  } |

**Returns:** Promise\<string>

___

### decodeJWTToken

▸ **decodeJWTToken**(`__namedParameters`: { token: string  }): Promise\<string \| { [key:string]: string \| object;  }>

*Inherited from [IAM](iam.md).[decodeJWTToken](iam.md#decodejwttoken)*

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { token: string  } |

**Returns:** Promise\<string \| { [key:string]: string \| object;  }>

___

### deleteApplication

▸ **deleteApplication**(`__namedParameters`: { namespace: string ; returnSteps: undefined \| false \| true  }): Promise\<{ info: string = \`Deleting ${namespace}\`; tx: [EncodedCall](../globals.md#encodedcall) ; next: (\_\_namedParameters: { retryCheck: undefined \| false \| true  }) => Promise\<void>  }[]>

*Inherited from [IAM](iam.md).[deleteApplication](iam.md#deleteapplication)*

deleteApplication

**`description`** delete application and roles

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { namespace: string ; returnSteps: undefined \| false \| true  } |

**Returns:** Promise\<{ info: string = \`Deleting ${namespace}\`; tx: [EncodedCall](../globals.md#encodedcall) ; next: (\_\_namedParameters: { retryCheck: undefined \| false \| true  }) => Promise\<void>  }[]>

___

### deleteClaim

▸ **deleteClaim**(`__namedParameters`: { id: string  }): Promise\<void>

*Inherited from [IAM](iam.md).[deleteClaim](iam.md#deleteclaim)*

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { id: string  } |

**Returns:** Promise\<void>

___

### deleteOrganization

▸ **deleteOrganization**(`__namedParameters`: { namespace: string ; returnSteps: undefined \| false \| true  }): Promise\<{ info: string = \`Deleting ${namespace}\`; tx: [EncodedCall](../globals.md#encodedcall) ; next: (\_\_namedParameters: { retryCheck: undefined \| false \| true  }) => Promise\<void>  }[]>

*Inherited from [IAM](iam.md).[deleteOrganization](iam.md#deleteorganization)*

deleteOrganization

**`description`** delete organization and roles

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { namespace: string ; returnSteps: undefined \| false \| true  } |

**Returns:** Promise\<{ info: string = \`Deleting ${namespace}\`; tx: [EncodedCall](../globals.md#encodedcall) ; next: (\_\_namedParameters: { retryCheck: undefined \| false \| true  }) => Promise\<void>  }[]>

___

### deleteRole

▸ **deleteRole**(`__namedParameters`: { namespace: string  }): Promise\<void>

*Inherited from [IAM](iam.md).[deleteRole](iam.md#deleterole)*

deleteRole

**`description`** delete role

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { namespace: string  } |

**Returns:** Promise\<void>

___

### getAppsByOrgNamespace

▸ **getAppsByOrgNamespace**(`__namedParameters`: { namespace: string  }): Promise\<[IApp](../interfaces/iapp.md)[]>

*Inherited from [IAM](iam.md).[getAppsByOrgNamespace](iam.md#getappsbyorgnamespace)*

getENSTypesByOwner

**`description`** get all applications for organization namespace

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { namespace: string  } |

**Returns:** Promise\<[IApp](../interfaces/iapp.md)[]>

array of subdomains or empty array when there is no subdomains

___

### getDefinition

▸ **getDefinition**(`__namedParameters`: { namespace: string ; type: [ENSNamespaceTypes](../enums/ensnamespacetypes.md)  }): Promise\<[IRoleDefinition](../interfaces/iroledefinition.md) \| [IOrganizationDefinition](../interfaces/iorganizationdefinition.md) \| [IAppDefinition](../interfaces/iappdefinition.md)>

*Inherited from [IAM](iam.md).[getDefinition](iam.md#getdefinition)*

getRoleDefinition

**`description`** get role definition form ens domain metadata record

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { namespace: string ; type: [ENSNamespaceTypes](../enums/ensnamespacetypes.md)  } |

**Returns:** Promise\<[IRoleDefinition](../interfaces/iroledefinition.md) \| [IOrganizationDefinition](../interfaces/iorganizationdefinition.md) \| [IAppDefinition](../interfaces/iappdefinition.md)>

metadata string or empty string when there is no metadata

___

### getDid

▸ **getDid**(): string \| undefined

*Inherited from [IAM](iam.md).[getDid](iam.md#getdid)*

Get DID

**Returns:** string \| undefined

did string if connected to wallet, if not returns undefined

___

### getDidDocument

▸ **getDidDocument**(`__namedParameters?`: { did: undefined \| string = this.\_did; includeClaims: boolean = true }): Promise\<{ service: IServiceEndpoint & [ClaimData](../interfaces/claimdata.md)[] = didDoc.service as (IServiceEndpoint & ClaimData)[] }>

*Inherited from [IAM](iam.md).[getDidDocument](iam.md#getdiddocument)*

getDidDocument

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`__namedParameters` | { did: undefined \| string = this.\_did; includeClaims: boolean = true } | {} |

**Returns:** Promise\<{ service: IServiceEndpoint & [ClaimData](../interfaces/claimdata.md)[] = didDoc.service as (IServiceEndpoint & ClaimData)[] }>

whole did document if connected, if not returns null

___

### getENSTypesByOwner

▸ **getENSTypesByOwner**(`__namedParameters`: { owner: string ; type: [ENSNamespaceTypes](../enums/ensnamespacetypes.md)  }): Promise\<[IRole](../interfaces/irole.md)[]> \| Promise\<[IOrganization](../interfaces/iorganization.md)[]> \| Promise\<[IApp](../interfaces/iapp.md)[]>

*Overrides [IAM](iam.md).[getENSTypesByOwner](iam.md#getenstypesbyowner)*

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { owner: string ; type: [ENSNamespaceTypes](../enums/ensnamespacetypes.md)  } |

**Returns:** Promise\<[IRole](../interfaces/irole.md)[]> \| Promise\<[IOrganization](../interfaces/iorganization.md)[]> \| Promise\<[IApp](../interfaces/iapp.md)[]>

___

### getENSTypesBySearchPhrase

▸ **getENSTypesBySearchPhrase**(`__namedParameters`: { search: string ; types: undefined \| (\"App\" \| \"Org\" \| \"Role\")[]  }): Promise\<[IApp](../interfaces/iapp.md)[] \| [IRole](../interfaces/irole.md)[] \| [IOrganization](../interfaces/iorganization.md)[]>

*Inherited from [IAM](iam.md).[getENSTypesBySearchPhrase](iam.md#getenstypesbysearchphrase)*

getENSTypesBySearchPhrase

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { search: string ; types: undefined \| (\"App\" \| \"Org\" \| \"Role\")[]  } |

**Returns:** Promise\<[IApp](../interfaces/iapp.md)[] \| [IRole](../interfaces/irole.md)[] \| [IOrganization](../interfaces/iorganization.md)[]>

___

### getIssuedClaims

▸ **getIssuedClaims**(`__namedParameters`: { did: string ; isAccepted: undefined \| false \| true ; parentNamespace: undefined \| string  }): Promise\<[Claim](../interfaces/claim.md)[]>

*Inherited from [IAM](iam.md).[getIssuedClaims](iam.md#getissuedclaims)*

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { did: string ; isAccepted: undefined \| false \| true ; parentNamespace: undefined \| string  } |

**Returns:** Promise\<[Claim](../interfaces/claim.md)[]>

___

### getOrgHierarchy

▸ **getOrgHierarchy**(`__namedParameters`: { namespace: string  }): Promise\<[IOrganization](../interfaces/iorganization.md)>

*Overrides [IAM](iam.md).[getOrgHierarchy](iam.md#getorghierarchy)*

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { namespace: string  } |

**Returns:** Promise\<[IOrganization](../interfaces/iorganization.md)>

___

### getProviderType

▸ **getProviderType**(): undefined \| [WalletConnect](../enums/walletprovider.md#walletconnect) \| [MetaMask](../enums/walletprovider.md#metamask) \| [EwKeyManager](../enums/walletprovider.md#ewkeymanager)

*Inherited from [IAM](iam.md).[getProviderType](iam.md#getprovidertype)*

Get the current initialized provider type

**Returns:** undefined \| [WalletConnect](../enums/walletprovider.md#walletconnect) \| [MetaMask](../enums/walletprovider.md#metamask) \| [EwKeyManager](../enums/walletprovider.md#ewkeymanager)

provider type if the session is active if not undefined

___

### getRequestedClaims

▸ **getRequestedClaims**(`__namedParameters`: { did: string ; isAccepted: undefined \| false \| true ; parentNamespace: undefined \| string  }): Promise\<[Claim](../interfaces/claim.md)[]>

*Inherited from [IAM](iam.md).[getRequestedClaims](iam.md#getrequestedclaims)*

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { did: string ; isAccepted: undefined \| false \| true ; parentNamespace: undefined \| string  } |

**Returns:** Promise\<[Claim](../interfaces/claim.md)[]>

___

### getRoleDIDs

▸ **getRoleDIDs**(`__namedParameters`: { namespace: string  }): Promise\<string[]>

*Inherited from [IAM](iam.md).[getRoleDIDs](iam.md#getroledids)*

getRoleDIDs

**`description`** get all users did which have certain role

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { namespace: string  } |

**Returns:** Promise\<string[]>

array of did's

___

### getRolesByNamespace

▸ **getRolesByNamespace**(`__namedParameters`: { namespace: string ; parentType: [Application](../enums/ensnamespacetypes.md#application) \| [Organization](../enums/ensnamespacetypes.md#organization)  }): Promise\<[IRole](../interfaces/irole.md)[]>

*Inherited from [IAM](iam.md).[getRolesByNamespace](iam.md#getrolesbynamespace)*

getRolesByNamespace

**`description`** get all subdomains for certain domain

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { namespace: string ; parentType: [Application](../enums/ensnamespacetypes.md#application) \| [Organization](../enums/ensnamespacetypes.md#organization)  } |

**Returns:** Promise\<[IRole](../interfaces/irole.md)[]>

array of subdomains or empty array when there is no subdomains

___

### getSigner

▸ **getSigner**(): JsonRpcSigner \| Signer \| undefined

*Inherited from [IAM](iam.md).[getSigner](iam.md#getsigner)*

Get signer

**Returns:** JsonRpcSigner \| Signer \| undefined

JsonRpcSigner if connected to wallet, if not returns undefined

___

### getSubOrgsByOrgNamespace

▸ **getSubOrgsByOrgNamespace**(`__namedParameters`: { namespace: string  }): Promise\<[IOrganization](../interfaces/iorganization.md)[]>

*Inherited from [IAM](iam.md).[getSubOrgsByOrgNamespace](iam.md#getsuborgsbyorgnamespace)*

getSubOrgsByOrgNamespace

**`description`** get all sub organizations for organization namespace

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { namespace: string  } |

**Returns:** Promise\<[IOrganization](../interfaces/iorganization.md)[]>

array of subdomains or empty array when there is no subdomains

___

### getSubdomains

▸ **getSubdomains**(`__namedParameters`: { domain: string ; mode: \"ALL\" \| \"FIRSTLEVEL\" = "FIRSTLEVEL" }): Promise\<string[]>

*Inherited from [IAM](iam.md).[getSubdomains](iam.md#getsubdomains)*

getSubdomains

**`description`** get all subdomains for certain domain

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { domain: string ; mode: \"ALL\" \| \"FIRSTLEVEL\" = "FIRSTLEVEL" } |

**Returns:** Promise\<string[]>

array of subdomains or empty array when there is no subdomains

___

### getUserClaims

▸ **getUserClaims**(`__namedParameters?`: { did: undefined \| string = this.\_did }): Promise\<IServiceEndpoint & [ClaimData](../interfaces/claimdata.md)[]>

*Inherited from [IAM](iam.md).[getUserClaims](iam.md#getuserclaims)*

getUserClaims

**`description`** get user claims

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`__namedParameters` | { did: undefined \| string = this.\_did } | {} |

**Returns:** Promise\<IServiceEndpoint & [ClaimData](../interfaces/claimdata.md)[]>

___

### initializeConnection

▸ **initializeConnection**(`__namedParameters?`: { reinitializeMetamask: undefined \| false \| true ; walletProvider: undefined \| [WalletConnect](../enums/walletprovider.md#walletconnect) \| [MetaMask](../enums/walletprovider.md#metamask) \| [EwKeyManager](../enums/walletprovider.md#ewkeymanager) = this.\_providerType }): Promise\<[InitializeData](../globals.md#initializedata)>

*Inherited from [IAM](iam.md).[initializeConnection](iam.md#initializeconnection)*

Initialize connection to wallet

**`description`** creates web3 provider and establishes secure connection to selected wallet

**`summary`** if not connected to wallet will show connection modal, but if already connected (data stored in localStorage) will only return initial data without showing modal

**`requires`** needs to be called before any of other methods

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`__namedParameters` | { reinitializeMetamask: undefined \| false \| true ; walletProvider: undefined \| [WalletConnect](../enums/walletprovider.md#walletconnect) \| [MetaMask](../enums/walletprovider.md#metamask) \| [EwKeyManager](../enums/walletprovider.md#ewkeymanager) = this.\_providerType } | {} |

**Returns:** Promise\<[InitializeData](../globals.md#initializedata)>

did string, status of connection and info if the user closed the wallet selection modal

___

### isConnected

▸ **isConnected**(): boolean

*Inherited from [IAM](iam.md).[isConnected](iam.md#isconnected)*

isConnected

**Returns:** boolean

info if the connection is already established

___

### isOwner

▸ **isOwner**(`__namedParameters`: { domain: string ; user: undefined \| string = this.\_address }): Promise\<boolean>

*Overrides [IAM](iam.md).[isOwner](iam.md#isowner)*

**`description`** Checks whether the `domain` is owned by `user` or by
gnosis wallet controlled by `user`

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { domain: string ; user: undefined \| string = this.\_address } |

**Returns:** Promise\<boolean>

___

### isSessionActive

▸ **isSessionActive**(): boolean

*Inherited from [IAM](iam.md).[isSessionActive](iam.md#issessionactive)*

Check if session is active

**Returns:** boolean

boolean that indicates the session state

___

### issueClaimRequest

▸ **issueClaimRequest**(`__namedParameters`: { id: string ; requesterDID: string ; token: string  }): Promise\<void>

*Inherited from [IAM](iam.md).[issueClaimRequest](iam.md#issueclaimrequest)*

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { id: string ; requesterDID: string ; token: string  } |

**Returns:** Promise\<void>

___

### issuePublicClaim

▸ **issuePublicClaim**(`__namedParameters`: { token: string  }): Promise\<string>

*Inherited from [IAM](iam.md).[issuePublicClaim](iam.md#issuepublicclaim)*

issuePublicClaim

**`description`** issue a public claim

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { token: string  } |

**Returns:** Promise\<string>

return issued token

___

### namespacesWithRelations

▸ **namespacesWithRelations**(`namespaces`: string[]): Promise\<{ namespace: string ; owner: string  }[]>

*Inherited from [IAM](iam.md).[namespacesWithRelations](iam.md#namespaceswithrelations)*

**`description`** Collects all namespaces related data. Currently its includes only owner

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`namespaces` | string[] |   |

**Returns:** Promise\<{ namespace: string ; owner: string  }[]>

___

### on

▸ **on**(`event`: \"accountChanged\" \| \"networkChanged\" \| \"disconnected\", `eventHandler`: () => void): void

*Inherited from [IAMBase](iambase.md).[on](iambase.md#on)*

Add event handler for certain events

**`requires`** to be called after the connection to wallet was initialized

#### Parameters:

Name | Type |
------ | ------ |
`event` | \"accountChanged\" \| \"networkChanged\" \| \"disconnected\" |
`eventHandler` | () => void |

**Returns:** void

___

### publishPublicClaim

▸ **publishPublicClaim**(`__namedParameters`: { token: string  }): Promise\<string>

*Inherited from [IAM](iam.md).[publishPublicClaim](iam.md#publishpublicclaim)*

publishPublicClaim

**`description`** store claim data in ipfs and save url to DID document services

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { token: string  } |

**Returns:** Promise\<string>

ulr to ipfs

___

### rejectClaimRequest

▸ **rejectClaimRequest**(`__namedParameters`: { id: string ; requesterDID: string  }): Promise\<void>

*Inherited from [IAM](iam.md).[rejectClaimRequest](iam.md#rejectclaimrequest)*

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { id: string ; requesterDID: string  } |

**Returns:** Promise\<void>

___

### revokeDidDocument

▸ **revokeDidDocument**(): Promise\<boolean>

*Inherited from [IAM](iam.md).[revokeDidDocument](iam.md#revokediddocument)*

revokeDidDocument

**`description`** revokes did document

**Returns:** Promise\<boolean>

information (true/false) if the DID document was revoked

___

### setRoleDefinition

▸ **setRoleDefinition**(`__namedParameters`: { data: [IRoleDefinition](../interfaces/iroledefinition.md) \| [IOrganizationDefinition](../interfaces/iorganizationdefinition.md) \| [IAppDefinition](../interfaces/iappdefinition.md) ; domain: string  }): Promise\<void>

*Inherited from [IAM](iam.md).[setRoleDefinition](iam.md#setroledefinition)*

setRoleDefinition

**`description`** sets role definition in ENS domain

**`description`** please use it only when you want to update role definitions for already created role (domain)

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { data: [IRoleDefinition](../interfaces/iroledefinition.md) \| [IOrganizationDefinition](../interfaces/iorganizationdefinition.md) \| [IAppDefinition](../interfaces/iappdefinition.md) ; domain: string  } |

**Returns:** Promise\<void>

___

### subscribeToMessages

▸ **subscribeToMessages**(`__namedParameters`: { messageHandler: (data: [IMessage](../interfaces/imessage.md)) => void ; topic: string = \`${this.\_did}.${NATS\_EXCHANGE\_TOPIC}\` }): Promise\<void>

*Inherited from [IAM](iam.md).[subscribeToMessages](iam.md#subscribetomessages)*

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { messageHandler: (data: [IMessage](../interfaces/imessage.md)) => void ; topic: string = \`${this.\_did}.${NATS\_EXCHANGE\_TOPIC}\` } |

**Returns:** Promise\<void>

___

### unsubscribeFromMessages

▸ **unsubscribeFromMessages**(): Promise\<void>

*Inherited from [IAM](iam.md).[unsubscribeFromMessages](iam.md#unsubscribefrommessages)*

**Returns:** Promise\<void>

___

### updateDidDocument

▸ **updateDidDocument**(`options`: { data: IUpdateData ; didAttribute: DIDAttribute ; validity?: undefined \| number  }): Promise\<boolean>

*Inherited from [IAM](iam.md).[updateDidDocument](iam.md#updatediddocument)*

**`description`** updates did document based on data provided

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`options` | { data: IUpdateData ; didAttribute: DIDAttribute ; validity?: undefined \| number  } | Options to connect with blockchain  |

**Returns:** Promise\<boolean>

true if document is updated successfuly

___

### validateOwnership

▸ **validateOwnership**(`__namedParameters`: { namespace: string ; type: [ENSNamespaceTypes](../enums/ensnamespacetypes.md)  }): Promise\<string[]>

*Overrides [IAM](iam.md).[validateOwnership](iam.md#validateownership)*

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { namespace: string ; type: [ENSNamespaceTypes](../enums/ensnamespacetypes.md)  } |

**Returns:** Promise\<string[]>

___

### verifyPublicClaim

▸ **verifyPublicClaim**(`__namedParameters`: { issuedToken: string  }): Promise\<IPublicClaim>

*Inherited from [IAM](iam.md).[verifyPublicClaim](iam.md#verifypublicclaim)*

verifyPublicClaim

**`description`** verifies issued token of claim

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { issuedToken: string  } |

**Returns:** Promise\<IPublicClaim>

public claim data

___

### isMetamaskExtensionPresent

▸ `Static`**isMetamaskExtensionPresent**(): Promise\<{ chainId: undefined \| number ; isMetamaskPresent: boolean = !!provider }>

*Inherited from [IAM](iam.md).[isMetamaskExtensionPresent](iam.md#ismetamaskextensionpresent)*

**Returns:** Promise\<{ chainId: undefined \| number ; isMetamaskPresent: boolean = !!provider }>
