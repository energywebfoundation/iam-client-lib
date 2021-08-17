import {
    IAppDefinition,
    IOrganizationDefinition,
    IRoleDefinition,
    EncodedCall,
    DomainReader,
    DomainTransactionFactory,
    ResolverContractType,
    DomainHierarchy,
    PreconditionType,
} from "@energyweb/iam-contracts";
import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { bigNumberify, namehash } from "ethers/utils";
import { EnsRegistry } from "../../../ethers/EnsRegistry";
import { EnsRegistryFactory } from "../../../ethers/EnsRegistryFactory";
import chainConfig, { ChainConfig } from "../../config/chain.config";
import {
    CacheClientNotProvidedError,
    ChangeOwnershipNotPossibleError,
    DeletingNamespaceNotPossibleError,
    ENSRegistryNotInitializedError,
    ENSResolverNotInitializedError,
    ENSTypeNotSupportedError,
    ERROR_MESSAGES,
} from "../../errors";
import { emptyAddress } from "../../utils/constants";
import { parseDID } from "../../utils/did";
import { labelhash } from "../../utils/ENS_hash";
import { CacheClient } from "../cacheClient/cacheClient.service";
import { IOrganization } from "../cacheClient/cacheClient.types";
import { SignerService } from "../signer/signer.service";

export enum ENSNamespaceTypes {
    Roles = "roles",
    Application = "apps",
    Organization = "org",
}

@Injectable()
export class DomainsService implements OnModuleInit {
    private chainId: number;
    private ensRegistry: EnsRegistry;
    private domainDefinitionReader: DomainReader;
    private domainDefinitionTransactionFactory: DomainTransactionFactory;
    private domainHierarchy: DomainHierarchy;
    private owner: string;
    private ensRegistryAddress: string;
    private ensResolverAddress: string;
    private ttl = bigNumberify(0);

    constructor(
        private configService: ConfigService<ChainConfig>,
        private signerService: SignerService,
        private cacheClient: CacheClient,
    ) {}

    async onModuleInit() {
        const { chainId } = await this.signerService.signer.provider.getNetwork();
        const { ensRegistryAddress, ensResolverAddress, ensPublicResolverAddress, domainNotifierAddress } =
            this.configService[chainConfig[chainId]];
        this.ensRegistryAddress = ensRegistryAddress;
        this.ensResolverAddress = ensResolverAddress;
        this.ensRegistry = EnsRegistryFactory.connect(ensRegistryAddress, this.signerService.signer);
        this.domainDefinitionReader = new DomainReader({
            ensRegistryAddress,
            provider: this.signerService.signer.provider,
        });
        ensPublicResolverAddress &&
            this.domainDefinitionReader.addKnownResolver({
                chainId,
                address: ensPublicResolverAddress,
                type: ResolverContractType.PublicResolver,
            });
        ensResolverAddress &&
            this.domainDefinitionReader.addKnownResolver({
                chainId,
                address: ensResolverAddress,
                type: ResolverContractType.RoleDefinitionResolver_v1,
            });
        this.domainDefinitionTransactionFactory = new DomainTransactionFactory({
            domainResolverAddress: ensResolverAddress,
        });
        this.domainHierarchy = new DomainHierarchy({
            domainReader: this.domainDefinitionReader,
            ensRegistry: this.ensRegistry,
            provider: this.signerService.signer.provider,
            domainNotifierAddress: domainNotifierAddress,
            publicResolverAddress: ensPublicResolverAddress,
        });
        this.owner = await this.signerService.signer.getAddress();
    }

    /**
     * setRoleDefinition
     *
     * @description sets role definition in ENS domain
     * @description please use it only when you want to update role definitions for already created role (domain)
     *
     */
    async setRoleDefinition({
        domain,
        data,
    }: {
        domain: string;
        data: IAppDefinition | IOrganizationDefinition | IRoleDefinition;
    }) {
        // Special case of updating legacy PublicResolver definitions
        if (await this.updateLegacyDefinition(domain, data)) {
            return;
        }
        // Standard update
        await this.signerService.send({
            calls: [this.domainDefinitionTransactionFactory.editDomain({ domain, domainDefinition: data })],
            from: await this.getOwner({ namespace: domain }),
        });
    }

    /**
     * createOrganization
     *
     * @description creates organization (create subdomain, sets the domain name and sets the role definition to metadata record in ENS Domain)
     * @description and sets subdomain for roles and app for org namespace
     *
     */
    async createOrganization({
        orgName,
        namespace,
        data,
        returnSteps,
    }: {
        orgName: string;
        data: IOrganizationDefinition;
        namespace: string;
        returnSteps?: boolean;
    }) {
        const orgDomain = `${orgName}.${namespace}`;
        const rolesDomain = `${ENSNamespaceTypes.Roles}.${orgDomain}`;
        const appsDomain = `${ENSNamespaceTypes.Application}.${orgDomain}`;
        const from = await this.getOwner({ namespace });
        const steps = [
            {
                tx: this.createSubdomainTx({ domain: namespace, nodeName: orgName, owner: from }),
                info: "Create organization subdomain",
            },
            {
                tx: this.domainDefinitionTransactionFactory.newDomain({ domain: orgDomain, domainDefinition: data }),
                info: "Register reverse name and set definition for organization subdomain",
            },
            {
                tx: this.createSubdomainTx({
                    domain: orgDomain,
                    nodeName: ENSNamespaceTypes.Roles,
                    owner: from,
                }),
                info: "Create roles subdomain for organization",
            },
            {
                tx: this.domainDefinitionTransactionFactory.setDomainNameTx({ domain: rolesDomain }),
                info: "Register reverse name for roles subdomain",
            },
            {
                tx: this.createSubdomainTx({
                    domain: orgDomain,
                    nodeName: ENSNamespaceTypes.Application,
                    owner: from,
                }),
                info: "Create app subdomain for organization",
            },
            {
                tx: this.domainDefinitionTransactionFactory.setDomainNameTx({ domain: appsDomain }),
                info: "Register reverse name for app subdomain",
            },
        ].map((step) => ({
            ...step,
            next: async () => {
                await this.signerService.send({ calls: [step.tx], from });
            },
        }));
        if (returnSteps) {
            return steps;
        }
        await this.signerService.send({ calls: steps.map(({ tx }) => tx), from });
        return [];
    }

    /**
     * createApp
     *
     * @description creates role (create subdomain, sets the domain name and sets the role definition to metadata record in ENS Domain)
     * @description creates roles subdomain for the app namespace
     *
     */
    async createApplication({
        appName,
        namespace: domain,
        data,
        returnSteps,
    }: {
        namespace: string;
        appName: string;
        data: IAppDefinition;
        returnSteps?: boolean;
    }) {
        const appDomain = `${appName}.${domain}`;
        const from = await this.getOwner({ namespace: domain });
        const steps = [
            {
                tx: this.createSubdomainTx({ domain, nodeName: appName, owner: from }),
                info: "Set subdomain for application",
            },
            {
                tx: this.domainDefinitionTransactionFactory.newDomain({ domainDefinition: data, domain: appDomain }),
                info: "Set name definition for application",
            },
            {
                tx: this.createSubdomainTx({
                    domain: appDomain,
                    nodeName: ENSNamespaceTypes.Roles,
                    owner: from,
                }),
                info: "Create roles subdomain for application",
            },
            {
                tx: this.domainDefinitionTransactionFactory.setDomainNameTx({
                    domain: `${ENSNamespaceTypes.Roles}.${appDomain}`,
                }),
                info: "Set name for roles subdomain for application",
            },
        ].map((step) => ({
            ...step,
            next: async () => {
                await this.signerService.send({ calls: [step.tx], from });
            },
        }));
        if (returnSteps) {
            return steps;
        }
        await this.signerService.send({ calls: steps.map(({ tx }) => tx), from });
        return [];
    }

    /**
     * createRole
     *
     * @description creates role (create subdomain, sets the domain name and sets the role definition to metadata record in ENS Domain)
     * @returns information (true/false) if the role was created
     *
     */
    async createRole({
        roleName,
        namespace,
        data,
        returnSteps,
    }: {
        roleName: string;
        namespace: string;
        data: IRoleDefinition;
        returnSteps?: boolean;
    }) {
        const newDomain = `${roleName}.${namespace}`;
        const from = await this.getOwner({ namespace });
        const steps = [
            {
                tx: this.createSubdomainTx({ domain: namespace, nodeName: roleName, owner: from }),
                info: "Create subdomain for role",
            },
            {
                tx: this.domainDefinitionTransactionFactory.newRole({ domain: newDomain, roleDefinition: data }),
                info: "Set name and definition for role",
            },
        ].map((step) => ({
            ...step,
            next: async () => {
                await this.signerService.send({ calls: [step.tx], from });
            },
        }));
        if (returnSteps) {
            return steps;
        }
        await this.signerService.send({ calls: steps.map(({ tx }) => tx), from });
        return [];
    }

    /**
     * changeOrgOwnership
     *
     * @description change owner ship of org subdomain and all org owned roles subdomains
     * @returns return array of steps needed to change ownership
     *
     */
    async changeOrgOwnership({
        namespace,
        newOwner,
        returnSteps = false,
    }: {
        namespace: string;
        newOwner: string;
        returnSteps?: boolean;
    }) {
        newOwner = parseDID(newOwner);
        const orgNamespaces = [
            `${ENSNamespaceTypes.Roles}.${namespace}`,
            `${ENSNamespaceTypes.Application}.${namespace}`,
            namespace,
        ];
        const { alreadyFinished, changeOwnerNamespaces, notOwnedNamespaces } = await this.validateChangeOwnership({
            newOwner,
            namespaces: orgNamespaces,
        });

        if (notOwnedNamespaces.length > 0) {
            throw new ChangeOwnershipNotPossibleError({ namespace, notOwnedNamespaces });
        }
        const from = await this.getOwner({ namespace });

        const apps = this.cacheClient
            ? await this.getAppsByOrgNamespace({ namespace })
            : await this.getSubdomains({
                  domain: `${ENSNamespaceTypes.Application}.${namespace}`,
              });
        if (apps && apps.length > 0) {
            throw new Error("You are not able to change ownership of organization with registered apps");
        }

        if (alreadyFinished.length > 0) {
            console.log(`Already changed ownership of ${alreadyFinished.join(", ")}`);
        }

        const steps = changeOwnerNamespaces.map((namespace) => {
            const tx = this.changeDomainOwnerTx({ newOwner, namespace });
            return {
                tx,
                next: async ({ retryCheck }: { retryCheck?: boolean } = {}) => {
                    if (retryCheck) {
                        const owner = await this.getOwner({ namespace });
                        if (owner === newOwner) return;
                    }
                    return this.signerService.send({ calls: [tx], from });
                },
                info: `Changing ownership of ${namespace}`,
            };
        });

        if (returnSteps) {
            return steps;
        }
        await this.signerService.send({ calls: steps.map(({ tx }) => tx), from });
        return [];
    }

    /**
     * changeAppOwnership
     *
     * @description change owner ship of app subdomain and all app owned subdomains
     * @returns return array of steps needed to change ownership
     *
     */
    async changeAppOwnership({
        namespace,
        newOwner,
        returnSteps,
    }: {
        namespace: string;
        newOwner: string;
        returnSteps?: boolean;
    }) {
        newOwner = parseDID(newOwner);
        const appNamespaces = [`${ENSNamespaceTypes.Roles}.${namespace}`, namespace];

        const { alreadyFinished, changeOwnerNamespaces, notOwnedNamespaces } = await this.validateChangeOwnership({
            newOwner,
            namespaces: appNamespaces,
        });

        if (notOwnedNamespaces.length > 0) {
            throw new ChangeOwnershipNotPossibleError({ namespace, notOwnedNamespaces });
        }
        const from = await this.getOwner({ namespace });

        if (alreadyFinished.length > 0) {
            console.log(`Already changed ownership of ${alreadyFinished.join(", ")}`);
        }

        const steps = changeOwnerNamespaces.map((namespace) => {
            const tx = this.changeDomainOwnerTx({ newOwner, namespace });
            return {
                tx,
                next: async ({ retryCheck }: { retryCheck?: boolean } = {}) => {
                    if (retryCheck) {
                        const owner = await this.getOwner({ namespace });
                        if (owner === newOwner) return;
                    }
                    return this.signerService.send({ calls: [tx], from });
                },
                info: `Changing ownership of ${namespace}`,
            };
        });

        if (returnSteps) {
            return steps;
        }
        await this.signerService.send({ calls: steps.map(({ tx }) => tx), from });
        return [];
    }

    /**
     * changeRoleOwnership
     *
     * @description change ownership of role subdomain
     *
     */
    async changeRoleOwnership({ namespace, newOwner }: { namespace: string; newOwner: string }) {
        newOwner = parseDID(newOwner);
        const notOwnedNamespaces = await this.validateOwnership({
            namespace,
            type: ENSNamespaceTypes.Roles,
        });
        if (notOwnedNamespaces.length > 0) {
            throw new ChangeOwnershipNotPossibleError({ namespace, notOwnedNamespaces });
        }
        const from = await this.getOwner({ namespace });
        await this.signerService.send({
            calls: [this.changeDomainOwnerTx({ namespace, newOwner })],
            from,
        });
    }

    /**
     * deleteOrganization
     *
     * @description delete organization and roles
     *
     */
    async deleteOrganization({ namespace, returnSteps }: { namespace: string; returnSteps?: boolean }) {
        const apps = this.cacheClient
            ? await this.getAppsByOrgNamespace({ namespace })
            : await this.getSubdomains({
                  domain: `${ENSNamespaceTypes.Application}.${namespace}`,
              });
        if (apps && apps.length > 0) {
            throw new Error(ERROR_MESSAGES.ORG_WITH_APPS);
        }
        const from = await this.getOwner({ namespace });

        const roles = this.cacheClient
            ? await this.cacheClient.getOrganizationRoles({ namespace })
            : await this.getSubdomains({ domain: `${ENSNamespaceTypes.Roles}.${namespace}` });

        if (roles && roles.length > 0) {
            throw new Error(ERROR_MESSAGES.ORG_WITH_ROLES);
        }

        const orgNamespaces = [
            `${ENSNamespaceTypes.Roles}.${namespace}`,
            `${ENSNamespaceTypes.Application}.${namespace}`,
            namespace,
        ];

        const { alreadyFinished, namespacesToDelete, notOwnedNamespaces } = await this.validateDeletePossibility({
            namespaces: orgNamespaces,
        });

        if (notOwnedNamespaces.length > 0) {
            throw new DeletingNamespaceNotPossibleError({ namespace, notOwnedNamespaces });
        }

        if (alreadyFinished.length > 0) {
            console.log(`Already deleted: ${alreadyFinished.join(", ")}`);
        }

        const steps = namespacesToDelete.map((namespace) => {
            const tx = this.deleteDomainTx({ namespace });
            return {
                tx,
                next: async ({ retryCheck }: { retryCheck?: boolean } = {}) => {
                    if (retryCheck) {
                        const owner = await this.getOwner({ namespace });
                        if (owner === emptyAddress) return;
                    }
                    return this.signerService.send({ calls: [tx], from });
                },
                info: `Deleting ${namespace}`,
            };
        });

        if (returnSteps) {
            return steps;
        }
        await this.signerService.send({ calls: steps.map(({ tx }) => tx), from });
        return [];
    }

    /**
     * deleteApplication
     *
     * @description delete application and roles
     *
     */
    async deleteApplication({ namespace, returnSteps }: { namespace: string; returnSteps?: boolean }) {
        const from = await this.getOwner({ namespace });

        const roles = this.cacheClient
            ? await this.cacheClient.getApplicationRoles({ namespace })
            : await this.getSubdomains({ domain: `${ENSNamespaceTypes.Roles}.${namespace}` });

        if (roles && roles.length > 0) {
            throw new Error(ERROR_MESSAGES.APP_WITH_ROLES);
        }

        const appNamespaces = [`${ENSNamespaceTypes.Roles}.${namespace}`, namespace];

        const { alreadyFinished, namespacesToDelete, notOwnedNamespaces } = await this.validateDeletePossibility({
            namespaces: appNamespaces,
        });

        if (notOwnedNamespaces.length > 0) {
            throw new DeletingNamespaceNotPossibleError({ namespace, notOwnedNamespaces });
        }

        if (alreadyFinished.length > 0) {
            console.log(`Already deleted: ${alreadyFinished.join(", ")}`);
        }

        const steps = namespacesToDelete.map((namespace) => {
            const tx = this.deleteDomainTx({ namespace });
            return {
                tx,
                next: async ({ retryCheck }: { retryCheck?: boolean } = {}) => {
                    if (retryCheck) {
                        const owner = await this.getOwner({ namespace });
                        if (owner === emptyAddress) return;
                    }
                    return this.signerService.send({ calls: [tx], from });
                },
                info: `Deleting ${namespace}`,
            };
        });

        if (returnSteps) {
            return steps;
        }
        await this.signerService.send({ calls: steps.map(({ tx }) => tx), from });
        return [];
    }

    /**
     * deleteRole
     *
     * @description delete role
     *
     */
    async deleteRole({ namespace }: { namespace: string }) {
        const notOwnedNamespaces = await this.validateOwnership({
            namespace,
            type: ENSNamespaceTypes.Roles,
        });
        if (notOwnedNamespaces.length > 0) {
            throw new DeletingNamespaceNotPossibleError({ namespace, notOwnedNamespaces });
        }
        await this.signerService.send({
            calls: [this.deleteDomainTx({ namespace })],
            from: await this.getOwner({ namespace }),
        });
    }

    /**
     * getRoleDefinition
     *
     * @description get role definition form ens domain metadata record
     * @returns metadata string or empty string when there is no metadata
     *
     */
    async getDefinition({
        type,
        namespace,
    }: {
        type: ENSNamespaceTypes;
        namespace: string;
    }): Promise<IRoleDefinition | IAppDefinition | IOrganizationDefinition> {
        if (this.cacheClient && type) {
            if (type === ENSNamespaceTypes.Roles) {
                return this.cacheClient.getRoleDefinition({ namespace });
            }
            if (type === ENSNamespaceTypes.Application) {
                return this.cacheClient.getAppDefinition({ namespace });
            }
            if (type === ENSNamespaceTypes.Organization) {
                return this.cacheClient.getOrgDefinition({ namespace });
            }
            throw new ENSTypeNotSupportedError();
        }
        if (this.domainDefinitionReader) {
            const roleHash = namehash(namespace);
            return await this.domainDefinitionReader.read({ node: roleHash });
        }
        throw new ENSResolverNotInitializedError();
    }

    /**
     * getRolesByNamespace
     *
     * @description get all subdomains for certain domain
     * @returns array of subdomains or empty array when there is no subdomains
     *
     */
    getRolesByNamespace({
        parentType,
        namespace,
    }: {
        parentType: ENSNamespaceTypes.Application | ENSNamespaceTypes.Organization;
        namespace: string;
    }) {
        if (!this.cacheClient) {
            throw new CacheClientNotProvidedError();
        }
        if (parentType === ENSNamespaceTypes.Organization) {
            return this.cacheClient.getOrganizationRoles({ namespace });
        }
        if (parentType === ENSNamespaceTypes.Application) {
            return this.cacheClient.getApplicationRoles({ namespace });
        }
        throw new ENSTypeNotSupportedError();
    }

    /**
     * getENSTypesByOwner
     */
    getENSTypesByOwner({
        type,
        owner,
        excludeSubOrgs = false,
    }: {
        type: ENSNamespaceTypes;
        owner: string;
        excludeSubOrgs?: boolean;
    }) {
        owner = parseDID(owner);
        if (!this.cacheClient) {
            throw new CacheClientNotProvidedError();
        }
        if (type === ENSNamespaceTypes.Organization) {
            return this.cacheClient.getOrganizationsByOwner({ owner, excludeSubOrgs });
        }
        if (type === ENSNamespaceTypes.Application) {
            return this.cacheClient.getApplicationsByOwner({ owner });
        }
        if (type === ENSNamespaceTypes.Roles) {
            return this.cacheClient.getRolesByOwner({ owner });
        }
        throw new ENSTypeNotSupportedError();
    }

    /**
     * getENSTypesBySearchPhrase
     */
    getENSTypesBySearchPhrase({ types, search }: { types?: ("App" | "Org" | "Role")[]; search: string }) {
        if (!this.cacheClient) {
            throw new CacheClientNotProvidedError();
        }

        return this.cacheClient.getNamespaceBySearchPhrase({ search, types });
    }

    /**
     * getENSTypesByOwner
     *
     * @description get all applications for organization namespace
     * @returns array of subdomains or empty array when there is no subdomains
     *
     */
    getAppsByOrgNamespace({ namespace }: { namespace: string }) {
        if (!this.cacheClient) {
            throw new CacheClientNotProvidedError();
        }
        return this.cacheClient.getApplicationsByOrganization({ namespace });
    }

    /**
     * getSubOrgsByOrgNamespace
     *
     * @description get all sub organizations for organization namespace
     * @returns array of subdomains or empty array when there is no subdomains
     *
     */
    getSubOrgsByOrgNamespace({ namespace }: { namespace: string }) {
        if (!this.cacheClient) {
            throw new CacheClientNotProvidedError();
        }
        return this.cacheClient.getSubOrganizationsByOrganization({ namespace });
    }

    /**
     * getOrgHierarchy
     *
     * @description get all hierarchy of an organization (20 levels deep)
     * @returns organization with all nested subOrgs
     *
     */
    async getOrgHierarchy({ namespace }: { namespace: string }): Promise<IOrganization> {
        if (!this.cacheClient) {
            throw new CacheClientNotProvidedError();
        }
        const org = await this.cacheClient.getOrgHierarchy({ namespace });
        [org, ...(org.subOrgs || []), ...(org.apps || []), ...(org.roles || [])].forEach(
            (domain) => (domain.isOwnedByCurrentUser = domain.owner === this.owner),
        );
        return org;
    }

    /**
     * getRoleDIDs
     *
     * @description get all users did which have certain role
     * @returns array of did's
     *
     */
    getRoleDIDs({ namespace }: { namespace: string }) {
        if (!this.cacheClient) {
            throw new CacheClientNotProvidedError();
        }
        return this.cacheClient.getDIDsForRole({ namespace });
    }

    /**
     * getSubdomains
     *
     * @description get all subdomains for certain domain
     * @returns array of subdomains or empty array when there is no subdomains
     *
     */
    async getSubdomains({
        domain,
        mode = "FIRSTLEVEL",
    }: {
        domain: string;
        mode?: "ALL" | "FIRSTLEVEL";
    }): Promise<string[]> {
        return this.domainHierarchy.getSubdomainsUsingResolver({
            domain,
            mode,
        });
    }

    /**
     * checkExistenceOfDomain
     *
     * @description check existence of domain in ENS registry
     * @returns true or false whatever the domain is present
     *
     */
    async checkExistenceOfDomain({ domain }: { domain: string }) {
        if (this.ensRegistry) {
            const domainHash = namehash(domain);
            const [exists, isOwned] = await Promise.all([
                this.ensRegistry.recordExists(domainHash),
                (async () => {
                    const owner = await this.ensRegistry?.owner(domainHash);
                    return owner !== emptyAddress;
                })(),
            ]);
            return exists && isOwned;
        }
        throw new ENSRegistryNotInitializedError();
    }

    /**
     * isOwner
     *
     * @description check ownership of the domain
     * @default if user is not specified it will check the current logged user
     * @returns true or false whatever the passed is user is a owner of domain
     *
     */
    async isOwner({ domain, user = this.owner }: { domain: string; user?: string }) {
        if (this.ensRegistry) {
            const domainHash = namehash(domain);
            const owner = await this.ensRegistry.owner(domainHash);
            return owner === user;
        }
        throw new ENSRegistryNotInitializedError();
    }

    /**
     * validateOwnership
     *
     * @description check ownership of the domain and subdomains of org, app or role
     * @returns true or false whatever the passed is user is a owner of org, app or role
     *
     */
    async validateOwnership({ namespace, type }: { namespace: string; type: ENSNamespaceTypes }) {
        return this.nonOwnedNodesOf({ namespace, type, owner: this._address as string });
    }

    protected async validateChangeOwnership({ namespaces, newOwner }: { namespaces: string[]; newOwner: string }) {
        const namespacesOwners = await this.namespacesWithRelations(namespaces);
        return namespacesOwners.reduce(
            (acc, { namespace, owner }) => {
                if (owner === newOwner) {
                    acc.alreadyFinished.push(namespace);
                    return acc;
                }
                if (owner === emptyAddress || owner === this._address) {
                    acc.changeOwnerNamespaces.push(namespace);
                    return acc;
                }
                acc.notOwnedNamespaces.push(namespace);
                return acc;
            },
            {
                notOwnedNamespaces: [],
                alreadyFinished: [],
                changeOwnerNamespaces: [],
            } as {
                notOwnedNamespaces: string[];
                alreadyFinished: string[];
                changeOwnerNamespaces: string[];
            },
        );
    }

    protected async validateDeletePossibility({ namespaces }: { namespaces: string[] }) {
        const namespacesOwners = await this.namespacesWithRelations(namespaces);
        return namespacesOwners.reduce(
            (acc, { namespace, owner }) => {
                if (owner === emptyAddress) {
                    acc.alreadyFinished.push(namespace);
                    return acc;
                }
                if (owner === this._address) {
                    acc.namespacesToDelete.push(namespace);
                    return acc;
                }
                acc.notOwnedNamespaces.push(namespace);
                return acc;
            },
            {
                notOwnedNamespaces: [],
                alreadyFinished: [],
                namespacesToDelete: [],
            } as {
                notOwnedNamespaces: string[];
                alreadyFinished: string[];
                namespacesToDelete: string[];
            },
        );
    }

    

    /**
     * In initial version of Switchboard, role definitions where contained in ENS PublicResolver.
     * However, in order for key properties of role definitions to be readable on-chain, a new RoleDefinitionResolver is used.
     * This function sets the resolver in the ENS to the new contract for definitions that are pointing to the old contract
     * @param domain domain to potentially update
     * @param data definition to apply to domain
     */
    async updateLegacyDefinition(
        domain: string,
        data: IAppDefinition | IOrganizationDefinition | IRoleDefinition,
    ): Promise<boolean> {
        const node = namehash(domain);
        const currentResolverAddress = await this.ensRegistry.resolver(node);
        const { ensPublicResolverAddress, ensResolverAddress, ensRegistryAddress } =
            this.configService[chainConfig[this.chainId]];
        if (currentResolverAddress === ensPublicResolverAddress) {
            const updateResolverTransaction: EncodedCall = {
                to: ensRegistryAddress,
                data: this.ensRegistry.interface.functions.setResolver.encode([node, ensResolverAddress]),
            };
            // Need to use newRole/newDomain as need to set reverse domain name
            const updateDomain = DomainReader.isRoleDefinition(data)
                ? this.domainDefinitionTransactionFactory.newRole({ domain, roleDefinition: data })
                : this.domainDefinitionTransactionFactory.newDomain({ domain, domainDefinition: data });
            await this.signerService.send({
                calls: [updateResolverTransaction, updateDomain],
                from: await this.getOwner({ namespace: domain }),
            });
            return true;
        }
        return false;
    }

    protected async getOwner({ namespace }: { namespace: string }) {
        const node = namehash(namespace);
        return this.ensRegistry.owner(node);
    }

    protected createSubdomainTx({
        domain,
        nodeName,
        owner = this.owner,
    }: {
        domain: string;
        nodeName: string;
        owner?: string;
    }): EncodedCall {
        return {
            to: this.ensRegistryAddress,
            data: this.ensRegistry.interface.functions.setSubnodeRecord.encode([
                namehash(domain),
                labelhash(nodeName),
                owner,
                this.ensResolverAddress,
                this.ttl,
            ]),
        };
    }

    protected changeSubdomainOwnerTx({
        newOwner,
        label,
        namespace,
    }: {
        newOwner: string;
        namespace: string;
        label: string;
    }): EncodedCall {
        return {
            to: this.ensRegistryAddress,
            data: this.ensRegistry.interface.functions.setSubnodeOwner.encode([
                namehash(namespace),
                labelhash(label),
                newOwner,
            ]),
        };
    }

    protected changeDomainOwnerTx({ newOwner, namespace }: { newOwner: string; namespace: string }): EncodedCall {
        return {
            to: this.ensRegistryAddress,
            data: this.ensRegistry.interface.functions.setOwner.encode([namehash(namespace), newOwner]),
        };
    }

    protected deleteSubdomainTx({ namespace }: { namespace: string }): EncodedCall {
        const namespaceArray = namespace.split(".");
        const node = namespaceArray.slice(1).join(".");
        const label = namespaceArray[0];
        return {
            to: this.ensRegistryAddress,
            data: this.ensRegistry.interface.functions.setSubnodeRecord.encode([
                namehash(node),
                labelhash(label),
                emptyAddress,
                emptyAddress,
                this.ttl,
            ]),
        };
    }

    protected async deleteDomain({ namespace }: { namespace: string }) {
        await this.signerService.send({
            calls: [this.deleteDomainTx({ namespace })],
            from: await this.getOwner({ namespace }),
        });
    }

    protected deleteDomainTx({ namespace }: { namespace: string }): EncodedCall {
        return {
            to: this.ensRegistryAddress,
            data: this.ensRegistry.interface.functions.setRecord.encode([
                namehash(namespace),
                emptyAddress,
                emptyAddress,
                this.ttl,
            ]),
        };
    }

    protected async deleteSubdomain({ namespace }: { namespace: string }) {
        await this.signerService.send({
            calls: [this.deleteSubdomainTx({ namespace })],
            from: await this.getOwner({
                namespace: namespace.split(".").slice(1).join(""),
            }),
        });
    }

    protected async nonOwnedNodesOf({
        namespace,
        type,
        owner,
    }: {
        namespace: string;
        type: ENSNamespaceTypes;
        owner: string;
    }) {
        if (![ENSNamespaceTypes.Roles, ENSNamespaceTypes.Application, ENSNamespaceTypes.Organization].includes(type)) {
            throw new Error(ERROR_MESSAGES.ENS_TYPE_NOT_SUPPORTED);
        }
        if (this.owner) {
            const namespacesToCheck =
                type === ENSNamespaceTypes.Roles
                    ? [namespace]
                    : type === ENSNamespaceTypes.Application
                    ? [namespace, ENSNamespaceTypes.Application]
                    : [namespace, ENSNamespaceTypes.Application, ENSNamespaceTypes.Organization];
            return Promise.all(namespacesToCheck.map((ns) => this.getOwner({ namespace: ns }))).then((owners) =>
                owners.filter((o) => ![owner, emptyAddress].includes(o)),
            );
        }
        throw new Error(ERROR_MESSAGES.USER_NOT_LOGGED_IN);
    }

    /**
     * @description Collects all namespaces related data. Currently its includes only owner
     * @param namespaces
     */
    async namespacesWithRelations(namespaces: string[]) {
        return Promise.all(
            namespaces.map(async (namespace) => {
                const owner = await this.getOwner({ namespace });
                return {
                    namespace,
                    owner,
                };
            }),
        );
    }
}
