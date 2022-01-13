import { BigNumber, utils } from 'ethers';
import { deployer, replenish } from './setup_contracts';
import { StakingPoolFactory__factory } from '../../ethers/factories/StakingPoolFactory__factory';
import { chainConfigs, setChainConfig } from '../../src/config/chain.config';
import { Chain } from '@ew-did-registry/did';

const { parseEther } = utils;

export const defaultPrincipalThreshold = parseEther('0.1');
const defaultWithdrawDelay = 1;

export async function setupStakingPoolFactory(withdrawDelay = defaultWithdrawDelay) {
  const { chainId } = await deployer.provider.getNetwork();
  const { claimManagerAddress, ensRegistryAddress } = chainConfigs()[chainId];
  const stakingPoolFactory = await (
    await new StakingPoolFactory__factory(deployer).deploy(
      defaultPrincipalThreshold,
      withdrawDelay,
      claimManagerAddress,
      ensRegistryAddress
    )
  ).deployed();
  const rewardPoolAddress = await stakingPoolFactory.rewardPool();
  await replenish(rewardPoolAddress);
  setChainConfig(chainId, {
    stakingPoolFactoryAddress: stakingPoolFactory.address,
    chainName: Chain.VOLTA,
  });
}

export const calculateReward = (
  stakeAmount: BigNumber,
  depositPeriod: BigNumber,
  patronRewardPortion: BigNumber
): BigNumber => {
  const dailyInterestNumerator = BigNumber.from(1000312);
  const dailyInterestDenominator = BigNumber.from(1000000);
  const secInDay = BigNumber.from(60 * 60 * 24);
  const depositPeriodInterest = dailyInterestNumerator
    .div(dailyInterestDenominator)
    .pow(depositPeriod.div(secInDay));
  const accumulatedStake = stakeAmount.mul(depositPeriodInterest);
  const totalReward = accumulatedStake.sub(stakeAmount);
  return totalReward.mul(patronRewardPortion).div(BigNumber.from(1000));
};
