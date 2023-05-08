# Class: VerifiableCredentialsServiceBase

[modules/verifiable-credentials](../modules/modules_verifiable_credentials.md).VerifiableCredentialsServiceBase

Service responsible for managing verifiable credentials and presentations.
You can read more about verifiable credentials data model [here](https://www.w3.org/TR/vc-data-model/).

```typescript
const { verifiableCredentialsService } = await initWithPrivateKeySigner(privateKey, rpcUrl);
verifiableCredentialsService.createRoleVC(...);
```

## Table of contents

### Constructors

- [constructor](modules_verifiable_credentials.VerifiableCredentialsServiceBase.md#constructor)

### Methods

- [continueExchange](modules_verifiable_credentials.VerifiableCredentialsServiceBase.md#continueexchange)
- [createCredential](modules_verifiable_credentials.VerifiableCredentialsServiceBase.md#createcredential)
- [createPresentation](modules_verifiable_credentials.VerifiableCredentialsServiceBase.md#createpresentation)
- [createRoleVC](modules_verifiable_credentials.VerifiableCredentialsServiceBase.md#createrolevc)
- [createVerifiablePresentation](modules_verifiable_credentials.VerifiableCredentialsServiceBase.md#createverifiablepresentation)
- [getCredentialsByDefinition](modules_verifiable_credentials.VerifiableCredentialsServiceBase.md#getcredentialsbydefinition)
- [initiateExchange](modules_verifiable_credentials.VerifiableCredentialsServiceBase.md#initiateexchange)
- [isRevoked](modules_verifiable_credentials.VerifiableCredentialsServiceBase.md#isrevoked)
- [revocationDetails](modules_verifiable_credentials.VerifiableCredentialsServiceBase.md#revocationdetails)
- [revokeCredential](modules_verifiable_credentials.VerifiableCredentialsServiceBase.md#revokecredential)
- [verify](modules_verifiable_credentials.VerifiableCredentialsServiceBase.md#verify)
- [create](modules_verifiable_credentials.VerifiableCredentialsServiceBase.md#create)

## Constructors

### constructor

• **new VerifiableCredentialsServiceBase**(`_signerService`, `_cacheClient`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_signerService` | [`SignerService`](modules_signer.SignerService.md) |
| `_cacheClient` | [`CacheClient`](modules_cache_client.CacheClient.md) |

## Methods

### continueExchange

▸ **continueExchange**(`«destructured»`): `Promise`<`undefined` \| `VerifiablePresentation` \| `VpRequest`\>

**`Description`**

Sends credentials requested by issuer and returns either issued credentials or next credentials request

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `ContinueExchangeCredentials`<[`RoleCredentialSubject`](../interfaces/modules_verifiable_credentials.RoleCredentialSubject.md)\> |

#### Returns

`Promise`<`undefined` \| `VerifiablePresentation` \| `VpRequest`\>

issued credentials or request of additional credentials

___

### createCredential

▸ **createCredential**(`params`): `Credential`<[`RoleCredentialSubject`](../interfaces/modules_verifiable_credentials.RoleCredentialSubject.md)\>

Create a credential with given parameters.

```typescript
await verifiableCredentialsService.createCredential({
    id: 'did:ethr:ewc:0x...00',
    namespace: 'root.energyweb.iam.ewc',
    version: '1',
    issuerFields: [],
    expirationDate: new Date(),
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | [`RoleCredentialSubjectParams`](../interfaces/modules_verifiable_credentials.RoleCredentialSubjectParams.md) | verifiable credential parameters |

#### Returns

`Credential`<[`RoleCredentialSubject`](../interfaces/modules_verifiable_credentials.RoleCredentialSubject.md)\>

Energy Web credential

___

### createPresentation

▸ **createPresentation**(`verifiableCredential`, `options?`): `Presentation`

Create a presentation with given verifiable credentials. Allow create presentation for a given presentation definition.

```typescript
verifiableCredentialsService.createPresentation([...credentials]);
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `verifiableCredential` | `VerifiableCredential`<[`RoleCredentialSubject`](../interfaces/modules_verifiable_credentials.RoleCredentialSubject.md)\>[] | role credential parameters |
| `options?` | [`CreatePresentationParams`](../interfaces/modules_verifiable_credentials.CreatePresentationParams.md) | presentation options |

#### Returns

`Presentation`

presentation

___

### createRoleVC

▸ **createRoleVC**(`credentialParams`, `proofOptions?`): `Promise`<`VerifiableCredential`<[`RoleCredentialSubject`](../interfaces/modules_verifiable_credentials.RoleCredentialSubject.md)\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `credentialParams` | [`RoleCredentialSubjectParams`](../interfaces/modules_verifiable_credentials.RoleCredentialSubjectParams.md) |
| `proofOptions?` | [`ProofOptions`](../interfaces/modules_verifiable_credentials.ProofOptions.md) |

#### Returns

`Promise`<`VerifiableCredential`<[`RoleCredentialSubject`](../interfaces/modules_verifiable_credentials.RoleCredentialSubject.md)\>\>

___

### createVerifiablePresentation

▸ **createVerifiablePresentation**(`verifiableCredential`, `options?`): `Promise`<`VerifiablePresentation`\>

Create a verifiable presentation with given verifiable credentials and EIP712 signature.

```typescript
verifiableCredentialsService.createVerifiablePresentation([...credentials]);
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `verifiableCredential` | `VerifiableCredential`<[`RoleCredentialSubject`](../interfaces/modules_verifiable_credentials.RoleCredentialSubject.md)\>[] | role credential parameters |
| `options?` | [`ProofOptions`](../interfaces/modules_verifiable_credentials.ProofOptions.md) | proof options |

#### Returns

`Promise`<`VerifiablePresentation`\>

verifiable presentation

___

### getCredentialsByDefinition

▸ **getCredentialsByDefinition**(`presentationDefinition`): `Promise`<`SelectResults`\>

Returns issued role verifiable credentials which matches definition.

```typescript
await verifiableCredentialsService.getCredentialsByDefinition(presentationDefinition);
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `presentationDefinition` | `IPresentationDefinition` | credential requirements |

#### Returns

`Promise`<`SelectResults`\>

results of matching each role verifiable credential to definition

___

### initiateExchange

▸ **initiateExchange**(`options`): `Promise`<`ContinueExchangeSelections`\>

Initialize credential exchange. Only vc-api exchanges currently supported.

```typescript
verifiableCredentialsService.initiateExchange({
    type: VC_API_EXCHANGE,
    url: 'http://localhost:3000',
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `ExchangeInvitation` | object with options |

#### Returns

`Promise`<`ContinueExchangeSelections`\>

credentials query with matching verifiable presentations

___

### isRevoked

▸ **isRevoked**(`credential`): `Promise`<`boolean`\>

Check if given verifiable credential is revoked.

```typescript
await verifiableCredentialsService.isRevoked(credential);
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `credential` | `VerifiableCredential`<[`RoleCredentialSubject`](../interfaces/modules_verifiable_credentials.RoleCredentialSubject.md)\> | verifiable credential |

#### Returns

`Promise`<`boolean`\>

true if credential is revoked

___

### revocationDetails

▸ **revocationDetails**(`credential`): `Promise`<``null`` \| [`CredentialRevocationDetailsResult`](../interfaces/modules_verifiable_credentials.CredentialRevocationDetailsResult.md)\>

Get the credentials revocation details.

```typescript
await verifiableCredentialsService.revocationDetails(credential);
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `credential` | `VerifiableCredential`<[`RoleCredentialSubject`](../interfaces/modules_verifiable_credentials.RoleCredentialSubject.md)\> | verifiable credential |

#### Returns

`Promise`<``null`` \| [`CredentialRevocationDetailsResult`](../interfaces/modules_verifiable_credentials.CredentialRevocationDetailsResult.md)\>

revoker and revocationTimeStamp for the revocation

___

### revokeCredential

▸ **revokeCredential**(`credential`): `Promise`<[`StatusList2021Credential`](../modules/modules_verifiable_credentials.md#statuslist2021credential)\>

Revoke given verifiable credential with StatusList2021.

```typescript
await verifiableCredentialsService.revokeCredential(credential);
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `credential` | `VerifiableCredential`<[`RoleCredentialSubject`](../interfaces/modules_verifiable_credentials.RoleCredentialSubject.md)\> | verifiable credential |

#### Returns

`Promise`<[`StatusList2021Credential`](../modules/modules_verifiable_credentials.md#statuslist2021credential)\>

StatusList2021Credential

___

### verify

▸ **verify**<`T`\>(`vcOrVp`, `options?`): `Promise`<`boolean`\>

Verify a given credential or presentation. Throws an error if the credential or presentation proof is not valid.

```typescript
await verifiableCredentialsService.verify(credential);
await verifiableCredentialsService.verify(presentation);
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `ICredentialSubject` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vcOrVp` | `VerifiablePresentation` \| `VerifiableCredential`<`T`\> | - |
| `options?` | [`ProofOptions`](../interfaces/modules_verifiable_credentials.ProofOptions.md) | proof options |

#### Returns

`Promise`<`boolean`\>

true if the proof is valid

___

### create

▸ `Static` **create**(`signerService`, `cacheClient`): `Promise`<[`VerifiableCredentialsServiceBase`](modules_verifiable_credentials.VerifiableCredentialsServiceBase.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerService` | [`SignerService`](modules_signer.SignerService.md) |
| `cacheClient` | [`CacheClient`](modules_cache_client.CacheClient.md) |

#### Returns

`Promise`<[`VerifiableCredentialsServiceBase`](modules_verifiable_credentials.VerifiableCredentialsServiceBase.md)\>
