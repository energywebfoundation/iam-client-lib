# Class: VerifiableCredentialsServiceBase

## Table of contents

### Constructors

- [constructor](VerifiableCredentialsServiceBase.md#constructor)

### Properties

- [completeIssueCredential](VerifiableCredentialsServiceBase.md#completeissuecredential)
- [prepareIssueCredential](VerifiableCredentialsServiceBase.md#prepareissuecredential)
- [verifyCredential](VerifiableCredentialsServiceBase.md#verifycredential)

### Methods

- [signVerifiableCredential](VerifiableCredentialsServiceBase.md#signverifiablecredential)
- [verifyVerifiableCredential](VerifiableCredentialsServiceBase.md#verifyverifiablecredential)
- [create](VerifiableCredentialsServiceBase.md#create)

## Constructors

### constructor

• **new VerifiableCredentialsServiceBase**(`_signerService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_signerService` | [`SignerService`](SignerService.md) |

## Properties

### completeIssueCredential

• `Abstract` **completeIssueCredential**: (`credential`: `string`, `preparation`: `string`, `signature`: `string`) => `Promise`<`string`\>

#### Type declaration

▸ (`credential`, `preparation`, `signature`): `Promise`<`string`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `credential` | `string` |
| `preparation` | `string` |
| `signature` | `string` |

##### Returns

`Promise`<`string`\>

___

### prepareIssueCredential

• `Abstract` **prepareIssueCredential**: (`credential`: `string`, `linked_data_proof_options`: `string`, `public_key`: `string`) => `Promise`<`string`\>

#### Type declaration

▸ (`credential`, `linked_data_proof_options`, `public_key`): `Promise`<`string`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `credential` | `string` |
| `linked_data_proof_options` | `string` |
| `public_key` | `string` |

##### Returns

`Promise`<`string`\>

___

### verifyCredential

• `Abstract` **verifyCredential**: (`vc`: `string`, `proof_options`: `string`) => `Promise`<`string`\>

#### Type declaration

▸ (`vc`, `proof_options`): `Promise`<`string`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `vc` | `string` |
| `proof_options` | `string` |

##### Returns

`Promise`<`string`\>

## Methods

### signVerifiableCredential

▸ **signVerifiableCredential**<`T`\>(`credential`, `options?`): `Promise`<[`SignedVerifiableCredential`](../interfaces/SignedVerifiableCredential.md)<`T`\>\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `credential` | [`VerifiableCredential`](../interfaces/VerifiableCredential.md)<`T`\> |
| `options?` | [`SignVerifiableCredentialOptions`](../interfaces/SignVerifiableCredentialOptions.md) |

#### Returns

`Promise`<[`SignedVerifiableCredential`](../interfaces/SignedVerifiableCredential.md)<`T`\>\>

___

### verifyVerifiableCredential

▸ **verifyVerifiableCredential**<`T`\>(`vc`, `options?`): `Promise`<`boolean`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `vc` | [`SignedVerifiableCredential`](../interfaces/SignedVerifiableCredential.md)<`T`\> |
| `options?` | [`VerifyVerifiableCredentialOptions`](../interfaces/VerifyVerifiableCredentialOptions.md) |

#### Returns

`Promise`<`boolean`\>

___

### create

▸ `Static` **create**(`signerService`): `Promise`<[`VerifiableCredentialsServiceBase`](VerifiableCredentialsServiceBase.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerService` | [`SignerService`](SignerService.md) |

#### Returns

`Promise`<[`VerifiableCredentialsServiceBase`](VerifiableCredentialsServiceBase.md)\>
