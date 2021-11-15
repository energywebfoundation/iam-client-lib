import { IRoleDefinition } from "@energyweb/iam-contracts";
import { BigNumber } from "ethers";

export type StakingPoolProps = {
    minStakingPeriod: BigNumber;
    withdrawDelay: BigNumber;
    patronRoles: IRoleDefinition["roleName"][];
    terms: StakingTerms;
};

export type StakingTerms = {
    id: string;
    terms: string;
    version: number;
};

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
