# Class: EkcSigner

[modules/signer/ekcSigner](../modules/modules_signer_ekcSigner.md).EkcSigner

## Hierarchy

- `Signer`

  ↳ **`EkcSigner`**

## Table of contents

### Constructors

- [constructor](modules_signer_ekcSigner.EkcSigner.md#constructor)

### Properties

- [ekc](modules_signer_ekcSigner.EkcSigner.md#ekc)
- [provider](modules_signer_ekcSigner.EkcSigner.md#provider)

### Methods

- [connect](modules_signer_ekcSigner.EkcSigner.md#connect)
- [getAddress](modules_signer_ekcSigner.EkcSigner.md#getaddress)
- [signMessage](modules_signer_ekcSigner.EkcSigner.md#signmessage)
- [signTransaction](modules_signer_ekcSigner.EkcSigner.md#signtransaction)
- [create](modules_signer_ekcSigner.EkcSigner.md#create)

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

▸ `Static` **create**(`proxyUrl`): `Promise`<[`EkcSigner`](modules_signer_ekcSigner.EkcSigner.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `proxyUrl` | `string` |

#### Returns

`Promise`<[`EkcSigner`](modules_signer_ekcSigner.EkcSigner.md)\>
