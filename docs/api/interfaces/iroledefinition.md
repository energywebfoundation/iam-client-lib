**[iam-client-lib](../README.md)**

# Interface: IRoleDefinition

## Hierarchy

* **IRoleDefinition**

## Index

### Properties

* [fields](iroledefinition.md#fields)
* [issuer](iroledefinition.md#issuer)
* [metadata](iroledefinition.md#metadata)
* [roleName](iroledefinition.md#rolename)
* [roleType](iroledefinition.md#roletype)
* [version](iroledefinition.md#version)

## Properties

### fields

•  **fields**: { fieldType: string ; label: string ; maxDate?: Date ; maxLength?: undefined \| number ; maxValue?: undefined \| number ; minDate?: Date ; minLength?: undefined \| number ; minValue?: undefined \| number ; pattern?: undefined \| string ; required?: undefined \| false \| true  }[]

___

### issuer

•  **issuer**: { did?: string[] ; issuerType?: undefined \| string ; roleName?: undefined \| string  }

#### Type declaration:

Name | Type |
------ | ------ |
`did?` | string[] |
`issuerType?` | undefined \| string |
`roleName?` | undefined \| string |

___

### metadata

•  **metadata**: Record\<string, unknown> \| Record\<string, unknown>[]

___

### roleName

•  **roleName**: string

___

### roleType

•  **roleType**: string

___

### version

•  **version**: string
