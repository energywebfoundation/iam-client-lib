import { BigNumber, providers, utils } from "ethers";
import { StakingPool as StakingPoolContract } from "../../../ethers-staking";
import { StakingPool__factory } from "../../../ethers-staking/factories/StakingPool__factory";
import { ERROR_MESSAGES } from "../../errors/ErrorMessages";
import { SignerService } from "../signer/signer.service";
import { chainConfigs } from "../../config/chain.config";
import { DomainsService } from "../domains/domains.service";
import { Service, Stake, StakeStatus } from "./staking.service";

const { namehash, parseUnits } = utils;

/**
 * Intended for staking pool
 */
export class StakingFactoryService {
    constructor(private _signerService: SignerService, private _domainsService: DomainsService) {}

    static async create(signerService: SignerService, domainsService: DomainsService) {
        const service = new StakingFactoryService(signerService, domainsService);
        return service;
    }

    /**
     * @description Returns all services for which pools are launched
     */
    async allServices(): Promise<Service[]> {
        return [
            {
                org: await this._domainsService.readName(namehash("energyweb.iam.ewc")),
                pool: chainConfigs()[this._signerService.chainId].stakingPoolFactoryAddress,
                provider: "empty",
            },
        ];
    }

    /**
     * @description Returns pool launched for energyweb org
     */
    async getPool(): Promise<StakingPoolService> {
        return new StakingPoolService(
            this._signerService,
            chainConfigs()[this._signerService.chainId].stakingPoolFactoryAddress,
        );
    }
}

/**
 * Abstraction over staking pool smart contract
 */
export class StakingPoolService {
    private overrides = {
        gasPrice: parseUnits("0.01", "gwei"),
        gasLimit: BigNumber.from(490000),
    };
    private pool: StakingPoolContract;

    constructor(private signerService: SignerService, address: string) {
        this.pool = new StakingPool__factory(
            StakingPool__factory.createInterface(),
            StakingPool__factory.bytecode,
        ).attach(address);
    }

    async getHardCap(): Promise<BigNumber> {
        return this.pool.connect(this.signerService.signer).hardCap();
    }

    async getContributionLimit(): Promise<BigNumber> {
        return this.pool.connect(this.signerService.signer).contributionLimit();
    }

    /**
     * @description Locks stake and starts accumulating reward
     * @emits StakingPool.StakePut
     */
    async putStake(stake: BigNumber | number): Promise<void> {
        stake = BigNumber.from(stake);
        const tx: providers.TransactionRequest = {
            to: this.pool.address,
            from: this.signerService.address,
            data: this.pool.interface.encodeFunctionData("stake"),
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
     * Accumulated reward
     */
    async checkReward(): Promise<BigNumber> {
        const [staked, compounded] = await this.pool.connect(this.signerService.signer).total();

        return compounded.sub(staked);
    }

    /**
     * @returns Stake
     */
    async getStake(): Promise<Stake> {
        const [staked] = await this.pool.connect(this.signerService.signer).total();
        const [start, end] = await Promise.all([
            this.pool.connect(this.signerService.signer).start(),
            this.pool.connect(this.signerService.signer).end(),
        ]);

        const stakeStatus = staked.gt(0) ? StakeStatus.STAKING : StakeStatus.NONSTAKING;

        return {
            amount: staked,
            depositStart: start,
            depositEnd: end,
            status: stakeStatus,
        };
    }

    /**
     * @description pays back stake with accumulated reward.
     */
    async withdraw(): Promise<void> {
        const tx: providers.TransactionRequest = {
            to: this.pool.address,
            data: this.pool.interface.encodeFunctionData("unstakeAll"),
            ...this.overrides,
        };
        await this.signerService.send(tx);
    }
}
