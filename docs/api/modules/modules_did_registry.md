# Module: modules/did-registry

## Table of contents

### Enumerations

- [DidStoreType](../enums/modules_did_registry.DidStoreType.md)

### Classes

- [DidRegistry](../classes/modules_did_registry.DidRegistry.md)

### Interfaces

- [AssetProfile](../interfaces/modules_did_registry.AssetProfile.md)
- [AssetProfiles](../interfaces/modules_did_registry.AssetProfiles.md)
- [CreatePublicClaimOptions](../interfaces/modules_did_registry.CreatePublicClaimOptions.md)
- [DecodeJWTTokenOptions](../interfaces/modules_did_registry.DecodeJWTTokenOptions.md)
- [DidStoreConfigBase](../interfaces/modules_did_registry.DidStoreConfigBase.md)
- [DownloadClaimsOptions](../interfaces/modules_did_registry.DownloadClaimsOptions.md)
- [GetDIDDocumentOptions](../interfaces/modules_did_registry.GetDIDDocumentOptions.md)
- [GetDidDelegatesOptions](../interfaces/modules_did_registry.GetDidDelegatesOptions.md)
- [GetDidPublicKeysOptions](../interfaces/modules_did_registry.GetDidPublicKeysOptions.md)
- [GetServicesOptions](../interfaces/modules_did_registry.GetServicesOptions.md)
- [IssuePublicClaimOptions](../interfaces/modules_did_registry.IssuePublicClaimOptions.md)
- [Profile](../interfaces/modules_did_registry.Profile.md)
- [S3Config](../interfaces/modules_did_registry.S3Config.md)
- [SSIConfig](../interfaces/modules_did_registry.SSIConfig.md)
- [UpdateDocumentOptions](../interfaces/modules_did_registry.UpdateDocumentOptions.md)
- [UpdateSignedDidDelegateOptions](../interfaces/modules_did_registry.UpdateSignedDidDelegateOptions.md)
- [UpdateSignedDidPublicKeyOptions](../interfaces/modules_did_registry.UpdateSignedDidPublicKeyOptions.md)
- [ValidDateUpdateDocumentRequestOptions](../interfaces/modules_did_registry.ValidDateUpdateDocumentRequestOptions.md)

### Type Aliases

- [DidStoreConfig](modules_did_registry.md#didstoreconfig)

### Functions

- [isClaimService](modules_did_registry.md#isclaimservice)

## Type Aliases

### DidStoreConfig

Ƭ **DidStoreConfig**: [`SSIConfig`](../interfaces/modules_did_registry.SSIConfig.md) \| [`S3Config`](../interfaces/modules_did_registry.S3Config.md)

## Functions

### isClaimService

▸ **isClaimService**(`service`): service is IServiceEndpoint & Pick\<ClaimData, "claimType" \| "claimTypeVersion"\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `service` | `IServiceEndpoint` |

#### Returns

service is IServiceEndpoint & Pick\<ClaimData, "claimType" \| "claimTypeVersion"\>
