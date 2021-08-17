# Class: Owner

[signer/Owner](../modules/signer_Owner.md).Owner

## Hierarchy

- `Signer`

  ↳ **`Owner`**

## Implements

- `IdentityOwner`

## Table of contents

### Constructors

- [constructor](signer_Owner.Owner.md#constructor)

### Properties

- [privateKey](signer_Owner.Owner.md#privatekey)
- [provider](signer_Owner.Owner.md#provider)
- [publicKey](signer_Owner.Owner.md#publickey)
- [signer](signer_Owner.Owner.md#signer)

### Methods

- [connect](signer_Owner.Owner.md#connect)
- [getAddress](signer_Owner.Owner.md#getaddress)
- [sendTransaction](signer_Owner.Owner.md#sendtransaction)
- [signMessage](signer_Owner.Owner.md#signmessage)
- [signTransaction](signer_Owner.Owner.md#signtransaction)

## Constructors

### constructor

• **new Owner**(`signer`, `provider`, `publicKey`, `privateKey?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `signer` | `Signer` |
| `provider` | `Provider` |
| `publicKey` | `string` |
| `privateKey?` | `string` |

#### Overrides

Signer.constructor

## Properties

### privateKey

• `Optional` **privateKey**: `string`

#### Implementation of

IdentityOwner.privateKey

___

### provider

• **provider**: `Provider`

#### Implementation of

IdentityOwner.provider

#### Inherited from

Signer.provider

___

### publicKey

• **publicKey**: `string`

#### Implementation of

IdentityOwner.publicKey

___

### signer

• **signer**: `Signer`

#### Implementation of

IdentityOwner.signer

## Methods

### connect

▸ **connect**(`provider`): `Signer`

#### Parameters

| Name | Type |
| :------ | :------ |
| `provider` | `Provider` |

#### Returns

`Signer`

#### Implementation of

IdentityOwner.connect

#### Overrides

Signer.connect

___

### getAddress

▸ **getAddress**(): `Promise`<`string`\>

#### Returns

`Promise`<`string`\>

#### Implementation of

IdentityOwner.getAddress

#### Overrides

Signer.getAddress

___

### sendTransaction

▸ **sendTransaction**(`transaction`): `Promise`<`TransactionResponse`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `transaction` | `TransactionRequest` |

#### Returns

`Promise`<`TransactionResponse`\>

#### Implementation of

IdentityOwner.sendTransaction

#### Overrides

Signer.sendTransaction

___

### signMessage

▸ **signMessage**(`message`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` \| `Bytes` |

#### Returns

`Promise`<`string`\>

#### Implementation of

IdentityOwner.signMessage

#### Overrides

Signer.signMessage

___

### signTransaction

▸ **signTransaction**(`transaction`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `transaction` | `Deferrable`<`TransactionRequest`\> |

#### Returns

`Promise`<`string`\>

#### Implementation of

IdentityOwner.signTransaction

#### Overrides

Signer.signTransaction
