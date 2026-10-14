# Contract artifacts

`StakingPool.json` is the compiled StakingPool artifact from `@energyweb/staking-pool@1.0.0-rc.21` (MIT), `dist/contracts/StakingPool.sol/StakingPool.json`.
It is kept here so `npm run build:typechain:staking-pool` can generate the `ethers-staking` bindings without installing that package, which pulls in `eth-revert-reason` and an unmaintained ethers 4.
