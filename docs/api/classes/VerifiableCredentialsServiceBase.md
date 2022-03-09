# Class: VerifiableCredentialsServiceBase

## Table of contents

### Constructors

- [constructor](VerifiableCredentialsServiceBase.md#constructor)

### Methods

- [createPresentation](VerifiableCredentialsServiceBase.md#createpresentation)
- [createRoleVC](VerifiableCredentialsServiceBase.md#createrolevc)
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

▸ **createPresentation**(`verifiableCredential`, `options?`): `Presentation`

#### Parameters

| Name | Type |
| :------ | :------ |
| `verifiableCredential` | `VerifiableCredential`<[`RoleCredentialSubject`](../interfaces/RoleCredentialSubject.md)\>[] |
| `options?` | [`CreatePresentationParams`](../interfaces/CreatePresentationParams.md) |

#### Returns

`Presentation`

___

### createRoleVC

▸ **createRoleVC**(`credentialParams`, `proofOptions?`): `Promise`<`VerifiableCredential`<[`RoleCredentialSubject`](../interfaces/RoleCredentialSubject.md)\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `credentialParams` | [`RoleCredentialSubjectParams`](../interfaces/RoleCredentialSubjectParams.md) |
| `proofOptions?` | [`ProofOptions`](../interfaces/ProofOptions.md) |

#### Returns

`Promise`<`VerifiableCredential`<[`RoleCredentialSubject`](../interfaces/RoleCredentialSubject.md)\>\>

___

### createVerifiablePresentation

▸ **createVerifiablePresentation**(`verifiableCredential`, `options?`): `Promise`<`VerifiablePresentation`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `verifiableCredential` | `VerifiableCredential`<[`RoleCredentialSubject`](../interfaces/RoleCredentialSubject.md)\>[] |
| `options?` | [`ProofOptions`](../interfaces/ProofOptions.md) |

#### Returns

`Promise`<`VerifiablePresentation`\>

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
| `vp` | `VerifiablePresentation` \| `VerifiableCredential`<`T`\> |
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
