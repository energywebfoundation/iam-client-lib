import {
  EncodedCall,
  IAppDefinition,
  IOrganizationDefinition,
  IRevokerDefinition,
  IRoleDefinition,
  IRoleDefinitionV2,
} from '@energyweb/credential-governance';
import { TransactionReceipt } from '@energyweb/ekc';
import { providers } from 'ethers';

export enum NamespaceType {
  Role = 'roles',
  Application = 'apps',
  Organization = 'org',
}

export interface IRole {
  id: number;
  name: string;
  namespace: string;
  owner: string;
  definition: IRoleDefinition;
  isOwnedByCurrentUser?: boolean;
}

export interface IOrganization {
  id: number;
  name: string;
  namespace: string;
  owner: string;
  definition: IOrganizationDefinition;
  apps?: IApp[];
  roles?: IRole[];
  subOrgs?: IOrganization[];
  isOwnedByCurrentUser?: boolean;
}

export interface IApp {
  id: number;
  name: string;
  namespace: string;
  owner: string;
  definition: IAppDefinition;
  roles?: IRole[];
  isOwnedByCurrentUser?: boolean;
}

export const NODE_FIELDS_KEY = 'metadata';

// TODO: remove once all of the VOLTA roles have been migrated to v2
export function castToV2(
  roleDef: IRoleDefinition | IRoleDefinitionV2
): IRoleDefinitionV2 {
  if (!Object.keys(roleDef).includes('revoker')) {
    const revoker: IRevokerDefinition = {
      did: roleDef.issuer.did,
      revokerType: roleDef.issuer.issuerType,
      roleName: roleDef.issuer.roleName,
    };
    return { ...roleDef, revoker };
  } else {
    return <IRoleDefinitionV2>roleDef;
  }
}

export interface ReturnStep {
  next: () => Promise<void>;
  tx: EncodedCall;
  info: string;
}

export interface ReturnStepWithRetryCheck {
  next: (opt?: {
    retryCheck?: boolean;
  }) => Promise<TransactionReceipt | undefined>;
  tx: EncodedCall;
  info: string;
}

export type MulticallTx = {
  tx: EncodedCall;
  next: (opts?: {
    retryCheck?: boolean;
  }) => Promise<providers.TransactionReceipt | undefined>;
  info: string;
}[];

export interface SetRoleDefinitionOptions {
  /** The domain to update */
  domain: string;

  /** New domain definition */
  data: IAppDefinition | IOrganizationDefinition | IRoleDefinitionV2;
}

export interface CreateOrganizationOptions {
  /** Organization name */
  orgName: string;

  /** Organization domain definition */
  data: IOrganizationDefinition;

  /** Parent namespace */
  namespace: string;

  /** Indicates whether to run steps immediately (false) or return steps that can be executed later (true) */
  returnSteps?: boolean;
}

export interface CreateApplicationOptions {
  /** Parent namespace */
  namespace: string;

  /** Application name */
  appName: string;

  /** Application domain definition */
  data: IAppDefinition;

  /** Indicates whether to run steps immediately (false) or return steps that can be executed later (true) */
  returnSteps?: boolean;
}

export interface CreateRoleOptions {
  /** Role name */
  roleName: string;

  /** Parent namespace */
  namespace: string;

  /** Role domain definition */
  data: IRoleDefinition | IRoleDefinitionV2;

  /** Indicates whether to run steps immediately (false) or return steps that can be executed later (true) */
  returnSteps?: boolean;
}

export interface ChangeOrgOwnershipOptions {
  /** Organization domain */
  namespace: string;

  /** New owner address */
  newOwner: string;

  /** Indicates whether to run steps immediately (false) or return steps that can be executed later (true) */
  returnSteps?: boolean;

  /** Indicates whether to change ownership of subdomains or not */
  withSubdomains?: boolean;
}

export interface ChangeAppOwnershipOptions {
  /** Application domain */
  namespace: string;

  /** New owner address */
  newOwner: string;

  /** Indicates whether to run steps immediately (false) or return steps that can be executed later (true) */
  returnSteps?: boolean;
}

export interface ChangeRoleOwnershipOptions {
  /** Role domain */
  namespace: string;

  /** New owner address */
  newOwner: string;
}

export interface DeleteOrganizationOptions {
  /** Organization domain */
  namespace: string;

  /** Indicates whether to run steps immediately (false) or return steps that can be executed later (true) */
  returnSteps: string;
}

export interface DeleteApplicationOptions {
  /** Application domain */
  namespace: string;

  /** Indicates whether to run steps immediately (false) or return steps that can be executed later (true) */
  returnSteps: string;
}

export interface DeleteRoleOptions {
  /** Role domain */
  namespace: string;
}

export interface GetDefinitionOptions {
  /** Domain type */
  type: NamespaceType;

  /** Domain name */
  namespace: string;
}

export interface GetRolesByNamespaceOptions {
  /** Domain type */
  parentType: NamespaceType.Application | NamespaceType.Organization;

  /** Domain name */
  namespace: string;
}

export interface GetENSTypesByOwnerOptions {
  /** Domain type */
  type: NamespaceType;

  /** Address of the owner */
  owner: string;

  /** Indicates whether to include related roles or not */
  withRelations?: boolean;
}

export interface GetSubdomainsOptions {
  domain: string;
  mode?: 'ALL' | 'FIRSTLEVEL';
}

export interface CheckExistenceOfDomainOptions {
  /** Domain namespace */
  domain: string;
}

export interface IsOwnerOptions {
  /** Domain namespace */
  domain: string;

  /** Address of the owner */
  user?: string;
}

export interface ValidateOwnershipOptions {
  /** Root domain namespace */
  namespace: string;

  /** Domain type */
  type: NamespaceType;
}

export type DomainDefinition =
  | IAppDefinition
  | IOrganizationDefinition
  | IRoleDefinition
  | IRoleDefinitionV2;
