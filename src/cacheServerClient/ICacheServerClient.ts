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
    getRoleDefinition: (params: GetDefinitionParams) => Promise<IRoleDefinition>;
    getOrgDefinition: (params: GetDefinitionParams) => Promise<IOrganizationDefinition>;
    getAppDefinition: (params: GetDefinitionParams) => Promise<IAppDefinition>;
    getApplicationRoles: (params: GetDefinitionParams) => Promise<IRole[]>;
    getOrganizationRoles: (params: GetDefinitionParams) => Promise<IRole[]>;
    getOrganizationsByOwner: (params: GetOrganizationsByOwnerParams) => Promise<IOrganization[]>;
    getApplicationsByOwner: (params: GetOwnerParam) => Promise<IApp[]>;
    getApplicationsByOrganization: (params: GetDefinitionParams) => Promise<IApp[]>;
    getSubOrganizationsByOrganization: (params: GetDefinitionParams) => Promise<IOrganization[]>;
    getOrgHierarchy: (params: GetDefinitionParams) => Promise<IOrganization>;
    getNamespaceBySearchPhrase: (params: GetNamespaceBySearchPhraseParams) => Promise<(IOrganization | IApp | IRole)[]>;
    getRolesByOwner: (params: GetOwnerParam) => Promise<IRole[]>;
    getClaimsBySubjects: (subjects: string[]) => Promise<Claim[]>;
    getClaimsByIssuer: (params: GetClaimsParams) => Promise<Claim[]>;
    getClaimsByRequester: (params: GetClaimsParams) => Promise<Claim[]>;
    getClaimsBySubject: (params: GetClaimsParams) => Promise<Claim[]>;
    requestClaim: (params: RequestClaimParams) => Promise<void>;
    issueClaim: (params: IssueClaimParams) => Promise<void>;
    rejectClaim: (params: RejectClaimParams) => Promise<void>;
    deleteClaim: (params: DeleteClaimParams) => Promise<void>;
    getDIDsForRole: (params: GetDefinitionParams) => Promise<string[]>;
    getDidDocument: (params: GetDidDocumentParams) => Promise<IDIDDocument>;
    addDIDToWatchList: (params: GetDidParam) => Promise<void>;
    getOwnedAssets: (params: GetDidParam) => Promise<Asset[]>;
    getOfferedAssets: (params: GetDidParam) => Promise<Asset[]>;
    getAssetById: (params: GetAssetByIdParams) => Promise<Asset>;
    getPreviouslyOwnedAssets: (params: GetOwnerParam) => Promise<Asset[]>;
    getAssetHistory: (params: GetAssetHistoryParams) => Promise<AssetHistory[]>;
}

export interface GetDefinitionParams {
    namespace: string;
}

export interface GetOwnerParam {
    owner: string;
}

export interface GetDidParam {
    did: string;
}

export interface GetOrganizationsByOwnerParams extends GetOwnerParam {
    excludeSubOrgs: boolean;
}

export interface GetNamespaceBySearchPhraseParams {
    search: string;
    types?: ("App" | "Org" | "Role")[];
}

export interface GetClaimsParams extends Partial<Pick<Claim, "isAccepted">>, GetDidParam {
    parentNamespace?: string;
}

export interface RequestClaimParams extends GetDidParam {
    message: IClaimRequest;
}

export interface IssueClaimParams extends GetDidParam {
    message: IClaimIssuance;
}

export interface RejectClaimParams extends GetDidParam {
    message: IClaimRejection;
}

export interface DeleteClaimParams {
    claimId: string;
}

export interface GetDidDocumentParams extends GetDidParam {
    includeClaims?: boolean;
}

export interface GetAssetByIdParams {
    id: string;
}

export interface GetAssetHistoryParams {
    id: string;
    order?: Order;
    take?: number;
    skip?: number;
    type?: AssetHistoryEventType;
}
