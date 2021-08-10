# Class: ControllableWalletConnect

[walletconnect/ControllableWalletConnect](../modules/walletconnect_ControllableWalletConnect.md).ControllableWalletConnect

Extension of WalletConnect client that allows session creation to be disabled
This is helpful to be sure that session creation won't be attempted after closing
the connection. See [MYEN-625](https://energyweb.atlassian.net/browse/MYEN-625)

## Hierarchy

- `WalletConnect`

  ↳ **`ControllableWalletConnect`**

## Table of contents

### Constructors

- [constructor](walletconnect_ControllableWalletConnect.ControllableWalletConnect.md#constructor)

### Properties

- [canCreateSession](walletconnect_ControllableWalletConnect.ControllableWalletConnect.md#cancreatesession)

### Methods

- [createSession](walletconnect_ControllableWalletConnect.ControllableWalletConnect.md#createsession)

## Constructors

### constructor

• **new ControllableWalletConnect**(`connectorOpts`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `connectorOpts` | `IWalletConnectOptions` |

#### Overrides

WalletConnect.constructor

## Properties

### canCreateSession

• **canCreateSession**: `boolean` = `true`

## Methods

### createSession

▸ **createSession**(`opts?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts?` | `ICreateSessionOptions` |

#### Returns

`Promise`<`void`\>

#### Overrides

WalletConnect.createSession
