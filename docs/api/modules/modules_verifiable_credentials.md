# Module: modules/verifiable-credentials

## Table of contents

### Classes

- [VerifiableCredentialsServiceBase](../classes/modules_verifiable_credentials.VerifiableCredentialsServiceBase.md)

### Interfaces

- [CreatePresentationParams](../interfaces/modules_verifiable_credentials.CreatePresentationParams.md)
- [InitiateExchangeResults](../interfaces/modules_verifiable_credentials.InitiateExchangeResults.md)
- [IssuerFields](../interfaces/modules_verifiable_credentials.IssuerFields.md)
- [ProofOptions](../interfaces/modules_verifiable_credentials.ProofOptions.md)
- [RoleCredentialSubject](../interfaces/modules_verifiable_credentials.RoleCredentialSubject.md)
- [RoleCredentialSubjectParams](../interfaces/modules_verifiable_credentials.RoleCredentialSubjectParams.md)
- [VerifyVerifiableCredentialResults](../interfaces/modules_verifiable_credentials.VerifyVerifiableCredentialResults.md)

### Variables

- [verifiableCredentialEIP712Types](modules_verifiable_credentials.md#verifiablecredentialeip712types)
- [verifiablePresentationEIP712Types](modules_verifiable_credentials.md#verifiablepresentationeip712types)
- [verifiablePresentationWithCredentialEIP712Types](modules_verifiable_credentials.md#verifiablepresentationwithcredentialeip712types)

### Functions

- [getVerifiableCredentialsService](modules_verifiable_credentials.md#getverifiablecredentialsservice)
- [isRoleCredential](modules_verifiable_credentials.md#isrolecredential)

## Variables

### verifiableCredentialEIP712Types

• `Const` **verifiableCredentialEIP712Types**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `CredentialSubject` | { `name`: `string` = 'id'; `type`: `string` = 'string' }[] |
| `EIP712Domain` | `never`[] |
| `EWFRole` | { `name`: `string` = 'namespace'; `type`: `string` = 'string' }[] |
| `IssuerFields` | { `name`: `string` = 'key'; `type`: `string` = 'string' }[] |
| `Proof` | { `name`: `string` = '@context'; `type`: `string` = 'string' }[] |
| `StatusList2021Entry` | { `name`: `string` = 'id'; `type`: `string` = 'string' }[] |
| `VerifiableCredential` | { `name`: `string` = '@context'; `type`: `string` = 'string[]' }[] |

___

### verifiablePresentationEIP712Types

• `Const` **verifiablePresentationEIP712Types**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `EIP712Domain` | `never`[] |
| `Proof` | { `name`: `string` = '@context'; `type`: `string` = 'string' }[] |
| `VerifiablePresentation` | { `name`: `string` = '@context'; `type`: `string` = 'string[]' }[] |

___

### verifiablePresentationWithCredentialEIP712Types

• `Const` **verifiablePresentationWithCredentialEIP712Types**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `CredentialSubject` | { `name`: `string` = 'id'; `type`: `string` = 'string' }[] |
| `EIP712Domain` | `never`[] |
| `EWFRole` | { `name`: `string` = 'namespace'; `type`: `string` = 'string' }[] |
| `IssuerFields` | { `name`: `string` = 'key'; `type`: `string` = 'string' }[] |
| `Proof` | { `name`: `string` = '@context'; `type`: `string` = 'string' }[] |
| `StatusList2021Entry` | { `name`: `string` = 'id'; `type`: `string` = 'string' }[] |
| `VC712Domain` | { `name`: `string` = 'domain'; `type`: `string` = 'VC712DomainData' }[] |
| `VC712DomainData` | `never`[] |
| `VC712DomainSchema` | { `name`: `string` = 'StatusList2021Entry'; `type`: `string` = 'VC712DomainTypedDataField[]' }[] |
| `VC712DomainTypedDataField` | { `name`: `string` = 'name'; `type`: `string` = 'string' }[] |
| `VCProof` | { `name`: `string` = '@context'; `type`: `string` = 'string' }[] |
| `VerifiableCredential` | { `name`: `string` = '@context'; `type`: `string` = 'string[]' }[] |
| `VerifiablePresentation` | { `name`: `string` = '@context'; `type`: `string` = 'string[]' }[] |

## Functions

### getVerifiableCredentialsService

▸ **getVerifiableCredentialsService**(`signerService`, `cacheClient`): `Promise`<[`VerifiableCredentialsServiceBase`](../classes/modules_verifiable_credentials.VerifiableCredentialsServiceBase.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerService` | [`SignerService`](../classes/modules_signer.SignerService.md) |
| `cacheClient` | [`CacheClient`](../classes/modules_cache_client.CacheClient.md) |

#### Returns

`Promise`<[`VerifiableCredentialsServiceBase`](../classes/modules_verifiable_credentials.VerifiableCredentialsServiceBase.md)\>

___

### isRoleCredential

▸ **isRoleCredential**(`credential`): credential is VerifiableCredential<RoleCredentialSubject\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `credential` | `VerifiableCredential`<`ICredentialSubject`\> |

#### Returns

credential is VerifiableCredential<RoleCredentialSubject\>
