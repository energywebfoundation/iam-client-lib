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

▸ **closeConnection**(): `Promise`<`boolean`\>

**`description`** Closes the connection between application and the signer's wallet

#### Returns

`Promise`<`boolean`\>

___

### connectToCacheServer

▸ **connectToCacheServer**(): `Promise`<`void`\>

**`description`** Establishes connection to the cache serverand sets public key and identity token

#### Returns

`Promise`<`void`\>

___

### connectToDIDRegistry

▸ **connectToDIDRegistry**(): `Promise`<`void`\>

**`description`** Creates the signer's DID document if it does not exist

#### Returns

`Promise`<`void`\>

___

### isSessionActive

▸ **isSessionActive**(): `boolean`

**`description`** Checks if the session is active

#### Returns

`boolean`

boolean that indicates the session state

___

### on

▸ **on**(`event`, `eventHandler`): `void`

**`description`** Defines event handlers for change of account, change of network, disconnection

**`requires`** to be called after the connection to wallet was initialized

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"accountChanged"`` \| ``"networkChanged"`` \| ``"disconnected"`` |
| `eventHandler` | () => `void` |

#### Returns

`void`
