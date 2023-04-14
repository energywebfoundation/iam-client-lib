import { IAppDefinition, IOrganizationDefinition, IRoleDefinitionV2, IRoleDefinition, EncodedCall, DomainReader } from '@energyweb/credential-governance';
import { CacheClient } from '../cache-client/cache-client.service';
import { RegistrationTypes } from '../claims/claims.types';
import { SignerService } from '../signer/signer.service';
import { NamespaceType, IOrganization, MulticallTx, SetRoleDefinitionOptions, CreateOrganizationOptions, ReturnStep, CreateApplicationOptions, CreateRoleOptions, ChangeOrgOwnershipOptions, ChangeAppOwnershipOptions, ReturnStepWithRetryCheck, ChangeRoleOwnershipOptions, DeleteOrganizationOptions, DeleteApplicationOptions, DeleteRoleOptions, GetDefinitionOptions, GetRolesByNamespaceOptions, IRole, GetENSTypesByOwnerOptions, IApp, GetSubdomainsOptions, CheckExistenceOfDomainOptions, IsOwnerOptions, ValidateOwnershipOptions, DomainDefinition } from './domains.types';
import { SearchType } from '../cache-client/cache-client.types';
/**
 * Service responsible for handling the request to ENS, creating roles/organizations/applications namespaces.
 * See more information about ENS and domains in IAM stack [here](https://energy-web-foundation.gitbook.io/energy-web/how-tos-and-tutorials/using-the-ethereum-name-service-ens).
 *
 * ```typescript
 * const { connectToCacheServer } = await initWithPrivateKeySigner(privateKey, rpcUrl);
 * const { domainsService } = await connectToCacheServer();
 * domainsService.createOrganization(...);
 * ```
 */
export declare class DomainsService {
    private _signerService;
    private _cacheClient;
    private chainId;
    private _ensRegistry;
    private _domainDefinitionReader;
    private _domainDefinitionTransactionFactory;
    private _domainHierarchy;
    private _owner;
    private _ensRegistryAddress;
    private _ensResolver;
    private _ensResolverV2Address;
    private _ensResolverAddress;
    private _ensPublicResolverAddress;
    private _ttl;
    constructor(_signerService: SignerService, _cacheClient: CacheClient);
    static create(signerService: SignerService, cacheClient: CacheClient): Promise<DomainsService>;
    init(): Promise<void>;
    /**
     * Update ENS domain definition for already created domain.
     *
     * ```typescript
     * domainsService.setRoleDefinition({
     *     name: 'auth.apps.energyweb.iam.ewc',
     *     data: {
     *         appName: 'Auth service',
     *     }
     * });
     * ```
     *
     * @param {SetRoleDefinitionOptions} options object containing options
     */
    setRoleDefinition({ domain, data, }: SetRoleDefinitionOptions): Promise<void>;
    /**
     * Create organization domain with given definition for given namespace.
     * Also includes creating subdomains for roles and applications. (roles.yourOrg.ewc, apps.yourOrg.ewc).
     *
     * ```typescript
     * domainsService.createOrganization({
     *     orgName: 'auth',
     *     namespace: 'energyweb.iam.ewc',
     *     data: {
     *         orgName: 'Auth service',
     *     },
     *     returnSteps: true,
     * });
     * ```
     *
     * @param {CreateOrganizationOptions} options object containing options
     * @returns array of steps if `returnSteps` is true
     */
    createOrganization({ orgName, namespace, data, returnSteps, }: CreateOrganizationOptions): Promise<ReturnStep[] | undefined>;
    /**
     * Create application domain with given definition for given namespace.
     * Also includes creating subdomain for roles. (roles.yourApp.apps.yourOrg.ewc).
     *
     * ```typescript
     * domainsService.createApplication({
     *     appName: 'auth',
     *     namespace: 'apps.energyweb.iam.ewc',
     *     data: {
     *         appName: 'Auth service',
     *     },
     *     returnSteps: true,
     * });
     * ```
     *
     * @param {CreateApplicationOptions} options object containing options
     * @returns array of steps if `returnSteps` is true
     */
    createApplication({ appName, namespace: domain, data, returnSteps, }: CreateApplicationOptions): Promise<ReturnStep[] | undefined>;
    /**
     * Create role domain with given definition for given namespace.
     *
     * ```typescript
     * domainsService.createRole({
     *     appName: 'root',
     *     namespace: 'roles.energyweb.iam.ewc',
     *     data: {
     *         version: 1,
     *         issuer: {
     *             issuerType: 'DID',
     *             did: ['did:ethr:volta:0x00...0'],
     *         },
     *         revoker: {
     *             issuerType: 'DID',
     *             did: ['did:ethr:volta:0x00...0'],
     *         },
     *         enrolmentPreconditions: [],
     *     },
     *     returnSteps: true,
     * });
     * ```
     *
     * @param {CreateRoleOptions} options object containing options
     * @returns array of steps if `returnSteps` is true
     */
    createRole({ roleName, namespace, data, returnSteps, }: CreateRoleOptions): Promise<ReturnStep[] | undefined>;
    readName(namehashToRead: string): Promise<string>;
    /**
     * Change owner of organization domain including all subdomains.
     *
     * ```typescript
     * domainsService.changeOrgOwnership({
     *     namespace: 'energyweb.iam.ewc',
     *     newOwner: '0x00...0',
     *     returnSteps: true,
     *     withSubdomains: true,
     * });
     * ```
     *
     * @param {ChangeOrgOwnershipOptions} options object containing options
     * @returns array of steps if `returnSteps` is true
     */
    changeOrgOwnership({ namespace, newOwner, returnSteps, withSubdomains, }: ChangeOrgOwnershipOptions): Promise<MulticallTx | undefined>;
    /**
     * Change owner of application domain.
     *
     * ```typescript
     * domainsService.changeAppOwnership({
     *     namespace: 'auth.apps.energyweb.iam.ewc',
     *     newOwner: '0x00...0',
     *     returnSteps: true,
     * });
     * ```
     *
     * @param {ChangeAppOwnershipOptions} options object containing options
     * @returns array of steps if `returnSteps` is true
     */
    changeAppOwnership({ namespace, newOwner, returnSteps, }: ChangeAppOwnershipOptions): Promise<ReturnStepWithRetryCheck[] | undefined>;
    /**
     * Change owner of role domain.
     *
     * ```typescript
     * domainsService.changeRoleOwnership({
     *     namespace: 'root.roles.energyweb.iam.ewc',
     *     newOwner: '0x00...0',
     * });
     * ```
     *
     * @param {ChangeRoleOwnershipOptions} options object containing options
     */
    changeRoleOwnership({ namespace, newOwner, }: ChangeRoleOwnershipOptions): Promise<void>;
    /**
     * Delete organization domain and all subdomains.
     *
     * ```typescript
     * domainsService.deleteOrganization({
     *     namespace: 'energyweb.iam.ewc',
     *     returnSteps: true,
     * });
     * ```
     *
     * @param {DeleteOrganizationOptions} options object containing options
     * @returns array of steps if `returnSteps` is true
     */
    deleteOrganization({ namespace, returnSteps, }: DeleteOrganizationOptions): Promise<ReturnStepWithRetryCheck[] | undefined>;
    /**
     * Delete application domain and all subdomains.
     *
     * ```typescript
     * domainsService.deleteApplication({
     *     namespace: 'auth.apps.energyweb.iam.ewc',
     *     returnSteps: true,
     * });
     * ```
     *
     * @param {DeleteApplicationOptions} options object containing options
     * @returns array of steps if `returnSteps` is true
     */
    deleteApplication({ namespace, returnSteps, }: DeleteApplicationOptions): Promise<ReturnStepWithRetryCheck[] | undefined>;
    /**
     * Delete role domain.
     *
     * ```typescript
     * domainsService.deleteRole({
     *     namespace: 'auth.roles.energyweb.iam.ewc',
     * });
     * ```
     *
     * @param {DeleteRoleOptions} options object containing options
     */
    deleteRole({ namespace }: DeleteRoleOptions): Promise<void>;
    /**
     * Fetch cached domain definition for organization, application or role.
     *
     * ```typescript
     * domainsService.getDefinition({
     *     type: NamespaceType.Role,
     *     namespace: 'auth.roles.energyweb.iam.ewc',
     * });
     * ```
     *
     * @param {DeleteRoleOptions} options object containing options
     * @return domain definition
     */
    getDefinition({ type, namespace, }: GetDefinitionOptions): Promise<IRoleDefinition | IRoleDefinitionV2 | IAppDefinition | IOrganizationDefinition>;
    /**
     * Fetch all roles subdomains for certain domain.
     *
     * ```typescript
     * domainsService.getRolesByNamespace({
     *     parentType: NamespaceType.Application,
     *     namespace: 'auth.apps.energyweb.iam.ewc',
     * });
     * ```
     *
     * @param {GetRolesByNamespaceOptions} options object containing options
     * @returns array of role subdomains
     */
    getRolesByNamespace({ parentType, namespace, }: GetRolesByNamespaceOptions): Promise<IRole[]>;
    /**
     * Get all roles that a DID can issue.
     *
     * ```typescript
     * domainsService.getAllowedRolesByIssuer('did:ethr:0x00...0');
     * ```
     *
     * @param {String} did issuer DID
     * @returns array of roles that the DID can issue
     */
    getAllowedRolesByIssuer(did: string): Promise<IRole[]>;
    /**
     * Get all roles that a DID can revoke.
     *
     * ```typescript
     * domainsService.getAllowedRolesByRevoker('did:ethr:0x00...0');
     * ```
     *
     * @param {String} did issuer DID
     * @returns array of roles that the DID can issue
     */
    getAllowedRolesByRevoker(did: string): Promise<IRole[]>;
    /**
     * Get all organization/application/role for certain owner.
     *
     * ```typescript
     * domainsService.getENSTypesByOwner({
     *     type: NamespaceType.Organization,
     *     owner: '0x00...0',
     *     withRelations: true,
     * });
     * ```
     *
     * @param {GetENSTypesByOwnerOptions} options object containing options
     * @returns array of organizations/applications/roles for certain owner
     */
    getENSTypesByOwner({ type, owner, withRelations, }: GetENSTypesByOwnerOptions): Promise<IOrganization[] | IApp[] | IRole[]>;
    /**
     * Search for organization/application/role with a given search phrase.
     *
     * ```typescript
     * domainsService.getENSTypesBySearchPhrase({
     *     types: [SearchType.App, SearchType.Org, SearchType.Role],
     *     search: 'energyweb',
     * });
     * ```
     *
     * @param {String} search search phrase
     * @param {Array<SearchType>} types ENS types to search
     * @returns array of founded organizations/applications/roles
     */
    getENSTypesBySearchPhrase(search: string, types?: SearchType[]): Promise<(IOrganization | IApp | IRole)[]>;
    /**
     * Fetch all applications for organization namespace.
     *
     * ```typescript
     * domainsService.getAppsOfOrg('energyweb.iam.ewc');
     * ```
     *
     * @param {String} org organization namespace
     * @returns array of applications
     */
    getAppsOfOrg(org: string): Promise<IApp[]>;
    /**
     * Fetch all sub-organizations for organization namespace.
     *
     * ```typescript
     * domainsService.getSubOrgsByOrgNamespace('energyweb.iam.ewc');
     * ```
     *
     * @param {String} namespace organization namespace
     * @returns array of sub-organizations
     */
    getSubOrgsByOrgNamespace(namespace: string): Promise<IOrganization[]>;
    /**
     * Get organization hierarchy. Max 20 levels deep.
     *
     * ```typescript
     * domainsService.getOrgHierarchy('energyweb.iam.ewc');
     * ```
     *
     * @param {String} namespace organization namespace
     * @returns organization with all nested sub-organizations
     */
    getOrgHierarchy(namespace: string): Promise<IOrganization>;
    /**
     * Get users did which have certain role.
     *
     * ```typescript
     * domainsService.getDIDsByRole('auth.roles.energyweb.iam.ewc');
     * ```
     *
     * @param {String} role role namespace
     * @returns array of users DID
     */
    getDIDsByRole(role: string): Promise<string[]>;
    /**
     * Fetch subdomains for certain domain.
     *
     * ```typescript
     * domainsService.getSubdomains({
     *     domain: 'energyweb.iam.ewc',
     *     mode: 'ALL',
     * });
     * ```
     *
     * @param {GetSubdomainsOptions} options object containing options
     * @returns array of subdomains
     */
    getSubdomains({ domain, mode, }: GetSubdomainsOptions): Promise<string[]>;
    /**
     * Check if domain exists in ENS registry.
     *
     * ```typescript
     * domainsService.checkExistenceOfDomain({
     *     domain: 'some.energyweb.iam.ewc',
     * });
     * ```
     *
     * @param {CheckExistenceOfDomainOptions} options object containing options
     * @return true if domain exists, false otherwise
     */
    checkExistenceOfDomain({ domain, }: CheckExistenceOfDomainOptions): Promise<boolean>;
    /**
     * Check if user is owner of the domain.
     *
     * ```typescript
     * domainsService.isOwner({
     *     domain: 'energyweb.iam.ewc',
     *     user: '0x00...0',
     * });
     * ```
     *
     * @param {IsOwnerOptions} options object containing options
     * @return true if user is owner, false otherwise
     */
    isOwner({ domain, user, }: IsOwnerOptions): Promise<boolean>;
    /**
     * Get not owned domains in given namespace for current user.
     *
     * ```typescript
     * domainsService.validateOwnership({
     *     namespace: 'energyweb.iam.ewc',
     *     type: NamespaceType.Organization,
     * });
     * ```
     *
     * @param {ValidateOwnershipOptions} options object containing options
     * @returns array of not owned domains
     */
    validateOwnership({ namespace, type, }: ValidateOwnershipOptions): Promise<string[]>;
    /**
     * Move domain to latest version of resolver.
     *
     * In initial version, role definitions where contained in ENS PublicResolver.
     * However, in order for key properties of role definitions to be readable on-chain, a new RoleDefinitionResolver is used.
     * This function sets the resolver in the ENS to the new contract for definitions that are pointing to the old contract.
     *
     * ```typescript
     * domainsService.updateLegacyDefinition({
     *     namespace: 'energyweb.iam.ewc',
     *     data: {
     *          orgName: 'Energy Web Foundation',
     *     },
     * });
     *
     * @param {String} domain domain namespace to update
     * @param {DomainDefinition} data definition to apply to domain
     * @return true if domain was updated, false otherwise
     */
    updateLegacyDefinition(domain: string, data: DomainDefinition): Promise<boolean>;
    /**
     * Get possible registration types for given roles.
     *
     * ```typescript
     * domainsService.registrationTypesOfRoles(['root.roles.energyweb.iam.ewc', 'admin.roles.energyweb.iam.ewc']);
     *
     * @param {Array<String>} roles array of roles
     * @return object containing registration types for given roles as keys
     */
    registrationTypesOfRoles(roles: string[]): Promise<Record<string, Set<RegistrationTypes>>>;
    /**
     * Collect related data for given domain. Currently only related data is owner.
     *
     * ```typescript
     * domainsService.namespacesWithRelations(['root.roles.energyweb.iam.ewc', 'admin.roles.energyweb.iam.ewc']);
     *
     * @param {Array<String>} namespaces array of namespaces
     * @return object containing registration types for given roles as keys
     */
    namespacesWithRelations(namespaces: string[]): Promise<{
        namespace: string;
        owner: string;
    }[]>;
    protected validateChangeOwnership({ namespaces, newOwner, }: {
        namespaces: string[];
        newOwner: string;
    }): Promise<{
        notOwnedNamespaces: string[];
        alreadyFinished: string[];
        changeOwnerNamespaces: string[];
    }>;
    protected validateDeletePossibility({ namespaces, }: {
        namespaces: string[];
    }): Promise<{
        notOwnedNamespaces: string[];
        alreadyFinished: string[];
        namespacesToDelete: string[];
    }>;
    protected getOwner({ namespace }: {
        namespace: string;
    }): Promise<string>;
    protected createSubdomainTx({ domain, nodeName, owner, }: {
        domain: string;
        nodeName: string;
        owner?: string;
    }): EncodedCall;
    protected changeSubdomainOwnerTx({ newOwner, label, namespace, }: {
        newOwner: string;
        namespace: string;
        label: string;
    }): EncodedCall;
    protected changeDomainOwnerTx({ newOwner, namespace, }: {
        newOwner: string;
        namespace: string;
    }): EncodedCall;
    protected deleteSubdomainTx({ namespace, }: {
        namespace: string;
    }): EncodedCall;
    protected deleteDomain({ namespace }: {
        namespace: string;
    }): Promise<void>;
    protected deleteDomainTx({ namespace }: {
        namespace: string;
    }): EncodedCall;
    protected deleteSubdomain({ namespace }: {
        namespace: string;
    }): Promise<void>;
    protected nonOwnedNodesOf({ namespace, type, owner, }: {
        namespace: string;
        type: NamespaceType;
        owner: string;
    }): Promise<string[]>;
    /**
     * Checks that a provided owner/newOwner address is a valid ethereum address
     * @param owner owner address to validate
     */
    private static validateOwnerAddress;
    get domainReader(): DomainReader;
}
