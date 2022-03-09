# Interface: VerifiableCredential<T\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `ICredentialSubject` |

## Hierarchy

- [`Credential`](Credential.md)<`T`\>

  ↳ **`VerifiableCredential`**

## Table of contents

### Properties

- [credentialSubject](VerifiableCredential.md#credentialsubject)
- [proof](VerifiableCredential.md#proof)

## Properties

### credentialSubject

• **credentialSubject**: `T`

#### Inherited from

[Credential](Credential.md).[credentialSubject](Credential.md#credentialsubject)

___

### proof

• **proof**: `Object`

#### Index signature

▪ [x: `string`]: `string` \| `string`[] \| `any`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `@context` | `string`[] |
| `created` | `string` |
| `eip712Domain` | { `domain`: `Record`<`never`, `never`\> ; `messageSchema`: { `CredentialSubject`: `TypedDataField`[] ; `EIP712Domain`: `TypedDataField`[] ; `Proof`: `TypedDataField`[] ; `VerifiableCredential`: `TypedDataField`[]  } ; `primaryType`: `string`  } |
| `eip712Domain.domain` | `Record`<`never`, `never`\> |
| `eip712Domain.messageSchema` | { `CredentialSubject`: `TypedDataField`[] ; `EIP712Domain`: `TypedDataField`[] ; `Proof`: `TypedDataField`[] ; `VerifiableCredential`: `TypedDataField`[]  } |
| `eip712Domain.messageSchema.CredentialSubject` | `TypedDataField`[] |
| `eip712Domain.messageSchema.EIP712Domain` | `TypedDataField`[] |
| `eip712Domain.messageSchema.Proof` | `TypedDataField`[] |
| `eip712Domain.messageSchema.VerifiableCredential` | `TypedDataField`[] |
| `eip712Domain.primaryType` | `string` |
| `proofPurpose` | `string` |
| `proofValue` | `string` |
| `type` | `string` |
| `verificationMethod` | `string` |
