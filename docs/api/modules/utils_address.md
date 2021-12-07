# Module: utils/address

## Table of contents

### Functions

- [validateAddress](utils_address.md#validateaddress)

## Functions

### validateAddress

▸ **validateAddress**(`address`): `void`

Validate that address is valid ethereum address.
Expect that error is thrown if not
Uses ethers function but encapsulates to be able to swap in the future:
https://docs.ethers.io/v5/api/utils/address/#utils-getAddress

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | address to verify |

#### Returns

`void`
