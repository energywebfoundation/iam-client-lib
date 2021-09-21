import { ENSNamespaceTypes } from "../src/iam";
import { createIam, rootOwnerIam, root, rootOwner } from "./iam.test";
import { org1 } from "./organization.testSuite";
import { ensResolver, replenish } from "./setup_contracts";
import { utils } from "ethers";
import { Keys } from "@ew-did-registry/keys";

const { namehash } = utils;

export const appsTests = () => {
  const app = "app1";
  const appNode = `${app}.${ENSNamespaceTypes.Application}.${org1}.${root}`;

  test("application can be created", async () => {
    const appDefinition = { appName: "Application 1" };
    await rootOwnerIam.createApplication({
      appName: app,
      data: appDefinition,
      namespace: `${ENSNamespaceTypes.Application}.${org1}.${root}`
    });

    expect(await rootOwnerIam.checkExistenceOfDomain({ domain: appNode })).toBe(true);
    expect(
      await rootOwnerIam.checkExistenceOfDomain({ domain: `${ENSNamespaceTypes.Roles}.${appNode}` })
    ).toBe(true);
    expect(await ensResolver.name(namehash(appNode))).toBe(appNode);
    expect(
      await rootOwnerIam.getSubdomains({ domain: `${ENSNamespaceTypes.Application}.${org1}.${root}` })
    ).toContain(`${app}.${ENSNamespaceTypes.Application}.${org1}.${root}`);

    const readAppDefinition = await rootOwnerIam.getDefinition({ type: ENSNamespaceTypes.Application, namespace: appNode });
    expect(readAppDefinition).toMatchObject(appDefinition);
  });

  test("application owner can be changed", async () => {
    const newOwner = new Keys();
    await replenish(newOwner.getAddress());
    const newOwnerIam = await createIam(newOwner.privateKey);

    expect(await rootOwnerIam.isOwner({ domain: appNode, user: rootOwner.address }));

    await rootOwnerIam.changeAppOwnership({
      namespace: appNode,
      newOwner: newOwner.getAddress()
    });

    expect(await rootOwnerIam.isOwner({ domain: appNode, user: newOwner.getAddress() }));

    await newOwnerIam.changeAppOwnership({
      namespace: appNode,
      newOwner: rootOwner.address
    });

    expect(await rootOwnerIam.isOwner({ domain: appNode, user: rootOwner.address }));
  });

  test("application can be deleted", async () => {
    expect(await rootOwnerIam.checkExistenceOfDomain({ domain: appNode })).toBe(true);

    await rootOwnerIam.deleteApplication({
      namespace: appNode
    });

    expect(await rootOwnerIam.checkExistenceOfDomain({ domain: appNode })).toBe(false);
  });
};
