# Identity and Access Management (IAM) Client Library
Authentication and Authorisation Library for Decentralised Front-end Applications

## Developers
 - [Kim Honoridez](https://github.com/kim-energyweb>)

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
$ npm run build-ts
```

### Link as node_module
If your dApp is using ***node_modules*** for dependencies, call the following command from your dApp's main folder.
```sh
$ npm link ../path/to/iam-client-lib/
```

The `iam-client-lib` folder must now exist in your *node_modules* folder.

### Sample Import 
```sh
import { IAM } from 'iam-client-lib';

export class Sample {
    private _iam: IAM;

    constructor() {
        this._iam = new IAM(/* args here */);
    }

    callIAMHello() {
        this._iam.hello();
    }
}
```



## License
