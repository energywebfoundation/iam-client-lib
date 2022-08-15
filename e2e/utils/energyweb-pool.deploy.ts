// import { VOLTA_CHAIN_ID, WITHDRAW_DELAY, VOLTA_REWARD_POOL_ADDRESS } from "@energyweb/iam-contracts";
// import {providers, utils, Wallet} from "ethers"
// import { StakeStatus, StakingService } from ".";
// import { StakingPoolFactory__factory, StakingPool__factory } from "../../../ethers";
// import { chainConfigs } from "../../config/chain.config";
// import { SignerService } from "../signer";

// const {JsonRpcProvider} = providers;
// const {namehash, parseEther} = utils;

// const voltaRpc = "";
// const pk = "";

// export const deplyEWCPool = async () => {
//     const provider = new JsonRpcProvider("https://volta-rpc-vkn5r5zx4ke71f9hcu0c.energyweb.org/");
//     const signerService = await SignerService.fromPrivateKey(pk, voltaRpc);
//     const org = "energyweb.iam.ewc";
//     const MIN_STAKING_PERIOD = 1;
//     const stakingService = await StakingService.create(signerService);
//     const pool = await stakingService.getPool(org);
//     if (!pool) {
//       const patronRewardPortion = 1000;
//       await stakingService.launchStakingPool({
//         org,
//         minStakingPeriod: MIN_STAKING_PERIOD,
//         patronRewardPortion,
//         patronRoles: [],
//         principal: parseEther("100")
//       });
//     }
//     const factory = new StakingPoolFactory__factory(orgOwner).attach(
//         chainConfigs[VOLTA_CHAIN_ID].stakingPoolFactoryAddress,
//     );
//     /**
//      * Predeployed test pool
//      */
//     const poolContract = new StakingPool__factory(orgOwner).attach((await factory.services(namehash(org))).pool);
//     expect(poolContract).not.toBeNull;
//     expect((await poolContract.minStakingPeriod()).eq(MIN_STAKING_PERIOD)).toBe(true);
//     expect((await poolContract.withdrawDelay()).eq(WITHDRAW_DELAY));

//     const pool = await stakingService.getPool(org);
//     expect(pool).not.toBeNull();
//     if (pool) {
//         const amount = parseEther("1");
//         let stake = await pool.getStake();
//         if (stake.status === StakeStatus.NONSTAKING) {
//             await pool.putStake(amount);
//             const requestWithdrawDelay = await pool.requestWithdrawDelay();
//             expect(requestWithdrawDelay === MIN_STAKING_PERIOD);
//             stake = await pool.getStake();
//         }

//         if (stake.status === StakeStatus.STAKING) {
//             let minStakingPeriodIsExpired = false;
//             while (!minStakingPeriodIsExpired) {
//                 minStakingPeriodIsExpired = (await pool.requestWithdrawDelay()) === 0;
//             }
//             await pool.requestWithdraw();
//             expect((await pool.withdrawalDelay()) === WITHDRAW_DELAY);
//             stake = await pool.getStake();
//         }

//         if (stake.status === StakeStatus.WITHDRAWING) {
//             let withdrawDelayIsExpired = false;
//             while (!withdrawDelayIsExpired) {
//                 withdrawDelayIsExpired = (await pool.withdrawalDelay()) === 0;
//             }

//             const reward = await pool.checkReward();
//             if ((await provider.getBalance(VOLTA_REWARD_POOL_ADDRESS)).lte(reward)) {
//                 await (await orgOwner.sendTransaction({ value: reward.mul(2), to: VOLTA_REWARD_POOL_ADDRESS })).wait();
//             }

//             await pool.withdraw();
//             stake = await pool.getStake();
//             expect(stake.amount.eq(0)).toBe(true);
//             expect(stake.status).toBe(StakeStatus.NONSTAKING);
//         }
//     }
// });
