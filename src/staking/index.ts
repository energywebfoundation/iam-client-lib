import { DomainReader, ResolverContractType } from "@energyweb/iam-contracts";
import { StakingPool as StakingPoolContract } from "../../ethers/StakingPool";
import { StakingPool__factory } from "../../ethers/factories/StakingPool__factory";
import { StakingPoolFactory } from "../../ethers/StakingPoolFactory";
import { StakingPoolFactory__factory } from "../../ethers/factories/StakingPoolFactory__factory";
import { Signer, utils, BigNumber } from "ethers";
import { ERROR_MESSAGES } from "../errors";
import { chainConfigs } from "../iam/chainConfig";
import { emptyAddress } from "../utils/constants";

const { namehash, parseUnits } = utils;

export enum StakeStatus {
    NONSTAKING = 0,
    STAKING = 1,
    WITHDRAWING = 2,
}
export enum TransactionSpeed {
    BASE = 0,
    FAST = 1,
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

/**
 * Inteneded for staking pools management
 */
export class StakingPoolService {
    private constructor(
        private _stakingPoolFactory: StakingPoolFactory,
        private _domainReader: DomainReader,
        private _signer: Required<Signer>,
    ) {}

    /**
     * @description Connects to the same chain as `signer`. The signer must be connected
     * @param signer Signer with connected provider
     */
    static async init(signer: Signer) {
        if (!signer.provider) {
            throw new Error("StakingPoolService.init: Signer is not connected to provider");
        }
        const { chainId } = await signer.provider.getNetwork();
        const { stakingPoolFactoryAddress, ensRegistryAddress, ensResolverAddress, ensPublicResolverAddress } =
            chainConfigs[chainId];
        const stakingPoolFactory = new StakingPoolFactory__factory(signer).attach(stakingPoolFactoryAddress);
        const domainReader = new DomainReader({ ensRegistryAddress, provider: signer.provider });
        ensPublicResolverAddress &&
            domainReader.addKnownResolver({
                chainId,
                address: ensPublicResolverAddress,
                type: ResolverContractType.PublicResolver,
            });
        ensResolverAddress &&
            domainReader.addKnownResolver({
                chainId,
                address: ensResolverAddress,
                type: ResolverContractType.RoleDefinitionResolver_v1,
            });
        return new StakingPoolService(stakingPoolFactory, domainReader, signer as Required<Signer>);
    }

    /**
     * @description Deployes organization staking pool
     * @emits StakingPoolFactory.StakingPoolLaunched
     */
    async launchStakingPool({
        org,
        minStakingPeriod,
        patronRewardPortion,
        patronRoles,
        principal,
    }: {
        /** organization ENS name */
        org: string;
        /** minimum staking period in seconds */
        minStakingPeriod: number | BigNumber;
        /** patron's part of the reward in fractions of thousandth */
        patronRewardPortion: number;
        /** roles required to stake */
        patronRoles: string[];
        /** stake put by service provider when pool is launched */
        principal: BigNumber;
    }): Promise<void> {
        await (
            await this._stakingPoolFactory.launchStakingPool(
                namehash(org),
                minStakingPeriod,
                patronRewardPortion,
                patronRoles.map((r) => namehash(r)),
                { value: principal.toHexString() },
            )
        ).wait();
    }

    /**
     * @description Returns all services for which pools are launched
     */
    async allServices(): Promise<Service[]> {
        const orgs = await this._stakingPoolFactory.orgsList();
        return Promise.all(
            orgs.map((org) =>
                this._stakingPoolFactory
                    .services(org)
                    .then((service) => ({ ...service, org }))
                    .then((service) => this._domainReader.readName(service.org).then((org) => ({ ...service, org }))),
            ),
        );
    }

    /**
     * @description Returns pool launched for `org` if any
     * @param org ENS name of organization
     */
    async getPool(org: string): Promise<StakingPool | null> {
        const { pool } = await this._stakingPoolFactory.services(namehash(org));
        if (pool === emptyAddress) {
            return null;
        }
        const stakingPool = new StakingPool(this._signer, pool);
        await stakingPool.init();
        return stakingPool;
    }
}

/**
 * Abstraction over staking pool smart contract
 */
export class StakingPool {
    private overrides = {
        [TransactionSpeed.BASE]: {},
        [TransactionSpeed.FAST]: {
            gasPrice: parseUnits("0.01", "gwei"),
            gasLimit: 490000,
        },
    };
    public principal: BigNumber;
    public totalStake: BigNumber;
    public minStakingPeriod: number;
    public withdrawDelay: number;
    public patronRoles: string[];
    public patronRewardPortion: number;
    private pool: StakingPoolContract;

    constructor(private patron: Required<Signer>, address: string) {
        this.pool = new StakingPool__factory(patron).attach(address);
    }

    async init(): Promise<void> {
        this.principal = await this.pool.principal();
        this.totalStake = await this.pool.totalStake();
        this.minStakingPeriod = (await this.pool.minStakingPeriod()).toNumber();
        this.withdrawDelay = (await this.pool.withdrawDelay()).toNumber();
        // TODO: map role hashes to role names
        this.patronRoles = await this.pool.getPatronRoles();
        this.patronRewardPortion = (await this.pool.patronRewardPortion()).toNumber();
    }

    /**
     * @description Locks stake and starts accumulating reward
     * @emits StakingPool.StakePut
     */
    async putStake(
        /** stake amount */
        stake: BigNumber | number,
        transactionSpeed = TransactionSpeed.FAST,
    ): Promise<void> {
        if (!(await this.isAuthorizedToStake())) {
            throw new Error(ERROR_MESSAGES.NOT_AUTHTORIZED_TO_STAKE);
        }
        if (typeof stake === "number") {
            stake = BigNumber.from(stake);
        }
        if ((await this.getBalance()).lt(stake)) {
            throw new Error(ERROR_MESSAGES.INSUFFICIENT_BALANCE);
        }
        await (
            await this.pool.putStake({
                value: stake,
                ...this.overrides[transactionSpeed],
            })
        ).wait();
    }

    /**
     * @description Returns time left to enable request withdraw
     */
    async remainingRequestWithdrawDelay(): Promise<number> {
        const { depositStart, status } = await this.getStake();
        if (status !== StakeStatus.STAKING) {
            throw new Error(ERROR_MESSAGES.STAKE_WAS_NOT_PUT);
        }
        const requestAvailableFrom = depositStart.add(this.minStakingPeriod);
        const now = await this.now();
        if (requestAvailableFrom.lte(now)) {
            return 0;
        } else {
            return requestAvailableFrom.sub(now).toNumber();
        }
    }

    /**
     * Accumulated reward
     */
    async checkReward(): Promise<BigNumber> {
        return this.pool.checkReward();
    }

    /**
     * @param patron staker address
     * @returns Stake
     */
    async getStake(patron?: string): Promise<Stake> {
        if (!patron) {
            patron = await this.pool.signer.getAddress();
        }
        return this.pool.stakes(patron);
    }

    /**
     * @description Stops accumulating of the reward and prepars stake to withdraw after withdraw delay.
     * Withdraw request unavailable until minimum staking period ends
     */
    async requestWithdraw(transactionSpeed = TransactionSpeed.FAST): Promise<void> {
        await (
            await this.pool.requestWithdraw({
                ...this.overrides[transactionSpeed],
            })
        ).wait();
    }

    /**
     * @description Returns time left to enable withdraw
     */
    async remainingWithdrawDelay(): Promise<number> {
        const { depositEnd, status } = await this.getStake();
        if (status !== StakeStatus.WITHDRAWING) {
            throw new Error(ERROR_MESSAGES.WITHDRAWAL_WAS_NOT_REQUESTED);
        }
        const withdrawAvailableFrom = depositEnd.add(this.withdrawDelay);
        const now = await this.now();
        if (withdrawAvailableFrom.lte(now)) {
            return 0;
        } else {
            return withdrawAvailableFrom.sub(now).toNumber();
        }
    }

    /**
     * @description pays back stake with accumulated reward. Withdrawn unavailable until withdrawn delay ends
     * @emits StakingPool.StakeWithdrawn
     */
    async withdraw(transactionSpeed = TransactionSpeed.FAST): Promise<void> {
        await (
            await this.pool.withdraw({
                ...this.overrides[transactionSpeed],
            })
        ).wait();
    }

    /**
     * @param signer Signer connected to provider
     */
    connect(signer: Signer): StakingPool {
        if (!signer.provider) {
            throw new Error("StakingPoolService.init: Signer is not connected to provider");
        }
        return new StakingPool(signer as Required<Signer>, this.pool.address);
    }

    private async now(): Promise<BigNumber> {
        const lastBlock = await this.pool.provider.getBlockNumber();
        return BigNumber.from((await this.pool.provider.getBlock(lastBlock)).timestamp);
    }

    private async getBalance(): Promise<BigNumber> {
        return await this.patron.provider.getBalance(await this.patron.getAddress());
    }

    private async isAuthorizedToStake(): Promise<boolean> {
        // TODO: inject did from didRegistry module and cacheClient from CacheClient module
        /** const patronRoles = cacheClient.getClaimsBySubject({ did, isAccepted: true, });
         * return patronRoles.some((r) => this.requiredRoles.include(r))    *
         */
        return true;
    }
}
