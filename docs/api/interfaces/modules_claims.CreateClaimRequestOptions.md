# Interface: CreateClaimRequestOptions

[modules/claims](../modules/modules_claims.md).CreateClaimRequestOptions

## Table of contents

### Properties

- [claim](modules_claims.CreateClaimRequestOptions.md#claim)
- [registrationTypes](modules_claims.CreateClaimRequestOptions.md#registrationtypes)
- [subject](modules_claims.CreateClaimRequestOptions.md#subject)

## Properties

### claim

• **claim**: `Object`

Claim request params

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `claimType` | `string` | Role namespace |
| `claimTypeVersion` | `number` | Version of the role |
| `requestorFields?` | { `key`: `string` ; `value`: `string` \| `number`  }[] | Requestor fields that role is requiring |

___

### registrationTypes

• `Optional` **registrationTypes**: [`RegistrationTypes`](../enums/modules_claims.RegistrationTypes.md)[]

Indicates what type of claim registration you are requesting: on-chain and/or off-chain

___

### subject

• `Optional` **subject**: `string`

DID of the subject
