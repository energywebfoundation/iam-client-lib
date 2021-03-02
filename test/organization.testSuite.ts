import { ENSNamespaceTypes } from "../src/iam";
import { iam, root, rootOwner } from "./iam.test";
import { Methods } from "@ew-did-registry/did";
import { IRoleDefinition } from "../src/cacheServerClient/cacheServerClient.types";

export const org1 = "org1";

export const orgTests = () => {
  const orgName = "Organization 1";

  test("can create organization", async () => {
    await iam.createOrganization({ orgName: org1, namespace: root, data: { orgName } });

    expect(await iam.checkExistenceOfDomain({ domain: `${org1}.${root}` })).toBe(true);
    expect(
      await iam.checkExistenceOfDomain({
        domain: `${ENSNamespaceTypes.Application}.${org1}.${root}`
      })
    ).toBe(true);
    expect(
      await iam.checkExistenceOfDomain({ domain: `${ENSNamespaceTypes.Roles}.${org1}.${root}` })
    ).toBe(true);
    expect(await iam.getSubdomains({ domain: root })).toContain(`${org1}.${root}`);
    expect(await iam.isOwner({ domain: `${org1}.${root}`, user: rootOwner.getAddress() }));
  });

  test("suborganization can be created", async () => {
    const org1_1 = "org1-1";
    await iam.createOrganization({
      orgName: org1_1,
      data: {
        orgName: "Organization 1_1"
      },
      namespace: `${org1}.${root}`
    });

    expect(await iam.checkExistenceOfDomain({ domain: `${org1_1}.${org1}.${root}` })).toBe(true);
    expect(await iam.getSubdomains({ domain: `${org1}.${root}` })).toContain(
      `${org1_1}.${org1}.${root}`
    );
  });

  test("org role can be created", async () => {
    const namespace = `${org1}.${root}`;
    const roleName = `${org1}-role1`;
    const data = {
      fields: [],
      issuer: {
        did: [`did:${Methods.Erc1056}:${rootOwner.getAddress()}`]
      },
      metadata: [],
      roleName,
      roleType: "test",
      version: "1.0.0"
    };

    await iam.createRole({
      roleName,
      namespace,
      data
    });

    const roleDef = await iam.getDefinition({
      namespace: `${roleName}.${namespace}`,
      type: ENSNamespaceTypes.Roles
    });

    expect(roleDef).toMatchObject<IRoleDefinition>(data);
  });
};
