# Module: cacheServerClient/cacheServerClient.types

## Table of contents

### Enumerations

- [AssetHistoryEventType](../enums/cacheServerClient_cacheServerClient_types.AssetHistoryEventType.md)
- [Order](../enums/cacheServerClient_cacheServerClient_types.Order.md)
- [RegistrationTypes](../enums/cacheServerClient_cacheServerClient_types.RegistrationTypes.md)

### Interfaces

- [Asset](../interfaces/cacheServerClient_cacheServerClient_types.Asset.md)
- [AssetHistory](../interfaces/cacheServerClient_cacheServerClient_types.AssetHistory.md)
- [AssetProfile](../interfaces/cacheServerClient_cacheServerClient_types.AssetProfile.md)
- [AssetProfiles](../interfaces/cacheServerClient_cacheServerClient_types.AssetProfiles.md)
- [Claim](../interfaces/cacheServerClient_cacheServerClient_types.Claim.md)
- [ClaimData](../interfaces/cacheServerClient_cacheServerClient_types.ClaimData.md)
- [IApp](../interfaces/cacheServerClient_cacheServerClient_types.IApp.md)
- [IOrganization](../interfaces/cacheServerClient_cacheServerClient_types.IOrganization.md)
- [IRole](../interfaces/cacheServerClient_cacheServerClient_types.IRole.md)
- [Profile](../interfaces/cacheServerClient_cacheServerClient_types.Profile.md)

### Type aliases

- [ClaimsQueryParams](cacheServerClient_cacheServerClient_types.md#claimsqueryparams)
- [IssueClaim](cacheServerClient_cacheServerClient_types.md#issueclaim)
- [RejectClaim](cacheServerClient_cacheServerClient_types.md#rejectclaim)
- [RequestClaim](cacheServerClient_cacheServerClient_types.md#requestclaim)

## Type aliases

### ClaimsQueryParams

Ƭ **ClaimsQueryParams**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `claimId` | `string` |
| `did` | `string` |
| `excludeSubOrgs` | `boolean` |
| `id` | `string` |
| `includeClaims?` | `boolean` |
| `isAccepted?` | `boolean` |
| `issuedToken` | `string` |
| `namespace` | `string` |
| `order?` | [`Order`](../enums/cacheServerClient_cacheServerClient_types.Order.md) |
| `owner` | `string` |
| `parentNamespace?` | `string` |
| `search` | `string` |
| `skip?` | `number` |
| `subjects` | `string`[] |
| `take?` | `number` |
| `type?` | [`AssetHistoryEventType`](../enums/cacheServerClient_cacheServerClient_types.AssetHistoryEventType.md) |
| `types?` | (``"App"`` \| ``"Org"`` \| ``"Role"``)[] |

___

### IssueClaim

Ƭ **IssueClaim**: `Pick`<[`ClaimsQueryParams`](cacheServerClient_cacheServerClient_types.md#claimsqueryparams), ``"did"``\> & { `message`: [`IClaimIssuance`](../interfaces/iam.IClaimIssuance.md)  }

___

### RejectClaim

Ƭ **RejectClaim**: `Pick`<[`ClaimsQueryParams`](cacheServerClient_cacheServerClient_types.md#claimsqueryparams), ``"did"``\> & { `message`: [`IClaimRejection`](../interfaces/iam.IClaimRejection.md)  }

___

### RequestClaim

Ƭ **RequestClaim**: `Pick`<[`ClaimsQueryParams`](cacheServerClient_cacheServerClient_types.md#claimsqueryparams), ``"did"``\> & { `message`: [`IClaimRequest`](../interfaces/iam.IClaimRequest.md)  }
