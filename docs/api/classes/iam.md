**[iam-client-lib](../README.md)**

# Class: IAM

Decentralized Identity and Access Management (IAM) Type

## Hierarchy

* [IAMBase](iambase.md)

  ↳ **IAM**

## Index

### Constructors

* [constructor](iam.md#constructor)

### Methods

* [changeAppOwnership](iam.md#changeappownership)
* [changeOrgOwnership](iam.md#changeorgownership)
* [changeRoleOwnership](iam.md#changeroleownership)
* [checkExistenceOfDomain](iam.md#checkexistenceofdomain)
* [closeConnection](iam.md#closeconnection)
* [createApplication](iam.md#createapplication)
* [createClaimRequest](iam.md#createclaimrequest)
* [createOrganization](iam.md#createorganization)
* [createProofClaim](iam.md#createproofclaim)
* [createPublicClaim](iam.md#createpublicclaim)
* [createRole](iam.md#createrole)
* [createSelfSignedClaim](iam.md#createselfsignedclaim)
* [decodeJWTToken](iam.md#decodejwttoken)
* [deleteApplication](iam.md#deleteapplication)
* [deleteOrganization](iam.md#deleteorganization)
* [deleteRole](iam.md#deleterole)
* [getAppsByOrgNamespace](iam.md#getappsbyorgnamespace)
* [getDefinition](iam.md#getdefinition)
* [getDid](iam.md#getdid)
* [getDidDocument](iam.md#getdiddocument)
* [getENSTypesByOwner](iam.md#getenstypesbyowner)
* [getENSTypesBySearchPhrase](iam.md#getenstypesbysearchphrase)
* [getIssuedClaims](iam.md#getissuedclaims)
* [getRequestedClaims](iam.md#getrequestedclaims)
* [getRolesByNamespace](iam.md#getrolesbynamespace)
* [getSigner](iam.md#getsigner)
* [getSubdomains](iam.md#getsubdomains)
* [getUserClaims](iam.md#getuserclaims)
* [initializeConnection](iam.md#initializeconnection)
* [isConnected](iam.md#isconnected)
* [isOwner](iam.md#isowner)
* [issueClaimRequest](iam.md#issueclaimrequest)
* [issuePublicClaim](iam.md#issuepublicclaim)
* [publishPublicClaim](iam.md#publishpublicclaim)
* [revokeDidDocument](iam.md#revokediddocument)
* [setRoleDefinition](iam.md#setroledefinition)
* [subscribeToMessages](iam.md#subscribetomessages)
* [updateDidDocument](iam.md#updatediddocument)
* [validateOwnership](iam.md#validateownership)
* [verifyPublicClaim](iam.md#verifypublicclaim)
* [isMetamaskExtensionPresent](iam.md#ismetamaskextensionpresent)

## Constructors

### constructor

\+ **new IAM**(`__namedParameters`: { bridgeUrl: string = "https://walletconnect.energyweb.org"; cacheClient: undefined \| [ICacheServerClient](../interfaces/icacheserverclient.md) ; chainId: number = 1; didContractAddress: string = VoltaAddress1056; ensRegistryAddress: string = "0xd7CeF70Ba7efc2035256d828d5287e2D285CD1ac"; ensResolverAddress: string = "0x0a97e07c4Df22e2e31872F20C5BE191D5EFc4680"; infuraId: undefined \| string ; ipfsUrl: string = "https://ipfs.infura.io:5001/api/v0/"; messagingMethod: undefined \| [CacheServer](../enums/messagingmethod.md#cacheserver) \| [WebRTC](../enums/messagingmethod.md#webrtc) \| [SmartContractStorage](../enums/messagingmethod.md#smartcontractstorage) ; natsServerUrl: undefined \| string ; privateKey: undefined \| string ; rpcUrl: string  }): [IAM](iam.md)

*Inherited from [IAMBase](iambase.md).[constructor](iambase.md#constructor)*

IAM Constructor

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { bridgeUrl: string = "https://walletconnect.energyweb.org"; cacheClient: undefined \| [ICacheServerClient](../interfaces/icacheserverclient.md) ; chainId: number = 1; didContractAddress: string = VoltaAddress1056; ensRegistryAddress: string = "0xd7CeF70Ba7efc2035256d828d5287e2D285CD1ac"; ensResolverAddress: string = "0x0a97e07c4Df22e2e31872F20C5BE191D5EFc4680"; infuraId: undefined \| string ; ipfsUrl: string = "https://ipfs.infura.io:5001/api/v0/"; messagingMethod: undefined \| [CacheServer](../enums/messagingmethod.md#cacheserver) \| [WebRTC](../enums/messagingmethod.md#webrtc) \| [SmartContractStorage](../enums/messagingmethod.md#smartcontractstorage) ; natsServerUrl: undefined \| string ; privateKey: undefined \| string ; rpcUrl: string  } |

**Returns:** [IAM](iam.md)

## Methods

### changeAppOwnership

▸ **changeAppOwnership**(`__namedParameters`: { namespace: string ; newOwner: string ; returnSteps: undefined \| false \| true  }): Promise\<{ info: string ; next: () => Promise\<void>  }[]>

changeAppOwnership

**`description`** change owner ship of app subdomain and all app owned subdomains

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { namespace: string ; newOwner: string ; returnSteps: undefined \| false \| true  } |

**Returns:** Promise\<{ info: string ; next: () => Promise\<void>  }[]>

return array of steps needed to change ownership

___

### changeOrgOwnership

▸ **changeOrgOwnership**(`__namedParameters`: { namespace: string ; newOwner: string ; returnSteps: boolean = false }): Promise\<{ info: string ; next: () => Promise\<void>  }[]>

changeOrgOwnership

**`description`** change owner ship of org subdomain and all org owned roles subdomains

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { namespace: string ; newOwner: string ; returnSteps: boolean = false } |

**Returns:** Promise\<{ info: string ; next: () => Promise\<void>  }[]>

return array of steps needed to change ownership

___

### changeRoleOwnership

▸ **changeRoleOwnership**(`__namedParameters`: { namespace: string ; newOwner: string  }): Promise\<void>

changeRoleOwnership

**`description`** change owner ship of role subdomain

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

Close connection to wallet

**`description`** closes the connection between dApp and the wallet

**Returns:** Promise\<void>

___

### createApplication

▸ **createApplication**(`__namedParameters`: { appName: string ; data: [IAppDefinition](../interfaces/iappdefinition.md) ; namespace: string ; returnSteps: undefined \| false \| true  }): Promise\<{ info: string = "Set subdomain for application"; next: () => Promise\<void>  }[]>

createApp

**`description`** creates role (create subdomain, sets the domain name and sets the role definition to metadata record in ENS Domain)

**`description`** creates roles subdomain for the app namespace

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { appName: string ; data: [IAppDefinition](../interfaces/iappdefinition.md) ; namespace: string ; returnSteps: undefined \| false \| true  } |

**Returns:** Promise\<{ info: string = "Set subdomain for application"; next: () => Promise\<void>  }[]>

___

### createClaimRequest

▸ **createClaimRequest**(`__namedParameters`: { claim: { claimType: string ; fields: { key: string ; value: string \| number  }[]  } ; issuer: string[]  }): Promise\<void>

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { claim: { claimType: string ; fields: { key: string ; value: string \| number  }[]  } ; issuer: string[]  } |

**Returns:** Promise\<void>

___

### createOrganization

▸ **createOrganization**(`__namedParameters`: { data: [IOrganizationDefinition](../interfaces/iorganizationdefinition.md) ; namespace: string ; orgName: string ; returnSteps: undefined \| false \| true  }): Promise\<{ info: string = "Create organization subdomain"; next: () => Promise\<void>  }[]>

createOrganization

**`description`** creates organization (create subdomain, sets the domain name and sets the role definition to metadata record in ENS Domain)

**`description`** and sets subdomain for roles and app for org namespace

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { data: [IOrganizationDefinition](../interfaces/iorganizationdefinition.md) ; namespace: string ; orgName: string ; returnSteps: undefined \| false \| true  } |

**Returns:** Promise\<{ info: string = "Create organization subdomain"; next: () => Promise\<void>  }[]>

___

### createProofClaim

▸ **createProofClaim**(`__namedParameters`: { claimUrl: string ; saltedFields: ISaltedFields  }): Promise\<null \| string>

createProofClaim

**`description`** creates a proof of a claim

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { claimUrl: string ; saltedFields: ISaltedFields  } |

**Returns:** Promise\<null \| string>

proof token

___

### createPublicClaim

▸ **createPublicClaim**(`__namedParameters`: { data: Record\<string, unknown> ; subject: undefined \| string  }): Promise\<null \| string>

createPublicClaim

**`description`** create a public claim based on data provided

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { data: Record\<string, unknown> ; subject: undefined \| string  } |

**Returns:** Promise\<null \| string>

JWT token of created claim

___

### createRole

▸ **createRole**(`__namedParameters`: { data: [IRoleDefinition](../interfaces/iroledefinition.md) ; namespace: string ; returnSteps: undefined \| false \| true ; roleName: string  }): Promise\<{ info: string = "Create subdomain for role"; next: () => Promise\<void>  }[]>

createRole

**`description`** creates role (create subdomain, sets the domain name and sets the role definition to metadata record in ENS Domain)

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { data: [IRoleDefinition](../interfaces/iroledefinition.md) ; namespace: string ; returnSteps: undefined \| false \| true ; roleName: string  } |

**Returns:** Promise\<{ info: string = "Create subdomain for role"; next: () => Promise\<void>  }[]>

information (true/false) if the role was created

___

### createSelfSignedClaim

▸ **createSelfSignedClaim**(`__namedParameters`: { data: Record\<string, unknown>  }): Promise\<void>

createSelfSignedClaim

**`description`** creates self signed claim and upload the data to ipfs

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { data: Record\<string, unknown>  } |

**Returns:** Promise\<void>

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

▸ **deleteApplication**(`__namedParameters`: { namespace: string ; returnSteps: undefined \| false \| true  }): Promise\<{ info: string ; next: () => Promise\<void>  }[]>

deleteApplication

**`description`** delete application and roles

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { namespace: string ; returnSteps: undefined \| false \| true  } |

**Returns:** Promise\<{ info: string ; next: () => Promise\<void>  }[]>

___

### deleteOrganization

▸ **deleteOrganization**(`__namedParameters`: { namespace: string ; returnSteps: undefined \| false \| true  }): Promise\<{ info: string ; next: () => Promise\<void>  }[]>

deleteOrganization

**`description`** delete organization and roles

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { namespace: string ; returnSteps: undefined \| false \| true  } |

**Returns:** Promise\<{ info: string ; next: () => Promise\<void>  }[]>

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

▸ **getDidDocument**(`__namedParameters?`: { did: undefined \| string = this.\_did }): Promise\<IDIDDocument \| null>

getDidDocument

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`__namedParameters` | { did: undefined \| string = this.\_did } | {} |

**Returns:** Promise\<IDIDDocument \| null>

whole did document if connected, if not returns null

___

### getENSTypesByOwner

▸ **getENSTypesByOwner**(`__namedParameters`: { owner: string ; type: [ENSNamespaceTypes](../enums/ensnamespacetypes.md)  }): Promise\<[IRole](../interfaces/irole.md)[]> \| Promise\<[IOrganization](../interfaces/iorganization.md)[]> \| Promise\<[IApp](../interfaces/iapp.md)[]>

getENSTypesByOwner

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { owner: string ; type: [ENSNamespaceTypes](../enums/ensnamespacetypes.md)  } |

**Returns:** Promise\<[IRole](../interfaces/irole.md)[]> \| Promise\<[IOrganization](../interfaces/iorganization.md)[]> \| Promise\<[IApp](../interfaces/iapp.md)[]>

___

### getENSTypesBySearchPhrase

▸ **getENSTypesBySearchPhrase**(`__namedParameters`: { search: string ; type: [ENSNamespaceTypes](../enums/ensnamespacetypes.md)  }): Promise\<[IOrganization](../interfaces/iorganization.md)[]> \| Promise\<[IApp](../interfaces/iapp.md)[]>

getENSTypesBySearchPhrase

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { search: string ; type: [ENSNamespaceTypes](../enums/ensnamespacetypes.md)  } |

**Returns:** Promise\<[IOrganization](../interfaces/iorganization.md)[]> \| Promise\<[IApp](../interfaces/iapp.md)[]>

___

### getIssuedClaims

▸ **getIssuedClaims**(`__namedParameters`: { did: string ; isAccepted: undefined \| false \| true ; parentNamespace: undefined \| string  }): Promise\<[Claim](../interfaces/claim.md)[]>

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { did: string ; isAccepted: undefined \| false \| true ; parentNamespace: undefined \| string  } |

**Returns:** Promise\<[Claim](../interfaces/claim.md)[]>

___

### getRequestedClaims

▸ **getRequestedClaims**(`__namedParameters`: { did: string ; isAccepted: undefined \| false \| true ; parentNamespace: undefined \| string  }): Promise\<[Claim](../interfaces/claim.md)[]>

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { did: string ; isAccepted: undefined \| false \| true ; parentNamespace: undefined \| string  } |

**Returns:** Promise\<[Claim](../interfaces/claim.md)[]>

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

### getSubdomains

▸ **getSubdomains**(`__namedParameters`: { domain: string  }): Promise\<undefined \| string[]>

getSubdomains

**`description`** get all subdomains for certain domain

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { domain: string  } |

**Returns:** Promise\<undefined \| string[]>

array of subdomains or empty array when there is no subdomains

___

### getUserClaims

▸ **getUserClaims**(`__namedParameters?`: { did: undefined \| string = this.\_did }): Promise\<{ serviceEndpoint: string  }[]>

getUserClaims

**`description`** get user claims

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`__namedParameters` | { did: undefined \| string = this.\_did } | {} |

**Returns:** Promise\<{ serviceEndpoint: string  }[]>

___

### initializeConnection

▸ **initializeConnection**(`__namedParameters?`: { reinitializeMetamask: undefined \| false \| true ; useMetamaskExtension: boolean  }): Promise\<[InitializeData](../globals.md#initializedata)>

Initialize connection to wallet

**`description`** creates web3 provider and establishes secure connection to selected wallet

**`summary`** if not connected to wallet will show connection modal, but if already connected (data stored in localStorage) will only return initial data without showing modal

**`requires`** needs to be called before any of other methods

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`__namedParameters` | { reinitializeMetamask: undefined \| false \| true ; useMetamaskExtension: boolean  } | {
      useMetamaskExtension: false
    } |

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

### issueClaimRequest

▸ **issueClaimRequest**(`__namedParameters`: { id: string ; requesterDID: string ; token: string  }): Promise\<void>

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { id: string ; requesterDID: string ; token: string  } |

**Returns:** Promise\<void>

___

### issuePublicClaim

▸ **issuePublicClaim**(`__namedParameters`: { token: string  }): Promise\<null \| string>

issuePublicClaim

**`description`** issue a public claim

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { token: string  } |

**Returns:** Promise\<null \| string>

return issued token

___

### publishPublicClaim

▸ **publishPublicClaim**(`__namedParameters`: { token: string  }): Promise\<null \| string>

publishPublicClaim

**`description`** store claim data in ipfs and save url to DID document services

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { token: string  } |

**Returns:** Promise\<null \| string>

ulr to ipfs

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

### updateDidDocument

▸ **updateDidDocument**(`__namedParameters`: { data: IUpdateData ; didAttribute: DIDAttribute ; validity: undefined \| number  }): Promise\<boolean>

updateDidDocument

**`description`** updates did document based on data provided

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { data: IUpdateData ; didAttribute: DIDAttribute ; validity: undefined \| number  } |

**Returns:** Promise\<boolean>

info if did document was updated

___

### validateOwnership

▸ **validateOwnership**(`__namedParameters`: { namespace: string ; type: [ENSNamespaceTypes](../enums/ensnamespacetypes.md)  }): Promise\<boolean>

validateOwnership

**`description`** check ownership of the domain and subdomains of org, app or role

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { namespace: string ; type: [ENSNamespaceTypes](../enums/ensnamespacetypes.md)  } |

**Returns:** Promise\<boolean>

true or false whatever the passed is user is a owner of org, app or role

___

### verifyPublicClaim

▸ **verifyPublicClaim**(`__namedParameters`: { issuedToken: string  }): Promise\<null \| IPublicClaim>

verifyPublicClaim

**`description`** verifies issued token of claim

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { issuedToken: string  } |

**Returns:** Promise\<null \| IPublicClaim>

public claim data

___

### isMetamaskExtensionPresent

▸ `Static`**isMetamaskExtensionPresent**(): Promise\<boolean>

**Returns:** Promise\<boolean>
