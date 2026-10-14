/**
 * @description Local chain used by tests (`npm run start-rpc`, `npm run ganache`).
 * Same mnemonic, chain id, accounts, balance and gas limit as the previous ganache-cli setup.
 */
module.exports = {
  networks: {
    hardhat: {
      chainId: 73799,
      blockGasLimit: 10000000,
      accounts: {
        mnemonic:
          'candy maple cake sugar pudding cream honey rich smooth crumble sweet treat',
        count: 20,
        // 10,000,000 ETH in wei, matching ganache-cli `-e 10000000`
        accountsBalance: '10000000000000000000000000',
      },
    },
  },
};
