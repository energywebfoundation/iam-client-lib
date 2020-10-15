export interface IRoleDefinition {
  version: string;
  roleType: string;
  roleName: string;
  fields: {
    fieldType: string;
    label: string;
    validation: string;
  }[];
  metadata: Record<string, unknown> | Record<string, unknown>[];
  issuer: {
    issuerType?: string;
    did?: string[];
    roleName?: string;
  };
}

export interface IAppDefinition {
  appName: string;
  logoUrl?: string;
  websiteUrl?: string;
  description?: string;
  others?: Record<string, unknown>;
}

export interface IOrganizationDefinition {
  orgName: string;
  logoUrl?: string;
  websiteUrl?: string;
  description?: string;
  others?: Record<string, unknown>;
}

export interface IRole {
  uid: string;
  name: string;
  namespace: string;
  owner: string;
  definition: IRoleDefinition;
}

export interface IOrganization {
  uid: string;
  name: string;
  namespace: string;
  owner: string;
  definition: IOrganizationDefinition;
}

export interface IApp {
  uid: string;
  name: string;
  namespace: string;
  owner: string;
  definition: IAppDefinition;
}

export interface Claim {
  id: string;
  requester: string;
  issuer: string;
  claimType: string;
  token: string;
  issuedToken?: string;
  isAccepted: boolean;
  createdAt: string;
  parentNamespace: string;
}
