import axios, { AxiosInstance } from 'axios';
import { stringify } from 'qs';
import { IRoleDefinition } from '@energyweb/credential-governance';
import { IDIDDocument } from '@ew-did-registry/did-resolver-interface';
import {
  Credential,
  StatusList2021Entry,
  VerifiableCredential,
} from '@ew-did-registry/credentials-interface';
import { IApp, IOrganization, IRole } from '../domains/domains.types';
import { AssetHistory } from '../assets/assets.types';
import {
  Claim,
  IClaimIssuance,
  IClaimRejection,
  IClaimRequest,
} from '../claims/claims.types';
import { Asset } from '../assets/assets.types';
import { SignerService } from '../signer/signer.service';
import { cacheConfigs } from '../../config/cache.config';
import { ICacheClient } from './cache-client.interface';
import { AssetsFilter, ClaimsFilter } from './cache-client.types';
import { SearchType } from '.';
import {
  RoleCredentialSubject,
  StatusList2021Credential,
  StatusList2021UnsignedCredential,
} from '../verifiable-credentials';
import { AuthService, SiweOptions, DEFAULT_AUTH_STATUS_PATH } from '../auth';

export class CacheClient implements ICacheClient {
  private _httpClient: AxiosInstance;
  private authEnabled: boolean;
  private authService: AuthService;

  constructor(private _signerService: SignerService) {
    this._signerService.onInit(this.init.bind(this));
  }

  async init() {
    const {
      url: cacheClientBaseUrl,
      auth: { baseUrl: siweBaseUrl, domain },
      cacheServerSupportsAuth = false,
    } = cacheConfigs()[this._signerService.chainId];
    if (!cacheClientBaseUrl) {
      throw new Error('Cache client base url is not set');
    }
    this._httpClient = axios.create({
      baseURL: cacheClientBaseUrl,
      withCredentials: true,
    });
    this.authEnabled = cacheServerSupportsAuth;
    const siweOptions: SiweOptions = {
      domain: new URL(domain).host,
      baseUrl: siweBaseUrl,
    };
    this.authService = new AuthService(this._signerService, this._httpClient, {
      authStatusPath: DEFAULT_AUTH_STATUS_PATH,
      siweOptions,
    });
  }

  async login() {
    await this.authService.login();
  }

  async authenticate() {
    await this.authService.authenticate();
  }

  async isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  get http() {
    return this._httpClient;
  }

  async getRoleDefinition(namespace: string) {
    const { data } = await this._httpClient.get<IRole>(`/role/${namespace}`);
    return data?.definition;
  }

  async getRolesDefinition(namespaces: string[]) {
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
  }

  async getOrgDefinition(namespace: string) {
    const { data } = await this._httpClient.get<IOrganization>(
      `/org/${namespace}`
    );
    return data?.definition;
  }

  async getAppDefinition(namespace: string) {
    const { data } = await this._httpClient.get<IApp>(`/app/${namespace}`);
    return data?.definition;
  }

  async getApplicationRoles(namespace: string) {
    const { data } = await this._httpClient.get<IRole[]>(
      `/app/${namespace}/roles`
    );
    return data;
  }

  async getOrganizationRoles(namespace: string) {
    const { data } = await this._httpClient.get<IRole[]>(
      `/org/${namespace}/roles`
    );
    return data;
  }

  async getOrganizationsByOwner(owner: string, withRelations = true) {
    const { data } = await this._httpClient.get<IOrganization[]>(
      `/org/owner/${owner}?withRelations=${withRelations}`
    );
    return data;
  }

  async getSubOrganizationsByOrganization(namespace: string) {
    const { data } = await this._httpClient.get<IOrganization[]>(
      `/org/${namespace}/suborgs`
    );
    return data;
  }

  async getOrgHierarchy(namespace: string) {
    const { data } = await this._httpClient.get<IOrganization>(
      `/org/${namespace}`
    );
    return data;
  }

  async getNamespaceBySearchPhrase(search: string, types?: SearchType[]) {
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
  }

  async getApplicationsByOwner(owner: string, withRelations = true) {
    const { data } = await this._httpClient.get<IApp[]>(
      `/app/owner/${owner}?withRelations=${withRelations}`
    );
    return data;
  }

  async getApplicationsByOrganization(namespace: string) {
    const { data } = await this._httpClient.get<IApp[]>(
      `/org/${namespace}/apps`
    );
    return data;
  }

  async getRolesByOwner(owner: string) {
    const { data } = await this._httpClient.get<IRole[]>(
      `/role/owner/${owner}`
    );
    return data;
  }

  async getClaimsBySubjects(subjects: string[]): Promise<Claim[]> {
    const { data } = await this._httpClient.get<Claim[]>('/claim/by/subjects', {
      params: { subjects: subjects.join(',') },
    });
    return data;
  }

  async getClaimsByIssuer(
    issuer: string,
    { isAccepted, namespace }: ClaimsFilter = {}
  ) {
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
  }

  async getClaimsByRequester(
    requester: string,
    { isAccepted, namespace }: ClaimsFilter = {}
  ) {
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
  }

  async getClaimsBySubject(
    subject: string,
    { isAccepted, namespace }: ClaimsFilter = {}
  ) {
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
  }

  async getRolesByRevoker(revoker: string) {
    const { data } = await this._httpClient.get<IRole[]>(
      `/claim/revoker/roles/allowed/${revoker}`
    );
    return data;
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
    const { data } = await this._httpClient.get<Claim | undefined>(
      `/claim/${claimId}`
    );
    return data;
  }

  async requestClaim(message: IClaimRequest) {
    await this._httpClient.post<void>('/claim/request', message);
  }

  async issueClaim(issuer: string, message: IClaimIssuance) {
    await this._httpClient.post<void>(`/claim/issue/${issuer}`, message);
  }

  async rejectClaim(issuer: string, message: IClaimRejection) {
    await this._httpClient.post<void>(`/claim/reject/${issuer}`, message);
  }

  async deleteClaim(id: string) {
    await this._httpClient.delete<void>(`/claim/${id}`);
  }

  async getDIDsForRole(namespace: string) {
    const { data } = await this._httpClient.get<string[]>(
      `/claim/did/${namespace}?accepted=true`
    );
    return data;
  }

  async getDidDocument(did: string, includeClaims?: boolean) {
    const { data } = await this._httpClient.get<IDIDDocument>(
      `/DID/${did}?includeClaims=${includeClaims || false}`
    );
    return data;
  }

  async getAllowedRolesByIssuer(did: string) {
    const { data } = await this._httpClient.get<IRole[]>(
      `/claim/issuer/roles/allowed/${did}`
    );
    return data;
  }

  async addDIDToWatchList(did: string) {
    await this._httpClient.post(`/DID/${did}`);
  }

  async getOwnedAssets(did: string) {
    const { data } = await this._httpClient.get<Asset[]>(
      `/assets/owner/${did}`
    );
    return data;
  }

  async getOfferedAssets(did: string) {
    const { data } = await this._httpClient.get<Asset[]>(
      `/assets/offered_to/${did}`
    );
    return data;
  }

  async getAssetById(id: string) {
    const { data } = await this._httpClient.get<Asset>(`/assets/${id}`);
    return data;
  }

  async getPreviouslyOwnedAssets(owner: string) {
    const { data } = await this._httpClient.get<Asset[]>(
      `/assets/owner/history/${owner}`
    );
    return data;
  }

  async getAssetHistory(
    id: string,
    { order, take, skip, type }: AssetsFilter = {}
  ) {
    const query = stringify({ order, take, skip, type }, { skipNulls: true });
    const { data } = await this._httpClient.get<AssetHistory[]>(
      `/assets/history/${id}?${query}`
    );
    return data;
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
    const { data } = await this._httpClient.post<
      Credential<RoleCredentialSubject> & {
        credentialStatus: StatusList2021Entry;
      }
    >('/status-list/entries', { options: {}, credential });
    return data;
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
    const { data } =
      await this._httpClient.post<StatusList2021UnsignedCredential>(
        '/status-list/credentials/status/initiate',
        {
          options: {},
          verifiableCredential,
        }
      );
    return data;
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
    const { data } = await this._httpClient.post<StatusList2021Credential>(
      '/status-list/credentials/status/finalize',
      {
        options: {},
        statusListCredential,
      }
    );
    return data;
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
    if (!credential.credentialStatus?.statusListCredential) {
      throw new Error(
        'Missing statusListCredential property in given credential status'
      );
    }

    const response = await axios.get<StatusList2021Credential | null>(
      credential.credentialStatus?.statusListCredential
    );

    return response.status === 200 ? response.data : null;
  }

  isAuthEnabled() {
    return this.authEnabled;
  }
}
