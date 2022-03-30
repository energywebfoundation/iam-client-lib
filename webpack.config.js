const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const { merge } = require('webpack-merge');
const path = require('path');

const baseConfig = {
  mode: 'production',
  context: path.resolve(__dirname, 'src'),
  entry: './index.ts',
  output: {
    library: {
      type: 'commonjs',
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: { onlyCompileBundledFiles: true },
      },
    ],
  },
  resolve: {
    mainFiles: ['index.ts', 'index.js'],
    extensions: ['.ts', '.js'],
  },
  externals: {
    '@energyweb/iam-contracts': '@energyweb/iam-contracts',
    '@energyweb/staking-pool': '@energyweb/staking-pool',
    '@ew-did-registry/did': '@ew-did-registry/did',
    '@ew-did-registry/keys': '@ew-did-registry/keys',
    '@ew-did-registry/jwt': '@ew-did-registry/jwt',
    '@ew-did-registry/did-ethr-resolver': '@ew-did-registry/did-ethr-resolver',
    '@ew-did-registry/did-resolver-interface':
      '@ew-did-registry/did-resolver-interface',
    '@ew-did-registry/did-ipfs-store': '@ew-did-registry/did-ipfs-store',
    '@ew-did-registry/did-store-interface':
      '@ew-did-registry/did-store-interface',
    '@ew-did-registry/did-document': '@ew-did-registry/did-document',
    '@ew-did-registry/claims': '@ew-did-registry/claims',
    '@ew-did-registry/proxyidentity': '@ew-did-registry/proxyidentity',
    '@ew-did-registry/ipfs-store': '@ew-did-registry/ipfs-store',
    '@ensdomains/ens': '@ensdomains/ens',
    '@ethersproject/abstract-provider': '@ethersproject/abstract-provider',
    '@ethersproject/abstract-signer': '@ethersproject/abstract-signer',
    '@ethersproject/providers': '@ethersproject/providers',
    '@ethersproject/properties': '@ethersproject/properties',
    '@walletconnect/ethereum-provider': '@walletconnect/ethereum-provider',
    axios: 'axios',
    base64url: 'base64url',
    'eth-ens-namehash': 'eth-ens-namehash',
    ethers: 'ethers',
    'js-sha3': 'js-sha3',
    'lodash.difference': 'lodash.difference',
    'nats.ws': 'nats.ws',
    qs: 'qs',
    'ts-interface-checker': 'ts-interface-checker',
    tslib: 'tslib',
    uuid: 'uuid',
  },
  ignoreWarnings: [{ module: /ws/ }], // webpack can't resolve optional dependencies bufferutil and utf-8-validate,
};

const nodeConfig = merge(baseConfig, {
  target: 'node16',
  output: {
    filename: 'index.js',
  },
  externals: {
    jsonwebtoken: 'jsonwebtoken',
  },
  resolve: {
    fallback: {
      '@energyweb/ekc': false,
      '@gnosis.pm/safe-apps-provider': false,
      '@gnosis.pm/safe-apps-sdk': false,
      '@metamask/detect-provider': false,
    },
  },
});

const webConfig = merge(baseConfig, {
  target: 'web',
  output: {
    filename: 'index.esm.js',
  },
  externals: {
    '@energyweb/ekc': '@energyweb/ekc',
    '@gnosis.pm/safe-apps-provider': '@gnosis.pm/safe-apps-provider',
    '@gnosis.pm/safe-apps-sdk': '@gnosis.pm/safe-apps-sdk',
    '@metamask/detect-provider': '@metamask/detect-provider',
    '@walletconnect/ethereum-provider': '@walletconnect/ethereum-provider',
  },
  plugins: [new NodePolyfillPlugin()],
  resolve: {
    fallback: {
      fs: false,
    },
  },
});

module.exports = [webConfig, nodeConfig];
