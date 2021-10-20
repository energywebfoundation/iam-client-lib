# Overview

The iam-client-library provides high-level functions related to the identity and access management domain of the Energy Web Stack. It allows you to anchor assets on the Energy Web Chain and managing their participation in and access to utility packages and applications built on top of the blockchain. This includes:

- Creating and managing digital identities, which are the primary form of identification in EW-DOS
- Facilitating claim(credential) requests and issuance for digital identities
- Creating and managing Organizations, Assets and Applicationss 


## Identity

Identity in EW_DOS is established through a [Decentralized Identity (DID)](https://www.w3.org/TR/did-core/). A DID is a digital, verifiable identity that is user-generated and not coupled to any centralized institution. It can be used to identify any subject, such as a non-tangible asset, a customer, or an organization.

Every DID resolves to a corresponding [DID document](https://www.w3.org/TR/did-use-cases/#dfn-did-documents). The DID Document contains information on the DID subject such as its public keys and authentication mechanisms, attributes and claims. Only the owner of the DID can update this information. 

The iam-client-lib manages high-level functions related to the DIDs and DID Documents:
- [getDID](../api/classes/iam.IAM.md#getdid)
- [getDidDocument](../api/classes/iam.IAM.md#getdiddocument)
- [updateDidDocument](../api/classes/iam.IAM.md#updatediddocument)
- [revokeDidDocument](../api/classes/iam.IAM.md#revokediddocument)


## Claims

Decentralized Identifiers can make claims to prove an attribute about themselves. A claim is also known as a [Verifiable Credential](https://www.w3.org/TR/vc-data-model/).

Traditional credentials require manual verification, such as a signature or a stamp. Verifiable Credentials (VC) are verified completely through cryptographic means using a digital proof mechanism, such as a digital signature or a JSON Web Token, through a digital trust mechanism, such as a blockchain.

Once an authority verifies a claim, a VC can then be used as an official record to assure others of the truth of the statements. These credentials are linked back to the credential subject’s digital identity - usually to their DID document. A DID Document can amass a rich set of Verifiable Credentials that provide a full picture of its origin, attributes and capabilities, all of which can only be shared only if the user cryptographically (through digital signature) approves of doing so.

Verified claims are referenced in a user's DID document by a hash, and the full credential data is stored off-chain in a decentralized file system called [IPFS](https://ipfs.io/)

INSERT EXAMPLE


The iam-client-lib performs the high-level functions related to claims:
- [createPublicClaim](../api/classes/iam.IAM.md#createpublicclaim) 
- [issuePublicClaim](../api/classes/iam.IAM.md#issuepublicclaim)
- [publishPublicClaim](../api/classes/iam.IAM.md#publishpublicclaim)
- [verifyPublicClaim](../api/classes/iam.IAM.md#verifypublicclaim) 


