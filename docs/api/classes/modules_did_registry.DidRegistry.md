# Class: DidRegistry

[modules/did-registry](../modules/modules_did_registry.md).DidRegistry

Service responsible for handling the DID Document management.
See more information about DID in IAM stack [here](https://energy-web-foundation.gitbook.io/energy-web/foundational-concepts/self-sovereign-identity#decentralized-identifiers-dids).

```typescript
const { connectToCacheServer } = await initWithPrivateKeySigner(privateKey, rpcUrl);
const { connectToDidRegistry } = await connectToCacheServer();
const { didRegistry } = await connectToDidRegistry();
didRegistry.getDidDocument();
```

## Table of contents

### Constructors

- [constructor](modules_did_registry.DidRegistry.md#constructor)

### Accessors

- [identityOwner](modules_did_registry.DidRegistry.md#identityowner)
- [ipfsStore](modules_did_registry.DidRegistry.md#ipfsstore)
- [jwt](modules_did_registry.DidRegistry.md#jwt)
- [registrySettings](modules_did_registry.DidRegistry.md#registrysettings)

### Methods

- [createDocument](modules_did_registry.DidRegistry.md#createdocument)
- [createPublicClaim](modules_did_registry.DidRegistry.md#createpublicclaim)
- [decodeJWTToken](modules_did_registry.DidRegistry.md#decodejwttoken)
- [getDidDelegates](modules_did_registry.DidRegistry.md#getdiddelegates)
- [getDidDocument](modules_did_registry.DidRegistry.md#getdiddocument)
- [getDidPublicKeys](modules_did_registry.DidRegistry.md#getdidpublickeys)
- [getServices](modules_did_registry.DidRegistry.md#getservices)
- [init](modules_did_registry.DidRegistry.md#init)
- [issuePublicClaim](modules_did_registry.DidRegistry.md#issuepublicclaim)
- [revokeDidDocument](modules_did_registry.DidRegistry.md#revokediddocument)
- [updateDocument](modules_did_registry.DidRegistry.md#updatedocument)
- [updateSignedDidDelegate](modules_did_registry.DidRegistry.md#updatesigneddiddelegate)
- [updateSignedDidPublicKey](modules_did_registry.DidRegistry.md#updatesigneddidpublickey)
- [verifyPublicClaim](modules_did_registry.DidRegistry.md#verifypublicclaim)
- [connect](modules_did_registry.DidRegistry.md#connect)

## Constructors

### constructor

• **new DidRegistry**(`_signerService`, `_cacheClient`, `_assetsService`, `_ipfsConfig`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_signerService` | [`SignerService`](modules_signer.SignerService.md) |
| `_cacheClient` | [`CacheClient`](modules_cache_client.CacheClient.md) |
| `_assetsService` | [`AssetsService`](modules_assets.AssetsService.md) |
| `_ipfsConfig` | [`IpfsConfig`](../interfaces/modules_did_registry.IpfsConfig.md) |

## Accessors

### identityOwner

• `get` **identityOwner**(): `EwSigner`

#### Returns

`EwSigner`

___

### ipfsStore

• `get` **ipfsStore**(): `DidStore`

#### Returns

`DidStore`

___

### jwt

• `get` **jwt**(): `JWT`

#### Returns

`JWT`

___

### registrySettings

• `get` **registrySettings**(): `RegistrySettings`

#### Returns

`RegistrySettings`

## Methods

### createDocument

▸ **createDocument**(): `Promise`<`boolean`\>

Create DID document of the current user if not exists.

```typescript
didRegistry.createDocument();
```

#### Returns

`Promise`<`boolean`\>

true if document was created successfully

___

### createPublicClaim

▸ **createPublicClaim**(`options`): `Promise`<`string`\>

Create a public claim with provided data.

```typescript
didRegistry.createPublicClaim({
    data: {
        claimType: 'root.roles.energyweb.iam.ewc',
        claimTypeVersion: 1,
    },
    subject: 'did:ethr:volta:0x00...0',
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`CreatePublicClaimOptions`](../interfaces/modules_did_registry.CreatePublicClaimOptions.md) | object with options |

#### Returns

`Promise`<`string`\>

JWT token of created claim

___

### decodeJWTToken

▸ **decodeJWTToken**(`options`): `Promise`<`unknown`\>

Decode JWT token of the public claim.

```typescript
didRegistry.decodeJWTToken({
    token: 'eyJh...VCJ9.ey...IyfQ.SflK...sw5c',
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`DecodeJWTTokenOptions`](../interfaces/modules_did_registry.DecodeJWTTokenOptions.md) | object with options |

#### Returns

`Promise`<`unknown`\>

payload of the JWT token

___

### getDidDelegates

▸ **getDidDelegates**(`options?`): `Promise`<`undefined` \| `string`[]\>

Gets delegates from DID document of the given DID.

```typescript
didRegistry.getDidDelegates({
    did: 'did:ethr:volta:0x00...0',
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`GetDidDelegatesOptions`](../interfaces/modules_did_registry.GetDidDelegatesOptions.md) | object with options |

#### Returns

`Promise`<`undefined` \| `string`[]\>

list of delegates

___

### getDidDocument

▸ **getDidDocument**(`options?`): `Promise`<`IDIDDocument`\>

Retrieve DID Document of the given DID from SSI-Hub if possible, otherwise from blockchain.
Optionally include claims object within services in the document.

```typescript
didRegistry.getDidDocument({
    did: 'did:ethr:volta:0x00...0',
    includeClaims: true,
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`GetDIDDocumentOptions`](../interfaces/modules_did_registry.GetDIDDocumentOptions.md) | object with options |

#### Returns

`Promise`<`IDIDDocument`\>

DID document

___

### getDidPublicKeys

▸ **getDidPublicKeys**(`options?`): `Promise`<`IPublicKey`[]\>

Gets public keys from DID document of the given DID.

```typescript
didRegistry.getDidPublicKeys({
    did: 'did:ethr:volta:0x00...0',
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`GetDidPublicKeysOptions`](../interfaces/modules_did_registry.GetDidPublicKeysOptions.md) | object with options |

#### Returns

`Promise`<`IPublicKey`[]\>

list of public keys

___

### getServices

▸ **getServices**(`options?`): `Promise`<`IServiceEndpoint`[]\>

Gets services from DID document of the given DID.

```typescript
didRegistry.getServices({
    did: 'did:ethr:volta:0x00...0',
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`GetServicesOptions`](../interfaces/modules_did_registry.GetServicesOptions.md) | object with options |

#### Returns

`Promise`<`IServiceEndpoint`[]\>

list of claims

___

### init

▸ **init**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

___

### issuePublicClaim

▸ **issuePublicClaim**(`options`): `Promise`<`string`\>

If token provided issue new token signed by issuer,
otherwise create a new claim token based on provided public claim data.

```typescript
didRegistry.issuePublicClaim({
    token: 'eyJh...VCJ9.ey...IyfQ.SflK...sw5c',
    publicClaim: {
        did: 'did:ethr:volta:0x00...0',
        signer: 'did:ethr:volta:0x00...1',
        claimData: {
            claimType: 'root.roles.energyweb.iam.ewc',
        },
    },
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`IssuePublicClaimOptions`](../interfaces/modules_did_registry.IssuePublicClaimOptions.md) | object with options |

#### Returns

`Promise`<`string`\>

JWT token of created claim

___

### revokeDidDocument

▸ **revokeDidDocument**(): `Promise`<`boolean`\>

Revoke DID document of the current user.

```typescript
didRegistry.revokeDidDocument();
```

#### Returns

`Promise`<`boolean`\>

true if document was revoked successfully

___

### updateDocument

▸ **updateDocument**(`__namedParameters`): `Promise`<`boolean`\>

Update DID document of the given DID with provided data.

```typescript
didRegistry.updateDocument({
    didAttribute: DIDAttribute.PublicKey,
    data: publicKey,
    validity: 60 * 60 * 1000,
    did: 'did:ethr:volta:0x00...0',
});

@param {UpdateDocumentOptions} options object with options
@return true if document was updated successfully

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`UpdateDocumentOptions`](../interfaces/modules_did_registry.UpdateDocumentOptions.md) |

#### Returns

`Promise`<`boolean`\>

___

### updateSignedDidDelegate

▸ **updateSignedDidDelegate**(`__namedParameters`): `Promise`<`boolean`\>

Updates delegate of the DID document of given DID.

```typescript
didRegistry.updateSignedDidDelegate({
    did: 'did:ethr:volta:0x00...0',
    delegatePublicKey: delegatePublicKey,
    validity: 60 * 60 * 1000,
    algo: KeyType.Secp256k1,
    type: PubKeyType.SignatureAuthentication2018,
});

@param {UpdateSignedDidDelegateOptions} options object with options
@return true if document was updated successfully

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`UpdateSignedDidDelegateOptions`](../interfaces/modules_did_registry.UpdateSignedDidDelegateOptions.md) |

#### Returns

`Promise`<`boolean`\>

___

### updateSignedDidPublicKey

▸ **updateSignedDidPublicKey**(`__namedParameters`): `Promise`<`boolean`\>

Adds public key to the DID document of given DID.

```typescript
didRegistry.updateSignedDidPublicKey({
    did: 'did:ethr:volta:0x00...0',
    publicKey: publicKey,
    validity: 60 * 60 * 1000,
    algo: KeyType.Secp256k1,
    type: PubKeyType.SignatureAuthentication2018,
    tag: '#main-key',
});

@param {UpdateSignedDidPublicKeyOptions} options object with options
@return true if document was updated successfully

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`UpdateSignedDidPublicKeyOptions`](../interfaces/modules_did_registry.UpdateSignedDidPublicKeyOptions.md) |

#### Returns

`Promise`<`boolean`\>

___

### verifyPublicClaim

▸ **verifyPublicClaim**(`token`, `iss`): `Promise`<``null`` \| `string`\>

Verifies issued token of the public claim.

```typescript
didRegistry.verifyPublicClaim({
    token: 'eyJh...VCJ9.ey...IyfQ.SflK...sw5c',
    iss: 'did:ethr:volta:0x00...0',
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `token` | `string` | JWT token of the public claim |
| `iss` | `string` | DID of the issuer |

#### Returns

`Promise`<``null`` \| `string`\>

DID of the authenticated identity on successful verification or null otherwise

___

### connect

▸ `Static` **connect**(`signerService`, `cacheClient`, `assetsService`, `ipfsConfig`): `Promise`<[`DidRegistry`](modules_did_registry.DidRegistry.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerService` | [`SignerService`](modules_signer.SignerService.md) |
| `cacheClient` | [`CacheClient`](modules_cache_client.CacheClient.md) |
| `assetsService` | [`AssetsService`](modules_assets.AssetsService.md) |
| `ipfsConfig` | [`IpfsConfig`](../interfaces/modules_did_registry.IpfsConfig.md) |

#### Returns

`Promise`<[`DidRegistry`](modules_did_registry.DidRegistry.md)\>
