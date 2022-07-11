// @todo import from dist
const { VOLTA_CHAIN_ID } = require('@energyweb/credential-governance');
const { Wallet } = require('ethers');
const { chainConfigs, initWithPrivateKeySigner } = require('../dist');

// after running this script follow instructions in https://azureossd.github.io/2021/12/10/Troubleshooting-NodeJS-High-Memory-scenarios-in-App-Service-Linux/index.html#node-heap-prof
const profile_init = async () => {
  const key = Wallet.createRandom().privateKey;
  const rpc = chainConfigs()[VOLTA_CHAIN_ID].rpcUrl;
  const iam = await initWithPrivateKeySigner(key, rpc);
};
profile_init();
