# Class: EkcSigner

## Hierarchy

- `Signer`

  ↳ **`EkcSigner`**

## Table of contents

### Constructors

- [constructor](EkcSigner.md#constructor)

### Properties

- [ekc](EkcSigner.md#ekc)
- [provider](EkcSigner.md#provider)

### Methods

- [connect](EkcSigner.md#connect)
- [getAddress](EkcSigner.md#getaddress)
- [signMessage](EkcSigner.md#signmessage)
- [signTransaction](EkcSigner.md#signtransaction)
- [create](EkcSigner.md#create)

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

▸ `Static` **create**(`proxyUrl`): `Promise`<[`EkcSigner`](EkcSigner.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `proxyUrl` | `string` |

#### Returns

`Promise`<[`EkcSigner`](EkcSigner.md)\>
