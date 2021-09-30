# Module: config/messaging.config

## Table of contents

### Interfaces

- [MessagingConfig](../interfaces/config_messaging_config.MessagingConfig.md)

### Functions

- [messagingConfigs](config_messaging_config.md#messagingconfigs)
- [setMessagingConfig](config_messaging_config.md#setmessagingconfig)

## Functions

### messagingConfigs

▸ `Const` **messagingConfigs**(): `Object`

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
