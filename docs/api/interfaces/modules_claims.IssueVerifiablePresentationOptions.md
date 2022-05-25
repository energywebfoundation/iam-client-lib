# Interface: IssueVerifiablePresentationOptions

[modules/claims](../modules/modules_claims.md).IssueVerifiablePresentationOptions

## Table of contents

### Properties

- [credentialStatus](modules_claims.IssueVerifiablePresentationOptions.md#credentialstatus)
- [expirationTimestamp](modules_claims.IssueVerifiablePresentationOptions.md#expirationtimestamp)
- [issuerFields](modules_claims.IssueVerifiablePresentationOptions.md#issuerfields)
- [namespace](modules_claims.IssueVerifiablePresentationOptions.md#namespace)
- [subject](modules_claims.IssueVerifiablePresentationOptions.md#subject)
- [version](modules_claims.IssueVerifiablePresentationOptions.md#version)

## Properties

### credentialStatus

• `Optional` **credentialStatus**: `StatusList2021Entry`

Indicates if credential is actual of the time of verification

___

### expirationTimestamp

• `Optional` **expirationTimestamp**: `number`

Defines how long the claim is valid.

___

### issuerFields

• `Optional` **issuerFields**: { `key`: `string` ; `value`: `string` \| `number`  }[]

Issuers fields that role is requiring

___

### namespace

• **namespace**: `string`

Role claim type

___

### subject

• **subject**: `string`

DID of the subject

___

### version

• **version**: `string`

Role version
