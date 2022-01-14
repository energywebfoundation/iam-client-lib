# Class: DidRegistry

[modules/didRegistry/didRegistry.service](../modules/modules_didRegistry_didRegistry_service.md).DidRegistry

## Table of contents

### Constructors

- [constructor](modules_didRegistry_didRegistry_service.DidRegistry.md#constructor)

### Accessors

- [ipfsStore](modules_didRegistry_didRegistry_service.DidRegistry.md#ipfsstore)
- [jwt](modules_didRegistry_didRegistry_service.DidRegistry.md#jwt)

### Methods

- [createDocument](modules_didRegistry_didRegistry_service.DidRegistry.md#createdocument)
- [createPublicClaim](modules_didRegistry_didRegistry_service.DidRegistry.md#createpublicclaim)
- [decodeJWTToken](modules_didRegistry_didRegistry_service.DidRegistry.md#decodejwttoken)
- [getDidDocument](modules_didRegistry_didRegistry_service.DidRegistry.md#getdiddocument)
- [init](modules_didRegistry_didRegistry_service.DidRegistry.md#init)
- [issuePublicClaim](modules_didRegistry_didRegistry_service.DidRegistry.md#issuepublicclaim)
- [revokeDidDocument](modules_didRegistry_didRegistry_service.DidRegistry.md#revokediddocument)
- [updateDocument](modules_didRegistry_didRegistry_service.DidRegistry.md#updatedocument)
- [verifyPublicClaim](modules_didRegistry_didRegistry_service.DidRegistry.md#verifypublicclaim)
- [connect](modules_didRegistry_didRegistry_service.DidRegistry.md#connect)

## Constructors

### constructor

• **new DidRegistry**(`_signerService`, `_cacheClient`, `_assetsService`, `_ipfsUrl?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `_signerService` | [`SignerService`](modules_signer_signer_service.SignerService.md) | `undefined` |
| `_cacheClient` | [`CacheClient`](modules_cacheClient_cacheClient_service.CacheClient.md) | `undefined` |
| `_assetsService` | [`AssetsService`](modules_assets_assets_service.AssetsService.md) | `undefined` |
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
| `__namedParameters.data` | [`ClaimData`](../interfaces/modules_didRegistry_did_types.ClaimData.md) |
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

▸ **getDidDocument**(`__namedParameters?`): `Promise`<`Object`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `undefined` \| { `did?`: `string` ; `includeClaims?`: `boolean`  } |

#### Returns

`Promise`<`Object`\>

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

▸ **updateDocument**(`__namedParameters`): `Promise`<`boolean`\>

**`description`** updates did document based on data provided

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.data` | `IUpdateData` |
| `__namedParameters.did?` | `string` |
| `__namedParameters.didAttribute` | `DIDAttribute` |
| `__namedParameters.validity?` | `number` |

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

▸ `Static` **connect**(`signerService`, `cacheClient`, `assetsService`, `ipfsUrl?`): `Promise`<[`DidRegistry`](modules_didRegistry_didRegistry_service.DidRegistry.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerService` | [`SignerService`](modules_signer_signer_service.SignerService.md) |
| `cacheClient` | [`CacheClient`](modules_cacheClient_cacheClient_service.CacheClient.md) |
| `assetsService` | [`AssetsService`](modules_assets_assets_service.AssetsService.md) |
| `ipfsUrl?` | `string` |

#### Returns

`Promise`<[`DidRegistry`](modules_didRegistry_didRegistry_service.DidRegistry.md)\>
