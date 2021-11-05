# Module: iam/roleRequiredFieldsHelper

## Table of contents

### Type aliases

- [RoleRequiredParamSchema](iam_roleRequiredFieldsHelper.md#rolerequiredparamschema)

### Variables

- [REQUIRED\_PARAMS\_FIELD\_NAME](iam_roleRequiredFieldsHelper.md#required_params_field_name)

### Functions

- [validateRequiredParamsDefinition](iam_roleRequiredFieldsHelper.md#validaterequiredparamsdefinition)
- [verifyRequiredParams](iam_roleRequiredFieldsHelper.md#verifyrequiredparams)

## Type aliases

### RoleRequiredParamSchema

Ƭ **RoleRequiredParamSchema**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `description` | `string` |
| `name` | `string` |
| `pattern?` | `string` |

## Variables

### REQUIRED\_PARAMS\_FIELD\_NAME

• `Const` **REQUIRED\_PARAMS\_FIELD\_NAME**: ``"requiredParams"``

## Functions

### validateRequiredParamsDefinition

▸ **validateRequiredParamsDefinition**(`roleDefinition`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `roleDefinition` | `IRoleDefinition` |

#### Returns

`void`

___

### verifyRequiredParams

▸ **verifyRequiredParams**(`__namedParameters`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.claimParams` | `Record`<`string`, `string`\> \| `undefined` |
| `__namedParameters.roleDefinition` | `IRoleDefinition` |

#### Returns

`void`
