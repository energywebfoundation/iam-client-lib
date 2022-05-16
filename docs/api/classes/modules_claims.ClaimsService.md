# Class: ClaimsService

[modules/claims](../modules/modules_claims.md).ClaimsService

Service responsible for handling the request and issuance of claims.
See more information about claims in IAM stack [here](../../../docs/guides/claim.md).

```typescript
const { connectToCacheServer } = await initWithPrivateKeySigner(privateKey, rpcUrl);
const { connectToDidRegistry } = await connectToCacheServer();
const { claimsService } = await connectToDidRegistry();
claimsService.getClaimById(claim.id);
```

## Table of contents

### Constructors

- [constructor](modules_claims.ClaimsService.md#constructor)

### Methods

- [claimRevocationDetails](modules_claims.ClaimsService.md#claimrevocationdetails)
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
- [isClaimRevoked](modules_claims.ClaimsService.md#isclaimrevoked)
- [issueClaim](modules_claims.ClaimsService.md#issueclaim)
- [issueClaimRequest](modules_claims.ClaimsService.md#issueclaimrequest)
- [publishPublicClaim](modules_claims.ClaimsService.md#publishpublicclaim)
- [registerOnchain](modules_claims.ClaimsService.md#registeronchain)
- [rejectClaimRequest](modules_claims.ClaimsService.md#rejectclaimrequest)
- [revokeClaim](modules_claims.ClaimsService.md#revokeclaim)
- [revokeMultipleClaim](modules_claims.ClaimsService.md#revokemultipleclaim)
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

### claimRevocationDetails

▸ **claimRevocationDetails**(`options`): `Promise`<`undefined` \| [`ClaimRevocationDetailsResult`](../interfaces/modules_claims.ClaimRevocationDetailsResult.md)\>

Get the revocation details for a subject's On-Chain claim. Returns the revoker and revocationTimeStamp for the revocation.

```typescript
claimsService.claimRevocationDetails({
    claim: {
        namespace: 'root.roles.energyweb.iam.ewc',
        subject: 'did:ethr:volta:0x00...0',
    },
});
```
or
```typescript
claimsService.claimRevocationDetails({
    claimId: claim.id,
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`ClaimRevocationDetailsOptions`](../interfaces/modules_claims.ClaimRevocationDetailsOptions.md) | object containing options |

#### Returns

`Promise`<`undefined` \| [`ClaimRevocationDetailsResult`](../interfaces/modules_claims.ClaimRevocationDetailsResult.md)\>

revocation details

___

### createClaimRequest

▸ **createClaimRequest**(`options`): `Promise`<`void`\>

Allows subject to request for credential by creating and sending a claim request to claim issuer.

```typescript
claimsService.createClaimRequest({
    claim: {
         claimType: 'email.roles.energyweb.iam.ewc',
         claimTypeVersion: 1,
         requestorFields: [{key: 'foo', value: 'bar'}],
    };
    subject: 'did:ethr:0x00...0',
    registrationTypes: [RegistrationTypes.OnChain, RegistrationTypes.OffChain]
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`CreateClaimRequestOptions`](../interfaces/modules_claims.CreateClaimRequestOptions.md) | object containing options |

#### Returns

`Promise`<`void`\>

___

### createDelegateProof

▸ **createDelegateProof**(`delegateKey`, `identity`, `algorithm?`): `Promise`<`string`\>

Create a public claim to prove identity.

```typescript
claimsService.createDelegateProof(
    '245a40a9...776071ca57cec',
    'did:ethr:0x00...0',
    Algorithms.EIP191,
);
```

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `delegateKey` | `string` | `undefined` | Private key of the delegate in hexadecimal format |
| `identity` | `string` | `undefined` | DID of the delegate |
| `algorithm` | `Algorithms` | `Algorithms.EIP191` | Algorithm used to sign the delegate (EIP191 and ES256 available) |

#### Returns

`Promise`<`string`\>

JWT token of delegate

___

### createIdentityProof

▸ **createIdentityProof**(): `Promise`<`string`\>

Create a public claim to prove identity.

```typescript
claimsService.createIdentityProof();
```

#### Returns

`Promise`<`string`\>

JWT token of created identity

___

### createSelfSignedClaim

▸ **createSelfSignedClaim**(`options`): `Promise`<`string`\>

Creates self signed off-chain claim with `data` and adds it to `subject` document. Signer must own or control subject.

```typescript
claimsService.createSelfSignedClaim({
    data: {
         claimType: 'email.roles.energyweb.iam.ewc',
         claimTypeVersion: 1,
         issuerFields: [{key: 'foo', value: 'bar'}],
         profile: {
             name: 'John Doe',
             birthdate: '1990-01-01',
             address: '123 Main St',
         },
    },
    subject: 'did:ethr:volta:0x00...0',
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`CreateSelfSignedClaimOptions`](../interfaces/modules_claims.CreateSelfSignedClaimOptions.md) | object containing options |

#### Returns

`Promise`<`string`\>

URl to IPFS

___

### deleteClaim

▸ **deleteClaim**(`options`): `Promise`<`void`\>

Delete claim request. Works only for pending claims (not issued or rejected).

```typescript
claimsService.deleteClaim({
    id: '7281a130-e2b1-430d-8c14-201010eae901',
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`DeleteClaimOptions`](../interfaces/modules_claims.DeleteClaimOptions.md) | object containing options |

#### Returns

`Promise`<`void`\>

___

### getClaimById

▸ **getClaimById**(`claimId`): `Promise`<`undefined` \| [`Claim`](../interfaces/modules_claims.Claim.md)\>

Retrieve claim with given id.

```typescript
const claimId = '7281a130-e2b1-430d-8c14-201010eae901';
claimsService.getClaimById(claimId);
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `claimId` | `string` | claim id |

#### Returns

`Promise`<`undefined` \| [`Claim`](../interfaces/modules_claims.Claim.md)\>

claim with given id

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

▸ **getClaimsByIssuer**(`options`): `Promise`<[`Claim`](../interfaces/modules_claims.Claim.md)[]\>

Retrieve claims issued by a given issuer with allowing filter by status and parent namespace.

```typescript
claimsService.getClaimsByIssuer({
    did: 'did:ethr:0x00...0',
    isAccepted: false,
    namespace: 'energyweb.iam.ewc',
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`GetClaimsByIssuerOptions`](../interfaces/modules_claims.GetClaimsByIssuerOptions.md) | object containing options |

#### Returns

`Promise`<[`Claim`](../interfaces/modules_claims.Claim.md)[]\>

list of claims

___

### getClaimsByRequester

▸ **getClaimsByRequester**(`options`): `Promise`<[`Claim`](../interfaces/modules_claims.Claim.md)[]\>

Retrieve claims requested by a given requester with allowing filter by status and parent namespace.

```typescript
claimsService.getClaimsByRequester({
    did: 'did:ethr:0x00...0',
    isAccepted: false,
    namespace: 'energyweb.iam.ewc',
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`GetClaimsByRequesterOptions`](../interfaces/modules_claims.GetClaimsByRequesterOptions.md) | object containing options |

#### Returns

`Promise`<[`Claim`](../interfaces/modules_claims.Claim.md)[]\>

list of claims

___

### getClaimsBySubject

▸ **getClaimsBySubject**(`options`): `Promise`<[`Claim`](../interfaces/modules_claims.Claim.md)[]\>

Retrieve claims for given subject with allowing filter by status and parent namespace.

```typescript
claimsService.getClaimsBySubject({
    did: 'did:ethr:0x00...0',
    isAccepted: false,
    namespace: 'energyweb.iam.ewc',
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`GetClaimsBySubjectOptions`](../interfaces/modules_claims.GetClaimsBySubjectOptions.md) | object containing options |

#### Returns

`Promise`<[`Claim`](../interfaces/modules_claims.Claim.md)[]\>

list of claims

___

### getClaimsBySubjects

▸ **getClaimsBySubjects**(`subjects`): `Promise`<[`Claim`](../interfaces/modules_claims.Claim.md)[]\>

Retrieve claims related to a given subjects.

```typescript
claimsService.getClaimsBySubjects(['did:ethr:0x00...0', 'did:ethr:0x00...1', ...]);
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `subjects` | `string`[] | list of subjects |

#### Returns

`Promise`<[`Claim`](../interfaces/modules_claims.Claim.md)[]\>

list of claims

___

### getNamespaceFromClaimType

▸ **getNamespaceFromClaimType**(`claimType`): `string`

Get `namespace` from claim type.

```typescript
claimsService.getNamespaceFromClaimType(
    'email.roles.energyweb.iam.ewc'
);
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `claimType` | `string` | Private key of the delegate in hexadecimal format |

#### Returns

`string`

Namespace of given claim type

___

### getUserClaims

▸ **getUserClaims**(`options`): `Promise`<`IServiceEndpoint` & [`ClaimData`](../interfaces/modules_did_registry.ClaimData.md)[]\>

Get published off-chain claims of the given subject.

```typescript
claimsService.getUserClaims({
    did: 'did:ethr:0x00...0',
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`GetUserClaimsOptions`](../interfaces/modules_claims.GetUserClaimsOptions.md) | object containing options |

#### Returns

`Promise`<`IServiceEndpoint` & [`ClaimData`](../interfaces/modules_did_registry.ClaimData.md)[]\>

Claims containing DID document service endpoints

___

### hasOnChainRole

▸ **hasOnChainRole**(`did`, `role`, `version`): `Promise`<`boolean`\>

A utility function to check the blockchain directly if a DID has a role.

```typescript
claimsService.hasOnChainRole('did:ethr:ewc:0x00...0', 'email.roles.iam.ewc', 1);
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `did` | `string` | The ethr DID to check |
| `role` | `string` | The role to check (the full namespace) |
| `version` | `number` | The version to check |

#### Returns

`Promise`<`boolean`\>

`true` if DID has role at the version. `false` if not.

___

### init

▸ **init**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

___

### isClaimRevoked

▸ **isClaimRevoked**(`options`): `Promise`<`boolean`\>

Check if On-Chain claim is revoked.

```typescript
claimsService.isClaimRevoked({
    claim: {
        namespace: 'root.roles.energyweb.iam.ewc',
        subject: 'did:ethr:volta:0x00...0',
    },
});
```
or
```typescript
claimsService.isClaimRevoked({
    claimId: claim.id,
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`IsClaimRevokedOptions`](../interfaces/modules_claims.IsClaimRevokedOptions.md) | object containing options |

#### Returns

`Promise`<`boolean`\>

true if claim is revoked

___

### issueClaim

▸ **issueClaim**(`options`): `Promise`<`undefined` \| `string`\>

Issue claim without previous request. Option available for issuers only.

```typescript
claimsService.issueClaim({
    claim: {
         claimType: 'email.roles.energyweb.iam.ewc',
         claimTypeVersion: 1,
         issuerFields: [{key: 'foo', value: 'bar'}],
    };
    subject: 'did:ethr:0x00...0',
    registrationTypes: [RegistrationTypes.OnChain, RegistrationTypes.OffChain]
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`IssueClaimOptions`](../interfaces/modules_claims.IssueClaimOptions.md) | object containing options |

#### Returns

`Promise`<`undefined` \| `string`\>

Issued token if registrationTypes includes RegistrationTypes.OffChain

___

### issueClaimRequest

▸ **issueClaimRequest**(`options`): `Promise`<`void`\>

Issue a claim request by signing both off-chain and on-chain request and persisting result to the cache-server.
Optionally, issue on-chain role can be submitted to the ClaimManager contract as well.

```typescript
const claim: Claim = await claimsService.getClaimById('7281a130-e2b1-430d-8c14-201010eae901');
claimsService.issueClaimRequest({
    requester: claim.requester,
    token: claim.token,
    id: claim.id,
    subjectAgreement: claim.subjectAgreement,
    registrationTypes: claim.registrationTypes;
    issuerFields: [{key: 'foo', value: 'bar'}],
    publishOnChain: false,
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`IssueClaimRequestOptions`](../interfaces/modules_claims.IssueClaimRequestOptions.md) | object containing options |

#### Returns

`Promise`<`void`\>

___

### publishPublicClaim

▸ **publishPublicClaim**(`options`): `Promise`<`undefined` \| `string`\>

Register role to claim manager contract if registrationTypes includes RegistrationTypes.OnChain
Publish role to IPFS and add DID document service if registrationTypes includes RegistrationTypes.OffChain

```typescript
const claim: Claim = await claimsService.getClaimById('7281a130-e2b1-430d-8c14-201010eae901');
claimsService.publishPublicClaim({
    claim: {
         token: claim.token,
         claimType: claim.claimType,
    };
    registrationTypes: claim.registrationTypes,
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`PublishPublicClaimOptions`](../interfaces/modules_claims.PublishPublicClaimOptions.md) | object containing options |

#### Returns

`Promise`<`undefined` \| `string`\>

URl to IPFS if registrationTypes includes RegistrationTypes.OffChain

___

### registerOnchain

▸ **registerOnchain**(`claim`): `Promise`<`void`\>

Register issued on-chain claim on Claim Manager contract.

```typescript
const claim: Claim = await claimsService.getClaimById('7281a130-e2b1-430d-8c14-201010eae901');
claimsService.registerOnchain({
    claimType: claim.claimType,
    claimTypeVersion: claim.claimTypeVersion,
    subjectAgreement: claim.subjectAgreement,
    onChainProof: claim.onChainProof,
    acceptedBy: claim.acceptedBy;
    subject: claim.subject,
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `claim` | [`RegisterOnchainOptions`](../interfaces/modules_claims.RegisterOnchainOptions.md) | object containing options |

#### Returns

`Promise`<`void`\>

___

### rejectClaimRequest

▸ **rejectClaimRequest**(`options`): `Promise`<`void`\>

Reject claim request.

```typescript
const claim: Claim = await claimsService.getClaimById('7281a130-e2b1-430d-8c14-201010eae901');
claimsService.rejectClaimRequest({
    id: claim.id,
    requesterDID: claim.requester,
    rejectionReason: 'some reason',
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`RejectClaimRequestOptions`](../interfaces/modules_claims.RejectClaimRequestOptions.md) | object containing options |

#### Returns

`Promise`<`void`\>

___

### revokeClaim

▸ **revokeClaim**(`options`): `Promise`<`boolean`\>

Revoke On-Chain issued claim by `claimId` or given `namespace` and `subject`. Required `claimId` or `claim` parameters.

```typescript
claimsService.revokeClaim({
    claim: {
        namespace: 'root.roles.energyweb.iam.ewc',
        subject: 'did:ethr:volta:0x00...0',
    },
    registrationTypes = [RegistrationTypes.OnChain, RegistrationTypes.OffChain],
});
```
or
```typescript
claimsService.revokeClaim({
    claimId: claim.id,
    registrationTypes = [RegistrationTypes.OnChain, RegistrationTypes.OffChain],
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`RevokeClaimOptions`](../interfaces/modules_claims.RevokeClaimOptions.md) | object containing options |

#### Returns

`Promise`<`boolean`\>

true if claim was revoked

___

### revokeMultipleClaim

▸ **revokeMultipleClaim**(`options`): `Promise`<`void`\>

Revoke On-Chain issued claims of the given namespace for multiple subjects. Namespace must be the same for all subjects.
Specify `claims` or `claimIds` parameters.

```typescript
claimsService.revokeMultipleClaim({
    claims: [{
        namespace: 'root.roles.energyweb.iam.ewc',
        subject: 'did:ethr:volta:0x00...0',
        registrationTypes = [RegistrationTypes.OnChain, RegistrationTypes.OffChain],
    },
    {
        namespace: 'root.roles.energyweb.iam.ewc',
        subject: 'did:ethr:volta:0x00...1',
        registrationTypes = [RegistrationTypes.OnChain],
    }],
});
```
or
```typescript
claimsService.revokeMultipleClaim({
    claimIds: ['245a40a9...776071ca57cec', '245a40a9...776071ca57cec'],
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`RevokeMultipleClaimOptions`](../interfaces/modules_claims.RevokeMultipleClaimOptions.md) | object containing options |

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
