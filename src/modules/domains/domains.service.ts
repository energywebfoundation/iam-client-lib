import { BigNumber, utils } from "ethers";
import {
    IAppDefinition,
    IOrganizationDefinition,
    IRoleDefinition,
    EncodedCall,
    DomainReader,
    DomainTransactionFactory,
    ResolverContractType,
    DomainHierarchy,
} from "@energyweb/iam-contracts";
import { ENSRegistry } from "../../../ethers/ENSRegistry";
import { ENSRegistry__factory } from "../../../ethers/factories/ENSRegistry__factory";
import { chainConfigs } from "../../config/chain.config";
import {
    ChangeOwnershipNotPossibleError,
    DeletingNamespaceNotPossibleError,
    ENSTypeNotSupportedError,
    ERROR_MESSAGES,
} from "../../errors";
import { emptyAddress } from "../../utils/constants";
import { parseDID } from "../../utils/did";
import { labelhash } from "../../utils/ENS_hash";
import { CacheClient } from "../cacheClient/cacheClient.service";
import { RegistrationTypes } from "../claims/claims.types";
import { SignerService } from "../signer/signer.service";
import { ENSNamespaceTypes, IOrganization } from "./domains.types";
import { NamespaceType } from "../cacheClient";

const { namehash } = utils;

export class DomainsService {
    private chainId: number;
    private _ensRegistry: ENSRegistry;
    private _domainDefinitionReader: DomainReader;
    private _domainDefinitionTransactionFactory: DomainTransactionFactory;
    private _domainHierarchy: DomainHierarchy;
    private _owner: string;
    private _ensRegistryAddress: string;
    private _ensResolverAddress: string;
    private _ensPublicResolverAddress: string;
    private _ttl = BigNumber.from(0);

    constructor(private _signerService: SignerService, private _cacheClient: CacheClient) {
        this._signerService.onInit(async () => await this.init());
    }

    static async create(signerService: SignerService, cacheClient: CacheClient) {
        const service = new DomainsService(signerService, cacheClient);
        await service.init();
        return service;
    }

    async init() {
        const chainId = this._signerService.chainId;
        const provider = this._signerService.signer.provider;
        const { ensRegistryAddress, ensResolverAddress, ensPublicResolverAddress, domainNotifierAddress } =
            chainConfigs()[chainId];
        this._ensRegistryAddress = ensRegistryAddress;
        this._ensResolverAddress = ensResolverAddress;
        this._ensPublicResolverAddress = ensPublicResolverAddress;
        this._ensRegistry = new ENSRegistry__factory().attach(ensRegistryAddress).connect(provider);
        this._domainDefinitionReader = new DomainReader({
            ensRegistryAddress,
            provider,
        });
        ensPublicResolverAddress &&
            this._domainDefinitionReader.addKnownResolver({
                chainId,
                address: ensPublicResolverAddress,
                type: ResolverContractType.PublicResolver,
            });
        ensResolverAddress &&
            this._domainDefinitionReader.addKnownResolver({
                chainId,
                address: ensResolverAddress,
                type: ResolverContractType.RoleDefinitionResolver_v1,
            });
        this._domainDefinitionTransactionFactory = new DomainTransactionFactory({
            domainResolverAddress: ensResolverAddress,
        });
        this._domainHierarchy = new DomainHierarchy({
            domainReader: this._domainDefinitionReader,
            ensRegistryAddress: this._ensRegistryAddress,
            provider,
            domainNotifierAddress: domainNotifierAddress,
            publicResolverAddress: ensPublicResolverAddress,
        });
        this._owner = await this._signerService.signer.getAddress();
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
        await this._signerService.send({
            ...this._domainDefinitionTransactionFactory.editDomain({ domain, domainDefinition: data }),
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
        if (!(await this.isOwner({ domain: namespace, user: this._owner }))) {
            throw new Error(ERROR_MESSAGES.NOT_AUTHORIZED_TO_CHANGE_DOMAIN);
        }
        const steps = [
            {
                tx: this.createSubdomainTx({ domain: namespace, nodeName: orgName, owner: this._owner }),
                info: "Create organization subdomain",
            },
            {
                tx: this._domainDefinitionTransactionFactory.newDomain({
                    domain: orgDomain,
                    domainDefinition: data,
                }),
                info: "Register reverse name and set definition for organization subdomain",
            },
            {
                tx: this.createSubdomainTx({
                    domain: orgDomain,
                    nodeName: ENSNamespaceTypes.Roles,
                    owner: this._owner,
                }),
                info: "Create roles subdomain for organization",
            },
            {
                tx: this._domainDefinitionTransactionFactory.setDomainNameTx({ domain: rolesDomain }),
                info: "Register reverse name for roles subdomain",
            },
            {
                tx: this.createSubdomainTx({
                    domain: orgDomain,
                    nodeName: ENSNamespaceTypes.Application,
                    owner: this._owner,
                }),
                info: "Create app subdomain for organization",
            },
            {
                tx: this._domainDefinitionTransactionFactory.setDomainNameTx({ domain: appsDomain }),
                info: "Register reverse name for app subdomain",
            },
        ].map((step) => ({
            ...step,
            next: async () => {
                await this._signerService.send({ ...step.tx });
            },
        }));
        if (returnSteps) {
            return steps;
        } else {
            for await (const step of steps) {
                await step.next();
            }
            return;
        }
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
                tx: this._domainDefinitionTransactionFactory.newDomain({ domainDefinition: data, domain: appDomain }),
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
                tx: this._domainDefinitionTransactionFactory.setDomainNameTx({
                    domain: `${ENSNamespaceTypes.Roles}.${appDomain}`,
                }),
                info: "Set name for roles subdomain for application",
            },
        ].map((step) => ({
            ...step,
            next: async () => {
                await this._signerService.send(step.tx);
            },
        }));
        if (returnSteps) {
            return steps;
        }
        for await (const step of steps) {
            await step.next();
        }
        return;
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
                tx: this._domainDefinitionTransactionFactory.newRole({ domain: newDomain, roleDefinition: data }),
                info: "Set name and definition for role",
            },
        ].map((step) => ({
            ...step,
            next: async () => {
                await this._signerService.send(step.tx);
            },
        }));
        if (returnSteps) {
            return steps;
        }
        for await (const step of steps) {
            await step.next();
        }
        return;
    }

    async readName(namehash: string) {
        return this._domainDefinitionReader.readName(namehash);
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

        const apps = this._cacheClient
            ? await this.getAppsOfOrg(namespace)
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
                    return this._signerService.send(tx);
                },
                info: `Changing ownership of ${namespace}`,
            };
        });

        if (returnSteps) {
            return steps;
        }
        for await (const step of steps) {
            await step.next();
        }
        return;
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
                    return this._signerService.send(tx);
                },
                info: `Changing ownership of ${namespace}`,
            };
        });

        if (returnSteps) {
            return steps;
        }
        for await (const step of steps) {
            await step.next();
        }
        return;
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
        await this._signerService.send(this.changeDomainOwnerTx({ namespace, newOwner }));
    }

    /**
     * deleteOrganization
     *
     * @description delete organization and roles
     *
     */
    async deleteOrganization({ namespace, returnSteps }: { namespace: string; returnSteps?: boolean }) {
        const apps = this._cacheClient
            ? await this.getAppsOfOrg(namespace)
            : await this.getSubdomains({
                  domain: `${ENSNamespaceTypes.Application}.${namespace}`,
              });
        if (apps && apps.length > 0) {
            throw new Error(ERROR_MESSAGES.ORG_WITH_APPS);
        }

        const roles = this._cacheClient
            ? await this._cacheClient.getOrganizationRoles(namespace)
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
                    return this._signerService.send(tx);
                },
                info: `Deleting ${namespace}`,
            };
        });

        if (returnSteps) {
            return steps;
        }
        for await (const step of steps) {
            await step.next();
        }
        return;
    }

    /**
     * deleteApplication
     *
     * @description delete application and roles
     *
     */
    async deleteApplication({ namespace, returnSteps }: { namespace: string; returnSteps?: boolean }) {
        const roles = this._cacheClient
            ? await this._cacheClient.getApplicationRoles(namespace)
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
                    return this._signerService.send(tx);
                },
                info: `Deleting ${namespace}`,
            };
        });

        if (returnSteps) {
            return steps;
        }
        for await (const step of steps) {
            await step.next();
        }
        return;
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
        await this._signerService.send(this.deleteDomainTx({ namespace }));
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
        if (type === ENSNamespaceTypes.Roles) {
            return this._cacheClient.getRoleDefinition(namespace);
        }
        if (type === ENSNamespaceTypes.Application) {
            return this._cacheClient.getAppDefinition(namespace);
        }
        if (type === ENSNamespaceTypes.Organization) {
            return this._cacheClient.getOrgDefinition(namespace);
        }
        throw new ENSTypeNotSupportedError();
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
        if (parentType === ENSNamespaceTypes.Organization) {
            return this._cacheClient.getOrganizationRoles(namespace);
        }
        if (parentType === ENSNamespaceTypes.Application) {
            return this._cacheClient.getApplicationRoles(namespace);
        }
        throw new ENSTypeNotSupportedError();
    }

    /**
     * getENSTypesByOwner
     */
    getENSTypesByOwner({
        type,
        owner,
        withRelations = true,
    }: {
        type: ENSNamespaceTypes;
        owner: string;
        withRelations?: boolean;
    }) {
        owner = parseDID(owner);
        if (type === ENSNamespaceTypes.Organization) {
            return this._cacheClient.getOrganizationsByOwner(owner, withRelations);
        }
        if (type === ENSNamespaceTypes.Application) {
            return this._cacheClient.getApplicationsByOwner(owner, withRelations);
        }
        if (type === ENSNamespaceTypes.Roles) {
            return this._cacheClient.getRolesByOwner(owner);
        }
        throw new ENSTypeNotSupportedError();
    }

    /**
     * getENSTypesBySearchPhrase
     */
    getENSTypesBySearchPhrase(search: string, types?: NamespaceType[]) {
        return this._cacheClient.getNamespaceBySearchPhrase(search, types);
    }

    /**
     * getENSTypesByOwner
     *
     * @description get all applications for organization namespace
     * @returns array of subdomains or empty array when there is no subdomains
     *
     */
    getAppsOfOrg(org: string) {
        return this._cacheClient.getApplicationsByOrganization(org);
    }

    /**
     * getSubOrgsByOrgNamespace
     *
     * @description get all sub organizations for organization namespace
     * @returns array of subdomains or empty array when there is no subdomains
     *
     */
    getSubOrgsByOrgNamespace(namespace: string) {
        return this._cacheClient.getSubOrganizationsByOrganization(namespace);
    }

    /**
     * getOrgHierarchy
     *
     * @description get all hierarchy of an organization (20 levels deep)
     * @returns organization with all nested subOrgs
     *
     */
    async getOrgHierarchy(namespace: string): Promise<IOrganization> {
        const org = await this._cacheClient.getOrgHierarchy(namespace);
        [org, ...(org.subOrgs || []), ...(org.apps || []), ...(org.roles || [])].forEach(
            (domain) => (domain.isOwnedByCurrentUser = domain.owner === this._owner),
        );
        return org;
    }

    /**
     * getDIDsByRole
     *
     * @description get all users did which have certain role
     * @returns array of did's
     *
     */
    getDIDsByRole(role: string) {
        return this._cacheClient.getDIDsForRole(role);
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
        return this._domainHierarchy.getSubdomainsUsingResolver({
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
        const domainHash = namehash(domain);
        const [exists, isOwned] = await Promise.all([
            this._ensRegistry.recordExists(domainHash),
            (async () => {
                const owner = await this._ensRegistry?.owner(domainHash);
                return owner !== emptyAddress;
            })(),
        ]);
        return exists && isOwned;
    }

    /**
     * isOwner
     *
     * @description check ownership of the domain
     * @default if user is not specified it will check the current logged user
     * @returns true or false whatever the passed is user is a owner of domain
     *
     */
    async isOwner({ domain, user = this._owner }: { domain: string; user?: string }) {
        const domainHash = namehash(domain);
        const owner = await this._ensRegistry.owner(domainHash);
        return owner === user;
    }

    /**
     * validateOwnership
     *
     * @description check ownership of the domain and subdomains of org, app or role
     * @returns true or false whatever the passed is user is a owner of org, app or role
     *
     */
    async validateOwnership({ namespace, type }: { namespace: string; type: ENSNamespaceTypes }) {
        return this.nonOwnedNodesOf({ namespace, type, owner: this._owner });
    }

    protected async validateChangeOwnership({ namespaces, newOwner }: { namespaces: string[]; newOwner: string }) {
        const namespacesOwners = await this.namespacesWithRelations(namespaces);
        return namespacesOwners.reduce(
            (acc, { namespace, owner }) => {
                if (owner === newOwner) {
                    acc.alreadyFinished.push(namespace);
                    return acc;
                }
                if (owner === emptyAddress || owner === this._owner) {
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
                if (owner === this._owner) {
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
        const currentResolverAddress = await this._ensRegistry.resolver(node);
        const { ensPublicResolverAddress, ensResolverAddress, ensRegistryAddress } = chainConfigs()[this.chainId];
        if (currentResolverAddress === ensPublicResolverAddress) {
            const updateResolverTransaction: EncodedCall = {
                to: ensRegistryAddress,
                data: this._ensRegistry.interface.encodeFunctionData("setResolver", [node, ensResolverAddress]),
            };
            // Need to use newRole/newDomain as need to set reverse domain name
            const updateDomain = DomainReader.isRoleDefinition(data)
                ? this._domainDefinitionTransactionFactory.newRole({ domain, roleDefinition: data })
                : this._domainDefinitionTransactionFactory.newDomain({ domain, domainDefinition: data });
            await this._signerService.send(updateResolverTransaction);
            await this._signerService.send(updateDomain);
            return true;
        }
        return false;
    }

    async registrationTypesOfRoles(roles: string[]): Promise<Record<string, Set<RegistrationTypes>>> {
        const types: Record<string, Set<RegistrationTypes>> = roles.reduce(
            (acc, role) => ({ ...acc, [role]: new Set() }),
            {},
        );
        for await (const role of roles) {
            const def = await this.getDefinition({ type: ENSNamespaceTypes.Roles, namespace: role });
            if (!DomainReader.isRoleDefinition(def)) {
                continue;
            }
            const resolver = await this._ensRegistry.resolver(namehash(role));
            if (resolver === this._ensResolverAddress) {
                types[role].add(RegistrationTypes.OnChain);
                types[role].add(RegistrationTypes.OffChain);
            } else if (resolver === this._ensPublicResolverAddress) {
                types[role].add(RegistrationTypes.OffChain);
            }
        }
        return types;
    }

    protected async getOwner({ namespace }: { namespace: string }) {
        const node = namehash(namespace);
        return this._ensRegistry.owner(node);
    }

    protected createSubdomainTx({
        domain,
        nodeName,
        owner = this._owner,
    }: {
        domain: string;
        nodeName: string;
        owner?: string;
    }): EncodedCall {
        return {
            to: this._ensRegistryAddress,
            data: this._ensRegistry.interface.encodeFunctionData("setSubnodeRecord", [
                namehash(domain),
                labelhash(nodeName),
                owner,
                this._ensResolverAddress,
                this._ttl,
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
            to: this._ensRegistryAddress,
            data: this._ensRegistry.interface.encodeFunctionData("setSubnodeOwner", [
                namehash(namespace),
                labelhash(label),
                newOwner,
            ]),
        };
    }

    protected changeDomainOwnerTx({ newOwner, namespace }: { newOwner: string; namespace: string }): EncodedCall {
        return {
            to: this._ensRegistryAddress,
            data: this._ensRegistry.interface.encodeFunctionData("setOwner", [namehash(namespace), newOwner]),
        };
    }

    protected deleteSubdomainTx({ namespace }: { namespace: string }): EncodedCall {
        const namespaceArray = namespace.split(".");
        const node = namespaceArray.slice(1).join(".");
        const label = namespaceArray[0];
        return {
            to: this._ensRegistryAddress,
            data: this._ensRegistry.interface.encodeFunctionData("setSubnodeRecord", [
                namehash(node),
                labelhash(label),
                emptyAddress,
                emptyAddress,
                this._ttl,
            ]),
        };
    }

    protected async deleteDomain({ namespace }: { namespace: string }) {
        await this._signerService.send(this.deleteDomainTx({ namespace }));
    }

    protected deleteDomainTx({ namespace }: { namespace: string }): EncodedCall {
        return {
            to: this._ensRegistryAddress,
            data: this._ensRegistry.interface.encodeFunctionData("setRecord", [
                namehash(namespace),
                emptyAddress,
                emptyAddress,
                this._ttl,
            ]),
        };
    }

    protected async deleteSubdomain({ namespace }: { namespace: string }) {
        await this._signerService.send(this.deleteSubdomainTx({ namespace }));
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
