# Class: VerifiableCredentialsServiceBase

[modules/verifiable-credentials](../modules/modules_verifiable_credentials.md).VerifiableCredentialsServiceBase

## Table of contents

### Constructors

- [constructor](modules_verifiable_credentials.VerifiableCredentialsServiceBase.md#constructor)

### Methods

- [continueExchange](modules_verifiable_credentials.VerifiableCredentialsServiceBase.md#continueexchange)
- [createPresentation](modules_verifiable_credentials.VerifiableCredentialsServiceBase.md#createpresentation)
- [createRoleVC](modules_verifiable_credentials.VerifiableCredentialsServiceBase.md#createrolevc)
- [createVerifiablePresentation](modules_verifiable_credentials.VerifiableCredentialsServiceBase.md#createverifiablepresentation)
- [initiateExchange](modules_verifiable_credentials.VerifiableCredentialsServiceBase.md#initiateexchange)
- [verify](modules_verifiable_credentials.VerifiableCredentialsServiceBase.md#verify)
- [create](modules_verifiable_credentials.VerifiableCredentialsServiceBase.md#create)

## Constructors

### constructor

• **new VerifiableCredentialsServiceBase**(`_signerService`, `_storage`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_signerService` | [`SignerService`](modules_signer.SignerService.md) |
| `_storage` | `default` |

## Methods

### continueExchange

▸ **continueExchange**(`__namedParameters`): `Promise`<`undefined` \| `VpRequest` \| `VerifiablePresentation`\>

**`description`** Sends credentials requested by issuer and returns either issued credentials or next credentials request

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `ContinueExchangeCredentials`<[`RoleCredentialSubject`](../interfaces/modules_verifiable_credentials.RoleCredentialSubject.md)\> |

#### Returns

`Promise`<`undefined` \| `VpRequest` \| `VerifiablePresentation`\>

issued credentials or request of additional credentials

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

### initiateExchange

▸ **initiateExchange**(`__namedParameters`): `Promise`<`ContinueExchangeSelections`\>

**`description`** The type of the exchange. Only vc-api exchanges currently supported.

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `ExchangeInvitation` |

#### Returns

`Promise`<`ContinueExchangeSelections`\>

credentials query with matching verifiable presentations

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

▸ `Static` **create**(`signerService`, `storage`): `Promise`<[`VerifiableCredentialsServiceBase`](modules_verifiable_credentials.VerifiableCredentialsServiceBase.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerService` | [`SignerService`](modules_signer.SignerService.md) |
| `storage` | `default` |

#### Returns

`Promise`<[`VerifiableCredentialsServiceBase`](modules_verifiable_credentials.VerifiableCredentialsServiceBase.md)\>
