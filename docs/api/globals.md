**[iam-client-lib](README.md)**

# iam-client-lib

## Index

### Enumerations

* [ENSNamespaceTypes](enums/ensnamespacetypes.md)
* [MessagingMethod](enums/messagingmethod.md)

### Classes

* [CacheClientNotProvidedError](classes/cacheclientnotprovidederror.md)
* [CacheServerClient](classes/cacheserverclient.md)
* [ENSRegistryNotInitializedError](classes/ensregistrynotinitializederror.md)
* [ENSResolverNotInitializedError](classes/ensresolvernotinitializederror.md)
* [ENSTypeNotSupportedError](classes/enstypenotsupportederror.md)
* [IAM](classes/iam.md)
* [IAMBase](classes/iambase.md)
* [MethodNotAvailableInNodeEnvError](classes/methodnotavailableinnodeenverror.md)
* [NATSConnectionNotEstablishedError](classes/natsconnectionnotestablishederror.md)
* [Owner](classes/owner.md)

### Interfaces

* [Claim](interfaces/claim.md)
* [IApp](interfaces/iapp.md)
* [IAppDefinition](interfaces/iappdefinition.md)
* [ICacheServerClient](interfaces/icacheserverclient.md)
* [IMessage](interfaces/imessage.md)
* [IOrganization](interfaces/iorganization.md)
* [IOrganizationDefinition](interfaces/iorganizationdefinition.md)
* [IRole](interfaces/irole.md)
* [IRoleDefinition](interfaces/iroledefinition.md)

### Type aliases

* [ConnectionOptions](globals.md#connectionoptions)
* [InitializeData](globals.md#initializedata)

### Variables

* [Interface](globals.md#interface)
* [NATS\_EXCHANGE\_TOPIC](globals.md#nats_exchange_topic)
* [abi1056](globals.md#abi1056)
* [bigNumberify](globals.md#bignumberify)
* [emptyAddress](globals.md#emptyaddress)
* [hexlify](globals.md#hexlify)
* [sha3](globals.md#sha3)

### Functions

* [decodeLabelhash](globals.md#decodelabelhash)
* [isBrowser](globals.md#isbrowser)
* [isEncodedLabelhash](globals.md#isencodedlabelhash)
* [labelhash](globals.md#labelhash)
* [namehash](globals.md#namehash)

## Type aliases

### ConnectionOptions

Ƭ  **ConnectionOptions**: { bridgeUrl?: undefined \| string ; cacheClient?: [ICacheServerClient](interfaces/icacheserverclient.md) ; chainId?: undefined \| number ; didContractAddress?: undefined \| string ; ensRegistryAddress?: undefined \| string ; ensResolverAddress?: undefined \| string ; infuraId?: undefined \| string ; ipfsUrl?: undefined \| string ; messagingMethod?: [MessagingMethod](enums/messagingmethod.md) ; natsServerUrl?: undefined \| string ; privateKey?: undefined \| string ; rpcUrl: string  }

#### Type declaration:

Name | Type |
------ | ------ |
`bridgeUrl?` | undefined \| string |
`cacheClient?` | [ICacheServerClient](interfaces/icacheserverclient.md) |
`chainId?` | undefined \| number |
`didContractAddress?` | undefined \| string |
`ensRegistryAddress?` | undefined \| string |
`ensResolverAddress?` | undefined \| string |
`infuraId?` | undefined \| string |
`ipfsUrl?` | undefined \| string |
`messagingMethod?` | [MessagingMethod](enums/messagingmethod.md) |
`natsServerUrl?` | undefined \| string |
`privateKey?` | undefined \| string |
`rpcUrl` | string |

___

### InitializeData

Ƭ  **InitializeData**: { connected: boolean ; did: string \| undefined ; didDocument: IDIDDocument \| null ; userClosedModal: boolean  }

#### Type declaration:

Name | Type |
------ | ------ |
`connected` | boolean |
`did` | string \| undefined |
`didDocument` | IDIDDocument \| null |
`userClosedModal` | boolean |

## Variables

### Interface

•  **Interface**: Interface

___

### NATS\_EXCHANGE\_TOPIC

• `Const` **NATS\_EXCHANGE\_TOPIC**: \"claim.exchange\" = "claim.exchange"

___

### abi1056

•  **abi1056**: ({ anonymous?: undefined ; constant: boolean ; inputs: { name: string ; type: string  }[] ; name: string ; outputs: { name: string ; type: string  }[] ; payable: boolean ; stateMutability: string ; type: string  } \| { anonymous: boolean ; constant?: undefined ; inputs: { indexed: boolean ; name: string ; type: string  }[] ; name: string ; outputs?: undefined ; payable?: undefined ; stateMutability?: undefined ; type: string  })[]

___

### bigNumberify

•  **bigNumberify**: bigNumberify

___

### emptyAddress

• `Const` **emptyAddress**: \"0x0000000000000000000000000000000000000000\" = "0x0000000000000000000000000000000000000000"

___

### hexlify

•  **hexlify**: hexlify

___

### sha3

• `Const` **sha3**: any = require("js-sha3").keccak\_256

## Functions

### decodeLabelhash

▸ **decodeLabelhash**(`hash`: string): string

#### Parameters:

Name | Type |
------ | ------ |
`hash` | string |

**Returns:** string

___

### isBrowser

▸ `Const`**isBrowser**(): boolean

**Returns:** boolean

___

### isEncodedLabelhash

▸ **isEncodedLabelhash**(`hash`: string): boolean

#### Parameters:

Name | Type |
------ | ------ |
`hash` | string |

**Returns:** boolean

___

### labelhash

▸ **labelhash**(`unnormalizedLabelOrLabelhash`: string): string

#### Parameters:

Name | Type |
------ | ------ |
`unnormalizedLabelOrLabelhash` | string |

**Returns:** string

___

### namehash

▸ **namehash**(`inputName`: string): string

#### Parameters:

Name | Type |
------ | ------ |
`inputName` | string |

**Returns:** string
