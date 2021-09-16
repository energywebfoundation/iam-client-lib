import { Wallet, providers, utils } from "ethers";
import { DomainHierarchy } from "@energyweb/iam-contracts";
import { ENSRegistry__factory } from "../../ethers/factories/ENSRegistry__factory";
import { PublicResolver__factory } from "../../ethers/factories/PublicResolver__factory";
import { NODE_FIELDS_KEY } from "./constants";
import { labelhash } from "./ENS_hash";

const { JsonRpcProvider } = providers;

export interface ChangeResolverParams {
    rootNode: string;
    privateKey: string;
    rpcUrl: string;
    domainHierarchy: DomainHierarchy;
    registryAddr: string;
    resolverAddr: string;
    newResolverAddr: string;
}

const owners: Record<string, string> = {};

/**
 * @description - Updates resolver on all subnodes of `parentNode`
 * @param rootNode
 * @param resolverAddr
 */
export async function changeResolver({
    rootNode,
    privateKey,
    rpcUrl,
    registryAddr,
    domainHierarchy,
    resolverAddr,
    newResolverAddr,
}: ChangeResolverParams) {
    const rootOwner = new Wallet(privateKey).address;

    const provider = new JsonRpcProvider(rpcUrl);
    const wallet = new Wallet(privateKey, provider);
    const registry = ENSRegistry__factory.connect(registryAddr, wallet);
    const resolver = PublicResolver__factory.connect(resolverAddr, wallet);
    const newResolver = PublicResolver__factory.connect(newResolverAddr, wallet);

    const changeDomainResolver = async (parentNode: string) => {
        await migrate(parentNode);
        const childNodes = await domainHierarchy.getSubdomainsUsingResolver({ domain: parentNode, mode: "FIRSTLEVEL" });
        for (const node of childNodes) {
            const owner = await registry.owner(utils.namehash(node));
            owners[node] = owner;
            await registry.setSubnodeOwner(utils.namehash(parentNode), labelhash(node.split(".")[0]), rootOwner);
            await changeDomainResolver(node);
        }
    };

    const migrate = async (node: string) => {
        await registry.setResolver(utils.namehash(node), newResolverAddr);
        await newResolver.setName(utils.namehash(node), await resolver.name(utils.namehash(node)));
        await newResolver.setText(
            utils.namehash(node),
            NODE_FIELDS_KEY,
            await resolver.text(utils.namehash(node), NODE_FIELDS_KEY),
        );
    };

    const restoreOwners = async () => {
        for (const node in owners) {
            await registry.setOwner(utils.namehash(node), owners[node]);
        }
    };

    await changeDomainResolver(rootNode);

    await restoreOwners();
}
