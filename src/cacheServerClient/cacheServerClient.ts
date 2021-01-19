import axios, { AxiosInstance } from "axios";
import { stringify } from "qs";
import {
  IApp,
  IAppDefinition,
  IOrganization,
  IRole,
  IOrganizationDefinition,
  IRoleDefinition,
  Claim
} from "./cacheServerClient.types";

import { IClaimIssuance, IClaimRejection, IClaimRequest } from "../iam";
import { IDIDDocument } from "@ew-did-registry/did-resolver-interface";
export interface ICacheServerClient {
  getRoleDefinition: ({ namespace }: { namespace: string }) => Promise<IRoleDefinition>;
  getOrgDefinition: ({ namespace }: { namespace: string }) => Promise<IOrganizationDefinition>;
  getAppDefinition: ({ namespace }: { namespace: string }) => Promise<IAppDefinition>;
  getApplicationRoles: ({ namespace }: { namespace: string }) => Promise<IRole[]>;
  getOrganizationRoles: ({ namespace }: { namespace: string }) => Promise<IRole[]>;
  getOrganizationsByOwner: ({ owner }: { owner: string }) => Promise<IOrganization[]>;
  getApplicationsByOwner: ({ owner }: { owner: string }) => Promise<IApp[]>;
  getApplicationsByOrganization: ({ namespace }: { namespace: string }) => Promise<IApp[]>;
  getSubOrganizationsByOrganization: ({
    namespace
  }: {
    namespace: string;
  }) => Promise<IOrganization[]>;

  getNamespaceBySearchPhrase: ({
    types,
    search
  }: {
    types?: ("App" | "Org" | "Role")[];
    search: string;
  }) => Promise<IOrganization[] | IApp[] | IRole[]>;
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
  requestClaim: ({ message, did }: { message: IClaimRequest; did: string }) => Promise<void>;
  issueClaim: ({ message, did }: { message: IClaimIssuance; did: string }) => Promise<void>;
  rejectClaim: ({ message, did }: { message: IClaimRejection; did: string }) => Promise<void>;
  getDIDsForRole: ({ namespace }: { namespace: string }) => Promise<string[]>;
  getDidDocument: ({
    did,
    includeClaims
  }: {
    did: string;
    includeClaims?: boolean;
  }) => Promise<IDIDDocument>;
  addDIDToWatchList: ({ did }: { did: string }) => Promise<void>;
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

  async getSubOrganizationsByOrganization({ namespace }: { namespace: string }) {
    const { data } = await this.httpClient.get<IOrganization[]>(`/org/${namespace}/suborgs`);
    return data;
  }

  async getNamespaceBySearchPhrase({
    types,
    search
  }: {
    types?: ("App" | "Org" | "Role")[];
    search: string;
  }) {
    if (types && types.length > 0) {
      const { data } = await this.httpClient.get<IOrganization[] | IApp[] | IRole[]>(
        `/namespace/search/${search}`,
        {
          params: {
            types
          },
          paramsSerializer: params => {
            return stringify(params, { arrayFormat: "brackets" });
          }
        }
      );
      return data;
    }
    const { data } = await this.httpClient.get<IOrganization[] | IApp[] | IRole[]>(
      `/namespace/search/${search}`
    );
    return data;
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

  async requestClaim({ message, did }: { message: IClaimRequest; did: string }) {
    await this.httpClient.post<void>(`/claim/request/${did}`, message);
  }

  async issueClaim({ message, did }: { message: IClaimIssuance; did: string }) {
    await this.httpClient.post<void>(`/claim/issue/${did}`, message);
  }

  async rejectClaim({ message, did }: { message: IClaimRejection; did: string }) {
    await this.httpClient.post<void>(`/claim/reject/${did}`, message);
  }

  async getDIDsForRole({ namespace }: { namespace: string }) {
    const { data } = await this.httpClient.get<string[]>(`/claim/did/${namespace}?accepted=true`);
    return data;
  }

  async getDidDocument({ did, includeClaims }: { did: string; includeClaims?: boolean }) {
    const { data } = await this.httpClient.get<IDIDDocument>(
      `/DID/${did}?includeClaims=${includeClaims || false}`
    );
    return data;
  }

  async addDIDToWatchList({ did }: { did: string }) {
    await this.httpClient.post(`/DID/${did}`);
  }
}
