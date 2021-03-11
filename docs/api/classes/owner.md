**[iam-client-lib](../README.md)**

# Class: Owner

## Hierarchy

* Signer

  ↳ **Owner**

## Implements

* IdentityOwner

## Index

### Constructors

* [constructor](owner.md#constructor)

### Properties

* [identityToken](owner.md#identitytoken)
* [privateKey](owner.md#privatekey)
* [provider](owner.md#provider)
* [publicKey](owner.md#publickey)

### Methods

* [getAddress](owner.md#getaddress)
* [sendTransaction](owner.md#sendtransaction)
* [signMessage](owner.md#signmessage)
* [isSigner](owner.md#issigner)

## Constructors

### constructor

\+ **new Owner**(`signer`: Signer, `provider`: Provider, `publicKey`: string, `identityToken?`: undefined \| string, `privateKey?`: undefined \| string): [Owner](owner.md)

*Overrides void*

#### Parameters:

Name | Type |
------ | ------ |
`signer` | Signer |
`provider` | Provider |
`publicKey` | string |
`identityToken?` | undefined \| string |
`privateKey?` | undefined \| string |

**Returns:** [Owner](owner.md)

## Properties

### identityToken

• `Optional` **identityToken**: undefined \| string

___

### privateKey

• `Optional` **privateKey**: undefined \| string

___

### provider

•  **provider**: Provider

*Overrides void*

___

### publicKey

•  **publicKey**: string

## Methods

### getAddress

▸ **getAddress**(): Promise\<string>

*Overrides void*

**Returns:** Promise\<string>

___

### sendTransaction

▸ **sendTransaction**(`transaction`: providers.TransactionRequest): Promise\<TransactionResponse>

*Overrides void*

#### Parameters:

Name | Type |
------ | ------ |
`transaction` | providers.TransactionRequest |

**Returns:** Promise\<TransactionResponse>

___

### signMessage

▸ **signMessage**(`message`: utils.Arrayish): Promise\<string>

*Overrides void*

#### Parameters:

Name | Type |
------ | ------ |
`message` | utils.Arrayish |

**Returns:** Promise\<string>

___

### isSigner

▸ `Static`**isSigner**(`value`: any): value is Signer

*Inherited from [Owner](owner.md).[isSigner](owner.md#issigner)*

#### Parameters:

Name | Type |
------ | ------ |
`value` | any |

**Returns:** value is Signer
