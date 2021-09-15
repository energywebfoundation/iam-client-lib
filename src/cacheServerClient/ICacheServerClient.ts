import { IAppDefinition, IOrganizationDefinition, IRoleDefinition } from "@energyweb/iam-contracts";
import { IDIDDocument } from "@ew-did-registry/did-resolver-interface";
import { IClaimIssuance, IClaimRejection, IClaimRequest } from "../iam";
import { IPubKeyAndIdentityToken } from "../utils/getPublicKeyAndIdentityToken";
import {
    Asset,
    AssetHistory,
    AssetHistoryEventType,
    Claim,
    IApp,
    IOrganization,
    IRole,
    Order,
} from "./cacheServerClient.types";

export interface ICacheServerClient {
    pubKeyAndIdentityToken: IPubKeyAndIdentityToken | undefined;
    testLogin: () => Promise<void>;
    login: () => Promise<{ pubKeyAndIdentityToken: IPubKeyAndIdentityToken; token: string; refreshToken: string }>;
    isAuthEnabled: () => boolean;
    getRoleDefinition: (params: GetRoleDefinitionParams) => Promise<IRoleDefinition>;
    getOrgDefinition: (params: GetOrgDefinitionParams) => Promise<IOrganizationDefinition>;
    getAppDefinition: (params: GetAppDefinitionParams) => Promise<IAppDefinition>;
    getApplicationRoles: (params: GetApplicationRolesParams) => Promise<IRole[]>;
    getOrganizationRoles: (params: GetOrganizationRolesParams) => Promise<IRole[]>;
    getOrganizationsByOwner: (params: GetOrganizationsByOwnerParams) => Promise<IOrganization[]>;
    getApplicationsByOwner: (params: GetApplicationsByOwnerParams) => Promise<IApp[]>;
    getApplicationsByOrganization: (params: GetApplicationsByOrganizationParams) => Promise<IApp[]>;
    getSubOrganizationsByOrganization: (params: GetetSubOrganizationsByOrganizationParams) => Promise<IOrganization[]>;
    getOrgHierarchy: (params: GetOrgHierarchyParams) => Promise<IOrganization>;
    getNamespaceBySearchPhrase: (params: GetNamespaceBySearchPhraseParams) => Promise<(IOrganization | IApp | IRole)[]>;
    getRolesByOwner: (params: GetRolesByOwnerParams) => Promise<IRole[]>;
    getClaimsBySubjects: (subjects: string[]) => Promise<Claim[]>;
    getClaimsByIssuer: (params: GetClaimsByIssuerParams) => Promise<Claim[]>;
    getClaimsByRequester: (params: GetClaimsByRequesterParams) => Promise<Claim[]>;
    getClaimsBySubject: (params: GetClaimsBySubjectParams) => Promise<Claim[]>;
    requestClaim: (params: RequestClaimParams) => Promise<void>;
    issueClaim: (params: IssueClaimParams) => Promise<void>;
    rejectClaim: (params: RejectClaimParams) => Promise<void>;
    deleteClaim: (params: DeleteClaimParams) => Promise<void>;
    getDIDsForRole: (params: GetDIDsForRoleParams) => Promise<string[]>;
    getDidDocument: (params: GetDidDocumentParams) => Promise<IDIDDocument>;
    addDIDToWatchList: (params: AddDIDToWatchListParams) => Promise<void>;
    getOwnedAssets: (params: GetOwnedAssetsParams) => Promise<Asset[]>;
    getOfferedAssets: (params: GetOfferedAssetsParams) => Promise<Asset[]>;
    getAssetById: (params: GetAssetByIdParams) => Promise<Asset>;
    getPreviouslyOwnedAssets: (params: GetPreviouslyOwnedAssetsParams) => Promise<Asset[]>;
    getAssetHistory: (params: GetAssetHistoryParams) => Promise<AssetHistory[]>;
}

export interface GetRoleDefinitionParams {
    namespace: string;
}

export interface GetOrgDefinitionParams {
    namespace: string;
}

export interface GetAppDefinitionParams {
    namespace: string;
}

export interface GetApplicationRolesParams {
    namespace: string;
}

export interface GetOrganizationRolesParams {
    namespace: string;
}

export interface GetOrganizationsByOwnerParams {
    owner: string;
    excludeSubOrgs: boolean;
}

export interface GetApplicationsByOwnerParams {
    owner: string;
}

export interface GetApplicationsByOrganizationParams {
    namespace: string;
}

export interface GetetSubOrganizationsByOrganizationParams {
    namespace: string;
}

export interface GetOrgHierarchyParams {
    namespace: string;
}

export interface GetNamespaceBySearchPhraseParams {
    search: string;
    types?: ("App" | "Org" | "Role")[];
}

export interface GetClaimsByIssuerParams {
    did: string;
    isAccepted?: boolean;
    parentNamespace?: string;
}

export interface GetRolesByOwnerParams {
    owner: string;
}

export interface GetClaimsByRequesterParams {
    did: string;
    isAccepted?: boolean;
    parentNamespace?: string;
}

export interface GetClaimsBySubjectParams {
    did: string;
    isAccepted?: boolean;
    parentNamespace?: string;
}

export interface RequestClaimParams {
    message: IClaimRequest;
    did: string;
}

export interface IssueClaimParams {
    message: IClaimIssuance;
    did: string;
}

export interface RejectClaimParams {
    message: IClaimRejection;
    did: string;
}

export interface DeleteClaimParams {
    claimId: string;
}

export interface GetDIDsForRoleParams {
    namespace: string;
}

export interface GetDidDocumentParams {
    did: string;
    includeClaims?: boolean;
}

export interface AddDIDToWatchListParams {
    did: string;
}

export interface GetOwnedAssetsParams {
    did: string;
}

export interface GetAssetByIdParams {
    id: string;
}

export interface GetOfferedAssetsParams {
    did: string;
}

export interface GetPreviouslyOwnedAssetsParams {
    owner: string;
}

export interface GetAssetHistoryParams {
    id: string;
    order?: Order;
    take?: number;
    skip?: number;
    type?: AssetHistoryEventType;
}
