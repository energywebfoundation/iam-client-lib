import Web3 from 'web3';
import { ContractFactory, Wallet, ethers, Contract } from 'ethers';
import { AsyncSendable } from 'ethers/providers';
import { ethrReg } from '@ew-did-registry/did-ethr-resolver';
import { EnsRegistry } from '../ethers/EnsRegistry';
import { PublicResolver } from '../ethers/PublicResolver';
import { PublicResolverFactory } from '../ethers/PublicResolverFactory';
import { EnsRegistryFactory } from '../ethers/EnsRegistryFactory';

const { abi: didContractAbi, bytecode: didContractBytecode } = ethrReg;

const GANACHE_PORT = 8544;
const web3 = new Web3(`http://localhost:${GANACHE_PORT}`);
export const provider = new ethers.providers.Web3Provider(web3.currentProvider as AsyncSendable);
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
  const accounts = await web3.eth.getAccounts();
  await web3.eth.sendTransaction({
    from: accounts[2],
    to: acc,
    value: '1000000000000000000',
  });
};
