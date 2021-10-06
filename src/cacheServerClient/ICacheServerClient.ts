import { IAppDefinition, IOrganizationDefinition, IRoleDefinition } from "@energyweb/iam-contracts";
import { IDIDDocument } from "@ew-did-registry/did-resolver-interface";
import { IPubKeyAndIdentityToken } from "../utils/getPublicKeyAndIdentityToken";
import {
    Asset,
    AssetHistory,
    Claim,
    ClaimsQueryParams,
    IApp,
    IOrganization,
    IRole,
    IssueClaim,
    RejectClaim,
    RequestClaim,
} from "./cacheServerClient.types";
export interface ICacheServerClient {
    pubKeyAndIdentityToken: IPubKeyAndIdentityToken | undefined;
    testLogin: () => Promise<void>;
    login: () => Promise<{ pubKeyAndIdentityToken: IPubKeyAndIdentityToken; token: string; refreshToken: string }>;
    isAuthEnabled: () => boolean;
    getRoleDefinition: ({ namespace }: Pick<ClaimsQueryParams, "namespace">) => Promise<IRoleDefinition>;
    getOrgDefinition: ({ namespace }: Pick<ClaimsQueryParams, "namespace">) => Promise<IOrganizationDefinition>;
    getAppDefinition: ({ namespace }: Pick<ClaimsQueryParams, "namespace">) => Promise<IAppDefinition>;
    getApplicationRoles: ({ namespace }: Pick<ClaimsQueryParams, "namespace">) => Promise<IRole[]>;
    getOrganizationRoles: ({ namespace }: Pick<ClaimsQueryParams, "namespace">) => Promise<IRole[]>;
    getOrganizationsByOwner: (
        owner: ClaimsQueryParams["owner"],
        opts?: { withRelations?: boolean },
    ) => Promise<IOrganization[]>;
    getApplicationsByOwner: (owner: ClaimsQueryParams["owner"], opts?: { withRelations?: boolean }) => Promise<IApp[]>;
    getApplicationsByOrganization: ({ namespace }: Pick<ClaimsQueryParams, "namespace">) => Promise<IApp[]>;
    getSubOrganizationsByOrganization: ({
        namespace,
    }: Pick<ClaimsQueryParams, "namespace">) => Promise<IOrganization[]>;
    getOrgHierarchy: ({ namespace }: Pick<ClaimsQueryParams, "namespace">) => Promise<IOrganization>;
    getNamespaceBySearchPhrase: ({
        types,
        search,
    }: Pick<ClaimsQueryParams, "types" | "search">) => Promise<(IOrganization | IApp | IRole)[]>;
    getRolesByOwner: ({ owner }: Pick<ClaimsQueryParams, "owner">) => Promise<IRole[]>;
    getClaimsBySubjects: (subjects: string[]) => Promise<Claim[]>;
    getClaimsByIssuer: ({
        did,
        isAccepted,
        parentNamespace,
    }: Pick<ClaimsQueryParams, "did" | "isAccepted" | "parentNamespace">) => Promise<Claim[]>;
    getClaimsByRequester: ({
        did,
        isAccepted,
        parentNamespace,
    }: Pick<ClaimsQueryParams, "did" | "isAccepted" | "parentNamespace">) => Promise<Claim[]>;
    getClaimsBySubject: ({
        did,
        isAccepted,
        parentNamespace,
    }: Pick<ClaimsQueryParams, "did" | "isAccepted" | "parentNamespace">) => Promise<Claim[]>;

    requestClaim: ({ message, did }: RequestClaim) => Promise<void>;
    issueClaim: ({ message, did }: IssueClaim) => Promise<void>;
    rejectClaim: ({ message, did }: RejectClaim) => Promise<void>;
    deleteClaim: ({ claimId }: Pick<ClaimsQueryParams, "claimId">) => Promise<void>;
    getDIDsForRole: ({ namespace }: Pick<ClaimsQueryParams, "namespace">) => Promise<string[]>;
    getDidDocument: ({ did, includeClaims }: Pick<ClaimsQueryParams, "did" | "includeClaims">) => Promise<IDIDDocument>;
    addDIDToWatchList: ({ did }: Pick<ClaimsQueryParams, "did">) => Promise<void>;
    getOwnedAssets: ({ did }: Pick<ClaimsQueryParams, "did">) => Promise<Asset[]>;
    getOfferedAssets: ({ did }: Pick<ClaimsQueryParams, "did">) => Promise<Asset[]>;
    getAssetById: ({ id }: Pick<ClaimsQueryParams, "id">) => Promise<Asset>;
    getPreviouslyOwnedAssets: ({ owner }: Pick<ClaimsQueryParams, "owner">) => Promise<Asset[]>;
    getAssetHistory: ({
        id,
        order,
        take,
        skip,
        type,
    }: Pick<ClaimsQueryParams, "id" | "order" | "take" | "skip" | "type">) => Promise<AssetHistory[]>;
}
