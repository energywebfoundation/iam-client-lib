# Class: VerifiableCredentialsServiceBase

[modules/verifiable-credentials](../modules/modules_verifiable_credentials.md).VerifiableCredentialsServiceBase

Service responsible for managing verifiable credentials and presentations.
You can read more about verifiable credentials data model [here](https://www.w3.org/TR/vc-data-model/).

```typescript
const { connectToCacheServer } = await initWithPrivateKeySigner(privateKey, rpcUrl);
const { verifiableCredentialsService } = await connectToCacheServer();
verifiableCredentialsService.createRoleVC(...);
```

## Table of contents

### Constructors

- [constructor](modules_verifiable_credentials.VerifiableCredentialsServiceBase.md#constructor)

### Methods

- [continueExchange](modules_verifiable_credentials.VerifiableCredentialsServiceBase.md#continueexchange)
- [createPresentation](modules_verifiable_credentials.VerifiableCredentialsServiceBase.md#createpresentation)
- [createRoleVC](modules_verifiable_credentials.VerifiableCredentialsServiceBase.md#createrolevc)
- [createVerifiablePresentation](modules_verifiable_credentials.VerifiableCredentialsServiceBase.md#createverifiablepresentation)
- [init](modules_verifiable_credentials.VerifiableCredentialsServiceBase.md#init)
- [initiateExchange](modules_verifiable_credentials.VerifiableCredentialsServiceBase.md#initiateexchange)
- [isRevoked](modules_verifiable_credentials.VerifiableCredentialsServiceBase.md#isrevoked)
- [revocationCredentialDetails](modules_verifiable_credentials.VerifiableCredentialsServiceBase.md#revocationcredentialdetails)
- [revokeCredential](modules_verifiable_credentials.VerifiableCredentialsServiceBase.md#revokecredential)
- [verify](modules_verifiable_credentials.VerifiableCredentialsServiceBase.md#verify)
- [create](modules_verifiable_credentials.VerifiableCredentialsServiceBase.md#create)

## Constructors

### constructor

• **new VerifiableCredentialsServiceBase**(`_signerService`, `_domainsService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_signerService` | [`SignerService`](modules_signer.SignerService.md) |
| `_domainsService` | [`DomainsService`](modules_domains.DomainsService.md) |

## Methods

### continueExchange

▸ **continueExchange**(`__namedParameters`): `Promise`<`undefined` \| `VerifiablePresentation` \| `VpRequest`\>

**`description`** Sends credentials requested by issuer and returns either issued credentials or next credentials request

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `ContinueExchangeCredentials`<[`RoleCredentialSubject`](../interfaces/modules_verifiable_credentials.RoleCredentialSubject.md)\> |

#### Returns

`Promise`<`undefined` \| `VerifiablePresentation` \| `VpRequest`\>

issued credentials or request of additional credentials

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

### init

▸ **init**(`ewSigner`, `claimService`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ewSigner` | `EwSigner` |
| `claimService` | [`ClaimsService`](modules_claims.ClaimsService.md) |

#### Returns

`Promise`<`void`\>

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

▸ **isRevoked**<`T`\>(`credential`, `onlyValid?`): `Promise`<`boolean`\>

Fetch a given verifiable credential revocation details.

```typescript
await verifiableCredentialsService.revocationCredentialDetails(credential);
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`RoleCredentialSubject`](../interfaces/modules_verifiable_credentials.RoleCredentialSubject.md)<`T`\> |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `credential` | `VerifiableCredential`<`T`\> | `undefined` | verifiable credential |
| `onlyValid` | `boolean` | `true` | if true, only valid revocation are checked |

#### Returns

`Promise`<`boolean`\>

revocation credential details

___

### revocationCredentialDetails

▸ **revocationCredentialDetails**<`T`\>(`credential`, `onlyValid?`): `Promise`<[`RevocationCredentialDetailsResults`](../interfaces/modules_verifiable_credentials.RevocationCredentialDetailsResults.md)[]\>

Fetch a given verifiable credential revocation details.

```typescript
await verifiableCredentialsService.revocationCredentialDetails(credential);
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`RoleCredentialSubject`](../interfaces/modules_verifiable_credentials.RoleCredentialSubject.md)<`T`\> |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `credential` | `VerifiableCredential`<`T`\> | `undefined` | verifiable credential |
| `onlyValid` | `boolean` | `true` | if true, only valid revocation are returned |

#### Returns

`Promise`<[`RevocationCredentialDetailsResults`](../interfaces/modules_verifiable_credentials.RevocationCredentialDetailsResults.md)[]\>

revocation credential details

___

### revokeCredential

▸ **revokeCredential**<`T`\>(`credential`): `Promise`<`boolean`\>

Revoke a given verifiable credential.

```typescript
await verifiableCredentialsService.revokeCredential(credential);
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`RoleCredentialSubject`](../interfaces/modules_verifiable_credentials.RoleCredentialSubject.md)<`T`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `credential` | `VerifiableCredential`<`T`\> | verifiable credential |

#### Returns

`Promise`<`boolean`\>

true if the credential was revoked

___

### verify

▸ **verify**<`T`\>(`vp`, `options?`): `Promise`<`boolean`\>

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
| `vp` | `VerifiablePresentation` \| `VerifiableCredential`<`T`\> | verifiable presentation or credential |
| `options?` | [`ProofOptions`](../interfaces/modules_verifiable_credentials.ProofOptions.md) | proof options |

#### Returns

`Promise`<`boolean`\>

true if the proof is valid

___

### create

▸ `Static` **create**(`signerService`, `domainsService`): `Promise`<[`VerifiableCredentialsServiceBase`](modules_verifiable_credentials.VerifiableCredentialsServiceBase.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerService` | [`SignerService`](modules_signer.SignerService.md) |
| `domainsService` | [`DomainsService`](modules_domains.DomainsService.md) |

#### Returns

`Promise`<[`VerifiableCredentialsServiceBase`](modules_verifiable_credentials.VerifiableCredentialsServiceBase.md)\>
