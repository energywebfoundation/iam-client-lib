# Module: modules/claims

## Table of contents

### Enumerations

- [ClaimEventType](../enums/modules_claims.ClaimEventType.md)
- [RegistrationTypes](../enums/modules_claims.RegistrationTypes.md)

### Classes

- [CachedIssuerResolver](../classes/modules_claims.CachedIssuerResolver.md)
- [ClaimsService](../classes/modules_claims.ClaimsService.md)

### Interfaces

- [ApproveRolePublishingOptions](../interfaces/modules_claims.ApproveRolePublishingOptions.md)
- [Claim](../interfaces/modules_claims.Claim.md)
- [ClaimRevocationDetailsOptions](../interfaces/modules_claims.ClaimRevocationDetailsOptions.md)
- [ClaimRevocationDetailsResult](../interfaces/modules_claims.ClaimRevocationDetailsResult.md)
- [CreateClaimRequestOptions](../interfaces/modules_claims.CreateClaimRequestOptions.md)
- [CreateSelfSignedClaimOptions](../interfaces/modules_claims.CreateSelfSignedClaimOptions.md)
- [CredentialVerificationResult](../interfaces/modules_claims.CredentialVerificationResult.md)
- [DeleteClaimOptions](../interfaces/modules_claims.DeleteClaimOptions.md)
- [GetClaimsByIssuerOptions](../interfaces/modules_claims.GetClaimsByIssuerOptions.md)
- [GetClaimsByRequesterOptions](../interfaces/modules_claims.GetClaimsByRequesterOptions.md)
- [GetClaimsByRevokerOptions](../interfaces/modules_claims.GetClaimsByRevokerOptions.md)
- [GetClaimsBySubjectOptions](../interfaces/modules_claims.GetClaimsBySubjectOptions.md)
- [GetRevocationClaimDetailsOptions](../interfaces/modules_claims.GetRevocationClaimDetailsOptions.md)
- [GetRevocationClaimDetailsResult](../interfaces/modules_claims.GetRevocationClaimDetailsResult.md)
- [GetUserClaimsOptions](../interfaces/modules_claims.GetUserClaimsOptions.md)
- [IClaimIssuance](../interfaces/modules_claims.IClaimIssuance.md)
- [IClaimRejection](../interfaces/modules_claims.IClaimRejection.md)
- [IClaimRequest](../interfaces/modules_claims.IClaimRequest.md)
- [IsClaimRevokedOptions](../interfaces/modules_claims.IsClaimRevokedOptions.md)
- [IssueClaimOptions](../interfaces/modules_claims.IssueClaimOptions.md)
- [IssueClaimRequestOptions](../interfaces/modules_claims.IssueClaimRequestOptions.md)
- [IssueVerifiablePresentationOptions](../interfaces/modules_claims.IssueVerifiablePresentationOptions.md)
- [PublishPublicClaimOptions](../interfaces/modules_claims.PublishPublicClaimOptions.md)
- [RegisterOnchainOptions](../interfaces/modules_claims.RegisterOnchainOptions.md)
- [RejectClaimRequestOptions](../interfaces/modules_claims.RejectClaimRequestOptions.md)
- [RevokeClaimOptions](../interfaces/modules_claims.RevokeClaimOptions.md)
- [RevokeMultipleClaimOptions](../interfaces/modules_claims.RevokeMultipleClaimOptions.md)
- [VerifyEnrolmentPrerequisitesOptions](../interfaces/modules_claims.VerifyEnrolmentPrerequisitesOptions.md)

### Type Aliases

- [IssueClaim](modules_claims.md#issueclaim)
- [RejectClaim](modules_claims.md#rejectclaim)
- [RequestClaim](modules_claims.md#requestclaim)

### Variables

- [agreement\_type\_hash](modules_claims.md#agreement_type_hash)
- [erc712\_type\_hash](modules_claims.md#erc712_type_hash)
- [eternityTimestamp](modules_claims.md#eternitytimestamp)
- [proof\_type\_hash](modules_claims.md#proof_type_hash)
- [typedMsgPrefix](modules_claims.md#typedmsgprefix)

### Functions

- [readyToBeRegisteredOnchain](modules_claims.md#readytoberegisteredonchain)

## Type Aliases

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

### erc712\_type\_hash

• `Const` **erc712\_type\_hash**: `string`

___

### eternityTimestamp

• `Const` **eternityTimestamp**: `number`

___

### proof\_type\_hash

• `Const` **proof\_type\_hash**: `string`

___

### typedMsgPrefix

• `Const` **typedMsgPrefix**: ``"1901"``

## Functions

### readyToBeRegisteredOnchain

▸ **readyToBeRegisteredOnchain**(`claim`): claim is Required\<Pick\<Claim, "claimType" \| "claimTypeVersion" \| "subject" \| "onChainProof" \| "acceptedBy"\> & Object\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `claim` | `unknown` |

#### Returns

claim is Required\<Pick\<Claim, "claimType" \| "claimTypeVersion" \| "subject" \| "onChainProof" \| "acceptedBy"\> & Object\>
