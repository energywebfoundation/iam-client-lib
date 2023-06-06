# Module: modules/did-registry

## Table of contents

### Classes

- [DidRegistry](../classes/modules_did_registry.DidRegistry.md)

### Interfaces

- [AssetProfile](../interfaces/modules_did_registry.AssetProfile.md)
- [AssetProfiles](../interfaces/modules_did_registry.AssetProfiles.md)
- [CreatePublicClaimOptions](../interfaces/modules_did_registry.CreatePublicClaimOptions.md)
- [DecodeJWTTokenOptions](../interfaces/modules_did_registry.DecodeJWTTokenOptions.md)
- [DownloadClaimsOptions](../interfaces/modules_did_registry.DownloadClaimsOptions.md)
- [GetDIDDocumentOptions](../interfaces/modules_did_registry.GetDIDDocumentOptions.md)
- [GetDidDelegatesOptions](../interfaces/modules_did_registry.GetDidDelegatesOptions.md)
- [GetDidPublicKeysOptions](../interfaces/modules_did_registry.GetDidPublicKeysOptions.md)
- [GetServicesOptions](../interfaces/modules_did_registry.GetServicesOptions.md)
- [IpfsConfig](../interfaces/modules_did_registry.IpfsConfig.md)
- [IssuePublicClaimOptions](../interfaces/modules_did_registry.IssuePublicClaimOptions.md)
- [Profile](../interfaces/modules_did_registry.Profile.md)
- [UpdateDocumentOptions](../interfaces/modules_did_registry.UpdateDocumentOptions.md)
- [UpdateSignedDidDelegateOptions](../interfaces/modules_did_registry.UpdateSignedDidDelegateOptions.md)
- [UpdateSignedDidPublicKeyOptions](../interfaces/modules_did_registry.UpdateSignedDidPublicKeyOptions.md)
- [ValidDateUpdateDocumentRequestOptions](../interfaces/modules_did_registry.ValidDateUpdateDocumentRequestOptions.md)

### Functions

- [isClaimService](modules_did_registry.md#isclaimservice)

## Functions

### isClaimService

▸ **isClaimService**(`service`): service is IServiceEndpoint & Pick<ClaimData, "claimType" \| "claimTypeVersion"\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `service` | `IServiceEndpoint` |

#### Returns

service is IServiceEndpoint & Pick<ClaimData, "claimType" \| "claimTypeVersion"\>
