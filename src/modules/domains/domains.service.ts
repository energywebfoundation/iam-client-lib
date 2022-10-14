import { BigNumber } from 'ethers';
import {
  IAppDefinition,
  IOrganizationDefinition,
  IRoleDefinitionV2,
  IRoleDefinition,
  EncodedCall,
  DomainReader,
  ResolverContractType,
  DomainHierarchy,
  VOLTA_CHAIN_ID,
  DomainTransactionFactoryV2,
} from '@energyweb/credential-governance';
import { ENSRegistry } from '../../../ethers/ENSRegistry';
import { ENSRegistry__factory } from '../../../ethers/factories/ENSRegistry__factory';
import { chainConfigs } from '../../config/chain.config';
import {
  ChangeOwnershipNotPossibleError,
  DeletingNamespaceNotPossibleError,
  ENSTypeNotSupportedError,
  ENSOwnerNotValidAddressError,
  ERROR_MESSAGES,
} from '../../errors';
import { emptyAddress } from '../../utils/constants';
import { labelhash, namehash } from '../../utils/ens-hash';
import { CacheClient } from '../cache-client/cache-client.service';
import { RegistrationTypes } from '../claims/claims.types';
import { SignerService } from '../signer/signer.service';
import {
  NamespaceType,
  IOrganization,
  MulticallTx,
  SetRoleDefinitionOptions,
  CreateOrganizationOptions,
  ReturnStep,
  CreateApplicationOptions,
  CreateRoleOptions,
  ChangeOrgOwnershipOptions,
  ChangeAppOwnershipOptions,
  ReturnStepWithRetryCheck,
  ChangeRoleOwnershipOptions,
  DeleteOrganizationOptions,
  DeleteApplicationOptions,
  DeleteRoleOptions,
  GetDefinitionOptions,
  GetRolesByNamespaceOptions,
  IRole,
  GetENSTypesByOwnerOptions,
  IApp,
  GetSubdomainsOptions,
  CheckExistenceOfDomainOptions,
  IsOwnerOptions,
  ValidateOwnershipOptions,
  DomainDefinition,
} from './domains.types';
import { SearchType } from '../cache-client/cache-client.types';
import { validateAddress } from '../../utils/address';
import { UnregisteredResolverError } from '../../errors/unregistered-resolver.error';
import { castToV2 } from './domains.types';
import { getLogger } from '../../config/logger.config';

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
export class DomainsService {
  private chainId: number;
  private _ensRegistry: ENSRegistry;
  private _domainDefinitionReader: DomainReader;
  private _domainDefinitionTransactionFactory: DomainTransactionFactoryV2;
  private _domainHierarchy: DomainHierarchy;
  private _owner: string;
  private _ensRegistryAddress: string;
  private _ensResolver: string;
  private _ensResolverV2Address: string;
  private _ensResolverAddress: string;
  private _ensPublicResolverAddress: string;
  private _ttl = BigNumber.from(0);

  constructor(
    private _signerService: SignerService,
    private _cacheClient: CacheClient
  ) {
    this._signerService.onInit(this.init.bind(this));
  }

  static async create(signerService: SignerService, cacheClient: CacheClient) {
    const service = new DomainsService(signerService, cacheClient);
    await service.init();
    return service;
  }

  async init() {
    const chainId = this._signerService.chainId;
    this.chainId = chainId;
    const provider = this._signerService.provider;
    const {
      ensRegistryAddress,
      ensResolverV2Address,
      ensResolverAddress,
      ensPublicResolverAddress,
      domainNotifierAddress,
    } = chainConfigs()[this.chainId];
    this._ensRegistryAddress = ensRegistryAddress;
    this._ensResolver = ensResolverV2Address;
    this._ensResolverV2Address = ensResolverV2Address;
    this._ensResolverAddress = ensResolverAddress;
    this._ensPublicResolverAddress = ensPublicResolverAddress;
    this._ensRegistry = new ENSRegistry__factory(
      ENSRegistry__factory.createInterface(),
      ENSRegistry__factory.bytecode
    )
      .attach(ensRegistryAddress)
      .connect(provider);
    this._domainDefinitionReader = new DomainReader({
      ensRegistryAddress,
      provider,
    });

    this._domainDefinitionReader.addKnownResolver({
      chainId,
      address: ensResolverV2Address,
      type: ResolverContractType.RoleDefinitionResolver_v2,
    });

    // until role definitions are migrated to resolver_v2
    if (chainId === VOLTA_CHAIN_ID) {
      this._domainDefinitionReader.addKnownResolver({
        chainId,
        address: ensResolverAddress,
        type: ResolverContractType.RoleDefinitionResolver_v1,
      });
      this._domainDefinitionReader.addKnownResolver({
        chainId,
        address: ensPublicResolverAddress,
        type: ResolverContractType.PublicResolver,
      });
    }
    this._domainDefinitionTransactionFactory = new DomainTransactionFactoryV2({
      domainResolverAddress: ensResolverV2Address,
    });
    this._domainHierarchy = new DomainHierarchy({
      domainReader: this._domainDefinitionReader,
      ensRegistryAddress: ensRegistryAddress,
      provider,
      domainNotifierAddress: domainNotifierAddress,
      publicResolverAddress: ensPublicResolverAddress,
    });

    this._owner = this._signerService.address;
  }

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
  async setRoleDefinition({
    domain,
    data,
  }: SetRoleDefinitionOptions): Promise<void> {
    // Special case of updating legacy PublicResolver definitions
    if (await this.updateLegacyDefinition(domain, data)) {
      return;
    }
    // Standard update
    await this._signerService.send({
      ...this._domainDefinitionTransactionFactory.editDomain({
        domain,
        domainDefinition: data,
      }),
    });
  }

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
  async createOrganization({
    orgName,
    namespace,
    data,
    returnSteps,
  }: CreateOrganizationOptions): Promise<ReturnStep[] | undefined> {
    const orgDomain = `${orgName}.${namespace}`;
    const rolesDomain = `${NamespaceType.Role}.${orgDomain}`;
    const appsDomain = `${NamespaceType.Application}.${orgDomain}`;
    if (!(await this.isOwner({ domain: namespace, user: this._owner }))) {
      throw new Error(ERROR_MESSAGES.NOT_AUTHORIZED_TO_CHANGE_DOMAIN);
    }
    const steps: ReturnStep[] = [
      {
        tx: this.createSubdomainTx({
          domain: namespace,
          nodeName: orgName,
          owner: this._owner,
        }),
        info: 'Create organization subdomain',
      },
      {
        tx: this._domainDefinitionTransactionFactory.newDomain({
          domain: orgDomain,
          domainDefinition: data,
        }),
        info: 'Register reverse name and set definition for organization subdomain',
      },
      {
        tx: this.createSubdomainTx({
          domain: orgDomain,
          nodeName: NamespaceType.Role,
          owner: this._owner,
        }),
        info: 'Create roles subdomain for organization',
      },
      {
        tx: this._domainDefinitionTransactionFactory.setDomainNameTx({
          domain: rolesDomain,
        }),
        info: 'Register reverse name for roles subdomain',
      },
      {
        tx: this.createSubdomainTx({
          domain: orgDomain,
          nodeName: NamespaceType.Application,
          owner: this._owner,
        }),
        info: 'Create app subdomain for organization',
      },
      {
        tx: this._domainDefinitionTransactionFactory.setDomainNameTx({
          domain: appsDomain,
        }),
        info: 'Register reverse name for app subdomain',
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
  async createApplication({
    appName,
    namespace: domain,
    data,
    returnSteps,
  }: CreateApplicationOptions): Promise<ReturnStep[] | undefined> {
    const appDomain = `${appName}.${domain}`;
    const from = await this.getOwner({ namespace: domain });
    const steps: ReturnStep[] = [
      {
        tx: this.createSubdomainTx({ domain, nodeName: appName, owner: from }),
        info: 'Set subdomain for application',
      },
      {
        tx: this._domainDefinitionTransactionFactory.newDomain({
          domainDefinition: data,
          domain: appDomain,
        }),
        info: 'Set name definition for application',
      },
      {
        tx: this.createSubdomainTx({
          domain: appDomain,
          nodeName: NamespaceType.Role,
          owner: from,
        }),
        info: 'Create roles subdomain for application',
      },
      {
        tx: this._domainDefinitionTransactionFactory.setDomainNameTx({
          domain: `${NamespaceType.Role}.${appDomain}`,
        }),
        info: 'Set name for roles subdomain for application',
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
  async createRole({
    roleName,
    namespace,
    data,
    returnSteps,
  }: CreateRoleOptions): Promise<ReturnStep[] | undefined> {
    const dataV2 = castToV2(data);
    const newDomain = `${roleName}.${namespace}`;
    const from = await this.getOwner({ namespace });
    const steps: ReturnStep[] = [
      {
        tx: this.createSubdomainTx({
          domain: namespace,
          nodeName: roleName,
          owner: from,
        }),
        info: 'Create subdomain for role',
      },
      {
        tx: this._domainDefinitionTransactionFactory.newRole({
          domain: newDomain,
          roleDefinition: dataV2,
        }),
        info: 'Set name and definition for role',
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

  async readName(namehashToRead: string) {
    return this._domainDefinitionReader.readName(namehashToRead);
  }

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
  async changeOrgOwnership({
    namespace,
    newOwner,
    returnSteps = false,
    withSubdomains = false,
  }: ChangeOrgOwnershipOptions): Promise<MulticallTx | undefined> {
    DomainsService.validateOwnerAddress(newOwner);
    const orgNamespaces = [
      `${NamespaceType.Role}.${namespace}`,
      `${NamespaceType.Application}.${namespace}`,
      namespace,
    ];
    const { alreadyFinished, changeOwnerNamespaces, notOwnedNamespaces } =
      await this.validateChangeOwnership({
        newOwner,
        namespaces: orgNamespaces,
      });

    if (notOwnedNamespaces.length > 0) {
      throw new ChangeOwnershipNotPossibleError({
        namespace,
        notOwnedNamespaces,
      });
    }

    const apps = await this.getAppsOfOrg(namespace);
    if (apps && apps.length > 0) {
      if (!withSubdomains) {
        throw new Error(
          'You are not able to change ownership of organization with registered apps'
        );
      } else {
        for await (const { namespace: ns } of apps) {
          await this.changeAppOwnership({ namespace: ns, newOwner, returnSteps });
        }
      }
    }

    if (alreadyFinished.length > 0) {
      getLogger().info(
        `Already changed ownership of ${alreadyFinished.join(', ')}`
      );
    }

    const steps = changeOwnerNamespaces.map((nmspace) => {
      const tx = this.changeDomainOwnerTx({ newOwner, namespace: nmspace });
      return {
        tx,
        next: async ({ retryCheck }: { retryCheck?: boolean } = {}) => {
          if (retryCheck) {
            const owner = await this.getOwner({ namespace: nmspace });
            if (owner === newOwner) return;
          }
          return this._signerService.send(tx);
        },
        info: `Changing ownership of ${nmspace}`,
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
  async changeAppOwnership({
    namespace,
    newOwner,
    returnSteps,
  }: ChangeAppOwnershipOptions): Promise<
    ReturnStepWithRetryCheck[] | undefined
  > {
    DomainsService.validateOwnerAddress(newOwner);
    const roles = await this.getRolesByNamespace({
      namespace,
      parentType: NamespaceType.Application,
    });
    const appNamespaces = [
      ...roles.map((r) => r.namespace),
      `${NamespaceType.Role}.${namespace}`,
      namespace,
    ];

    const { alreadyFinished, changeOwnerNamespaces, notOwnedNamespaces } =
      await this.validateChangeOwnership({
        newOwner,
        namespaces: appNamespaces,
      });

    if (notOwnedNamespaces.length > 0) {
      throw new ChangeOwnershipNotPossibleError({
        namespace,
        notOwnedNamespaces,
      });
    }

    if (alreadyFinished.length > 0) {
      getLogger().info(
        `Already changed ownership of ${alreadyFinished.join(', ')}`
      );
    }

    const steps: ReturnStepWithRetryCheck[] = changeOwnerNamespaces.map(
      (name) => {
        const tx = this.changeDomainOwnerTx({ newOwner, namespace: name });
        return {
          tx,
          next: async ({ retryCheck }: { retryCheck?: boolean } = {}) => {
            if (retryCheck) {
              const owner = await this.getOwner({ namespace: name });
              if (owner === newOwner) return;
            }
            return this._signerService.send(tx);
          },
          info: `Changing ownership of ${name}`,
        };
      }
    );

    if (returnSteps) {
      return steps;
    }
    for await (const step of steps) {
      await step.next();
    }
    return;
  }

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
  async changeRoleOwnership({
    namespace,
    newOwner,
  }: ChangeRoleOwnershipOptions): Promise<void> {
    DomainsService.validateOwnerAddress(newOwner);
    const notOwnedNamespaces = await this.validateOwnership({
      namespace,
      type: NamespaceType.Role,
    });
    if (notOwnedNamespaces.length > 0) {
      throw new ChangeOwnershipNotPossibleError({
        namespace,
        notOwnedNamespaces,
      });
    }
    await this._signerService.send(
      this.changeDomainOwnerTx({ namespace, newOwner })
    );
  }

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
  async deleteOrganization({
    namespace,
    returnSteps = false,
  }: DeleteOrganizationOptions): Promise<
    ReturnStepWithRetryCheck[] | undefined
  > {
    const apps = this._cacheClient
      ? await this.getAppsOfOrg(namespace)
      : await this.getSubdomains({
          domain: `${NamespaceType.Application}.${namespace}`,
        });
    if (apps && apps.length > 0) {
      throw new Error(ERROR_MESSAGES.ORG_WITH_APPS);
    }

    const roles = this._cacheClient
      ? await this._cacheClient.getOrganizationRoles(namespace)
      : await this.getSubdomains({
          domain: `${NamespaceType.Role}.${namespace}`,
        });

    if (roles && roles.length > 0) {
      throw new Error(ERROR_MESSAGES.ORG_WITH_ROLES);
    }

    const orgNamespaces = [
      `${NamespaceType.Role}.${namespace}`,
      `${NamespaceType.Application}.${namespace}`,
      namespace,
    ];

    const { alreadyFinished, namespacesToDelete, notOwnedNamespaces } =
      await this.validateDeletePossibility({
        namespaces: orgNamespaces,
      });

    if (notOwnedNamespaces.length > 0) {
      throw new DeletingNamespaceNotPossibleError({
        namespace,
        notOwnedNamespaces,
      });
    }

    if (alreadyFinished.length > 0) {
      getLogger().info(`Already deleted: ${alreadyFinished.join(', ')}`);
    }

    const steps = namespacesToDelete.map((n) => {
      const tx = this.deleteDomainTx({ namespace: n });
      return {
        tx,
        next: async ({ retryCheck }: { retryCheck?: boolean } = {}) => {
          if (retryCheck) {
            const owner = await this.getOwner({ namespace: n });
            if (owner === emptyAddress) return;
          }
          return this._signerService.send(tx);
        },
        info: `Deleting ${n}`,
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
  async deleteApplication({
    namespace,
    returnSteps = false,
  }: DeleteApplicationOptions): Promise<
    ReturnStepWithRetryCheck[] | undefined
  > {
    const roles = this._cacheClient
      ? await this._cacheClient.getApplicationRoles(namespace)
      : await this.getSubdomains({
          domain: `${NamespaceType.Role}.${namespace}`,
        });

    if (roles && roles.length > 0) {
      throw new Error(ERROR_MESSAGES.APP_WITH_ROLES);
    }

    const appNamespaces = [`${NamespaceType.Role}.${namespace}`, namespace];

    const { alreadyFinished, namespacesToDelete, notOwnedNamespaces } =
      await this.validateDeletePossibility({
        namespaces: appNamespaces,
      });

    if (notOwnedNamespaces.length > 0) {
      throw new DeletingNamespaceNotPossibleError({
        namespace,
        notOwnedNamespaces,
      });
    }

    if (alreadyFinished.length > 0) {
      getLogger().info(`Already deleted: ${alreadyFinished.join(', ')}`);
    }

    const steps = namespacesToDelete.map((nspace) => {
      const tx = this.deleteDomainTx({ namespace: nspace });
      return {
        tx,
        next: async ({ retryCheck }: { retryCheck?: boolean } = {}) => {
          if (retryCheck) {
            const owner = await this.getOwner({ namespace: nspace });
            if (owner === emptyAddress) return;
          }
          return this._signerService.send(tx);
        },
        info: `Deleting ${nspace}`,
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
  async deleteRole({ namespace }: DeleteRoleOptions): Promise<void> {
    const notOwnedNamespaces = await this.validateOwnership({
      namespace,
      type: NamespaceType.Role,
    });
    if (notOwnedNamespaces.length > 0) {
      throw new DeletingNamespaceNotPossibleError({
        namespace,
        notOwnedNamespaces,
      });
    }
    await this._signerService.send(this.deleteDomainTx({ namespace }));
  }

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
  async getDefinition({
    type,
    namespace,
  }: GetDefinitionOptions): Promise<
    | IRoleDefinition
    | IRoleDefinitionV2
    | IAppDefinition
    | IOrganizationDefinition
  > {
    if (type === NamespaceType.Role) {
      return this._cacheClient.getRoleDefinition(namespace);
    }
    if (type === NamespaceType.Application) {
      return this._cacheClient.getAppDefinition(namespace);
    }
    if (type === NamespaceType.Organization) {
      return this._cacheClient.getOrgDefinition(namespace);
    }
    throw new ENSTypeNotSupportedError();
  }

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
  getRolesByNamespace({
    parentType,
    namespace,
  }: GetRolesByNamespaceOptions): Promise<IRole[]> {
    if (parentType === NamespaceType.Organization) {
      return this._cacheClient.getOrganizationRoles(namespace);
    }
    if (parentType === NamespaceType.Application) {
      return this._cacheClient.getApplicationRoles(namespace);
    }
    throw new ENSTypeNotSupportedError();
  }

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
  getAllowedRolesByIssuer(did: string): Promise<IRole[]> {
    return this._cacheClient.getAllowedRolesByIssuer(did);
  }

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
  async getAllowedRolesByRevoker(did: string): Promise<IRole[]> {
    return await this._cacheClient.getRolesByRevoker(did);
  }

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
  getENSTypesByOwner({
    type,
    owner,
    withRelations = true,
  }: GetENSTypesByOwnerOptions): Promise<IOrganization[] | IApp[] | IRole[]> {
    DomainsService.validateOwnerAddress(owner);
    if (type === NamespaceType.Organization) {
      return this._cacheClient.getOrganizationsByOwner(owner, withRelations);
    }
    if (type === NamespaceType.Application) {
      return this._cacheClient.getApplicationsByOwner(owner, withRelations);
    }
    if (type === NamespaceType.Role) {
      return this._cacheClient.getRolesByOwner(owner);
    }
    throw new ENSTypeNotSupportedError();
  }

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
  getENSTypesBySearchPhrase(
    search: string,
    types?: SearchType[]
  ): Promise<(IOrganization | IApp | IRole)[]> {
    return this._cacheClient.getNamespaceBySearchPhrase(search, types);
  }

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
  getAppsOfOrg(org: string): Promise<IApp[]> {
    return this._cacheClient.getApplicationsByOrganization(org);
  }

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
  getSubOrgsByOrgNamespace(namespace: string): Promise<IOrganization[]> {
    return this._cacheClient.getSubOrganizationsByOrganization(namespace);
  }

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
  async getOrgHierarchy(namespace: string): Promise<IOrganization> {
    const org = await this._cacheClient.getOrgHierarchy(namespace);
    [
      org,
      ...(org.subOrgs || []),
      ...(org.apps || []),
      ...(org.roles || []),
    ].forEach(
      (domain) => (domain.isOwnedByCurrentUser = domain.owner === this._owner)
    );
    return org;
  }

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
  getDIDsByRole(role: string): Promise<string[]> {
    return this._cacheClient.getDIDsForRole(role);
  }

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
  async getSubdomains({
    domain,
    mode = 'FIRSTLEVEL',
  }: GetSubdomainsOptions): Promise<string[]> {
    return this._domainHierarchy.getSubdomainsUsingResolver({
      domain,
      mode,
    });
  }

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
  async checkExistenceOfDomain({
    domain,
  }: CheckExistenceOfDomainOptions): Promise<boolean> {
    const domainHash = namehash(domain);
    const [exists, isOwned] = await Promise.all([
      this._ensRegistry.recordExists(domainHash),
      (async () => {
        const owner = await this._ensRegistry.owner(domainHash);
        return owner !== emptyAddress;
      })(),
    ]);
    return exists && isOwned;
  }

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
  async isOwner({
    domain,
    user = this._owner,
  }: IsOwnerOptions): Promise<boolean> {
    const domainHash = namehash(domain);
    const owner = await this._ensRegistry.owner(domainHash);
    return owner === user;
  }

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
  async validateOwnership({
    namespace,
    type,
  }: ValidateOwnershipOptions): Promise<string[]> {
    return this.nonOwnedNodesOf({ namespace, type, owner: this._owner });
  }

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
  async updateLegacyDefinition(
    domain: string,
    data: DomainDefinition
  ): Promise<boolean> {
    const node = namehash(domain);
    const currentResolverAddress = await this._ensRegistry.resolver(node);
    const { ensResolverV2Address, ensRegistryAddress } =
      chainConfigs()[this.chainId];
    if (currentResolverAddress !== ensResolverV2Address) {
      const updateResolverTransaction: EncodedCall = {
        to: ensRegistryAddress,
        data: this._ensRegistry.interface.encodeFunctionData('setResolver', [
          node,
          ensResolverV2Address,
        ]),
      };
      // Need to use newRole/newDomain as need to set reverse domain name
      const updateDomain = DomainReader.isRoleDefinition(data)
        ? this._domainDefinitionTransactionFactory.newRole({
            domain,
            roleDefinition: {
              ...castToV2(data),
              version: parseInt(data.version.toString(), 10),
            },
          })
        : this._domainDefinitionTransactionFactory.newDomain({
            domain,
            domainDefinition: data,
          });
      await this._signerService.send(updateResolverTransaction);
      await this._signerService.send(updateDomain);
      return true;
    }
    return false;
  }

  /**
   * Get possible registration types for given roles.
   *
   * ```typescript
   * domainsService.registrationTypesOfRoles(['root.roles.energyweb.iam.ewc', 'admin.roles.energyweb.iam.ewc']);
   *
   * @param {Array<String>} roles array of roles
   * @return object containing registration types for given roles as keys
   */
  async registrationTypesOfRoles(
    roles: string[]
  ): Promise<Record<string, Set<RegistrationTypes>>> {
    const types: Record<string, Set<RegistrationTypes>> = roles.reduce(
      (acc, role) => ({ ...acc, [role]: new Set() }),
      {}
    );
    for await (const role of roles) {
      const def = await this.getDefinition({
        type: NamespaceType.Role,
        namespace: role,
      });
      if (!DomainReader.isRoleDefinition(def)) {
        continue;
      }
      const resolver = await this._ensRegistry.resolver(namehash(role));
      if (
        [this._ensResolverAddress, this._ensResolverV2Address].includes(
          resolver
        )
      ) {
        types[role].add(RegistrationTypes.OnChain);
        types[role].add(RegistrationTypes.OffChain);
      } else if (resolver === this._ensPublicResolverAddress) {
        types[role].add(RegistrationTypes.OffChain);
      } else {
        throw new UnregisteredResolverError(role, resolver);
      }
    }
    return types;
  }

  /**
   * Collect related data for given domain. Currently only related data is owner.
   *
   * ```typescript
   * domainsService.namespacesWithRelations(['root.roles.energyweb.iam.ewc', 'admin.roles.energyweb.iam.ewc']);
   *
   * @param {Array<String>} namespaces array of namespaces
   * @return object containing registration types for given roles as keys
   */
  async namespacesWithRelations(namespaces: string[]): Promise<
    {
      namespace: string;
      owner: string;
    }[]
  > {
    return Promise.all(
      namespaces.map(async (namespace) => {
        const owner = await this.getOwner({ namespace });
        return {
          namespace,
          owner,
        };
      })
    );
  }

  protected async validateChangeOwnership({
    namespaces,
    newOwner,
  }: {
    namespaces: string[];
    newOwner: string;
  }) {
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
      }
    );
  }

  protected async validateDeletePossibility({
    namespaces,
  }: {
    namespaces: string[];
  }) {
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
      }
    );
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
      data: this._ensRegistry.interface.encodeFunctionData('setSubnodeRecord', [
        namehash(domain),
        labelhash(nodeName),
        owner,
        this._ensResolver,
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
      data: this._ensRegistry.interface.encodeFunctionData('setSubnodeOwner', [
        namehash(namespace),
        labelhash(label),
        newOwner,
      ]),
    };
  }

  protected changeDomainOwnerTx({
    newOwner,
    namespace,
  }: {
    newOwner: string;
    namespace: string;
  }): EncodedCall {
    return {
      to: this._ensRegistryAddress,
      data: this._ensRegistry.interface.encodeFunctionData('setOwner', [
        namehash(namespace),
        newOwner,
      ]),
    };
  }

  protected deleteSubdomainTx({
    namespace,
  }: {
    namespace: string;
  }): EncodedCall {
    const namespaceArray = namespace.split('.');
    const node = namespaceArray.slice(1).join('.');
    const label = namespaceArray[0];
    return {
      to: this._ensRegistryAddress,
      data: this._ensRegistry.interface.encodeFunctionData('setSubnodeRecord', [
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
      data: this._ensRegistry.interface.encodeFunctionData('setRecord', [
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
    type: NamespaceType;
    owner: string;
  }) {
    if (
      ![
        NamespaceType.Role,
        NamespaceType.Application,
        NamespaceType.Organization,
      ].includes(type)
    ) {
      throw new Error(ERROR_MESSAGES.ENS_TYPE_NOT_SUPPORTED);
    }
    const namespacesToCheck =
      type === NamespaceType.Role
        ? [namespace]
        : type === NamespaceType.Application
        ? [namespace, NamespaceType.Application]
        : [namespace, NamespaceType.Application, NamespaceType.Organization];
    return Promise.all(
      namespacesToCheck.map((ns) => this.getOwner({ namespace: ns }))
    ).then((owners) =>
      owners.filter((o) => ![owner, emptyAddress].includes(o))
    );
  }

  /**
   * Checks that a provided owner/newOwner address is a valid ethereum address
   * @param owner owner address to validate
   */
  private static validateOwnerAddress(owner: string) {
    try {
      validateAddress(owner);
    } catch {
      throw new ENSOwnerNotValidAddressError(owner);
    }
  }

  get domainReader(): DomainReader {
   return this._domainDefinitionReader;
  }
}
