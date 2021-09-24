# Interface: IMessagesHandler

[messaging/messaging_factory](../modules/messaging_messaging_factory.md).IMessagesHandler

## Implemented by

- [`NatsHandler`](../classes/messaging_nats_handler.NatsHandler.md)
- [`NoHandler`](../classes/messaging_no_handler.NoHandler.md)

## Table of contents

### Methods

- [isConnected](messaging_messaging_factory.IMessagesHandler.md#isconnected)
- [publish](messaging_messaging_factory.IMessagesHandler.md#publish)
- [subscribe](messaging_messaging_factory.IMessagesHandler.md#subscribe)

## Methods

### isConnected

▸ **isConnected**(): `boolean`

#### Returns

`boolean`

___

### publish

▸ **publish**<`T`\>(`topic`, `message`): `any`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Record`<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `topic` | `string` |
| `message` | `T` |

#### Returns

`any`

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
