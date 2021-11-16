import { IRoleDefinition } from "@energyweb/iam-contracts";
import { Methods } from "@ew-did-registry/did";
import { KeyTags } from "@ew-did-registry/did-resolver-interface";
import { Wallet, BigNumber, utils, providers } from "ethers";
import { JSONCodec } from "nats.ws";
import {
    MessagingService,
    SignerService,
    DomainsService,
    StakingService,
    initWithPrivateKeySigner,
    RegistrationTypes,
    ProviderType,
    StakingPool,
    StakeStatus,
} from "../src";
import { calculateReward, defaultPrincipalThreshold, setupStakingPoolFactory } from "./utils/staking";
import { replenish, root, rpcUrl, setupENS } from "./utils/setup_contracts";

const { parseEther } = utils;

const defaultMinStakingPeriod = 1;
const patronRewardPortion = 1000;
const orgName = "orgname";
const orgDomain = `${orgName}.${root}`;
const patronRole = "patronrole";

const provider = new providers.JsonRpcProvider(rpcUrl);
const rootOwner = Wallet.createRandom().connect(provider);
const orgOwner = Wallet.createRandom().connect(provider);
const orgOwnerDid = `did:${Methods.Erc1056}:${orgOwner.address}`;
const patron = Wallet.createRandom().connect(provider);
const patronDID = `did:${Methods.Erc1056}:${patron.address}`;

const jsonCodec = JSONCodec();
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

describe("StakingPool tests", () => {
    let stakingService: StakingService;
    let domainsService: DomainsService;
    let signerService: SignerService;
    let pool: StakingPool;

    beforeAll(async () => {
        await replenish(orgOwner.address);
        await replenish(patron.address);
        await replenish(rootOwner.address);
        await setupENS(rootOwner.address);
        await setupStakingPoolFactory();
        let connectToCacheServer;
        ({ connectToCacheServer, signerService } = await initWithPrivateKeySigner(rootOwner.privateKey, rpcUrl));
        let connectToDidRegistry;
        ({ domainsService, stakingService, connectToDidRegistry } = await connectToCacheServer());
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

        const [, encodedMsg] = mockPublish.mock.calls.pop();
        const { id, subjectAgreement, token } = jsonCodec.decode(encodedMsg) as any;

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

    beforeEach(async () => {
        jest.clearAllMocks();
        await setupStakingPoolFactory();
        await stakingService.init();
        await launchPool();
        await signerService.connect(patron, ProviderType.PrivateKey);
        await replenish(patron.address);
    });

    async function launchPool(
        minStakingPeriod = defaultMinStakingPeriod,
        principalThreshold = defaultPrincipalThreshold,
    ) {
        await replenish(orgOwner.address, principalThreshold);
        await signerService.connect(orgOwner, ProviderType.PrivateKey);
        await stakingService.launchPool({
            org: orgDomain,
            minStakingPeriod,
            patronRewardPortion,
            patronRoles: [`${patronRole}.${root}`],
            principal: principalThreshold,
        });
        pool = (await stakingService.getPool(orgDomain)) as StakingPool;
    }

    it("patron should be able to stake", async () => {
        const amount = parseEther("0.1");
        await pool.putStake(amount);
        return expect(pool.getStake()).resolves.toMatchObject({ status: StakeStatus.STAKING });
    });

    it("should not be able to stake without having patron role", async () => {
        const nonPatron = Wallet.createRandom().connect(provider);
        await replenish(await nonPatron.getAddress());
        await signerService.connect(nonPatron, ProviderType.PrivateKey);
        return expect(pool.putStake(parseEther("0.1"))).rejects.toThrow(
            "StakingPool: patron is not registered with patron role",
        );
    });

    it("should reject when stake amount isn't provided", async () => {
        return expect(pool.putStake(parseEther("0"))).rejects.toThrow("StakingPool: stake amount is not provided");
    });

    it("should be able to stake whole balance", async () => {
        const stake = await signerService.balance();
        await pool.putStake(stake);
        return expect(pool.getStake()).resolves.toMatchObject({ status: StakeStatus.STAKING });
    });

    it("stake should not be replenished", async () => {
        await pool.putStake(parseEther("0.1"));
        return expect(pool.putStake(parseEther("0.1"))).rejects.toThrow(
            "StakingPool: Replenishment of the stake is not allowed",
        );
    });

    it("staker should be able to request withdraw", async () => {
        await pool.putStake(parseEther("0.1"));
        const requestDelay = await pool.requestWithdrawDelay();
        await new Promise((resolve) => setTimeout(resolve, 1000 * requestDelay));
        await pool.requestWithdraw();
        return expect(pool.getStake()).resolves.toMatchObject({ status: StakeStatus.WITHDRAWING });
    });

    it("can't request withdraw when no stake", async () => {
        return expect(pool.requestWithdraw()).rejects.toThrow("StakingPool: No stake to withdraw");
    });

    it("can't request withdraw until minimum staking period is last", async () => {
        await setupStakingPoolFactory();
        await launchPool(10);
        await signerService.connect(patron, ProviderType.PrivateKey);
        await pool.putStake(parseEther("0.1"));
        return expect(pool.requestWithdraw()).rejects.toThrow("StakingPool: Minimum staking period is not expired yet");
    });

    it("withdraw can't be requested twice", async () => {
        await pool.putStake(parseEther("0.1"));
        const requestDelay = await pool.requestWithdrawDelay();
        await new Promise((resolve) => setTimeout(resolve, 1000 * requestDelay));
        await pool.requestWithdraw();
        return expect(pool.requestWithdraw()).rejects.toThrow("StakingPool: No stake to withdraw");
    });

    it("stake can be withdrawn", async () => {
        const stake = parseEther("0.1");
        await pool.putStake(stake);
        const depositStart = (await pool.getStake()).depositStart;
        const requestDelay = await pool.requestWithdrawDelay();
        await new Promise((resolve) => setTimeout(resolve, 1000 * requestDelay));
        await pool.requestWithdraw();
        const depositEnd = (await pool.getStake()).depositEnd;
        const expectedReward = calculateReward(
            stake,
            depositEnd.sub(depositStart),
            BigNumber.from(patronRewardPortion),
        );

        expect(await pool.checkReward()).toEqual(expectedReward);
        const withdrawalDelay = await pool.withdrawalDelay();
        await new Promise((resolve) => setTimeout(resolve, 1000 * withdrawalDelay));
        const balanceBeforeWithdraw = await patron.getBalance();
        await pool.withdraw();
        const balanceAfterWithdraw = await patron.getBalance();
        expect(balanceAfterWithdraw.eq(balanceBeforeWithdraw.add(stake).add(expectedReward)));
    });
});
