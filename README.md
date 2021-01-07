# Identity and Access Management (IAM) Client Library

TypeScript library to be used within decentralized applications for authentication and authorization using DIDs (Decentralized Identifiers) and VCs (Verifiable Credentials)

##

![IAM-client-lib demos](screenshots/react-angular-vue_demos.png)

## Live Demos

[![react logo](examples/react-icon.png) React Demo](https://did-auth-demo.energyweb.org/react-example/) / [![angular logo](examples/angular-icon.png) Angular Demo](https://did-auth-demo.energyweb.org/angular-example/) / [![vue logo](examples/vue-icon.png) Vue Demo](https://did-auth-demo.energyweb.org/vue-example/)

Demo source code: [iam-client-examples](https://github.com/energywebfoundation/iam-client-examples)

## Documentation

[Read the Docs](https://energy-web-foundation-iam-client-lib.readthedocs-hosted.com/_/sharing/ojw5kxd0al7k1llbcp78i6oiv)

## Getting Started

For development purposes, please follow below steps to integrate the library with your dApps.

### Prerequisites

`iam-client-lib` is written in TypeScript. Make sure to have Node.js (>= v10) installed.
Create a folder named ***iam-client-lib*** and clone this GIT project.

### Install

Latest stable version

``` sh
$ npm i iam-client-lib 
```

Prerelease version

``` sh
$ npm i iam-client-lib@canary
```

### Sample Import (TypeScript)

``` sh
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

## Development

### Installing Dependencies

Using `npm` to install dependencies:

``` sh
$ npm install
```

### Compile & Build

To generate bundled JS files and types, use the following command. Generated files are located in the ***dist*** folder.

``` sh
$ npm run build
```

## Active Maintainers

 - [Kim Honoridez](https://github.com/kim-energyweb)
 - [Daniel Wojno](https://github.com/dwojno)
 - [Dmitry Fesenko](https://github.com/JGiter)

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## License

This project is licensed under the GNU General Public License v3.0 or later - see the [LICENSE](LICENSE) file for details

## FAQ

Frequently asked questions and their answers will be collected here.
