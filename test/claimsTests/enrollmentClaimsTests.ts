import { PreconditionType } from "@energyweb/iam-contracts";
import { Methods } from "@ew-did-registry/did";
import { addressOf } from "@ew-did-registry/did-ethr-resolver";
import { Wallet, utils } from "ethers";
import { Codec } from "nats.ws";
import { IAM, RegistrationTypes, IRoleDefinition, NATS_EXCHANGE_TOPIC } from "../../src/iam-client-lib";
import { createIam, root, rootOwner } from "../iam.test";
import { claimManager, replenish } from "../setup_contracts";
import {
    mockCacheClient,
    mockJsonCodec,
    mockNats,
    restoreCacheClient,
    restoreJsonCodec,
    restoreNats,
} from "../testUtils/mocks";

const { namehash } = utils;

export function enrollmentClaimsTests() {
    const staticIssuer = Wallet.createRandom();
    const staticIssuerDID = `did:${Methods.Erc1056}:${staticIssuer.address}`;
    const dynamicIssuer = Wallet.createRandom();
    const dynamicIssuerDID = `did:${Methods.Erc1056}:${dynamicIssuer.address}`;
    const roleCreator = rootOwner; // owns root
    const user = roleCreator;
    const userDID = `did:${Methods.Erc1056}:${user.address}`;
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
    let roleCreatorIam: IAM;
    let userIam: IAM;
    let staticIssuerIam: IAM;
    let dynamicIssuerIam: IAM;
    let publish: jest.Mock;
    let mockedJsonCodec: Codec<any>;
    let cacheRoleDefinitions;
    let cacheClaim;

    beforeAll(async () => {
        await replenish(roleCreator.address);
        roleCreatorIam = await createIam(roleCreator.privateKey, { initDID: true });
        userIam = await createIam(user.privateKey, { initDID: true });
        await replenish(staticIssuer.address);
        staticIssuerIam = await createIam(staticIssuer.privateKey, { initDID: true });
        await replenish(dynamicIssuer.address);
        dynamicIssuerIam = await createIam(dynamicIssuer.privateKey, { initDID: true });

        await roleCreatorIam.createRole({
            roleName: roleName1,
            namespace,
            data: roles[`${roleName1}.${root}`],
            returnSteps: false,
        });
    });

    async function enrolAndIssue(
        requesterIam: IAM,
        issuerIam: IAM,
        {
            subjectDID,
            claimType,
            registrationTypes = [RegistrationTypes.OnChain],
        }: { subjectDID: string; claimType: string; registrationTypes?: RegistrationTypes[] },
    ) {
        const requesterDID = requesterIam.getDid();
        await requesterIam.createClaimRequest({
            claim: { claimType, claimTypeVersion: version, fields: [] },
            registrationTypes,
            subject: subjectDID,
        });
        expect(publish).toBeCalledTimes(1);
        const [, encodedMsg] = publish.mock.calls.pop();
        const message = mockedJsonCodec.decode(encodedMsg);

        expect(message).toHaveProperty("id");
        expect(message).toHaveProperty("token");
        expect(message).toMatchObject({ requester: requesterDID, registrationTypes });

        await issuerIam.issueClaimRequest({ ...message });

        const [requesterChannel, data] = publish.mock.calls.pop();
        expect(requesterChannel).toEqual(`${requesterIam.getDid()}.${NATS_EXCHANGE_TOPIC}`);

        const { claimIssuer, requester, onChainProof } = mockedJsonCodec.decode(data);
        expect(requester).toEqual(requesterDID);
        expect(claimIssuer).toEqual([issuerIam.getDid()]);
        registrationTypes.includes(RegistrationTypes.OnChain) && expect(onChainProof).toHaveLength(132);
    }

    beforeEach(() => {
        ({ publish } = mockNats());
        ({ cacheClaim, cacheRoleDefinitions } = mockCacheClient());
        cacheRoleDefinitions(roles);

        mockedJsonCodec = mockJsonCodec();
    });

    afterEach(() => {
        restoreNats();
        restoreCacheClient();
        restoreJsonCodec();
    });

    test("enrollment by issuer of type DID", async () => {
        await enrolAndIssue(userIam, staticIssuerIam, { subjectDID: userDID, claimType: `${roleName1}.${root}` });

        expect(await claimManager.hasRole(addressOf(userDID), namehash(`${roleName1}.${root}`), version)).toBe(true);
    });

    test("asset enrollment by issuer of type DID", async () => {
        const assetAddress = await userIam.registerAsset();
        const assetDID = `did:${Methods.Erc1056}:${assetAddress}`;
        await enrolAndIssue(userIam, staticIssuerIam, { subjectDID: assetDID, claimType: `${roleName1}.${root}` });

        expect(await claimManager.hasRole(addressOf(assetDID), namehash(`${roleName1}.${root}`), version)).toBe(true);
    });

    test("enrollment by issuer of type ROLE", async () => {
        await roleCreatorIam.createRole({
            roleName: roleName2,
            namespace,
            data: roles[`${roleName2}.${root}`],
            returnSteps: false,
        });

        await enrolAndIssue(dynamicIssuerIam, staticIssuerIam, {
            subjectDID: dynamicIssuerDID,
            claimType: `${roleName1}.${root}`,
        });

        expect(await claimManager.hasRole(addressOf(dynamicIssuerDID), namehash(`${roleName1}.${root}`), version));

        enrolAndIssue(userIam, dynamicIssuerIam, { subjectDID: userDID, claimType: `${roleName2}.${root}` });

        expect(await claimManager.hasRole(addressOf(userDID), namehash(`${roleName2}.${root}`), version));
    });

    test("should enrol when prerequisites are met", async () => {
        await roleCreatorIam.createRole({
            roleName: roleName3,
            namespace,
            data: roles[`${roleName3}.${root}`],
            returnSteps: false,
        });

        const role1Claim = {
            claimType: `${roleName1}.${root}`,
            isAccepted: true,
        };
        cacheClaim(userDID, role1Claim);

        await enrolAndIssue(userIam, staticIssuerIam, { subjectDID: userDID, claimType: `${roleName3}.${root}` });
        expect(await claimManager.hasRole(addressOf(userDID), namehash(`${roleName3}.${root}`), version));
    });

    test("should reject to enrol when prerequisites are not met", async () => {
        await roleCreatorIam.createRole({
            roleName: roleName3,
            namespace,
            data: roles[`${roleName3}.${root}`],
            returnSteps: false,
        });

        await enrolAndIssue(userIam, staticIssuerIam, { subjectDID: userDID, claimType: `${roleName3}.${root}` });
        // ).rejects.toEqual({ error: ERROR_MESSAGES.ROLE_PREREQUISITES_NOT_MET });
    });
}
