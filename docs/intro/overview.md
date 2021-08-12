# Overview

Llibrary entry point is [IAM](../api/classes/iam.md) class. To establish 
connection with blockchain its 
[initializeConnection](../api/classes/iam.md#initializeconnection) method must 
be called after class is instantiated. To free resources connection should be 
closed by [closeConnection](../api/classes/iam.md#closeconnection). 
Connection status can be checked by [isConnected](../api/classes/iam.md#isconnected)

A decentralized identity is represented by a decentralized document that also 
describes how to interact with the entity. Document is read by 
[getDidDocument](../api/classes/iam.md#getdiddocument) and can be upadated by owner 
with [updateDidDocument](../api/classes/iam.md#updatediddocument). Identity is 
invalidated with [revokeDidDocument](../api/classes/iam.md#revokediddocument).

The document is also used as a way to implement verified claims. A public 
claim goes through the lifecycle stages by calling 
[createPublicClaim](../api/classes/iam.md#createpublicclaim), 
[issuePublicClaim](../api/classes/iam.md#issuepublicclaim),
[publishPublicClaim](../api/classes/iam.md#publishpublicclaim),
[verifyPublicClaim](../api/classes/iam.md#verifypublicclaim).

Decentralized authorization is done using notion of [Role](roles.md)