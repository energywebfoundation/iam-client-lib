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
    AssetHistory,
} from "./cacheClient.types";

import { IClaimIssuance, IClaimRejection, IClaimRequest } from "../../iam";
import { IDIDDocument } from "@ew-did-registry/did-resolver-interface";

import { ICacheClient } from "./ICacheClient";
import { isBrowser } from "../../utils/isBrowser";
import { getPublicKeyAndIdentityToken, IPubKeyAndIdentityToken } from "../../utils/getPublicKeyAndIdentityToken";
import { Signer } from "ethers";
import { Injectable } from "@nestjs/common";

export interface CacheServerClientOptions {
    url: string;
    cacheServerSupportsAuth?: boolean;
}

@Injectable()
export class CacheClient implements ICacheClient {
    public pubKeyAndIdentityToken: IPubKeyAndIdentityToken | undefined;
    private httpClient: AxiosInstance;
    private isAlreadyFetchingAccessToken = false;
    private failedRequests: Array<(token?: string) => void> = [];
    private authEnabled: boolean;
    private isBrowser: boolean;
    private refresh_token: string | undefined;
    private readonly signer: Signer;

    constructor({ url, cacheServerSupportsAuth = true }: CacheServerClientOptions, signer: Signer) {
        this.httpClient = axios.create({
            baseURL: url,
            withCredentials: true,
        });
        this.httpClient.interceptors.response.use(function (response: AxiosResponse) {
            return response;
        }, this.handleUnauthorized);
        this.authEnabled = cacheServerSupportsAuth;
        this.isBrowser = isBrowser();
        this.signer = signer;
    }

    isAuthEnabled() {
        return this.authEnabled;
    }

    async handleRefreshToken() {
        const { refreshToken, token } = await this.refreshToken();
        this.refresh_token = refreshToken;
        this.failedRequests = this.failedRequests.filter((callback) => callback(this.isBrowser ? undefined : token));
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
            const retryOriginalRequest = new Promise((resolve) => {
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

    public async testLogin(): Promise<void> {
        // Simple test to check if logged in or no. TODO: have dedicated endpoint on the cache-server
        // If receive unauthorized response, expect that refreshToken() will be called
        await this.getRoleDefinition({ namespace: "testing.if.logged.in" });
    }

    public async login(): Promise<{
        pubKeyAndIdentityToken: IPubKeyAndIdentityToken;
        token: string;
        refreshToken: string;
    }> {
        const pubKeyAndIdentityToken = await getPublicKeyAndIdentityToken(this.signer);
        const {
            data: { refreshToken, token },
        } = await this.httpClient.post<{ token: string; refreshToken: string }>("/login", {
            identityToken: pubKeyAndIdentityToken.identityToken,
        });

        if (!this.isBrowser) {
            this.httpClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            this.refresh_token = refreshToken;
        }
        return { pubKeyAndIdentityToken, token, refreshToken };
    }

    private async refreshToken(): Promise<{ token: string; refreshToken: string }> {
        try {
            const { data } = await this.httpClient.get<{ token: string; refreshToken: string }>(
                `/refresh_token${this.isBrowser ? "" : `?refresh_token=${this.refresh_token}`}`,
            );
            return data;
        } catch {
            const loginResult = await this.login();
            this.pubKeyAndIdentityToken = loginResult.pubKeyAndIdentityToken;
            return loginResult;
        }
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

    async getOrganizationsByOwner({ owner, excludeSubOrgs }: { owner: string; excludeSubOrgs: boolean }) {
        const { data } = await this.httpClient.get<IOrganization[]>(
            `/org/owner/${owner}?excludeSubOrgs=${excludeSubOrgs}`,
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

    async getNamespaceBySearchPhrase({ types, search }: { types?: ("App" | "Org" | "Role")[]; search: string }) {
        if (types && types.length > 0) {
            const { data } = await this.httpClient.get<(IOrganization | IApp | IRole)[]>(`/search/${search}`, {
                params: {
                    types,
                },
                paramsSerializer: (params) => {
                    return stringify(params, { arrayFormat: "brackets" });
                },
            });
            return data;
        }
        const { data } = await this.httpClient.get<(IOrganization | IApp | IRole)[]>(`/search/${search}`);
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

    async getClaimsBySubjects(subjects: string[]): Promise<Claim[]> {
        const { data } = await this.httpClient.get<Claim[]>("/claim/by/subjects", {
            params: { subjects: subjects.join(",") },
        });
        return data;
    }

    async getClaimsByIssuer({ did, isAccepted, namespace }: { did: string; isAccepted?: boolean; namespace?: string }) {
        const { data } = await this.httpClient.get<Claim[]>(`/claim/issuer/${did}`, {
            params: {
                isAccepted,
                namespace,
            },
        });
        return data;
    }

    async getClaimsByRequester({
        did,
        isAccepted,
        namespace,
    }: {
        did: string;
        isAccepted?: boolean;
        namespace?: string;
    }) {
        const { data } = await this.httpClient.get<Claim[]>(`/claim/requester/${did}`, {
            params: {
                isAccepted,
                namespace,
            },
        });
        return data;
    }

    async getClaimsBySubject({
        did,
        isAccepted,
        namespace,
    }: {
        did: string;
        isAccepted?: boolean;
        namespace?: string;
    }) {
        const { data } = await this.httpClient.get<Claim[]>(`/claim/subject/${did}`, {
            params: {
                isAccepted,
                namespace,
            },
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
        const { data } = await this.httpClient.get<IDIDDocument>(`/DID/${did}?includeClaims=${includeClaims || false}`);
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
        type,
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
