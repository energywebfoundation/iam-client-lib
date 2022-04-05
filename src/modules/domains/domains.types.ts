import {
  EncodedCall,
  IAppDefinition,
  IOrganizationDefinition,
  IRevokerDefinition,
  IRoleDefinition,
  IRoleDefinitionV2,
} from '@energyweb/credential-governance';
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

export type MulticallTx = {
  tx: EncodedCall;
  next: (opts?: {
    retryCheck?: boolean;
  }) => Promise<providers.TransactionReceipt | undefined>;
  info: string;
}[];
