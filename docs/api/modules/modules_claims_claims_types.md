# Module: modules/claims/claims.types

## Table of contents

### Enumerations

- [ClaimEventType](../enums/modules_claims_claims_types.ClaimEventType.md)
- [RegistrationTypes](../enums/modules_claims_claims_types.RegistrationTypes.md)

### Interfaces

- [Claim](../interfaces/modules_claims_claims_types.Claim.md)
- [IClaimIssuance](../interfaces/modules_claims_claims_types.IClaimIssuance.md)
- [IClaimRejection](../interfaces/modules_claims_claims_types.IClaimRejection.md)
- [IClaimRequest](../interfaces/modules_claims_claims_types.IClaimRequest.md)

### Type aliases

- [IssueClaim](modules_claims_claims_types.md#issueclaim)
- [RejectClaim](modules_claims_claims_types.md#rejectclaim)
- [RequestClaim](modules_claims_claims_types.md#requestclaim)

### Variables

- [agreement\_type\_hash](modules_claims_claims_types.md#agreement_type_hash)
- [defaultClaimExpiry](modules_claims_claims_types.md#defaultclaimexpiry)
- [erc712\_type\_hash](modules_claims_claims_types.md#erc712_type_hash)
- [proof\_type\_hash](modules_claims_claims_types.md#proof_type_hash)
- [typedMsgPrefix](modules_claims_claims_types.md#typedmsgprefix)

## Type aliases

### IssueClaim

Ƭ **IssueClaim**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `issuer` | `string` |
| `message` | [`IClaimIssuance`](../interfaces/modules_claims_claims_types.IClaimIssuance.md) |

___

### RejectClaim

Ƭ **RejectClaim**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `issuer` | `string` |
| `message` | [`IClaimRejection`](../interfaces/modules_claims_claims_types.IClaimRejection.md) |

___

### RequestClaim

Ƭ **RequestClaim**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `message` | [`IClaimRequest`](../interfaces/modules_claims_claims_types.IClaimRequest.md) |
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
