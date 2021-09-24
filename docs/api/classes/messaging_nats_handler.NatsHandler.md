# Class: NatsHandler

[messaging/nats_handler](../modules/messaging_nats_handler.md).NatsHandler

## Implements

- [`IMessagesHandler`](../interfaces/messaging_messaging_factory.IMessagesHandler.md)

## Table of contents

### Constructors

- [constructor](messaging_nats_handler.NatsHandler.md#constructor)

### Methods

- [isConnected](messaging_nats_handler.NatsHandler.md#isconnected)
- [publish](messaging_nats_handler.NatsHandler.md#publish)
- [subscribe](messaging_nats_handler.NatsHandler.md#subscribe)
- [init](messaging_nats_handler.NatsHandler.md#init)

## Constructors

### constructor

• **new NatsHandler**()

## Methods

### isConnected

▸ **isConnected**(): `boolean`

#### Returns

`boolean`

#### Implementation of

[IMessagesHandler](../interfaces/messaging_messaging_factory.IMessagesHandler.md).[isConnected](../interfaces/messaging_messaging_factory.IMessagesHandler.md#isconnected)

___

### publish

▸ **publish**<`T`\>(`subject`, `message`): `void`

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

`void`

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

___

### init

▸ `Static` **init**(`natsServerUrl`): `Promise`<[`IMessagesHandler`](../interfaces/messaging_messaging_factory.IMessagesHandler.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `natsServerUrl` | `string` |

#### Returns

`Promise`<[`IMessagesHandler`](../interfaces/messaging_messaging_factory.IMessagesHandler.md)\>
