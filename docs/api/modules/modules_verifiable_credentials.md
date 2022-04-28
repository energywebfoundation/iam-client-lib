# Module: modules/verifiable-credentials

## Table of contents

### Classes

- [VerifiableCredentialsServiceBase](../classes/modules_verifiable_credentials.VerifiableCredentialsServiceBase.md)

### Interfaces

- [CreatePresentationParams](../interfaces/modules_verifiable_credentials.CreatePresentationParams.md)
- [IssuerFields](../interfaces/modules_verifiable_credentials.IssuerFields.md)
- [ProofOptions](../interfaces/modules_verifiable_credentials.ProofOptions.md)
- [RoleCredentialSubject](../interfaces/modules_verifiable_credentials.RoleCredentialSubject.md)
- [RoleCredentialSubjectParams](../interfaces/modules_verifiable_credentials.RoleCredentialSubjectParams.md)
- [StoreVcResult](../interfaces/modules_verifiable_credentials.StoreVcResult.md)
- [VerifyVerifiableCredentialResults](../interfaces/modules_verifiable_credentials.VerifyVerifiableCredentialResults.md)
- [WebNodeQueryMessage](../interfaces/modules_verifiable_credentials.WebNodeQueryMessage.md)
- [WebNodeReply](../interfaces/modules_verifiable_credentials.WebNodeReply.md)
- [WebNodeRequestObject](../interfaces/modules_verifiable_credentials.WebNodeRequestObject.md)
- [WebNodeResponseObject](../interfaces/modules_verifiable_credentials.WebNodeResponseObject.md)
- [WebNodeStatus](../interfaces/modules_verifiable_credentials.WebNodeStatus.md)
- [WebNodeWriteMessage](../interfaces/modules_verifiable_credentials.WebNodeWriteMessage.md)

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
| `VC712Domain` | { `name`: `string` = 'domain'; `type`: `string` = 'VC712DomainData' }[] |
| `VC712DomainData` | `never`[] |
| `VC712DomainSchema` | { `name`: `string` = 'CredentialSubject'; `type`: `string` = 'VC712DomainTypedDataField[]' }[] |
| `VC712DomainTypedDataField` | { `name`: `string` = 'name'; `type`: `string` = 'string' }[] |
| `VCProof` | { `name`: `string` = '@context'; `type`: `string` = 'string' }[] |
| `VerifiableCredential` | { `name`: `string` = '@context'; `type`: `string` = 'string[]' }[] |
| `VerifiablePresentation` | { `name`: `string` = '@context'; `type`: `string` = 'string[]' }[] |

## Functions

### getVerifiableCredentialsService

▸ **getVerifiableCredentialsService**(`signerService`, `storage`, `didRegistry`): `Promise`<[`VerifiableCredentialsServiceBase`](../classes/modules_verifiable_credentials.VerifiableCredentialsServiceBase.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerService` | [`SignerService`](../classes/modules_signer.SignerService.md) |
| `storage` | `default` |
| `didRegistry` | [`DidRegistry`](../classes/modules_did_registry.DidRegistry.md) |

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
