# Class: EkcSigner

[modules/signer](../modules/modules_signer.md).EkcSigner

## Hierarchy

- `Signer`

  ↳ **`EkcSigner`**

## Implements

- `TypedDataSigner`

## Table of contents

### Constructors

- [constructor](modules_signer.EkcSigner.md#constructor)

### Properties

- [ekc](modules_signer.EkcSigner.md#ekc)
- [provider](modules_signer.EkcSigner.md#provider)

### Methods

- [\_signTypedData](modules_signer.EkcSigner.md#_signtypeddata)
- [connect](modules_signer.EkcSigner.md#connect)
- [getAddress](modules_signer.EkcSigner.md#getaddress)
- [signMessage](modules_signer.EkcSigner.md#signmessage)
- [signTransaction](modules_signer.EkcSigner.md#signtransaction)
- [create](modules_signer.EkcSigner.md#create)

## Constructors

### constructor

• **new EkcSigner**(`ekc`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ekc` | `default` |

#### Overrides

Signer.constructor

## Properties

### ekc

• **ekc**: `default`

___

### provider

• **provider**: `Provider`

#### Overrides

Signer.provider

## Methods

### \_signTypedData

▸ **_signTypedData**(): `Promise`<`string`\>

#### Returns

`Promise`<`string`\>

#### Implementation of

TypedDataSigner.\_signTypedData

___

### connect

▸ **connect**(`provider`): `Signer`

#### Parameters

| Name | Type |
| :------ | :------ |
| `provider` | `Provider` |

#### Returns

`Signer`

#### Overrides

Signer.connect

___

### getAddress

▸ **getAddress**(): `Promise`<`string`\>

#### Returns

`Promise`<`string`\>

#### Overrides

Signer.getAddress

___

### signMessage

▸ **signMessage**(`message`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Returns

`Promise`<`string`\>

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

#### Overrides

Signer.signTransaction

___

### create

▸ `Static` **create**(`proxyUrl`): `Promise`<[`EkcSigner`](modules_signer.EkcSigner.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `proxyUrl` | `string` |

#### Returns

`Promise`<[`EkcSigner`](modules_signer.EkcSigner.md)\>
