import { IAM, ENSNamespaceTypes } from "../src/iam";
import { PublicResolver } from "../ethers/PublicResolver";
import { namehash } from "ethers/utils";

export const orgTests = (context: { iam: IAM, root: string, ensResolver: PublicResolver }) => {
  const org = 'org1';
  const orgName = 'Organization 1';
  let steps: { next: () => Promise<void> }[];
  let nodenameIsSet: Promise<void>;
  let iam: IAM;
  let root: string;
  let ensResolver: PublicResolver;

  beforeAll(async () => {
    ({ iam, root, ensResolver } = context);
    console.log('root domain:', root);
    steps = await iam.createOrganization({ orgName: org, namespace: root, data: { orgName }, returnSteps: true });

    nodenameIsSet = new Promise<void>((resolve) => {
      const filter = ensResolver.filters.NameChanged(namehash(`${org}.${root}`), null);
      ensResolver.on(filter, (node: string, name: string) => {
        expect(namehash(`${org}.${root}`)).toBe(node);
        expect(`${org}.${root}`).toBe(name);
        resolve();
      });
    });

    for (const { next } of steps) {
      await next();
    }
  });

  test('org node should be created', async () => {
    expect(await iam.checkExistenceOfDomain({ domain: `${org}.${root}` })).toBe(true);
  });

  test('app node should be created', async () => {
    expect(await iam.checkExistenceOfDomain({ domain: `${ENSNamespaceTypes.Application}.${org}.${root}` })).toBe(true);
  });

  test('roles node should be created', async () => {
    expect(await iam.checkExistenceOfDomain({ domain: `${ENSNamespaceTypes.Roles}.${org}.${root}` })).toBe(true);
  });

  test('org ENS name should be set', async () => {
    return nodenameIsSet.should.be.fulfilled;
  });

  test('org domain should be under root domain', async () => {
    expect(await iam.getSubdomains({ domain: root })).toContain(org);
  });
};
