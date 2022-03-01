# Interface: SignedVerifiableCredential<T\>

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- [`VerifiableCredential`](VerifiableCredential.md)<`T`\>

  ↳ **`SignedVerifiableCredential`**

## Table of contents

### Properties

- [@context](SignedVerifiableCredential.md#@context)
- [credentialSubject](SignedVerifiableCredential.md#credentialsubject)
- [id](SignedVerifiableCredential.md#id)
- [issuer](SignedVerifiableCredential.md#issuer)
- [proof](SignedVerifiableCredential.md#proof)
- [type](SignedVerifiableCredential.md#type)

## Properties

### @context

• **@context**: `string` \| `string`[]

#### Inherited from

[VerifiableCredential](VerifiableCredential.md).[@context](VerifiableCredential.md#@context)

___

### credentialSubject

• **credentialSubject**: `T`

#### Inherited from

[VerifiableCredential](VerifiableCredential.md).[credentialSubject](VerifiableCredential.md#credentialsubject)

___

### id

• `Optional` **id**: `string`

#### Inherited from

[VerifiableCredential](VerifiableCredential.md).[id](VerifiableCredential.md#id)

___

### issuer

• **issuer**: `string`

#### Inherited from

[VerifiableCredential](VerifiableCredential.md).[issuer](VerifiableCredential.md#issuer)

___

### proof

• **proof**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `@context` | `string` \| `string`[] |
| `created` | `string` |
| `eip712Domain` | { `domain`: `TypedDataDomain` ; `messageSchema`: { `CredentialSubject`: `TypedDataField`[] ; `EIP712Domain`: `TypedDataField`[] ; `Proof`: `TypedDataField`[] ; `VerifiableCredential`: `TypedDataField`[]  } ; `primaryType`: `string`  } |
| `eip712Domain.domain` | `TypedDataDomain` |
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

___

### type

• **type**: `string`[]

#### Inherited from

[VerifiableCredential](VerifiableCredential.md).[type](VerifiableCredential.md#type)
