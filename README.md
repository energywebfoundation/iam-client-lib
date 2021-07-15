![Deploy](https://github.com/energywebfoundation/iam-client-lib/workflows/deploy.yml/badge.svg)

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
Create a folder named **_iam-client-lib_** and clone this GIT project.

Also note that having a DID document with a public key is a prerequisite for using iam-client-lib and during initialization the library with attempt to add a public key to the DID document if one doesn't exist. This addition of the public key requires the account to be funded.

### Install

Latest stable version

```sh
npm i iam-client-lib
```

Prerelease version

```sh
npm i iam-client-lib@canary
```

### Sample Config for browsers (TypeScript)

```js
import {
  IAM,
  WalletProvider,
  setCacheClientOptions,
  setChainConfig,
  setMessagingOptions,
  MessagingMethod,
} from 'iam-client-lib'

export class App {
    private _iam: IAM;

    constructor() {
      // IAM has builtin default settings for VOLTA CHAIN

      // If you want to change default cache server config or add config for your network
      setCacheClientOptions(1111, {
        url: 'https://some-cache-server.com/',
        cacheServerSupportsAuth: true,
      })

      // If you want to change default chain config or add config for your network
      setChainConfig(1111, {
        didContractAddress: '0x3e2fb24edc3536d655720280b427c91bcb55f3d6',
        ensRegistryAddress: '0xa372d665f83197a63bbe633ebe19c7bfd4943003',
        ensResolverAddress: '0xe878bdcf5148307378043bfd2b584909aa48a227',
        rpcUrl: 'http://some-rpc.com',
      })

      // If you want to change default messaging config or add config for your network
      setMessagingOptions(1111, {
        messagingMethod: MessagingMethod.Nats,
        natsServerUrl: 'https://some-exchange-server.com',
      })

      // create IAM instance
      this._iam = new IAM();
    }

    async initializeIAM() {
      // this will show connection modal and authenticate
      const { did, connected } = await this._iam.initializeConnection({
        walletProvider: WalletProvider.MetaMask,
      });

      // after successfully authentication you can retrieve the signer
      const signer = this._iam.getSigner();
    }

```

### Sample Config for Node.js (TypeScript)

```js
import { IAM } from 'iam-client-lib'

export class App {
    private _iam: IAM;

    constructor() {
     // IAM has builtin default settings for VOLTA CHAIN

      // If you want to change default cache server config or add config for your network
      setCacheClientOptions(1111, {
        url: 'https://some-cache-server.com/',
        cacheServerSupportsAuth: true,
      })

      // If you want to change default chain config or add config for your network
      setChainConfig(1111, {
        didContractAddress: '0x3e2fb24edc3536d655720280b427c91bcb55f3d6',
        ensRegistryAddress: '0xa372d665f83197a63bbe633ebe19c7bfd4943003',
        ensResolverAddress: '0xe878bdcf5148307378043bfd2b584909aa48a227',
        rpcUrl: 'http://some-rpc.com',
      })

      // create IAM instance
      this._iam = new IAM({
        // only for Node.js env you need to pass rpcUrl in the constructor
        rpcUrl: 'http://some-rpc.com',
        privateKey: '9945c05be0b1b7b35b7cec937e78c6552ecedca764b53a772547d94a687db929'
      });
    }



    async initializeIAM() {
      // this will authenticate
      const { did, connected } = await this._iam.initializeConnection();

      // after successfully authentication you can retrieve the signer
      const signer = this._iam.getSigner();
    }

```

## Development

For testing use `npm run test:watch`

### Installing Dependencies

Using `npm` to install dependencies:

```sh
npm install ./energyweb-km-utils-v1.0.0.tgz
```

```sh
npm install ./energyweb-km-crypto-v1.0.0.tgz
```

```sh
npm install
```

### Compile & Build

To generate bundled JS files and types, use the following command. Generated files are located in the **_dist_** folder.

```sh
npm run build
```

## Active Maintainers

- [Ahmed Ibrahim](https://github.com/ahmedolaibrahim)
- [John Henderson](https://github.com/jrhender)
- [Dmitry Fesenko](https://github.com/JGiter)

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## License

This project is licensed under the GNU General Public License v3.0 or later - see the [LICENSE](LICENSE) file for details

## FAQ

Frequently asked questions and their answers will be collected here.
