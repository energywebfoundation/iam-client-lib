# Library Architecture

**//Intention of this page is to give overview of architecture - the two main classes and underlying databases/registries that the IAMBase connects to through public API(Cache server and registry).**

## [IAM Base Class](../api/classes/iam_iam_base.IAMBase.md)
The IAM Base class is the main class of the iam-client-library. It initializes connection with the ENS Registry, the DID Registry and the Energy Web Chain. It handles authorization using the signer's wallet and manages the [disconnection with the wallet](../api/classes/iam_iam_base.IAMBase.md#closeconnection). 

**Connects to Cache Server Client:**
 The cache server caches specific smart contract data such as Ethereum namespaces and DID documents in order to improve read-query performance. It also facilitates the credentials (claims) exchange between credential (claim) requesters and issuers.
[connectToCacheServer](../api/classes/iam_iam_base.IAMBase.md#connecttocacheserver)


**Connects to DID Registry and sets instance of DID Document and claims:**
//Define DID Registry
[connectToDIDRegistry](../api/classes/iam_iam_base.IAMBase.md#connecttodidregistry)


## [IAM Class](../api/classes/iam.IAM.md)
The IAM Class extends the IAM Base class. Methods on this class perform CRUD operations for DID Documents, Claims (Credentials), [Roles](./roles.md), [Organizations](./organization.md), and [Applications](./applications.md).

//Placeholder - expalanation of where data is stored
- Organizations, Applications and Roles are stored on the cache server
- Claims(Credentials) can be stored in two ways:
    1. Off-chain: as a hash value on the Inter Planetary File System (IPFS), which is a distributed, peer-to-peer file network. DID Documents contain a service endpoint that points to its corresponding claims on IPFS. This library is responsible for decoding and encoding claims, and storing and retreiving them from IPFS
    2. On-chain: ///

## Namespacing
//Placeholder - Not sure if we want to mention ENS and ability to create hierarchcial namespacing through ENS registry and role of ENS registry in resolving names for roles/orgs/applications 

