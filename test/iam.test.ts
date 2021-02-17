import { utils } from "ethers";
import { Keys } from "@ew-did-registry/keys";
import { IAM, ENSNamespaceTypes } from "../src/iam";
import { deployContracts, ensRegistry, ensResolver, didContract } from "./setup_contracts";
import { labelhash } from "../src/utils/ENS_hash";
import { orgTests } from "./organization.testSuite";
import { appsTests } from "./application.testSuite";
import { initializeConnectionTests } from "./initializeConnection.testSuite";
import { claimsTests } from "./claims.testSuite";

const { namehash, bigNumberify } = utils;

export const rootOwner = new Keys();
const { privateKey } = rootOwner;

export const root = "root";
export let iam: IAM;

export const rpcUrl = "http://localhost:8544/";

describe("IAM tests", () => {
  // sometimes the transaction are taking more then default 5000 ms jest timeout
  jest.setTimeout(30000);

  beforeAll(async () => {
    await deployContracts(privateKey);

    iam = new IAM({
      rpcUrl,
      chainId: 73799,
      ensRegistryAddress: ensRegistry.address,
      ensResolverAddress: ensResolver.address,
      didContractAddress: didContract.address,
      privateKey
    });
    try {
      await iam.initializeConnection({
        reinitializeMetamask: false
      });
    } catch (e) {
      console.error(">>> Error initializing connection:", e);
    }
  });

  test("can create root node", async () => {
    const tx = await ensRegistry.setSubnodeRecord(
      namehash(""),
      labelhash(root),
      rootOwner.getAddress(),
      ensResolver.address,
      bigNumberify(0)
    );
    await tx.wait();

    expect(await iam.checkExistenceOfDomain({ domain: root })).toBe(true);
    expect(await iam.isOwner({ domain: root, user: rootOwner.getAddress() }));
    expect(
      await iam.isOwner({
        domain: `${ENSNamespaceTypes.Application}.${root}`,
        user: rootOwner.getAddress()
      })
    );
    expect(
      await iam.isOwner({
        domain: `${ENSNamespaceTypes.Roles}.${root}`,
        user: rootOwner.getAddress()
      })
    );
  });

  describe("Organization tests", orgTests);
  describe("Application tests", appsTests);
  describe("InitializeConnection tests", initializeConnectionTests);
  describe("Claim tests", claimsTests);
});
