import { IRoleDefinition } from "@energyweb/iam-contracts";
import { Methods } from "@ew-did-registry/did";
import { ENSNamespaceTypes, PreconditionTypes, RegistrationTypes } from "../src/iam-client-lib";
import { root, rootOwner, rootOwnerIam } from "./iam.test";
import { ensRegistry, ensResolver, provider } from "./setup_contracts";
import { namehash } from "../src/utils/ENS_hash";
import { chainConfigs } from "../src/iam/chainConfig";

export const org1 = "org1";

export const orgTests = () => {
    const orgName = "Organization 1";

    test("can create organization", async () => {
        await rootOwnerIam.createOrganization({ orgName: org1, namespace: root, data: { orgName } });

        expect(await rootOwnerIam.checkExistenceOfDomain({ domain: `${org1}.${root}` })).toBe(true);
        expect(
            await rootOwnerIam.checkExistenceOfDomain({
                domain: `${ENSNamespaceTypes.Application}.${org1}.${root}`,
            }),
        ).toBe(true);
        expect(
            await rootOwnerIam.checkExistenceOfDomain({ domain: `${ENSNamespaceTypes.Roles}.${org1}.${root}` }),
        ).toBe(true);
        expect(await rootOwnerIam.getSubdomains({ domain: root })).toContain(`${org1}.${root}`);
        expect(await rootOwnerIam.isOwner({ domain: `${org1}.${root}`, user: rootOwner.address }));
    });

    test("suborganization can be created", async () => {
        const org1_1 = "org1-1";
        await rootOwnerIam.createOrganization({
            orgName: org1_1,
            data: {
                orgName: "Organization 1_1",
            },
            namespace: `${org1}.${root}`,
        });

        expect(await rootOwnerIam.checkExistenceOfDomain({ domain: `${org1_1}.${org1}.${root}` })).toBe(true);
        expect(await rootOwnerIam.getSubdomains({ domain: `${org1}.${root}` })).toContain(`${org1_1}.${org1}.${root}`);
    });

    test("org role can be created", async () => {
        const namespace = `${org1}.${root}`;
        const roleName = `${org1}-role1`;
        const roleDomain = `${roleName}.${namespace}`;
        const roleNode = namehash(roleDomain);

        const data: IRoleDefinition = {
            fields: [],
            issuer: {
                issuerType: "DID",
                did: [`did:${Methods.Erc1056}:${rootOwner.address}`],
            },
            metadata: [],
            roleName,
            roleType: "test",
            version: 1,
            enrolmentPreconditions: [
                {
                    type: PreconditionTypes.Role,
                    conditions: [roleDomain], // Circular condition but sufficient for test
                },
            ],
        };

        await rootOwnerIam.createRole({
            roleName,
            namespace,
            data,
        });

        const roleDef = await rootOwnerIam.getDefinition({
            namespace: roleDomain,
            type: ENSNamespaceTypes.Roles,
        });
        expect(roleDef).toMatchObject<IRoleDefinition>(data);

        const reverseName = await ensResolver.name(roleNode);
        expect(reverseName).toEqual(roleDomain);

        const resolver = await ensRegistry.resolver(roleNode);
        const actualTypes = (await rootOwnerIam.registrationTypesOfRoles([roleDomain]))[roleDomain];
        const { chainId } = await provider.getNetwork();
        const expectedTypes =
            resolver === chainConfigs[chainId].ensPublicResolverAddress
                ? new Set([RegistrationTypes.OffChain])
                : resolver === chainConfigs[chainId].ensResolverAddress
                ? new Set([RegistrationTypes.OffChain, RegistrationTypes.OnChain])
                : [];
        expect(actualTypes).toEqual(expectedTypes);
    });
};
