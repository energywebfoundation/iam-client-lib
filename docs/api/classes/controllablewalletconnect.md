**[iam-client-lib](../README.md)**

# Class: ControllableWalletConnect

Extension of WalletConnect client that allows session creation to be disabled
This is helpful to be sure that session creation won't be attempted after closing
the connection. See [MYEN-625](https://energyweb.atlassian.net/browse/MYEN-625)

## Hierarchy

* WalletConnect

  ↳ **ControllableWalletConnect**

## Implements

* IConnector

## Index

### Constructors

* [constructor](controllablewalletconnect.md#constructor)

### Properties

* [canCreateSession](controllablewalletconnect.md#cancreatesession)
* [protocol](controllablewalletconnect.md#protocol)
* [version](controllablewalletconnect.md#version)

### Accessors

* [accounts](controllablewalletconnect.md#accounts)
* [bridge](controllablewalletconnect.md#bridge)
* [chainId](controllablewalletconnect.md#chainid)
* [clientId](controllablewalletconnect.md#clientid)
* [clientMeta](controllablewalletconnect.md#clientmeta)
* [connected](controllablewalletconnect.md#connected)
* [handshakeId](controllablewalletconnect.md#handshakeid)
* [handshakeTopic](controllablewalletconnect.md#handshaketopic)
* [key](controllablewalletconnect.md#key)
* [networkId](controllablewalletconnect.md#networkid)
* [peerId](controllablewalletconnect.md#peerid)
* [peerMeta](controllablewalletconnect.md#peermeta)
* [pending](controllablewalletconnect.md#pending)
* [rpcUrl](controllablewalletconnect.md#rpcurl)
* [session](controllablewalletconnect.md#session)
* [uri](controllablewalletconnect.md#uri)

### Methods

* [approveRequest](controllablewalletconnect.md#approverequest)
* [approveSession](controllablewalletconnect.md#approvesession)
* [connect](controllablewalletconnect.md#connect)
* [createInstantRequest](controllablewalletconnect.md#createinstantrequest)
* [createSession](controllablewalletconnect.md#createsession)
* [killSession](controllablewalletconnect.md#killsession)
* [on](controllablewalletconnect.md#on)
* [rejectRequest](controllablewalletconnect.md#rejectrequest)
* [rejectSession](controllablewalletconnect.md#rejectsession)
* [sendCustomRequest](controllablewalletconnect.md#sendcustomrequest)
* [sendTransaction](controllablewalletconnect.md#sendtransaction)
* [signMessage](controllablewalletconnect.md#signmessage)
* [signPersonalMessage](controllablewalletconnect.md#signpersonalmessage)
* [signTransaction](controllablewalletconnect.md#signtransaction)
* [signTypedData](controllablewalletconnect.md#signtypeddata)
* [unsafeSend](controllablewalletconnect.md#unsafesend)
* [updateChain](controllablewalletconnect.md#updatechain)
* [updateSession](controllablewalletconnect.md#updatesession)

## Constructors

### constructor

\+ **new ControllableWalletConnect**(`connectorOpts`: IWalletConnectOptions): [ControllableWalletConnect](controllablewalletconnect.md)

*Overrides void*

#### Parameters:

Name | Type |
------ | ------ |
`connectorOpts` | IWalletConnectOptions |

**Returns:** [ControllableWalletConnect](controllablewalletconnect.md)

## Properties

### canCreateSession

•  **canCreateSession**: boolean = true

___

### protocol

• `Readonly` **protocol**: \"wc\" = "wc"

*Inherited from [ControllableWalletConnect](controllablewalletconnect.md).[protocol](controllablewalletconnect.md#protocol)*

___

### version

• `Readonly` **version**: 1 = 1

*Inherited from [ControllableWalletConnect](controllablewalletconnect.md).[version](controllablewalletconnect.md#version)*

## Accessors

### accounts

• get **accounts**(): string[]

*Inherited from [ControllableWalletConnect](controllablewalletconnect.md).[accounts](controllablewalletconnect.md#accounts)*

**Returns:** string[]

• set **accounts**(`value`: string[]): any

*Inherited from [ControllableWalletConnect](controllablewalletconnect.md).[accounts](controllablewalletconnect.md#accounts)*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string[] |

**Returns:** any

___

### bridge

• get **bridge**(): string

*Inherited from [ControllableWalletConnect](controllablewalletconnect.md).[bridge](controllablewalletconnect.md#bridge)*

**Returns:** string

• set **bridge**(`value`: string): any

*Inherited from [ControllableWalletConnect](controllablewalletconnect.md).[bridge](controllablewalletconnect.md#bridge)*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** any

___

### chainId

• get **chainId**(): number

*Inherited from [ControllableWalletConnect](controllablewalletconnect.md).[chainId](controllablewalletconnect.md#chainid)*

**Returns:** number

• set **chainId**(`value`: number): any

*Inherited from [ControllableWalletConnect](controllablewalletconnect.md).[chainId](controllablewalletconnect.md#chainid)*

#### Parameters:

Name | Type |
------ | ------ |
`value` | number |

**Returns:** any

___

### clientId

• get **clientId**(): string

*Inherited from [ControllableWalletConnect](controllablewalletconnect.md).[clientId](controllablewalletconnect.md#clientid)*

**Returns:** string

• set **clientId**(`value`: string): any

*Inherited from [ControllableWalletConnect](controllablewalletconnect.md).[clientId](controllablewalletconnect.md#clientid)*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** any

___

### clientMeta

• get **clientMeta**(): IClientMeta \| null

*Inherited from [ControllableWalletConnect](controllablewalletconnect.md).[clientMeta](controllablewalletconnect.md#clientmeta)*

**Returns:** IClientMeta \| null

• set **clientMeta**(`value`: IClientMeta \| null): any

*Inherited from [ControllableWalletConnect](controllablewalletconnect.md).[clientMeta](controllablewalletconnect.md#clientmeta)*

#### Parameters:

Name | Type |
------ | ------ |
`value` | IClientMeta \| null |

**Returns:** any

___

### connected

• get **connected**(): boolean

*Inherited from [ControllableWalletConnect](controllablewalletconnect.md).[connected](controllablewalletconnect.md#connected)*

**Returns:** boolean

• set **connected**(`value`: boolean): any

*Inherited from [ControllableWalletConnect](controllablewalletconnect.md).[connected](controllablewalletconnect.md#connected)*

#### Parameters:

Name | Type |
------ | ------ |
`value` | boolean |

**Returns:** any

___

### handshakeId

• get **handshakeId**(): number

*Inherited from [ControllableWalletConnect](controllablewalletconnect.md).[handshakeId](controllablewalletconnect.md#handshakeid)*

**Returns:** number

• set **handshakeId**(`value`: number): any

*Inherited from [ControllableWalletConnect](controllablewalletconnect.md).[handshakeId](controllablewalletconnect.md#handshakeid)*

#### Parameters:

Name | Type |
------ | ------ |
`value` | number |

**Returns:** any

___

### handshakeTopic

• get **handshakeTopic**(): string

*Inherited from [ControllableWalletConnect](controllablewalletconnect.md).[handshakeTopic](controllablewalletconnect.md#handshaketopic)*

**Returns:** string

• set **handshakeTopic**(`value`: string): any

*Inherited from [ControllableWalletConnect](controllablewalletconnect.md).[handshakeTopic](controllablewalletconnect.md#handshaketopic)*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** any

___

### key

• get **key**(): string

*Inherited from [ControllableWalletConnect](controllablewalletconnect.md).[key](controllablewalletconnect.md#key)*

**Returns:** string

• set **key**(`value`: string): any

*Inherited from [ControllableWalletConnect](controllablewalletconnect.md).[key](controllablewalletconnect.md#key)*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** any

___

### networkId

• get **networkId**(): number

*Inherited from [ControllableWalletConnect](controllablewalletconnect.md).[networkId](controllablewalletconnect.md#networkid)*

**Returns:** number

• set **networkId**(`value`: number): any

*Inherited from [ControllableWalletConnect](controllablewalletconnect.md).[networkId](controllablewalletconnect.md#networkid)*

#### Parameters:

Name | Type |
------ | ------ |
`value` | number |

**Returns:** any

___

### peerId

• get **peerId**(): string

*Inherited from [ControllableWalletConnect](controllablewalletconnect.md).[peerId](controllablewalletconnect.md#peerid)*

**Returns:** string

• set **peerId**(`value`: string): any

*Inherited from [ControllableWalletConnect](controllablewalletconnect.md).[peerId](controllablewalletconnect.md#peerid)*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** any

___

### peerMeta

• get **peerMeta**(): IClientMeta \| null

*Inherited from [ControllableWalletConnect](controllablewalletconnect.md).[peerMeta](controllablewalletconnect.md#peermeta)*

**Returns:** IClientMeta \| null

• set **peerMeta**(`value`: IClientMeta \| null): any

*Inherited from [ControllableWalletConnect](controllablewalletconnect.md).[peerMeta](controllablewalletconnect.md#peermeta)*

#### Parameters:

Name | Type |
------ | ------ |
`value` | IClientMeta \| null |

**Returns:** any

___

### pending

• get **pending**(): boolean

*Inherited from [ControllableWalletConnect](controllablewalletconnect.md).[pending](controllablewalletconnect.md#pending)*

**Returns:** boolean

• set **pending**(`value`: boolean): any

*Inherited from [ControllableWalletConnect](controllablewalletconnect.md).[pending](controllablewalletconnect.md#pending)*

#### Parameters:

Name | Type |
------ | ------ |
`value` | boolean |

**Returns:** any

___

### rpcUrl

• get **rpcUrl**(): string

*Inherited from [ControllableWalletConnect](controllablewalletconnect.md).[rpcUrl](controllablewalletconnect.md#rpcurl)*

**Returns:** string

• set **rpcUrl**(`value`: string): any

*Inherited from [ControllableWalletConnect](controllablewalletconnect.md).[rpcUrl](controllablewalletconnect.md#rpcurl)*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** any

___

### session

• get **session**(): object

*Inherited from [ControllableWalletConnect](controllablewalletconnect.md).[session](controllablewalletconnect.md#session)*

**Returns:** object

Name | Type |
------ | ------ |
`accounts` | string[] |
`bridge` | string |
`chainId` | number |
`clientId` | string |
`clientMeta` | IClientMeta \| null |
`connected` | boolean |
`handshakeId` | number |
`handshakeTopic` | string |
`key` | string |
`peerId` | string |
`peerMeta` | IClientMeta \| null |

• set **session**(`value`: { accounts: string[] ; bridge: string ; chainId: number ; clientId: string ; clientMeta: IClientMeta \| null ; connected: boolean ; handshakeId: number ; handshakeTopic: string ; key: string ; peerId: string ; peerMeta: IClientMeta \| null  }): any

*Inherited from [ControllableWalletConnect](controllablewalletconnect.md).[session](controllablewalletconnect.md#session)*

#### Parameters:

Name | Type |
------ | ------ |
`value` | { accounts: string[] ; bridge: string ; chainId: number ; clientId: string ; clientMeta: IClientMeta \| null ; connected: boolean ; handshakeId: number ; handshakeTopic: string ; key: string ; peerId: string ; peerMeta: IClientMeta \| null  } |

**Returns:** any

___

### uri

• get **uri**(): string

*Inherited from [ControllableWalletConnect](controllablewalletconnect.md).[uri](controllablewalletconnect.md#uri)*

**Returns:** string

• set **uri**(`value`: string): any

*Inherited from [ControllableWalletConnect](controllablewalletconnect.md).[uri](controllablewalletconnect.md#uri)*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** any

## Methods

### approveRequest

▸ **approveRequest**(`response`: Partial\<IJsonRpcResponseSuccess>): void

*Inherited from [ControllableWalletConnect](controllablewalletconnect.md).[approveRequest](controllablewalletconnect.md#approverequest)*

#### Parameters:

Name | Type |
------ | ------ |
`response` | Partial\<IJsonRpcResponseSuccess> |

**Returns:** void

___

### approveSession

▸ **approveSession**(`sessionStatus`: ISessionStatus): void

*Inherited from [ControllableWalletConnect](controllablewalletconnect.md).[approveSession](controllablewalletconnect.md#approvesession)*

#### Parameters:

Name | Type |
------ | ------ |
`sessionStatus` | ISessionStatus |

**Returns:** void

___

### connect

▸ **connect**(`opts?`: ICreateSessionOptions): Promise\<ISessionStatus>

*Inherited from [ControllableWalletConnect](controllablewalletconnect.md).[connect](controllablewalletconnect.md#connect)*

#### Parameters:

Name | Type |
------ | ------ |
`opts?` | ICreateSessionOptions |

**Returns:** Promise\<ISessionStatus>

___

### createInstantRequest

▸ **createInstantRequest**(`instantRequest`: Partial\<IJsonRpcRequest>): Promise\<void>

*Inherited from [ControllableWalletConnect](controllablewalletconnect.md).[createInstantRequest](controllablewalletconnect.md#createinstantrequest)*

#### Parameters:

Name | Type |
------ | ------ |
`instantRequest` | Partial\<IJsonRpcRequest> |

**Returns:** Promise\<void>

___

### createSession

▸ **createSession**(`opts?`: ICreateSessionOptions): Promise\<void>

*Overrides void*

#### Parameters:

Name | Type |
------ | ------ |
`opts?` | ICreateSessionOptions |

**Returns:** Promise\<void>

___

### killSession

▸ **killSession**(`sessionError?`: ISessionError): Promise\<void>

*Inherited from [ControllableWalletConnect](controllablewalletconnect.md).[killSession](controllablewalletconnect.md#killsession)*

#### Parameters:

Name | Type |
------ | ------ |
`sessionError?` | ISessionError |

**Returns:** Promise\<void>

___

### on

▸ **on**(`event`: string, `callback`: (error: [Error](cacheclientnotprovidederror.md#error) \| null, payload: any \| null) => void): void

*Inherited from [ControllableWalletConnect](controllablewalletconnect.md).[on](controllablewalletconnect.md#on)*

#### Parameters:

Name | Type |
------ | ------ |
`event` | string |
`callback` | (error: [Error](cacheclientnotprovidederror.md#error) \| null, payload: any \| null) => void |

**Returns:** void

___

### rejectRequest

▸ **rejectRequest**(`response`: Partial\<IJsonRpcResponseError>): void

*Inherited from [ControllableWalletConnect](controllablewalletconnect.md).[rejectRequest](controllablewalletconnect.md#rejectrequest)*

#### Parameters:

Name | Type |
------ | ------ |
`response` | Partial\<IJsonRpcResponseError> |

**Returns:** void

___

### rejectSession

▸ **rejectSession**(`sessionError?`: ISessionError): void

*Inherited from [ControllableWalletConnect](controllablewalletconnect.md).[rejectSession](controllablewalletconnect.md#rejectsession)*

#### Parameters:

Name | Type |
------ | ------ |
`sessionError?` | ISessionError |

**Returns:** void

___

### sendCustomRequest

▸ **sendCustomRequest**(`request`: Partial\<IJsonRpcRequest>, `options?`: IRequestOptions): Promise\<any>

*Inherited from [ControllableWalletConnect](controllablewalletconnect.md).[sendCustomRequest](controllablewalletconnect.md#sendcustomrequest)*

#### Parameters:

Name | Type |
------ | ------ |
`request` | Partial\<IJsonRpcRequest> |
`options?` | IRequestOptions |

**Returns:** Promise\<any>

___

### sendTransaction

▸ **sendTransaction**(`tx`: ITxData): Promise\<any>

*Inherited from [ControllableWalletConnect](controllablewalletconnect.md).[sendTransaction](controllablewalletconnect.md#sendtransaction)*

#### Parameters:

Name | Type |
------ | ------ |
`tx` | ITxData |

**Returns:** Promise\<any>

___

### signMessage

▸ **signMessage**(`params`: any[]): Promise\<any>

*Inherited from [ControllableWalletConnect](controllablewalletconnect.md).[signMessage](controllablewalletconnect.md#signmessage)*

#### Parameters:

Name | Type |
------ | ------ |
`params` | any[] |

**Returns:** Promise\<any>

___

### signPersonalMessage

▸ **signPersonalMessage**(`params`: any[]): Promise\<any>

*Inherited from [ControllableWalletConnect](controllablewalletconnect.md).[signPersonalMessage](controllablewalletconnect.md#signpersonalmessage)*

#### Parameters:

Name | Type |
------ | ------ |
`params` | any[] |

**Returns:** Promise\<any>

___

### signTransaction

▸ **signTransaction**(`tx`: ITxData): Promise\<any>

*Inherited from [ControllableWalletConnect](controllablewalletconnect.md).[signTransaction](controllablewalletconnect.md#signtransaction)*

#### Parameters:

Name | Type |
------ | ------ |
`tx` | ITxData |

**Returns:** Promise\<any>

___

### signTypedData

▸ **signTypedData**(`params`: any[]): Promise\<any>

*Inherited from [ControllableWalletConnect](controllablewalletconnect.md).[signTypedData](controllablewalletconnect.md#signtypeddata)*

#### Parameters:

Name | Type |
------ | ------ |
`params` | any[] |

**Returns:** Promise\<any>

___

### unsafeSend

▸ **unsafeSend**(`request`: IJsonRpcRequest, `options?`: IRequestOptions): Promise\<IJsonRpcResponseSuccess \| IJsonRpcResponseError>

*Inherited from [ControllableWalletConnect](controllablewalletconnect.md).[unsafeSend](controllablewalletconnect.md#unsafesend)*

#### Parameters:

Name | Type |
------ | ------ |
`request` | IJsonRpcRequest |
`options?` | IRequestOptions |

**Returns:** Promise\<IJsonRpcResponseSuccess \| IJsonRpcResponseError>

___

### updateChain

▸ **updateChain**(`chainParams`: IUpdateChainParams): Promise\<any>

*Inherited from [ControllableWalletConnect](controllablewalletconnect.md).[updateChain](controllablewalletconnect.md#updatechain)*

#### Parameters:

Name | Type |
------ | ------ |
`chainParams` | IUpdateChainParams |

**Returns:** Promise\<any>

___

### updateSession

▸ **updateSession**(`sessionStatus`: ISessionStatus): void

*Inherited from [ControllableWalletConnect](controllablewalletconnect.md).[updateSession](controllablewalletconnect.md#updatesession)*

#### Parameters:

Name | Type |
------ | ------ |
`sessionStatus` | ISessionStatus |

**Returns:** void
