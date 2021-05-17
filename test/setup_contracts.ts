import { ContractFactory, Wallet, Contract, providers, utils } from "ethers";
import { ethrReg } from "@ew-did-registry/did-ethr-resolver";
import { EnsRegistry } from "../ethers/EnsRegistry";
import { PublicResolver } from "../ethers/PublicResolver";
import { PublicResolverFactory } from "../ethers/PublicResolverFactory";
import { EnsRegistryFactory } from "../ethers/EnsRegistryFactory";
import { IdentityManagerFactory } from "../ethers/IdentityManagerFactory";
import { IdentityManager } from "../ethers/IdentityManager";
import { OfferableIdentityFactory } from "../ethers/OfferableIdentityFactory";
import { RoleDefinitionResolver } from "@energyweb/iam-contracts/typechain/RoleDefinitionResolver";
import { RoleDefinitionResolver__factory } from '@energyweb/iam-contracts/typechain/factories/RoleDefinitionResolver__factory';
import { DomainNotifier } from "@energyweb/iam-contracts/typechain/DomainNotifier";
import { DomainNotifier__factory } from '@energyweb/iam-contracts/typechain/factories/DomainNotifier__factory';
import { setRegistryAddress, addKnownResolver, ResolverContractType } from '@energyweb/iam-contracts';

const { JsonRpcProvider } = providers;
const { parseEther } = utils;

const { abi: didContractAbi, bytecode: didContractBytecode } = ethrReg;

export const GANACHE_PORT = 8544;
export const provider = new JsonRpcProvider(`http://localhost:${GANACHE_PORT}`);
export let ensRegistry: EnsRegistry;
export let ensResolver: PublicResolver;
export let notifier: DomainNotifier;
export let roleResolver: RoleDefinitionResolver;
export let didContract: Contract;
export let assetsManager: IdentityManager;

export const deployContracts = async (privateKey: string): Promise<void> => {
  const wallet = new Wallet(privateKey, provider);
  await replenish(wallet.address);

  const didContractFactory = new ContractFactory(didContractAbi, didContractBytecode, wallet);
  didContract = await didContractFactory.deploy();

  ensRegistry = await (await new EnsRegistryFactory(wallet).deploy()).deployed();
  ensResolver = await (await new PublicResolverFactory(wallet).deploy(ensRegistry.address)).deployed();
  notifier = await (await new DomainNotifier__factory(wallet).deploy(ensRegistry.address)).deployed();
  roleResolver = await (await new RoleDefinitionResolver__factory(wallet).deploy(ensRegistry.address, notifier.address)).deployed();

  const chainId = (await provider.getNetwork()).chainId;
  setRegistryAddress(chainId, ensRegistry.address);
  addKnownResolver(chainId, roleResolver.address, ResolverContractType.RoleDefinitionResolver_v1);
  addKnownResolver(chainId, roleResolver.address, ResolverContractType.PublicResolver);

  const identityFactory = new OfferableIdentityFactory(wallet);
  const library = await (await identityFactory.deploy()).deployed();
  assetsManager = await (await new IdentityManagerFactory(wallet).deploy(library.address)).deployed();
};

export const replenish = async (acc: string) => {
  const faucet = provider.getSigner(2);
  await faucet.sendTransaction({
    to: acc,
    value: parseEther("3.0")
  });
};
