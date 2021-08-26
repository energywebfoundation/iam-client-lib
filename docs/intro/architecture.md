# Library Architecture

**//Intention of this page is to give overview of architecture - the two main classes and underlying databases/registries that the IAMBase connects to through public API(Cache server and registry). Didnt mention IPFS because it is not connected to through public method in IAMBase.**

## [IAM Base Class](../api/classes/iam_iam_base.IAMBase.md)
The IAM Base class is the main class of the iam-client-library. It initializes connection with the ENS Registry, the DID Registry and the Energy Web Chain. It handles authorization using the signer's wallet and manages the [disconnection with the wallet](../api/classes/iam_iam_base.IAMBase.md#closeconnection). 

**Connects to Cache Server Client:**
[connectToCacheServer](../api/classes/iam_iam_base.IAMBase.md#connecttocacheserver)
 The cache server caches specific smart contract data such as Ethereum namespaces and DID documents in order to improve read-query performance. It also facilitates the credentials (claims) exchange between credential (claim) requesters and issuers.

**Connects to DID Registry and sets instance of DID Document and claims:**
[connectToDIDRegistry](../api/classes/iam_iam_base.IAMBase.md#connecttodidregistry)
//Define DID Registry


## [IAM Class](../api/classes/iam.IAM.md)
The IAM Class extends the IAM Base class. Methods perform CRUD operations for DID Documents, Claims, [Roles](./roles.md), [Organizations](./organization.md), and [Applications](./applications.md).

## Namespacing
//Placeholder - Not sure if we want to mention ENS and ability to create hierarchcial namespacing through ENS registry and role of ENS registry in resolving names for roles/orgs/applications 

