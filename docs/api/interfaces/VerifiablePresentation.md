# Interface: VerifiablePresentation

## Hierarchy

- [`Presentation`](Presentation.md)

  ↳ **`VerifiablePresentation`**

## Table of contents

### Properties

- [id](VerifiablePresentation.md#id)
- [proof](VerifiablePresentation.md#proof)
- [verifiableCredential](VerifiablePresentation.md#verifiablecredential)

## Properties

### id

• **id**: `string`

#### Inherited from

[Presentation](Presentation.md).[id](Presentation.md#id)

___

### proof

• **proof**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `@context` | `string` \| `string`[] |
| `created` | `string` |
| `eip712Domain` | { `domain`: `Record`<`never`, `never`\> ; `messageSchema`: { `EIP712Domain`: `TypedDataField`[] ; `Proof`: `TypedDataField`[] ; `VerifiableCredential?`: `TypedDataField`[] ; `VerifiablePresentation`: `TypedDataField`[]  } ; `primaryType`: `string`  } |
| `eip712Domain.domain` | `Record`<`never`, `never`\> |
| `eip712Domain.messageSchema` | { `EIP712Domain`: `TypedDataField`[] ; `Proof`: `TypedDataField`[] ; `VerifiableCredential?`: `TypedDataField`[] ; `VerifiablePresentation`: `TypedDataField`[]  } |
| `eip712Domain.messageSchema.EIP712Domain` | `TypedDataField`[] |
| `eip712Domain.messageSchema.Proof` | `TypedDataField`[] |
| `eip712Domain.messageSchema.VerifiableCredential?` | `TypedDataField`[] |
| `eip712Domain.messageSchema.VerifiablePresentation` | `TypedDataField`[] |
| `eip712Domain.primaryType` | `string` |
| `proofPurpose` | `string` |
| `proofValue` | `string` |
| `type` | `string` |
| `verificationMethod` | `string` |

___

### verifiableCredential

• **verifiableCredential**: [`VerifiableCredential`](VerifiableCredential.md)<`ICredentialSubject`\>[]

#### Inherited from

[Presentation](Presentation.md).[verifiableCredential](Presentation.md#verifiablecredential)
