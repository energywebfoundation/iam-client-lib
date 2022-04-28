# Class: VerifiableCredentialsServiceBase

[modules/verifiable-credentials](../modules/modules_verifiable_credentials.md).VerifiableCredentialsServiceBase

## Table of contents

### Constructors

- [constructor](modules_verifiable_credentials.VerifiableCredentialsServiceBase.md#constructor)

### Methods

- [addCredentialEndpoint](modules_verifiable_credentials.VerifiableCredentialsServiceBase.md#addcredentialendpoint)
- [createPresentation](modules_verifiable_credentials.VerifiableCredentialsServiceBase.md#createpresentation)
- [createRoleVC](modules_verifiable_credentials.VerifiableCredentialsServiceBase.md#createrolevc)
- [createVerifiablePresentation](modules_verifiable_credentials.VerifiableCredentialsServiceBase.md#createverifiablepresentation)
- [getCredentials](modules_verifiable_credentials.VerifiableCredentialsServiceBase.md#getcredentials)
- [initiateExchange](modules_verifiable_credentials.VerifiableCredentialsServiceBase.md#initiateexchange)
- [storeCredential](modules_verifiable_credentials.VerifiableCredentialsServiceBase.md#storecredential)
- [verify](modules_verifiable_credentials.VerifiableCredentialsServiceBase.md#verify)
- [create](modules_verifiable_credentials.VerifiableCredentialsServiceBase.md#create)

## Constructors

### constructor

• **new VerifiableCredentialsServiceBase**(`_signerService`, `_storage`, `_didRegistry`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_signerService` | [`SignerService`](modules_signer.SignerService.md) |
| `_storage` | `default` |
| `_didRegistry` | [`DidRegistry`](modules_did_registry.DidRegistry.md) |

## Methods

### addCredentialEndpoint

▸ **addCredentialEndpoint**(`nodeEndpoint`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodeEndpoint` | `string` |

#### Returns

`Promise`<`boolean`\>

___

### createPresentation

▸ **createPresentation**(`verifiableCredential`, `options?`): `Presentation`

#### Parameters

| Name | Type |
| :------ | :------ |
| `verifiableCredential` | `VerifiableCredential`<[`RoleCredentialSubject`](../interfaces/modules_verifiable_credentials.RoleCredentialSubject.md)\>[] |
| `options?` | [`CreatePresentationParams`](../interfaces/modules_verifiable_credentials.CreatePresentationParams.md) |

#### Returns

`Presentation`

___

### createRoleVC

▸ **createRoleVC**(`credentialParams`, `proofOptions?`): `Promise`<`VerifiableCredential`<[`RoleCredentialSubject`](../interfaces/modules_verifiable_credentials.RoleCredentialSubject.md)\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `credentialParams` | [`RoleCredentialSubjectParams`](../interfaces/modules_verifiable_credentials.RoleCredentialSubjectParams.md) |
| `proofOptions?` | [`ProofOptions`](../interfaces/modules_verifiable_credentials.ProofOptions.md) |

#### Returns

`Promise`<`VerifiableCredential`<[`RoleCredentialSubject`](../interfaces/modules_verifiable_credentials.RoleCredentialSubject.md)\>\>

___

### createVerifiablePresentation

▸ **createVerifiablePresentation**(`verifiableCredential`, `options?`): `Promise`<`VerifiablePresentation`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `verifiableCredential` | `VerifiableCredential`<[`RoleCredentialSubject`](../interfaces/modules_verifiable_credentials.RoleCredentialSubject.md)\>[] |
| `options?` | [`ProofOptions`](../interfaces/modules_verifiable_credentials.ProofOptions.md) |

#### Returns

`Promise`<`VerifiablePresentation`\>

___

### getCredentials

▸ **getCredentials**(): `Promise`<`VerifiableCredential`<`ICredentialSubject`\>[]\>

#### Returns

`Promise`<`VerifiableCredential`<`ICredentialSubject`\>[]\>

___

### initiateExchange

▸ **initiateExchange**(`__namedParameters`): `Promise`<`any`[]\>

**`description`** The type of the exchange. Only vc-api exchanges currently supported.

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `ExchangeInvitation` |

#### Returns

`Promise`<`any`[]\>

credentials query with matching verifiable presentations

___

### storeCredential

▸ **storeCredential**(`credentials`): `Promise`<[`StoreVcResult`](../interfaces/modules_verifiable_credentials.StoreVcResult.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `credentials` | `VerifiableCredential`<`ICredentialSubject`\>[] |

#### Returns

`Promise`<[`StoreVcResult`](../interfaces/modules_verifiable_credentials.StoreVcResult.md)[]\>

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
| `options?` | [`ProofOptions`](../interfaces/modules_verifiable_credentials.ProofOptions.md) |

#### Returns

`any`

___

### create

▸ `Static` **create**(`signerService`, `storage`, `didRegistry`): `Promise`<[`VerifiableCredentialsServiceBase`](modules_verifiable_credentials.VerifiableCredentialsServiceBase.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerService` | [`SignerService`](modules_signer.SignerService.md) |
| `storage` | `default` |
| `didRegistry` | [`DidRegistry`](modules_did_registry.DidRegistry.md) |

#### Returns

`Promise`<[`VerifiableCredentialsServiceBase`](modules_verifiable_credentials.VerifiableCredentialsServiceBase.md)\>
