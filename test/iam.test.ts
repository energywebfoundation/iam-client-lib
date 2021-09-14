import { BigNumber, utils, Wallet } from "ethers";
import { IAM, ENSNamespaceTypes } from "../src/iam";
import {
    deployDidRegistry,
    ensRegistry,
    ensResolver,
    didContract,
    rpcUrl,
    assetsManager,
    domainNotifer,
    claimManager,
    replenish,
    deployEns,
    provider,
    deployIdentityManager,
    deployClaimManager,
} from "./setup_contracts";
import { labelhash } from "../src/utils/ENS_hash";
import { orgTests } from "./organization.testSuite";
import { appsTests } from "./application.testSuite";
import { initializeConnectionTests } from "./initializeConnection.testSuite";
import { claimsTests } from "./claimsTests/claims.testSuite";
import { setCacheClientOptions, setChainConfig } from "../src/iam/chainConfig";
import { utilsTests } from "./utils/utils.testSuite";
import { assetsTests } from "./assets.testsuite";
import { stakingTests } from "./staking";

const { namehash } = utils;

export const rootOwner = Wallet.createRandom();

export const root = "root";
export let rootOwnerIam: IAM;

export const createIam = async (privateKey: string, { createDocument = false, initCacheServer = false } = {}) => {
    const iam = new IAM({
        rpcUrl,
        privateKey,
    });
    try {
        await iam.initializeConnection({
            reinitializeMetamask: false,
            initCacheServer,
            createDocument,
        });
    } catch (e) {
        console.error(">>> Error initializing connection:", e);
    }
    return iam;
};

// const identityTests = () => {
//     test("Can create identityToken", async () => {
//         const identityToken = await rootOwnerIam.createIdentityProof();
//         console.log("Identity created ==> ", identityToken);
//         expect(identityToken).toBeDefined;
//     })
// }

beforeAll(async () => {
    // sometimes transaction is taking more then default 5000 ms jest timeout
    jest.setTimeout(100000);
    const deployer = rootOwner.connect(provider);
    await replenish(deployer.address);
    await deployDidRegistry();
    await deployEns();
    await deployIdentityManager();
    await deployClaimManager();
    const { chainId } = await provider.getNetwork();
    setChainConfig(chainId, {
        rpcUrl,
        ensRegistryAddress: ensRegistry.address,
        ensResolverAddress: ensResolver.address,
        didContractAddress: didContract.address,
        assetManagerAddress: assetsManager.address,
        domainNotifierAddress: domainNotifer.address,
        claimManagerAddress: claimManager.address,
    });
    setCacheClientOptions(chainId, { url: "" });

    await replenish(rootOwner.address);
    rootOwnerIam = await createIam(rootOwner.privateKey);
});

/**
 * @todo should be refactored because some tests depends on 'create root node'
 */
describe("IAM tests", () => {
    test("can create root node", async () => {
        const tx = await ensRegistry.setSubnodeRecord(
            namehash(""),
            labelhash(root),
            rootOwner.address,
            ensResolver.address,
            BigNumber.from(0),
        );
        await tx.wait();

        expect(await rootOwnerIam.checkExistenceOfDomain({ domain: root })).toBe(true);
        expect(await rootOwnerIam.isOwner({ domain: root, user: rootOwner.address }));
        expect(
            await rootOwnerIam.isOwner({
                domain: `${ENSNamespaceTypes.Application}.${root}`,
                user: rootOwner.address,
            }),
        );
        expect(
            await rootOwnerIam.isOwner({
                domain: `${ENSNamespaceTypes.Roles}.${root}`,
                user: rootOwner.address,
            }),
        );
    });
});

describe("Organization tests", orgTests);
describe("Application tests", appsTests);
describe("InitializeConnection tests", initializeConnectionTests);
describe("Claim tests", claimsTests);
describe("Utils tests", utilsTests);
describe("Assets tests", assetsTests);
describe("Staking tests", stakingTests);
// describe("Identity creation tests", identityTests)
