import { DomainHierarchy, DomainReader, ResolverContractType } from "@energyweb/iam-contracts";
import { RoleDefinitionResolver__factory } from "../../ethers/factories/RoleDefinitionResolver__factory";
import { DomainNotifier__factory } from "../../ethers/factories/DomainNotifier__factory";
import { changeResolver, ChangeResolverParams } from "../../src/utils/change_resolver";
import { rpcUrl } from "../setup_contracts";
import { root, rootOwner } from "../iam.test";
import { org1 } from "../organization.testSuite";
import { ensRegistry, ensResolver, provider } from "../setup_contracts";
import { NODE_FIELDS_KEY } from "../../src/utils/constants";
import { Contract, Wallet, utils } from "ethers";

export const changeResolverTests = () => {
    const wallet = new Wallet(rootOwner.privateKey, provider);
    let newResolverAddr: string;
    let newResolver: Contract;
    let params: Omit<ChangeResolverParams, "rootNode">;
    let domainHierarchy: DomainHierarchy;

    beforeAll(async () => {
        const domainNotifer = await new DomainNotifier__factory(wallet).deploy(ensRegistry.address);
        newResolver = await new RoleDefinitionResolver__factory(wallet).deploy(
            ensRegistry.address,
            domainNotifer.address,
        );
        newResolverAddr = newResolver.address;
        const domainReader = new DomainReader({
            ensRegistryAddress: ensRegistry.address,
            provider,
        });
        const { chainId } = await provider.getNetwork();
        domainReader.addKnownResolver({
            chainId,
            address: ensResolver.address,
            type: ResolverContractType.RoleDefinitionResolver_v1,
        });
        domainReader.addKnownResolver({
            chainId,
            address: newResolverAddr,
            type: ResolverContractType.RoleDefinitionResolver_v1,
        });
        domainHierarchy = new DomainHierarchy({
            domainReader,
            ensRegistry,
            provider,
            domainNotifierAddress: domainNotifer.address,
        });
        params = {
            privateKey: rootOwner.privateKey,
            registryAddr: ensRegistry.address,
            resolverAddr: ensResolver.address,
            domainHierarchy,
            rpcUrl,
            newResolverAddr,
        };
    });

    test("org domain resolver can be changed", async () => {
        const rootNode = `${org1}.${root}`;

        await changeResolver({ ...params, rootNode });

        const domains = await domainHierarchy.getSubdomainsUsingResolver({ domain: rootNode, mode: "ALL" });
        const resolvers = await Promise.all(
            domains.map(async (domain) => await ensRegistry.resolver(utils.namehash(domain))),
        );

        expect(resolvers.every((addr) => addr === newResolverAddr)).toBe(true);
    });

    test("root resolver can be changed", async () => {
        const rootNode = `${root}`;

        await ensRegistry
            .connect(wallet)
            .setOwner(utils.namehash("org1-1.org1.root"), "0xE45Ad1e7522288588dA6829A9ea6A09e92FCDe14");
        await ensRegistry
            .connect(wallet)
            .setOwner(utils.namehash("org1.root"), "0xE45Ad1e7522288588dA6829A9ea6A09e92FCDe14");

        await changeResolver({ ...params, rootNode });

        const nodes = await domainHierarchy.getSubdomainsUsingResolver({ domain: rootNode, mode: "ALL" });

        const nodeDefs = await Promise.all(
            nodes.map(async (domain) => ({
                name: await ensResolver.name(utils.namehash(domain)),
                fields: await ensResolver.text(utils.namehash(domain), NODE_FIELDS_KEY),
                owner: await ensRegistry.owner(utils.namehash(domain)),
            })),
        );

        const resolvers = await Promise.all(
            nodes.map(async (node) => await ensRegistry.resolver(utils.namehash(node))),
        );

        await changeResolver({ ...params, rootNode });

        expect(resolvers.every((addr) => addr === newResolverAddr)).toBe(true);

        /** node names, definitions and owners should be migrated along with nodes */
        expect(nodeDefs).toEqual(
            await Promise.all(
                nodes.map(async (domain) => ({
                    name: await newResolver.name(utils.namehash(domain)),
                    fields: await newResolver.text(utils.namehash(domain), NODE_FIELDS_KEY),
                    owner: await ensRegistry.owner(utils.namehash(domain)),
                })),
            ),
        );
    });
};
