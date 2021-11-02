import { Wallet } from "ethers";
import { Methods } from "@ew-did-registry/did";
import jwtDecode from "jwt-decode";

import { IAM, IRoleDefinition, RegistrationTypes } from "../../src/iam-client-lib";
import { replenish, provider } from "../setup_contracts";
import { createIam, root, rootOwner } from "../iam.test";
import { mockJsonCodec, mockNats, restoreJsonCodec, restoreNats } from "../testUtils/mocks";

export const issueClaimRequestTests = (): void => {
    const serviceProvider = Wallet.createRandom().connect(provider);
    const patron = Wallet.createRandom().connect(provider);
    const patronDID = `did:${Methods.Erc1056}:${patron.address}`;

    const orgName = "orgname";
    let serviceProviderIam: IAM;
    let patronIam: IAM;
    let rootOwnerIam: IAM;
    const patronRole = "patronRole";

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
    });

    afterAll(() => {
        restoreNats();
        restoreJsonCodec();
    });

    test("should issue claim request with additional params", async () => {
        const { publish } = mockNats();
        const jsonCodec = mockJsonCodec();
        const registrationTypes = [RegistrationTypes.OnChain, RegistrationTypes.OffChain];

        await patronIam.createClaimRequest({
            claim: { claimType: `${patronRole}.${root}`, claimTypeVersion: 1, fields: [] },
            registrationTypes,
        });
        const [, encodedMsg1] = publish.mock.calls.pop();
        const { id, subjectAgreement, token } = jsonCodec.decode(encodedMsg1) as {
            id;
            subjectAgreement;
            token;
        };
        const claimParams: Record<string, string> = {
            "document ID": "ASG 123222",
            DOB: "1990-01-07",
        };
        await serviceProviderIam.issueClaimRequest({
            id,
            registrationTypes,
            requester: patronDID,
            subjectAgreement,
            token,
            claimParams,
        });

        const [, encodedMsg2] = publish.mock.calls.pop();
        const { issuedToken } = jsonCodec.decode(encodedMsg2) as { issuedToken };
        const data = jwtDecode<{ claimData: { claimParams } }>(issuedToken);
        expect(data.claimData.claimParams).toEqual(claimParams);
    });
};
