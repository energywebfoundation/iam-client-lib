**[iam-client-lib](../README.md)**

# Class: IAM

Decentralized Identity and Access Management (IAM) Type

## Hierarchy

* [IAMBase](iambase.md)

  ↳ **IAM**

  ↳↳ [GnosisIam](gnosisiam.md)

## Index

### Constructors

* [constructor](iam.md#constructor)

### Accessors

* [address](iam.md#address)

### Methods

* [changeAppOwnership](iam.md#changeappownership)
* [changeOrgOwnership](iam.md#changeorgownership)
* [changeRoleOwnership](iam.md#changeroleownership)
* [checkExistenceOfDomain](iam.md#checkexistenceofdomain)
* [closeConnection](iam.md#closeconnection)
* [createApplication](iam.md#createapplication)
* [createClaimRequest](iam.md#createclaimrequest)
* [createIdentityProof](iam.md#createidentityproof)
* [createOrganization](iam.md#createorganization)
* [createProofClaim](iam.md#createproofclaim)
* [createPublicClaim](iam.md#createpublicclaim)
* [createRole](iam.md#createrole)
* [createSelfSignedClaim](iam.md#createselfsignedclaim)
* [decodeJWTToken](iam.md#decodejwttoken)
* [deleteApplication](iam.md#deleteapplication)
* [deleteClaim](iam.md#deleteclaim)
* [deleteOrganization](iam.md#deleteorganization)
* [deleteRole](iam.md#deleterole)
* [getAppsByOrgNamespace](iam.md#getappsbyorgnamespace)
* [getDefinition](iam.md#getdefinition)
* [getDid](iam.md#getdid)
* [getDidDocument](iam.md#getdiddocument)
* [getENSTypesByOwner](iam.md#getenstypesbyowner)
* [getENSTypesBySearchPhrase](iam.md#getenstypesbysearchphrase)
* [getIssuedClaims](iam.md#getissuedclaims)
* [getOrgHierarchy](iam.md#getorghierarchy)
* [getProviderType](iam.md#getprovidertype)
* [getRequestedClaims](iam.md#getrequestedclaims)
* [getRoleDIDs](iam.md#getroledids)
* [getRolesByNamespace](iam.md#getrolesbynamespace)
* [getSigner](iam.md#getsigner)
* [getSubOrgsByOrgNamespace](iam.md#getsuborgsbyorgnamespace)
* [getSubdomains](iam.md#getsubdomains)
* [getUserClaims](iam.md#getuserclaims)
* [initializeConnection](iam.md#initializeconnection)
* [isConnected](iam.md#isconnected)
* [isOwner](iam.md#isowner)
* [isSessionActive](iam.md#issessionactive)
* [issueClaimRequest](iam.md#issueclaimrequest)
* [issuePublicClaim](iam.md#issuepublicclaim)
* [namespacesWithRelations](iam.md#namespaceswithrelations)
* [on](iam.md#on)
* [publishPublicClaim](iam.md#publishpublicclaim)
* [rejectClaimRequest](iam.md#rejectclaimrequest)
* [revokeDidDocument](iam.md#revokediddocument)
* [setRoleDefinition](iam.md#setroledefinition)
* [subscribeToMessages](iam.md#subscribetomessages)
* [unsubscribeFromMessages](iam.md#unsubscribefrommessages)
* [updateDidDocument](iam.md#updatediddocument)
* [validateOwnership](iam.md#validateownership)
* [verifyPublicClaim](iam.md#verifypublicclaim)
* [isMetamaskExtensionPresent](iam.md#ismetamaskextensionpresent)

## Constructors

### constructor

\+ **new IAM**(`__namedParameters?`: { bridgeUrl: string = "https://walletconnect.energyweb.org"; ewKeyManagerUrl: string = "https://km.aws.energyweb.org/connect/new"; infuraId: undefined \| string ; ipfsUrl: string = "https://ipfs.infura.io:5001/api/v0/"; privateKey: undefined \| string ; rpcUrl: undefined \| string  }): [IAM](iam.md)

*Inherited from [IAMBase](iambase.md).[constructor](iambase.md#constructor)*

IAM Constructor

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`__namedParameters` | { bridgeUrl: string = "https://walletconnect.energyweb.org"; ewKeyManagerUrl: string = "https://km.aws.energyweb.org/connect/new"; infuraId: undefined \| string ; ipfsUrl: string = "https://ipfs.infura.io:5001/api/v0/"; privateKey: undefined \| string ; rpcUrl: undefined \| string  } | {} |

**Returns:** [IAM](iam.md)

## Accessors

### address

• get **address**(): undefined \| string

*Inherited from [IAMBase](iambase.md).[address](iambase.md#address)*

**Returns:** undefined \| string

## Methods

### changeAppOwnership

▸ **changeAppOwnership**(`__namedParameters`: { namespace: string ; newOwner: string ; returnSteps: undefined \| false \| true  }): Promise\<{ info: string = \`Changing ownership of ${namespace}\`; tx: [EncodedCall](../globals.md#encodedcall) ; next: (\_\_namedParameters: { retryCheck: undefined \| false \| true  }) => Promise\<void>  }[]>

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

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { claim: { claimType: string ; fields: { key: string ; value: string \| number  }[]  } ; issuer: string[]  } |

**Returns:** Promise\<void>

___

### createIdentityProof

▸ **createIdentityProof**(): Promise\<string>

**Returns:** Promise\<string>

___

### createOrganization

▸ **createOrganization**(`__namedParameters`: { data: [IOrganizationDefinition](../interfaces/iorganizationdefinition.md) ; namespace: string ; orgName: string ; returnSteps: undefined \| false \| true  }): Promise\<{ next: () => Promise\<void>  }[]>

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

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { token: string  } |

**Returns:** Promise\<string \| { [key:string]: string \| object;  }>

___

### deleteApplication

▸ **deleteApplication**(`__namedParameters`: { namespace: string ; returnSteps: undefined \| false \| true  }): Promise\<{ info: string = \`Deleting ${namespace}\`; tx: [EncodedCall](../globals.md#encodedcall) ; next: (\_\_namedParameters: { retryCheck: undefined \| false \| true  }) => Promise\<void>  }[]>

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

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { id: string  } |

**Returns:** Promise\<void>

___

### deleteOrganization

▸ **deleteOrganization**(`__namedParameters`: { namespace: string ; returnSteps: undefined \| false \| true  }): Promise\<{ info: string = \`Deleting ${namespace}\`; tx: [EncodedCall](../globals.md#encodedcall) ; next: (\_\_namedParameters: { retryCheck: undefined \| false \| true  }) => Promise\<void>  }[]>

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

Get DID

**Returns:** string \| undefined

did string if connected to wallet, if not returns undefined

___

### getDidDocument

▸ **getDidDocument**(`__namedParameters?`: { did: undefined \| string = this.\_did; includeClaims: boolean = true }): Promise\<{ service: IServiceEndpoint & [ClaimData](../interfaces/claimdata.md)[] = didDoc.service as (IServiceEndpoint & ClaimData)[] }>

getDidDocument

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`__namedParameters` | { did: undefined \| string = this.\_did; includeClaims: boolean = true } | {} |

**Returns:** Promise\<{ service: IServiceEndpoint & [ClaimData](../interfaces/claimdata.md)[] = didDoc.service as (IServiceEndpoint & ClaimData)[] }>

whole did document if connected, if not returns null

___

### getENSTypesByOwner

▸ **getENSTypesByOwner**(`__namedParameters`: { excludeSubOrgs: boolean = false; owner: string ; type: [ENSNamespaceTypes](../enums/ensnamespacetypes.md)  }): Promise\<[IRole](../interfaces/irole.md)[]> \| Promise\<[IOrganization](../interfaces/iorganization.md)[]> \| Promise\<[IApp](../interfaces/iapp.md)[]>

getENSTypesByOwner

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { excludeSubOrgs: boolean = false; owner: string ; type: [ENSNamespaceTypes](../enums/ensnamespacetypes.md)  } |

**Returns:** Promise\<[IRole](../interfaces/irole.md)[]> \| Promise\<[IOrganization](../interfaces/iorganization.md)[]> \| Promise\<[IApp](../interfaces/iapp.md)[]>

___

### getENSTypesBySearchPhrase

▸ **getENSTypesBySearchPhrase**(`__namedParameters`: { search: string ; types: undefined \| (\"App\" \| \"Org\" \| \"Role\")[]  }): Promise\<[IApp](../interfaces/iapp.md)[] \| [IRole](../interfaces/irole.md)[] \| [IOrganization](../interfaces/iorganization.md)[]>

getENSTypesBySearchPhrase

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { search: string ; types: undefined \| (\"App\" \| \"Org\" \| \"Role\")[]  } |

**Returns:** Promise\<[IApp](../interfaces/iapp.md)[] \| [IRole](../interfaces/irole.md)[] \| [IOrganization](../interfaces/iorganization.md)[]>

___

### getIssuedClaims

▸ **getIssuedClaims**(`__namedParameters`: { did: string ; isAccepted: undefined \| false \| true ; parentNamespace: undefined \| string  }): Promise\<[Claim](../interfaces/claim.md)[]>

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { did: string ; isAccepted: undefined \| false \| true ; parentNamespace: undefined \| string  } |

**Returns:** Promise\<[Claim](../interfaces/claim.md)[]>

___

### getOrgHierarchy

▸ **getOrgHierarchy**(`__namedParameters`: { namespace: string  }): Promise\<[IOrganization](../interfaces/iorganization.md)>

getOrgHierarchy

**`description`** get all hierarchy of an organization (20 levels deep)

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { namespace: string  } |

**Returns:** Promise\<[IOrganization](../interfaces/iorganization.md)>

organization with all nested subOrgs

___

### getProviderType

▸ **getProviderType**(): undefined \| [WalletConnect](../enums/walletprovider.md#walletconnect) \| [MetaMask](../enums/walletprovider.md#metamask) \| [EwKeyManager](../enums/walletprovider.md#ewkeymanager)

Get the current initialized provider type

**Returns:** undefined \| [WalletConnect](../enums/walletprovider.md#walletconnect) \| [MetaMask](../enums/walletprovider.md#metamask) \| [EwKeyManager](../enums/walletprovider.md#ewkeymanager)

provider type if the session is active if not undefined

___

### getRequestedClaims

▸ **getRequestedClaims**(`__namedParameters`: { did: string ; isAccepted: undefined \| false \| true ; parentNamespace: undefined \| string  }): Promise\<[Claim](../interfaces/claim.md)[]>

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { did: string ; isAccepted: undefined \| false \| true ; parentNamespace: undefined \| string  } |

**Returns:** Promise\<[Claim](../interfaces/claim.md)[]>

___

### getRoleDIDs

▸ **getRoleDIDs**(`__namedParameters`: { namespace: string  }): Promise\<string[]>

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

Get signer

**Returns:** JsonRpcSigner \| Signer \| undefined

JsonRpcSigner if connected to wallet, if not returns undefined

___

### getSubOrgsByOrgNamespace

▸ **getSubOrgsByOrgNamespace**(`__namedParameters`: { namespace: string  }): Promise\<[IOrganization](../interfaces/iorganization.md)[]>

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

isConnected

**Returns:** boolean

info if the connection is already established

___

### isOwner

▸ **isOwner**(`__namedParameters`: { domain: string ; user: undefined \| string = this.\_address }): Promise\<boolean>

isOwner

**`description`** check ownership of the domain

**`default`** if user is not specified it will check the current logged user

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { domain: string ; user: undefined \| string = this.\_address } |

**Returns:** Promise\<boolean>

true or false whatever the passed is user is a owner of domain

___

### isSessionActive

▸ **isSessionActive**(): boolean

Check if session is active

**Returns:** boolean

boolean that indicates the session state

___

### issueClaimRequest

▸ **issueClaimRequest**(`__namedParameters`: { id: string ; requesterDID: string ; token: string  }): Promise\<void>

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { id: string ; requesterDID: string ; token: string  } |

**Returns:** Promise\<void>

___

### issuePublicClaim

▸ **issuePublicClaim**(`__namedParameters`: { token: string  }): Promise\<string>

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

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { id: string ; requesterDID: string  } |

**Returns:** Promise\<void>

___

### revokeDidDocument

▸ **revokeDidDocument**(): Promise\<boolean>

revokeDidDocument

**`description`** revokes did document

**Returns:** Promise\<boolean>

information (true/false) if the DID document was revoked

___

### setRoleDefinition

▸ **setRoleDefinition**(`__namedParameters`: { data: [IRoleDefinition](../interfaces/iroledefinition.md) \| [IOrganizationDefinition](../interfaces/iorganizationdefinition.md) \| [IAppDefinition](../interfaces/iappdefinition.md) ; domain: string  }): Promise\<void>

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

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { messageHandler: (data: [IMessage](../interfaces/imessage.md)) => void ; topic: string = \`${this.\_did}.${NATS\_EXCHANGE\_TOPIC}\` } |

**Returns:** Promise\<void>

___

### unsubscribeFromMessages

▸ **unsubscribeFromMessages**(): Promise\<void>

**Returns:** Promise\<void>

___

### updateDidDocument

▸ **updateDidDocument**(`options`: { data: IUpdateData ; didAttribute: DIDAttribute ; validity?: undefined \| number  }): Promise\<boolean>

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

validateOwnership

**`description`** check ownership of the domain and subdomains of org, app or role

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { namespace: string ; type: [ENSNamespaceTypes](../enums/ensnamespacetypes.md)  } |

**Returns:** Promise\<string[]>

true or false whatever the passed is user is a owner of org, app or role

___

### verifyPublicClaim

▸ **verifyPublicClaim**(`__namedParameters`: { issuedToken: string  }): Promise\<IPublicClaim>

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

**Returns:** Promise\<{ chainId: undefined \| number ; isMetamaskPresent: boolean = !!provider }>
