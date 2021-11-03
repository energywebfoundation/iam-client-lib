# Class: ClaimsService

[modules/claims/claims.service](../modules/modules_claims_claims_service.md).ClaimsService

## Table of contents

### Constructors

- [constructor](modules_claims_claims_service.ClaimsService.md#constructor)

### Methods

- [createClaimRequest](modules_claims_claims_service.ClaimsService.md#createclaimrequest)
- [createDelegateProof](modules_claims_claims_service.ClaimsService.md#createdelegateproof)
- [createIdentityProof](modules_claims_claims_service.ClaimsService.md#createidentityproof)
- [createProofClaim](modules_claims_claims_service.ClaimsService.md#createproofclaim)
- [createPublicClaim](modules_claims_claims_service.ClaimsService.md#createpublicclaim)
- [createSelfSignedClaim](modules_claims_claims_service.ClaimsService.md#createselfsignedclaim)
- [deleteClaim](modules_claims_claims_service.ClaimsService.md#deleteclaim)
- [getClaimId](modules_claims_claims_service.ClaimsService.md#getclaimid)
- [getClaimsByIssuer](modules_claims_claims_service.ClaimsService.md#getclaimsbyissuer)
- [getClaimsByRequester](modules_claims_claims_service.ClaimsService.md#getclaimsbyrequester)
- [getClaimsBySubject](modules_claims_claims_service.ClaimsService.md#getclaimsbysubject)
- [getClaimsBySubjects](modules_claims_claims_service.ClaimsService.md#getclaimsbysubjects)
- [getUserClaims](modules_claims_claims_service.ClaimsService.md#getuserclaims)
- [init](modules_claims_claims_service.ClaimsService.md#init)
- [issueClaim](modules_claims_claims_service.ClaimsService.md#issueclaim)
- [issueClaimRequest](modules_claims_claims_service.ClaimsService.md#issueclaimrequest)
- [publishPublicClaim](modules_claims_claims_service.ClaimsService.md#publishpublicclaim)
- [rejectClaimRequest](modules_claims_claims_service.ClaimsService.md#rejectclaimrequest)
- [create](modules_claims_claims_service.ClaimsService.md#create)

## Constructors

### constructor

• **new ClaimsService**(`_signerService`, `_domainsService`, `_cacheClient`, `_didRegistry`, `_messagingService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_signerService` | [`SignerService`](modules_signer_signer_service.SignerService.md) |
| `_domainsService` | [`DomainsService`](modules_domains_domains_service.DomainsService.md) |
| `_cacheClient` | [`CacheClient`](modules_cacheClient_cacheClient_service.CacheClient.md) |
| `_didRegistry` | [`DidRegistry`](modules_didRegistry_didRegistry_service.DidRegistry.md) |
| `_messagingService` | [`MessagingService`](modules_messaging_messaging_service.MessagingService.md) |

## Methods

### createClaimRequest

▸ **createClaimRequest**(`__namedParameters`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.claim` | `Object` |
| `__namedParameters.claim.claimType` | `string` |
| `__namedParameters.claim.claimTypeVersion` | `number` |
| `__namedParameters.claim.fields` | { `key`: `string` ; `value`: `string` \| `number`  }[] |
| `__namedParameters.registrationTypes?` | [`RegistrationTypes`](../enums/modules_claims_claims_types.RegistrationTypes.md)[] |
| `__namedParameters.subject?` | `string` |

#### Returns

`Promise`<`void`\>

___

### createDelegateProof

▸ **createDelegateProof**(`delegateKey`, `identity`): `Promise`<`string`\>

**`description`** create a proof of identity delegate

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `delegateKey` | `string` | private key of the delegate |
| `identity` | `string` | Did of the delegate |

#### Returns

`Promise`<`string`\>

token of delegate

___

### createIdentityProof

▸ **createIdentityProof**(): `Promise`<`string`\>

**`description`** create a public claim to prove identity

#### Returns

`Promise`<`string`\>

JWT token of created identity

___

### createProofClaim

▸ **createProofClaim**(`__namedParameters`): `Promise`<`void`\>

createProofClaim

**`description`** creates a proof of a claim

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.claimUrl` | `string` |
| `__namedParameters.saltedFields` | `ISaltedFields` |

#### Returns

`Promise`<`void`\>

proof token

___

### createPublicClaim

▸ **createPublicClaim**(`__namedParameters`): `Promise`<`string`\>

createPublicClaim

**`description`** create a public claim based on data provided

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.data` | [`ClaimData`](../interfaces/modules_didRegistry_did_types.ClaimData.md) |
| `__namedParameters.subject?` | `string` |

#### Returns

`Promise`<`string`\>

JWT token of created claim

___

### createSelfSignedClaim

▸ **createSelfSignedClaim**(`__namedParameters`): `Promise`<`string`\>

createSelfSignedClaim

**`description`** creates self signed claim and upload the data to ipfs

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.data` | [`ClaimData`](../interfaces/modules_didRegistry_did_types.ClaimData.md) |
| `__namedParameters.subject?` | `string` |

#### Returns

`Promise`<`string`\>

___

### deleteClaim

▸ **deleteClaim**(`__namedParameters`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.id` | `string` |

#### Returns

`Promise`<`void`\>

___

### getClaimId

▸ **getClaimId**(`__namedParameters`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.claimData` | [`ClaimData`](../interfaces/modules_didRegistry_did_types.ClaimData.md) |

#### Returns

`Promise`<`string`\>

___

### getClaimsByIssuer

▸ **getClaimsByIssuer**(`__namedParameters`): `Promise`<[`Claim`](../interfaces/modules_claims_claims_types.Claim.md)[]\>

**`description`** - Returns claims for given issuer. Allows filtering by status and parent namespace

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.did` | `string` |
| `__namedParameters.isAccepted?` | `boolean` |
| `__namedParameters.namespace?` | `string` |

#### Returns

`Promise`<[`Claim`](../interfaces/modules_claims_claims_types.Claim.md)[]\>

___

### getClaimsByRequester

▸ **getClaimsByRequester**(`__namedParameters`): `Promise`<[`Claim`](../interfaces/modules_claims_claims_types.Claim.md)[]\>

**`description`** - Returns claims for given requester. Allows filtering by status and parent namespace

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.did` | `string` |
| `__namedParameters.isAccepted?` | `boolean` |
| `__namedParameters.namespace?` | `string` |

#### Returns

`Promise`<[`Claim`](../interfaces/modules_claims_claims_types.Claim.md)[]\>

___

### getClaimsBySubject

▸ **getClaimsBySubject**(`__namedParameters`): `Promise`<[`Claim`](../interfaces/modules_claims_claims_types.Claim.md)[]\>

**`description`** - Returns claims for given subject. Allows filtering by status and parent namespace

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.did` | `string` |
| `__namedParameters.isAccepted?` | `boolean` |
| `__namedParameters.namespace?` | `string` |

#### Returns

`Promise`<[`Claim`](../interfaces/modules_claims_claims_types.Claim.md)[]\>

___

### getClaimsBySubjects

▸ **getClaimsBySubjects**(`subjects`): `Promise`<[`Claim`](../interfaces/modules_claims_claims_types.Claim.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `subjects` | `string`[] |

#### Returns

`Promise`<[`Claim`](../interfaces/modules_claims_claims_types.Claim.md)[]\>

___

### getUserClaims

▸ **getUserClaims**(`__namedParameters?`): `Promise`<`IServiceEndpoint` & [`ClaimData`](../interfaces/modules_didRegistry_did_types.ClaimData.md)[]\>

getUserClaims

**`description`** get user claims

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `undefined` \| { `did?`: `string`  } |

#### Returns

`Promise`<`IServiceEndpoint` & [`ClaimData`](../interfaces/modules_didRegistry_did_types.ClaimData.md)[]\>

___

### init

▸ **init**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

___

### issueClaim

▸ **issueClaim**(`__namedParameters`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.claim` | `Object` |
| `__namedParameters.claim.claimType` | `string` |
| `__namedParameters.claim.claimTypeVersion` | `number` |
| `__namedParameters.claim.fields` | { `key`: `string` ; `value`: `string` \| `number`  }[] |
| `__namedParameters.subject` | `string` |

#### Returns

`Promise`<`string`\>

___

### issueClaimRequest

▸ **issueClaimRequest**(`__namedParameters`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.claimParams?` | `Record`<`string`, `string`\> |
| `__namedParameters.id` | `string` |
| `__namedParameters.registrationTypes` | [`RegistrationTypes`](../enums/modules_claims_claims_types.RegistrationTypes.md)[] |
| `__namedParameters.requester` | `string` |
| `__namedParameters.subjectAgreement` | `string` |
| `__namedParameters.token` | `string` |

#### Returns

`Promise`<`void`\>

___

### publishPublicClaim

▸ **publishPublicClaim**(`__namedParameters`): `Promise`<`string`\>

publishPublicClaim

**`description`** store claim data in ipfs and save url to DID document services

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.token` | `string` |

#### Returns

`Promise`<`string`\>

ulr to ipfs

___

### rejectClaimRequest

▸ **rejectClaimRequest**(`__namedParameters`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.id` | `string` |
| `__namedParameters.requesterDID` | `string` |

#### Returns

`Promise`<`void`\>

___

### create

▸ `Static` **create**(`signerService`, `domainsService`, `cacheClient`, `didRegistry`, `messagingService`): `Promise`<[`ClaimsService`](modules_claims_claims_service.ClaimsService.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerService` | [`SignerService`](modules_signer_signer_service.SignerService.md) |
| `domainsService` | [`DomainsService`](modules_domains_domains_service.DomainsService.md) |
| `cacheClient` | [`CacheClient`](modules_cacheClient_cacheClient_service.CacheClient.md) |
| `didRegistry` | [`DidRegistry`](modules_didRegistry_didRegistry_service.DidRegistry.md) |
| `messagingService` | [`MessagingService`](modules_messaging_messaging_service.MessagingService.md) |

#### Returns

`Promise`<[`ClaimsService`](modules_claims_claims_service.ClaimsService.md)\>
