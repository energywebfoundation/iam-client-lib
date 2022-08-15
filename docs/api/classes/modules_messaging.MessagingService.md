# Class: MessagingService

[modules/messaging](../modules/modules_messaging.md).MessagingService

Service responsible for handling the messaging via NATS.

```typescript
const { messagingService } = await initWithPrivateKeySigner(privateKey, rpcUrl);
messagingService.subscribeTo(...);
```

## Table of contents

### Constructors

- [constructor](modules_messaging.MessagingService.md#constructor)

### Methods

- [init](modules_messaging.MessagingService.md#init)
- [publish](modules_messaging.MessagingService.md#publish)
- [subscribeTo](modules_messaging.MessagingService.md#subscribeto)
- [unsubscribeFrom](modules_messaging.MessagingService.md#unsubscribefrom)
- [create](modules_messaging.MessagingService.md#create)

## Constructors

### constructor

• **new MessagingService**(`_signerService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_signerService` | [`SignerService`](modules_signer.SignerService.md) |

## Methods

### init

▸ **init**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

___

### publish

▸ **publish**(`subject`, `data`): `void`

Publish a message with data to the given subject.

```typescript
messagingService.publish('*.*.did:ethr:volta:0x00..0.ewf-volta', Uint8Array.from('Hello World'));
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `subject` | `string` | message subject |
| `data` | `Uint8Array` | message data |

#### Returns

`void`

___

### subscribeTo

▸ **subscribeTo**(`options`): `Promise`<`undefined` \| `number`\>

Subscribe to messages on the given subject.

```typescript
messagingService.subscribeTo({
    subject: '*.*.did:ethr:volta:0x00..0.ewf-volta',
    messageHandler: (data) => console.log(data),
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`SubscribeToOptions`](../interfaces/modules_messaging.SubscribeToOptions.md) | object with options |

#### Returns

`Promise`<`undefined` \| `number`\>

subscription id

___

### unsubscribeFrom

▸ **unsubscribeFrom**(`subscriptionId`): `Promise`<`void`\>

Unsubscribe from the given subscription id.

```typescript
messagingService.unsubscribeFrom(55);
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `subscriptionId` | `number` | subscription id |

#### Returns

`Promise`<`void`\>

___

### create

▸ `Static` **create**(`signerService`): `Promise`<[`MessagingService`](modules_messaging.MessagingService.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerService` | [`SignerService`](modules_signer.SignerService.md) |

#### Returns

`Promise`<[`MessagingService`](modules_messaging.MessagingService.md)\>
