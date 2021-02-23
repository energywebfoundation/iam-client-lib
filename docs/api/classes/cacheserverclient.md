**[iam-client-lib](../README.md)**

# Class: CacheServerClient

## Hierarchy

* **CacheServerClient**

## Implements

* [ICacheServerClient](../interfaces/icacheserverclient.md)

## Index

### Constructors

* [constructor](cacheserverclient.md#constructor)

### Methods

* [addDIDToWatchList](cacheserverclient.md#adddidtowatchlist)
* [addFailedRequest](cacheserverclient.md#addfailedrequest)
* [deleteClaim](cacheserverclient.md#deleteclaim)
* [getAppDefinition](cacheserverclient.md#getappdefinition)
* [getApplicationRoles](cacheserverclient.md#getapplicationroles)
* [getApplicationsByOrganization](cacheserverclient.md#getapplicationsbyorganization)
* [getApplicationsByOwner](cacheserverclient.md#getapplicationsbyowner)
* [getDIDsForRole](cacheserverclient.md#getdidsforrole)
* [getDidDocument](cacheserverclient.md#getdiddocument)
* [getIssuedClaims](cacheserverclient.md#getissuedclaims)
* [getNamespaceBySearchPhrase](cacheserverclient.md#getnamespacebysearchphrase)
* [getOrgDefinition](cacheserverclient.md#getorgdefinition)
* [getOrgHierarchy](cacheserverclient.md#getorghierarchy)
* [getOrganizationRoles](cacheserverclient.md#getorganizationroles)
* [getOrganizationsByOwner](cacheserverclient.md#getorganizationsbyowner)
* [getRequestedClaims](cacheserverclient.md#getrequestedclaims)
* [getRoleDefinition](cacheserverclient.md#getroledefinition)
* [getRolesByOwner](cacheserverclient.md#getrolesbyowner)
* [getSubOrganizationsByOrganization](cacheserverclient.md#getsuborganizationsbyorganization)
* [handleSuccessfulReLogin](cacheserverclient.md#handlesuccessfulrelogin)
* [handleUnauthorized](cacheserverclient.md#handleunauthorized)
* [issueClaim](cacheserverclient.md#issueclaim)
* [login](cacheserverclient.md#login)
* [refreshToken](cacheserverclient.md#refreshtoken)
* [rejectClaim](cacheserverclient.md#rejectclaim)
* [requestClaim](cacheserverclient.md#requestclaim)

## Constructors

### constructor

\+ **new CacheServerClient**(`__namedParameters`: { cacheServerSupportsAuth: boolean = true; url: string  }): [CacheServerClient](cacheserverclient.md)

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { cacheServerSupportsAuth: boolean = true; url: string  } |

**Returns:** [CacheServerClient](cacheserverclient.md)

## Methods

### addDIDToWatchList

▸ **addDIDToWatchList**(`__namedParameters`: { did: string  }): Promise\<void>

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { did: string  } |

**Returns:** Promise\<void>

___

### addFailedRequest

▸ **addFailedRequest**(`callback`: () => void): void

#### Parameters:

Name | Type |
------ | ------ |
`callback` | () => void |

**Returns:** void

___

### deleteClaim

▸ **deleteClaim**(`__namedParameters`: { claimId: string  }): Promise\<void>

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { claimId: string  } |

**Returns:** Promise\<void>

___

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

### getDIDsForRole

▸ **getDIDsForRole**(`__namedParameters`: { namespace: string  }): Promise\<string[]>

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { namespace: string  } |

**Returns:** Promise\<string[]>

___

### getDidDocument

▸ **getDidDocument**(`__namedParameters`: { did: string ; includeClaims: undefined \| false \| true  }): Promise\<IDIDDocument>

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { did: string ; includeClaims: undefined \| false \| true  } |

**Returns:** Promise\<IDIDDocument>

___

### getIssuedClaims

▸ **getIssuedClaims**(`__namedParameters`: { did: string ; isAccepted: undefined \| false \| true ; parentNamespace: undefined \| string  }): Promise\<[Claim](../interfaces/claim.md)[]>

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { did: string ; isAccepted: undefined \| false \| true ; parentNamespace: undefined \| string  } |

**Returns:** Promise\<[Claim](../interfaces/claim.md)[]>

___

### getNamespaceBySearchPhrase

▸ **getNamespaceBySearchPhrase**(`__namedParameters`: { search: string ; types: undefined \| (\"App\" \| \"Org\" \| \"Role\")[]  }): Promise\<[IApp](../interfaces/iapp.md)[] \| [IRole](../interfaces/irole.md)[] \| [IOrganization](../interfaces/iorganization.md)[]>

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { search: string ; types: undefined \| (\"App\" \| \"Org\" \| \"Role\")[]  } |

**Returns:** Promise\<[IApp](../interfaces/iapp.md)[] \| [IRole](../interfaces/irole.md)[] \| [IOrganization](../interfaces/iorganization.md)[]>

___

### getOrgDefinition

▸ **getOrgDefinition**(`__namedParameters`: { namespace: string  }): Promise\<[IOrganizationDefinition](../interfaces/iorganizationdefinition.md)>

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { namespace: string  } |

**Returns:** Promise\<[IOrganizationDefinition](../interfaces/iorganizationdefinition.md)>

___

### getOrgHierarchy

▸ **getOrgHierarchy**(`__namedParameters`: { namespace: string  }): Promise\<[IOrganization](../interfaces/iorganization.md)>

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { namespace: string  } |

**Returns:** Promise\<[IOrganization](../interfaces/iorganization.md)>

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

▸ **getOrganizationsByOwner**(`__namedParameters`: { excludeSubOrgs: boolean ; owner: string  }): Promise\<[IOrganization](../interfaces/iorganization.md)[]>

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { excludeSubOrgs: boolean ; owner: string  } |

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

### getSubOrganizationsByOrganization

▸ **getSubOrganizationsByOrganization**(`__namedParameters`: { namespace: string  }): Promise\<[IOrganization](../interfaces/iorganization.md)[]>

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { namespace: string  } |

**Returns:** Promise\<[IOrganization](../interfaces/iorganization.md)[]>

___

### handleSuccessfulReLogin

▸ **handleSuccessfulReLogin**(): void

**Returns:** void

___

### handleUnauthorized

▸ **handleUnauthorized**(`error`: AxiosError): Promise\<unknown>

#### Parameters:

Name | Type |
------ | ------ |
`error` | AxiosError |

**Returns:** Promise\<unknown>

___

### issueClaim

▸ **issueClaim**(`__namedParameters`: { did: string ; message: [IClaimIssuance](../interfaces/iclaimissuance.md)  }): Promise\<void>

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { did: string ; message: [IClaimIssuance](../interfaces/iclaimissuance.md)  } |

**Returns:** Promise\<void>

___

### login

▸ **login**(`identityToken`: string): Promise\<void>

#### Parameters:

Name | Type |
------ | ------ |
`identityToken` | string |

**Returns:** Promise\<void>

___

### refreshToken

▸ **refreshToken**(): Promise\<void>

**Returns:** Promise\<void>

___

### rejectClaim

▸ **rejectClaim**(`__namedParameters`: { did: string ; message: [IClaimRejection](../interfaces/iclaimrejection.md)  }): Promise\<void>

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { did: string ; message: [IClaimRejection](../interfaces/iclaimrejection.md)  } |

**Returns:** Promise\<void>

___

### requestClaim

▸ **requestClaim**(`__namedParameters`: { did: string ; message: [IClaimRequest](../interfaces/iclaimrequest.md)  }): Promise\<void>

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { did: string ; message: [IClaimRequest](../interfaces/iclaimrequest.md)  } |

**Returns:** Promise\<void>
