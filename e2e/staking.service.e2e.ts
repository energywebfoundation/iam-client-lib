import { providers, Wallet } from "ethers";
import { IRoleDefinition } from "@energyweb/iam-contracts";
import { Methods } from "@ew-did-registry/did";
import { KeyTags } from "@ew-did-registry/did-resolver-interface";
import { StakingService } from "../src/modules/staking/staking.service";
import { ProviderType } from "../src/modules/signer/signer.types";
import { SignerService } from "../src/modules/signer/signer.service";
import { DomainsService } from "../src/modules/domains/domains.service";
import { RegistrationTypes } from "../src/modules/claims/claims.types";
import { replenish, root, rpcUrl, setupENS } from "./utils/setup_contracts";
import { defaultPrincipalThreshold, setupStakingPoolFactory } from "./utils/staking";
import { initWithPrivateKeySigner } from "../src/init";
import { MessagingService } from "../src/modules/messaging/messaging.service";

const defaultMinStakingPeriod = 1;
const patronRewardPortion = 800;
const patronRole = "patronRole";
const orgName = "orgname";
const domain = `${orgName}.${root}`;

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
const mockRequestClaim = jest.fn();

jest.mock("../src/modules/cacheClient/cacheClient.service", () => {
    return {
        CacheClient: jest.fn().mockImplementation(() => {
            return {
                getRoleDefinition: mockGetRoleDefinition,
                getDidDocument: mockGetDidDocument,
                getApplicationsByOrganization: mockGetApplicationsByOrgNamespace,
                init: jest.fn(),
                login: jest.fn(),
                requestClaim: mockRequestClaim,
                issueClaim: jest.fn(),
            };
        }),
    };
});

xdescribe("Staking service tests", () => {
    let signerService: SignerService;
    let stakingService: StakingService;
    let domainsService: DomainsService;

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

        const [, message] = mockRequestClaim.mock.calls.pop();
        const { id, subjectAgreement, token } = message;

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
    });

    test("organization owner should be able to launch pool", async () => {
        await replenish(orgOwner.address, defaultPrincipalThreshold);
        await signerService.connect(orgOwner, ProviderType.PrivateKey);
        await stakingService.launchPool({
            org: domain,
            minStakingPeriod: defaultMinStakingPeriod,
            patronRewardPortion,
            patronRoles: [`${patronRole}.${root}`],
            principal: defaultPrincipalThreshold,
        });
        const services = await stakingService.allServices();
        expect(services).toContainEqual(expect.objectContaining({ org: domain }));
    });

    it("non-owner of organization should not be able to launch pool", async () => {
        const nonOwnerWallet = Wallet.createRandom();
        await replenish(nonOwnerWallet.address);
        const nonOwner = Wallet.createRandom().connect(provider);

        await replenish(nonOwnerWallet.address, defaultPrincipalThreshold);
        await signerService.connect(nonOwner, ProviderType.PrivateKey);
        return expect(
            stakingService.launchPool({
                org: domain,
                minStakingPeriod: defaultMinStakingPeriod,
                patronRewardPortion,
                patronRoles: [`${patronRole}.${root}`],
                principal: defaultPrincipalThreshold,
            }),
        ).rejects.toThrow("StakingPoolFactory: Not authorized to create pool for this organization");
    });

    it("should be able to get all services", async () => {
        const orgName2 = "orgname2";
        await signerService.connect(rootOwner, ProviderType.PrivateKey);
        await domainsService.createOrganization({
            orgName: orgName2,
            namespace: root,
            data: { orgName },
            returnSteps: false,
        });
        await domainsService.changeOrgOwnership({
            namespace: `${orgName2}.${root}`,
            newOwner: orgOwnerDid,
        });

        await signerService.connect(orgOwner, ProviderType.PrivateKey);
        await stakingService.launchPool({
            org: domain,
            minStakingPeriod: defaultMinStakingPeriod,
            patronRewardPortion,
            patronRoles: [`${patronRole}.${root}`],
            principal: defaultPrincipalThreshold,
        });
        await stakingService.launchPool({
            org: `${orgName2}.${root}`,
            minStakingPeriod: defaultMinStakingPeriod,
            patronRewardPortion,
            patronRoles: [`${patronRole}.${root}`],
            principal: defaultPrincipalThreshold,
        });

        expect((await stakingService.allServices()).map((s) => ({ org: s.org, provider: s.provider }))).toStrictEqual([
            { org: `${orgName}.${root}`, provider: orgOwner.address },
            { org: `${orgName2}.${root}`, provider: orgOwner.address },
        ]);
    });

    it("pool should not be launched when principal less then threshold", async () => {
        await replenish(orgOwner.address, defaultPrincipalThreshold);

        await signerService.connect(orgOwner, ProviderType.PrivateKey);
        return expect(
            stakingService.launchPool({
                org: domain,
                minStakingPeriod: defaultMinStakingPeriod,
                patronRewardPortion,
                patronRoles: [`${patronRole}.${root}`],
                principal: defaultPrincipalThreshold.div(2),
            }),
        ).rejects.toThrow("StakingPoolFactory: principal less than threshold");
    });

    it("should not be possible to launch two pools for one organization", async () => {
        await replenish(orgOwner.address, defaultPrincipalThreshold.mul(2));

        await signerService.connect(orgOwner, ProviderType.PrivateKey);
        await stakingService.launchPool({
            org: domain,
            minStakingPeriod: defaultMinStakingPeriod,
            patronRewardPortion,
            patronRoles: [`${patronRole}.${root}`],
            principal: defaultPrincipalThreshold,
        });

        return expect(
            stakingService.launchPool({
                org: domain,
                minStakingPeriod: defaultMinStakingPeriod,
                patronRewardPortion,
                patronRoles: [`${patronRole}.${root}`],
                principal: defaultPrincipalThreshold,
            }),
        ).rejects.toThrow("StakingPoolFactory: pool for organization already launched");
    });
});
