# Class: SignerService

[modules/signer](../modules/modules_signer.md).SignerService

## Table of contents

### Constructors

- [constructor](modules_signer.SignerService.md#constructor)

### Accessors

- [accountInfo](modules_signer.SignerService.md#accountinfo)
- [address](modules_signer.SignerService.md#address)
- [chainId](modules_signer.SignerService.md#chainid)
- [did](modules_signer.SignerService.md#did)
- [didHex](modules_signer.SignerService.md#didhex)
- [isEthSigner](modules_signer.SignerService.md#isethsigner)
- [provider](modules_signer.SignerService.md#provider)
- [providerType](modules_signer.SignerService.md#providertype)
- [signer](modules_signer.SignerService.md#signer)

### Methods

- [balance](modules_signer.SignerService.md#balance)
- [call](modules_signer.SignerService.md#call)
- [chainName](modules_signer.SignerService.md#chainname)
- [closeConnection](modules_signer.SignerService.md#closeconnection)
- [connect](modules_signer.SignerService.md#connect)
- [emit](modules_signer.SignerService.md#emit)
- [init](modules_signer.SignerService.md#init)
- [initEventHandlers](modules_signer.SignerService.md#initeventhandlers)
- [on](modules_signer.SignerService.md#on)
- [onInit](modules_signer.SignerService.md#oninit)
- [publicKey](modules_signer.SignerService.md#publickey)
- [publicKeyAndIdentityToken](modules_signer.SignerService.md#publickeyandidentitytoken)
- [send](modules_signer.SignerService.md#send)
- [signMessage](modules_signer.SignerService.md#signmessage)
- [signTypedData](modules_signer.SignerService.md#signtypeddata)

## Constructors

### constructor

• **new SignerService**(`_signer`, `_providerType`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_signer` | `Required`<[`SignerT`](../modules/modules_signer.md#signert)\> |
| `_providerType` | [`ProviderType`](../enums/modules_signer.ProviderType.md) |

## Accessors

### accountInfo

• `get` **accountInfo**(): [`AccountInfo`](../modules/modules_signer.md#accountinfo)

#### Returns

[`AccountInfo`](../modules/modules_signer.md#accountinfo)

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

### didHex

• `get` **didHex**(): `string`

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

• `get` **providerType**(): [`ProviderType`](../enums/modules_signer.ProviderType.md)

#### Returns

[`ProviderType`](../enums/modules_signer.ProviderType.md)

___

### signer

• `get` **signer**(): `Required`<[`SignerT`](../modules/modules_signer.md#signert)\>

#### Returns

`Required`<[`SignerT`](../modules/modules_signer.md#signert)\>

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
| `signer` | `Required`<[`SignerT`](../modules/modules_signer.md#signert)\> |
| `providerType` | [`ProviderType`](../enums/modules_signer.ProviderType.md) |

#### Returns

`Promise`<`void`\>

___

### emit

▸ **emit**(`e`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | [`ProviderEvent`](../enums/modules_signer.ProviderEvent.md) |

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
| `event` | [`ProviderEvent`](../enums/modules_signer.ProviderEvent.md) |
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
| `initializer` | [`ServiceInitializer`](../modules/modules_signer.md#serviceinitializer) |

#### Returns

`void`

___

### publicKey

▸ **publicKey**(): `Promise`<`string`\>

#### Returns

`Promise`<`string`\>

___

### publicKeyAndIdentityToken

▸ **publicKeyAndIdentityToken**(): `Promise`<[`IPubKeyAndIdentityToken`](../interfaces/modules_signer.IPubKeyAndIdentityToken.md)\>

#### Returns

`Promise`<[`IPubKeyAndIdentityToken`](../interfaces/modules_signer.IPubKeyAndIdentityToken.md)\>

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

___

### signTypedData

▸ **signTypedData**(`domain`, `types`, `message`): `Promise`<`string`\>

**`description`** Tries to create conformant signature (https://eips.ethereum.org/EIPS/eip-712)

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `TypedDataDomain` |
| `types` | `Record`<`string`, `TypedDataField`[]\> |
| `message` | `Record`<`string`, `unknown`\> |

#### Returns

`Promise`<`string`\>
