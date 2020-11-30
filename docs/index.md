# Identity and Access Management (IAM) Client Library
TypeScript library to be used within decentralised applications for authentication and authorisation using DIDs (Decentralised Identifiers) and VCs (Verifiable Credentials)

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
