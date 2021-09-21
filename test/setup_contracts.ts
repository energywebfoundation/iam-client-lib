import { DomainNotifier__factory } from "../ethers/factories/DomainNotifier__factory";
import type { DomainNotifier } from "../ethers/DomainNotifier";
import { RoleDefinitionResolver__factory } from "../ethers/factories/RoleDefinitionResolver__factory";
import type { RoleDefinitionResolver } from "../ethers/RoleDefinitionResolver";
import { abi as didContractAbi, bytecode as didContractBytecode } from "./testUtils/ERC1056.json";
import { ContractFactory, Contract, providers, utils, BigNumber } from "ethers";
import { ENSRegistry } from "../ethers/ENSRegistry";
import { ENSRegistry__factory } from "../ethers/factories/ENSRegistry__factory";
import { IdentityManager__factory } from "../ethers/factories/IdentityManager__factory";
import { IdentityManager } from "../ethers/IdentityManager";
import { OfferableIdentity__factory } from "../ethers/factories/OfferableIdentity__factory";
import { ClaimManager__factory } from "../ethers/factories/ClaimManager__factory";
import { ClaimManager } from "../ethers/ClaimManager";

const { JsonRpcProvider } = providers;
const { parseEther } = utils;

const GANACHE_PORT = 8544;
export const rpcUrl = `http://localhost:${GANACHE_PORT}`;
export const provider = new JsonRpcProvider(rpcUrl);

export let ensRegistry: ENSRegistry;
export let ensResolver: RoleDefinitionResolver;
export let domainNotifer: DomainNotifier;
export let didContract: Contract;
export let assetsManager: IdentityManager;
export let claimManager: ClaimManager;

export const deployer = provider.getSigner(0);

export const deployDidRegistry = async (): Promise<void> => {
    const didContractFactory = new ContractFactory(didContractAbi, didContractBytecode, deployer);
    didContract = await didContractFactory.deploy();
};

export const deployEns = async (): Promise<void> => {
    ensRegistry = await new ENSRegistry__factory(deployer).deploy();
    domainNotifer = await new DomainNotifier__factory(deployer).deploy(ensRegistry.address);
    ensResolver = await new RoleDefinitionResolver__factory(deployer).deploy(
        ensRegistry.address,
        domainNotifer.address,
    );
};

export const deployIdentityManager = async (): Promise<void> => {
    const identityFactory = new OfferableIdentity__factory(deployer);
    const library = await identityFactory.deploy();
    assetsManager = await new IdentityManager__factory(deployer).deploy(library.address);
};

export const deployClaimManager = async (): Promise<void> => {
    claimManager = await new ClaimManager__factory(deployer).deploy(didContract.address, ensRegistry.address);
};

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
