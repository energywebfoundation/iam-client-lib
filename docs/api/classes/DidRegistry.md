# Class: DidRegistry

## Table of contents

### Constructors

- [constructor](DidRegistry.md#constructor)

### Accessors

- [ipfsStore](DidRegistry.md#ipfsstore)
- [jwt](DidRegistry.md#jwt)

### Methods

- [createDocument](DidRegistry.md#createdocument)
- [createPublicClaim](DidRegistry.md#createpublicclaim)
- [decodeJWTToken](DidRegistry.md#decodejwttoken)
- [getDidDelegates](DidRegistry.md#getdiddelegates)
- [getDidDocument](DidRegistry.md#getdiddocument)
- [getDidPublicKeys](DidRegistry.md#getdidpublickeys)
- [init](DidRegistry.md#init)
- [issuePublicClaim](DidRegistry.md#issuepublicclaim)
- [readServices](DidRegistry.md#readservices)
- [revokeDidDocument](DidRegistry.md#revokediddocument)
- [updateDocument](DidRegistry.md#updatedocument)
- [updateSignedDidDelegate](DidRegistry.md#updatesigneddiddelegate)
- [updateSignedDidPublicKey](DidRegistry.md#updatesigneddidpublickey)
- [verifyPublicClaim](DidRegistry.md#verifypublicclaim)
- [connect](DidRegistry.md#connect)

## Constructors

### constructor

• **new DidRegistry**(`_signerService`, `_cacheClient`, `_assetsService`, `_ipfsUrl?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `_signerService` | [`SignerService`](SignerService.md) | `undefined` |
| `_cacheClient` | [`CacheClient`](CacheClient.md) | `undefined` |
| `_assetsService` | [`AssetsService`](AssetsService.md) | `undefined` |
| `_ipfsUrl` | `string` | `'https://ipfs.infura.io:5001/api/v0/'` |

## Accessors

### ipfsStore

• `get` **ipfsStore**(): `DidStore`

#### Returns

`DidStore`

___

### jwt

• `get` **jwt**(): `JWT`

#### Returns

`JWT`

## Methods

### createDocument

▸ **createDocument**(): `Promise`<`boolean`\>

**`description`** create did document if not exists

#### Returns

`Promise`<`boolean`\>

true if document is created successfully

___

### createPublicClaim

▸ **createPublicClaim**(`__namedParameters`): `Promise`<`string`\>

**`description`** create a public claim based on data provided

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.data` | [`ClaimData`](../interfaces/ClaimData.md) |
| `__namedParameters.subject?` | `string` |

#### Returns

`Promise`<`string`\>

JWT token of created claim

___

### decodeJWTToken

▸ **decodeJWTToken**(`__namedParameters`): `Promise`<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.token` | `string` |

#### Returns

`Promise`<`unknown`\>

___

### getDidDelegates

▸ **getDidDelegates**(`__namedParameters`): `Promise`<`undefined` \| `string`[]\>

**`description`** get public keys from DID's document

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |

#### Returns

`Promise`<`undefined` \| `string`[]\>

list of DID's delegates

___

### getDidDocument

▸ **getDidDocument**(`__namedParameters?`): `Promise`<{ `service`: `IServiceEndpoint` & [`ClaimData`](../interfaces/ClaimData.md)[]  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `undefined` \| { `did?`: `string` ; `includeClaims?`: `boolean`  } |

#### Returns

`Promise`<{ `service`: `IServiceEndpoint` & [`ClaimData`](../interfaces/ClaimData.md)[]  }\>

___

### getDidPublicKeys

▸ **getDidPublicKeys**(`__namedParameters`): `Promise`<`IPublicKey`[]\>

**`description`** get public keys from User's DID document

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |

#### Returns

`Promise`<`IPublicKey`[]\>

list of public keys

___

### init

▸ **init**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

___

### issuePublicClaim

▸ **issuePublicClaim**(`__namedParameters`): `Promise`<`string`\>

**`description`** issue a public claim

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.publicClaim?` | `IPublicClaim` |
| `__namedParameters.token?` | `string` |

#### Returns

`Promise`<`string`\>

return issued token

___

### readServices

▸ **readServices**(`__namedParameters?`): `Promise`<`IServiceEndpoint` & [`ClaimData`](../interfaces/ClaimData.md)[]\>

**`description`** gets list of services endpoints from User's DID document

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `undefined` \| { `did?`: `string`  } |

#### Returns

`Promise`<`IServiceEndpoint` & [`ClaimData`](../interfaces/ClaimData.md)[]\>

list of claims

___

### revokeDidDocument

▸ **revokeDidDocument**(): `Promise`<`boolean`\>

**`description`** revokes did document

#### Returns

`Promise`<`boolean`\>

information (true/false) if the DID document was revoked

___

### updateDocument

▸ **updateDocument**(`options`): `Promise`<`boolean`\>

**`description`** updates did document based on data provided

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | Options to connect with blockchain |
| `options.data` | `IUpdateData` | New attribute value |
| `options.did?` | `string` | Asset did to be updated |
| `options.didAttribute` | `DIDAttribute` | Type of document to be updated |
| `options.validity?` | `number` | Time (s) for the attribute to expire |

#### Returns

`Promise`<`boolean`\>

true if document is updated successfuly

___

### updateSignedDidDelegate

▸ **updateSignedDidDelegate**(`__namedParameters`): `Promise`<`boolean`\>

**`description`** updates delegate of the document of controlled `did`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.algo` | `KeyType` |
| `__namedParameters.delegatePublicKey` | `string` |
| `__namedParameters.did` | `string` |
| `__namedParameters.type` | `PubKeyType` |
| `__namedParameters.validity?` | `number` |

#### Returns

`Promise`<`boolean`\>

true if document is updated successfuly

___

### updateSignedDidPublicKey

▸ **updateSignedDidPublicKey**(`__namedParameters`): `Promise`<`boolean`\>

**`description`** Adds public key to the document of controlled `did`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.algo` | `KeyType` |
| `__namedParameters.did` | `string` |
| `__namedParameters.publicKey` | `string` |
| `__namedParameters.tag` | `string` |
| `__namedParameters.type` | `PubKeyType` |
| `__namedParameters.validity?` | `number` |

#### Returns

`Promise`<`boolean`\>

true if document is updated successfuly

___

### verifyPublicClaim

▸ **verifyPublicClaim**(`token`, `iss`): `Promise`<``null`` \| `string`\>

**`description`** verifies issued token of claim

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `string` |
| `iss` | `string` |

#### Returns

`Promise`<``null`` \| `string`\>

public claim data

___

### connect

▸ `Static` **connect**(`signerService`, `cacheClient`, `assetsService`, `ipfsUrl?`): `Promise`<[`DidRegistry`](DidRegistry.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerService` | [`SignerService`](SignerService.md) |
| `cacheClient` | [`CacheClient`](CacheClient.md) |
| `assetsService` | [`AssetsService`](AssetsService.md) |
| `ipfsUrl?` | `string` |

#### Returns

`Promise`<[`DidRegistry`](DidRegistry.md)\>
