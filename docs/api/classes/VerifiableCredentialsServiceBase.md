# Class: VerifiableCredentialsServiceBase

## Table of contents

### Constructors

- [constructor](VerifiableCredentialsServiceBase.md#constructor)

### Methods

- [createPresentation](VerifiableCredentialsServiceBase.md#createpresentation)
- [createVerifiableCredential](VerifiableCredentialsServiceBase.md#createverifiablecredential)
- [createVerifiablePresentation](VerifiableCredentialsServiceBase.md#createverifiablepresentation)
- [verify](VerifiableCredentialsServiceBase.md#verify)
- [create](VerifiableCredentialsServiceBase.md#create)

## Constructors

### constructor

• **new VerifiableCredentialsServiceBase**(`_signerService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_signerService` | [`SignerService`](SignerService.md) |

## Methods

### createPresentation

▸ **createPresentation**(`verifiableCredential`, `options?`): [`Presentation`](../interfaces/Presentation.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `verifiableCredential` | [`VerifiableCredential`](../interfaces/VerifiableCredential.md)<[`EWFCredentialSubject`](../interfaces/EWFCredentialSubject.md)\>[] |
| `options?` | [`CreatePresentationParams`](../interfaces/CreatePresentationParams.md) |

#### Returns

[`Presentation`](../interfaces/Presentation.md)

___

### createVerifiableCredential

▸ **createVerifiableCredential**(`credentialOptions`, `options?`): `Promise`<[`VerifiableCredential`](../interfaces/VerifiableCredential.md)<[`EWFCredentialSubject`](../interfaces/EWFCredentialSubject.md)\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `credentialOptions` | [`CreateCredentialParams`](../interfaces/CreateCredentialParams.md) |
| `options?` | [`ProofOptions`](../interfaces/ProofOptions.md) |

#### Returns

`Promise`<[`VerifiableCredential`](../interfaces/VerifiableCredential.md)<[`EWFCredentialSubject`](../interfaces/EWFCredentialSubject.md)\>\>

___

### createVerifiablePresentation

▸ **createVerifiablePresentation**(`verifiableCredential`, `options?`): `Promise`<[`VerifiablePresentation`](../interfaces/VerifiablePresentation.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `verifiableCredential` | [`VerifiableCredential`](../interfaces/VerifiableCredential.md)<[`EWFCredentialSubject`](../interfaces/EWFCredentialSubject.md)\>[] |
| `options?` | [`ProofOptions`](../interfaces/ProofOptions.md) |

#### Returns

`Promise`<[`VerifiablePresentation`](../interfaces/VerifiablePresentation.md)\>

___

### verify

▸ **verify**<`T`\>(`vp`, `options?`): `any`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `ICredentialSubject` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `vp` | [`VerifiablePresentation`](../interfaces/VerifiablePresentation.md) \| [`VerifiableCredential`](../interfaces/VerifiableCredential.md)<`T`\> |
| `options?` | [`ProofOptions`](../interfaces/ProofOptions.md) |

#### Returns

`any`

___

### create

▸ `Static` **create**(`signerService`): `Promise`<[`VerifiableCredentialsServiceBase`](VerifiableCredentialsServiceBase.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerService` | [`SignerService`](SignerService.md) |

#### Returns

`Promise`<[`VerifiableCredentialsServiceBase`](VerifiableCredentialsServiceBase.md)\>
