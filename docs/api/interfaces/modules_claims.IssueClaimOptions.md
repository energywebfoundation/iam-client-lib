# Interface: IssueClaimOptions

[modules/claims](../modules/modules_claims.md).IssueClaimOptions

## Table of contents

### Properties

- [claim](modules_claims.IssueClaimOptions.md#claim)
- [credentialStatus](modules_claims.IssueClaimOptions.md#credentialstatus)
- [expirationTimestamp](modules_claims.IssueClaimOptions.md#expirationtimestamp)
- [registrationTypes](modules_claims.IssueClaimOptions.md#registrationtypes)
- [subject](modules_claims.IssueClaimOptions.md#subject)

## Properties

### claim

• **claim**: `Object`

Claim params

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `claimType` | `string` | Role namespace |
| `claimTypeVersion` | `number` | Version of the role |
| `issuerFields?` | { `key`: `string` ; `value`: `string` \| `number`  }[] | Issuers fields that role is requiring |

___

### credentialStatus

• `Optional` **credentialStatus**: `StatusList2021Entry`

___

### expirationTimestamp

• `Optional` **expirationTimestamp**: `number`

Defines how long the claim is valid.

___

### registrationTypes

• `Optional` **registrationTypes**: [`RegistrationTypes`](../enums/modules_claims.RegistrationTypes.md)[]

Registration types

___

### subject

• **subject**: `string`

DID of the claim subject
