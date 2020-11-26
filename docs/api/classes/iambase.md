**[iam-client-lib](../README.md)**

> [Globals](../globals.md) / IAMBase

# Class: IAMBase

## Hierarchy

* **IAMBase**

  ↳ [IAM](iam.md)

## Index

### Constructors

* [constructor](iambase.md#constructor)

### Properties

* [\_address](iambase.md#_address)
* [\_cacheClient](iambase.md#_cacheclient)
* [\_connectionOptions](iambase.md#_connectionoptions)
* [\_did](iambase.md#_did)
* [\_didSigner](iambase.md#_didsigner)
* [\_document](iambase.md#_document)
* [\_ensRegistry](iambase.md#_ensregistry)
* [\_ensRegistryAddress](iambase.md#_ensregistryaddress)
* [\_ensResolver](iambase.md#_ensresolver)
* [\_ensResolverAddress](iambase.md#_ensresolveraddress)
* [\_ipfsStore](iambase.md#_ipfsstore)
* [\_issuerClaims](iambase.md#_issuerclaims)
* [\_jsonCodec](iambase.md#_jsoncodec)
* [\_jwt](iambase.md#_jwt)
* [\_natsConnection](iambase.md#_natsconnection)
* [\_natsServerUrl](iambase.md#_natsserverurl)
* [\_provider](iambase.md#_provider)
* [\_registrySetting](iambase.md#_registrysetting)
* [\_resolver](iambase.md#_resolver)
* [\_runningInBrowser](iambase.md#_runninginbrowser)
* [\_signer](iambase.md#_signer)
* [\_transactionOverrides](iambase.md#_transactionoverrides)
* [\_userClaims](iambase.md#_userclaims)
* [\_verifierClaims](iambase.md#_verifierclaims)
* [\_walletConnectProvider](iambase.md#_walletconnectprovider)

### Methods

* [changeSubdomainOwner](iambase.md#changesubdomainowner)
* [createSubdomain](iambase.md#createsubdomain)
* [deleteSubdomain](iambase.md#deletesubdomain)
* [downloadClaims](iambase.md#downloadclaims)
* [getFilteredDomainsFromEvent](iambase.md#getfiltereddomainsfromevent)
* [getOwner](iambase.md#getowner)
* [getPublicKey](iambase.md#getpublickey)
* [init](iambase.md#init)
* [setAddress](iambase.md#setaddress)
* [setClaims](iambase.md#setclaims)
* [setDid](iambase.md#setdid)
* [setDocument](iambase.md#setdocument)
* [setDomainName](iambase.md#setdomainname)
* [setJWT](iambase.md#setjwt)
* [setResolver](iambase.md#setresolver)
* [setupBrowserEnv](iambase.md#setupbrowserenv)
* [setupENS](iambase.md#setupens)
* [setupNATS](iambase.md#setupnats)
* [setupProvider](iambase.md#setupprovider)
* [setupUniversalEnv](iambase.md#setupuniversalenv)
* [validateIssuers](iambase.md#validateissuers)

## Constructors

### constructor

\+ **new IAMBase**(`__namedParameters`: { bridgeUrl: string = "https://walletconnect.energyweb.org"; cacheClient: undefined \| [ICacheServerClient](../interfaces/icacheserverclient.md) ; chainId: number = 1; didContractAddress: string = VoltaAddress1056; ensRegistryAddress: string = "0xd7CeF70Ba7efc2035256d828d5287e2D285CD1ac"; ensResolverAddress: string = "0x0a97e07c4Df22e2e31872F20C5BE191D5EFc4680"; infuraId: undefined \| string ; ipfsUrl: string = "https://ipfs.infura.io:5001/api/v0/"; messagingMethod: undefined \| [CacheServer](../enums/messagingmethod.md#cacheserver) \| [WebRTC](../enums/messagingmethod.md#webrtc) \| [SmartContractStorage](../enums/messagingmethod.md#smartcontractstorage) ; natsServerUrl: undefined \| string ; privateKey: undefined \| string ; rpcUrl: string  }): [IAMBase](iambase.md)

IAM Constructor

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { bridgeUrl: string = "https://walletconnect.energyweb.org"; cacheClient: undefined \| [ICacheServerClient](../interfaces/icacheserverclient.md) ; chainId: number = 1; didContractAddress: string = VoltaAddress1056; ensRegistryAddress: string = "0xd7CeF70Ba7efc2035256d828d5287e2D285CD1ac"; ensResolverAddress: string = "0x0a97e07c4Df22e2e31872F20C5BE191D5EFc4680"; infuraId: undefined \| string ; ipfsUrl: string = "https://ipfs.infura.io:5001/api/v0/"; messagingMethod: undefined \| [CacheServer](../enums/messagingmethod.md#cacheserver) \| [WebRTC](../enums/messagingmethod.md#webrtc) \| [SmartContractStorage](../enums/messagingmethod.md#smartcontractstorage) ; natsServerUrl: undefined \| string ; privateKey: undefined \| string ; rpcUrl: string  } |

**Returns:** [IAMBase](iambase.md)

## Properties

### \_address

• `Protected` **\_address**: string \| undefined

___

### \_cacheClient

• `Protected` **\_cacheClient**: [ICacheServerClient](../interfaces/icacheserverclient.md) \| undefined

___

### \_connectionOptions

• `Protected` **\_connectionOptions**: { bridgeUrl: string ; chainId: number ; infuraId?: undefined \| string ; privateKey?: undefined \| string ; rpcUrl: string  }

#### Type declaration:

Name | Type |
------ | ------ |
`bridgeUrl` | string |
`chainId` | number |
`infuraId?` | undefined \| string |
`privateKey?` | undefined \| string |
`rpcUrl` | string |

___

### \_did

• `Protected` **\_did**: string \| undefined

___

### \_didSigner

• `Protected` **\_didSigner**: IdentityOwner \| undefined

___

### \_document

• `Protected` **\_document**: DIDDocumentFull \| undefined

___

### \_ensRegistry

• `Protected` **\_ensRegistry**: EnsRegistry \| undefined

___

### \_ensRegistryAddress

• `Protected` **\_ensRegistryAddress**: string

___

### \_ensResolver

• `Protected` **\_ensResolver**: PublicResolver \| undefined

___

### \_ensResolverAddress

• `Protected` **\_ensResolverAddress**: string

___

### \_ipfsStore

• `Protected` **\_ipfsStore**: DidStore

___

### \_issuerClaims

• `Protected` **\_issuerClaims**: ClaimsIssuer \| undefined

___

### \_jsonCodec

• `Protected` **\_jsonCodec**: Codec\<any> \| undefined

___

### \_jwt

• `Protected` **\_jwt**: JWT \| undefined

___

### \_natsConnection

• `Protected` **\_natsConnection**: NatsConnection \| undefined

___

### \_natsServerUrl

• `Protected` **\_natsServerUrl**: string \| undefined

___

### \_provider

• `Protected` **\_provider**: JsonRpcProvider \| undefined

___

### \_registrySetting

• `Protected` **\_registrySetting**: RegistrySettings

___

### \_resolver

• `Protected` **\_resolver**: Resolver \| undefined

___

### \_runningInBrowser

• `Protected` **\_runningInBrowser**: boolean

___

### \_signer

• `Protected` **\_signer**: Signer \| undefined

___

### \_transactionOverrides

• `Protected` **\_transactionOverrides**: TransactionOverrides

___

### \_userClaims

• `Protected` **\_userClaims**: ClaimsUser \| undefined

___

### \_verifierClaims

• `Protected` **\_verifierClaims**: ClaimsVerifier \| undefined

___

### \_walletConnectProvider

• `Protected` **\_walletConnectProvider**: WalletConnectProvider \| undefined

## Methods

### changeSubdomainOwner

▸ `Protected`**changeSubdomainOwner**(`__namedParameters`: { label: string ; namespace: string ; newOwner: string  }): Promise\<void>

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { label: string ; namespace: string ; newOwner: string  } |

**Returns:** Promise\<void>

___

### createSubdomain

▸ `Protected`**createSubdomain**(`__namedParameters`: { domain: string ; subdomain: string  }): Promise\<void>

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { domain: string ; subdomain: string  } |

**Returns:** Promise\<void>

___

### deleteSubdomain

▸ `Protected`**deleteSubdomain**(`__namedParameters`: { namespace: string  }): Promise\<void>

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { namespace: string  } |

**Returns:** Promise\<void>

___

### downloadClaims

▸ `Protected`**downloadClaims**(`__namedParameters`: { services: IServiceEndpoint[]  }): Promise\<{ serviceEndpoint: string  }[]>

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { services: IServiceEndpoint[]  } |

**Returns:** Promise\<{ serviceEndpoint: string  }[]>

___

### getFilteredDomainsFromEvent

▸ `Protected`**getFilteredDomainsFromEvent**(`__namedParameters`: { domain: string  }): Promise\<string[]>

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { domain: string  } |

**Returns:** Promise\<string[]>

___

### getOwner

▸ `Protected`**getOwner**(`__namedParameters`: { namespace: string  }): Promise\<string>

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { namespace: string  } |

**Returns:** Promise\<string>

___

### getPublicKey

▸ `Private`**getPublicKey**(): Promise\<string>

**Returns:** Promise\<string>

___

### init

▸ `Protected`**init**(`__namedParameters`: { initializeMetamask: undefined \| false \| true ; useMetamask: boolean  }): Promise\<void>

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { initializeMetamask: undefined \| false \| true ; useMetamask: boolean  } |

**Returns:** Promise\<void>

___

### setAddress

▸ `Private`**setAddress**(): Promise\<void>

**Returns:** Promise\<void>

___

### setClaims

▸ `Private`**setClaims**(): void

**Returns:** void

___

### setDid

▸ `Private`**setDid**(): void

**Returns:** void

___

### setDocument

▸ `Private`**setDocument**(): Promise\<void>

**Returns:** Promise\<void>

___

### setDomainName

▸ `Protected`**setDomainName**(`__namedParameters`: { domain: string  }): Promise\<void>

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { domain: string  } |

**Returns:** Promise\<void>

___

### setJWT

▸ `Private`**setJWT**(): void

**Returns:** void

___

### setResolver

▸ `Private`**setResolver**(): void

**Returns:** void

___

### setupBrowserEnv

▸ `Private`**setupBrowserEnv**(): Promise\<void>

**Returns:** Promise\<void>

___

### setupENS

▸ `Private`**setupENS**(): void

**Returns:** void

___

### setupNATS

▸ `Private`**setupNATS**(): Promise\<void>

**Returns:** Promise\<void>

___

### setupProvider

▸ `Private`**setupProvider**(`__namedParameters`: { initializeMetamask: undefined \| false \| true ; useMetamask: boolean  }): Promise\<void>

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { initializeMetamask: undefined \| false \| true ; useMetamask: boolean  } |

**Returns:** Promise\<void>

___

### setupUniversalEnv

▸ `Private`**setupUniversalEnv**(): void

**Returns:** void

___

### validateIssuers

▸ `Protected`**validateIssuers**(`__namedParameters`: { issuer: string[] ; namespace: string  }): Promise\<void>

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { issuer: string[] ; namespace: string  } |

**Returns:** Promise\<void>
