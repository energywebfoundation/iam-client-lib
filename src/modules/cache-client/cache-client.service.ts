import axios, { AxiosInstance } from 'axios';
import { stringify } from 'qs';
import { IRoleDefinition } from '@energyweb/credential-governance';
import { IDIDDocument } from '@ew-did-registry/did-resolver-interface';
import {
  Credential,
  StatusList2021Entry,
  VerifiableCredential,
} from '@ew-did-registry/credentials-interface';
import promiseRetry from 'promise-retry';
import { IApp, IOrganization, IRole } from '../domains/domains.types';
import { AssetHistory } from '../assets/assets.types';
import {
  Claim,
  IClaimIssuance,
  IClaimRejection,
  IClaimRequest,
} from '../claims/claims.types';
import { Asset } from '../assets/assets.types';
import {
  executionEnvironment,
  ExecutionEnvironment,
} from '../../utils/detect-environment';
import { SignerService } from '../signer/signer.service';
import { IPubKeyAndIdentityToken } from '../signer/signer.types';
import { cacheConfigs } from '../../config/cache.config';
import { ICacheClient } from './cache-client.interface';
import {
  AssetsFilter,
  AuthTokens,
  ClaimsFilter,
  TEST_LOGIN_ENDPOINT,
} from './cache-client.types';
import { SearchType } from '.';
import { getLogger } from '../../config/logger.config';
import {
  RoleCredentialSubject,
  StatusList2021Credential,
  StatusList2021UnsignedCredential,
} from '../verifiable-credentials';

export class CacheClient implements ICacheClient {
  public pubKeyAndIdentityToken: IPubKeyAndIdentityToken | undefined;
  private _httpClient: AxiosInstance;
  private authenticatePromise: Promise<void>;
  private isAuthenticating = false;
  private authEnabled: boolean;
  private isBrowser: boolean;
  private refresh_token: string | undefined;

  constructor(private _signerService: SignerService) {
    this._signerService.onInit(this.init.bind(this));
  }

  async init() {
    const { url, cacheServerSupportsAuth = false } =
      cacheConfigs()[this._signerService.chainId];
    this._httpClient = axios.create({
      baseURL: url,
      withCredentials: true,
    });
    this.authEnabled = cacheServerSupportsAuth;
    this.isBrowser = executionEnvironment() === ExecutionEnvironment.BROWSER;
  }

  isAuthEnabled() {
    return this.authEnabled;
  }

  /**
   * @description Refreshes access token. If login still fails then signs new identity token and requests access token
   * After authentication runs previously failed requests
   */
  async authenticate() {
    let tokens: AuthTokens | undefined = undefined;

    const setTokens = () => {
      if (!tokens) return;
      if (!this.isBrowser) {
        this._httpClient.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${tokens.token}`;
      }
      this.refresh_token = tokens.refreshToken;
    };

    // First try to refresh access token
    try {
      const refreshedTokens = await this.refreshToken();
      tokens = refreshedTokens;
      setTokens();

      if (!tokens || !(await this.isAuthenticated())) {
        tokens = undefined;
      }
    } catch {
      getLogger().error('[CACHE CLIENT] failed to refresh tokens');
    }

    // If refresh token failed or access token is not valid, then sign new identity token
    if (!tokens) {
      getLogger().error('[CACHE CLIENT] obtaining new tokens');
      delete this._httpClient.defaults.headers.common['Authorization'];
      const pubKeyAndIdentityToken =
        await this._signerService.publicKeyAndIdentityToken(true);
      const { data } = await this._httpClient.post<AuthTokens>('/login', {
        identityToken: pubKeyAndIdentityToken.identityToken,
      });
      this.pubKeyAndIdentityToken = pubKeyAndIdentityToken;
      tokens = data;
      setTokens();
    }
    getLogger().info('[CACHE CLIENT] authenticated');
  }

  /**
   * Verifies current session and establishes new one if needed
   * https://energyweb.atlassian.net/wiki/spaces/MYEN/pages/2303295607/ICL-+ICS+Auth+Process
   */
  async login() {
    if (!(await this.isAuthenticated())) {
      await this.authenticate();
    }
  }

  get http() {
    return this._httpClient;
  }

  async getRoleDefinition(namespace: string) {
    return await this.makeRetryRequest(async () => {
      const { data } = await this._httpClient.get<IRole>(`/role/${namespace}`);
      return data?.definition;
    });
  }

  async getRolesDefinition(namespaces: string[]) {
    return await this.makeRetryRequest(async () => {
      const { data } = await this._httpClient.get<IRole[]>(
        `/role?namespaces=${namespaces.join(',')}`
      );
      const rolesWithDefinitions = data?.map((entry) => ({
        definition: entry.definition,
        role: entry.namespace,
      }));
      return rolesWithDefinitions.reduce((result, { role, definition }) => {
        return { ...result, [role]: definition };
      }, {} as Record<string, IRoleDefinition>);
    });
  }

  async getOrgDefinition(namespace: string) {
    return await this.makeRetryRequest(async () => {
      const { data } = await this._httpClient.get<IOrganization>(
        `/org/${namespace}`
      );
      return data?.definition;
    });
  }

  async getAppDefinition(namespace: string) {
    return await this.makeRetryRequest(async () => {
      const { data } = await this._httpClient.get<IApp>(`/app/${namespace}`);
      return data?.definition;
    });
  }

  async getApplicationRoles(namespace: string) {
    return await this.makeRetryRequest(async () => {
      const { data } = await this._httpClient.get<IRole[]>(
        `/app/${namespace}/roles`
      );
      return data;
    });
  }

  async getOrganizationRoles(namespace: string) {
    return await this.makeRetryRequest(async () => {
      const { data } = await this._httpClient.get<IRole[]>(
        `/org/${namespace}/roles`
      );
      return data;
    });
  }

  async getOrganizationsByOwner(owner: string, withRelations = true) {
    return await this.makeRetryRequest(async () => {
      const { data } = await this._httpClient.get<IOrganization[]>(
        `/org/owner/${owner}?withRelations=${withRelations}`
      );
      return data;
    });
  }

  async getSubOrganizationsByOrganization(namespace: string) {
    return await this.makeRetryRequest(async () => {
      const { data } = await this._httpClient.get<IOrganization[]>(
        `/org/${namespace}/suborgs`
      );
      return data;
    });
  }

  async getOrgHierarchy(namespace: string) {
    return await this.makeRetryRequest(async () => {
      const { data } = await this._httpClient.get<IOrganization>(
        `/org/${namespace}`
      );
      return data;
    });
  }

  async getNamespaceBySearchPhrase(search: string, types?: SearchType[]) {
    return await this.makeRetryRequest(async () => {
      if (types && types.length > 0) {
        const { data } = await this._httpClient.get<
          (IOrganization | IApp | IRole)[]
        >(`/search/${search}`, {
          params: {
            types,
          },
          paramsSerializer: (params) => {
            return stringify(params, { arrayFormat: 'brackets' });
          },
        });
        return data;
      }
      const { data } = await this._httpClient.get<
        (IOrganization | IApp | IRole)[]
      >(`/search/${search}`);
      return data;
    });
  }

  async getApplicationsByOwner(owner: string, withRelations = true) {
    return await this.makeRetryRequest(async () => {
      const { data } = await this._httpClient.get<IApp[]>(
        `/app/owner/${owner}?withRelations=${withRelations}`
      );
      return data;
    });
  }

  async getApplicationsByOrganization(namespace: string) {
    return await this.makeRetryRequest(async () => {
      const { data } = await this._httpClient.get<IApp[]>(
        `/org/${namespace}/apps`
      );
      return data;
    });
  }

  async getRolesByOwner(owner: string) {
    return await this.makeRetryRequest(async () => {
      const { data } = await this._httpClient.get<IRole[]>(
        `/role/owner/${owner}`
      );
      return data;
    });
  }

  async getClaimsBySubjects(subjects: string[]): Promise<Claim[]> {
    return await this.makeRetryRequest(async () => {
      const { data } = await this._httpClient.get<Claim[]>(
        '/claim/by/subjects',
        {
          params: { subjects: subjects.join(',') },
        }
      );
      return data;
    });
  }

  async getClaimsByIssuer(
    issuer: string,
    { isAccepted, namespace }: ClaimsFilter = {}
  ) {
    return await this.makeRetryRequest(async () => {
      const { data } = await this._httpClient.get<Claim[]>(
        `/claim/issuer/${issuer}`,
        {
          params: {
            isAccepted,
            namespace,
          },
        }
      );
      return data;
    });
  }

  async getClaimsByRequester(
    requester: string,
    { isAccepted, namespace }: ClaimsFilter = {}
  ) {
    return await this.makeRetryRequest(async () => {
      const { data } = await this._httpClient.get<Claim[]>(
        `/claim/requester/${requester}`,
        {
          params: {
            isAccepted,
            namespace,
          },
        }
      );
      return data;
    });
  }

  async getClaimsBySubject(
    subject: string,
    { isAccepted, namespace }: ClaimsFilter = {}
  ) {
    return await this.makeRetryRequest(async () => {
      const { data } = await this._httpClient.get<Claim[]>(
        `/claim/subject/${subject}`,
        {
          params: {
            isAccepted,
            namespace,
          },
        }
      );
      return data;
    });
  }

  async getRolesByRevoker(revoker: string) {
    return await this.makeRetryRequest(async () => {
      const { data } = await this._httpClient.get<IRole[]>(
        `/claim/revoker/roles/allowed/${revoker}`
      );
      return data;
    });
  }

  async getClaimsByRevoker(revoker: string, { namespace }: ClaimsFilter = {}) {
    const { data } = await this._httpClient.get<Claim[]>(
      `/claim/revoker/${revoker}`,
      {
        params: {
          namespace,
        },
      }
    );
    return data;
  }

  async getClaimById(claimId: string): Promise<Claim | undefined> {
    return await this.makeRetryRequest(async () => {
      const { data } = await this._httpClient.get<Claim | undefined>(
        `/claim/${claimId}`
      );
      return data;
    });
  }

  async requestClaim(message: IClaimRequest) {
    return await this.makeRetryRequest(async () => {
      await this._httpClient.post<void>('/claim/request', message);
    });
  }

  async issueClaim(issuer: string, message: IClaimIssuance) {
    return await this.makeRetryRequest(async () => {
      await this._httpClient.post<void>(`/claim/issue/${issuer}`, message);
    });
  }

  async rejectClaim(issuer: string, message: IClaimRejection) {
    return await this.makeRetryRequest(async () => {
      await this._httpClient.post<void>(`/claim/reject/${issuer}`, message);
    });
  }

  async deleteClaim(id: string) {
    return await this.makeRetryRequest(async () => {
      await this._httpClient.delete<void>(`/claim/${id}`);
    });
  }

  async getDIDsForRole(namespace: string) {
    return await this.makeRetryRequest(async () => {
      const { data } = await this._httpClient.get<string[]>(
        `/claim/did/${namespace}?accepted=true`
      );
      return data;
    });
  }

  async getDidDocument(did: string, includeClaims?: boolean) {
    return await this.makeRetryRequest(async () => {
      const { data } = await this._httpClient.get<IDIDDocument>(
        `/DID/${did}?includeClaims=${includeClaims || false}`
      );
      return data;
    });
  }

  async getAllowedRolesByIssuer(did: string) {
    return await this.makeRetryRequest(async () => {
      const { data } = await this._httpClient.get<IRole[]>(
        `/claim/issuer/roles/allowed/${did}`
      );
      return data;
    });
  }

  async addDIDToWatchList(did: string) {
    return await this.makeRetryRequest(async () => {
      await this._httpClient.post(`/DID/${did}`);
    });
  }

  async getOwnedAssets(did: string) {
    return await this.makeRetryRequest(async () => {
      const { data } = await this._httpClient.get<Asset[]>(
        `/assets/owner/${did}`
      );
      return data;
    });
  }

  async getOfferedAssets(did: string) {
    return await this.makeRetryRequest(async () => {
      const { data } = await this._httpClient.get<Asset[]>(
        `/assets/offered_to/${did}`
      );
      return data;
    });
  }

  async getAssetById(id: string) {
    return await this.makeRetryRequest(async () => {
      const { data } = await this._httpClient.get<Asset>(`/assets/${id}`);
      return data;
    });
  }

  async getPreviouslyOwnedAssets(owner: string) {
    return await this.makeRetryRequest(async () => {
      const { data } = await this._httpClient.get<Asset[]>(
        `/assets/owner/history/${owner}`
      );
      return data;
    });
  }

  async getAssetHistory(
    id: string,
    { order, take, skip, type }: AssetsFilter = {}
  ) {
    return await this.makeRetryRequest(async () => {
      const query = stringify({ order, take, skip, type }, { skipNulls: true });
      const { data } = await this._httpClient.get<AssetHistory[]>(
        `/assets/history/${id}?${query}`
      );
      return data;
    });
  }

  /**
   * Sets location of the credential status
   *
   * @param credential unsigned credential
   * @return credential with reference to status location
   */
  async addStatusToCredential(
    credential: Credential<RoleCredentialSubject>
  ): Promise<
    Credential<RoleCredentialSubject> & {
      credentialStatus: StatusList2021Entry;
    }
  > {
    return await this.makeRetryRequest(async () => {
      const { data } = await this._httpClient.post<
        Credential<RoleCredentialSubject> & {
          credentialStatus: StatusList2021Entry;
        }
      >('/status-list/entries', { options: {}, credential });
      return data;
    });
  }

  /**
   * Get the StatusList2021Credential object to be signed
   *
   * @param verifiableCredential verifiable credential to be revoked
   * @return unsigned status list credential
   */
  async initiateCredentialStatusUpdate(
    verifiableCredential: VerifiableCredential<RoleCredentialSubject>
  ): Promise<StatusList2021UnsignedCredential> {
    return await this.makeRetryRequest(async () => {
      const { data } =
        await this._httpClient.post<StatusList2021UnsignedCredential>(
          '/status-list/credentials/status/initiate',
          {
            options: {},
            verifiableCredential,
          }
        );
      return data;
    });
  }

  /**
   * Persist signed StatusList2021Credential object in storage.
   *
   * @param statusListCredential signed status list
   * @return status list credential
   */
  async persistCredentialStatusUpdate(
    statusListCredential: StatusList2021Credential
  ): Promise<StatusList2021Credential> {
    return await this.makeRetryRequest(async () => {
      const { data } = await this._httpClient.post<StatusList2021Credential>(
        '/status-list/credentials/status/finalize',
        {
          options: {},
          statusListCredential,
        }
      );
      return data;
    });
  }

  /**
   * Fetch the StatusList2021Credential object from storage.
   *
   * @param credential verifiable credential with status list 2021
   * @return status list credential if found
   */
  async getStatusListCredential(
    credential: VerifiableCredential<RoleCredentialSubject>
  ): Promise<StatusList2021Credential | null> {
    return await this.makeRetryRequest(async () => {
      if (!credential.credentialStatus?.statusListCredential) {
        throw new Error(
          'Missing statusListCredential property in given credential status'
        );
      }

      const response = await axios.get<StatusList2021Credential | null>(
        credential.credentialStatus?.statusListCredential
      );

      return response.status === 200 ? response.data : null;
    });
  }

  /**
   * Checks that auth token has been created, has not expired and corresponds to signer.
   * This is done by a request to the server because the auth token is stored in an HTTP-only cookie and
   * so the Javascript has no way to check its validity
   *
   * @return true if cache client is authenticated server
   */
  async isAuthenticated(): Promise<boolean> {
    getLogger().info('[CACHE CLIENT] fetching authorization status');
    try {
      const { data } = await this._httpClient.get<{
        user: string | null;
      }>(`${TEST_LOGIN_ENDPOINT}`);
      const isAuthenticated = data.user
        ? data.user === this._signerService.did
        : false;
      getLogger().info(
        `[CACHE CLIENT] authorization status: ${
          isAuthenticated ? 'OK' : 'FAIL'
        }`
      );
      return isAuthenticated;
    } catch (error) {
      getLogger().info('[CACHE CLIENT] authorization status: FAIL');
      if (error instanceof Error) {
        getLogger().error(
          `[CACHE CLIENT] error occurred while checking authorization status: ${error.message}`
        );
      }
      return false;
    }
  }

  /**
   * Decides whether to retry the request or not based on the given axios error.
   *
   * @param error axios error
   *
   * @return true if request should be retried
   */
  private async handleRequestError(error: Error): Promise<boolean> {
    if (!axios.isAxiosError(error)) {
      return false;
    }

    getLogger().debug(`[CACHE CLIENT] axios error: ${error.message}`);
    const { config, response } = error;

    if (!response) {
      // ECONNREFUSED error handling,
      return true;
    }

    // Retry server errors
    if (response.status >= 500) {
      return true;
    }

    const clientErrorsToRetry = [401, 403, 407, 408, 411, 412, 425, 426];

    const isAuthEndpoint =
      config.url &&
      (config.url.indexOf('/login') >= 0 ||
        config.url.indexOf('/refresh_token') >= 0 ||
        config.url.indexOf(TEST_LOGIN_ENDPOINT) >= 0);

    if (isAuthEndpoint) {
      return false;
    }

    // Retry some client errors
    if (
      response.status >= 400 &&
      !clientErrorsToRetry.includes(response.status)
    ) {
      return false;
    }

    const isAuthError = [401, 403, 407].includes(response.status);
    if (!isAuthError) {
      return true;
    }

    getLogger().debug(`[CACHE CLIENT] axios error unauthorized`);

    if (!this.isAuthenticating) {
      this.isAuthenticating = true;
      this.authenticatePromise = this.authenticate();
    }

    try {
      await this.authenticatePromise;
    } finally {
      this.isAuthenticating = false;
    }

    return true;
  }

  private async makeRetryRequest<T>(request: () => Promise<T>): Promise<T> {
    return promiseRetry(
      async (retry) => {
        return request().catch(async (err) => {
          try {
            if (await this.handleRequestError(err)) {
              retry(err);
            }
          } catch {
            retry(err);
          }
          throw err;
        });
      },
      { retries: 5 }
    );
  }

  private async refreshToken(): Promise<AuthTokens | undefined> {
    if (!this.refresh_token) return undefined;
    getLogger().debug('[CACHE CLIENT] refreshing tokens');
    const { data } = await this._httpClient.get<{
      token: string;
      refreshToken: string;
    }>(
      `/refresh_token${
        this.isBrowser ? '' : `?refresh_token=${this.refresh_token}`
      }`
    );
    getLogger().debug('[CACHE CLIENT] refreshed tokens fetched');
    return data;
  }
}
