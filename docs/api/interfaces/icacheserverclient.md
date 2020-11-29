**[iam-client-lib](../README.md)**

# Interface: ICacheServerClient

## Hierarchy

* **ICacheServerClient**

## Implemented by

* [CacheServerClient](../classes/cacheserverclient.md)

## Index

### Properties

* [getAppDefinition](icacheserverclient.md#getappdefinition)
* [getApplicationRoles](icacheserverclient.md#getapplicationroles)
* [getApplicationsByOrganization](icacheserverclient.md#getapplicationsbyorganization)
* [getApplicationsByOwner](icacheserverclient.md#getapplicationsbyowner)
* [getApplicationsBySearchPhrase](icacheserverclient.md#getapplicationsbysearchphrase)
* [getIssuedClaims](icacheserverclient.md#getissuedclaims)
* [getOrgDefinition](icacheserverclient.md#getorgdefinition)
* [getOrganizationRoles](icacheserverclient.md#getorganizationroles)
* [getOrganizationsByOwner](icacheserverclient.md#getorganizationsbyowner)
* [getOrganizationsBySearchPhrase](icacheserverclient.md#getorganizationsbysearchphrase)
* [getRequestedClaims](icacheserverclient.md#getrequestedclaims)
* [getRoleDefinition](icacheserverclient.md#getroledefinition)
* [getRolesByOwner](icacheserverclient.md#getrolesbyowner)
* [issueClaim](icacheserverclient.md#issueclaim)
* [requestClaim](icacheserverclient.md#requestclaim)

## Properties

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

### getApplicationsBySearchPhrase

•  **getApplicationsBySearchPhrase**: (\_\_namedParameters: { search: string  }) => Promise\<[IApp](iapp.md)[]>

___

### getIssuedClaims

•  **getIssuedClaims**: (\_\_namedParameters: { did: string ; isAccepted: undefined \| false \| true ; parentNamespace: undefined \| string  }) => Promise\<[Claim](claim.md)[]>

___

### getOrgDefinition

•  **getOrgDefinition**: (\_\_namedParameters: { namespace: string  }) => Promise\<[IOrganizationDefinition](iorganizationdefinition.md)>

___

### getOrganizationRoles

•  **getOrganizationRoles**: (\_\_namedParameters: { namespace: string  }) => Promise\<[IRole](irole.md)[]>

___

### getOrganizationsByOwner

•  **getOrganizationsByOwner**: (\_\_namedParameters: { owner: string  }) => Promise\<[IOrganization](iorganization.md)[]>

___

### getOrganizationsBySearchPhrase

•  **getOrganizationsBySearchPhrase**: (\_\_namedParameters: { search: string  }) => Promise\<[IOrganization](iorganization.md)[]>

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

### issueClaim

•  **issueClaim**: (\_\_namedParameters: { did: string ; message: [IMessage](imessage.md)  }) => Promise\<void>

___

### requestClaim

•  **requestClaim**: (\_\_namedParameters: { did: string ; message: [IMessage](imessage.md)  }) => Promise\<void>
