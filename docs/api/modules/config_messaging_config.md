# Module: config/messaging.config

## Table of contents

### Interfaces

- [MessagingConfig](../interfaces/config_messaging_config.MessagingConfig.md)

### Functions

- [getMessagingConfig](config_messaging_config.md#getmessagingconfig)
- [setMessagingConfig](config_messaging_config.md#setmessagingconfig)

## Functions

### getMessagingConfig

▸ `Const` **getMessagingConfig**(): `Object`

#### Returns

`Object`

___

### setMessagingConfig

▸ `Const` **setMessagingConfig**(`chainId`, `options`): `void`

Used to override existing messaging configuration or add a missing one
Configuration must be set before constructing `IAM`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | `number` |
| `options` | `Partial`<[`MessagingConfig`](../interfaces/config_messaging_config.MessagingConfig.md)\> |

#### Returns

`void`
