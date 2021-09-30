import { ContractFactory, Contract, providers, utils, BigNumber } from "ethers";
import { ethrReg } from "@ew-did-registry/did-ethr-resolver";
import { DomainNotifier__factory } from "../../ethers/factories/DomainNotifier__factory";
import type { DomainNotifier } from "../../ethers/DomainNotifier";
import { RoleDefinitionResolver__factory } from "../../ethers/factories/RoleDefinitionResolver__factory";
import type { RoleDefinitionResolver } from "../../ethers/RoleDefinitionResolver";
import { ENSRegistry } from "../../ethers/ENSRegistry";
import { ENSRegistry__factory } from "../../ethers/factories/ENSRegistry__factory";
import { IdentityManager__factory } from "../../ethers/factories/IdentityManager__factory";
import { IdentityManager } from "../../ethers/IdentityManager";
import { OfferableIdentity__factory } from "../../ethers/factories/OfferableIdentity__factory";
import { ClaimManager__factory } from "../../ethers/factories/ClaimManager__factory";
import { ClaimManager } from "../../ethers/ClaimManager";
import { setChainConfig } from "../../src/config/chain.config";
import { labelhash } from "../../src/utils/ENS_hash";

const { JsonRpcProvider } = providers;
const { parseEther, namehash } = utils;

const { abi: didContractAbi, bytecode: didContractBytecode } = ethrReg;

const GANACHE_PORT = 8544;
export const rpcUrl = `http://localhost:${GANACHE_PORT}`;

const provider = new JsonRpcProvider(rpcUrl);
let didRegistry: Contract;
let ensRegistry: ENSRegistry;
let ensResolver: RoleDefinitionResolver;
let domainNotifer: DomainNotifier;
let assetsManager: IdentityManager;
let claimManager: ClaimManager;

export const deployer = provider.getSigner(0);

const deployDidRegistry = async () => {
    const didContractFactory = new ContractFactory(didContractAbi, didContractBytecode, deployer);
    didRegistry = await didContractFactory.deploy();
};

const deployEns = async () => {
    ensRegistry = await new ENSRegistry__factory(deployer).deploy();
    domainNotifer = await new DomainNotifier__factory(deployer).deploy(ensRegistry.address);
    ensResolver = await new RoleDefinitionResolver__factory(deployer).deploy(
        ensRegistry.address,
        domainNotifer.address,
    );
};

const deployIdentityManager = async (): Promise<void> => {
    const identityFactory = new OfferableIdentity__factory(deployer);
    const library = await identityFactory.deploy();
    assetsManager = await new IdentityManager__factory(deployer).deploy(library.address);
};

const deployClaimManager = async (): Promise<void> => {
    claimManager = await new ClaimManager__factory(deployer).deploy(didRegistry.address, ensRegistry.address);
};

export const root = "ewc";

export const replenish = async (acc: string, amount: BigNumber | string = "3.0") => {
    if (typeof amount === "string") {
        amount = parseEther(amount);
    }
    const faucet = provider.getSigner(2);
    await faucet.sendTransaction({
        to: acc,
        value: amount,
    });
};

export const setupENS = async (rootOwner: string) => {
    await deployDidRegistry();
    await deployEns();
    await deployIdentityManager();
    await deployClaimManager();
    const { chainId } = await provider.getNetwork();
    setChainConfig(chainId, {
        rpcUrl,
        ensRegistryAddress: ensRegistry.address,
        ensResolverAddress: ensResolver.address,
        didRegistryAddress: didRegistry.address,
        assetManagerAddress: assetsManager.address,
        domainNotifierAddress: domainNotifer.address,
        claimManagerAddress: claimManager.address,
    });
    const tx = await ensRegistry.setSubnodeRecord(
        namehash(""),
        labelhash(root),
        rootOwner,
        ensResolver.address,
        BigNumber.from(0),
    );
    await tx.wait();
};
