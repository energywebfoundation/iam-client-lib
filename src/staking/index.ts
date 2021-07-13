import { DomainReader, StakingPoolFactory__factory, StakingPool__factory, } from "@energyweb/iam-contracts";
import { StakingPool as StakingPoolContract } from "@energyweb/iam-contracts/dist/ethers-v4/StakingPool";
import { StakingPoolFactory } from "@energyweb/iam-contracts/dist/ethers-v4/StakingPoolFactory";
import { Signer, utils } from "ethers";
import { chainConfigs } from "../iam/chainConfig";

const { namehash } = utils;

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
  start: utils.BigNumber;
  withdrawalRequested: utils.BigNumber;
  status: StakeStatus;
}

export class StakingPoolService {
  private constructor(private _stakingPoolFactory: StakingPoolFactory, private _domainReader: DomainReader, private _signer) { }

  static async init(signer: Required<Signer>) {
    const { chainId } = await signer.provider.getNetwork();
    const { stakingPoolFactoryAddress, ensRegistryAddress } = chainConfigs[chainId];
    const stakingPoolFactory = new StakingPoolFactory__factory(signer).attach(stakingPoolFactoryAddress);
    const domainReader = new DomainReader({ ensRegistryAddress, provider: signer.provider });
    return new StakingPoolService(stakingPoolFactory, domainReader, signer);
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
    (await this._stakingPoolFactory.launchStakingPool(
      namehash(org),
      minStakingPeriod,
      patronRewardPortion,
      patronRoles.map((r) => namehash(r))
      ,
      { value: principal.toHexString() }
    )).wait();
  }


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

  async getPool(org: string): Promise<StakingPool> {
    const service = await this._stakingPoolFactory.services(namehash(org));
    const pool = new StakingPool__factory(this._signer).attach(service.pool);
    return new StakingPool(pool);
  }
}

export class StakingPool {
  constructor(private pool: StakingPoolContract) { }

  /**
   * @description Locks stake and starts accumulating reward
   * @emits StakingPool.StakePut
   */
  async putStake(
    /** stake amount */
    stake: utils.BigNumber,
  ): Promise<void> {
    (await this.pool.putStake({
      value: stake.toHexString()
    })).wait();
  }

  /**
   * 
   */
  async checkReward(): Promise<utils.BigNumber> {
    return this.pool.checkReward();
  }

  /**
   * 
   * @param patron 
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
    (await this.pool.requestWithdraw()).wait();
  }

  /**
   * @description pays back stake with accumulated reward. Withdrawn unavailable until withdrawn delay ends
   * @emits StakingPool.StakeWithdrawn
   */
  async withdraw(): Promise<void> {
    (await this.pool.withdraw()).wait();
  }

  connect(signer: Signer): StakingPool {
    return new StakingPool(this.pool.connect(signer));
  }
}
