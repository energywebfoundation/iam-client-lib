# Class: MessagingService

## Table of contents

### Constructors

- [constructor](MessagingService.md#constructor)

### Methods

- [init](MessagingService.md#init)
- [publish](MessagingService.md#publish)
- [subscribeTo](MessagingService.md#subscribeto)
- [unsubscribeFrom](MessagingService.md#unsubscribefrom)
- [create](MessagingService.md#create)

## Constructors

### constructor

• **new MessagingService**(`_signerService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_signerService` | [`SignerService`](SignerService.md) |

## Methods

### init

▸ **init**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

___

### publish

▸ **publish**(`subject`, `data`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `subject` | `string` |
| `data` | `Uint8Array` |

#### Returns

`Promise`<`void`\>

___

### subscribeTo

▸ **subscribeTo**(`__namedParameters`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.subject?` | `string` |
| `__namedParameters.messageHandler` | (`data`: [`IMessage`](../interfaces/IMessage.md)) => `void` |

#### Returns

`Promise`<`number`\>

___

### unsubscribeFrom

▸ **unsubscribeFrom**(`subscriptionId`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `subscriptionId` | `number` |

#### Returns

`Promise`<`void`\>

___

### create

▸ `Static` **create**(`signerService`): `Promise`<[`MessagingService`](MessagingService.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerService` | [`SignerService`](SignerService.md) |

#### Returns

`Promise`<[`MessagingService`](MessagingService.md)\>
