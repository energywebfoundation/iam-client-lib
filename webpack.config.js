const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const { merge } = require('webpack-merge');
const path = require('path');

const baseConfig = {
  mode: 'development',
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
    '@energyweb/iam-contracts': '@energyweb/iam-contracts',
    ethers: 'ethers',
    '@walletconnect/ethereum-provider': '@walletconnect/ethereum-provider',
  },
  ignoreWarnings: [{ module: /ws/ }], // webpack can't resolve optional dependencies bufferutil and utf-8-validate
};

const nodeConfig = merge(baseConfig, {
  target: 'node16',
  output: {
    filename: 'index.js',
  },
  externals: {
    base64url: 'base64url',
    axios: 'axios',
  },
});
const webConfig = merge(baseConfig, {
  target: 'web',
  output: {
    filename: 'index.esm.js',
  },
  plugins: [new NodePolyfillPlugin()],
  resolve: {
    fallback: {
      fs: false,
    },
  },
});

module.exports = [webConfig, nodeConfig];
