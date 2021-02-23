**[iam-client-lib](../README.md)**

# Interface: ICacheServerClient

## Hierarchy

* **ICacheServerClient**

## Implemented by

* [CacheServerClient](../classes/cacheserverclient.md)

## Index

### Properties

* [addDIDToWatchList](icacheserverclient.md#adddidtowatchlist)
* [deleteClaim](icacheserverclient.md#deleteclaim)
* [getAppDefinition](icacheserverclient.md#getappdefinition)
* [getApplicationRoles](icacheserverclient.md#getapplicationroles)
* [getApplicationsByOrganization](icacheserverclient.md#getapplicationsbyorganization)
* [getApplicationsByOwner](icacheserverclient.md#getapplicationsbyowner)
* [getDIDsForRole](icacheserverclient.md#getdidsforrole)
* [getDidDocument](icacheserverclient.md#getdiddocument)
* [getIssuedClaims](icacheserverclient.md#getissuedclaims)
* [getNamespaceBySearchPhrase](icacheserverclient.md#getnamespacebysearchphrase)
* [getOrgDefinition](icacheserverclient.md#getorgdefinition)
* [getOrgHierarchy](icacheserverclient.md#getorghierarchy)
* [getOrganizationRoles](icacheserverclient.md#getorganizationroles)
* [getOrganizationsByOwner](icacheserverclient.md#getorganizationsbyowner)
* [getRequestedClaims](icacheserverclient.md#getrequestedclaims)
* [getRoleDefinition](icacheserverclient.md#getroledefinition)
* [getRolesByOwner](icacheserverclient.md#getrolesbyowner)
* [getSubOrganizationsByOrganization](icacheserverclient.md#getsuborganizationsbyorganization)
* [issueClaim](icacheserverclient.md#issueclaim)
* [login](icacheserverclient.md#login)
* [rejectClaim](icacheserverclient.md#rejectclaim)
* [requestClaim](icacheserverclient.md#requestclaim)

## Properties

### addDIDToWatchList

•  **addDIDToWatchList**: (\_\_namedParameters: { did: string  }) => Promise\<void>

___

### deleteClaim

•  **deleteClaim**: (\_\_namedParameters: { claimId: string  }) => Promise\<void>

___

### getAppDefinition

•  **getAppDefinition**: (\_\_namedParameters: { namespace: string  }) => Promise\<[IAppDefinition](iappdefinition.md)>

___

### getApplicationRoles

•  **getApplicationRoles**: (\_\_namedParameters: { namespace: string  }) => Promise\<[IRole](irole.md)[]>

___

### getApplicationsByOrganization

•  **getApplicationsByOrganization**: (\_\_namedParameters: { namespace: string  }) => Promise\<[IApp](iapp.md)[]>

___

### getApplicationsByOwner

•  **getApplicationsByOwner**: (\_\_namedParameters: { owner: string  }) => Promise\<[IApp](iapp.md)[]>

___

### getDIDsForRole

•  **getDIDsForRole**: (\_\_namedParameters: { namespace: string  }) => Promise\<string[]>

___

### getDidDocument

•  **getDidDocument**: (\_\_namedParameters: { did: string ; includeClaims: undefined \| false \| true  }) => Promise\<IDIDDocument>

___

### getIssuedClaims

•  **getIssuedClaims**: (\_\_namedParameters: { did: string ; isAccepted: undefined \| false \| true ; parentNamespace: undefined \| string  }) => Promise\<[Claim](claim.md)[]>

___

### getNamespaceBySearchPhrase

•  **getNamespaceBySearchPhrase**: (\_\_namedParameters: { search: string ; types: undefined \| (\"App\" \| \"Org\" \| \"Role\")[]  }) => Promise\<[IOrganization](iorganization.md)[] \| [IApp](iapp.md)[] \| [IRole](irole.md)[]>

___

### getOrgDefinition

•  **getOrgDefinition**: (\_\_namedParameters: { namespace: string  }) => Promise\<[IOrganizationDefinition](iorganizationdefinition.md)>

___

### getOrgHierarchy

•  **getOrgHierarchy**: (\_\_namedParameters: { namespace: string  }) => Promise\<[IOrganization](iorganization.md)>

___

### getOrganizationRoles

•  **getOrganizationRoles**: (\_\_namedParameters: { namespace: string  }) => Promise\<[IRole](irole.md)[]>

___

### getOrganizationsByOwner

•  **getOrganizationsByOwner**: (\_\_namedParameters: { excludeSubOrgs: boolean ; owner: string  }) => Promise\<[IOrganization](iorganization.md)[]>

___

### getRequestedClaims

•  **getRequestedClaims**: (\_\_namedParameters: { did: string ; isAccepted: undefined \| false \| true ; parentNamespace: undefined \| string  }) => Promise\<[Claim](claim.md)[]>

___

### getRoleDefinition

•  **getRoleDefinition**: (\_\_namedParameters: { namespace: string  }) => Promise\<[IRoleDefinition](iroledefinition.md)>

___

### getRolesByOwner

•  **getRolesByOwner**: (\_\_namedParameters: { owner: string  }) => Promise\<[IRole](irole.md)[]>

___

### getSubOrganizationsByOrganization

•  **getSubOrganizationsByOrganization**: (\_\_namedParameters: { namespace: string  }) => Promise\<[IOrganization](iorganization.md)[]>

___

### issueClaim

•  **issueClaim**: (\_\_namedParameters: { did: string ; message: [IClaimIssuance](iclaimissuance.md)  }) => Promise\<void>

___

### login

•  **login**: (claim: string) => Promise\<void>

___

### rejectClaim

•  **rejectClaim**: (\_\_namedParameters: { did: string ; message: [IClaimRejection](iclaimrejection.md)  }) => Promise\<void>

___

### requestClaim

•  **requestClaim**: (\_\_namedParameters: { did: string ; message: [IClaimRequest](iclaimrequest.md)  }) => Promise\<void>
