<p align="center">
  <img src="https://github.com/energywebfoundation/iam-client-lib/actions/workflows/deploy.yml/badge.svg" />
</p>

<p align="center">
  <a href="https://www.energyweb.org" target="blank"><img src="images/EnergyWeb_logo.png" width="120" alt="Energy Web Foundation Logo" /></a>
</p>

# Identity and Access Management (IAM) Client Library

## Overview

IAM Client Library is a [TypeScript](https://www.typescriptlang.org/) library to be used in decentralized applications for authentication and authorization using [Decentralized Identifiers (DIDs)](https://www.w3.org/TR/did-core/) and [Verifiable Credentials (VCs)](https://www.w3.org/TR/vc-data-model/). DIDs and VCs are central components of self-sovereign identity, a paradigm that promotes user custody over their digital identity.

To read more about Decentralized Identifiers and Verifiable Credentials, and how they are used in the Energy Web tech stack, see our documentation [here](https://energy-web-foundation.gitbook.io/energy-web/foundational-concepts/self-sovereign-identity).

`iam-client-lib` is a key dependency of [Switchboard](https://switchboard.energyweb.org/welcome), the identity and access management (IAM) interface for the [Energy Web Decentralized Operating System](#ew-dos).

Using `iam-client-lib`, Switchboard allows users to:

- Create self-sovereign Decentralized Identifiers (DID) for users and assets using a connection with a crypto wallet such as MetaMask. DIDs are anchored in a smart contract on the Energy Web Chain
- Define hierarchical, role-based structures for [organizations](./guides/organization.md), [applications](./guides/application.md) and [assets](./guides/asset.md) that participate in grid activities
- Request and issue Verifiable Credentials that are required to take on roles within an organization or application that is registered on Switchboard

## Documentation

For documentation on `iam-client-lib` modules and API:

- [ReadTheDocs](https://energy-web-foundation-iam-client-lib.readthedocs-hosted.com/)

## Development

The following is for installing and building `iam-client-lib` directly. For guidance on how to integrate the library into an application, see [**Getting Started**](#getting-started) below.

### Installing Dependencies

Use `npm` >= 7 to install dependencies.

```sh
npm install
```

### Compile and Build

To generate bundled JS files and types, use `npm run build`. Generated files are located in the dist folder.

### Testing

Tests are located in the /e2e directory. For testing, use `npm run test:watch`.

## Getting Started

The following is for integrating `iam-client-lib` as a dependency in your application.

### Demo Source Code

See source code examples for integrating `iam-client-lib` into client applications here: [iam-client-examples](https://github.com/energywebfoundation/iam-client-examples)

[![react logo](examples/react-icon.png) React Demo](https://did-auth-demo.energyweb.org/react-example/) / [![angular logo](examples/angular-icon.png) Angular Demo](https://did-auth-demo.energyweb.org/angular-example/) / [![vue logo](examples/vue-icon.png) Vue Demo](https://did-auth-demo.energyweb.org/vue-example/)

### Pre-requisites

- `iam-client-lib` is written in TypeScript. Your application must use Node.js >= 10
- `iam-client-lib` has a [WebAssembly](https://webassembly.org/) dependency. Some frameworks/bundlers do not support this out of the box, so additional action is required based on the framework you are using:

**For Angular applications**, add the following to `package.json`:

` "browser": { "fs": false, "os": false, "path": false }`

**For React applications:** 

- [Webpack](https://webpack.js.org/) 5 [no longer pollyfills Node.js core modules automatically](https://webpack.js.org/configuration/resolve/#resolvefallback). You must install browser-compatible modules and specify them as [fallbacks](https://webpack.js.org/configuration/resolve/#resolvefallback) for Webpack. If you are using [`create-react-app`](https://create-react-app.dev/) that uses Webpack > 4 to bootstrap your React project, you will need to install [@craco/craco](https://www.npmjs.com/package/@craco/craco) or [react-app-rewired](https://www.npmjs.com/package/react-app-rewired), and specify the fallbacks in the Webpack configuration override file. For an example of how to do this, see the IAM Client Example for React applications [here](https://github.com/energywebfoundation/iam-client-examples/tree/master/client/react-dapp). This application uses Create React App Override (CRACO). 

- You must have a [Webpack resolver](https://webpack.js.org/configuration/resolve/) for [`.wasm ` file extensions](https://fileinfo.com/extension/wasm). If you are using [`create-react-app`](https://create-react-app.dev/) that uses Webpack > 4 to bootstrap your React project, you will need to install [@craco/craco](https://www.npmjs.com/package/@craco/craco) or [react-app-rewired](https://www.npmjs.com/package/react-app-rewired) to add a resolver for `.wasm` file extensions in the Webpack configuration override file. For an example of how to to do this, see IAM Client Examples for React applications [here](https://github.com/energywebfoundation/iam-client-examples/tree/master/client/react-dapp).

### Install

To install the latest version of `iam-client-lib`:

```sh
npm i iam-client-lib
```

To install the pre-release version of `iam-client-lib`:

```sh
npm i iam-client-lib@canary
```

Note that some library dependencies require `node.js` built-ins. When `iam-client-lib` is used in browser applications, you must make sure these dependencies are [polyfilled](https://developer.mozilla.org/en-US/docs/Glossary/Polyfill). If your application is bundled with Webpack, most dependencies can be polyfilled with [node-polyfill-webpack-plugin](https://www.npmjs.com/package/node-polyfill-webpack-plugin).

### Initialization

**Note:** You can see a full implementation of initializing `iam-client-lib` in the Switchboard application [here](https://github.com/energywebfoundation/switchboard-dapp/blob/develop/src/app/shared/services/iam.service.ts).

Your application will need to initialize the library's modules. Because the library's modules have internal depenencies, modules must be initialized by the application in the correct order:

#### 1. Initialize signer service

This will initialize staking and messaging services, and allow a connection to the cache server.

```js
const { signerService, messagingService, connectToCacheServer } =
  await initWithPrivateKeySigner(privateKey, rpcUrl);
```

#### 2. Connect to the cache server.

Depending on the signer type (i.e. MetaMask, WalletConnect), a signature may be requested.

```js
// IAM has builtin default settings for VOLTA CHAIN, which can overriden
// 1111 is an example of another ChainID (https://chainlist.org/)
setChainConfig(1111, {
  didContractAddress: '0x3e2fb24edc3536d655720280b427c91bcb55f3d6',
  ensRegistryAddress: '0xa372d665f83197a63bbe633ebe19c7bfd4943003',
  ensResolverAddress: '0xe878bdcf5148307378043bfd2b584909aa48a227',
  rpcUrl: 'http://some-rpc.com',
});

setMessagingConfig(1111, {
  messagingMethod: MessagingMethod.Nats,
  natsServerUrl: 'https://some-exchange-server.com',
});

setCacheConfig(1111, {
  url: 'https://some-cache-server.com/',
  cacheServerSupportsAuth: true,
});

const {
  cacheClient,
  domainsService,
  connectToDidRegistry,
  verifiableCredentialsService,
} = await connectToCacheServer();
```

#### 3. Connect to the DID registry

```js
const { didRegistry, claimsService } = await connectToDidRegistry();
```

## Contributing Guidelines

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Questions and Support

For questions and support please use Energy Web's [Discord channel](https://discord.com/channels/706103009205288990/843970822254362664)

Or reach out to our contributing team members by posting an issue on this repository:

- [Dmitry Fesenko](https://github.com/JGiter)
- [Ashish Tripathi](https://github.com/nichonien)
- [John Henderson](https://github.com/jrhender)

## EW-DOS

The Energy Web Decentralized Operating System is a blockchain-based, multi-layer digital infrastructure.

The purpose of EW-DOS is to develop and deploy an open and decentralized digital operating system for the energy sector in support of a low-carbon, customer-centric energy future.

We develop blockchain technology, full-stack applications and middleware packages that facilitate participation of Distributed Energy Resources on the grid, and create open market places for transparent and efficient renewable energy trading.

- To learn about more about the EW-DOS tech stack, see our [documentation](https://app.gitbook.com/@energy-web-foundation/s/energy-web/).

- For an overview of the energy-sector challenges our use cases address, go [here](https://app.gitbook.com/@energy-web-foundation/s/energy-web/our-mission).

For a deep-dive into the motivation and methodology behind our technical solutions, we encourage you to read our White Papers:

- [Energy Web White Paper on Vision and Purpose](https://www.energyweb.org/reports/EWDOS-Vision-Purpose/)
- [Energy Web White Paper on Technology Detail](https://www.energyweb.org/wp-content/uploads/2020/06/EnergyWeb-EWDOS-PART2-TechnologyDetail-202006-vFinal.pdf)

## Connect with Energy Web

- [Twitter](https://twitter.com/energywebx)
- [Discord](https://discord.com/channels/706103009205288990/843970822254362664)
- [Telegram](https://t.me/energyweb)

## License

This project is licensed under the GNU General Public License v3.0 or later - see the [LICENSE](LICENSE) file for details
