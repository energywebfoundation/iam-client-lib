# Class: SignerService

[modules/signer](../modules/modules_signer.md).SignerService

Service responsible for signing messages and sending transactions to the blockchain

```typescript
const { signerService } = await initWithPrivateKeySigner(privateKey, rpcUrl);
signerService.signMessage(...);
```

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

Get account info, including chain id, chain name and user address.

```typescript
signerService.accountInfo;
```

#### Returns

[`AccountInfo`](../modules/modules_signer.md#accountinfo)

account info

___

### address

• `get` **address**(): `string`

Get user address.

```typescript
signerService.address;
```

#### Returns

`string`

user address

___

### chainId

• `get` **chainId**(): `number`

Get current connection chain id.

```typescript
signerService.chainId;
```

#### Returns

`number`

chain id

___

### did

• `get` **did**(): `string`

Get current user DID

```typescript
signerService.did;
```

#### Returns

`string`

DID

___

### didHex

• `get` **didHex**(): `string`

Get current user DID address with hex representation of the chain id.

```typescript
signerService.didHex;
```

#### Returns

`string`

DID address

___

### isEthSigner

• `get` **isEthSigner**(): `boolean`

If signer is EIP-191 compliant https://eips.ethereum.org/EIPS/eip-191.

```typescript
signerService.isEthSigner;
```

#### Returns

`boolean`

true if the signer is EIP-191 compliant.

___

### provider

• `get` **provider**(): `Provider`

Get connection provider.

```typescript
signerService.provider;
```

#### Returns

`Provider`

connection provider

___

### providerType

• `get` **providerType**(): [`ProviderType`](../enums/modules_signer.ProviderType.md)

Get provider type of current signer connection.

```typescript
signerService.providerType;
```

#### Returns

[`ProviderType`](../enums/modules_signer.ProviderType.md)

provider type

___

### signer

• `get` **signer**(): `Required`<[`SignerT`](../modules/modules_signer.md#signert)\>

The instance of the `ether` library signer in use by the service

```typescript
signerService.signer;
```

#### Returns

`Required`<[`SignerT`](../modules/modules_signer.md#signert)\>

signer

## Methods

### balance

▸ **balance**(): `Promise`<`BigNumber`\>

Get current user balance.

```typescript
signerService.getBalance();
```

#### Returns

`Promise`<`BigNumber`\>

user balance

___

### call

▸ **call**(`options`): `Promise`<`string`\>

Makes a (readonly) call to a smart contract.
https://docs.ethers.io/v5/single-page/#/v5/api/providers/provider/-%23-Provider-call

```typescript
signerService.call({
    to: ':0x00...0',
    data: contract.interface.encodeFunctionData(...)
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `TransactionRequest` | object with options |

#### Returns

`Promise`<`string`\>

the result of the call

___

### chainName

▸ **chainName**(): `string`

Get current chain name.

```typescript
signerService.chainName();
```

#### Returns

`string`

chain name

___

### closeConnection

▸ **closeConnection**(): `Promise`<`boolean`\>

Close connection with the signer wallet.

```typescript
signerService.closeConnection();
```

#### Returns

`Promise`<`boolean`\>

true if connection was closed

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

Get current user public key.

```typescript
signerService.publicKey();
```

#### Returns

`Promise`<`string`\>

public key

___

### publicKeyAndIdentityToken

▸ **publicKeyAndIdentityToken**(`force?`): `Promise`<[`IPubKeyAndIdentityToken`](../interfaces/modules_signer.IPubKeyAndIdentityToken.md)\>

Generate public key and identity token for authentication purposes.

```typescript
signerService.publicKeyAndIdentityToken();
```

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `force` | `boolean` | `false` | when true recalculates token even if it is already present |

#### Returns

`Promise`<[`IPubKeyAndIdentityToken`](../interfaces/modules_signer.IPubKeyAndIdentityToken.md)\>

object with public key and identity token

___

### send

▸ **send**(`options`): `Promise`<`TransactionReceipt`\>

Send transaction to the blockchain.

```typescript
signerService.send({
    to: ':0x00...0',
    data: contract.interface.encodeFunctionData(...)
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `TransactionRequest` | object with options |

#### Returns

`Promise`<`TransactionReceipt`\>

transaction receipt

___

### signMessage

▸ **signMessage**(`message`): `Promise`<`string`\>

Tries to create `eth_sign` conformant signature (https://eth.wiki/json-rpc/API#eth_sign).
Whether or not to hash the message prior to signature is depends on whether is signer EIP-191 compliant.
When running in browser `isEthSigner` variable should be stored in local storage.

```typescript
signerService.signMessage(arrayify('Hello World'));
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `Uint8Array` | The message to be signed. The message should have binary representation to avoid confusion of text with hexadecimal binary data |

#### Returns

`Promise`<`string`\>

the signature

___

### signTypedData

▸ **signTypedData**(`domain`, `types`, `message`): `Promise`<`string`\>

Tries to create conformant EIP-712 signature (https://eips.ethereum.org/EIPS/eip-712).

```typescript
signerService.signTypedData(
    { name: 'MyToken', version: '1.0' },
    { Model: [{ name: 'name', type: 'string' }, { name: 'type', type: 'string' }] },
    { name: 'MyToken', type: 'erc721' },
);
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `domain` | `TypedDataDomain` | EIP-712 domain object |
| `types` | `Record`<`string`, `TypedDataField`[]\> | EIP-712 types object |
| `message` | `Record`<`string`, `unknown`\> | EIP-712 message object |

#### Returns

`Promise`<`string`\>

the signature
