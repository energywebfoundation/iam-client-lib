# Class: VerifiableCredentialsServiceBase

## Table of contents

### Constructors

- [constructor](VerifiableCredentialsServiceBase.md#constructor)

### Methods

- [createPresentation](VerifiableCredentialsServiceBase.md#createpresentation)
- [createRoleVC](VerifiableCredentialsServiceBase.md#createrolevc)
- [createVerifiablePresentation](VerifiableCredentialsServiceBase.md#createverifiablepresentation)
- [getCredentials](VerifiableCredentialsServiceBase.md#getcredentials)
- [initiateExchange](VerifiableCredentialsServiceBase.md#initiateexchange)
- [storeCredential](VerifiableCredentialsServiceBase.md#storecredential)
- [verify](VerifiableCredentialsServiceBase.md#verify)
- [create](VerifiableCredentialsServiceBase.md#create)

## Constructors

### constructor

• **new VerifiableCredentialsServiceBase**(`_signerService`, `_storage`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_signerService` | [`SignerService`](SignerService.md) |
| `_storage` | `default` |

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

### getCredentials

▸ **getCredentials**(): `Promise`<`VerifiableCredential`<`ICredentialSubject`\>[]\>

#### Returns

`Promise`<`VerifiableCredential`<`ICredentialSubject`\>[]\>

___

### initiateExchange

▸ **initiateExchange**(`__namedParameters`): `Promise`<{ `vp`: `VerifiablePresentation` ; `vpRequest`: `VpRequest`  }\>

**`description`** The type of the exchange. Only vc-api exchanges currently supported.

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `ExchangeInvitation` |

#### Returns

`Promise`<{ `vp`: `VerifiablePresentation` ; `vpRequest`: `VpRequest`  }\>

credentials query with matching verifiable presentations

___

### storeCredential

▸ **storeCredential**(`credentials`): `Promise`<[`StoreVcResult`](../interfaces/StoreVcResult.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `credentials` | `VerifiableCredential`<`ICredentialSubject`\>[] |

#### Returns

`Promise`<[`StoreVcResult`](../interfaces/StoreVcResult.md)[]\>

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

▸ `Static` **create**(`signerService`, `storage`): `Promise`<[`VerifiableCredentialsServiceBase`](VerifiableCredentialsServiceBase.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerService` | [`SignerService`](SignerService.md) |
| `storage` | `default` |

#### Returns

`Promise`<[`VerifiableCredentialsServiceBase`](VerifiableCredentialsServiceBase.md)\>
