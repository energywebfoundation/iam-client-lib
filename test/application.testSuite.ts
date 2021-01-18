import { ENSNamespaceTypes, IAM } from "../src/iam";
import { iam, root, rootOwner } from './iam.test';
import { org1 } from './organization.testSuite';
import { ensResolver, ensRegistry, didContract, replenish } from "./setup_contracts";
import { namehash } from "ethers/utils";
import { Keys } from "@ew-did-registry/keys";

export const appsTests = () => {
  const app = 'app1';
  const appNode = `${app}.${ENSNamespaceTypes.Application}.${org1}.${root}`;

  test('application can be created', async () => {
    console.log('application to create:', appNode);
    await iam.createApplication({
      appName: app,
      data: { appName: 'Application 1' },
      namespace: `${ENSNamespaceTypes.Application}.${org1}.${root}`
    });

    expect(await iam.checkExistenceOfDomain({ domain: appNode })).toBe(true);
    expect(await iam.checkExistenceOfDomain({ domain: `${ENSNamespaceTypes.Roles}.${appNode}` })).toBe(true);
    expect(await ensResolver.name(namehash(appNode))).toBe(appNode);
    expect(await iam.getSubdomains({ domain: `${ENSNamespaceTypes.Application}.${org1}.${root}` })).toContain(app);
  });

  test('application owner can be changed', async () => {
    const newOwner = new Keys();
    await replenish(newOwner.getAddress());
    const newOwnerIam = new IAM({
      rpcUrl: 'http://localhost:8544/',
      chainId: 9,
      ensRegistryAddress: ensRegistry.address,
      ensResolverAddress: ensResolver.address,
      didContractAddress: didContract.address,
      privateKey: newOwner.privateKey
    });
    await newOwnerIam.initializeConnection({
      useMetamaskExtension: false,
      reinitializeMetamask: false
    });

    expect(await iam.isOwner({ domain: appNode, user: rootOwner.getAddress() }));

    await iam.changeAppOwnership({
      namespace: appNode,
      newOwner: newOwner.getAddress()
    });

    expect(await iam.isOwner({ domain: appNode, user: newOwner.getAddress() }));
    console.log('app owner changed to new owner');

    await newOwnerIam.changeAppOwnership({
      namespace: appNode,
      newOwner: rootOwner.getAddress()
    });

    expect(await iam.isOwner({ domain: appNode, user: rootOwner.getAddress() }));
  });

  test('application can be deleted', async () => {
    expect(await iam.checkExistenceOfDomain({ domain: appNode })).toBe(true);

    await iam.deleteApplication({
      namespace: appNode
    });

    expect(await iam.checkExistenceOfDomain({ domain: appNode })).toBe(false);
  });
};
