import Web3 from 'web3';
import { ContractFactory, Wallet, ethers } from 'ethers';
import { AsyncSendable } from 'ethers/providers';
import { abi as ensRegistryAbi, bytecode as ensRegistryBytecode } from '@ensdomains/ens/build/contracts/ENSRegistry.json';
import { abi as ensResolverAbi, bytecode as ensResolverBytecode } from '@ensdomains/resolver/build/contracts/PublicResolver.json';
import { ethrReg } from '@ew-did-registry/did-ethr-resolver';

const { abi: didContractAbi, bytecode: didContractBytecode } = ethrReg;

const GANACHE_PORT = 8544;
const web3 = new Web3(`http://localhost:${GANACHE_PORT}`);
export const provider = new ethers.providers.Web3Provider(web3.currentProvider as AsyncSendable);

export const deployContracts = async (rootOwner: string): Promise<{
  ensRegistryAddress: string;
  ensResolverAddress: string;
  didContractAddress: string;
}> => {
  const wallet = new Wallet(rootOwner, provider);
  await replenish(wallet.address);
  const ensRegistryFactory = new ContractFactory(ensRegistryAbi, ensRegistryBytecode, wallet);
  const ensRegistryAddress = (await ensRegistryFactory.deploy()).address;
  const ensResolverFactory = new ContractFactory(ensResolverAbi, ensResolverBytecode, wallet);
  const ensResolverAddress = (await ensResolverFactory.deploy(ensRegistryAddress)).address;
  const didContractFactory = new ContractFactory(didContractAbi, didContractBytecode, wallet);
  const didContractAddress = (await didContractFactory.deploy()).address;
  return { ensRegistryAddress, ensResolverAddress, didContractAddress };
};

export const replenish = async (acc: string) => {
  const accounts = await web3.eth.getAccounts();
  await web3.eth.sendTransaction({
    from: accounts[2],
    to: acc,
    value: '1000000000000000000',
  });
};
