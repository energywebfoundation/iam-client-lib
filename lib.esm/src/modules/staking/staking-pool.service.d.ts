import { BigNumber, ContractReceipt } from 'ethers';
import { SignerService } from '../signer/signer.service';
import { DomainsService } from '../domains/domains.service';
import { Service, Stake } from './staking.types';
/**
 * Intended for staking pool
 */
export declare class StakingFactoryService {
    private _signerService;
    private _domainsService;
    constructor(_signerService: SignerService, _domainsService: DomainsService);
    static create(signerService: SignerService, domainsService: DomainsService): Promise<StakingFactoryService>;
    /**
     * @description Returns all services for which pools are launched
     */
    allServices(): Promise<Service[]>;
    /**
     * @description Returns pool launched for energyweb org
     */
    getPool(): Promise<StakingPoolService>;
}
/**
 * Abstraction over staking pool smart contract
 */
export declare class StakingPoolService {
    private signerService;
    private overrides;
    private pool;
    constructor(signerService: SignerService, address: string);
    getStart(): Promise<BigNumber>;
    getEnd(): Promise<BigNumber>;
    getHardCap(): Promise<BigNumber>;
    getContributionLimit(): Promise<BigNumber>;
    getTotalStaked(): Promise<BigNumber>;
    getRatio(): Promise<BigNumber>;
    /**
     * @description
     * @param value
     */
    partialWithdraw(value: BigNumber | number): Promise<ContractReceipt>;
    /**
     * @description Locks stake and starts accumulating reward
     * @emits StakingPool.StakePut
     */
    putStake(stake: BigNumber | number): Promise<void>;
    /**
     * Accumulated reward
     */
    checkReward(): Promise<BigNumber>;
    /**
     * @returns Stake
     */
    getStake(): Promise<Stake>;
    /**
     * @description pays back stake with accumulated reward.
     */
    withdraw(): Promise<void>;
}
