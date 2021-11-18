import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { stringify } from "qs";
import { IRoleDefinition } from "@energyweb/iam-contracts";
import { IDIDDocument } from "@ew-did-registry/did-resolver-interface";
import { IApp, IOrganization, IRole } from "../domains/domains.types";
import { AssetHistory } from "../assets/assets.types";
import { Claim, IClaimIssuance, IClaimRejection, IClaimRequest } from "../claims/claims.types";
import { Asset } from "../assets/assets.types";
import { executionEnvironment, ExecutionEnvironment } from "../../utils/detectEnvironment";
import { SignerService } from "../signer/signer.service";
import { IPubKeyAndIdentityToken } from "../signer/signer.types";
import { cacheConfigs } from "../../config/cache.config";
import { ICacheClient } from "./ICacheClient";
import { AssetsFilter, ClaimsFilter, TEST_LOGIN_ENDPOINT } from "./cacheClient.types";
import { SearchType } from ".";

export class CacheClient implements ICacheClient {
    public pubKeyAndIdentityToken: IPubKeyAndIdentityToken | undefined;
    private httpClient: AxiosInstance;
    private isAuthenticating = false;
    private failedRequests: Array<() => void> = [];
    private authEnabled: boolean;
    private isBrowser: boolean;
    private refresh_token: string | undefined;
    private token: string | undefined;

    constructor(private _signerService: SignerService) {
        this._signerService.onInit(this.init.bind(this));
    }

    async init() {
        const { url, cacheServerSupportsAuth = false } = cacheConfigs()[this._signerService.chainId];
        this.httpClient = axios.create({
            baseURL: url,
            withCredentials: true,
        });
        this.httpClient.interceptors.response.use((response: AxiosResponse) => {
            return response;
        }, this.handleError.bind(this));
        this.authEnabled = cacheServerSupportsAuth;
        this.isBrowser = executionEnvironment() === ExecutionEnvironment.BROWSER;
        if (!this.isBrowser) {
            this.httpClient.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
        }
    }

    isAuthEnabled() {
        return this.authEnabled;
    }

    /**
     * @description Refreshes access token. If login still fails then signs new identity token and requests access token
     * After authentication runs previously failed requests
     */
    async handleUnauthenticated() {
        try {
            const { refreshToken, token } = await this.refreshToken();
            if (await this.isLoggedIn()) {
                this.refresh_token = refreshToken;
                this.token = token;
                return;
            }
        } catch {}

        const pubKeyAndIdentityToken = await this._signerService.publicKeyAndIdentityToken();
        const {
            data: { refreshToken, token },
        } = await this.httpClient.post<{ token: string; refreshToken: string }>("/login", {
            identityToken: pubKeyAndIdentityToken.identityToken,
        });
        this.refresh_token = refreshToken;
        this.token = token;
        this.pubKeyAndIdentityToken = pubKeyAndIdentityToken;

        this.failedRequests = this.failedRequests.filter((callback) => callback());
    }

    /**
     * @description Schedules failed requests after login in
     * @param error
     * @returns
     */
    async handleError(error: AxiosError) {
        const { config, response } = error;
        const originalRequest = config;
        if (
            this.authEnabled &&
            response &&
            (response.status === 401 || response.status === 403) &&
            config &&
            config.url?.indexOf("/login") === -1 &&
            config.url?.indexOf("/refresh_token") === -1 &&
            config.url?.indexOf(TEST_LOGIN_ENDPOINT) === -1
        ) {
            const retryOriginalRequest = new Promise((resolve) => {
                this.failedRequests.push(() => {
                    resolve(axios(originalRequest));
                });
            });
            if (!this.isAuthenticating) {
                this.isAuthenticating = true;
                await this.handleUnauthenticated();
                this.isAuthenticating = false;
            }
            return retryOriginalRequest;
        }
        return Promise.reject(error);
    }

    async login() {
        if (!(await this.isLoggedIn())) {
            await this.handleUnauthenticated();
        }
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

    async getNamespaceBySearchPhrase(search: string, types?: SearchType[]) {
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

    async getAllowedRolesByIssuer(did: string) {
        const { data } = await this.httpClient.get<string[]>(`/claim/issuer/roles/allowed/${did}`);
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
        const { data } = await this.httpClient.get<{ token: string; refreshToken: string }>(
            `/refresh_token${this.isBrowser ? "" : `?refresh_token=${this.refresh_token}`}`,
        );
        return data;
    }

    /**
     * @description Checks that auth token has been created, has not expired and corresponds to logged in user
     * @todo specific endpoint on cache server to return login info instead of error
     */
    private async isLoggedIn(): Promise<boolean> {
        try {
            await this.getOwnedAssets(this._signerService.did);
            return true;
        } catch (_) {
            return false;
        }
    }
}
