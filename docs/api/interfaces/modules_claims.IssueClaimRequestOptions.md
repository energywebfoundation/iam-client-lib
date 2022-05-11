# Interface: IssueClaimRequestOptions

[modules/claims](../modules/modules_claims.md).IssueClaimRequestOptions

## Table of contents

### Properties

- [id](modules_claims.IssueClaimRequestOptions.md#id)
- [issuerFields](modules_claims.IssueClaimRequestOptions.md#issuerfields)
- [publishOnChain](modules_claims.IssueClaimRequestOptions.md#publishonchain)
- [registrationTypes](modules_claims.IssueClaimRequestOptions.md#registrationtypes)
- [requester](modules_claims.IssueClaimRequestOptions.md#requester)
- [subjectAgreement](modules_claims.IssueClaimRequestOptions.md#subjectagreement)
- [token](modules_claims.IssueClaimRequestOptions.md#token)

## Properties

### id

• **id**: `string`

Claim id

___

### issuerFields

• `Optional` **issuerFields**: { `key`: `string` ; `value`: `string` \| `number`  }[]

Issuer fields that role is requiring

___

### publishOnChain

• `Optional` **publishOnChain**: `boolean`

Indicates whether to publish role on-chain or not (default: false)

___

### registrationTypes

• **registrationTypes**: [`RegistrationTypes`](../enums/modules_claims.RegistrationTypes.md)[]

Registration types

___

### requester

• **requester**: `string`

DID of the claim requestor

___

### subjectAgreement

• `Optional` **subjectAgreement**: `string`

Subject agreement signature

___

### token

• **token**: `string`

JWT token generated by requestor during claim request