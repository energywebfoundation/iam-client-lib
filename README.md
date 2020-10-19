# Identity and Access Management (IAM) Client Library
TypeScript library to be used within decentralised applications for authentication and authorisation using DIDs (Decentralised Identifiers) and VCs (Verifiable Credentials)

## Developers
 - [Kim Honoridez](https://github.com/kim-energyweb>)
 - [Daniel Wojno] (https://github.com/dwojno>)

## Getting Started
For development purposes, please follow below steps to integrate the library with your dApps.

### Prerequisites
`iam-client-lib` is written in TypeScript. Make sure to have Node.js (>= v10) installed.
Create a folder named ***iam-client-lib*** and clone this GIT project.

### Installing Dependencies
Using `npm` to install dependencies:
```sh
$ npm install
```

### Compile & Build
To generate bundled JS files and types, use the following command. Generated files are located in the ***dist*** folder.
```sh
$ npm run build
```

### Link as node_module
If your dApp is using ***node_modules*** for dependencies, call the following command from your dApp's main folder. 

Make sure that your dApp preserves *symbolic links* (symlink) as below command creates one inside your *node_modules* folder. 

```sh
$ npm link ../path/to/iam-client-lib/
```
The `iam-client-lib` folder must now exist in your *node_modules* folder.

### Add library as a dependency

You can add this library as a dependency

```sh
$ npm i https://github.com/energywebfoundation/iam-client-lib.git#branch_name
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
