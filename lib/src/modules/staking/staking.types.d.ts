import { BigNumber } from 'ethers';
export declare enum StakeStatus {
    NONSTAKING = 0,
    STAKING = 1,
    WITHDRAWING = 2
}
export declare type Service = {
    /** organization ENS name */
    org: string;
    /** pool address */
    pool: string;
    /** provider address */
    provider: string;
};
export declare type Stake = {
    amount: BigNumber;
    depositStart: BigNumber;
    depositEnd: BigNumber;
    status: StakeStatus;
};
