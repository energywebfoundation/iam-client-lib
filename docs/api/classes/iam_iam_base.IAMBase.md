# Class: IAMBase

[iam/iam-base](../modules/iam_iam_base.md).IAMBase

## Hierarchy

- **`IAMBase`**

  ↳ [`IAM`](iam.IAM.md)

## Table of contents

### Constructors

- [constructor](iam_iam_base.IAMBase.md#constructor)

### Accessors

- [address](iam_iam_base.IAMBase.md#address)

### Methods

- [closeConnection](iam_iam_base.IAMBase.md#closeconnection)
- [connectToCacheServer](iam_iam_base.IAMBase.md#connecttocacheserver)
- [connectToDIDRegistry](iam_iam_base.IAMBase.md#connecttodidregistry)
- [isSessionActive](iam_iam_base.IAMBase.md#issessionactive)
- [on](iam_iam_base.IAMBase.md#on)

## Constructors

### constructor

• **new IAMBase**(`__namedParameters?`)

IAM Constructor

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`ConnectionOptions`](../modules/iam_iam_base.md#connectionoptions) |

## Accessors

### address

• `get` **address**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

## Methods

### closeConnection

▸ **closeConnection**(): `Promise`<`void`\>

Close connection to wallet

**`description`** closes the connection between dApp and the wallet

#### Returns

`Promise`<`void`\>

___

### connectToCacheServer

▸ **connectToCacheServer**(): `Promise`<`void`\>

**`description`** established connection to cache server and logins in signing authentication token

#### Returns

`Promise`<`void`\>

___

### connectToDIDRegistry

▸ **connectToDIDRegistry**(): `Promise`<`void`\>

**`description`** creates users DID document if it is not yet exist

#### Returns

`Promise`<`void`\>

___

### isSessionActive

▸ **isSessionActive**(): `boolean`

Check if session is active

#### Returns

`boolean`

boolean that indicates the session state

___

### on

▸ **on**(`event`, `eventHandler`): `void`

Add event handler for certain events

**`requires`** to be called after the connection to wallet was initialized

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"accountChanged"`` \| ``"networkChanged"`` \| ``"disconnected"`` |
| `eventHandler` | () => `void` |

#### Returns

`void`
