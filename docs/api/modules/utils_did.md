# Module: utils/did

## Table of contents

### Variables

- [didPattern](utils_did.md#didpattern)

### Functions

- [addSupportedDID](utils_did.md#addsupporteddid)
- [compareDID](utils_did.md#comparedid)
- [isValidDID](utils_did.md#isvaliddid)
- [supportedDIDMethods](utils_did.md#supporteddidmethods)

## Variables

### didPattern

• `Const` **didPattern**: ``"^(?:did:(?<method>[a-z0-9]+?):)((?<chain>[a-z0-9]+?):)?(?<id>0x[A-Fa-f0-9]{40})$"``

## Functions

### addSupportedDID

▸ **addSupportedDID**(`methodWithChain`, `validator`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `methodWithChain` | `string` |
| `validator` | (`did`: `string`) => `boolean` |

#### Returns

`void`

___

### compareDID

▸ **compareDID**(`didA`, `didB`): `boolean`

**`description`** For verification which envolves legacy and chain-specific DID's

#### Parameters

| Name | Type |
| :------ | :------ |
| `didA` | `string` |
| `didB` | `string` |

#### Returns

`boolean`

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

### supportedDIDMethods

▸ **supportedDIDMethods**(): `string`[]

#### Returns

`string`[]
