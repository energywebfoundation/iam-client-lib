# Class: SignerService

[modules/signer/signer.service](../modules/modules_signer_signer_service.md).SignerService

## Table of contents

### Constructors

- [constructor](modules_signer_signer_service.SignerService.md#constructor)

### Accessors

- [address](modules_signer_signer_service.SignerService.md#address)
- [chainId](modules_signer_signer_service.SignerService.md#chainid)
- [provider](modules_signer_signer_service.SignerService.md#provider)
- [providerType](modules_signer_signer_service.SignerService.md#providertype)
- [signer](modules_signer_signer_service.SignerService.md#signer)

### Methods

- [balance](modules_signer_signer_service.SignerService.md#balance)
- [clearSession](modules_signer_signer_service.SignerService.md#clearsession)
- [connect](modules_signer_signer_service.SignerService.md#connect)
- [destroy](modules_signer_signer_service.SignerService.md#destroy)
- [init](modules_signer_signer_service.SignerService.md#init)
- [initEventHandlers](modules_signer_signer_service.SignerService.md#initeventhandlers)
- [onInit](modules_signer_signer_service.SignerService.md#oninit)
- [publicKey](modules_signer_signer_service.SignerService.md#publickey)
- [publicKeyAndIdentityToken](modules_signer_signer_service.SignerService.md#publickeyandidentitytoken)
- [send](modules_signer_signer_service.SignerService.md#send)
- [signMessage](modules_signer_signer_service.SignerService.md#signmessage)

## Constructors

### constructor

• **new SignerService**(`_signer`, `_providerType`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_signer` | `Required`<`Signer`\> |
| `_providerType` | [`ProviderType`](../enums/modules_signer_signer_types.ProviderType.md) |

## Accessors

### address

• `get` **address**(): `string`

#### Returns

`string`

___

### chainId

• `get` **chainId**(): `number`

#### Returns

`number`

___

### provider

• `get` **provider**(): `Provider`

#### Returns

`Provider`

___

### providerType

• `get` **providerType**(): [`ProviderType`](../enums/modules_signer_signer_types.ProviderType.md)

#### Returns

[`ProviderType`](../enums/modules_signer_signer_types.ProviderType.md)

___

### signer

• `get` **signer**(): `Required`<`Signer`\>

#### Returns

`Required`<`Signer`\>

## Methods

### balance

▸ **balance**(): `Promise`<`BigNumber`\>

#### Returns

`Promise`<`BigNumber`\>

___

### clearSession

▸ **clearSession**(): `void`

#### Returns

`void`

___

### connect

▸ **connect**(`signer`, `providerType`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `signer` | `Required`<`Signer`\> |
| `providerType` | [`ProviderType`](../enums/modules_signer_signer_types.ProviderType.md) |

#### Returns

`Promise`<`void`\>

___

### destroy

▸ **destroy**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

___

### init

▸ **init**(): `Promise`<[`AccountInfo`](../modules/modules_signer_signer_types.md#accountinfo)\>

#### Returns

`Promise`<[`AccountInfo`](../modules/modules_signer_signer_types.md#accountinfo)\>

___

### initEventHandlers

▸ **initEventHandlers**(): `void`

Add event handler for certain events

**`requires`** to be called after the connection to wallet was initialized

#### Returns

`void`

___

### onInit

▸ **onInit**(`initializer`): `void`

Registers reinitialization of dependent service on signer reconnection

#### Parameters

| Name | Type |
| :------ | :------ |
| `initializer` | [`ServiceInitializer`](../modules/modules_signer_signer_service.md#serviceinitializer) |

#### Returns

`void`

___

### publicKey

▸ **publicKey**(): `Promise`<`string`\>

#### Returns

`Promise`<`string`\>

___

### publicKeyAndIdentityToken

▸ **publicKeyAndIdentityToken**(): `Promise`<[`IPubKeyAndIdentityToken`](../interfaces/modules_signer_signer_types.IPubKeyAndIdentityToken.md)\>

#### Returns

`Promise`<[`IPubKeyAndIdentityToken`](../interfaces/modules_signer_signer_types.IPubKeyAndIdentityToken.md)\>

___

### send

▸ **send**(`__namedParameters`): `Promise`<`TransactionReceipt`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `TransactionRequest` |

#### Returns

`Promise`<`TransactionReceipt`\>

___

### signMessage

▸ **signMessage**(`message`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `Uint8Array` |

#### Returns

`Promise`<`string`\>
