import { utils, BigNumber, providers } from "ethers";
import { StakingPoolFactory, StakingPool as StakingPoolContract } from "../../../ethers";
import { StakingPoolFactory__factory } from "../../../ethers/factories/StakingPoolFactory__factory";
import { StakingPool__factory } from "../../../ethers/factories/StakingPool__factory";
import { ERROR_MESSAGES } from "../../errors/ErrorMessages";
import { emptyAddress } from "../../utils/constants";
import { SignerService } from "../signer/signer.service";
import { chainConfigs } from "../../config/chain.config";
import { DomainsService } from "../domains/domains.service";

const { namehash, parseUnits } = utils;

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

/**
 * Inteneded for staking pools management
 */
export class StakingService {
    private _stakingPoolFactory: StakingPoolFactory;

    constructor(private _signerService: SignerService, private _domainsService: DomainsService) {
        this._signerService.onInit(this.init.bind(this));
    }

    static async create(signerService: SignerService, domainsService: DomainsService) {
        const service = new StakingService(signerService, domainsService);
        await service.init();
        return service;
    }

    /**
     * @description Connects to the same chain as `signer`. The signer must be connected
     * @param signer Signer with connected provider
     */
    async init() {
        const chainId = this._signerService.chainId;
        const { stakingPoolFactoryAddress } = chainConfigs()[chainId];
        this._stakingPoolFactory = new StakingPoolFactory__factory().attach(stakingPoolFactoryAddress);
    }

    /**
     * @description Deployes organization staking pool
     * @emits StakingPoolFactory.StakingPoolLaunched
     */
    async launchPool({
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
        const tx: providers.TransactionRequest = {
            to: this._stakingPoolFactory.address,
            data: this._stakingPoolFactory.interface.encodeFunctionData("launchStakingPool", [
                namehash(org),
                minStakingPeriod,
                patronRewardPortion,
                patronRoles.map((r) => namehash(r)),
            ]),
            value: principal,
        };
        await this._signerService.send(tx);
    }

    /**
     * @description Returns all services for which pools are launched
     */
    async allServices(): Promise<Service[]> {
        const stakingPoolFactory = this._stakingPoolFactory.connect(this._signerService.signer);
        const orgs = await stakingPoolFactory.orgsList();
        return Promise.all(
            orgs.map((org) =>
                stakingPoolFactory
                    .services(org)
                    .then((service) => ({ ...service, org }))
                    .then((service) => this._domainsService.readName(service.org).then((org) => ({ ...service, org }))),
            ),
        );
    }

    /**
     * @description Returns pool launched for `org` if any
     * @param org ENS name of organization
     */
    async getPool(org: string): Promise<StakingPool | null> {
        const { pool } = await this._stakingPoolFactory.connect(this._signerService.signer).services(namehash(org));
        if (pool === emptyAddress) {
            return null;
        }
        return new StakingPool(this._signerService, pool);
    }
}

/**
 * Abstraction over staking pool smart contract
 */
export class StakingPool {
    private overrides = {
        gasPrice: parseUnits("0.01", "gwei"),
        gasLimit: BigNumber.from(490000),
    };
    private pool: StakingPoolContract;

    constructor(private signerService: SignerService, address: string) {
        this.pool = new StakingPool__factory().attach(address);
    }

    /**
     * @description Locks stake and starts accumulating reward
     * @emits StakingPool.StakePut
     */
    async putStake(
        /** stake amount */
        stake: BigNumber | number,
    ): Promise<void> {
        stake = BigNumber.from(stake);
        const tx: providers.TransactionRequest = {
            to: this.pool.address,
            from: this.signerService.address,
            data: this.pool.interface.encodeFunctionData("putStake"),
            value: stake,
        };
        const balance = await this.signerService.balance();

        const gasPrice = await this.signerService.signer.getGasPrice();
        const gas = await this.signerService.provider.estimateGas(tx);

        // multiplier 2 chosen arbitrarily because it is not known how reasonably to choose it
        const fee = gasPrice.mul(gas).mul(2);

        const maxStake = balance.sub(fee);

        if (maxStake.lte(0)) {
            throw new Error(ERROR_MESSAGES.INSUFFICIENT_BALANCE);
        }
        tx.value = stake.lt(maxStake) ? stake : maxStake;
        await this.signerService.send(tx);
    }

    /**
     * @description Returns time left to enable request withdraw
     */
    async requestWithdrawDelay(): Promise<number> {
        const { depositStart, status } = await this.getStake();
        if (status !== StakeStatus.STAKING) {
            throw new Error(ERROR_MESSAGES.STAKE_WAS_NOT_PUT);
        }
        const requestAvailableFrom = depositStart.add(
            await this.pool.connect(this.signerService.signer).minStakingPeriod(),
        );
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
        return this.pool.connect(this.signerService.signer).checkReward();
    }

    /**
     * @param patron staker address
     * @returns Stake
     */
    async getStake(patron?: string): Promise<Stake> {
        if (!patron) {
            patron = this.signerService.address;
        }
        return this.pool.connect(this.signerService.signer).stakes(patron);
    }

    /**
     * @description Stops accumulating of the reward and prepars stake to withdraw after withdraw delay.
     * Withdraw request unavailable until minimum staking period ends
     */
    async requestWithdraw(): Promise<void> {
        const tx: providers.TransactionRequest = {
            to: this.pool.address,
            data: this.pool.interface.encodeFunctionData("requestWithdraw"),
            ...this.overrides,
        };
        await this.signerService.send(tx);
    }

    /**
     * @description Returns time left to enable withdraw
     */
    async withdrawalDelay(): Promise<number> {
        const { depositEnd, status } = await this.getStake();
        if (status !== StakeStatus.WITHDRAWING) {
            throw new Error(ERROR_MESSAGES.WITHDRAWAL_WAS_NOT_REQUESTED);
        }
        const withdrawAvailableFrom = depositEnd.add(
            await this.pool.connect(this.signerService.signer).withdrawDelay(),
        );
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
    async withdraw(): Promise<void> {
        const tx: providers.TransactionRequest = {
            to: this.pool.address,
            data: this.pool.interface.encodeFunctionData("withdraw"),
            ...this.overrides,
        };
        await this.signerService.send(tx);
    }

    private async now(): Promise<BigNumber> {
        const lastBlock = await this.signerService.provider.getBlockNumber();
        return BigNumber.from((await this.signerService.provider.getBlock(lastBlock)).timestamp);
    }
}
