import { IAppDefinition, IOrganizationDefinition, IRoleDefinition } from "@energyweb/iam-contracts";

export enum ENSNamespaceTypes {
    Roles = "roles",
    Application = "apps",
    Organization = "org",
}

export interface IRole {
    uid: string;
    name: string;
    namespace: string;
    owner: string;
    definition: IRoleDefinition;
    isOwnedByCurrentUser?: boolean;
}

export interface IOrganization {
    uid: string;
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
    uid: string;
    name: string;
    namespace: string;
    owner: string;
    definition: IAppDefinition;
    roles?: IRole[];
    isOwnedByCurrentUser?: boolean;
}

export const NODE_FIELDS_KEY = "metadata";
