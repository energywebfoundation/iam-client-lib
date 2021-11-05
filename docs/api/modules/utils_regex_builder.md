# Module: utils/regex\_builder

## Table of contents

### Functions

- [buildRegex](utils_regex_builder.md#buildregex)

## Functions

### buildRegex

▸ **buildRegex**(`pattern?`): `RegExp` \| ``null``

buildRegex

**`description`** turns string in format '/abc/f' into RegExp object

#### Parameters

| Name | Type |
| :------ | :------ |
| `pattern?` | `string` |

#### Returns

`RegExp` \| ``null``

RegExp if vaid pattern , null if no pattern, throws Error on wrong format
