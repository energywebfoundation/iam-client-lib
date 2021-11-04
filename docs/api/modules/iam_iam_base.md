# Module: iam/iam-base

## Table of contents

### Classes

- [IAMBase](../classes/iam_iam_base.IAMBase.md)

### Type aliases

- [ConnectionOptions](iam_iam_base.md#connectionoptions)
- [EncodedCall](iam_iam_base.md#encodedcall)
- [Transaction](iam_iam_base.md#transaction)

## Type aliases

### ConnectionOptions

Ƭ **ConnectionOptions**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `bridgeUrl?` | `string` | - |
| `ewKeyManagerUrl?` | `string` | - |
| `infuraId?` | `string` | - |
| `ipfsUrl?` | `string` | - |
| `privateKey?` | `string` | - |
| `proxyUrl?` | `string` | - |
| `rpcUrl?` | `string` | only required in node env |

___

### EncodedCall

Ƭ **EncodedCall**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `data` | `string` |
| `to` | `string` |
| `value?` | `string` |

___

### Transaction

Ƭ **Transaction**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `calls` | [`EncodedCall`](iam_iam_base.md#encodedcall)[] |
| `from` | `string` |
