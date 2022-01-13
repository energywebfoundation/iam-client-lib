# Class: SignerService

## Table of contents

### Constructors

- [constructor](SignerService.md#constructor)

### Accessors

- [accountInfo](SignerService.md#accountinfo)
- [address](SignerService.md#address)
- [chainId](SignerService.md#chainid)
- [did](SignerService.md#did)
- [isEthSigner](SignerService.md#isethsigner)
- [provider](SignerService.md#provider)
- [providerType](SignerService.md#providertype)
- [signer](SignerService.md#signer)

### Methods

- [balance](SignerService.md#balance)
- [call](SignerService.md#call)
- [chainName](SignerService.md#chainname)
- [closeConnection](SignerService.md#closeconnection)
- [connect](SignerService.md#connect)
- [emit](SignerService.md#emit)
- [init](SignerService.md#init)
- [initEventHandlers](SignerService.md#initeventhandlers)
- [on](SignerService.md#on)
- [onInit](SignerService.md#oninit)
- [publicKey](SignerService.md#publickey)
- [publicKeyAndIdentityToken](SignerService.md#publickeyandidentitytoken)
- [send](SignerService.md#send)
- [signMessage](SignerService.md#signmessage)

## Constructors

### constructor

• **new SignerService**(`_signer`, `_providerType`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_signer` | `Required`<`Signer`\> |
| `_providerType` | [`ProviderType`](../enums/ProviderType.md) |

## Accessors

### accountInfo

• `get` **accountInfo**(): [`AccountInfo`](../modules.md#accountinfo)

#### Returns

[`AccountInfo`](../modules.md#accountinfo)

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

### isEthSigner

• `get` **isEthSigner**(): `boolean`

#### Returns

`boolean`

___

### provider

• `get` **provider**(): `Provider`

#### Returns

`Provider`

___

### providerType

• `get` **providerType**(): [`ProviderType`](../enums/ProviderType.md)

#### Returns

[`ProviderType`](../enums/ProviderType.md)

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

### call

▸ **call**(`__namedParameters`): `Promise`<`string`\>

Makes a (readonly) call to a smart contract
https://docs.ethers.io/v5/single-page/#/v5/api/providers/provider/-%23-Provider-call

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `TransactionRequest` |

#### Returns

`Promise`<`string`\>

The result of the call

___

### chainName

▸ **chainName**(): `string`

#### Returns

`string`

___

### closeConnection

▸ **closeConnection**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

___

### connect

▸ **connect**(`signer`, `providerType`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `signer` | `Required`<`Signer`\> |
| `providerType` | [`ProviderType`](../enums/ProviderType.md) |

#### Returns

`Promise`<`void`\>

___

### emit

▸ **emit**(`e`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | [`ProviderEvent`](../enums/ProviderEvent.md) |

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
| `event` | [`ProviderEvent`](../enums/ProviderEvent.md) |
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
| `initializer` | [`ServiceInitializer`](../modules.md#serviceinitializer) |

#### Returns

`void`

___

### publicKey

▸ **publicKey**(): `Promise`<`string`\>

#### Returns

`Promise`<`string`\>

___

### publicKeyAndIdentityToken

▸ **publicKeyAndIdentityToken**(): `Promise`<[`IPubKeyAndIdentityToken`](../interfaces/IPubKeyAndIdentityToken.md)\>

#### Returns

`Promise`<[`IPubKeyAndIdentityToken`](../interfaces/IPubKeyAndIdentityToken.md)\>

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

**`description`** Tries to create `eth_sign` conformant signature (https://eth.wiki/json-rpc/API#eth_sign)
Whether or not to hash the message prior to signature is determined by signature performed during login.
When running in browser `isEthSigner` variable should be stored in local storage

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `Uint8Array` | The message to be signed. The message should have binary representation to avoid confusion of text with hexadecimal binary data |

#### Returns

`Promise`<`string`\>
