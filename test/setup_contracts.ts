import { DomainNotifier__factory } from "@energyweb/iam-contracts";
import type { DomainNotifier } from "@energyweb/iam-contracts/dist/ethers-v4/DomainNotifier";
import { RoleDefinitionResolver__factory } from "@energyweb/iam-contracts";
import type { RoleDefinitionResolver } from "@energyweb/iam-contracts/dist/ethers-v4/RoleDefinitionResolver";
import { ethrReg } from "@ew-did-registry/did-ethr-resolver";
import { ContractFactory, Contract, providers, utils } from "ethers";
import { EnsRegistry } from "../ethers/EnsRegistry";
import { EnsRegistryFactory } from "../ethers/EnsRegistryFactory";
import { IdentityManagerFactory } from "../ethers/IdentityManagerFactory";
import { IdentityManager } from "../ethers/IdentityManager";
import { OfferableIdentityFactory } from "../ethers/OfferableIdentityFactory";
import { ClaimManager__factory } from "@energyweb/iam-contracts/";
import { ClaimManager } from "@energyweb/iam-contracts/dist/ethers-v4/ClaimManager";

const { JsonRpcProvider } = providers;
const { parseEther } = utils;

const { abi: didContractAbi, bytecode: didContractBytecode } = ethrReg;

const GANACHE_PORT = 8544;
export const rpcUrl = `http://localhost:${GANACHE_PORT}`;
export const provider = new JsonRpcProvider(rpcUrl);
export let ensRegistry: EnsRegistry;
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
  ensRegistry = await new EnsRegistryFactory(deployer).deploy();
  domainNotifer = await new DomainNotifier__factory(deployer).deploy(ensRegistry.address);
  ensResolver = await new RoleDefinitionResolver__factory(deployer).deploy(ensRegistry.address, domainNotifer.address);
};

export const deployIdentityManager = async (): Promise<void> => {
  const identityFactory = new OfferableIdentityFactory(deployer);
  const library = await identityFactory.deploy();
  assetsManager = await new IdentityManagerFactory(deployer).deploy(library.address);
};

export const deployClaimManager = async (): Promise<void> => {
  claimManager = await new ClaimManager__factory(deployer).deploy(didContract.address, ensRegistry.address);
};

export const replenish = async (acc: string, amount: utils.BigNumber | string = "3.0") => {
  if (typeof amount === "string") {
    amount = parseEther(amount);
  }
  const faucet = provider.getSigner(2);
  await faucet.sendTransaction({
    to: acc,
    value: amount
  });
};
