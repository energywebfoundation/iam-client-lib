import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { stringify } from "qs";
import {
  IApp,
  IOrganization,
  IRole,
  Claim,
  Asset,
  Order,
  AssetHistoryEventType,
  AssetHistory
} from "./cacheServerClient.types";

import { IClaimIssuance, IClaimRejection, IClaimRequest } from "../iam";
import { IDIDDocument } from "@ew-did-registry/did-resolver-interface";

import { ICacheServerClient } from "./ICacheServerClient";
import { isBrowser } from "../utils/isBrowser";

export interface CacheServerClientOptions {
  url: string;
  cacheServerSupportsAuth?: boolean;
}
export class CacheServerClient implements ICacheServerClient {
  private httpClient: AxiosInstance;
  private isAlreadyFetchingAccessToken = false;
  private failedRequests: Array<(token?: string) => void> = [];
  private authEnabled: boolean;
  private isBrowser: boolean;
  private refresh_token: string | undefined;

  constructor({ url, cacheServerSupportsAuth = true }: CacheServerClientOptions) {
    this.httpClient = axios.create({
      baseURL: url,
      withCredentials: true
    });
    this.httpClient.interceptors.response.use(function(response: AxiosResponse) {
      return response;
    }, this.handleUnauthorized);
    this.authEnabled = cacheServerSupportsAuth;
    this.isBrowser = isBrowser();
  }

  async handleRefreshToken() {
    const { refreshToken, token } = await this.refreshToken();
    this.refresh_token = refreshToken;
    this.failedRequests = this.failedRequests.filter(callback =>
      callback(this.isBrowser ? undefined : token)
    );
    if (!this.isBrowser) {
      this.httpClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      this.refresh_token = refreshToken;
    }
  }

  addFailedRequest(callback: (token?: string) => void) {
    this.failedRequests.push(callback);
  }

  handleUnauthorized = async (error: AxiosError) => {
    const { config, response } = error;
    const originalRequest = config;
    if (
      this.authEnabled &&
      response &&
      response.status === 401 &&
      config &&
      config.url?.indexOf("/login") === -1 &&
      config.url?.indexOf("/refresh_token") === -1
    ) {
      const retryOriginalRequest = new Promise(resolve => {
        this.addFailedRequest((token?: string) => {
          if (token) {
            originalRequest.headers.Authorization = "Bearer " + token;
          }
          resolve(axios(originalRequest));
        });
      });
      if (!this.isAlreadyFetchingAccessToken) {
        this.isAlreadyFetchingAccessToken = true;
        await this.handleRefreshToken();
        this.isAlreadyFetchingAccessToken = false;
      }
      return retryOriginalRequest;
    }
    return Promise.reject(error);
  };

  async login(identityToken: string) {
    if (!this.authEnabled) return;

    const {
      data: { refreshToken, token }
    } = await this.httpClient.post<{ token: string; refreshToken: string }>("/login", {
      identityToken
    });

    if (!this.isBrowser) {
      this.httpClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      this.refresh_token = refreshToken;
    }
  }

  async refreshToken() {
    const { data } = await this.httpClient.get<{ token: string; refreshToken: string }>(
      `/refresh_token${this.isBrowser ? "" : `?refresh_token=${this.refresh_token}`}`
    );
    return data;
  }

  async getRoleDefinition({ namespace }: { namespace: string }) {
    const { data } = await this.httpClient.get<IRole>(`/role/${namespace}`);
    return data?.definition;
  }

  async getOrgDefinition({ namespace }: { namespace: string }) {
    const { data } = await this.httpClient.get<IOrganization>(`/org/${namespace}`);
    return data?.definition;
  }

  async getAppDefinition({ namespace }: { namespace: string }) {
    const { data } = await this.httpClient.get<IApp>(`/app/${namespace}`);
    return data?.definition;
  }

  async getApplicationRoles({ namespace }: { namespace: string }) {
    const { data } = await this.httpClient.get<IRole[]>(`/app/${namespace}/roles`);
    return data;
  }

  async getOrganizationRoles({ namespace }: { namespace: string }) {
    const { data } = await this.httpClient.get<IRole[]>(`/org/${namespace}/roles`);
    return data;
  }

  async getOrganizationsByOwner({
    owner,
    excludeSubOrgs
  }: {
    owner: string;
    excludeSubOrgs: boolean;
  }) {
    const { data } = await this.httpClient.get<IOrganization[]>(
      `/org/owner/${owner}?excludeSubOrgs=${excludeSubOrgs}`
    );
    return data;
  }

  async getSubOrganizationsByOrganization({ namespace }: { namespace: string }) {
    const { data } = await this.httpClient.get<IOrganization[]>(`/org/${namespace}/suborgs`);
    return data;
  }

  async getOrgHierarchy({ namespace }: { namespace: string }) {
    const { data } = await this.httpClient.get<IOrganization>(`/org/${namespace}`);
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
      const { data } = await this.httpClient.get<(IOrganization | IApp | IRole)[]>(
        `/search/${search}`,
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
    const { data } = await this.httpClient.get<(IOrganization | IApp | IRole)[]>(
      `/search/${search}`
    );
    return data;
  }

  async getApplicationsByOwner({ owner }: { owner: string }) {
    const { data } = await this.httpClient.get<IApp[]>(`/app/owner/${owner}`);
    return data;
  }

  async getApplicationsByOrganization({ namespace }: { namespace: string }) {
    const { data } = await this.httpClient.get<IApp[]>(`/org/${namespace}/apps`);
    return data;
  }

  async getRolesByOwner({ owner }: { owner: string }) {
    const { data } = await this.httpClient.get<IRole[]>(`/role/owner/${owner}`);
    return data;
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
    const { data } = await this.httpClient.get<Claim[]>(`/claim/issuer/${did}`, {
      params: {
        accepted: isAccepted,
        parentNamespace
      }
    });
    return data;
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
    const { data } = await this.httpClient.get<Claim[]>(`/claim/requester/${did}`, {
      params: {
        accepted: isAccepted,
        parentNamespace
      }
    });
    return data;
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

  async deleteClaim({ claimId }: { claimId: string }) {
    await this.httpClient.delete<void>(`/claim/${claimId}`);
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

  async getOwnedAssets({ did }: { did: string }) {
    const { data } = await this.httpClient.get<Asset[]>(`/assets/owner/${did}`);
    return data;
  }

  async getOfferedAssets({ did }: { did: string }) {
    const { data } = await this.httpClient.get<Asset[]>(`/assets/offered_to/${did}`);
    return data;
  }

  async getAssetById({ id }: { id: string }) {
    const { data } = await this.httpClient.get<Asset>(`/assets/${id}`);
    return data;
  }

  async getPreviouslyOwnedAssets({ owner }: { owner: string }) {
    const { data } = await this.httpClient.get<Asset[]>(`/assets/owner/history/${owner}`);
    return data;
  }

  async getAssetHistory({
    id,
    order,
    take,
    skip,
    type
  }: {
    id: string;
    order?: Order;
    take?: number;
    skip?: number;
    type?: AssetHistoryEventType;
  }) {
    const query = stringify({ order, take, skip, type }, { skipNulls: true });
    const { data } = await this.httpClient.get<AssetHistory[]>(`/assets/history/${id}?${query}`);
    return data;
  }
}
