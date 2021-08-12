# Authentication

Authentication is the establishment of a link between the user and his document.
When using the Metamask browser extension to connect to the blockchain, the 
procedure is as follows:

``` typescript
const metamaskOpts = {
  useMetamaskExtension: true, 
  reinitializeMetamask: true
}; 

try {
  const { did, connected, userClosedModal } = await iam.initializeConnection(metamaskOpts); 
} catch (e) {}
```

After successful authentication access to user document and claims is exposed 
trough IAM

Before shutdown connection should be closed

``` typescript
  iam.closeConnection()
```