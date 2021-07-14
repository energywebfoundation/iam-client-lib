**[iam-client-lib](README.md)**

# iam-client-lib

## Index

### Enumerations

* [AssetHistoryEventType](enums/assethistoryeventtype.md)
* [ENSNamespaceTypes](enums/ensnamespacetypes.md)
* [ERROR\_MESSAGES](enums/error_messages.md)
* [MessagingMethod](enums/messagingmethod.md)
* [Order](enums/order.md)
* [RegistrationTypes](enums/registrationtypes.md)
* [StakeStatus](enums/stakestatus.md)
* [WalletProvider](enums/walletprovider.md)

### Classes

* [CacheClientNotProvidedError](classes/cacheclientnotprovidederror.md)
* [CacheServerClient](classes/cacheserverclient.md)
* [ChangeOwnershipNotPossibleError](classes/changeownershipnotpossibleerror.md)
* [ControllableWalletConnect](classes/controllablewalletconnect.md)
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
* [StakingPool](classes/stakingpool.md)
* [StakingPoolService](classes/stakingpoolservice.md)
* [WalletConnectService](classes/walletconnectservice.md)

### Interfaces

* [Asset](interfaces/asset.md)
* [AssetHistory](interfaces/assethistory.md)
* [AssetProfile](interfaces/assetprofile.md)
* [AssetProfiles](interfaces/assetprofiles.md)
* [CacheServerClientOptions](interfaces/cacheserverclientoptions.md)
* [ChainConfig](interfaces/chainconfig.md)
* [ChangeResolverParams](interfaces/changeresolverparams.md)
* [Claim](interfaces/claim.md)
* [ClaimData](interfaces/claimdata.md)
* [IApp](interfaces/iapp.md)
* [ICacheServerClient](interfaces/icacheserverclient.md)
* [IClaimIssuance](interfaces/iclaimissuance.md)
* [IClaimRejection](interfaces/iclaimrejection.md)
* [IClaimRequest](interfaces/iclaimrequest.md)
* [IMessage](interfaces/imessage.md)
* [IOrganization](interfaces/iorganization.md)
* [IPubKeyAndIdentityToken](interfaces/ipubkeyandidentitytoken.md)
* [IRole](interfaces/irole.md)
* [MessagingOptions](interfaces/messagingoptions.md)
* [Profile](interfaces/profile.md)

### Type aliases

* [ConnectionOptions](globals.md#connectionoptions)
* [EncodedCall](globals.md#encodedcall)
* [InitializeData](globals.md#initializedata)
* [Service](globals.md#service)
* [Stake](globals.md#stake)
* [Transaction](globals.md#transaction)

### Variables

* [BigNumber](globals.md#bignumber)
* [JsonRpcProvider](globals.md#jsonrpcprovider)
* [NATS\_EXCHANGE\_TOPIC](globals.md#nats_exchange_topic)
* [NODE\_FIELDS\_KEY](globals.md#node_fields_key)
* [PUBLIC\_KEY](globals.md#public_key)
* [VOLTA\_CHAIN\_ID](globals.md#volta_chain_id)
* [WALLET\_PROVIDER](globals.md#wallet_provider)
* [abi1056](globals.md#abi1056)
* [agreement\_type\_hash](globals.md#agreement_type_hash)
* [arrayify](globals.md#arrayify)
* [bigNumberify](globals.md#bignumberify)
* [computeAddress](globals.md#computeaddress)
* [computePublicKey](globals.md#computepublickey)
* [defaultAbiCoder](globals.md#defaultabicoder)
* [defaultClaimExpiry](globals.md#defaultclaimexpiry)
* [emptyAddress](globals.md#emptyaddress)
* [erc712\_type\_hash](globals.md#erc712_type_hash)
* [getAddress](globals.md#getaddress)
* [hashMessage](globals.md#hashmessage)
* [hexlify](globals.md#hexlify)
* [id](globals.md#id)
* [keccak256](globals.md#keccak256)
* [owners](globals.md#owners)
* [proof\_type\_hash](globals.md#proof_type_hash)
* [recoverPublicKey](globals.md#recoverpublickey)
* [sha3](globals.md#sha3)
* [solidityKeccak256](globals.md#soliditykeccak256)
* [typedMsgPrefix](globals.md#typedmsgprefix)
* [validators](globals.md#validators)

### Functions

* [addSupportedDID](globals.md#addsupporteddid)
* [canonizeSig](globals.md#canonizesig)
* [changeResolver](globals.md#changeresolver)
* [decodeLabelhash](globals.md#decodelabelhash)
* [getPublicKeyAndIdentityToken](globals.md#getpublickeyandidentitytoken)
* [isBrowser](globals.md#isbrowser)
* [isEncodedLabelhash](globals.md#isencodedlabelhash)
* [isValidDID](globals.md#isvaliddid)
* [labelhash](globals.md#labelhash)
* [namehash](globals.md#namehash)
* [parseDID](globals.md#parsedid)
* [setCacheClientOptions](globals.md#setcacheclientoptions)
* [setChainConfig](globals.md#setchainconfig)
* [setMessagingOptions](globals.md#setmessagingoptions)
* [supportedDIDMethods](globals.md#supporteddidmethods)

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

### Service

Ƭ  **Service**: { org: string ; pool: string ; provider: string  }

#### Type declaration:

Name | Type | Description |
------ | ------ | ------ |
`org` | string | organization ENS name |
`pool` | string | pool address |
`provider` | string | provider address |

___

### Stake

Ƭ  **Stake**: { amount: BigNumber ; start: BigNumber ; status: [StakeStatus](enums/stakestatus.md) ; withdrawalRequested: BigNumber  }

#### Type declaration:

Name | Type |
------ | ------ |
`amount` | BigNumber |
`start` | BigNumber |
`status` | [StakeStatus](enums/stakestatus.md) |
`withdrawalRequested` | BigNumber |

___

### Transaction

Ƭ  **Transaction**: { calls: [EncodedCall](globals.md#encodedcall)[] ; from: string  }

#### Type declaration:

Name | Type |
------ | ------ |
`calls` | [EncodedCall](globals.md#encodedcall)[] |
`from` | string |

## Variables

### BigNumber

•  **BigNumber**: BigNumber

___

### JsonRpcProvider

•  **JsonRpcProvider**: JsonRpcProvider

___

### NATS\_EXCHANGE\_TOPIC

• `Const` **NATS\_EXCHANGE\_TOPIC**: \"claim.exchange\" = "claim.exchange"

___

### NODE\_FIELDS\_KEY

• `Const` **NODE\_FIELDS\_KEY**: \"metadata\" = "metadata"

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

### agreement\_type\_hash

• `Const` **agreement\_type\_hash**: string = utils.id("Agreement(address subject,bytes32 role,uint256 version)")

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

### defaultAbiCoder

•  **defaultAbiCoder**: AbiCoder

___

### defaultClaimExpiry

• `Const` **defaultClaimExpiry**: number = Number.MAX\_SAFE\_INTEGER

___

### emptyAddress

• `Const` **emptyAddress**: \"0x0000000000000000000000000000000000000000\" = "0x0000000000000000000000000000000000000000"

___

### erc712\_type\_hash

• `Const` **erc712\_type\_hash**: string = utils.id("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)")

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

### id

•  **id**: id

___

### keccak256

•  **keccak256**: keccak256

___

### owners

• `Const` **owners**: Record\<string, string>

___

### proof\_type\_hash

• `Const` **proof\_type\_hash**: string = utils.id("Proof(address subject,bytes32 role,uint256 version,uint256 expiry,address issuer)")

___

### recoverPublicKey

•  **recoverPublicKey**: recoverPublicKey

___

### sha3

• `Const` **sha3**: any = require("js-sha3").keccak\_256

___

### solidityKeccak256

•  **solidityKeccak256**: keccak256

___

### typedMsgPrefix

• `Const` **typedMsgPrefix**: \"1901\" = "1901"

___

### validators

• `Const` **validators**: Map\<Methods, (did: string) => boolean> = new Map\<Methods, (did: string) => boolean>()

## Functions

### addSupportedDID

▸ **addSupportedDID**(`method`: Methods, `validator`: (did: string) => boolean): void

#### Parameters:

Name | Type |
------ | ------ |
`method` | Methods |
`validator` | (did: string) => boolean |

**Returns:** void

___

### canonizeSig

▸ **canonizeSig**(`sig`: string): string

#### Parameters:

Name | Type |
------ | ------ |
`sig` | string |

**Returns:** string

___

### changeResolver

▸ **changeResolver**(`__namedParameters`: { domainHierarchy: DomainHierarchy ; newResolverAddr: string ; privateKey: string ; registryAddr: string ; resolverAddr: string ; rootNode: string ; rpcUrl: string  }): Promise\<void>

**`description`** - Updates resolver on all subnodes of `parentNode`

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { domainHierarchy: DomainHierarchy ; newResolverAddr: string ; privateKey: string ; registryAddr: string ; resolverAddr: string ; rootNode: string ; rpcUrl: string  } |

**Returns:** Promise\<void>

___

### decodeLabelhash

▸ **decodeLabelhash**(`hash`: string): string

#### Parameters:

Name | Type |
------ | ------ |
`hash` | string |

**Returns:** string

___

### getPublicKeyAndIdentityToken

▸ **getPublicKeyAndIdentityToken**(`signer`: Signer): Promise\<[IPubKeyAndIdentityToken](interfaces/ipubkeyandidentitytoken.md)>

#### Parameters:

Name | Type |
------ | ------ |
`signer` | Signer |

**Returns:** Promise\<[IPubKeyAndIdentityToken](interfaces/ipubkeyandidentitytoken.md)>

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

### isValidDID

▸ **isValidDID**(`did`: string): boolean

#### Parameters:

Name | Type |
------ | ------ |
`did` | string |

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

### parseDID

▸ **parseDID**(`did`: string): string

#### Parameters:

Name | Type |
------ | ------ |
`did` | string |

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

___

### supportedDIDMethods

▸ **supportedDIDMethods**(): Methods[]

**Returns:** Methods[]

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
`[VOLTA_CHAIN_ID]` | object | { assetManagerAddress: string = VOLTA\_IDENTITY\_MANAGER\_ADDRESS; claimManagerAddress: string = VOLTA\_CLAIM\_MANAGER\_ADDRESS; didContractAddress: string = VoltaAddress1056; domainNotifierAddress: string = VOLTA\_DOMAIN\_NOTIFER\_ADDRESS; ensPublicResolverAddress: string = VOLTA\_PUBLIC\_RESOLVER\_ADDRESS; ensRegistryAddress: string = VOLTA\_ENS\_REGISTRY\_ADDRESS; ensResolverAddress: string = VOLTA\_RESOLVER\_V1\_ADDRESS; rpcUrl: string = "https://volta-rpc.energyweb.org"; stakingPoolFactoryAddress: string = VOLTA\_STAKING\_POOL\_FACTORY\_ADDRESS } |

___

### messagingOptions

▪ `Const` **messagingOptions**: object

#### Properties:

Name | Type | Value |
------ | ------ | ------ |
`[VOLTA_CHAIN_ID]` | object | { messagingMethod: [Nats](enums/messagingmethod.md#nats) = MessagingMethod.Nats; natsServerUrl: string = "https://volta-identityevents.energyweb.org/" } |
