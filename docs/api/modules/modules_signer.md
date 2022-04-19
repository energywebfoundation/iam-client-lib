# Module: modules/signer

## Table of contents

### Enumerations

- [ProviderEvent](../enums/modules_signer.ProviderEvent.md)
- [ProviderType](../enums/modules_signer.ProviderType.md)

### Classes

- [EkcSigner](../classes/modules_signer.EkcSigner.md)
- [SignerService](../classes/modules_signer.SignerService.md)

### Interfaces

- [IPubKeyAndIdentityToken](../interfaces/modules_signer.IPubKeyAndIdentityToken.md)

### Type aliases

- [AccountInfo](modules_signer.md#accountinfo)
- [ServiceInitializer](modules_signer.md#serviceinitializer)
- [SignerT](modules_signer.md#signert)

### Variables

- [IS\_ETH\_SIGNER](modules_signer.md#is_eth_signer)
- [PUBLIC\_KEY](modules_signer.md#public_key)

### Functions

- [createWalletConnectProvider](modules_signer.md#createwalletconnectprovider)
- [fromGnosis](modules_signer.md#fromgnosis)
- [fromKms](modules_signer.md#fromkms)
- [fromMetaMask](modules_signer.md#frommetamask)
- [fromPrivateKey](modules_signer.md#fromprivatekey)
- [fromWalletConnectMetamask](modules_signer.md#fromwalletconnectmetamask)
- [isMetamaskExtensionPresent](modules_signer.md#ismetamaskextensionpresent)

## Type aliases

### AccountInfo

Ƭ **AccountInfo**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `account` | `string` |
| `chainId` | `number` |
| `chainName` | `string` |

___

### ServiceInitializer

Ƭ **ServiceInitializer**: () => `Promise`<`void`\>

#### Type declaration

▸ (): `Promise`<`void`\>

##### Returns

`Promise`<`void`\>

___

### SignerT

Ƭ **SignerT**: `Signer` & `TypedDataSigner`

## Variables

### IS\_ETH\_SIGNER

• `Const` **IS\_ETH\_SIGNER**: ``"isEthSigner"``

___

### PUBLIC\_KEY

• `Const` **PUBLIC\_KEY**: ``"PublicKey"``

## Functions

### createWalletConnectProvider

▸ **createWalletConnectProvider**(`bridge`, `infuraId?`): `WalletConnectProvider`

#### Parameters

| Name | Type |
| :------ | :------ |
| `bridge` | `string` |
| `infuraId?` | `string` |

#### Returns

`WalletConnectProvider`

___

### fromGnosis

▸ **fromGnosis**(`safeAppSdk`): `Promise`<[`SignerService`](../classes/modules_signer.SignerService.md)\>

**`description`** Intended for use in Volta Gnosis web interface(https://volta.gnosis-safe.io/).
Dapp should provide SafeAppSdk injected by Gnosis interface

#### Parameters

| Name | Type |
| :------ | :------ |
| `safeAppSdk` | `SafeAppsSDK` |

#### Returns

`Promise`<[`SignerService`](../classes/modules_signer.SignerService.md)\>

___

### fromKms

▸ **fromKms**(`bridge`, `kmsServerUrl`, `infuraId?`): `Promise`<[`SignerService`](../classes/modules_signer.SignerService.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `bridge` | `string` |
| `kmsServerUrl` | `string` |
| `infuraId?` | `string` |

#### Returns

`Promise`<[`SignerService`](../classes/modules_signer.SignerService.md)\>

___

### fromMetaMask

▸ **fromMetaMask**(): `Promise`<[`SignerService`](../classes/modules_signer.SignerService.md)\>

#### Returns

`Promise`<[`SignerService`](../classes/modules_signer.SignerService.md)\>

___

### fromPrivateKey

▸ **fromPrivateKey**(`privateKey`, `rpcUrl`): `Promise`<[`SignerService`](../classes/modules_signer.SignerService.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `privateKey` | `string` |
| `rpcUrl` | `string` |

#### Returns

`Promise`<[`SignerService`](../classes/modules_signer.SignerService.md)\>

___

### fromWalletConnectMetamask

▸ **fromWalletConnectMetamask**(`bridge`, `infuraId?`): `Promise`<[`SignerService`](../classes/modules_signer.SignerService.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `bridge` | `string` |
| `infuraId?` | `string` |

#### Returns

`Promise`<[`SignerService`](../classes/modules_signer.SignerService.md)\>

___

### isMetamaskExtensionPresent

▸ **isMetamaskExtensionPresent**(): `Promise`<{ `chainId`: `undefined` \| `number` ; `isMetamaskPresent`: `boolean` = !!provider }\>

#### Returns

`Promise`<{ `chainId`: `undefined` \| `number` ; `isMetamaskPresent`: `boolean` = !!provider }\>
