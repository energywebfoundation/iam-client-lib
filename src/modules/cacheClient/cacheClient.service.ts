import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { stringify } from "qs";
import { IRoleDefinition } from "@energyweb/iam-contracts";
import { IDIDDocument } from "@ew-did-registry/did-resolver-interface";
import { IApp, IOrganization, IRole, NamespaceType } from "../domains/domains.types";
import { AssetHistory } from "../assets/assets.types";
import { Claim, IClaimIssuance, IClaimRejection, IClaimRequest } from "../claims/claims.types";
import { Asset } from "../assets/assets.types";
import { executionEnvironment, ExecutionEnvironment } from "../../utils/detectEnvironment";
import { SignerService } from "../signer/signer.service";
import { IPubKeyAndIdentityToken } from "../signer/signer.types";
import { cacheConfigs } from "../../config/cache.config";
import { ICacheClient } from "./ICacheClient";
import { AssetsFilter, ClaimsFilter } from "./cacheClient.types";

export class CacheClient implements ICacheClient {
    public pubKeyAndIdentityToken: IPubKeyAndIdentityToken | undefined;
    private httpClient: AxiosInstance;
    private isAlreadyFetchingAccessToken = false;
    private failedRequests: Array<(token?: string) => void> = [];
    private authEnabled: boolean;
    private isBrowser: boolean;
    private refresh_token: string | undefined;

    constructor(private _signerService: SignerService) {
        this._signerService.onInit(async () => await this.init());
    }

    async init() {
        const { url, cacheServerSupportsAuth = false } = cacheConfigs()[this._signerService.chainId];
        this.httpClient = axios.create({
            baseURL: url,
            withCredentials: true,
        });
        this.httpClient.interceptors.response.use(function (response: AxiosResponse) {
            return response;
        }, this.handleUnauthorized);
        this.authEnabled = cacheServerSupportsAuth;
        this.isBrowser = executionEnvironment() === ExecutionEnvironment.BROWSER;
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

    async handleUnauthorized(error: AxiosError) {
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
    }

    async testLogin(): Promise<void> {
        // Simple test to check if logged in or no. TODO: have dedicated endpoint on the cache-server
        // If receive unauthorized response, expect that refreshToken() will be called
        await this.getRoleDefinition("testing.if.logged.in");
    }

    async login(): Promise<{
        pubKeyAndIdentityToken: IPubKeyAndIdentityToken;
        token: string;
        refreshToken: string;
    }> {
        const pubKeyAndIdentityToken = await this._signerService.publicKeyAndIdentityToken();
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

    async getRoleDefinition(namespace: string) {
        const { data } = await this.httpClient.get<IRole>(`/role/${namespace}`);
        return data?.definition;
    }

    async getRolesDefinition(namespaces: string[]) {
        const { data } = await this.httpClient.get<IRole[]>(`/role?namespaces=${namespaces.join(",")}`);
        const rolesWithDefinitions = data?.map((entry) => ({ definition: entry.definition, role: entry.namespace }));
        return rolesWithDefinitions.reduce((result, { role, definition }) => {
            return { ...result, [role]: definition };
        }, {} as Record<string, IRoleDefinition>);
    }

    async getOrgDefinition(namespace: string) {
        const { data } = await this.httpClient.get<IOrganization>(`/org/${namespace}`);
        return data?.definition;
    }

    async getAppDefinition(namespace: string) {
        const { data } = await this.httpClient.get<IApp>(`/app/${namespace}`);
        return data?.definition;
    }

    async getApplicationRoles(namespace: string) {
        const { data } = await this.httpClient.get<IRole[]>(`/app/${namespace}/roles`);
        return data;
    }

    async getOrganizationRoles(namespace: string) {
        const { data } = await this.httpClient.get<IRole[]>(`/org/${namespace}/roles`);
        return data;
    }

    async getOrganizationsByOwner(owner: string, withRelations = true) {
        const { data } = await this.httpClient.get<IOrganization[]>(
            `/org/owner/${owner}?withRelations=${withRelations}`,
        );
        return data;
    }

    async getSubOrganizationsByOrganization(namespace: string) {
        const { data } = await this.httpClient.get<IOrganization[]>(`/org/${namespace}/suborgs`);
        return data;
    }

    async getOrgHierarchy(namespace: string) {
        const { data } = await this.httpClient.get<IOrganization>(`/org/${namespace}`);
        return data;
    }

    async getNamespaceBySearchPhrase(search: string, types?: NamespaceType[]) {
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

    async getApplicationsByOwner(owner: string, withRelations = true) {
        const { data } = await this.httpClient.get<IApp[]>(`/app/owner/${owner}?withRelations=${withRelations}`);
        return data;
    }

    async getApplicationsByOrganization(namespace: string) {
        const { data } = await this.httpClient.get<IApp[]>(`/org/${namespace}/apps`);
        return data;
    }

    async getRolesByOwner(owner: string) {
        const { data } = await this.httpClient.get<IRole[]>(`/role/owner/${owner}`);
        return data;
    }

    async getClaimsBySubjects(subjects: string[]): Promise<Claim[]> {
        const { data } = await this.httpClient.get<Claim[]>("/claim/by/subjects", {
            params: { subjects: subjects.join(",") },
        });
        return data;
    }

    async getClaimsByIssuer(issuer: string, { isAccepted, namespace }: ClaimsFilter = {}) {
        const { data } = await this.httpClient.get<Claim[]>(`/claim/issuer/${issuer}`, {
            params: {
                isAccepted,
                namespace,
            },
        });
        return data;
    }

    async getClaimsByRequester(requester: string, { isAccepted, namespace }: ClaimsFilter = {}) {
        const { data } = await this.httpClient.get<Claim[]>(`/claim/requester/${requester}`, {
            params: {
                isAccepted,
                namespace,
            },
        });
        return data;
    }

    async getClaimsBySubject(subject: string, { isAccepted, namespace }: ClaimsFilter = {}) {
        const { data } = await this.httpClient.get<Claim[]>(`/claim/subject/${subject}`, {
            params: {
                isAccepted,
                namespace,
            },
        });
        return data;
    }

    async requestClaim(requester: string, message: IClaimRequest) {
        await this.httpClient.post<void>(`/claim/request/${requester}`, message);
    }

    async issueClaim(issuer: string, message: IClaimIssuance) {
        await this.httpClient.post<void>(`/claim/issue/${issuer}`, message);
    }

    async rejectClaim(issuer: string, message: IClaimRejection) {
        await this.httpClient.post<void>(`/claim/reject/${issuer}`, message);
    }

    async deleteClaim(id: string) {
        await this.httpClient.delete<void>(`/claim/${id}`);
    }

    async getDIDsForRole(namespace: string) {
        const { data } = await this.httpClient.get<string[]>(`/claim/did/${namespace}?accepted=true`);
        return data;
    }

    async getDidDocument(did: string, includeClaims?: boolean) {
        const { data } = await this.httpClient.get<IDIDDocument>(`/DID/${did}?includeClaims=${includeClaims || false}`);
        return data;
    }

    async addDIDToWatchList(did: string) {
        await this.httpClient.post(`/DID/${did}`);
    }

    async getOwnedAssets(did: string) {
        const { data } = await this.httpClient.get<Asset[]>(`/assets/owner/${did}`);
        return data;
    }

    async getOfferedAssets(did: string) {
        const { data } = await this.httpClient.get<Asset[]>(`/assets/offered_to/${did}`);
        return data;
    }

    async getAssetById(id: string) {
        const { data } = await this.httpClient.get<Asset>(`/assets/${id}`);
        return data;
    }

    async getPreviouslyOwnedAssets(owner: string) {
        const { data } = await this.httpClient.get<Asset[]>(`/assets/owner/history/${owner}`);
        return data;
    }

    async getAssetHistory(id: string, { order, take, skip, type }: AssetsFilter = {}) {
        const query = stringify({ order, take, skip, type }, { skipNulls: true });
        const { data } = await this.httpClient.get<AssetHistory[]>(`/assets/history/${id}?${query}`);
        return data;
    }

    private async refreshToken(): Promise<{ token: string; refreshToken: string }> {
        try {
            const { data } = await this.httpClient.get<{ token: string; refreshToken: string }>(
                `/refresh_token${
                    executionEnvironment() === ExecutionEnvironment.BROWSER
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
}
