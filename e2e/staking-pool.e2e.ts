import { KeyTags } from "@ew-did-registry/did-resolver-interface";
import { providers, utils, Wallet } from "ethers";
import {
    chainConfigs,
    initWithPrivateKeySigner,
    MessagingService,
    ProviderType,
    setChainConfig,
    SignerService,
    StakeStatus,
    StakingFactoryService,
    StakingPoolService,
} from "../src";
import { deployer, replenish, rpcUrl, setupENS } from "./utils/setup_contracts";
import { StakingPool__factory } from "../ethers-staking";

const provider = new providers.JsonRpcProvider(rpcUrl);
const rootOwner = Wallet.createRandom().connect(provider);
const orgOwner = Wallet.createRandom().connect(provider);

const patron = Wallet.createRandom().connect(provider);

MessagingService.create = (signerService: SignerService) => Promise.resolve(new MessagingService(signerService));
const mockPublish = jest.fn();
jest.mock("../src/modules/messaging/messaging.service", () => {
    return {
        MessagingService: jest.fn().mockImplementation(() => {
            return { publish: mockPublish };
        }),
    };
});

const mockGetRoleDefinition = jest.fn();
const mockGetDidDocument = jest.fn().mockImplementation(({ did }: { did: string }) => {
    return { publicKey: [{ id: `did:ethr:${did}-${KeyTags.OWNER}` }] };
});
const mockGetApplicationsByOrgNamespace = jest.fn();

jest.mock("../src/modules/cacheClient/cacheClient.service", () => {
    return {
        CacheClient: jest.fn().mockImplementation(() => {
            return {
                getRoleDefinition: mockGetRoleDefinition,
                getDidDocument: mockGetDidDocument,
                getApplicationsByOrganization: mockGetApplicationsByOrgNamespace,
                init: jest.fn(),
                login: jest.fn(),
            };
        }),
    };
});

const duration = 3600 * 24 * 7;

const oneEWT = utils.parseUnits("1", "ether");
const hardCap = utils.parseUnits("2", "ether");
const contributionLimit = oneEWT.mul(50000);

const ratio = 0.0002225;
const ratioInt = utils.parseUnits(ratio.toString(), 18);

const rewards = oneEWT.mul(11);

let poolStart;
let poolEnd;

export const setupStakingPoolFactory = async () => {
    const { chainId } = await deployer.provider.getNetwork();
    const { claimManagerAddress } = chainConfigs()[chainId];

    const { timestamp } = await deployer.provider.getBlock("latest");

    const start = timestamp + 10;
    const end = start + duration;

    const stakingPoolFactory = await (await new StakingPool__factory(deployer).deploy()).deployed();

    poolStart = start;
    poolEnd = end;

    await stakingPoolFactory.init(claimManagerAddress, start, end, ratioInt, hardCap, contributionLimit, {
        value: rewards,
    });

    setChainConfig(chainId, { stakingPoolFactoryAddress: stakingPoolFactory.address });
};

const putStake = async (pool: StakingPoolService, amount: number, withAmountCheck = true) => {
    await pool.putStake(amount);

    const currentStake = await pool.getStake();

    if (withAmountCheck) {
        expect(currentStake.amount.toNumber()).toBe(amount);
    }

    expect(currentStake.status).toBe(StakeStatus.STAKING);

    const reward = await pool.checkReward();
    expect(reward.toNumber()).toBe(0);
};

const timeTravel = async (provider: providers.JsonRpcProvider, seconds: number) => {
    await provider.send("evm_increaseTime", [seconds]);
    await provider.send("evm_mine", []);
};

describe("StakingPool tests", () => {
    // let domainsService: DomainsService;
    let signerService: SignerService;
    let stakingPoolService: StakingFactoryService;

    beforeAll(async () => {
        await replenish(orgOwner.address);
        await replenish(patron.address);
        await replenish(rootOwner.address);
        await setupENS(rootOwner.address);
        await setupStakingPoolFactory();
        let connectToCacheServer;
        ({ connectToCacheServer, signerService } = await initWithPrivateKeySigner(rootOwner.privateKey, rpcUrl));

        const { stakingPoolService: stakingPools } = await connectToCacheServer();
        stakingPoolService = stakingPools;
    });

    beforeEach(async () => {
        jest.clearAllMocks();
        await setupStakingPoolFactory();
        await signerService.connect(patron, ProviderType.PrivateKey);

        await replenish(patron.address);
        await timeTravel(provider, 20);
    });

    it("can stake", async () => {
        const pool = await stakingPoolService.getPool();

        await putStake(pool, 10);
    });

    it("should reward", async () => {
        const pool = await stakingPoolService.getPool();
        await putStake(pool, 10000);

        const periods = 24 * 90; // 3 months
        const hour = 3600;

        await timeTravel(provider, hour * periods);

        const rewardAfterTimeTravel = await pool.checkReward();

        expect(rewardAfterTimeTravel.toNumber()).toBe(378);
    });

    it("should return all staked", async () => {
        const pool = await stakingPoolService.getPool();

        await putStake(pool, 1);
        await putStake(pool, 1, false);

        const currentStake = await pool.getStake();
        expect(currentStake.amount.toNumber()).toBe(2);

        await pool.withdraw();
        const stakeAfterWithdraw = await pool.getStake();

        expect(stakeAfterWithdraw.amount.toNumber()).toBe(0);

        const { status } = await pool.getStake();
        expect(status).toBe(StakeStatus.NONSTAKING);
    });

    it("should withdraw without reward", async () => {
        const pool = await stakingPoolService.getPool();

        await putStake(pool, 1);

        await pool.withdraw();

        const currentStake = await pool.getStake();
        expect(currentStake.amount.toNumber()).toBe(0);
    });

    it("should return NONSTAKING status as staking pool is empty", async () => {
        const pool = await stakingPoolService.getPool();
        const stake = await pool.getStake();

        expect(stake.status).toBe(StakeStatus.NONSTAKING);
    });

    it("should return hardcap", async () => {
        const pool = await stakingPoolService.getPool();

        const poolHardCap = await pool.getHardCap();

        expect(poolHardCap.eq(hardCap)).toEqual(true);
    });

    it("should return contribution limit", async () => {
        const pool = await stakingPoolService.getPool();

        const poolContributionLimit = await pool.getContributionLimit();

        expect(poolContributionLimit.eq(contributionLimit)).toEqual(true);
    });

    it("should be able to unstake", async () => {
        const pool = await stakingPoolService.getPool();

        await putStake(pool, 2);

        await pool.partialWithdraw(1);
        await provider.send("evm_mine", []);

        const currentStake = await pool.getStake();
        expect(currentStake.amount.toNumber()).toBe(1);
        expect(currentStake.status).toBe(StakeStatus.STAKING);
    });

    it("should return start of the pool", async () => {
        const pool = await stakingPoolService.getPool();

        const start = await pool.getStart();

        expect(start.toNumber()).toBe(poolStart);
    });

    it("should return end of the pool", async () => {
        const pool = await stakingPoolService.getPool();

        const end = await pool.getEnd();

        expect(end.toNumber()).toBe(poolEnd);
    });
});
