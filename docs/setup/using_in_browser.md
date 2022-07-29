[Initialization of library](./intialization.md) requires several properties of [signer](../api/classes/modules_signer.SignerService.md):

- The signer meets [EIP-191: Signed Data Standard](https://eips.ethereum.org/EIPS/eip-191)
- Public key. This is legacy parameter, which was used to initialized DID document

These properties are not directly exposed by all signers, such as Metamask, and thus are determined in runtime by sending test sign request.
In order to improve user expirience when library is used in browser it tries to get these parameters from local storage.
In order to implement application specific session management the library doesn't modify storage and relies on the application to set `isEthSigner` and `PublicKey` local storage variables on login.
For example to disable session application will not set properties.
If properties are not in local storage then signer initialization will be completed on login to ssi-hub.
Initialization is postponed in order to prevent double signing when user is not logged in ssi-hub.
