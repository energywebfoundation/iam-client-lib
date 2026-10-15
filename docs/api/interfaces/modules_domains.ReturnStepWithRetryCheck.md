# Interface: ReturnStepWithRetryCheck

[modules/domains](../modules/modules_domains.md).ReturnStepWithRetryCheck

## Table of contents

### Properties

- [info](modules_domains.ReturnStepWithRetryCheck.md#info)
- [next](modules_domains.ReturnStepWithRetryCheck.md#next)
- [tx](modules_domains.ReturnStepWithRetryCheck.md#tx)

## Properties

### info

• **info**: `string`

___

### next

• **next**: (`opt?`: \{ `retryCheck?`: `boolean`  }) => `Promise`\<`undefined` \| `TransactionReceipt`\>

#### Type declaration

▸ (`opt?`): `Promise`\<`undefined` \| `TransactionReceipt`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `opt?` | `Object` |
| `opt.retryCheck?` | `boolean` |

##### Returns

`Promise`\<`undefined` \| `TransactionReceipt`\>

___

### tx

• **tx**: `EncodedCall`
