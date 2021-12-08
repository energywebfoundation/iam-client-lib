import { Methods } from "@ew-did-registry/did";
import { KeyTags } from "@ew-did-registry/did-resolver-interface";
import { BigNumber, providers, utils, Wallet } from "ethers";
import {
    chainConfigs,
    DomainsService,
    initWithPrivateKeySigner,
    MessagingService,
    ProviderType,
    RegistrationTypes,
    setChainConfig,
    SignerService,
    StakeStatus,
    StakingFactoryService,
    StakingPoolService,
} from "../src";
import { deployer, replenish, root, rpcUrl, setupENS } from "./utils/setup_contracts";
import { StakingPool__factory } from "../ethers-staking";
import { IRoleDefinition } from "@energyweb/iam-contracts";

const orgName = "orgname";
const patronRole = "patronrole";

const provider = new providers.JsonRpcProvider(rpcUrl);
const rootOwner = Wallet.createRandom().connect(provider);
const orgOwner = Wallet.createRandom().connect(provider);
const orgOwnerDid = `did:${Methods.Erc1056}:${orgOwner.address}`;
const patron = Wallet.createRandom().connect(provider);
const patronDID = `did:${Methods.Erc1056}:${patron.address}`;

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

const mockCacheClient = {
    requestClaim: jest.fn(),
    getRoleDefinition: mockGetRoleDefinition,
    getDidDocument: mockGetDidDocument,
    getApplicationsByOrganization: mockGetApplicationsByOrgNamespace,
    init: jest.fn(),
    login: jest.fn(),
    issueClaim: jest.fn(),
};

jest.mock("../src/modules/cacheClient/cacheClient.service", () => {
    return {
        CacheClient: jest.fn().mockImplementation(() => {
            return mockCacheClient;
        }),
    };
});

const timeTravel = async (provider: providers.JsonRpcProvider, seconds: number) => {
    await provider.send("evm_increaseTime", [seconds]);
    await provider.send("evm_mine", []);
};

const oneEWT = utils.parseUnits("1", "ether");
const zeroEwt = utils.parseUnits("0", "ether");

const putStake = async (pool: StakingPoolService, amount: number | BigNumber, withAmountCheck = true) => {
    await pool.putStake(amount);

    const currentStake = await pool.getStake();

    if (withAmountCheck) {
        expect(currentStake.amount).toStrictEqual(amount);
    }

    expect(currentStake.status).toBe(StakeStatus.STAKING);

    const reward = await pool.checkReward();
    expect(reward).toStrictEqual(zeroEwt);
};

describe("StakingPool tests", () => {
    const hardCap = oneEWT.mul(20);
    const contributionLimit = oneEWT.mul(10);

    let domainsService: DomainsService;
    let signerService: SignerService;
    let poolStart: number;
    let poolEnd: number;

    const setupStakingPool = async () => {
        const duration = 3600 * 24 * 7;

        const ratio = 0.0002225;
        const ratioInt = utils.parseUnits(ratio.toString(), 18);

        const rewards = oneEWT.mul(11);

        const { timestamp } = await provider.getBlock("latest");

        const start = timestamp + 10;
        const end = start + duration;

        poolStart = start;
        poolEnd = end;

        const { chainId } = await deployer.provider.getNetwork();
        const { claimManagerAddress } = chainConfigs()[chainId];

        await signerService.connect(patron, ProviderType.PrivateKey);

        const stakingPoolFactory = await (
            await new StakingPool__factory(signerService.signer).deploy(
                utils.namehash("patronrole.ewc"),
                claimManagerAddress,
            )
        ).deployed();

        await stakingPoolFactory
            .connect(signerService.signer)
            .init(start, end, ratioInt, hardCap, contributionLimit, [utils.namehash("patronrole.ewc")], {
                value: rewards,
            });

        setChainConfig(chainId, { stakingPoolFactoryAddress: stakingPoolFactory.address });
    };

    beforeAll(async () => {
        await replenish(orgOwner.address, "20.0");
        await replenish(patron.address, "20.0");
        await replenish(rootOwner.address, "20.0");
        await setupENS(rootOwner.address);

        let connectToCacheServer;
        ({ connectToCacheServer, signerService } = await initWithPrivateKeySigner(rootOwner.privateKey, rpcUrl));
        let connectToDidRegistry;
        ({ domainsService, connectToDidRegistry } = await connectToCacheServer());

        const { claimsService } = await connectToDidRegistry();

        const data: IRoleDefinition = {
            fields: [],
            issuerFields: [],
            issuer: {
                issuerType: "DID",
                did: [orgOwnerDid],
            },
            metadata: [],
            roleName: patronRole,
            roleType: "test",
            version: 1,
            enrolmentPreconditions: [],
        };

        await domainsService.createRole({
            roleName: patronRole,
            namespace: root,
            data,
        });

        await domainsService.createOrganization({
            orgName,
            namespace: root,
            data: { orgName },
            returnSteps: false,
        });

        mockGetApplicationsByOrgNamespace.mockReturnValueOnce([]);
        await domainsService.changeOrgOwnership({
            namespace: `${orgName}.${root}`,
            newOwner: orgOwnerDid,
        });

        const registrationTypes = [RegistrationTypes.OnChain];
        await signerService.connect(patron, ProviderType.PrivateKey);
        mockGetRoleDefinition.mockReturnValueOnce(data);
        await claimsService.createClaimRequest({
            claim: { claimType: `${patronRole}.${root}`, claimTypeVersion: 1, fields: [] },
            registrationTypes,
        });

        const [, encodedMsg] = mockCacheClient.requestClaim.mock.calls.pop();
        const { id, subjectAgreement, token } = encodedMsg;

        await signerService.connect(orgOwner, ProviderType.PrivateKey);
        mockGetRoleDefinition.mockReturnValueOnce(data);
        await claimsService.issueClaimRequest({
            id,
            registrationTypes,
            requester: patronDID,
            subjectAgreement,
            token,
        });
    });

    let stakingPoolFactoryService: StakingFactoryService;

    beforeEach(async () => {
        jest.clearAllMocks();
        await setupStakingPool();

        await signerService.connect(patron, ProviderType.PrivateKey);
        await replenish(orgOwner.address, "50.0");
        await replenish(patron.address, "50.0");
        await timeTravel(provider, 60);

        stakingPoolFactoryService = new StakingFactoryService(signerService, domainsService);
    });

    it("can stake", async () => {
        expect(true).toBe(true);
        const pool = await stakingPoolFactoryService.getPool();

        await putStake(pool, oneEWT);
    });

    it("should return all staked", async () => {
        const pool = await stakingPoolFactoryService.getPool();

        await putStake(pool, oneEWT);
        await putStake(pool, oneEWT, false);

        const currentStake = await pool.getStake();
        expect(currentStake.amount).toStrictEqual(oneEWT.mul(2));

        await pool.withdraw();
        const stakeAfterWithdraw = await pool.getStake();

        expect(stakeAfterWithdraw.amount).toStrictEqual(zeroEwt);

        const { status } = await pool.getStake();
        expect(status).toBe(StakeStatus.NONSTAKING);
    });

    it("should withdraw without reward", async () => {
        const pool = await stakingPoolFactoryService.getPool();

        await putStake(pool, oneEWT);

        await pool.withdraw();

        const currentStake = await pool.getStake();
        expect(currentStake.amount).toStrictEqual(zeroEwt);
    });

    it("should return NONSTAKING status as staking pool is empty", async () => {
        const pool = await stakingPoolFactoryService.getPool();
        const stake = await pool.getStake();

        expect(stake.status).toBe(StakeStatus.NONSTAKING);
    });

    it("should return hardcap", async () => {
        const pool = await stakingPoolFactoryService.getPool();

        const poolHardCap = await pool.getHardCap();

        expect(poolHardCap.eq(hardCap)).toEqual(true);
    });

    it("should return contribution limit", async () => {
        const pool = await stakingPoolFactoryService.getPool();

        const poolContributionLimit = await pool.getContributionLimit();

        expect(poolContributionLimit.eq(contributionLimit)).toEqual(true);
    });

    it("should be able to unstake", async () => {
        const pool = await stakingPoolFactoryService.getPool();

        await putStake(pool, oneEWT.mul(2));

        await pool.partialWithdraw(oneEWT);
        await provider.send("evm_mine", []);

        const currentStake = await pool.getStake();
        expect(currentStake.amount).toStrictEqual(oneEWT);
        expect(currentStake.status).toBe(StakeStatus.STAKING);
    });

    it("should return start of the pool", async () => {
        const pool = await stakingPoolFactoryService.getPool();

        const start = await pool.getStart();

        expect(start.toNumber()).toBe(poolStart);
    });

    it("should return end of the pool", async () => {
        const pool = await stakingPoolFactoryService.getPool();

        const end = await pool.getEnd();

        expect(end.toNumber()).toBe(poolEnd);
    });
});
