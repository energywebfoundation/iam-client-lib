**[iam-client-lib](../README.md)**

> [Globals](../globals.md) / EnsRegistryFactory

# Class: EnsRegistryFactory

## Hierarchy

* ContractFactory

  ↳ **EnsRegistryFactory**

## Index

### Constructors

* [constructor](ensregistryfactory.md#constructor)

### Properties

* [bytecode](ensregistryfactory.md#bytecode)
* [interface](ensregistryfactory.md#interface)
* [signer](ensregistryfactory.md#signer)

### Methods

* [attach](ensregistryfactory.md#attach)
* [connect](ensregistryfactory.md#connect)
* [deploy](ensregistryfactory.md#deploy)
* [getDeployTransaction](ensregistryfactory.md#getdeploytransaction)
* [connect](ensregistryfactory.md#connect)
* [fromSolidity](ensregistryfactory.md#fromsolidity)

## Constructors

### constructor

\+ **new EnsRegistryFactory**(`signer?`: Signer): [EnsRegistryFactory](ensregistryfactory.md)

*Overrides void*

#### Parameters:

Name | Type |
------ | ------ |
`signer?` | Signer |

**Returns:** [EnsRegistryFactory](ensregistryfactory.md)

## Properties

### bytecode

• `Readonly` **bytecode**: string

*Inherited from [EnsRegistryFactory](ensregistryfactory.md).[bytecode](ensregistryfactory.md#bytecode)*

___

### interface

• `Readonly` **interface**: Interface

*Inherited from [EnsRegistryFactory](ensregistryfactory.md).[interface](ensregistryfactory.md#interface)*

___

### signer

• `Readonly` **signer**: Signer

*Inherited from [EnsRegistryFactory](ensregistryfactory.md).[signer](ensregistryfactory.md#signer)*

## Methods

### attach

▸ **attach**(`address`: string): EnsRegistry

*Overrides void*

#### Parameters:

Name | Type |
------ | ------ |
`address` | string |

**Returns:** EnsRegistry

___

### connect

▸ **connect**(`signer`: Signer): [EnsRegistryFactory](ensregistryfactory.md)

*Overrides void*

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`signer` | Signer | identity on behalf of which operations on Ens will be performed  |

**Returns:** [EnsRegistryFactory](ensregistryfactory.md)

___

### deploy

▸ **deploy**(`overrides?`: TransactionOverrides): Promise\<EnsRegistry>

*Overrides void*

#### Parameters:

Name | Type |
------ | ------ |
`overrides?` | TransactionOverrides |

**Returns:** Promise\<EnsRegistry>

___

### getDeployTransaction

▸ **getDeployTransaction**(`overrides?`: TransactionOverrides): UnsignedTransaction

*Overrides void*

#### Parameters:

Name | Type |
------ | ------ |
`overrides?` | TransactionOverrides |

**Returns:** UnsignedTransaction

___

### connect

▸ `Static`**connect**(`address`: string, `signerOrProvider`: Signer \| Provider): EnsRegistry

#### Parameters:

Name | Type |
------ | ------ |
`address` | string |
`signerOrProvider` | Signer \| Provider |

**Returns:** EnsRegistry

___

### fromSolidity

▸ `Static`**fromSolidity**(`compilerOutput`: any, `signer?`: Signer): ContractFactory

*Inherited from [EnsRegistryFactory](ensregistryfactory.md).[fromSolidity](ensregistryfactory.md#fromsolidity)*

#### Parameters:

Name | Type |
------ | ------ |
`compilerOutput` | any |
`signer?` | Signer |

**Returns:** ContractFactory
