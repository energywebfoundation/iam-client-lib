import { ContractFactory, Wallet, Contract, providers, utils } from 'ethers';
import { ethrReg } from '@ew-did-registry/did-ethr-resolver';
import { EnsRegistry } from '../ethers/EnsRegistry';
import { PublicResolver } from '../ethers/PublicResolver';
import { PublicResolverFactory } from '../ethers/PublicResolverFactory';
import { EnsRegistryFactory } from '../ethers/EnsRegistryFactory';

const { JsonRpcProvider } = providers;
const { parseEther } = utils;

const { abi: didContractAbi, bytecode: didContractBytecode } = ethrReg;

export const GANACHE_PORT = 8544;
export const provider = new JsonRpcProvider(`http://localhost:${GANACHE_PORT}`);
export let ensRegistry: EnsRegistry;
export let ensResolver: PublicResolver;
export let didContract: Contract;

export const deployContracts = async (privateKey: string): Promise<void> => {
  const wallet = new Wallet(privateKey, provider);
  await replenish(wallet.address);
  const didContractFactory = new ContractFactory(didContractAbi, didContractBytecode, wallet);
  ensRegistry = await (new EnsRegistryFactory(wallet).deploy());
  ensResolver = await (new PublicResolverFactory(wallet).deploy(ensRegistry.address));
  didContract = await didContractFactory.deploy();
};

export const replenish = async (acc: string) => {
  const faucet = provider.getSigner(2);
  await faucet.sendTransaction({
    to: acc,
    value: parseEther('1.0')
  });
};
