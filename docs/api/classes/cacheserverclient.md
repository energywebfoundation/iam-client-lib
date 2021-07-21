**[iam-client-lib](../README.md)**

# Class: CacheServerClient

## Hierarchy

* **CacheServerClient**

## Implements

* [ICacheServerClient](../interfaces/icacheserverclient.md)

## Index

### Constructors

* [constructor](cacheserverclient.md#constructor)

### Properties

* [pubKeyAndIdentityToken](cacheserverclient.md#pubkeyandidentitytoken)

### Methods

* [addDIDToWatchList](cacheserverclient.md#adddidtowatchlist)
* [addFailedRequest](cacheserverclient.md#addfailedrequest)
* [deleteClaim](cacheserverclient.md#deleteclaim)
* [getAppDefinition](cacheserverclient.md#getappdefinition)
* [getApplicationRoles](cacheserverclient.md#getapplicationroles)
* [getApplicationsByOrganization](cacheserverclient.md#getapplicationsbyorganization)
* [getApplicationsByOwner](cacheserverclient.md#getapplicationsbyowner)
* [getAssetById](cacheserverclient.md#getassetbyid)
* [getAssetHistory](cacheserverclient.md#getassethistory)
* [getClaimsByIssuer](cacheserverclient.md#getclaimsbyissuer)
* [getClaimsByRequester](cacheserverclient.md#getclaimsbyrequester)
* [getClaimsBySubject](cacheserverclient.md#getclaimsbysubject)
* [getClaimsBySubjects](cacheserverclient.md#getclaimsbysubjects)
* [getDIDsForRole](cacheserverclient.md#getdidsforrole)
* [getDidDocument](cacheserverclient.md#getdiddocument)
* [getNamespaceBySearchPhrase](cacheserverclient.md#getnamespacebysearchphrase)
* [getOfferedAssets](cacheserverclient.md#getofferedassets)
* [getOrgDefinition](cacheserverclient.md#getorgdefinition)
* [getOrgHierarchy](cacheserverclient.md#getorghierarchy)
* [getOrganizationRoles](cacheserverclient.md#getorganizationroles)
* [getOrganizationsByOwner](cacheserverclient.md#getorganizationsbyowner)
* [getOwnedAssets](cacheserverclient.md#getownedassets)
* [getPreviouslyOwnedAssets](cacheserverclient.md#getpreviouslyownedassets)
* [getRoleDefinition](cacheserverclient.md#getroledefinition)
* [getRolesByOwner](cacheserverclient.md#getrolesbyowner)
* [getSubOrganizationsByOrganization](cacheserverclient.md#getsuborganizationsbyorganization)
* [handleRefreshToken](cacheserverclient.md#handlerefreshtoken)
* [handleUnauthorized](cacheserverclient.md#handleunauthorized)
* [isAuthEnabled](cacheserverclient.md#isauthenabled)
* [issueClaim](cacheserverclient.md#issueclaim)
* [login](cacheserverclient.md#login)
* [rejectClaim](cacheserverclient.md#rejectclaim)
* [requestClaim](cacheserverclient.md#requestclaim)
* [testLogin](cacheserverclient.md#testlogin)

## Constructors

### constructor

\+ **new CacheServerClient**(`__namedParameters`: { cacheServerSupportsAuth: boolean = true; url: string  }, `signer`: Signer): [CacheServerClient](cacheserverclient.md)

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { cacheServerSupportsAuth: boolean = true; url: string  } |
`signer` | Signer |

**Returns:** [CacheServerClient](cacheserverclient.md)

## Properties

### pubKeyAndIdentityToken

•  **pubKeyAndIdentityToken**: [IPubKeyAndIdentityToken](../interfaces/ipubkeyandidentitytoken.md) \| undefined

*Implementation of [ICacheServerClient](../interfaces/icacheserverclient.md).[pubKeyAndIdentityToken](../interfaces/icacheserverclient.md#pubkeyandidentitytoken)*

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

▸ **addFailedRequest**(`callback`: (token?: undefined \| string) => void): void

#### Parameters:

Name | Type |
------ | ------ |
`callback` | (token?: undefined \| string) => void |

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

▸ **getAppDefinition**(`__namedParameters`: { namespace: string  }): Promise\<IAppDefinition>

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { namespace: string  } |

**Returns:** Promise\<IAppDefinition>

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

### getAssetById

▸ **getAssetById**(`__namedParameters`: { id: string  }): Promise\<[Asset](../interfaces/asset.md)>

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { id: string  } |

**Returns:** Promise\<[Asset](../interfaces/asset.md)>

___

### getAssetHistory

▸ **getAssetHistory**(`__namedParameters`: { id: string ; order: undefined \| [ASC](../enums/order.md#asc) \| [DESC](../enums/order.md#desc) ; skip: undefined \| number ; take: undefined \| number ; type: undefined \| [ASSET\_CREATED](../enums/assethistoryeventtype.md#asset_created) \| [ASSET\_OFFERED](../enums/assethistoryeventtype.md#asset_offered) \| [ASSET\_OFFER\_CANCELED](../enums/assethistoryeventtype.md#asset_offer_canceled) \| [ASSET\_TRANSFERRED](../enums/assethistoryeventtype.md#asset_transferred) \| [ASSET\_OFFER\_REJECTED](../enums/assethistoryeventtype.md#asset_offer_rejected)  }): Promise\<[AssetHistory](../interfaces/assethistory.md)[]>

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { id: string ; order: undefined \| [ASC](../enums/order.md#asc) \| [DESC](../enums/order.md#desc) ; skip: undefined \| number ; take: undefined \| number ; type: undefined \| [ASSET\_CREATED](../enums/assethistoryeventtype.md#asset_created) \| [ASSET\_OFFERED](../enums/assethistoryeventtype.md#asset_offered) \| [ASSET\_OFFER\_CANCELED](../enums/assethistoryeventtype.md#asset_offer_canceled) \| [ASSET\_TRANSFERRED](../enums/assethistoryeventtype.md#asset_transferred) \| [ASSET\_OFFER\_REJECTED](../enums/assethistoryeventtype.md#asset_offer_rejected)  } |

**Returns:** Promise\<[AssetHistory](../interfaces/assethistory.md)[]>

___

### getClaimsByIssuer

▸ **getClaimsByIssuer**(`__namedParameters`: { did: string ; isAccepted: undefined \| false \| true ; namespace: undefined \| string  }): Promise\<[Claim](../interfaces/claim.md)[]>

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { did: string ; isAccepted: undefined \| false \| true ; namespace: undefined \| string  } |

**Returns:** Promise\<[Claim](../interfaces/claim.md)[]>

___

### getClaimsByRequester

▸ **getClaimsByRequester**(`__namedParameters`: { did: string ; isAccepted: undefined \| false \| true ; namespace: undefined \| string  }): Promise\<[Claim](../interfaces/claim.md)[]>

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { did: string ; isAccepted: undefined \| false \| true ; namespace: undefined \| string  } |

**Returns:** Promise\<[Claim](../interfaces/claim.md)[]>

___

### getClaimsBySubject

▸ **getClaimsBySubject**(`__namedParameters`: { did: string ; isAccepted: undefined \| false \| true ; namespace: undefined \| string  }): Promise\<[Claim](../interfaces/claim.md)[]>

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { did: string ; isAccepted: undefined \| false \| true ; namespace: undefined \| string  } |

**Returns:** Promise\<[Claim](../interfaces/claim.md)[]>

___

### getClaimsBySubjects

▸ **getClaimsBySubjects**(`subjects`: string[]): Promise\<[Claim](../interfaces/claim.md)[]>

#### Parameters:

Name | Type |
------ | ------ |
`subjects` | string[] |

**Returns:** Promise\<[Claim](../interfaces/claim.md)[]>

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

### getNamespaceBySearchPhrase

▸ **getNamespaceBySearchPhrase**(`__namedParameters`: { search: string ; types: undefined \| (\"App\" \| \"Org\" \| \"Role\")[]  }): Promise\<([IApp](../interfaces/iapp.md) \| [IRole](../interfaces/irole.md) \| [IOrganization](../interfaces/iorganization.md))[]>

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { search: string ; types: undefined \| (\"App\" \| \"Org\" \| \"Role\")[]  } |

**Returns:** Promise\<([IApp](../interfaces/iapp.md) \| [IRole](../interfaces/irole.md) \| [IOrganization](../interfaces/iorganization.md))[]>

___

### getOfferedAssets

▸ **getOfferedAssets**(`__namedParameters`: { did: string  }): Promise\<[Asset](../interfaces/asset.md)[]>

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { did: string  } |

**Returns:** Promise\<[Asset](../interfaces/asset.md)[]>

___

### getOrgDefinition

▸ **getOrgDefinition**(`__namedParameters`: { namespace: string  }): Promise\<IOrganizationDefinition>

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { namespace: string  } |

**Returns:** Promise\<IOrganizationDefinition>

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

### getOwnedAssets

▸ **getOwnedAssets**(`__namedParameters`: { did: string  }): Promise\<[Asset](../interfaces/asset.md)[]>

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { did: string  } |

**Returns:** Promise\<[Asset](../interfaces/asset.md)[]>

___

### getPreviouslyOwnedAssets

▸ **getPreviouslyOwnedAssets**(`__namedParameters`: { owner: string  }): Promise\<[Asset](../interfaces/asset.md)[]>

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { owner: string  } |

**Returns:** Promise\<[Asset](../interfaces/asset.md)[]>

___

### getRoleDefinition

▸ **getRoleDefinition**(`__namedParameters`: { namespace: string  }): Promise\<IRoleDefinition>

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { namespace: string  } |

**Returns:** Promise\<IRoleDefinition>

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

### handleRefreshToken

▸ **handleRefreshToken**(): Promise\<void>

**Returns:** Promise\<void>

___

### handleUnauthorized

▸ **handleUnauthorized**(`error`: AxiosError): Promise\<unknown>

#### Parameters:

Name | Type |
------ | ------ |
`error` | AxiosError |

**Returns:** Promise\<unknown>

___

### isAuthEnabled

▸ **isAuthEnabled**(): boolean

**Returns:** boolean

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

▸ **login**(): Promise\<{ pubKeyAndIdentityToken: [IPubKeyAndIdentityToken](../interfaces/ipubkeyandidentitytoken.md) ; refreshToken: string ; token: string  }>

**Returns:** Promise\<{ pubKeyAndIdentityToken: [IPubKeyAndIdentityToken](../interfaces/ipubkeyandidentitytoken.md) ; refreshToken: string ; token: string  }>

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

___

### testLogin

▸ **testLogin**(): Promise\<void>

**Returns:** Promise\<void>
