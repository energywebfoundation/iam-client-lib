# Module: modules/claims

## Table of contents

### Enumerations

- [ClaimEventType](../enums/modules_claims.ClaimEventType.md)
- [RegistrationTypes](../enums/modules_claims.RegistrationTypes.md)

### Classes

- [ClaimsService](../classes/modules_claims.ClaimsService.md)

### Interfaces

- [Claim](../interfaces/modules_claims.Claim.md)
- [IClaimIssuance](../interfaces/modules_claims.IClaimIssuance.md)
- [IClaimRejection](../interfaces/modules_claims.IClaimRejection.md)
- [IClaimRequest](../interfaces/modules_claims.IClaimRequest.md)

### Type aliases

- [IssueClaim](modules_claims.md#issueclaim)
- [RejectClaim](modules_claims.md#rejectclaim)
- [RequestClaim](modules_claims.md#requestclaim)

### Variables

- [agreement\_type\_hash](modules_claims.md#agreement_type_hash)
- [defaultClaimExpiry](modules_claims.md#defaultclaimexpiry)
- [erc712\_type\_hash](modules_claims.md#erc712_type_hash)
- [proof\_type\_hash](modules_claims.md#proof_type_hash)
- [typedMsgPrefix](modules_claims.md#typedmsgprefix)

### Functions

- [readyToBeRegisteredOnchain](modules_claims.md#readytoberegisteredonchain)

## Type aliases

### IssueClaim

Ƭ **IssueClaim**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `issuer` | `string` |
| `message` | [`IClaimIssuance`](../interfaces/modules_claims.IClaimIssuance.md) |

___

### RejectClaim

Ƭ **RejectClaim**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `issuer` | `string` |
| `message` | [`IClaimRejection`](../interfaces/modules_claims.IClaimRejection.md) |

___

### RequestClaim

Ƭ **RequestClaim**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `message` | [`IClaimRequest`](../interfaces/modules_claims.IClaimRequest.md) |
| `requester` | `string` |

## Variables

### agreement\_type\_hash

• `Const` **agreement\_type\_hash**: `string`

___

### defaultClaimExpiry

• `Const` **defaultClaimExpiry**: `number`

___

### erc712\_type\_hash

• `Const` **erc712\_type\_hash**: `string`

___

### proof\_type\_hash

• `Const` **proof\_type\_hash**: `string`

___

### typedMsgPrefix

• `Const` **typedMsgPrefix**: ``"1901"``

## Functions

### readyToBeRegisteredOnchain

▸ **readyToBeRegisteredOnchain**(`claim`): claim is Required<Pick<Claim, "claimTypeVersion" \| "claimType" \| "subject" \| "onChainProof" \| "acceptedBy" \| "subjectAgreement"\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `claim` | `Record`<`string`, `unknown`\> |

#### Returns

claim is Required<Pick<Claim, "claimTypeVersion" \| "claimType" \| "subject" \| "onChainProof" \| "acceptedBy" \| "subjectAgreement"\>\>
