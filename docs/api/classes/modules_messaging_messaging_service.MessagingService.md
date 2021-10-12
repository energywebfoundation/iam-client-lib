# Class: MessagingService

[modules/messaging/messaging.service](../modules/modules_messaging_messaging_service.md).MessagingService

## Table of contents

### Constructors

- [constructor](modules_messaging_messaging_service.MessagingService.md#constructor)

### Methods

- [init](modules_messaging_messaging_service.MessagingService.md#init)
- [publish](modules_messaging_messaging_service.MessagingService.md#publish)
- [subscribeTo](modules_messaging_messaging_service.MessagingService.md#subscribeto)
- [unsubscribeFrom](modules_messaging_messaging_service.MessagingService.md#unsubscribefrom)
- [create](modules_messaging_messaging_service.MessagingService.md#create)

## Constructors

### constructor

• **new MessagingService**(`_signerService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_signerService` | [`SignerService`](modules_signer_signer_service.SignerService.md) |

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

▸ **subscribeTo**(`__namedParameters`): `Promise`<`undefined` \| `number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.subject?` | `string` |
| `__namedParameters.messageHandler` | (`data`: [`IMessage`](../interfaces/modules_messaging_messaging_types.IMessage.md)) => `void` |

#### Returns

`Promise`<`undefined` \| `number`\>

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

▸ `Static` **create**(`signerService`): `Promise`<[`MessagingService`](modules_messaging_messaging_service.MessagingService.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerService` | [`SignerService`](modules_signer_signer_service.SignerService.md) |

#### Returns

`Promise`<[`MessagingService`](modules_messaging_messaging_service.MessagingService.md)\>
