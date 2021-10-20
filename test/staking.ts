import { IRoleDefinition, VOLTA_CHAIN_ID, VOLTA_REWARD_POOL_ADDRESS } from "@energyweb/iam-contracts";
import { StakingPoolFactory__factory } from "../ethers/factories/StakingPoolFactory__factory";
import { RewardPool__factory } from "../ethers/factories/RewardPool__factory";
import { StakingPool__factory } from "../ethers/factories/StakingPool__factory";
import { StakingPoolFactory } from "../ethers/StakingPoolFactory";
import { Wallet, utils, providers, BigNumber } from "ethers";
import { Methods } from "@ew-did-registry/did";
import {
    ERROR_MESSAGES,
    IAM,
    RegistrationTypes,
    setChainConfig,
    StakeStatus,
    StakingPool,
    StakingPoolService,
    WITHDRAW_DELAY,
} from "../src/iam-client-lib";
import { claimManager, ensRegistry, replenish, provider, deployer } from "./setup_contracts";
import { createIam, root, rootOwner } from "./iam.test";
import { mockJsonCodec, mockNats, restoreJsonCodec, restoreNats } from "./testUtils/mocks";
import { chainConfigs } from "../src/iam/chainConfig";

const { parseEther, namehash } = utils;
const { JsonRpcProvider } = providers;

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
    const defaultWithdrawDelay = 1;
    let stakingPoolFactory: StakingPoolFactory;
    const patronRewardPortion = 800;
    const patronRole = "patronRole";
    const defaultMinStakingPeriod = 1;

    const calculateReward = (
        stakeAmount: BigNumber,
        depositPeriod: BigNumber,
        patronRewardPortion: BigNumber,
    ): BigNumber => {
        const dailyInterestNumerator = BigNumber.from(1000312);
        const dailyInterestDenominator = BigNumber.from(1000000);
        const secInDay = BigNumber.from(60 * 60 * 24);
        const depositPeriodInterest = dailyInterestNumerator
            .div(dailyInterestDenominator)
            .pow(depositPeriod.div(secInDay));
        const accumulatedStake = stakeAmount.mul(depositPeriodInterest);
        const totalReward = accumulatedStake.sub(stakeAmount);
        return totalReward.mul(patronRewardPortion).div(BigNumber.from(1000));
    };

    xdescribe("Test scenario on VOLTA", () => {
        it("Full staking workflow", async () => {
            const provider = new JsonRpcProvider("https://volta-rpc-vkn5r5zx4ke71f9hcu0c.energyweb.org/");
            const orgOwner = new Wallet("1aec3458500362c0a0f1772ab724a71b0f9d7da418a2d86d5954ab3f4b58ec4e").connect(
                provider,
            );
            const org = "energyweb.iam.ewc";
            const MIN_STAKING_PERIOD = 1;
            const stakingService = await StakingPoolService.init(orgOwner);
            // let pool = await stakingService.getPool(org);
            // if (!pool) {
            //   const patronRewardPortion = 1000;
            //   await stakingService.launchStakingPool({
            //     org,
            //     minStakingPeriod: MIN_STAKING_PERIOD,
            //     patronRewardPortion,
            //     patronRoles: [],
            //     principal: parseEther("100")
            //   });
            // await (await orgOwner.sendTransaction({ to: VOLTA_REWARD_POOL_ADDRESS, value: parseEther("20") })).wait();
            // }
            const factory = new StakingPoolFactory__factory(orgOwner).attach(
                chainConfigs[VOLTA_CHAIN_ID].stakingPoolFactoryAddress,
            );
            /**
             * Predeployed test pool
             */
            const poolContract = new StakingPool__factory(orgOwner).attach(
                (await factory.services(namehash(org))).pool,
            );
            expect(poolContract).not.toBeNull;
            expect((await poolContract.minStakingPeriod()).eq(MIN_STAKING_PERIOD)).toBe(true);
            expect((await poolContract.withdrawDelay()).eq(WITHDRAW_DELAY));

            const pool = await stakingService.getPool(org);
            expect(pool).not.toBeNull();
            if (pool) {
                const amount = parseEther("1");
                let stake = await pool.getStake();
                if (stake.status === StakeStatus.NONSTAKING) {
                    await pool.putStake(amount);
                    const requestWithdrawDelay = await pool.requestWithdrawDelay();
                    expect(requestWithdrawDelay === MIN_STAKING_PERIOD);
                    stake = await pool.getStake();
                }

                if (stake.status === StakeStatus.STAKING) {
                    let minStakingPeriodIsExpired = false;
                    while (!minStakingPeriodIsExpired) {
                        minStakingPeriodIsExpired = (await pool.requestWithdrawDelay()) === 0;
                    }
                    await pool.requestWithdraw();
                    expect((await pool.withdrawalDelay()) === WITHDRAW_DELAY);
                    stake = await pool.getStake();
                }

                if (stake.status === StakeStatus.WITHDRAWING) {
                    let withdrawDelayIsExpired = false;
                    while (!withdrawDelayIsExpired) {
                        withdrawDelayIsExpired = (await pool.withdrawalDelay()) === 0;
                    }

                    const reward = await pool.checkReward();
                    if ((await provider.getBalance(VOLTA_REWARD_POOL_ADDRESS)).lte(reward)) {
                        await (
                            await orgOwner.sendTransaction({ value: reward.mul(2), to: VOLTA_REWARD_POOL_ADDRESS })
                        ).wait();
                    }

                    await pool.withdraw();
                    stake = await pool.getStake();
                    expect(stake.amount.eq(0)).toBe(true);
                    expect(stake.status).toBe(StakeStatus.NONSTAKING);
                }
            }
        });
    });

    describe("tests on ganache", () => {
        async function setupStakingPoolFactory(withdrawDelay = defaultWithdrawDelay) {
            stakingPoolFactory = await (
                await new StakingPoolFactory__factory(deployer).deploy(
                    principalThreshold,
                    withdrawDelay,
                    claimManager.address,
                    ensRegistry.address,
                )
            ).deployed();
            const { chainId } = await provider.getNetwork();
            setChainConfig(chainId, { stakingPoolFactoryAddress: stakingPoolFactory.address });
        }

        beforeAll(async () => {
            await replenish(serviceProvider.address);
            serviceProviderIam = await createIam(serviceProvider.privateKey, { createDocument: true });

            await replenish(patron.address);
            patronIam = await createIam(patron.privateKey, { createDocument: true });
            await replenish(rootOwner.address);
            rootOwnerIam = await createIam(rootOwner.privateKey, { createDocument: true });

            const data: IRoleDefinition = {
                fields: [],
                issuer: {
                    issuerType: "DID",
                    did: [`did:${Methods.Erc1056}:${serviceProvider.address}`],
                },
                metadata: [],
                roleName: patronRole,
                roleType: "test",
                version: 1,
                enrolmentPreconditions: [],
            };

            await rootOwnerIam.createRole({
                roleName: patronRole,
                namespace: root,
                data,
            });
            await rootOwnerIam.createOrganization({
                orgName,
                namespace: root,
                data: { orgName },
                returnSteps: false,
            });
            await rootOwnerIam.changeOrgOwnership({
                namespace: `${orgName}.${root}`,
                newOwner: serviceProvider.address,
            });

            const { publish } = mockNats();
            const jsonCodec = mockJsonCodec();

            const registrationTypes = [RegistrationTypes.OnChain];
            await patronIam.createClaimRequest({
                claim: { claimType: `${patronRole}.${root}`, claimTypeVersion: 1, fields: [] },
                registrationTypes,
            });
            const [, encodedMsg] = publish.mock.calls.pop();
            const { id, subjectAgreement, token } = jsonCodec.decode(encodedMsg) as { id; subjectAgreement; token };

            await serviceProviderIam.issueClaimRequest({
                id,
                registrationTypes,
                requester: patronDID,
                subjectAgreement,
                token,
            });
        });

        afterAll(() => {
            restoreNats();
            restoreJsonCodec();
        });

        beforeEach(async () => {
            await setupStakingPoolFactory();
            providerStakingService = await StakingPoolService.init(serviceProvider);
        });

        describe("StakingPoolFactory tests", () => {
            it("organization owner should be able to launch pool", async () => {
                await replenish(serviceProvider.address, principalThreshold);
                await providerStakingService.launchStakingPool({
                    org: domain,
                    minStakingPeriod: defaultMinStakingPeriod,
                    patronRewardPortion,
                    patronRoles: [`${patronRole}.${root}`],
                    principal: principalThreshold,
                });

                expect(await stakingPoolFactory.orgsList()).toStrictEqual([namehash(domain)]);
                expect(await stakingPoolFactory.services(namehash(domain))).toMatchObject({
                    provider: serviceProvider.address,
                });
            });

            it("should be able to get all services", async () => {
                const orgName2 = "orgname2";
                await rootOwnerIam.createOrganization({
                    orgName: orgName2,
                    namespace: root,
                    data: { orgName },
                    returnSteps: false,
                });
                await rootOwnerIam.changeOrgOwnership({
                    namespace: `${orgName2}.${root}`,
                    newOwner: serviceProvider.address,
                });

                await providerStakingService.launchStakingPool({
                    org: domain,
                    minStakingPeriod: defaultMinStakingPeriod,
                    patronRewardPortion,
                    patronRoles: [`${patronRole}.${root}`],
                    principal: principalThreshold,
                });
                await providerStakingService.launchStakingPool({
                    org: `${orgName2}.${root}`,
                    minStakingPeriod: defaultMinStakingPeriod,
                    patronRewardPortion,
                    patronRoles: [`${patronRole}.${root}`],
                    principal: principalThreshold,
                });

                expect(
                    (await providerStakingService.allServices()).map((s) => ({ org: s.org, provider: s.provider })),
                ).toStrictEqual([
                    { org: `${orgName}.${root}`, provider: serviceProvider.address },
                    { org: `${orgName2}.${root}`, provider: serviceProvider.address },
                ]);
            });

            it("non-owner of organization should not be able to launch pool", async () => {
                const nonOwner = Wallet.createRandom().connect(provider);
                await replenish(nonOwner.address);
                const nonOwnerServicePool = await StakingPoolService.init(nonOwner);

                await replenish(nonOwner.address, principalThreshold);
                return expect(
                    nonOwnerServicePool.launchStakingPool({
                        org: domain,
                        minStakingPeriod: defaultMinStakingPeriod,
                        patronRewardPortion,
                        patronRoles: [`${patronRole}.${root}`],
                        principal: principalThreshold,
                    }),
                ).rejects.toThrow("StakingPoolFactory: Not authorized to create pool for this organization");
            });

            it("pool should not be launched with principal less then threshold", async () => {
                await replenish(serviceProvider.address, principalThreshold);

                return expect(
                    providerStakingService.launchStakingPool({
                        org: domain,
                        minStakingPeriod: defaultMinStakingPeriod,
                        patronRewardPortion,
                        patronRoles: [`${patronRole}.${root}`],
                        principal: principalThreshold.div(2),
                    }),
                ).rejects.toThrow("StakingPoolFactory: principal less than threshold");
            });

            it("should not be possible to launch two pools for one organization", async () => {
                await replenish(serviceProvider.address, principalThreshold.mul(2));

                await providerStakingService.launchStakingPool({
                    org: domain,
                    minStakingPeriod: defaultMinStakingPeriod,
                    patronRewardPortion,
                    patronRoles: [`${patronRole}.${root}`],
                    principal: principalThreshold,
                });

                return expect(
                    providerStakingService.launchStakingPool({
                        org: domain,
                        minStakingPeriod: defaultMinStakingPeriod,
                        patronRewardPortion,
                        patronRoles: [`${patronRole}.${root}`],
                        principal: principalThreshold,
                    }),
                ).rejects.toThrow("StakingPoolFactory: pool for organization already launched");
            });
        });

        describe("StakingPool tests", () => {
            async function launchPool(minStakingPeriod = defaultMinStakingPeriod) {
                await replenish(serviceProvider.address, principalThreshold);
                await replenish(patron.address, parseEther("1"));
                await providerStakingService.launchStakingPool({
                    org: domain,
                    minStakingPeriod,
                    patronRewardPortion,
                    patronRoles: [`${patronRole}.${root}`],
                    principal: principalThreshold,
                });
                const patronStakingService = await StakingPoolService.init(patron);
                const launchedPool = await patronStakingService.getPool(domain);
                pool = launchedPool as StakingPool;
            }
            let pool: StakingPool;

            beforeEach(async () => {
                await launchPool();
            });

            it("patron should be able to stake", async () => {
                const stake = parseEther("0.1");

                await pool.putStake(stake);
                expect((await pool.getStake()).status).toEqual(StakeStatus.STAKING);
            });

            it("should not be able to stake without having patron role", async () => {
                const nonPatron = Wallet.createRandom().connect(provider);
                await replenish(nonPatron.address);
                return expect(pool.connect(nonPatron).putStake(parseEther("0.1"))).rejects.toThrow(
                    "StakingPool: patron is not registered with patron role",
                );
            });

            it("should reject when stake amount isn't provided", async () => {
                return expect(pool.putStake(parseEther("0"))).rejects.toThrow(
                    "StakingPool: stake amount is not provided",
                );
            });

            it("should not be able to stake with insufficient balance", async () => {
                const patron = Wallet.createRandom().connect(provider);
                expect(await patron.getBalance()).toEqual(BigNumber.from(0));

                return expect(pool.connect(patron).putStake(1)).rejects.toThrow(ERROR_MESSAGES.INSUFFICIENT_BALANCE);
            });

            it("should be able to stake whole balance", async () => {
                const stake = await patron.getBalance();

                await pool.putStake(stake);
                expect((await pool.getStake()).status).toEqual(StakeStatus.STAKING);
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
                const status = (await pool.getStake()).status;
                expect(status).toBe(StakeStatus.WITHDRAWING);
            });

            it("can't request withdraw when no stake", async () => {
                return expect(pool.requestWithdraw()).rejects.toThrow("StakingPool: No stake to withdraw");
            });

            it("can't request withdraw until minimum staking period is last", async () => {
                await setupStakingPoolFactory();
                providerStakingService = await StakingPoolService.init(serviceProvider);
                await launchPool(10);
                await pool.putStake(parseEther("0.1"));
                return expect(pool.requestWithdraw()).rejects.toThrow(
                    "StakingPool: Minimum staking period is not expired yet",
                );
            });

            it("withdraw can't be rquested twice", async () => {
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
                const rewardPool = new RewardPool__factory(patron).attach(await stakingPoolFactory.rewardPool());
                await replenish(rewardPool.address, expectedReward);

                await pool.withdraw();
                const balanceAfterWithdraw = await patron.getBalance();

                expect(balanceAfterWithdraw.eq(balanceBeforeWithdraw.add(stake).add(expectedReward)));
            });
        });
    });
};
