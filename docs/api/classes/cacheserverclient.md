**[iam-client-lib](../README.md)**

> [Globals](../globals.md) / CacheServerClient

# Class: CacheServerClient

## Hierarchy

* **CacheServerClient**

## Implements

* [ICacheServerClient](../interfaces/icacheserverclient.md)

## Index

### Constructors

* [constructor](cacheserverclient.md#constructor)

### Properties

* [httpClient](cacheserverclient.md#httpclient)

### Methods

* [getAppDefinition](cacheserverclient.md#getappdefinition)
* [getApplicationRoles](cacheserverclient.md#getapplicationroles)
* [getApplicationsByOrganization](cacheserverclient.md#getapplicationsbyorganization)
* [getApplicationsByOwner](cacheserverclient.md#getapplicationsbyowner)
* [getApplicationsBySearchPhrase](cacheserverclient.md#getapplicationsbysearchphrase)
* [getIssuedClaims](cacheserverclient.md#getissuedclaims)
* [getOrgDefinition](cacheserverclient.md#getorgdefinition)
* [getOrganizationRoles](cacheserverclient.md#getorganizationroles)
* [getOrganizationsByOwner](cacheserverclient.md#getorganizationsbyowner)
* [getOrganizationsBySearchPhrase](cacheserverclient.md#getorganizationsbysearchphrase)
* [getRequestedClaims](cacheserverclient.md#getrequestedclaims)
* [getRoleDefinition](cacheserverclient.md#getroledefinition)
* [getRolesByOwner](cacheserverclient.md#getrolesbyowner)
* [issueClaim](cacheserverclient.md#issueclaim)
* [requestClaim](cacheserverclient.md#requestclaim)

## Constructors

### constructor

\+ **new CacheServerClient**(`__namedParameters`: { url: string  }): [CacheServerClient](cacheserverclient.md)

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { url: string  } |

**Returns:** [CacheServerClient](cacheserverclient.md)

## Properties

### httpClient

• `Private` **httpClient**: AxiosInstance

## Methods

### getAppDefinition

▸ **getAppDefinition**(`__namedParameters`: { namespace: string  }): Promise\<[IAppDefinition](../interfaces/iappdefinition.md)>

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { namespace: string  } |

**Returns:** Promise\<[IAppDefinition](../interfaces/iappdefinition.md)>

___

### getApplicationRoles

▸ **getApplicationRoles**(`__namedParameters`: { namespace: string  }): Promise\<[IRole](../interfaces/irole.md)[]>

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { namespace: string  } |

**Returns:** Promise\<[IRole](../interfaces/irole.md)[]>

___

### getApplicationsByOrganization

▸ **getApplicationsByOrganization**(`__namedParameters`: { namespace: string  }): Promise\<[IApp](../interfaces/iapp.md)[]>

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { namespace: string  } |

**Returns:** Promise\<[IApp](../interfaces/iapp.md)[]>

___

### getApplicationsByOwner

▸ **getApplicationsByOwner**(`__namedParameters`: { owner: string  }): Promise\<[IApp](../interfaces/iapp.md)[]>

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { owner: string  } |

**Returns:** Promise\<[IApp](../interfaces/iapp.md)[]>

___

### getApplicationsBySearchPhrase

▸ **getApplicationsBySearchPhrase**(`__namedParameters`: { search: string  }): Promise\<[IApp](../interfaces/iapp.md)[]>

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { search: string  } |

**Returns:** Promise\<[IApp](../interfaces/iapp.md)[]>

___

### getIssuedClaims

▸ **getIssuedClaims**(`__namedParameters`: { did: string ; isAccepted: undefined \| false \| true ; parentNamespace: undefined \| string  }): Promise\<[Claim](../interfaces/claim.md)[]>

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { did: string ; isAccepted: undefined \| false \| true ; parentNamespace: undefined \| string  } |

**Returns:** Promise\<[Claim](../interfaces/claim.md)[]>

___

### getOrgDefinition

▸ **getOrgDefinition**(`__namedParameters`: { namespace: string  }): Promise\<[IOrganizationDefinition](../interfaces/iorganizationdefinition.md)>

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { namespace: string  } |

**Returns:** Promise\<[IOrganizationDefinition](../interfaces/iorganizationdefinition.md)>

___

### getOrganizationRoles

▸ **getOrganizationRoles**(`__namedParameters`: { namespace: string  }): Promise\<[IRole](../interfaces/irole.md)[]>

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { namespace: string  } |

**Returns:** Promise\<[IRole](../interfaces/irole.md)[]>

___

### getOrganizationsByOwner

▸ **getOrganizationsByOwner**(`__namedParameters`: { owner: string  }): Promise\<[IOrganization](../interfaces/iorganization.md)[]>

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { owner: string  } |

**Returns:** Promise\<[IOrganization](../interfaces/iorganization.md)[]>

___

### getOrganizationsBySearchPhrase

▸ **getOrganizationsBySearchPhrase**(`__namedParameters`: { search: string  }): Promise\<[IOrganization](../interfaces/iorganization.md)[]>

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { search: string  } |

**Returns:** Promise\<[IOrganization](../interfaces/iorganization.md)[]>

___

### getRequestedClaims

▸ **getRequestedClaims**(`__namedParameters`: { did: string ; isAccepted: undefined \| false \| true ; parentNamespace: undefined \| string  }): Promise\<[Claim](../interfaces/claim.md)[]>

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { did: string ; isAccepted: undefined \| false \| true ; parentNamespace: undefined \| string  } |

**Returns:** Promise\<[Claim](../interfaces/claim.md)[]>

___

### getRoleDefinition

▸ **getRoleDefinition**(`__namedParameters`: { namespace: string  }): Promise\<[IRoleDefinition](../interfaces/iroledefinition.md)>

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { namespace: string  } |

**Returns:** Promise\<[IRoleDefinition](../interfaces/iroledefinition.md)>

___

### getRolesByOwner

▸ **getRolesByOwner**(`__namedParameters`: { owner: string  }): Promise\<[IRole](../interfaces/irole.md)[]>

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { owner: string  } |

**Returns:** Promise\<[IRole](../interfaces/irole.md)[]>

___

### issueClaim

▸ **issueClaim**(`__namedParameters`: { did: string ; message: [IMessage](../interfaces/imessage.md)  }): Promise\<void>

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { did: string ; message: [IMessage](../interfaces/imessage.md)  } |

**Returns:** Promise\<void>

___

### requestClaim

▸ **requestClaim**(`__namedParameters`: { did: string ; message: [IMessage](../interfaces/imessage.md)  }): Promise\<void>

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { did: string ; message: [IMessage](../interfaces/imessage.md)  } |

**Returns:** Promise\<void>
