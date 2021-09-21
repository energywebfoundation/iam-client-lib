# Module: utils/did

## Table of contents

### Functions

- [addSupportedDID](utils_did.md#addsupporteddid)
- [isValidDID](utils_did.md#isvaliddid)
- [parseDID](utils_did.md#parsedid)
- [supportedDIDMethods](utils_did.md#supporteddidmethods)

## Functions

### addSupportedDID

▸ **addSupportedDID**(`method`, `validator`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `method` | `Methods` |
| `validator` | (`did`: `string`) => `boolean` |

#### Returns

`void`

___

### isValidDID

▸ **isValidDID**(`did`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `did` | `string` |

#### Returns

`boolean`

___

### parseDID

▸ **parseDID**(`did`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `did` | `string` |

#### Returns

`string`

___

### supportedDIDMethods

▸ **supportedDIDMethods**(): `Methods`[]

#### Returns

`Methods`[]
