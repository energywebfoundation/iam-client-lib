# Class: ClaimsService

[modules/claims](../modules/modules_claims.md).ClaimsService

## Table of contents

### Constructors

- [constructor](modules_claims.ClaimsService.md#constructor)

### Methods

- [createClaimRequest](modules_claims.ClaimsService.md#createclaimrequest)
- [createDelegateProof](modules_claims.ClaimsService.md#createdelegateproof)
- [createIdentityProof](modules_claims.ClaimsService.md#createidentityproof)
- [createSelfSignedClaim](modules_claims.ClaimsService.md#createselfsignedclaim)
- [deleteClaim](modules_claims.ClaimsService.md#deleteclaim)
- [getClaimById](modules_claims.ClaimsService.md#getclaimbyid)
- [getClaimId](modules_claims.ClaimsService.md#getclaimid)
- [getClaimsByIssuer](modules_claims.ClaimsService.md#getclaimsbyissuer)
- [getClaimsByRequester](modules_claims.ClaimsService.md#getclaimsbyrequester)
- [getClaimsBySubject](modules_claims.ClaimsService.md#getclaimsbysubject)
- [getClaimsBySubjects](modules_claims.ClaimsService.md#getclaimsbysubjects)
- [getNamespaceFromClaimType](modules_claims.ClaimsService.md#getnamespacefromclaimtype)
- [getUserClaims](modules_claims.ClaimsService.md#getuserclaims)
- [hasOnChainRole](modules_claims.ClaimsService.md#hasonchainrole)
- [init](modules_claims.ClaimsService.md#init)
- [issueClaim](modules_claims.ClaimsService.md#issueclaim)
- [issueClaimRequest](modules_claims.ClaimsService.md#issueclaimrequest)
- [publishPublicClaim](modules_claims.ClaimsService.md#publishpublicclaim)
- [registerOnchain](modules_claims.ClaimsService.md#registeronchain)
- [rejectClaimRequest](modules_claims.ClaimsService.md#rejectclaimrequest)
- [create](modules_claims.ClaimsService.md#create)

## Constructors

### constructor

• **new ClaimsService**(`_signerService`, `_domainsService`, `_cacheClient`, `_didRegistry`, `_verifiableCredentialService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_signerService` | [`SignerService`](modules_signer.SignerService.md) |
| `_domainsService` | [`DomainsService`](modules_domains.DomainsService.md) |
| `_cacheClient` | [`CacheClient`](modules_cache_client.CacheClient.md) |
| `_didRegistry` | [`DidRegistry`](modules_did_registry.DidRegistry.md) |
| `_verifiableCredentialService` | [`VerifiableCredentialsServiceBase`](modules_verifiable_credentials.VerifiableCredentialsServiceBase.md) |

## Methods

### createClaimRequest

▸ **createClaimRequest**(`__namedParameters`): `Promise`<`void`\>

**`description`** allows subject to request for credential

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.claim` | `Object` |
| `__namedParameters.claim.claimType` | `string` |
| `__namedParameters.claim.claimTypeVersion` | `number` |
| `__namedParameters.claim.issuerFields?` | { `key`: `string` ; `value`: `string` \| `number`  }[] |
| `__namedParameters.claim.requestorFields?` | { `key`: `string` ; `value`: `string` \| `number`  }[] |
| `__namedParameters.registrationTypes?` | [`RegistrationTypes`](../enums/modules_claims.RegistrationTypes.md)[] |
| `__namedParameters.subject?` | `string` |

#### Returns

`Promise`<`void`\>

___

### createDelegateProof

▸ **createDelegateProof**(`delegateKey`, `identity`, `algorithm?`): `Promise`<`string`\>

**`description`** create a proof of identity delegate

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `delegateKey` | `string` | `undefined` | private key of the delegate in hexadecimal format |
| `identity` | `string` | `undefined` | Did of the delegate |
| `algorithm` | `Algorithms` | `Algorithms.EIP191` | - |

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

### createSelfSignedClaim

▸ **createSelfSignedClaim**(`__namedParameters`): `Promise`<`string`\>

**`description`** Creates claim with `data` and adds it to `subject` document. Signer must own or control subject

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.data` | [`ClaimData`](../interfaces/modules_did_registry.ClaimData.md) |
| `__namedParameters.subject?` | `string` |

#### Returns

`Promise`<`string`\>

claim url

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

### getClaimById

▸ **getClaimById**(`claimId`): `Promise`<`undefined` \| [`Claim`](../interfaces/modules_claims.Claim.md)\>

**`description`** - Returns claim with the given Id or null if claim does not exist

#### Parameters

| Name | Type |
| :------ | :------ |
| `claimId` | `string` |

#### Returns

`Promise`<`undefined` \| [`Claim`](../interfaces/modules_claims.Claim.md)\>

___

### getClaimId

▸ **getClaimId**(`__namedParameters`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.claimData` | [`ClaimData`](../interfaces/modules_did_registry.ClaimData.md) |

#### Returns

`Promise`<`string`\>

___

### getClaimsByIssuer

▸ **getClaimsByIssuer**(`__namedParameters`): `Promise`<[`Claim`](../interfaces/modules_claims.Claim.md)[]\>

**`description`** - Returns claims for given issuer. Allows filtering by status and parent namespace

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.did` | `string` |
| `__namedParameters.isAccepted?` | `boolean` |
| `__namedParameters.namespace?` | `string` |

#### Returns

`Promise`<[`Claim`](../interfaces/modules_claims.Claim.md)[]\>

___

### getClaimsByRequester

▸ **getClaimsByRequester**(`__namedParameters`): `Promise`<[`Claim`](../interfaces/modules_claims.Claim.md)[]\>

**`description`** - Returns claims for given requester. Allows filtering by status and parent namespace

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.did` | `string` |
| `__namedParameters.isAccepted?` | `boolean` |
| `__namedParameters.namespace?` | `string` |

#### Returns

`Promise`<[`Claim`](../interfaces/modules_claims.Claim.md)[]\>

___

### getClaimsBySubject

▸ **getClaimsBySubject**(`__namedParameters`): `Promise`<[`Claim`](../interfaces/modules_claims.Claim.md)[]\>

**`description`** - Returns claims for given subject. Allows filtering by status and parent namespace

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.did` | `string` |
| `__namedParameters.isAccepted?` | `boolean` |
| `__namedParameters.namespace?` | `string` |

#### Returns

`Promise`<[`Claim`](../interfaces/modules_claims.Claim.md)[]\>

___

### getClaimsBySubjects

▸ **getClaimsBySubjects**(`subjects`): `Promise`<[`Claim`](../interfaces/modules_claims.Claim.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `subjects` | `string`[] |

#### Returns

`Promise`<[`Claim`](../interfaces/modules_claims.Claim.md)[]\>

___

### getNamespaceFromClaimType

▸ **getNamespaceFromClaimType**(`claimType`): `string`

**`description`** get `namespace` from claim type.

#### Parameters

| Name | Type |
| :------ | :------ |
| `claimType` | `string` |

#### Returns

`string`

namespace

___

### getUserClaims

▸ **getUserClaims**(`__namedParameters?`): `Promise`<`IServiceEndpoint` & [`ClaimData`](../interfaces/modules_did_registry.ClaimData.md)[]\>

getUserClaims

**`description`** get published offchain claims

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `undefined` \| { `did?`: `string`  } |

#### Returns

`Promise`<`IServiceEndpoint` & [`ClaimData`](../interfaces/modules_did_registry.ClaimData.md)[]\>

___

### hasOnChainRole

▸ **hasOnChainRole**(`did`, `role`, `version`): `Promise`<`boolean`\>

A utility function to check the blockchain directly if a DID has a role
TODO: fail if the DID chain ID doesn't match the configured signer network connect

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `did` | `string` | The ethr DID to check |
| `role` | `string` | The role to check (the full namespace) |
| `version` | `number` | The version to check |

#### Returns

`Promise`<`boolean`\>

true if DID has role at the version. false if not.

___

### init

▸ **init**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

___

### issueClaim

▸ **issueClaim**(`__namedParameters`): `Promise`<`undefined` \| `string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.claim` | `Object` |
| `__namedParameters.claim.claimType` | `string` |
| `__namedParameters.claim.claimTypeVersion` | `number` |
| `__namedParameters.claim.issuerFields` | { `key`: `string` ; `value`: `string` \| `number`  }[] |
| `__namedParameters.registrationTypes` | [`RegistrationTypes`](../enums/modules_claims.RegistrationTypes.md)[] |
| `__namedParameters.subject` | `string` |

#### Returns

`Promise`<`undefined` \| `string`\>

___

### issueClaimRequest

▸ **issueClaimRequest**(`__namedParameters`): `Promise`<`void`\>

Issue a claim request by signing both off-chain and on-chain request and persisting result to the cache-server.
Optionally, issue on-chain role can be submitted to the ClaimManager contract as well.

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.id` | `string` |
| `__namedParameters.issuerFields?` | { `key`: `string` ; `value`: `string` \| `number`  }[] |
| `__namedParameters.publishOnChain?` | `boolean` |
| `__namedParameters.registrationTypes` | [`RegistrationTypes`](../enums/modules_claims.RegistrationTypes.md)[] |
| `__namedParameters.requester` | `string` |
| `__namedParameters.subjectAgreement` | `string` |
| `__namedParameters.token` | `string` |

#### Returns

`Promise`<`void`\>

___

### publishPublicClaim

▸ **publishPublicClaim**(`token`): `Promise`<`undefined` \| `string`\>

**`description`** publishes claim off-chain (by storing claim data in ipfs and save url to DID document services) or registering on-chain depending on registrationTypes values.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `token` | `Object` | @deprecated - use claim with claimType instead |
| `token.claim` | `Object` | - |
| `token.claim.claimType?` | `string` | - |
| `token.claim.token?` | `string` | - |
| `token.registrationTypes?` | [`RegistrationTypes`](../enums/modules_claims.RegistrationTypes.md)[] | - |
| `token.token?` | `string` | - |

#### Returns

`Promise`<`undefined` \| `string`\>

ulr to ipfs

___

### registerOnchain

▸ **registerOnchain**(`claim`): `Promise`<`void`\>

**`description`** Registers issued onchain claim with Claim manager

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `claim` | `Object` | id of signed onchain claim. |
| `claim.acceptedBy` | `string` | - |
| `claim.claimType?` | `string` | - |
| `claim.claimTypeVersion?` | `string` | - |
| `claim.onChainProof` | `string` | - |
| `claim.subject?` | `string` | - |
| `claim.subjectAgreement?` | `string` | - |
| `claim.token?` | `string` | - |

#### Returns

`Promise`<`void`\>

___

### rejectClaimRequest

▸ **rejectClaimRequest**(`__namedParameters`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.id` | `string` |
| `__namedParameters.rejectionReason?` | `string` |
| `__namedParameters.requesterDID` | `string` |

#### Returns

`Promise`<`void`\>

___

### create

▸ `Static` **create**(`signerService`, `domainsService`, `cacheClient`, `didRegistry`, `verifiableCredentialService`): `Promise`<[`ClaimsService`](modules_claims.ClaimsService.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerService` | [`SignerService`](modules_signer.SignerService.md) |
| `domainsService` | [`DomainsService`](modules_domains.DomainsService.md) |
| `cacheClient` | [`CacheClient`](modules_cache_client.CacheClient.md) |
| `didRegistry` | [`DidRegistry`](modules_did_registry.DidRegistry.md) |
| `verifiableCredentialService` | [`VerifiableCredentialsServiceBase`](modules_verifiable_credentials.VerifiableCredentialsServiceBase.md) |

#### Returns

`Promise`<[`ClaimsService`](modules_claims.ClaimsService.md)\>
