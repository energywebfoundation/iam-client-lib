# Class: SignerService

[modules/signer/signer.service](../modules/modules_signer_signer_service.md).SignerService

## Table of contents

### Constructors

- [constructor](modules_signer_signer_service.SignerService.md#constructor)

### Accessors

- [accountInfo](modules_signer_signer_service.SignerService.md#accountinfo)
- [address](modules_signer_signer_service.SignerService.md#address)
- [chainId](modules_signer_signer_service.SignerService.md#chainid)
- [did](modules_signer_signer_service.SignerService.md#did)
- [provider](modules_signer_signer_service.SignerService.md#provider)
- [providerType](modules_signer_signer_service.SignerService.md#providertype)
- [signer](modules_signer_signer_service.SignerService.md#signer)

### Methods

- [balance](modules_signer_signer_service.SignerService.md#balance)
- [closeConnection](modules_signer_signer_service.SignerService.md#closeconnection)
- [connect](modules_signer_signer_service.SignerService.md#connect)
- [init](modules_signer_signer_service.SignerService.md#init)
- [initEventHandlers](modules_signer_signer_service.SignerService.md#initeventhandlers)
- [on](modules_signer_signer_service.SignerService.md#on)
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

### accountInfo

• `get` **accountInfo**(): [`AccountInfo`](../modules/modules_signer_signer_types.md#accountinfo)

#### Returns

[`AccountInfo`](../modules/modules_signer_signer_types.md#accountinfo)

___

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

### did

• `get` **did**(): `string`

#### Returns

`string`

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

### closeConnection

▸ **closeConnection**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

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

### init

▸ **init**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

___

### initEventHandlers

▸ **initEventHandlers**(): `void`

Add event handler for certain events

**`requires`** to be called after the connection to wallet was initialized

#### Returns

`void`

___

### on

▸ **on**(`event`, `cb`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`ProviderEvent`](../enums/modules_signer_signer_types.ProviderEvent.md) |
| `cb` | `any` |

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
