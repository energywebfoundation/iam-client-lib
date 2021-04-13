import { ContractFactory, Wallet, Contract, providers, utils } from "ethers";
import { ethrReg } from "@ew-did-registry/did-ethr-resolver";
import { EnsRegistry } from "../ethers/EnsRegistry";
import { EnsRegistryFactory } from "../ethers/EnsRegistryFactory";
import { IdentityManagerFactory } from "../ethers/IdentityManagerFactory";
import { IdentityManager } from "../ethers/IdentityManager";
import { OfferableIdentityFactory } from "../ethers/OfferableIdentityFactory";
import { RoleDefinitionResolver } from "../ethers/RoleDefinitionResolver";
import { RoleDefinitionResolverFactory } from "../ethers/RoleDefinitionResolverFactory";
import { DomainNotifierFactory } from "../ethers/DomainNotifierFactory";

const { JsonRpcProvider } = providers;
const { parseEther } = utils;

const { abi: didContractAbi, bytecode: didContractBytecode } = ethrReg;

export const GANACHE_PORT = 8544;
export const provider = new JsonRpcProvider(`http://localhost:${GANACHE_PORT}`);
export let ensRegistry: EnsRegistry;
export let ensResolver: RoleDefinitionResolver;
export let didContract: Contract;
export let assetsManager: IdentityManager;

export const deployContracts = async (privateKey: string): Promise<void> => {
  const wallet = new Wallet(privateKey, provider);
  await replenish(wallet.address);
  const didContractFactory = new ContractFactory(didContractAbi, didContractBytecode, wallet);
  ensRegistry = await new EnsRegistryFactory(wallet).deploy();
  const domainNotifer = await new DomainNotifierFactory(wallet).deploy(ensRegistry.address);
  ensResolver = await new RoleDefinitionResolverFactory(wallet).deploy(ensRegistry.address, domainNotifer.address);
  didContract = await didContractFactory.deploy();

  const identityFactory = new OfferableIdentityFactory(wallet);
  const library = await identityFactory.deploy();
  assetsManager = await new IdentityManagerFactory(wallet).deploy(library.address);
};

export const replenish = async (acc: string) => {
  const faucet = provider.getSigner(2);
  await faucet.sendTransaction({
    to: acc,
    value: parseEther("3.0")
  });
};
