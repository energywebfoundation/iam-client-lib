# Claims

[Claim Interface](../api/interfaces/cacheServerClient_cacheServerClient_types.IRole.md)

Claims are verifiable credentials. Underlying implementation of the claim is based on JWT standard.
Claims are classified by type of credential and type of verification.
There are two types of credentials:

-   role claim
-   authentication claim

    Most used credential type in Switchboard is role claim. Such claim consists of role identifier,
    role subject and is signified by authorized role issuer. All of this is regulated by role definition.

    Authentication claim is short-live credential used to authenticate to cache server.
    It is consists of DID of authenticating identity and is signed by one of verification methods from identity document

    Role claim can be verified by smart contract or by application. Smart-contract verifiable claim is called onchain,
    application verifiable claim is offchain. Both offchain and onchain role claims are stored on blockchain. The difference
    is that offchain claim is unstructured data stored in DID document, while onchain claim is result of registering with Claim Manager.
    It determines way of managing this data. Offchain claim is processed by application. Updating or requesting of
    onchain claim status is call to Claim Manager.

    An example structure of the role claim is

```
{
		"id": "a099...",
		"requester": "did:ethr:volta:0xc56e...",
		"subject": "did:ethr:volta:0xc56e...",
		"claimType": "email.roles.kyc.apps.OKE.iam.ewc",
		"registrationTypes": [
			"RegistrationTypes::OnChain"
		],
		"claimTypeVersion": "1",
		"token": "eyJhb...",
		"subjectAgreement": "0xadb...",
		"onChainProof": null,
		"issuedToken": null,
		"isAccepted": false,
		"createdAt": "2021-12-08T07:52:32.456Z",
		"acceptedBy": null,
		"isRejected": true,
		"rejectionReason": null,
		"namespace": "kyc.apps.OKE.iam.ewc"
	}

```

`subjectAgreement` and `onChainProof` are signed messages used by Claim Manager smart-contract. `subjectAgreement` signifies
agreement of claim subject for the enrollment to be publicly available. `onChainProof` gives opportunity to separate
claim approval from claim registration

`issuedToken` is signed representation of role claim in DID Registry

An example of authentication token is

```
 {
    iss: 'did:ethr:volta:0xc56e...',
    claimData: { blockNumber: 15133056 }
  }
```

Typical flow of enrollemnt consists of following steps:

1. Reqester ask for enrollment of subject

```
await claimsService.createClaimRequest({
		claim: { claimType, claimTypeVersion: version},
		registrationTypes,
		subject,
    })
```

Cache server will resolve issuers of the `claimType` from role definition and will notify them about request

2. One of the issuers approves or rejects enrollment request

```
claimService.issueClaimRequest({
        //...claim params provided by cache server,
        issuerFields,
        publishOnChain,
    })
```

```
claimService.rejectClaimRequest({
        id,
        requesterDID,
        rejectionReason,
    })
```

`issuerFields` is additional data which issuer might need to add to enrolled claim. When `publishOnChain` claim
will be immediately registered after approvement, otherwise it will be stored on cache server and will be sent to chain
later on with `ClaimService.registerOnChain`.

It is also possible to issue claim without requesting it before with `ClaimService.issueClaim`

For detailed description of this flow look at `e2e/claims.service.e2e.ts`

## Public APIs:

-   [getClaimsByIssuer](../api/classes/iam.IAM.md#getclaimsbyissuer)
-   [getClaimsByRequester](../api/classes/iam.IAM.md#getclaimsbyrequester)
-   [getClaimsBySubject](../api/classes/iam.IAM.md#getclaimsbysubject)
-   [getUserClaims](../api/classes/iam.IAM.md#getuserclaims)
-   [issueClaimRequest](../api/classes/iam.IAM.md#issueclaimrequest)
-   [issuePublicClaim](../api/classes/iam.IAM.md#issuepublicclaim)
-   [publishPublicClaim](../api/classes/iam.IAM.md#publishpublicclaim)
