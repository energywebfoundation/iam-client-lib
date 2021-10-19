import { PreconditionType, IRoleDefinition } from "@energyweb/iam-contracts";
import { Methods } from "@ew-did-registry/did";
import { addressOf } from "@ew-did-registry/did-ethr-resolver";
import { KeyTags } from "@ew-did-registry/did-resolver-interface";
import { Wallet, utils, providers, ethers } from "ethers";
import { JSONCodec } from "nats.ws";
import {
    RegistrationTypes,
    DomainsService,
    ClaimsService,
    AssetsService,
    ProviderType,
    SignerService,
    ERROR_MESSAGES,
    initWithPrivateKeySigner,
    MessagingService,
    chainConfigs,
    StakingService,
} from "../src";
import { root, replenish, setupENS, rpcUrl } from "./utils/setup_contracts";
import { ClaimManager__factory } from "../ethers/factories/ClaimManager__factory";
import { ClaimManager } from "../ethers/ClaimManager";

const { namehash } = utils;

const provider = new providers.JsonRpcProvider(rpcUrl);
const staticIssuer = Wallet.createRandom().connect(provider);
const staticIssuerDID = `did:${Methods.Erc1056}:${staticIssuer.address}`;
const dynamicIssuer = Wallet.createRandom().connect(provider);
const dynamicIssuerDID = `did:${Methods.Erc1056}:${dynamicIssuer.address}`;
const rootOwner = Wallet.createRandom().connect(provider);
const rootOwnerDID = `did:${Methods.Erc1056}:${rootOwner.address}`;
const roleName1 = "myrole1";
const roleName2 = "myrole2";
const roleName3 = "myrole3";
const namespace = root;
const version = 1;
const baseRoleDef = {
    roleType: "org",
    fields: [],
    enrolmentPreconditions: [],
    issuer: { issuerType: "DID", did: [staticIssuerDID] },
    version,
    metadata: {},
};
const roles: Record<string, IRoleDefinition> = {
    [`${roleName1}.${root}`]: { ...baseRoleDef, roleName: roleName1 },
    [`${roleName2}.${root}`]: {
        ...baseRoleDef,
        roleName: roleName2,
        issuer: { issuerType: "ROLE", roleName: `${roleName1}.${root}` },
    },
    [`${roleName3}.${root}`]: {
        ...baseRoleDef,
        roleName: roleName3,
        enrolmentPreconditions: [{ type: PreconditionType.Role, conditions: [`${roleName1}.${root}`] }],
    },
};
const mockGetRoleDefinition = jest.fn().mockImplementation((namespace: string) => {
    return roles[namespace];
});
const mockGetDidDocument = jest.fn().mockImplementation((did: string) => {
    return { publicKey: [{ id: `did:ethr:${did}-${KeyTags.OWNER}` }] }; // all documents are created
});
const mockGetAssetById = jest.fn();
const mockGetClaimsBySubject = jest.fn();
jest.mock("../src/modules/cacheClient/cacheClient.service", () => {
    return {
        CacheClient: jest.fn().mockImplementation(() => {
            return {
                getRoleDefinition: mockGetRoleDefinition,
                getDidDocument: mockGetDidDocument,
                getAssetById: mockGetAssetById,
                getClaimsBySubject: mockGetClaimsBySubject,
                init: jest.fn(),
                login: jest.fn(),
            };
        }),
    };
});

const mockPublish = jest.fn();
MessagingService.create = (signerService: SignerService) => Promise.resolve(new MessagingService(signerService));
jest.mock("../src/modules/messaging/messaging.service", () => {
    return {
        MessagingService: jest.fn().mockImplementation(() => {
            return { publish: mockPublish };
        }),
    };
});

const jsonCodec = JSONCodec();

StakingService.create = jest.fn();

describe("Enrollment claim tests", () => {
    let claimsService: ClaimsService;
    let signerService: SignerService;
    let assetsService: AssetsService;
    let domainsService: DomainsService;
    let claimManager: ClaimManager;

    beforeEach(async () => {
        jest.clearAllMocks();

        await replenish(await staticIssuer.getAddress());
        await replenish(await rootOwner.getAddress());
        await replenish(await dynamicIssuer.getAddress());

        await setupENS(await rootOwner.getAddress());
        let connectToCacheServer;
        ({ signerService, connectToCacheServer } = await initWithPrivateKeySigner(rootOwner.privateKey, rpcUrl));
        const chainId = await signerService.chainId;
        claimManager = new ClaimManager__factory(rootOwner).attach(chainConfigs()[chainId].claimManagerAddress);
        let connectToDidRegistry;
        ({ domainsService, connectToDidRegistry, assetsService } = await connectToCacheServer());
        await domainsService.createRole({
            roleName: roleName1,
            namespace,
            data: roles[`${roleName1}.${root}`],
            returnSteps: false,
        });
        ({ claimsService } = await connectToDidRegistry());
    });

    async function enrolAndIssue(
        requester: Required<ethers.Signer>,
        issuer: Required<ethers.Signer>,
        {
            subjectDID,
            claimType,
            registrationTypes = [RegistrationTypes.OnChain],
        }: { subjectDID: string; claimType: string; registrationTypes?: RegistrationTypes[] },
    ) {
        await signerService.connect(requester, ProviderType.PrivateKey);
        await claimsService.createClaimRequest({
            claim: { claimType, claimTypeVersion: version, fields: [] },
            registrationTypes,
            subject: subjectDID,
        });
        const [, encodedMsg] = mockPublish.mock.calls.pop();
        const message = jsonCodec.decode(encodedMsg) as any;

        await signerService.connect(issuer, ProviderType.PrivateKey);
        await claimsService.issueClaimRequest({ ...message });
    }

    test("enrollment by issuer of type DID", async () => {
        const requester = rootOwner;
        const issuer = staticIssuer;
        await enrolAndIssue(requester, issuer, {
            subjectDID: rootOwnerDID,
            claimType: `${roleName1}.${root}`,
        });

        return expect(
            claimManager.hasRole(addressOf(rootOwnerDID), namehash(`${roleName1}.${root}`), version),
        ).resolves.toBe(true);
    });

    test("asset enrollment by issuer of type DID", async () => {
        mockGetAssetById.mockImplementationOnce(({ id }: { id: string }) => ({ id }));
        await signerService.connect(rootOwner, ProviderType.PrivateKey);
        const assetAddress = await assetsService.registerAsset();
        const assetDID = `did:${Methods.Erc1056}:${assetAddress}`;
        await enrolAndIssue(rootOwner, staticIssuer, { subjectDID: assetDID, claimType: `${roleName1}.${root}` });

        return expect(
            claimManager.hasRole(addressOf(assetDID), namehash(`${roleName1}.${root}`), version),
        ).resolves.toBe(true);
    });

    test("enrollment by issuer of type ROLE", async () => {
        await signerService.connect(rootOwner, ProviderType.PrivateKey);
        await domainsService.createRole({
            roleName: roleName2,
            namespace,
            data: roles[`${roleName2}.${root}`],
            returnSteps: false,
        });

        await enrolAndIssue(dynamicIssuer, staticIssuer, {
            subjectDID: dynamicIssuerDID,
            claimType: `${roleName1}.${root}`,
        });

        expect(await claimManager.hasRole(addressOf(dynamicIssuerDID), namehash(`${roleName1}.${root}`), version));

        await enrolAndIssue(rootOwner, dynamicIssuer, { subjectDID: rootOwnerDID, claimType: `${roleName2}.${root}` });

        return expect(
            claimManager.hasRole(addressOf(rootOwnerDID), namehash(`${roleName2}.${root}`), version),
        ).resolves.toBe(true);
    });

    test("should enrol when prerequisites are met", async () => {
        await signerService.connect(rootOwner, ProviderType.PrivateKey);
        await domainsService.createRole({
            roleName: roleName3,
            namespace,
            data: roles[`${roleName3}.${root}`],
            returnSteps: false,
        });

        const role1Claim = {
            claimType: `${roleName1}.${root}`,
            isAccepted: true,
        };
        await enrolAndIssue(rootOwner, staticIssuer, { subjectDID: rootOwnerDID, claimType: `${roleName1}.${root}` });
        mockGetClaimsBySubject.mockImplementationOnce(() => [role1Claim]); // to verify requesting
        mockGetClaimsBySubject.mockImplementationOnce(() => [role1Claim]); // to verify issuance

        await enrolAndIssue(rootOwner, staticIssuer, { subjectDID: rootOwnerDID, claimType: `${roleName3}.${root}` });
        return expect(
            claimManager.hasRole(addressOf(rootOwnerDID), namehash(`${roleName3}.${root}`), version),
        ).resolves.toBe(true);
    });

    test("should reject to enrol when prerequisites are not met", async () => {
        await signerService.connect(rootOwner, ProviderType.PrivateKey);
        await domainsService.createRole({
            roleName: roleName3,
            namespace,
            data: roles[`${roleName3}.${root}`],
            returnSteps: false,
        });

        mockGetClaimsBySubject.mockImplementationOnce(() => []);
        mockGetClaimsBySubject.mockImplementationOnce(() => []);

        return expect(
            enrolAndIssue(rootOwner, staticIssuer, {
                subjectDID: rootOwnerDID,
                claimType: `${roleName3}.${root}`,
            }),
        ).rejects.toEqual(new Error(ERROR_MESSAGES.ROLE_PREREQUISITES_NOT_MET));
    });
});
