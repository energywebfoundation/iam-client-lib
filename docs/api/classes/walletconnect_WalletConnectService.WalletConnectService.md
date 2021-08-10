# Class: WalletConnectService

[walletconnect/WalletConnectService](../modules/walletconnect_WalletConnectService.md).WalletConnectService

Encapsulates a WalletConnect connection

## Table of contents

### Constructors

- [constructor](walletconnect_WalletConnectService.WalletConnectService.md#constructor)

### Methods

- [closeConnection](walletconnect_WalletConnectService.WalletConnectService.md#closeconnection)
- [getProvider](walletconnect_WalletConnectService.WalletConnectService.md#getprovider)
- [initialize](walletconnect_WalletConnectService.WalletConnectService.md#initialize)
- [isConnected](walletconnect_WalletConnectService.WalletConnectService.md#isconnected)

## Constructors

### constructor

• **new WalletConnectService**(`bridgeUrl`, `infuraId?`, `ewKeyManagerUrl?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `bridgeUrl` | `string` |
| `infuraId?` | `string` |
| `ewKeyManagerUrl?` | `string` |

## Methods

### closeConnection

▸ **closeConnection**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

___

### getProvider

▸ **getProvider**(): `WalletConnectProvider`

**`requires`** intialize be called first

#### Returns

`WalletConnectProvider`

the WalletConnectProvider of this instance

___

### initialize

▸ **initialize**(`walletProvider`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `walletProvider` | [`WalletProvider`](../enums/types_WalletProvider.WalletProvider.md) |

#### Returns

`Promise`<`void`\>

___

### isConnected

▸ **isConnected**(): `boolean`

#### Returns

`boolean`
