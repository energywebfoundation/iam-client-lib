import { Keys } from "@ew-did-registry/keys";
import { IAM } from "../src/iam";
import { iam, root, rootOwner, rpcUrl } from "./iam.test";
import { org1 } from "./organization.testSuite";
import { didContract, ensRegistry, ensResolver, replenish } from "./setup_contracts";

const operatorKeys = new Keys();
const appName = 'app1';

export const approvalTests = () => {
  let operator: IAM;
  const namespace = `apps.${org1}.${root}`;

  beforeAll(async () => {
    operator = new IAM({
      rpcUrl,
      chainId: 73799,
      ensRegistryAddress: ensRegistry.address,
      ensResolverAddress: ensResolver.address,
      didContractAddress: didContract.address,
      privateKey: operatorKeys.privateKey
    });
    await replenish(operatorKeys.getAddress());

    await operator.initializeConnection({});
    await iam.setApproval({
      operator: operator.address as string,
      approve: true
    });
    expect(await operator.isOperatorOf(iam.address as string)).toBe(true);
  });

  test('operator can delete owner application', async () => {
    await iam.createApplication({
      appName,
      namespace,
      data: {
        appName: 'App 1'
      },
      returnSteps: false
    });
    console.log('root owner ownes app1:', await iam.isOwner({ domain: `${appName}.${namespace}`, user: rootOwner.getAddress() }));
    expect(await iam.checkExistenceOfDomain({ domain: `${appName}.${namespace}` })).toBe(true);

    await operator.deleteApplication({
      namespace: `${appName}.${namespace}`,
      returnSteps: false
    });
    expect(await iam.checkExistenceOfDomain({ domain: `${appName}.${namespace}` })).toBe(false);
  });
};