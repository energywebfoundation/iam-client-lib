import { StakingPoolFactory__factory, IRoleDefinition, RewardPool__factory, StakingPool__factory } from "@energyweb/iam-contracts";
import { StakingPoolFactory } from "@energyweb/iam-contracts/dist/ethers-v4/StakingPoolFactory";
import { StakingPool as StakingPoolContract } from "@energyweb/iam-contracts/dist/ethers-v4/StakingPool";
import { EventFilter, Contract, Wallet, utils, providers } from "ethers";
import { Methods } from "@ew-did-registry/did";
import { IAM, RegistrationTypes, setChainConfig, StakingPool, StakingPoolService } from "../src/iam-client-lib";
import { claimManager, ensRegistry, replenish, provider, deployer } from "./setup_contracts";
import { createIam, root, rootOwner } from "./iam.test";
import { mockJsonCodec, mockNats } from "./testUtils/mocks";

const { parseEther, namehash, BigNumber } = utils;
const { JsonRpcProvider } = providers;

export const waitFor = (filter: EventFilter, contract: Contract): Promise<any> => new Promise<any>((resolve) => {
  contract.addListener(filter, (...args) => {
    resolve(args);
  });
})
  .then((args) => {
    contract.removeAllListeners(filter);
    return args;
  });

export const stakingTests = (): void => {
  const serviceProvider = Wallet.createRandom().connect(provider);
  const patron = Wallet.createRandom().connect(provider);
  const patronDID = `did:${Methods.Erc1056}:${patron.address}`;

  const orgName = "orgname";
  const domain = `${orgName}.${root}`;
  let serviceProviderIam: IAM;
  let providerStakingService: StakingPoolService;
  let patronIam: IAM;
  let rootOwnerIam: IAM;

  const principalThreshold = parseEther("0.1");
  const withdrawDelay = 1;
  let stakingPoolFactory: StakingPoolFactory;
  const patronRewardPortion = 800;
  const patronRole = "patronRole";
  const minStakingPeriod = 5;

  const calculateReward = (
    stakeAmount: utils.BigNumber,
    depositPeriod: utils.BigNumber,
    patronRewardPortion: utils.BigNumber
  ): utils.BigNumber => {
    const dailyInterestNumerator = new BigNumber(1000312);
    const dailyInterestDenominator = new BigNumber(1000000);
    const secInDay = new BigNumber(60 * 60 * 24);
    const depositPeriodInterest = (dailyInterestNumerator.div(dailyInterestDenominator)).pow(depositPeriod.div(secInDay));
    const accumulatedStake = stakeAmount.mul(depositPeriodInterest);
    const totalReward = accumulatedStake.sub(stakeAmount);
    return totalReward.mul(patronRewardPortion).div(new BigNumber(1000));
  };

  async function setupStakingPoolFactory(
  ) {
    stakingPoolFactory = await (await new StakingPoolFactory__factory(deployer).deploy(
      principalThreshold,
      withdrawDelay,
      claimManager.address,
      ensRegistry.address,
    )).deployed();
    const { chainId } = await provider.getNetwork();
    setChainConfig(chainId, { stakingPoolFactoryAddress: stakingPoolFactory.address });
  }

  xit("Test in VOLTA", async () => {
    const provider = new JsonRpcProvider("");
    const faucet = new Wallet("1aec3458500362c0a0f1772ab724a71b0f9d7da418a2d86d5954ab3f4b58ec4e").connect(provider);
    const patron = Wallet.createRandom().connect(provider);
    const stake = parseEther("0.1");
    await (await faucet.sendTransaction({ to: patron.address, value: parseEther("0.2") })).wait();
    const stakingService = await StakingPoolService.init(faucet);
    const org = "dmitryfesenko.iam.ewc";
    let pool = await stakingService.getPool(org);
    if (!pool) {
      await stakingService.launchStakingPool({
        org,
        minStakingPeriod: 1,
        patronRewardPortion: 500,
        patronRoles: [],
        principal: parseEther("100"),
      });
    }
    pool = await stakingService.getPool(org);
    if (pool) {
      pool = pool.connect(patron);
      const stakeBeforeStaking = (await pool.getStake()).amount;
      await pool.putStake(stake);
      await pool.checkReward();
      expect((await pool.getStake()).amount.eq(stakeBeforeStaking.add(stake))).toBe(true);
    }
  });

  beforeAll(async () => {
    await setupStakingPoolFactory();

    await replenish(serviceProvider.address);
    serviceProviderIam = await createIam(serviceProvider.privateKey, { initDID: true });

    await replenish(patron.address);
    patronIam = await createIam(patron.privateKey, { initDID: true });
    await replenish(rootOwner.address);
    rootOwnerIam = await createIam(rootOwner.privateKey, { initDID: true });

    const data: IRoleDefinition = {
      fields: [],
      issuer: {
        issuerType: "DID",
        did: [`did:${Methods.Erc1056}:${serviceProvider.address}`]
      },
      metadata: [],
      roleName: patronRole,
      roleType: "test",
      version: 1,
      enrolmentPreconditions: []
    };

    await rootOwnerIam.createRole({
      roleName: patronRole,
      namespace: root,
      data
    });
    await rootOwnerIam.createOrganization({
      orgName,
      namespace: root,
      data: { orgName },
      returnSteps: false
    });
    await rootOwnerIam.changeOrgOwnership({
      namespace: `${orgName}.${root}`,
      newOwner: serviceProvider.address
    });

    const { publish } = mockNats();
    const jsonCodec = mockJsonCodec();

    const registrationTypes = [RegistrationTypes.OnChain];
    await patronIam.createClaimRequest({
      claim: { claimType: `${patronRole}.${root}`, claimTypeVersion: 1, fields: [] },
      registrationTypes
    });
    const [, encodedMsg] = publish.mock.calls.pop();
    const { id, subjectAgreement, token } = jsonCodec.decode(encodedMsg);

    await serviceProviderIam.issueClaimRequest({
      id,
      registrationTypes,
      requester: patronDID,
      subjectAgreement,
      token
    });
  });

  beforeEach(async () => {
    await setupStakingPoolFactory();
    providerStakingService = await StakingPoolService.init(serviceProvider);
  });

  describe("StakingPoolFactory tests", () => {
    it("organization owner should be able to launch pool", async () => {
      const poolIsLaunched = waitFor(
        stakingPoolFactory.filters.StakingPoolLaunched(namehash(domain), null),
        stakingPoolFactory
      );

      await replenish(serviceProvider.address, principalThreshold);
      await providerStakingService.launchStakingPool({
        org: domain,
        minStakingPeriod,
        patronRewardPortion,
        patronRoles: [`${patronRole}.${root}`],
        principal: principalThreshold
      });

      expect(await stakingPoolFactory.orgsList()).toStrictEqual([namehash(domain)]);
      expect(await stakingPoolFactory.services(namehash(domain))).toMatchObject({ provider: serviceProvider.address });
      return expect(poolIsLaunched).resolves;
    });

    it("should be able to get all services", async () => {
      const orgName2 = "orgname2";
      await rootOwnerIam.createOrganization({
        orgName: orgName2,
        namespace: root,
        data: { orgName },
        returnSteps: false
      });
      await rootOwnerIam.changeOrgOwnership({
        namespace: `${orgName2}.${root}`,
        newOwner: serviceProvider.address
      });

      await providerStakingService.launchStakingPool({
        org: domain,
        minStakingPeriod,
        patronRewardPortion,
        patronRoles: [`${patronRole}.${root}`],
        principal: principalThreshold
      });
      await providerStakingService.launchStakingPool({
        org: `${orgName2}.${root}`,
        minStakingPeriod,
        patronRewardPortion,
        patronRoles: [`${patronRole}.${root}`],
        principal: principalThreshold
      });

      expect(
        (await providerStakingService.allServices()).map((s) => ({ org: s.org, provider: s.provider }))
      )
        .toStrictEqual(
          [
            { org: `${orgName}.${root}`, provider: serviceProvider.address },
            { org: `${orgName2}.${root}`, provider: serviceProvider.address }
          ]);
    });

    it("non-owner of organization should not be able to launch pool", async () => {
      const nonOwner = Wallet.createRandom().connect(provider);
      await replenish(nonOwner.address);
      const nonOwnerServicePool = await StakingPoolService.init(nonOwner);

      await replenish(nonOwner.address, principalThreshold);
      return expect(nonOwnerServicePool.launchStakingPool({
        org: domain,
        minStakingPeriod,
        patronRewardPortion,
        patronRoles: [`${patronRole}.${root}`],
        principal: principalThreshold
      })).rejects.toThrow("StakingPoolFactory: Not authorized to create pool for this organization");
    });

    it("pool should not be launched with principal less then threshold", async () => {
      await replenish(serviceProvider.address, principalThreshold);

      return expect(providerStakingService.launchStakingPool({
        org: domain,
        minStakingPeriod,
        patronRewardPortion,
        patronRoles: [`${patronRole}.${root}`],
        principal: principalThreshold.div(2)
      })).rejects.toThrow("StakingPoolFactory: principal less than threshold");
    });

    it("should not be possible to launch two pools for one organization", async () => {
      await replenish(serviceProvider.address, principalThreshold.mul(2));

      await providerStakingService.launchStakingPool({
        org: domain,
        minStakingPeriod,
        patronRewardPortion,
        patronRoles: [`${patronRole}.${root}`],
        principal: principalThreshold
      });

      return expect(providerStakingService.launchStakingPool({
        org: domain,
        minStakingPeriod,
        patronRewardPortion,
        patronRoles: [`${patronRole}.${root}`],
        principal: principalThreshold
      })).rejects.toThrow("StakingPoolFactory: pool for organization already launched");
    });
  });

  describe("StakingPool tests", () => {
    let pool: StakingPool;
    let poolContract: StakingPoolContract;

    beforeEach(async () => {
      await replenish(serviceProvider.address, principalThreshold);
      await providerStakingService.launchStakingPool({
        org: domain,
        minStakingPeriod,
        patronRewardPortion,
        patronRoles: [`${patronRole}.${root}`],
        principal: principalThreshold
      });
      const patronStakingService = await StakingPoolService.init(patron);
      const launchedPool = await patronStakingService.getPool(domain);
      expect(launchedPool).not.toBeNull;
      pool = launchedPool as StakingPool;
      const poolAddress = (await stakingPoolFactory.services(namehash(domain))).pool;
      poolContract = new StakingPool__factory(patron).attach(poolAddress);
    });

    it("patron should be able to stake", async () => {
      const stake = parseEther("0.1");
      const stakePut = waitFor(
        poolContract.filters.StakePut(patron.address, stake, null),
        poolContract
      );

      await pool.putStake(stake);
      return expect(stakePut).resolves;
    });

    it("should not be able to stake without having patron role", async () => {
      const nonPatron = Wallet.createRandom().connect(provider);
      await replenish(nonPatron.address);
      return expect(pool.connect(nonPatron).putStake(
        parseEther("0.1")
      )).rejects.toThrow("StakingPool: patron is not registered with patron role");
    });

    it("stake amount must be provided", async () => {
      return expect(
        pool.putStake(parseEther("0"))
      )
        .rejects.toThrow("StakingPool: stake amount is not provided");
    });

    it("stake should not be replenished", async () => {
      await pool.putStake(parseEther("0.1"));

      return expect(pool.putStake(parseEther("0.1")))
        .rejects.toThrow("StakingPool: Replenishment of the stake is not allowed");
    });

    it("staker should be able to request withdraw", async () => { 
      await pool.putStake(parseEther("0.1"));
      const requestDelay = await pool.requestWithdrawDelay();
      await new Promise((resolve) => setTimeout(resolve, 1000 * requestDelay.toNumber()));

      const withdrawRequested = waitFor(
        poolContract.filters.StakeWithdrawalRequested(patron.address, null),
        poolContract
      );

      await pool.requestWithdraw();

      return expect(withdrawRequested).resolves;
    });

    it("can't request withdraw when no stake", async () => {
      return expect(pool.requestWithdraw())
        .rejects.toThrow("StakingPool: No stake to withdraw");
    });

    it("can't request withdraw until minimum staking period is last", async () => {
      await pool.putStake(parseEther("0.1"));
      const requestDelay = await pool.requestWithdrawDelay();
      await new Promise((resolve) => setTimeout(resolve, 1000 * (requestDelay.toNumber() / 2)));

      return expect(pool.requestWithdraw())
        .rejects.toThrow("StakingPool: Minimum staking period is not expired yet");
    });

    it("withdraw can't be rquested twice", async () => {
      await pool.putStake(parseEther("0.1"));
      const requestDelay = await pool.requestWithdrawDelay();
      await new Promise((resolve) => setTimeout(resolve, 1000 * requestDelay.toNumber()));

      await pool.requestWithdraw();

      return expect(pool.requestWithdraw())
        .rejects.toThrow("StakingPool: No stake to withdraw");
    });

    it("stake can be withdrawn", async () => {
      const stake = parseEther("0.1");
      const stakePut = waitFor(
        poolContract.filters.StakePut(patron.address, null, null), poolContract
      );
      await pool.putStake(stake);
      const depositStart = (await stakePut)[2];
      const requestDelay = await pool.requestWithdrawDelay();
      await new Promise((resolve) => setTimeout(resolve, 1000 * requestDelay.toNumber()));

      const stakeWithdrawalRequested = waitFor(
        poolContract.filters.StakeWithdrawalRequested(patron.address, null), poolContract
      );
      await pool.requestWithdraw();
      const depositEnd = (await stakeWithdrawalRequested)[1];

      const expectedReward = calculateReward(stake, (depositEnd.sub(depositStart)), new BigNumber(patronRewardPortion));
      expect(await pool.checkReward()).toEqual(expectedReward);

      const withdrawalDelay = await pool.withdrawalDelay();
      await new Promise((resolve) => setTimeout(resolve, 1000 * withdrawalDelay.toNumber()));

      const stakeWithdrawn = waitFor(
        poolContract.filters.StakeWithdrawn(patron.address, null),
        poolContract
      );
      const balanceBeforeWithdraw = await patron.getBalance();
      const rewardPool = new RewardPool__factory(patron).attach(await stakingPoolFactory.rewardPool());
      await replenish(rewardPool.address, expectedReward);

      await pool.withdraw();
      const balanceAfterWithdraw = await patron.getBalance();

      expect(balanceAfterWithdraw.eq(balanceBeforeWithdraw.add(stake).add(expectedReward)));
      return expect(stakeWithdrawn).resolves;
    });
  });
};