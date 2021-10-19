# Identity and Access Management (IAM) Client Library
A [TypeScript](https://www.typescriptlang.org/) library that provides high-level functions related to the identity and access management (IAM) for all users, [assets](./guides/asset.md), [organizations](./guides/organization.md) and [applications](./guides/application.md) that are anchored on the Energy Web Chain. 

### The IAM Client Library handles the following functions:
- [Decentralized Identifier (DID)](https://energy-web-foundation.gitbook.io/energy-web/foundational-concepts/self-sovereign-identity#decentralized-identifiers-dids) management
- Management of Switchboard namespaces
- Creation and governance of organizations, applications and their associated roles
- [Verifiable Credential (Claim)](https://energy-web-foundation.gitbook.io/energy-web/foundational-concepts/self-sovereign-identity#verifiable-credentials-vcs) requests, verification and issuance for role permissioning

You can read more about Decentralized Identifiers (DIDs), Verifiable Credentials and how they provide the mechanisms for identity access and management in EW-DOS [here](https://energy-web-foundation.gitbook.io/energy-web/foundational-concepts/self-sovereign-identity)

### Prerequisites

Node.js (>=10)

### Add library as a dependency

From Git:

```sh
$ npm i https://github.com/energywebfoundation/iam-client-lib.git#branch_name
```

From NPM:

```sh
$ npm i iam-client-lib
```

### Sample Import (TypeScript)
```sh
import { IAM, CacheServerClient } from 'iam-client-lib';

export class Sample {
    private _iam: IAM;


    constructor() {
      // create default cache server client (optional)
        const cacheClient = new CacheServerClient({ url: 'http://cache-server.com'})

      // create IAM instance with provided rpc URL
        this._iam = new IAM({
          rpcUrl: 'https://volta-rpc.energyweb.org/',
          chainId: 73799,
          cacheClient // optional
        });
    }

    async initializeIAM() {
      // this will show connection modal and authenticate
      const { did, connected } = await this._iam.initializeConnection();

      // after successfully authentication you can retrieve the signer
      const signer = this._iam.getSigner();
    }

```

## License