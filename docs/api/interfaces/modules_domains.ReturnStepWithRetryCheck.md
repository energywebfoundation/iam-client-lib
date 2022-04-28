# Interface: ReturnStepWithRetryCheck

[modules/domains](../modules/modules_domains.md).ReturnStepWithRetryCheck

## Table of contents

### Properties

- [info](modules_domains.ReturnStepWithRetryCheck.md#info)
- [tx](modules_domains.ReturnStepWithRetryCheck.md#tx)

### Methods

- [next](modules_domains.ReturnStepWithRetryCheck.md#next)

## Properties

### info

• **info**: `string`

___

### tx

• **tx**: `EncodedCall`

## Methods

### next

▸ **next**(`opt?`): `Promise`<`undefined` \| `TransactionReceipt`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt?` | `Object` |
| `opt.retryCheck?` | `boolean` |

#### Returns

`Promise`<`undefined` \| `TransactionReceipt`\>
