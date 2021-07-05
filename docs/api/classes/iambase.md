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
* [isSessionActive](iambase.md#issessionactive)
* [on](iambase.md#on)

## Constructors

### constructor

\+ **new IAMBase**(`__namedParameters?`: { bridgeUrl: string = "https://walletconnect.energyweb.org"; ewKeyManagerUrl: string = "https://km.aws.energyweb.org/connect/new"; infuraId: undefined \| string ; ipfsUrl: string = "https://ipfs.infura.io:5001/api/v0/"; privateKey: undefined \| string ; rpcUrl: undefined \| string  }): [IAMBase](iambase.md)

IAM Constructor

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`__namedParameters` | { bridgeUrl: string = "https://walletconnect.energyweb.org"; ewKeyManagerUrl: string = "https://km.aws.energyweb.org/connect/new"; infuraId: undefined \| string ; ipfsUrl: string = "https://ipfs.infura.io:5001/api/v0/"; privateKey: undefined \| string ; rpcUrl: undefined \| string  } | {} |

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

### isSessionActive

▸ **isSessionActive**(): boolean

Check if session is active

**Returns:** boolean

boolean that indicates the session state

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
