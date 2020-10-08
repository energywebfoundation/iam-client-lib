import axios, { AxiosInstance } from "axios";
import {
  IApp,
  IAppDefinition,
  IOrganization,
  IRole,
  IOrganizationDefinition,
  IRoleDefinition
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
}

export class CacheServerClient implements ICacheServerClient {
  private httpClient: AxiosInstance;

  constructor({ url }: { url: string }) {
    this.httpClient = axios.create({
      baseURL: url
    });
  }

  async getRoleDefinition({ namespace }) {
    const { data } = await this.httpClient.get<IRole>(`/role/${namespace}`);
    return data.definition;
  }

  async getOrgDefinition({ namespace }) {
    const { data } = await this.httpClient.get<IOrganization>(`/org/${namespace}`);
    return data.definition;
  }

  async getAppDefinition({ namespace }) {
    const { data } = await this.httpClient.get<IApp>(`/app/${namespace}`);
    return data.definition;
  }

  async getApplicationRoles({ namespace }) {
    const { data } = await this.httpClient.get<{ Data: IRole[] }>(`/app/${namespace}/roles`);
    return data.Data;
  }

  async getOrganizationRoles({ namespace }) {
    const { data } = await this.httpClient.get<{ Data: IRole[] }>(`/org/${namespace}/roles`);
    return data.Data;
  }

  async getOrganizationsByOwner({ owner }) {
    const { data } = await this.httpClient.get<{ orgs: IOrganization[] }>(`/owner/${owner}/orgs`);
    return data.orgs;
  }

  async getApplicationsByOwner({ owner }) {
    const { data } = await this.httpClient.get<{ apps: IApp[] }>(`/owner/${owner}/apps`);
    return data.apps;
  }

  async getApplicationsByOrganization({ namespace }) {
    const { data } = await this.httpClient.get<{ Data: IApp[] }>(`/org/${namespace}/apps`);
    return data.Data;
  }

  async getRolesByOwner({ owner }) {
    const { data } = await this.httpClient.get<{ roles: IRole[] }>(`/owner/${owner}/roles`);
    return data.roles;
  }
}
