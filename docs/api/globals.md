**[iam-client-lib](README.md)**

# iam-client-lib

## Index

### Enumerations

* [ENSNamespaceTypes](enums/ensnamespacetypes.md)
* [ERROR\_MESSAGES](enums/error_messages.md)
* [MessagingMethod](enums/messagingmethod.md)
* [PreconditionTypes](enums/preconditiontypes.md)
* [WalletProvider](enums/walletprovider.md)

### Classes

* [CacheClientNotProvidedError](classes/cacheclientnotprovidederror.md)
* [CacheServerClient](classes/cacheserverclient.md)
* [ChangeOwnershipNotPossibleError](classes/changeownershipnotpossibleerror.md)
* [DeletingNamespaceNotPossibleError](classes/deletingnamespacenotpossibleerror.md)
* [ENSRegistryNotInitializedError](classes/ensregistrynotinitializederror.md)
* [ENSResolverNotInitializedError](classes/ensresolvernotinitializederror.md)
* [ENSTypeNotSupportedError](classes/enstypenotsupportederror.md)
* [GnosisIam](classes/gnosisiam.md)
* [IAM](classes/iam.md)
* [IAMBase](classes/iambase.md)
* [MethodNotAvailableInNodeEnvError](classes/methodnotavailableinnodeenverror.md)
* [NATSConnectionNotEstablishedError](classes/natsconnectionnotestablishederror.md)
* [Owner](classes/owner.md)
* [SignerFactory](classes/signerfactory.md)

### Interfaces

* [CacheServerClientOptions](interfaces/cacheserverclientoptions.md)
* [ChainConfig](interfaces/chainconfig.md)
* [Claim](interfaces/claim.md)
* [ClaimData](interfaces/claimdata.md)
* [IApp](interfaces/iapp.md)
* [IAppDefinition](interfaces/iappdefinition.md)
* [ICacheServerClient](interfaces/icacheserverclient.md)
* [IClaimIssuance](interfaces/iclaimissuance.md)
* [IClaimRejection](interfaces/iclaimrejection.md)
* [IClaimRequest](interfaces/iclaimrequest.md)
* [IMessage](interfaces/imessage.md)
* [IOrganization](interfaces/iorganization.md)
* [IOrganizationDefinition](interfaces/iorganizationdefinition.md)
* [IRole](interfaces/irole.md)
* [IRoleDefinition](interfaces/iroledefinition.md)
* [MessagingOptions](interfaces/messagingoptions.md)

### Type aliases

* [ConnectionOptions](globals.md#connectionoptions)
* [EncodedCall](globals.md#encodedcall)
* [InitializeData](globals.md#initializedata)
* [Transaction](globals.md#transaction)

### Variables

* [JsonRpcProvider](globals.md#jsonrpcprovider)
* [NATS\_EXCHANGE\_TOPIC](globals.md#nats_exchange_topic)
* [PUBLIC\_KEY](globals.md#public_key)
* [VOLTA\_CHAIN\_ID](globals.md#volta_chain_id)
* [WALLET\_PROVIDER](globals.md#wallet_provider)
* [abi1056](globals.md#abi1056)
* [arrayify](globals.md#arrayify)
* [bigNumberify](globals.md#bignumberify)
* [computeAddress](globals.md#computeaddress)
* [computePublicKey](globals.md#computepublickey)
* [emptyAddress](globals.md#emptyaddress)
* [getAddress](globals.md#getaddress)
* [hashMessage](globals.md#hashmessage)
* [hexlify](globals.md#hexlify)
* [keccak256](globals.md#keccak256)
* [recoverPublicKey](globals.md#recoverpublickey)
* [sha3](globals.md#sha3)

### Functions

* [decodeLabelhash](globals.md#decodelabelhash)
* [getDomainsFromLogs](globals.md#getdomainsfromlogs)
* [getSubdomains](globals.md#getsubdomains)
* [isBrowser](globals.md#isbrowser)
* [isEncodedLabelhash](globals.md#isencodedlabelhash)
* [labelhash](globals.md#labelhash)
* [namehash](globals.md#namehash)
* [setCacheClientOptions](globals.md#setcacheclientoptions)
* [setChainConfig](globals.md#setchainconfig)
* [setMessagingOptions](globals.md#setmessagingoptions)

### Object literals

* [cacheServerClientOptions](globals.md#cacheserverclientoptions)
* [chainConfigs](globals.md#chainconfigs)
* [messagingOptions](globals.md#messagingoptions)

## Type aliases

### ConnectionOptions

Ƭ  **ConnectionOptions**: { bridgeUrl?: undefined \| string ; ewKeyManagerUrl?: undefined \| string ; infuraId?: undefined \| string ; ipfsUrl?: undefined \| string ; privateKey?: undefined \| string ; rpcUrl?: undefined \| string  }

#### Type declaration:

Name | Type | Description |
------ | ------ | ------ |
`bridgeUrl?` | undefined \| string | - |
`ewKeyManagerUrl?` | undefined \| string | - |
`infuraId?` | undefined \| string | - |
`ipfsUrl?` | undefined \| string | - |
`privateKey?` | undefined \| string | - |
`rpcUrl?` | undefined \| string | only required in node env |

___

### EncodedCall

Ƭ  **EncodedCall**: { data: string ; to: string ; value?: undefined \| string  }

#### Type declaration:

Name | Type |
------ | ------ |
`data` | string |
`to` | string |
`value?` | undefined \| string |

___

### InitializeData

Ƭ  **InitializeData**: { connected: boolean ; did: string \| undefined ; didDocument: IDIDDocument \| null ; identityToken?: undefined \| string ; realtimeExchangeConnected: boolean ; userClosedModal: boolean  }

#### Type declaration:

Name | Type |
------ | ------ |
`connected` | boolean |
`did` | string \| undefined |
`didDocument` | IDIDDocument \| null |
`identityToken?` | undefined \| string |
`realtimeExchangeConnected` | boolean |
`userClosedModal` | boolean |

___

### Transaction

Ƭ  **Transaction**: { calls: [EncodedCall](globals.md#encodedcall)[] ; from: string  }

#### Type declaration:

Name | Type |
------ | ------ |
`calls` | [EncodedCall](globals.md#encodedcall)[] |
`from` | string |

## Variables

### JsonRpcProvider

•  **JsonRpcProvider**: JsonRpcProvider

___

### NATS\_EXCHANGE\_TOPIC

• `Const` **NATS\_EXCHANGE\_TOPIC**: \"claim.exchange\" = "claim.exchange"

___

### PUBLIC\_KEY

• `Const` **PUBLIC\_KEY**: \"PublicKey\" = "PublicKey"

___

### VOLTA\_CHAIN\_ID

• `Const` **VOLTA\_CHAIN\_ID**: 73799 = 73799

___

### WALLET\_PROVIDER

• `Const` **WALLET\_PROVIDER**: \"WalletProvider\" = "WalletProvider"

___

### abi1056

•  **abi1056**: ({ anonymous?: undefined ; constant: boolean ; inputs: { name: string ; type: string  }[] ; name: string ; outputs: { name: string ; type: string  }[] ; payable: boolean ; stateMutability: string ; type: string  } \| { anonymous: boolean ; constant?: undefined ; inputs: { indexed: boolean ; name: string ; type: string  }[] ; name: string ; outputs?: undefined ; payable?: undefined ; stateMutability?: undefined ; type: string  })[]

___

### arrayify

•  **arrayify**: arrayify

___

### bigNumberify

•  **bigNumberify**: bigNumberify

___

### computeAddress

•  **computeAddress**: computeAddress

___

### computePublicKey

•  **computePublicKey**: computePublicKey

___

### emptyAddress

• `Const` **emptyAddress**: \"0x0000000000000000000000000000000000000000\" = "0x0000000000000000000000000000000000000000"

___

### getAddress

•  **getAddress**: getAddress

___

### hashMessage

•  **hashMessage**: hashMessage

___

### hexlify

•  **hexlify**: hexlify

___

### keccak256

•  **keccak256**: keccak256

___

### recoverPublicKey

•  **recoverPublicKey**: recoverPublicKey

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

### getDomainsFromLogs

▸ `Const`**getDomainsFromLogs**(`__namedParameters`: { contractInterface: Interface ; event: EventFilter ; parser: (log: { label: any ; node: any ; owner: any  }) => Promise\<string> ; provider: Provider  }): Promise\<string[]>

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { contractInterface: Interface ; event: EventFilter ; parser: (log: { label: any ; node: any ; owner: any  }) => Promise\<string> ; provider: Provider  } |

**Returns:** Promise\<string[]>

___

### getSubdomains

▸ `Const`**getSubdomains**(`__namedParameters`: { domain: string ; ensRegistry: EnsRegistry ; ensResolver: PublicResolver ; mode: \"ALL\" \| \"FIRSTLEVEL\"  }): Promise\<string[]>

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { domain: string ; ensRegistry: EnsRegistry ; ensResolver: PublicResolver ; mode: \"ALL\" \| \"FIRSTLEVEL\"  } |

**Returns:** Promise\<string[]>

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

___

### setCacheClientOptions

▸ `Const`**setCacheClientOptions**(`chainId`: number, `options`: Partial\<[CacheServerClientOptions](interfaces/cacheserverclientoptions.md)>): void

Used to override existing cache server configuration or add a missing one
Configuration must be set before constructing `IAM`

#### Parameters:

Name | Type |
------ | ------ |
`chainId` | number |
`options` | Partial\<[CacheServerClientOptions](interfaces/cacheserverclientoptions.md)> |

**Returns:** void

___

### setChainConfig

▸ `Const`**setChainConfig**(`chainId`: number, `config`: Partial\<[ChainConfig](interfaces/chainconfig.md)>): void

Used to override existing chain configuration or add a missing one
Configuration must be set before constructing `IAM`

#### Parameters:

Name | Type |
------ | ------ |
`chainId` | number |
`config` | Partial\<[ChainConfig](interfaces/chainconfig.md)> |

**Returns:** void

___

### setMessagingOptions

▸ `Const`**setMessagingOptions**(`chainId`: number, `options`: Partial\<[MessagingOptions](interfaces/messagingoptions.md)>): void

Used to override existing messaging configuration or add a missing one
Configuration must be set before constructing `IAM`

#### Parameters:

Name | Type |
------ | ------ |
`chainId` | number |
`options` | Partial\<[MessagingOptions](interfaces/messagingoptions.md)> |

**Returns:** void

## Object literals

### cacheServerClientOptions

▪ `Const` **cacheServerClientOptions**: object

#### Properties:

Name | Type | Value |
------ | ------ | ------ |
`[VOLTA_CHAIN_ID]` | object | { cacheServerSupportsAuth: true = true; url: string = "https://volta-identitycache.energyweb.org/" } |

___

### chainConfigs

▪ `Const` **chainConfigs**: object

Set of parameters to configure connection to chain with id received from wallet.
If configuration for some chain is missing or should be reconfigured use `setChainConfig` before class instantiation

#### Properties:

Name | Type | Value |
------ | ------ | ------ |
`[VOLTA_CHAIN_ID]` | object | { didContractAddress: string = VoltaAddress1056; ensRegistryAddress: string = "0xd7CeF70Ba7efc2035256d828d5287e2D285CD1ac"; ensResolverAddress: string = "0x0a97e07c4Df22e2e31872F20C5BE191D5EFc4680"; rpcUrl: string = "https://volta-rpc-vkn5r5zx4ke71f9hcu0c.energyweb.org/" } |

___

### messagingOptions

▪ `Const` **messagingOptions**: object

#### Properties:

Name | Type | Value |
------ | ------ | ------ |
`[VOLTA_CHAIN_ID]` | object | { messagingMethod: [Nats](enums/messagingmethod.md#nats) = MessagingMethod.Nats; natsServerUrl: string = "https://volta-identityevents.energyweb.org/" } |
