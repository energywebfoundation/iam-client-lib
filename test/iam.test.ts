import { providers, utils } from "ethers";
import { Keys } from "@ew-did-registry/keys";
import { IAM, ENSNamespaceTypes } from "../src/iam";
import {
  deployContracts,
  ensRegistry,
  ensResolver,
  didContract,
  GANACHE_PORT,
  assetsManager,
  domainNotifer,
  claimManager,
  replenish
} from "./setup_contracts";
import { labelhash } from "../src/utils/ENS_hash";
import { orgTests } from "./organization.testSuite";
import { appsTests } from "./application.testSuite";
import { initializeConnectionTests } from "./initializeConnection.testSuite";
import { claimsTests } from "./claimsTests/claims.testSuite";
import { setCacheClientOptions, setChainConfig } from "../src/iam/chainConfig";
import { utilsTests } from "./utilsTests/utils.testSuite";
import { assetsTests } from "./assets.testsuite";

const { namehash, bigNumberify } = utils;

export const rootOwner = new Keys();
const { privateKey } = rootOwner;

export const root = "root";
export let iam: IAM;

export const rpcUrl = `http://localhost:${GANACHE_PORT}`;

export const provider = new providers.JsonRpcProvider(rpcUrl);

export const createIam = async (privateKey: string) => {
  await replenish(new Keys({ privateKey }).getAddress());
  const iam = new IAM({
    rpcUrl,
    privateKey
  });
  try {
    await iam.initializeConnection({
      reinitializeMetamask: false
    });
  } catch (e) {
    console.error(">>> Error initializing connection:", e);
  }
  return iam;
};

beforeAll(async () => {
  // sometimes the transaction are taking more then default 5000 ms jest timeout
  jest.setTimeout(60000);
  await deployContracts(privateKey);
  const chainID = 1;
  setChainConfig(chainID, {
    rpcUrl,
    ensRegistryAddress: ensRegistry.address,
    ensResolverAddress: ensResolver.address,
    didContractAddress: didContract.address,
    assetManagerAddress: assetsManager.address,
    domainNotifierAddress: domainNotifer.address,
    claimManagerAddress: claimManager.address
  });
  setCacheClientOptions(1, { url: "" });

  iam = await createIam(privateKey);
});

describe("IAM tests", () => {
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
});

describe("Organization tests", orgTests);
describe("Application tests", appsTests);
describe("InitializeConnection tests", initializeConnectionTests);
describe("Claim tests", claimsTests);
describe("Utils tests", utilsTests);
describe("Assets tests", assetsTests);
