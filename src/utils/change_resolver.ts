import { Wallet } from "ethers";
import { providers } from "ethers";
import { namehash } from "ethers/utils";
import { EnsRegistryFactory } from "../../ethers/EnsRegistryFactory";
import { PublicResolverFactory } from "../../ethers/PublicResolverFactory";
import { getSubdomains } from "../utils/getSubDomains";
import { labelhash } from "./ENS_hash";

const { JsonRpcProvider } = providers;

export interface ChangeResolverParams {
  rootNode: string,
  privateKey: string,
  rpcUrl: string,
  registryAddr: string,
  resolverAddr: string,
  newResolverAddr: string
}

const owners: Record<string, string> = {};

/**
 * @description - Updates resolver on all subnodes of `parentNode`
 * @param rootNode 
 * @param resolverAddr 
 */
export async function changeResolver(
  { rootNode, privateKey, rpcUrl, registryAddr, resolverAddr, newResolverAddr }:
    ChangeResolverParams
) {
  const rootOwner = new Wallet(privateKey).address;

  const provider = new JsonRpcProvider(rpcUrl);
  const wallet = new Wallet(privateKey, provider);
  const ensRegistry = EnsRegistryFactory.connect(registryAddr, wallet);
  const ensResolver = PublicResolverFactory.connect(resolverAddr, wallet);

  const changeDomainResolver = async (parentNode: string) => {
    await ensRegistry.setResolver(namehash(parentNode), newResolverAddr);
    const childNodes = await getSubdomains({ domain: parentNode, ensResolver, ensRegistry, mode: "FIRSTLEVEL" });
    for (const node of childNodes) {
      const owner = await ensRegistry.functions.owner(namehash(node));
      owners[node] = owner;
      await ensRegistry.setSubnodeOwner(namehash(parentNode), labelhash(node.split('.')[0]), rootOwner);
      await ensRegistry.setResolver(namehash(node), newResolverAddr);
      await changeDomainResolver(node);
    }
  };

  const restoreOwners = async () => {
    for (const node in owners) {
      await ensRegistry.setOwner(namehash(node), owners[node]);
    }
  };

  await changeDomainResolver(rootNode);

  await restoreOwners();
}