# Claims
+ [Claim Interface](../api/interfaces/Claim.md)
+ [Claim Request Interface](../api/interfaces/IClaimRequest.md)
+ [Claim Issuance Interface](../api/interfaces/IClaimIssuance.md)
+ [Claims Service API documentation](../api/classes/ClaimsService.md)

## Overview
At the most fundamental level, a claim is a statement about a subject. A claim is a component of a Verifiable Credential, which is the web3 standard for digital credentials in a decentralized ecosystem.  

+ See the W3 documentation for Claims [here](https://www.w3.org/TR/vc-data-model/#claims)
+ See the W3 documentation for Verifiable Credentials [here](https://www.w3.org/TR/vc-data-model/)
+ Read more about Verifiable Credentials and their role in IAM Client Library and Switchboard [here](https://app.gitbook.com/o/-MaVNTC0phnhS2JhwPF0/s/-M_pXALj14Egb-5Bal_p/foundational-concepts/self-sovereign-identity#verifiable-credentials-vcs) 

In the context of IAM Client Library, a claim is submitted by a requester to an issuer for a subject, in order to prove that the subject has the correct credentials to either: 

1. Take on a role within an application or organization. This is known as a [Role Claim](#role-claim). 
2. Obtain a temporary credential used to authenticate to the cache server. This is known as an [Authentication Claim](#authentication-claim). 

The issuer is responsible for verifying and issuing the claim. 

## Role Claim

The most common credential type in Switchboard is the role claim. A role claim is a presentation of a credential in order to take on a role within an application or an organization.  

The subject of the claim can be the requester, or it can be an asset that the requester is requesting a claim on behalf of. 

### Roles

In the Claim interface, the role is defined in the claimType:

```
export interface IClaimRequest extends IMessage {
    token: string;
    claimType: string; //CLAIM TYPE
    claimTypeVersion: string;
    registrationTypes: RegistrationTypes[];
    subjectAgreement?: string;
}
```

The claimType is a string composed of the **role name** and the **namespace** to which the role belongs to.  

Example: 
**"email.roles.kyc.apps.OKE.iam.ewc"**

Namespaced roles are persisted in the Role Repository in the [IAM Cache Server](https://energy-web-foundation.gitbook.io/energy-web/technology/the-stack/utility-layer-1#identity-access-and-management-iam-cache-server). 

### Role Claim Data Persistence

#### Blockchain
Depending on if the requester wants to register the claim On-Chain and/or Off-Chain, The IAM Client library's Claim Service saves claim data either to [IPFS](https://ipfs.io) as an encoded JWT token, or in the ClaimManager smart contract's registry. This is discussed [below](#off-chain-registration).  

#### Repository
Claim data is also persisted by the [IAM Cache Server](https://github.com/energywebfoundation/iam-cache-server/tree/master/src/modules/claim) in the Role Claim Repository. The IAM Client library's Claim Service methods post claim data to the Cache Server, where the data is persisted by the Cache Server's Claims Service methods. View the Cache Server's [Claim Service on GitHub](https://github.com/energywebfoundation/iam-cache-server/blob/master/src/modules/claim/claim.service.ts#L422). 

### 1. Requesting Claims
A claim request is created by the signer and submitted to the Role issuer(s) using the [createClaimRequest](../api/classes/ClaimsService.md#createclaimrequest) method. 

The createClaimRequest method creates a claim request message (of type [IClaimRequest](../api/interfaces/IClaimRequest.md)), and sends the message to the [IAM cache server](https://github.com/energywebfoundation/iam-cache-server/tree/master/src/modules/claim): 

```
const message: IClaimRequest = {
            id: v4(),
            token,
            claimIssuer: issuer,
            requester: this._signerService.did,
            registrationTypes,
            claimType: role,
            claimTypeVersion: version.toString(),
        };

    if (registrationTypes.includes(RegistrationTypes.OnChain)) {
            if (!version) {
                throw new Error(ERROR_MESSAGES.ONCHAIN_ROLE_VERSION_NOT_SPECIFIED);
            }
            message.subjectAgreement = await this.approveRolePublishing({ subject, role, version });
    }
	//submit claim request to cacher server: 
    await this._cacheClient.requestClaim(subject, message);
```
[source](https://github.com/energywebfoundation/iam-client-lib/blob/f9c1a12e888de6ebb4e2589fe49c489bee84af78/src/modules/claims/claims.service.ts#L166)

The IAM cache server then:  

1. Verifies that enrolment preconditions are met
2. Resolves the issuers of the claim from role definition 
3. Notifies issuer(s) of the claim request via [NATS](https://nats.io/about/)

See the Cache Server request handler [here](https://github.com/energywebfoundation/iam-cache-server/blob/07a0053cd10ad16739cc331f043b18cc5dfc0dc4/src/modules/claim/claim.controller.ts#L112). 

### 2. Issuing Claims
If the subject's enrolment request is valid, the Issuer can approve and issue the claim to the subject. If the claim has been requested by the signer, this is done by the [issueClaimRequest method](../api/classes/ClaimsService.md#issueclaimrequest). If a claim is being directly issued without having been requested, this is done by the [issueClaim method](../api/classes/ClaimsService.md#issueclaim). 

#### Registering Claims on the Blockchain
A claim request has an array of [RegistrationTypes](../api/enums/RegistrationTypes.md). A claim can be registered:  

1. On-Chain only
2. Off-Chain only
3. On-Chain and Off-Chain

In both On-Chain and Off-Chain registration, the claim is technically saved to the blockchain. However, Off-Chain registration is saved to [IPFS](https://ipfs.io/) and is linked to the user's DID Document, but this data is not able to be accessed by other smart contracts. 

##### Off-Chain Registration
If a claim request requires Off-Chain registration, the publishPublicClaim method saves the claim in IPFS as an encoded JWT token. The user's DID document is updated with a link to this IPFS record in the DID Document's service array. To read more about storing Verifiable Credentials on IPFS and referencing them in a user's DID Document on the Energy Web Chain, see our documentation [here](https://energy-web-foundation.gitbook.io/energy-web/technology/the-stack/trust-layer-energy-web-chain/ipfs-in-ew-dos#storing-verifiable-credentials-on-ipfs). 

```
async publishPublicClaim({ token }: { token: string }) {
        const payload = (await this._didRegistry.decodeJWTToken({ token })) as {
            iss: string;
            sub: string;
            claimData: ClaimData;
        };
        const { iss, claimData } = payload;
        let sub = payload.sub;
        // Initialy subject was ignored because it was requester
        if (!sub || sub.length === 0 || !isValidDID(sub)) {
            sub = this._signerService.did;
        }

        if (!(await this._didRegistry.verifyPublicClaim(token, iss))) {
            throw new Error("Incorrect signature");
        }

        const url = await this._didRegistry.ipfsStore.save(token);
        const data = {
            type: DIDAttribute.ServicePoint,
            value: {
                id: await this.getClaimId({ claimData }),
                serviceEndpoint: url,
                hash: hashes.SHA256(token),
                hashAlg: "SHA256",
            },
        };
        await this._didRegistry.updateDocument({ didAttribute: DIDAttribute.ServicePoint, data, did: sub });

        return url;
    }

```
[source](https://github.com/energywebfoundation/iam-client-lib/blob/f9c1a12e888de6ebb4e2589fe49c489bee84af78/src/modules/claims/claims.service.ts?_pjax=%23js-repo-pjax-container%2C%20div%5Bitemtype%3D%22http%3A%2F%2Fschema.org%2FSoftwareSourceCode%22%5D%20main%2C%20%5Bdata-pjax-container%5D#L366)

**Note:** While this data is public on the blockchain, it is not accessible to any external smart contracts. 

##### On-Chain Registration
If a claim request requires On-Chain registration, the claim is persisted in the ClaimManager smart contract's registory. You can view the ClaimManager smart contract on GitHub [here](https://github.com/energywebfoundation/iam-contracts/blob/master/contracts/roles/ClaimManager.sol). 

```
if (registrationTypes.includes(RegistrationTypes.OnChain)) {
    const { claimType: role, claimTypeVersion: version } = claimData;
    const expiry = defaultClaimExpiry;
    const onChainProof = await this.createOnChainProof(role, version, expiry, sub);
    message.onChainProof = onChainProof;
        if (publishOnChain) {
            await this.registerOnchain({
                token,
                subjectAgreement,
                onChainProof,
                acceptedBy: this._signerService.did,
            });
        }
}
```
[source](https://github.com/energywebfoundation/iam-client-lib/blob/f9c1a12e888de6ebb4e2589fe49c489bee84af78/src/modules/claims/claims.service.ts?_pjax=%23js-repo-pjax-container%2C%20div%5Bitemtype%3D%22http%3A%2F%2Fschema.org%2FSoftwareSourceCode%22%5D%20main%2C%20%5Bdata-pjax-container%5D#L176)

The registerOnChain method registers the role with the ClaimManager smart contract using the smart contract's 'register' method:

```
    async registerOnchain(claim: Pick<Claim, "token" | "subjectAgreement" | "onChainProof" | "acceptedBy">) {
        if (!readyToBeRegisteredOnchain(claim)) {
            throw new Error(ERROR_MESSAGES.CLAIM_WAS_NOT_ISSUED);
        }
        const { token, subjectAgreement, onChainProof, acceptedBy } = claim;
        const { claimData, sub } = this._didRegistry.jwt.decode(token) as {
            claimData: { claimType: string; claimTypeVersion: number };
            sub: string;
        };
        const expiry = defaultClaimExpiry;
        const { claimType: role, claimTypeVersion: version } = claimData;
        const data = this._claimManagerInterface.encodeFunctionData("register", [
            addressOf(sub),
            namehash(role),
            version,
            expiry,
            addressOf(acceptedBy),
            subjectAgreement,
            onChainProof,
        ]);
        await this._signerService.send({
            to: this._claimManager,
            data,
        });
    }
```
[source](https://github.com/energywebfoundation/iam-client-lib/blob/f9c1a12e888de6ebb4e2589fe49c489bee84af78/src/modules/claims/claims.service.ts?_pjax=%23js-repo-pjax-container%2C%20div%5Bitemtype%3D%22http%3A%2F%2Fschema.org%2FSoftwareSourceCode%22%5D%20main%2C%20%5Bdata-pjax-container%5D#L255)

In the [ClaimManager contract's register method](https://github.com/energywebfoundation/iam-contracts/blob/83932a8fee56010482b50047ea5a20da37b758da/contracts/roles/ClaimManager.sol#L89), the claim data is added to the 'roles' mapping, and can then be accessed and read by other smart contracts on the blockchain. 

**Note:** An issuer can directly issue a claim directly without a request. This is done through the [issueClaim method](../api/classes/ClaimsService.md#issueclaim). **This method does not handle On-Chain registration**. 

### 3. Alternatives to Claim Issuance

#### Reject Claim
The rejectClaimRequest method is used for an Issuer to reject a claim request:
```
    async rejectClaimRequest({
        id,
        requesterDID,
        rejectionReason,
    }: {
        id: string;
        requesterDID: string;
        rejectionReason?: string;
    }) {
        const message: IClaimRejection = {
            id,
            requester: requesterDID,
            claimIssuer: [this._signerService.did],
            isRejected: true,
            rejectionReason,
        };

        return this._cacheClient.rejectClaim(this._signerService.did, message);
    }
```
[source](https://github.com/energywebfoundation/iam-client-lib/blob/f9c1a12e888de6ebb4e2589fe49c489bee84af78/src/modules/claims/claims.service.ts?_pjax=%23js-repo-pjax-container%2C%20div%5Bitemtype%3D%22http%3A%2F%2Fschema.org%2FSoftwareSourceCode%22%5D%20main%2C%20%5Bdata-pjax-container%5D#L281) 


The rejection message (of type IClaimRejection) is sent to the Cache Server. [The Cache Server handles the claim rejection](https://github.com/energywebfoundation/iam-cache-server/blob/07a0053cd10ad16739cc331f043b18cc5dfc0dc4/src/modules/claim/claim.controller.ts#L172) and notifies the requester that the claim has been rejected via [NATS](https://nats.io/about/).  

#### Delete Claim
The deleteClaimRequest method is used to delete a claim request:
```
   async deleteClaim({ id }: { id: string }) {
        await this._cacheClient.deleteClaim(id);
    }
```
[source](https://github.com/energywebfoundation/iam-client-lib/blob/f9c1a12e888de6ebb4e2589fe49c489bee84af78/src/modules/claims/claims.service.ts?_pjax=%23js-repo-pjax-container%2C%20div%5Bitemtype%3D%22http%3A%2F%2Fschema.org%2FSoftwareSourceCode%22%5D%20main%2C%20%5Bdata-pjax-container%5D#L301)

The claim is [deleted from the role claim repository in the Cache Server](https://github.com/energywebfoundation/iam-cache-server/blob/07a0053cd10ad16739cc331f043b18cc5dfc0dc4/src/modules/claim/claim.service.ts#L422). 

### Claim Interface
Issued role claims are of type [Claim](../api/interfaces/Claim.md)

Example role claim:
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
+ **claimType**  

The role that the claim is submitted in support of. The claimType is a string composed of the role name and the namespace to which the role belongs to.  

+ **requester**  

The DID of the claim requester 

+ **subject**  

The DID of the claim subject (though could be the requester or an asset or application of the requester)

+ **id**  

The  UUID identifier for the claim  

+ **registrationTypes**  

The claim's [Registration Types](../api/enums/RegistrationTypes.md), which can be On-Chain or Off-Chain, or both. These are explained in greater detail [above](#off-chain-registration). 

+ **subjectAgreement**  

Signifies the agreement of claim subject to make the enrollment publically available on the blockchain through the ClaimManager smart contract. This exists only if the claim includes On-Chain registration. 

```
  if (registrationTypes.includes(RegistrationTypes.OnChain)) {
            if (!version) {
                throw new Error(ERROR_MESSAGES.ONCHAIN_ROLE_VERSION_NOT_SPECIFIED);
            }
            message.subjectAgreement = await this.approveRolePublishing({ subject, role, version });
        }
```
[source]()

+ **onChainProof**  

Provides on-chain proof of claim approval. This exists only if the claim includes On-Chain registration.  

```
if (registrationTypes.includes(RegistrationTypes.OnChain)) {
            const { claimType: role, claimTypeVersion: version } = claimData;
            const expiry = defaultClaimExpiry;
            const onChainProof = await this.createOnChainProof(role, version, expiry, sub);
		...
}
```
[source](https://github.com/energywebfoundation/iam-client-lib/blob/f9c1a12e888de6ebb4e2589fe49c489bee84af78/src/modules/claims/claims.service.ts?_pjax=%23js-repo-pjax-container%2C%20div%5Bitemtype%3D%22http%3A%2F%2Fschema.org%2FSoftwareSourceCode%22%5D%20main%2C%20%5Bdata-pjax-container%5D#L235)

+ **issuedToken**  

A signed representation of the role claim in the DID Registry. This exists only if the claim includes [Off-Chain registration](#off-chain-registration), or if a claim is issued without being requested. 

```
 if (registrationTypes.includes(RegistrationTypes.OffChain)) {
            const publicClaim: IPublicClaim = {
                did: sub,
                signer: this._signerService.did,
                claimData: { ...strippedClaimData, ...(issuerFields && { issuerFields }) },
            };
            message.issuedToken = await this._didRegistry.issuePublicClaim({
                publicClaim,
            });
        }
```
[source](https://github.com/energywebfoundation/iam-client-lib/blob/f9c1a12e888de6ebb4e2589fe49c489bee84af78/src/modules/claims/claims.service.ts?_pjax=%23js-repo-pjax-container%2C%20div%5Bitemtype%3D%22http%3A%2F%2Fschema.org%2FSoftwareSourceCode%22%5D%20main%2C%20%5Bdata-pjax-container%5D#L228)

+ **nameSpace**  

The namespace to which the role belongs to (an application or an organization).

+ **issuerFields**  

Additional data which issuer might need to add to enrolled claim. When `publishOnChain` claim
will be immediately registered after approvement, otherwise it will be stored on cache server and will be sent to chain
later on with `ClaimService.registerOnChain`.

## Authentication Claim
An Authentication Claim is a temporary credential used to authenticate to the IAM Cache Server. If the user is not authenticated, they must authenticate using their pulic key:

```
  private async _calculatePubKeyAndIdentityToken() {
        const header = {
            alg: "ES256",
            typ: "JWT",
        };
        const encodedHeader = base64url(JSON.stringify(header));
        const address = this._address;
        const payload = {
            iss: `did:${Methods.Erc1056}:${this.chainName()}:${address}`,
            claimData: {
                blockNumber: await this._signer.provider.getBlockNumber(),
            },
        };

        const encodedPayload = base64url(JSON.stringify(payload));
        const token = `0x${Buffer.from(`${encodedHeader}.${encodedPayload}`).toString("hex")}`;
        // arrayification is necessary for WalletConnect signatures to work. eth_sign expects message in bytes: https://docs.walletconnect.org/json-rpc-api-methods/ethereum#eth_sign
        // keccak256 hash is applied for Metamask to display a coherent hex value when signing
        const message = arrayify(keccak256(token));
        const sig = await this.signMessage(message);
        const recoverValidatedPublicKey = (signedMessage: Uint8Array): string | undefined => {
            const publicKey = recoverPublicKey(signedMessage, sig);
            if (getAddress(address) === getAddress(computeAddress(publicKey))) {
                return computePublicKey(publicKey, true).slice(2);
            }
            return undefined;
        };

        // Computation of the digest in order to recover the public key under the assumption
        // that signature was performed as per the eth_sign spec (https://eth.wiki/json-rpc/API#eth_sign)
        // In the event that the wallet isn't prefixing & hashing message as per spec, attempt recovery without digest
        const digest = arrayify(hashMessage(message));
        const publicKey = recoverValidatedPublicKey(digest) ?? recoverValidatedPublicKey(message);
        if (publicKey) {
            this._publicKey = publicKey;
            this._identityToken = `${encodedHeader}.${encodedPayload}.${base64url(sig)}`;
        } else {
            throw new Error(ERROR_MESSAGES.PUBLIC_KEY_NOT_RECOVERED);
        }
    }
```
[source](https://github.com/energywebfoundation/iam-client-lib/blob/f9c1a12e888de6ebb4e2589fe49c489bee84af78/src/modules/signer/signer.service.ts?_pjax=%23js-repo-pjax-container%2C%20div%5Bitemtype%3D%22http%3A%2F%2Fschema.org%2FSoftwareSourceCode%22%5D%20main%2C%20%5Bdata-pjax-container%5D#L190) 

Example of authentication token:
```
 {
    iss: 'did:ethr:volta:0xc56e...',
    claimData: { blockNumber: 15133056 }
  }
```

## Claims Service Public APIs

-   [getClaimsId](../api/classes/ClaimsService.md#getclaimid)
-   [getClaimsByIssuer](../api/classes/ClaimsService.md#getclaimsbyissuer)
-   [getClaimsByRequester](../api/classes/ClaimsService.md#getclaimsbyrequester)
-   [getClaimsBySubject](../api/classes/ClaimsService.md#getclaimsbysubject)
-   [getUserClaims](../api/classes/ClaimsService.md#getuserclaims)
-   [issueClaimRequest](../api/classes/ClaimsService.md#issueclaimrequest)
-   [issueClaim](../api/classes/ClaimsService.md#issueclaim)
-   [rejectClaimRequest](../api/classes/ClaimsService.md#rejectclaimrequest)
-   [issuePublicClaim](../api/classes/ClaimsService.md#issuepublicclaim)
-   [publishPublicClaim](../api/classes/ClaimsService.md#publishpublicclaim)
-   [registerOnChain](../api/classes/ClaimsService.md#registeronchain)

For detailed description of the enrolment flow process, see the [Claims Service end-to-end tests](https://github.com/energywebfoundation/iam-client-lib/blob/master/e2e/claims.service.e2e.ts). 