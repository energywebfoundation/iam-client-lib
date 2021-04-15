import { getSubdomains } from "@energyweb/iam-contracts";
import { Wallet } from "ethers";
import { providers } from "ethers";
import { namehash } from "ethers/utils";
import { EnsRegistryFactory } from "../../ethers/EnsRegistryFactory";
import { PublicResolverFactory } from "../../ethers/PublicResolverFactory";
import { NODE_FIELDS_KEY } from "./constants";
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
  const registry = EnsRegistryFactory.connect(registryAddr, wallet);
  const resolver = PublicResolverFactory.connect(resolverAddr, wallet);
  const newResolver = PublicResolverFactory.connect(newResolverAddr, wallet);

  const changeDomainResolver = async (parentNode: string) => {
    await migrate(parentNode);
    const childNodes = await getSubdomains({ domain: parentNode, ensResolver: resolver, ensRegistry: registry, mode: "FIRSTLEVEL" });
    for (const node of childNodes) {
      const owner = await registry.functions.owner(namehash(node));
      owners[node] = owner;
      await registry.setSubnodeOwner(namehash(parentNode), labelhash(node.split('.')[0]), rootOwner);
      await migrate(node);
      await changeDomainResolver(node);
    }
  };

  const migrate = async (node: string) => {
    await registry.setResolver(namehash(node), newResolverAddr);
    await newResolver.setName(namehash(node), await resolver.name(namehash(node)));
    await newResolver.setText(namehash(node), NODE_FIELDS_KEY, await resolver.text(namehash(node), NODE_FIELDS_KEY));
  };

  const restoreOwners = async () => {
    for (const node in owners) {
      await registry.setOwner(namehash(node), owners[node]);
    }
  };

  await changeDomainResolver(rootNode);

  await restoreOwners();
}