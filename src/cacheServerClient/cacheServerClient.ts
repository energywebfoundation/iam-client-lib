import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { Signer } from "ethers";
import { stringify } from "qs";
import { IApp, IOrganization, IRole, Claim, Asset, AssetHistory } from "./cacheServerClient.types";

import { IDIDDocument } from "@ew-did-registry/did-resolver-interface";

import {
    AddDIDToWatchListParams,
    DeleteClaimParams,
    GetAppDefinitionParams,
    GetApplicationRolesParams,
    GetApplicationsByOrganizationParams,
    GetApplicationsByOwnerParams,
    GetAssetByIdParams,
    GetAssetHistoryParams,
    GetClaimsByIssuerParams,
    GetClaimsByRequesterParams,
    GetClaimsBySubjectParams,
    GetDidDocumentParams,
    GetDIDsForRoleParams,
    GetetSubOrganizationsByOrganizationParams,
    GetNamespaceBySearchPhraseParams,
    GetOfferedAssetsParams,
    GetOrganizationRolesParams,
    GetOrganizationsByOwnerParams,
    GetOrgDefinitionParams,
    GetOrgHierarchyParams,
    GetOwnedAssetsParams,
    GetPreviouslyOwnedAssetsParams,
    GetRoleDefinitionParams,
    GetRolesByOwnerParams,
    ICacheServerClient,
    IssueClaimParams,
    RejectClaimParams,
    RequestClaimParams,
} from "./ICacheServerClient";
import { detectExecutionEnvironment, ExecutionEnvironment } from "../utils/detectEnvironment";
import { getPublicKeyAndIdentityToken, IPubKeyAndIdentityToken } from "../utils/getPublicKeyAndIdentityToken";

export interface CacheServerClientOptions {
    url: string;
    cacheServerSupportsAuth?: boolean;
}
export class CacheServerClient implements ICacheServerClient {
    public pubKeyAndIdentityToken: IPubKeyAndIdentityToken | undefined;
    private httpClient: AxiosInstance;
    private isAlreadyFetchingAccessToken = false;
    private failedRequests: Array<(token?: string) => void> = [];
    private authEnabled: boolean;
    private executionEnvironment: ExecutionEnvironment;
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
        this.executionEnvironment = detectExecutionEnvironment();
        this.signer = signer;
    }

    isAuthEnabled() {
        return this.authEnabled;
    }

    async handleRefreshToken() {
        const { refreshToken, token } = await this.refreshToken();
        this.refresh_token = refreshToken;
        this.failedRequests = this.failedRequests.filter((callback) =>
            callback(this.executionEnvironment === ExecutionEnvironment.BROWSER ? undefined : token),
        );
        if (this.executionEnvironment === ExecutionEnvironment.NODE) {
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

        if (this.executionEnvironment === ExecutionEnvironment.NODE) {
            this.httpClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            this.refresh_token = refreshToken;
        }
        return { pubKeyAndIdentityToken, token, refreshToken };
    }

    private async refreshToken(): Promise<{ token: string; refreshToken: string }> {
        try {
            const { data } = await this.httpClient.get<{ token: string; refreshToken: string }>(
                `/refresh_token${
                    this.executionEnvironment === ExecutionEnvironment.BROWSER
                        ? ""
                        : `?refresh_token=${this.refresh_token}`
                }`,
            );
            return data;
        } catch {
            const loginResult = await this.login();
            this.pubKeyAndIdentityToken = loginResult.pubKeyAndIdentityToken;
            return loginResult;
        }
    }

    async getRoleDefinition({ namespace }: GetRoleDefinitionParams) {
        const { data } = await this.httpClient.get<IRole>(`/role/${namespace}`);
        return data?.definition;
    }

    async getOrgDefinition({ namespace }: GetOrgDefinitionParams) {
        const { data } = await this.httpClient.get<IOrganization>(`/org/${namespace}`);
        return data?.definition;
    }

    async getAppDefinition({ namespace }: GetAppDefinitionParams) {
        const { data } = await this.httpClient.get<IApp>(`/app/${namespace}`);
        return data?.definition;
    }

    async getApplicationRoles({ namespace }: GetApplicationRolesParams) {
        const { data } = await this.httpClient.get<IRole[]>(`/app/${namespace}/roles`);
        return data;
    }

    async getOrganizationRoles({ namespace }: GetOrganizationRolesParams) {
        const { data } = await this.httpClient.get<IRole[]>(`/org/${namespace}/roles`);
        return data;
    }

    async getOrganizationsByOwner({ owner, excludeSubOrgs }: GetOrganizationsByOwnerParams) {
        const { data } = await this.httpClient.get<IOrganization[]>(
            `/org/owner/${owner}?excludeSubOrgs=${excludeSubOrgs}`,
        );
        return data;
    }

    async getSubOrganizationsByOrganization({ namespace }: GetetSubOrganizationsByOrganizationParams) {
        const { data } = await this.httpClient.get<IOrganization[]>(`/org/${namespace}/suborgs`);
        return data;
    }

    async getOrgHierarchy({ namespace }: GetOrgHierarchyParams) {
        const { data } = await this.httpClient.get<IOrganization>(`/org/${namespace}`);
        return data;
    }

    async getNamespaceBySearchPhrase({ types, search }: GetNamespaceBySearchPhraseParams) {
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

    async getApplicationsByOwner({ owner }: GetApplicationsByOwnerParams) {
        const { data } = await this.httpClient.get<IApp[]>(`/app/owner/${owner}`);
        return data;
    }

    async getApplicationsByOrganization({ namespace }: GetApplicationsByOrganizationParams) {
        const { data } = await this.httpClient.get<IApp[]>(`/org/${namespace}/apps`);
        return data;
    }

    async getRolesByOwner({ owner }: GetRolesByOwnerParams) {
        const { data } = await this.httpClient.get<IRole[]>(`/role/owner/${owner}`);
        return data;
    }

    async getClaimsBySubjects(subjects: string[]): Promise<Claim[]> {
        const { data } = await this.httpClient.get<Claim[]>("/claim/by/subjects", {
            params: { subjects: subjects.join(",") },
        });
        return data;
    }

    async getClaimsByIssuer({ did, isAccepted, parentNamespace }: GetClaimsByIssuerParams) {
        const { data } = await this.httpClient.get<Claim[]>(`/claim/issuer/${did}`, {
            params: {
                isAccepted,
                namespace: parentNamespace,
            },
        });
        return data;
    }

    async getClaimsByRequester({ did, isAccepted, parentNamespace }: GetClaimsByRequesterParams) {
        const { data } = await this.httpClient.get<Claim[]>(`/claim/requester/${did}`, {
            params: {
                isAccepted,
                namespace: parentNamespace,
            },
        });
        return data;
    }

    async getClaimsBySubject({ did, isAccepted, parentNamespace }: GetClaimsBySubjectParams) {
        const { data } = await this.httpClient.get<Claim[]>(`/claim/subject/${did}`, {
            params: {
                isAccepted,
                namespace: parentNamespace,
            },
        });
        return data;
    }

    async requestClaim({ message, did }: RequestClaimParams) {
        await this.httpClient.post<void>(`/claim/request/${did}`, message);
    }

    async issueClaim({ message, did }: IssueClaimParams) {
        await this.httpClient.post<void>(`/claim/issue/${did}`, message);
    }

    async rejectClaim({ message, did }: RejectClaimParams) {
        await this.httpClient.post<void>(`/claim/reject/${did}`, message);
    }

    async deleteClaim({ claimId }: DeleteClaimParams) {
        await this.httpClient.delete<void>(`/claim/${claimId}`);
    }

    async getDIDsForRole({ namespace }: GetDIDsForRoleParams) {
        const { data } = await this.httpClient.get<string[]>(`/claim/did/${namespace}?accepted=true`);
        return data;
    }

    async getDidDocument({ did, includeClaims }: GetDidDocumentParams) {
        const { data } = await this.httpClient.get<IDIDDocument>(`/DID/${did}?includeClaims=${includeClaims || false}`);
        return data;
    }

    async addDIDToWatchList({ did }: AddDIDToWatchListParams) {
        await this.httpClient.post(`/DID/${did}`);
    }

    async getOwnedAssets({ did }: GetOwnedAssetsParams) {
        const { data } = await this.httpClient.get<Asset[]>(`/assets/owner/${did}`);
        return data;
    }

    async getOfferedAssets({ did }: GetOfferedAssetsParams) {
        const { data } = await this.httpClient.get<Asset[]>(`/assets/offered_to/${did}`);
        return data;
    }

    async getAssetById({ id }: GetAssetByIdParams) {
        const { data } = await this.httpClient.get<Asset>(`/assets/${id}`);
        return data;
    }

    async getPreviouslyOwnedAssets({ owner }: GetPreviouslyOwnedAssetsParams) {
        const { data } = await this.httpClient.get<Asset[]>(`/assets/owner/history/${owner}`);
        return data;
    }

    async getAssetHistory({ id, order, take, skip, type }: GetAssetHistoryParams) {
        const query = stringify({ order, take, skip, type }, { skipNulls: true });
        const { data } = await this.httpClient.get<AssetHistory[]>(`/assets/history/${id}?${query}`);
        return data;
    }
}
