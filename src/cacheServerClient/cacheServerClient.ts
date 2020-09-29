import { IDIDDocument } from "@ew-did-registry/did-resolver-interface";
import axios, { AxiosInstance } from "axios";

export interface ICacheServerClient {
  getDidDocument: ({ did }: { did: string }) => Promise<IDIDDocument | null>;
  getClaims: ({ did }: { did: string }) => Promise<Record<string, unknown>[]>;
  getClaimsByClaimType: ({
    did,
    claimType
  }: {
    did: string;
    claimType: string;
  }) => Promise<Record<string, unknown>[]>;
  getIssuedClaimsByClaimType: ({
    did,
    claimType
  }: {
    did: string;
    claimType: string;
  }) => Promise<Record<string, unknown>[]>;
  getIssuedClaimsByIssuer: ({
    did,
    issuer
  }: {
    did: string;
    issuer: string;
  }) => Promise<Record<string, unknown>[]>;
  getIssuedClaimsByIssuerAndClaimType: ({
    did,
    issuer,
    claimType
  }: {
    did: string;
    issuer: string;
    claimType: string;
  }) => Promise<Record<string, unknown>[]>;
  getSubRoles: ({ role }: { role: string }) => Promise<string[]>;
  getRoleDefinition: ({ role }: { role: string }) => Promise<Record<string, unknown>>;
  isOwnerOfRole: ({ user, domain }: { user: string; domain: string }) => Promise<boolean>;
  isRoleExist: ({ role }: { role: string }) => Promise<boolean>;
}

export class CacheServerClient implements ICacheServerClient {
  private httpClient: AxiosInstance;

  constructor({ url }: { url: string }) {
    this.httpClient = axios.create({
      baseURL: url
    });
  }

  async getDidDocument({ did }) {
    const didDocument = await this.httpClient.get<IDIDDocument | null>(`/did/${did}`);
    return didDocument.data;
  }

  async getClaims({ did }) {
    const { data } = await this.httpClient.get<Record<string, unknown>[]>(`/claims/${did}`);
    return data;
  }

  async getClaimsByClaimType({ did, claimType }) {
    const { data } = await this.httpClient.get<Record<string, unknown>[]>(
      `/claims/${did}/${claimType}`
    );
    return data;
  }

  async getIssuedClaimsByClaimType({ did, claimType }) {
    const { data } = await this.httpClient.get<Record<string, unknown>[]>(
      `/claims/${did}/${claimType}`
    );
    return data;
  }

  async getIssuedClaimsByIssuer({ did, issuer }) {
    const { data } = await this.httpClient.get<Record<string, unknown>[]>(`/claims/${did}/${issuer}`);
    return data;
  }

  async getIssuedClaimsByIssuerAndClaimType({ did, issuer, claimType }) {
    const { data } = await this.httpClient.get<Record<string, unknown>[]>(
      `/claims/${did}/${issuer}/${claimType}`
    );
    return data;
  }

  async getRoleDefinition({ role }) {
    const { data } = await this.httpClient.get<Record<string, unknown>>(`/roles/${role}`);
    return data;
  }

  async getSubRoles({ role }) {
    const { data } = await this.httpClient.get<string[]>(`/roles/${role}`);
    return data;
  }

  async isOwnerOfRole({ user, domain }) {
    const { data } = await this.httpClient.get<boolean>(`/owner/${domain}/${user}`);
    return data;
  }

  async isRoleExist({ role }) {
    const { data } = await this.httpClient.get<boolean>(`/role/${role}`);
    return data;
  }
}
