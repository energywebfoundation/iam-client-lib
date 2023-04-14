import { AxiosInstance } from 'axios';
import { IRoleDefinition } from '@energyweb/credential-governance';
import { IDIDDocument } from '@ew-did-registry/did-resolver-interface';
import { Credential, StatusList2021Entry, VerifiableCredential } from '@ew-did-registry/credentials-interface';
import { IApp, IOrganization, IRole } from '../domains/domains.types';
import { AssetHistory } from '../assets/assets.types';
import { Claim, IClaimIssuance, IClaimRejection, IClaimRequest } from '../claims/claims.types';
import { Asset } from '../assets/assets.types';
import { SignerService } from '../signer/signer.service';
import { ICacheClient } from './cache-client.interface';
import { AssetsFilter, ClaimsFilter } from './cache-client.types';
import { SearchType } from '.';
import { RoleCredentialSubject, StatusList2021Credential, StatusList2021UnsignedCredential } from '../verifiable-credentials';
export declare class CacheClient implements ICacheClient {
    private _signerService;
    private _httpClient;
    private authEnabled;
    private authService;
    constructor(_signerService: SignerService);
    init(): Promise<void>;
    login(): Promise<void>;
    authenticate(): Promise<void>;
    isAuthenticated(): Promise<boolean>;
    get http(): AxiosInstance;
    getRoleDefinition(namespace: string): Promise<IRoleDefinition | import("@energyweb/credential-governance").IRoleDefinitionV2>;
    getRolesDefinition(namespaces: string[]): Promise<Record<string, IRoleDefinition>>;
    getOrgDefinition(namespace: string): Promise<import("@energyweb/credential-governance").IOrganizationDefinition>;
    getAppDefinition(namespace: string): Promise<import("@energyweb/credential-governance").IAppDefinition>;
    getApplicationRoles(namespace: string): Promise<IRole[]>;
    getOrganizationRoles(namespace: string): Promise<IRole[]>;
    getOrganizationsByOwner(owner: string, withRelations?: boolean): Promise<IOrganization[]>;
    getSubOrganizationsByOrganization(namespace: string): Promise<IOrganization[]>;
    getOrgHierarchy(namespace: string): Promise<IOrganization>;
    getNamespaceBySearchPhrase(search: string, types?: SearchType[]): Promise<(IRole | IOrganization | IApp)[]>;
    getApplicationsByOwner(owner: string, withRelations?: boolean): Promise<IApp[]>;
    getApplicationsByOrganization(namespace: string): Promise<IApp[]>;
    getRolesByOwner(owner: string): Promise<IRole[]>;
    getClaimsBySubjects(subjects: string[]): Promise<Claim[]>;
    getClaimsByIssuer(issuer: string, { isAccepted, namespace }?: ClaimsFilter): Promise<Claim[]>;
    getClaimsByRequester(requester: string, { isAccepted, namespace }?: ClaimsFilter): Promise<Claim[]>;
    getClaimsBySubject(subject: string, { isAccepted, namespace }?: ClaimsFilter): Promise<Claim[]>;
    getRolesByRevoker(revoker: string): Promise<IRole[]>;
    getClaimsByRevoker(revoker: string, { namespace }?: ClaimsFilter): Promise<Claim[]>;
    getClaimById(claimId: string): Promise<Claim | undefined>;
    requestClaim(message: IClaimRequest): Promise<void>;
    issueClaim(issuer: string, message: IClaimIssuance): Promise<void>;
    rejectClaim(issuer: string, message: IClaimRejection): Promise<void>;
    deleteClaim(id: string): Promise<void>;
    getDIDsForRole(namespace: string): Promise<string[]>;
    getDidDocument(did: string, includeClaims?: boolean): Promise<IDIDDocument>;
    getAllowedRolesByIssuer(did: string): Promise<IRole[]>;
    addDIDToWatchList(did: string): Promise<void>;
    getOwnedAssets(did: string): Promise<Asset[]>;
    getOfferedAssets(did: string): Promise<Asset[]>;
    getAssetById(id: string): Promise<Asset>;
    getPreviouslyOwnedAssets(owner: string): Promise<Asset[]>;
    getAssetHistory(id: string, { order, take, skip, type }?: AssetsFilter): Promise<AssetHistory[]>;
    /**
     * Sets location of the credential status
     *
     * @param credential unsigned credential
     * @return credential with reference to status location
     */
    addStatusToCredential(credential: Credential<RoleCredentialSubject>): Promise<Credential<RoleCredentialSubject> & {
        credentialStatus: StatusList2021Entry;
    }>;
    /**
     * Get the StatusList2021Credential object to be signed
     *
     * @param verifiableCredential verifiable credential to be revoked
     * @return unsigned status list credential
     */
    initiateCredentialStatusUpdate(verifiableCredential: VerifiableCredential<RoleCredentialSubject>): Promise<StatusList2021UnsignedCredential>;
    /**
     * Persist signed StatusList2021Credential object in storage.
     *
     * @param statusListCredential signed status list
     * @return status list credential
     */
    persistCredentialStatusUpdate(statusListCredential: StatusList2021Credential): Promise<StatusList2021Credential>;
    /**
     * Fetch the StatusList2021Credential object from storage.
     *
     * @param credential verifiable credential with status list 2021
     * @return status list credential if found
     */
    getStatusListCredential(credential: VerifiableCredential<RoleCredentialSubject>): Promise<StatusList2021Credential | null>;
    isAuthEnabled(): boolean;
}
