import axios, { AxiosInstance } from "axios";
import {
  IApp,
  IAppDefinition,
  IOrganization,
  IRole,
  IOrganizationDefinition,
  IRoleDefinition,
  Claim
} from "./cacheServerClient.types";

export interface ICacheServerClient {
  getRoleDefinition: ({ namespace }: { namespace: string }) => Promise<IRoleDefinition>;
  getOrgDefinition: ({ namespace }: { namespace: string }) => Promise<IOrganizationDefinition>;
  getAppDefinition: ({ namespace }: { namespace: string }) => Promise<IAppDefinition>;
  getApplicationRoles: ({ namespace }: { namespace: string }) => Promise<IRole[]>;
  getOrganizationRoles: ({ namespace }: { namespace: string }) => Promise<IRole[]>;
  getOrganizationsByOwner: ({ owner }: { owner: string }) => Promise<IOrganization[]>;
  getApplicationsByOwner: ({ owner }: { owner: string }) => Promise<IApp[]>;
  getApplicationsByOrganization: ({ namespace }: { namespace: string }) => Promise<IApp[]>;
  getRolesByOwner: ({ owner }: { owner: string }) => Promise<IRole[]>;
  getIssuedClaims: ({
    did,
    isAccepted,
    parentNamespace
  }: {
    did: string;
    isAccepted?: boolean;
    parentNamespace?: string;
  }) => Promise<Claim[]>;
  getRequestedClaims: ({
    did,
    isAccepted,
    parentNamespace
  }: {
    did: string;
    isAccepted?: boolean;
    parentNamespace?: string;
  }) => Promise<Claim[]>;
}

export class CacheServerClient implements ICacheServerClient {
  private httpClient: AxiosInstance;

  constructor({ url }: { url: string }) {
    this.httpClient = axios.create({
      baseURL: url
    });
  }

  async getRoleDefinition({ namespace }: { namespace: string }) {
    const { data } = await this.httpClient.get<IRole>(`/role/${namespace}`);
    return data.definition;
  }

  async getOrgDefinition({ namespace }: { namespace: string }) {
    const { data } = await this.httpClient.get<IOrganization>(`/org/${namespace}`);
    return data.definition;
  }

  async getAppDefinition({ namespace }: { namespace: string }) {
    const { data } = await this.httpClient.get<IApp>(`/app/${namespace}`);
    return data.definition;
  }

  async getApplicationRoles({ namespace }: { namespace: string }) {
    const { data } = await this.httpClient.get<{ Data: IRole[] }>(`/app/${namespace}/roles`);
    return data.Data;
  }

  async getOrganizationRoles({ namespace }: { namespace: string }) {
    const { data } = await this.httpClient.get<{ Data: IRole[] }>(`/org/${namespace}/roles`);
    return data.Data;
  }

  async getOrganizationsByOwner({ owner }: { owner: string }) {
    const { data } = await this.httpClient.get<{ orgs: IOrganization[] }>(`/owner/${owner}/orgs`);
    return data.orgs;
  }

  async getApplicationsByOwner({ owner }: { owner: string }) {
    const { data } = await this.httpClient.get<{ apps: IApp[] }>(`/owner/${owner}/apps`);
    return data.apps;
  }

  async getApplicationsByOrganization({ namespace }: { namespace: string }) {
    const { data } = await this.httpClient.get<{ Data: IApp[] }>(`/org/${namespace}/apps`);
    return data.Data;
  }

  async getRolesByOwner({ owner }: { owner: string }) {
    const { data } = await this.httpClient.get<{ roles: IRole[] }>(`/owner/${owner}/roles`);
    return data.roles;
  }

  async getIssuedClaims({
    did,
    isAccepted,
    parentNamespace
  }: {
    did: string;
    isAccepted?: boolean;
    parentNamespace?: string;
  }) {
    const { data } = await this.httpClient.get<{ claim: Claim[] }>(`/claim/issuer/${did}`, {
      params: {
        accepted: isAccepted,
        parentNamespace
      }
    });
    return data.claim;
  }

  async getRequestedClaims({
    did,
    isAccepted,
    parentNamespace
  }: {
    did: string;
    isAccepted?: boolean;
    parentNamespace?: string;
  }) {
    const { data } = await this.httpClient.get<{ claim: Claim[] }>(`/claim/requester/${did}`, {
      params: {
        accepted: isAccepted,
        parentNamespace
      }
    });
    return data.claim;
  }
}
