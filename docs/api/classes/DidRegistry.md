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
- [getDidDocument](DidRegistry.md#getdiddocument)
- [init](DidRegistry.md#init)
- [issuePublicClaim](DidRegistry.md#issuepublicclaim)
- [revokeDidDocument](DidRegistry.md#revokediddocument)
- [updateDocument](DidRegistry.md#updatedocument)
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
| `_ipfsUrl` | `string` | `"https://ipfs.infura.io:5001/api/v0/"` |

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

createPublicClaim

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

### getDidDocument

▸ **getDidDocument**(`__namedParameters?`): `Promise`<{ `service`: `IServiceEndpoint` & [`ClaimData`](../interfaces/ClaimData.md)[]  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `undefined` \| { `did?`: `string` ; `includeClaims?`: `boolean`  } |

#### Returns

`Promise`<{ `service`: `IServiceEndpoint` & [`ClaimData`](../interfaces/ClaimData.md)[]  }\>

___

### init

▸ **init**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

___

### issuePublicClaim

▸ **issuePublicClaim**(`__namedParameters`): `Promise`<`string`\>

issuePublicClaim

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

### revokeDidDocument

▸ **revokeDidDocument**(): `Promise`<`boolean`\>

revokeDidDocument

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

### verifyPublicClaim

▸ **verifyPublicClaim**(`token`, `iss`): `Promise`<``null`` \| `string`\>

verifyPublicClaim

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
