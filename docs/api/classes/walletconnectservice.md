**[iam-client-lib](../README.md)**

# Class: WalletConnectService

Encapsulates a WalletConnect connection

## Hierarchy

* **WalletConnectService**

## Index

### Constructors

* [constructor](walletconnectservice.md#constructor)

### Methods

* [closeConnection](walletconnectservice.md#closeconnection)
* [getProvider](walletconnectservice.md#getprovider)
* [initialize](walletconnectservice.md#initialize)
* [isConnected](walletconnectservice.md#isconnected)

## Constructors

### constructor

\+ **new WalletConnectService**(`bridgeUrl`: string, `infuraId?`: undefined \| string, `ewKeyManagerUrl?`: undefined \| string): [WalletConnectService](walletconnectservice.md)

#### Parameters:

Name | Type |
------ | ------ |
`bridgeUrl` | string |
`infuraId?` | undefined \| string |
`ewKeyManagerUrl?` | undefined \| string |

**Returns:** [WalletConnectService](walletconnectservice.md)

## Methods

### closeConnection

▸ **closeConnection**(): Promise\<void>

**Returns:** Promise\<void>

___

### getProvider

▸ **getProvider**(): WalletConnectProvider

**`requires`** intialize be called first

**Returns:** WalletConnectProvider

the WalletConnectProvider of this instance

___

### initialize

▸ **initialize**(`walletProvider`: [WalletProvider](../enums/walletprovider.md)): Promise\<void>

#### Parameters:

Name | Type |
------ | ------ |
`walletProvider` | [WalletProvider](../enums/walletprovider.md) |

**Returns:** Promise\<void>

___

### isConnected

▸ **isConnected**(): boolean

**Returns:** boolean
