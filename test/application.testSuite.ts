import { ENSNamespaceTypes } from "../src/iam";
import { iam, root } from './iam.test';
import { org1 } from './organization.testSuite';
import { ensResolver } from "./utils";
import { namehash } from "ethers/utils";

const app = 'app1';

export const appsTests = () => {
  const appNode = `${app}.${ENSNamespaceTypes.Application}.${org1}.${root}`;

  test('application can be created', async () => {
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
};
