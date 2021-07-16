import { DomainReader, ResolverContractType, StakingPoolFactory__factory, StakingPool__factory, } from "@energyweb/iam-contracts";
import { StakingPool as StakingPoolContract } from "@energyweb/iam-contracts/dist/ethers-v4/StakingPool";
import { StakingPoolFactory } from "@energyweb/iam-contracts/dist/ethers-v4/StakingPoolFactory";
import { Signer, utils } from "ethers";
import { ERROR_MESSAGES } from '../errors';
import { chainConfigs } from "../iam/chainConfig";
import { emptyAddress } from "../utils/constants";

const { namehash, BigNumber } = utils;

export enum StakeStatus { NONSTAKING = 0, STAKING = 1, WITHDRAWING = 2 }

export type Service = {
  /** organization ENS name */
  org: string;
  /** pool address */
  pool: string;
  /** provider address */
  provider: string
}

export type Stake = {
  amount: utils.BigNumber;
  depositStart: utils.BigNumber;
  depositEnd: utils.BigNumber;
  status: StakeStatus;
}

/**
 * Inteneded for staking pools management
 */
export class StakingPoolService {
  private constructor(
    private _stakingPoolFactory: StakingPoolFactory,
    private _domainReader: DomainReader,
    private _signer: Required<Signer>
  ) { }

  /**
   * @description Connects to the same chain as `signer`. The signer must be connected
   * @param signer Signer with connected provider
   */
  static async init(signer: Signer) {
    if (!signer.provider) {
      throw new Error("StakingPoolService.init: Signer is not connected to provider");
    }
    const { chainId } = await signer.provider.getNetwork();
    const { stakingPoolFactoryAddress, ensRegistryAddress, ensResolverAddress, ensPublicResolverAddress } = chainConfigs[chainId];
    const stakingPoolFactory = new StakingPoolFactory__factory(signer).attach(stakingPoolFactoryAddress);
    const domainReader = new DomainReader({ ensRegistryAddress, provider: signer.provider });
    ensPublicResolverAddress
      && domainReader.addKnownResolver({ chainId, address: ensPublicResolverAddress, type: ResolverContractType.PublicResolver });
    ensResolverAddress
      && domainReader.addKnownResolver({ chainId, address: ensResolverAddress, type: ResolverContractType.RoleDefinitionResolver_v1 });
    return new StakingPoolService(stakingPoolFactory, domainReader, signer as Required<Signer>);
  }

  /**
   * @description Deployes organization staking pool
   * @emits StakingPoolFactory.StakingPoolLaunched
   */
  async launchStakingPool(
    { org, minStakingPeriod, patronRewardPortion, patronRoles, principal }:
      {
        /** organization ENS name */
        org: string,
        /** minimum staking period in seconds */
        minStakingPeriod: number | utils.BigNumber,
        /** patron's part of the reward in fractions of thousandth */
        patronRewardPortion: number,
        /** roles required to stake */
        patronRoles: string[],
        /** stake put by service provider when pool is launched */
        principal: utils.BigNumber
      }
  ): Promise<void> {
    await (await this._stakingPoolFactory.launchStakingPool(
      namehash(org),
      minStakingPeriod,
      patronRewardPortion,
      patronRoles.map((r) => namehash(r))
      ,
      { value: principal.toHexString() }
    )).wait();
  }

  /**
   * @description Returns all services for which pools are launched
   */
  async allServices(): Promise<Service[]> {
    const orgs = await this._stakingPoolFactory.orgsList();
    return Promise.all(
      orgs.map(
        (org) => this._stakingPoolFactory.services(org)
          .then((service) => ({ ...service, org }))
          .then((service) => this._domainReader.readName(service.org)
            .then((org) => ({ ...service, org }))
          )));
  }

  /**
   * @description Returns pool launched for `org` if any
   * @param org ENS name of organization
   */
  async getPool(org: string): Promise<StakingPool | null> {
    const service = await this._stakingPoolFactory.services(namehash(org));
    if (service.pool === emptyAddress) {
      return null;
    }
    const pool = new StakingPool__factory(this._signer).attach(service.pool);
    return new StakingPool(pool);
  }
}

/**
 * Abstraction over staking pool smart contract
 */
export class StakingPool {
  constructor(private pool: StakingPoolContract) { }

  /**
   * @description Locks stake and starts accumulating reward
   * @emits StakingPool.StakePut
   */
  async putStake(
    /** stake amount */
    stake: utils.BigNumber | number,
  ): Promise<void> {
    if (typeof stake === "number") {
      stake = new BigNumber(stake);
    }
    await (await this.pool.putStake({
      value: stake
    })).wait();
  }

  /**
   * Accumulated reward
   */
  async checkReward(): Promise<utils.BigNumber> {
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
  async requestWithdraw(): Promise<void> {
    await (await this.pool.requestWithdraw()).wait();
  }

  /**
   * @description Returns time left to enable withdraw
   */
  async withdrawalDelay(): Promise<utils.BigNumber> {
    const { depositEnd, status } = await this.getStake();
    if (status !== StakeStatus.WITHDRAWING) {
      throw new Error(ERROR_MESSAGES.WITHDRAWAL_WAS_NOT_REQUESTED);
    }
    return new BigNumber(new Date().getTime()).sub(depositEnd);
  }

  /**
   * @description pays back stake with accumulated reward. Withdrawn unavailable until withdrawn delay ends
   * @emits StakingPool.StakeWithdrawn
   */
  async withdraw(): Promise<void> {
    await (await this.pool.withdraw()).wait();
  }

  /**
   * @param signer Signer connected to provider
   */
  connect(signer: Signer): StakingPool {
    return new StakingPool(this.pool.connect(signer));
  }
}
