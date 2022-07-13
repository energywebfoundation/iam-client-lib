// @todo import from dist
const { VOLTA_CHAIN_ID } = require('@energyweb/credential-governance');
const { Wallet } = require('ethers');
const { chainConfigs, initWithPrivateKeySigner } = require('../../../dist');

const init = async () => {
  const key = Wallet.createRandom().privateKey;
  const rpc = chainConfigs()[VOLTA_CHAIN_ID].rpcUrl;
  const { connectToCacheServer } = await initWithPrivateKeySigner(key, rpc);
  const { verifiableCredentialsService } = await connectToCacheServer();
};

init();
