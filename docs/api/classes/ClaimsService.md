# Class: ClaimsService

## Table of contents

### Constructors

- [constructor](ClaimsService.md#constructor)

### Methods

- [createClaimRequest](ClaimsService.md#createclaimrequest)
- [createDelegateProof](ClaimsService.md#createdelegateproof)
- [createIdentityProof](ClaimsService.md#createidentityproof)
- [createSelfSignedClaim](ClaimsService.md#createselfsignedclaim)
- [deleteClaim](ClaimsService.md#deleteclaim)
- [getClaimById](ClaimsService.md#getclaimbyid)
- [getClaimId](ClaimsService.md#getclaimid)
- [getClaimsByIssuer](ClaimsService.md#getclaimsbyissuer)
- [getClaimsByRequester](ClaimsService.md#getclaimsbyrequester)
- [getClaimsBySubject](ClaimsService.md#getclaimsbysubject)
- [getClaimsBySubjects](ClaimsService.md#getclaimsbysubjects)
- [getUserClaims](ClaimsService.md#getuserclaims)
- [hasOnChainRole](ClaimsService.md#hasonchainrole)
- [init](ClaimsService.md#init)
- [issueClaim](ClaimsService.md#issueclaim)
- [issueClaimRequest](ClaimsService.md#issueclaimrequest)
- [publishPublicClaim](ClaimsService.md#publishpublicclaim)
- [registerOnchain](ClaimsService.md#registeronchain)
- [rejectClaimRequest](ClaimsService.md#rejectclaimrequest)
- [create](ClaimsService.md#create)

## Constructors

### constructor

• **new ClaimsService**(`_signerService`, `_domainsService`, `_cacheClient`, `_didRegistry`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_signerService` | [`SignerService`](SignerService.md) |
| `_domainsService` | [`DomainsService`](DomainsService.md) |
| `_cacheClient` | [`CacheClient`](CacheClient.md) |
| `_didRegistry` | [`DidRegistry`](DidRegistry.md) |

## Methods

### createClaimRequest

▸ **createClaimRequest**(`__namedParameters`): `Promise`<`void`\>

**`description`** allows subject to request for credential

**`field`** { claim: fields }  - @deprecated - use requestorFields instead

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.claim` | `Object` |
| `__namedParameters.claim.claimType` | `string` |
| `__namedParameters.claim.claimTypeVersion` | `number` |
| `__namedParameters.claim.fields?` | { `key`: `string` ; `value`: `string` \| `number`  }[] |
| `__namedParameters.claim.issuerFields?` | { `key`: `string` ; `value`: `string` \| `number`  }[] |
| `__namedParameters.claim.requestorFields?` | { `key`: `string` ; `value`: `string` \| `number`  }[] |
| `__namedParameters.registrationTypes?` | [`RegistrationTypes`](../enums/RegistrationTypes.md)[] |
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

▸ **createSelfSignedClaim**(`__namedParameters`): `Promise`<`undefined` \| `string`\>

**`description`** Creates claim with `data` and adds it to `subject` document. Signer must own or control subject

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.data` | [`ClaimData`](../interfaces/ClaimData.md) |
| `__namedParameters.subject?` | `string` |

#### Returns

`Promise`<`undefined` \| `string`\>

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

▸ **getClaimById**(`claimId`): `Promise`<`undefined` \| [`Claim`](../interfaces/Claim.md)\>

**`description`** - Returns claim with the given Id or null if claim does not exist

#### Parameters

| Name | Type |
| :------ | :------ |
| `claimId` | `string` |

#### Returns

`Promise`<`undefined` \| [`Claim`](../interfaces/Claim.md)\>

___

### getClaimId

▸ **getClaimId**(`__namedParameters`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.claimData` | [`ClaimData`](../interfaces/ClaimData.md) |

#### Returns

`Promise`<`string`\>

___

### getClaimsByIssuer

▸ **getClaimsByIssuer**(`__namedParameters`): `Promise`<[`Claim`](../interfaces/Claim.md)[]\>

**`description`** - Returns claims for given issuer. Allows filtering by status and parent namespace

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.did` | `string` |
| `__namedParameters.isAccepted?` | `boolean` |
| `__namedParameters.namespace?` | `string` |

#### Returns

`Promise`<[`Claim`](../interfaces/Claim.md)[]\>

___

### getClaimsByRequester

▸ **getClaimsByRequester**(`__namedParameters`): `Promise`<[`Claim`](../interfaces/Claim.md)[]\>

**`description`** - Returns claims for given requester. Allows filtering by status and parent namespace

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.did` | `string` |
| `__namedParameters.isAccepted?` | `boolean` |
| `__namedParameters.namespace?` | `string` |

#### Returns

`Promise`<[`Claim`](../interfaces/Claim.md)[]\>

___

### getClaimsBySubject

▸ **getClaimsBySubject**(`__namedParameters`): `Promise`<[`Claim`](../interfaces/Claim.md)[]\>

**`description`** - Returns claims for given subject. Allows filtering by status and parent namespace

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.did` | `string` |
| `__namedParameters.isAccepted?` | `boolean` |
| `__namedParameters.namespace?` | `string` |

#### Returns

`Promise`<[`Claim`](../interfaces/Claim.md)[]\>

___

### getClaimsBySubjects

▸ **getClaimsBySubjects**(`subjects`): `Promise`<[`Claim`](../interfaces/Claim.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `subjects` | `string`[] |

#### Returns

`Promise`<[`Claim`](../interfaces/Claim.md)[]\>

___

### getUserClaims

▸ **getUserClaims**(`__namedParameters?`): `Promise`<`IServiceEndpoint` & [`ClaimData`](../interfaces/ClaimData.md)[]\>

getUserClaims

**`description`** get user claims

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `undefined` \| { `did?`: `string`  } |

#### Returns

`Promise`<`IServiceEndpoint` & [`ClaimData`](../interfaces/ClaimData.md)[]\>

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
| `__namedParameters.registrationTypes` | [`RegistrationTypes`](../enums/RegistrationTypes.md)[] |
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
| `__namedParameters.registrationTypes` | [`RegistrationTypes`](../enums/RegistrationTypes.md)[] |
| `__namedParameters.requester` | `string` |
| `__namedParameters.subjectAgreement` | `string` |
| `__namedParameters.token` | `string` |

#### Returns

`Promise`<`void`\>

___

### publishPublicClaim

▸ **publishPublicClaim**(`token`): `Promise`<`undefined` \| `string`\>

publishPublicClaim

**`description`** publishes claim off-chain (by storing claim data in ipfs and save url to DID document services

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `token` | `Object` | @deprecated - use claim with claimType instead |
| `token.claim` | `Object` | - |
| `token.claim.claimType?` | `string` | - |
| `token.claim.token?` | `string` | - |
| `token.registrationTypes?` | [`RegistrationTypes`](../enums/RegistrationTypes.md)[] | - |
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
| `claim.acceptedBy?` | `string` | - |
| `claim.claimType?` | `string` | - |
| `claim.claimTypeVersion?` | `string` | - |
| `claim.onChainProof?` | `string` | - |
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

▸ `Static` **create**(`signerService`, `domainsService`, `cacheClient`, `didRegistry`): `Promise`<[`ClaimsService`](ClaimsService.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerService` | [`SignerService`](SignerService.md) |
| `domainsService` | [`DomainsService`](DomainsService.md) |
| `cacheClient` | [`CacheClient`](CacheClient.md) |
| `didRegistry` | [`DidRegistry`](DidRegistry.md) |

#### Returns

`Promise`<[`ClaimsService`](ClaimsService.md)\>
