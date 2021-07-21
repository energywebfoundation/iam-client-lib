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
* [getAssetById](icacheserverclient.md#getassetbyid)
* [getAssetHistory](icacheserverclient.md#getassethistory)
* [getClaimsByIssuer](icacheserverclient.md#getclaimsbyissuer)
* [getClaimsByRequester](icacheserverclient.md#getclaimsbyrequester)
* [getClaimsBySubject](icacheserverclient.md#getclaimsbysubject)
* [getClaimsBySubjects](icacheserverclient.md#getclaimsbysubjects)
* [getDIDsForRole](icacheserverclient.md#getdidsforrole)
* [getDidDocument](icacheserverclient.md#getdiddocument)
* [getNamespaceBySearchPhrase](icacheserverclient.md#getnamespacebysearchphrase)
* [getOfferedAssets](icacheserverclient.md#getofferedassets)
* [getOrgDefinition](icacheserverclient.md#getorgdefinition)
* [getOrgHierarchy](icacheserverclient.md#getorghierarchy)
* [getOrganizationRoles](icacheserverclient.md#getorganizationroles)
* [getOrganizationsByOwner](icacheserverclient.md#getorganizationsbyowner)
* [getOwnedAssets](icacheserverclient.md#getownedassets)
* [getPreviouslyOwnedAssets](icacheserverclient.md#getpreviouslyownedassets)
* [getRoleDefinition](icacheserverclient.md#getroledefinition)
* [getRolesByOwner](icacheserverclient.md#getrolesbyowner)
* [getSubOrganizationsByOrganization](icacheserverclient.md#getsuborganizationsbyorganization)
* [isAuthEnabled](icacheserverclient.md#isauthenabled)
* [issueClaim](icacheserverclient.md#issueclaim)
* [login](icacheserverclient.md#login)
* [pubKeyAndIdentityToken](icacheserverclient.md#pubkeyandidentitytoken)
* [rejectClaim](icacheserverclient.md#rejectclaim)
* [requestClaim](icacheserverclient.md#requestclaim)
* [testLogin](icacheserverclient.md#testlogin)

## Properties

### addDIDToWatchList

•  **addDIDToWatchList**: (\_\_namedParameters: { did: string  }) => Promise\<void>

___

### deleteClaim

•  **deleteClaim**: (\_\_namedParameters: { claimId: string  }) => Promise\<void>

___

### getAppDefinition

•  **getAppDefinition**: (\_\_namedParameters: { namespace: string  }) => Promise\<IAppDefinition>

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

### getAssetById

•  **getAssetById**: (\_\_namedParameters: { id: string  }) => Promise\<[Asset](asset.md)>

___

### getAssetHistory

•  **getAssetHistory**: (\_\_namedParameters: { id: string ; order: undefined \| [ASC](../enums/order.md#asc) \| [DESC](../enums/order.md#desc) ; skip: undefined \| number ; take: undefined \| number ; type: undefined \| [ASSET\_CREATED](../enums/assethistoryeventtype.md#asset_created) \| [ASSET\_OFFERED](../enums/assethistoryeventtype.md#asset_offered) \| [ASSET\_OFFER\_CANCELED](../enums/assethistoryeventtype.md#asset_offer_canceled) \| [ASSET\_TRANSFERRED](../enums/assethistoryeventtype.md#asset_transferred) \| [ASSET\_OFFER\_REJECTED](../enums/assethistoryeventtype.md#asset_offer_rejected)  }) => Promise\<[AssetHistory](assethistory.md)[]>

___

### getClaimsByIssuer

•  **getClaimsByIssuer**: (\_\_namedParameters: { did: string ; isAccepted: undefined \| false \| true ; parentNamespace: undefined \| string  }) => Promise\<[Claim](claim.md)[]>

___

### getClaimsByRequester

•  **getClaimsByRequester**: (\_\_namedParameters: { did: string ; isAccepted: undefined \| false \| true ; parentNamespace: undefined \| string  }) => Promise\<[Claim](claim.md)[]>

___

### getClaimsBySubject

•  **getClaimsBySubject**: (\_\_namedParameters: { did: string ; isAccepted: undefined \| false \| true ; parentNamespace: undefined \| string  }) => Promise\<[Claim](claim.md)[]>

___

### getClaimsBySubjects

•  **getClaimsBySubjects**: (subjects: string[]) => Promise\<[Claim](claim.md)[]>

___

### getDIDsForRole

•  **getDIDsForRole**: (\_\_namedParameters: { namespace: string  }) => Promise\<string[]>

___

### getDidDocument

•  **getDidDocument**: (\_\_namedParameters: { did: string ; includeClaims: undefined \| false \| true  }) => Promise\<IDIDDocument>

___

### getNamespaceBySearchPhrase

•  **getNamespaceBySearchPhrase**: (\_\_namedParameters: { search: string ; types: undefined \| (\"App\" \| \"Org\" \| \"Role\")[]  }) => Promise\<([IOrganization](iorganization.md) \| [IApp](iapp.md) \| [IRole](irole.md))[]>

___

### getOfferedAssets

•  **getOfferedAssets**: (\_\_namedParameters: { did: string  }) => Promise\<[Asset](asset.md)[]>

___

### getOrgDefinition

•  **getOrgDefinition**: (\_\_namedParameters: { namespace: string  }) => Promise\<IOrganizationDefinition>

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

### getOwnedAssets

•  **getOwnedAssets**: (\_\_namedParameters: { did: string  }) => Promise\<[Asset](asset.md)[]>

___

### getPreviouslyOwnedAssets

•  **getPreviouslyOwnedAssets**: (\_\_namedParameters: { owner: string  }) => Promise\<[Asset](asset.md)[]>

___

### getRoleDefinition

•  **getRoleDefinition**: (\_\_namedParameters: { namespace: string  }) => Promise\<IRoleDefinition>

___

### getRolesByOwner

•  **getRolesByOwner**: (\_\_namedParameters: { owner: string  }) => Promise\<[IRole](irole.md)[]>

___

### getSubOrganizationsByOrganization

•  **getSubOrganizationsByOrganization**: (\_\_namedParameters: { namespace: string  }) => Promise\<[IOrganization](iorganization.md)[]>

___

### isAuthEnabled

•  **isAuthEnabled**: () => boolean

___

### issueClaim

•  **issueClaim**: (\_\_namedParameters: { did: string ; message: [IClaimIssuance](iclaimissuance.md)  }) => Promise\<void>

___

### login

•  **login**: () => Promise\<{ pubKeyAndIdentityToken: [IPubKeyAndIdentityToken](ipubkeyandidentitytoken.md) ; refreshToken: string ; token: string  }>

___

### pubKeyAndIdentityToken

•  **pubKeyAndIdentityToken**: [IPubKeyAndIdentityToken](ipubkeyandidentitytoken.md) \| undefined

___

### rejectClaim

•  **rejectClaim**: (\_\_namedParameters: { did: string ; message: [IClaimRejection](iclaimrejection.md)  }) => Promise\<void>

___

### requestClaim

•  **requestClaim**: (\_\_namedParameters: { did: string ; message: [IClaimRequest](iclaimrequest.md)  }) => Promise\<void>

___

### testLogin

•  **testLogin**: () => Promise\<void>
