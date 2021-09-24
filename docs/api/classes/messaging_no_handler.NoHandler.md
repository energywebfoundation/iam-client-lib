# Class: NoHandler

[messaging/no_handler](../modules/messaging_no_handler.md).NoHandler

## Implements

- [`IMessagesHandler`](../interfaces/messaging_messaging_factory.IMessagesHandler.md)

## Table of contents

### Constructors

- [constructor](messaging_no_handler.NoHandler.md#constructor)

### Methods

- [isConnected](messaging_no_handler.NoHandler.md#isconnected)
- [publish](messaging_no_handler.NoHandler.md#publish)
- [subscribe](messaging_no_handler.NoHandler.md#subscribe)

## Constructors

### constructor

• **new NoHandler**()

## Methods

### isConnected

▸ **isConnected**(): `boolean`

#### Returns

`boolean`

#### Implementation of

[IMessagesHandler](../interfaces/messaging_messaging_factory.IMessagesHandler.md).[isConnected](../interfaces/messaging_messaging_factory.IMessagesHandler.md#isconnected)

___

### publish

▸ **publish**<`T`\>(`subject`, `message`): `undefined`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Record`<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `subject` | `string` |
| `message` | `T` |

#### Returns

`undefined`

#### Implementation of

[IMessagesHandler](../interfaces/messaging_messaging_factory.IMessagesHandler.md).[publish](../interfaces/messaging_messaging_factory.IMessagesHandler.md#publish)

___

### subscribe

▸ **subscribe**<`T`\>(`subject`, `messageHandler`): `undefined` \| `Subscription`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Record`<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `subject` | `string` |
| `messageHandler` | (`data`: `T`) => `void` |

#### Returns

`undefined` \| `Subscription`

#### Implementation of

[IMessagesHandler](../interfaces/messaging_messaging_factory.IMessagesHandler.md).[subscribe](../interfaces/messaging_messaging_factory.IMessagesHandler.md#subscribe)
