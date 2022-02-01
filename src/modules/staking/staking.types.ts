import { BigNumber } from 'ethers';

export enum StakeStatus {
  NONSTAKING = 0,
  STAKING = 1,
  WITHDRAWING = 2,
}

export type Service = {
  /** organization ENS name */
  org: string;
  /** pool address */
  pool: string;
  /** provider address */
  provider: string;
};

export type Stake = {
  amount: BigNumber;
  depositStart: BigNumber;
  depositEnd: BigNumber;
  status: StakeStatus;
};
