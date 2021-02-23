**[iam-client-lib](../README.md)**

# Class: IAMBase

## Hierarchy

* **IAMBase**

  ↳ [IAM](iam.md)

## Index

### Constructors

* [constructor](iambase.md#constructor)

### Accessors

* [address](iambase.md#address)

### Methods

* [closeConnection](iambase.md#closeconnection)
* [on](iambase.md#on)

## Constructors

### constructor

\+ **new IAMBase**(`__namedParameters`: { bridgeUrl: string = "https://walletconnect.energyweb.org"; cacheClient: undefined \| [ICacheServerClient](../interfaces/icacheserverclient.md) ; chainId: number = VOLTA\_CHAIN\_ID; didContractAddress: string = VoltaAddress1056; ensRegistryAddress: string = "0xd7CeF70Ba7efc2035256d828d5287e2D285CD1ac"; ensResolverAddress: string = "0x0a97e07c4Df22e2e31872F20C5BE191D5EFc4680"; ewKeyManagerUrl: string = "https://km.aws.energyweb.org/connect/new"; infuraId: undefined \| string ; ipfsUrl: string = "https://ipfs.infura.io:5001/api/v0/"; messagingMethod: undefined \| [CacheServer](../enums/messagingmethod.md#cacheserver) \| [WebRTC](../enums/messagingmethod.md#webrtc) \| [SmartContractStorage](../enums/messagingmethod.md#smartcontractstorage) ; natsServerUrl: undefined \| string ; privateKey: undefined \| string ; rpcUrl: string  }): [IAMBase](iambase.md)

IAM Constructor

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { bridgeUrl: string = "https://walletconnect.energyweb.org"; cacheClient: undefined \| [ICacheServerClient](../interfaces/icacheserverclient.md) ; chainId: number = VOLTA\_CHAIN\_ID; didContractAddress: string = VoltaAddress1056; ensRegistryAddress: string = "0xd7CeF70Ba7efc2035256d828d5287e2D285CD1ac"; ensResolverAddress: string = "0x0a97e07c4Df22e2e31872F20C5BE191D5EFc4680"; ewKeyManagerUrl: string = "https://km.aws.energyweb.org/connect/new"; infuraId: undefined \| string ; ipfsUrl: string = "https://ipfs.infura.io:5001/api/v0/"; messagingMethod: undefined \| [CacheServer](../enums/messagingmethod.md#cacheserver) \| [WebRTC](../enums/messagingmethod.md#webrtc) \| [SmartContractStorage](../enums/messagingmethod.md#smartcontractstorage) ; natsServerUrl: undefined \| string ; privateKey: undefined \| string ; rpcUrl: string  } |

**Returns:** [IAMBase](iambase.md)

## Accessors

### address

• get **address**(): undefined \| string

**Returns:** undefined \| string

## Methods

### closeConnection

▸ **closeConnection**(): Promise\<void>

Close connection to wallet

**`description`** closes the connection between dApp and the wallet

**Returns:** Promise\<void>

___

### on

▸ **on**(`event`: \"accountChanged\" \| \"networkChanged\" \| \"disconnected\", `eventHandler`: () => void): void

Add event handler for certain events

**`requires`** to be called after the connection to wallet was initialized

#### Parameters:

Name | Type |
------ | ------ |
`event` | \"accountChanged\" \| \"networkChanged\" \| \"disconnected\" |
`eventHandler` | () => void |

**Returns:** void
