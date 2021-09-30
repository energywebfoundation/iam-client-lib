import { IAppDefinition, IOrganizationDefinition, IRoleDefinition } from "@energyweb/iam-contracts";
import { IDIDDocument } from "@ew-did-registry/did-resolver-interface";
import { IClaimIssuance, IClaimRejection, IClaimRequest } from "../claims/claims.types";
import { IPubKeyAndIdentityToken } from "../signer/signer.types";
import { Order } from "./cacheClient.types";
import { Asset, AssetHistory, AssetHistoryEventType } from "../assets/assets.types";
import { IApp, IOrganization, IRole } from "../domains/domains.types";
import { Claim } from "../claims/claims.types";

export interface ICacheClient {
    pubKeyAndIdentityToken: IPubKeyAndIdentityToken | undefined;
    testLogin: () => Promise<void>;
    login: () => Promise<{ pubKeyAndIdentityToken: IPubKeyAndIdentityToken; token: string; refreshToken: string }>;
    isAuthEnabled: () => boolean;
    getRoleDefinition: ({ namespace }: { namespace: string }) => Promise<IRoleDefinition>;
    getOrgDefinition: ({ namespace }: { namespace: string }) => Promise<IOrganizationDefinition>;
    getAppDefinition: ({ namespace }: { namespace: string }) => Promise<IAppDefinition>;
    getApplicationRoles: ({ namespace }: { namespace: string }) => Promise<IRole[]>;
    getOrganizationRoles: ({ namespace }: { namespace: string }) => Promise<IRole[]>;
    getOrganizationsByOwner: ({
        owner,
        excludeSubOrgs,
    }: {
        owner: string;
        excludeSubOrgs: boolean;
    }) => Promise<IOrganization[]>;
    getApplicationsByOwner: ({ owner }: { owner: string }) => Promise<IApp[]>;
    getApplicationsByOrganization: ({ namespace }: { namespace: string }) => Promise<IApp[]>;
    getSubOrganizationsByOrganization: ({ namespace }: { namespace: string }) => Promise<IOrganization[]>;
    getOrgHierarchy: ({ namespace }: { namespace: string }) => Promise<IOrganization>;
    getNamespaceBySearchPhrase: ({
        types,
        search,
    }: {
        types?: ("App" | "Org" | "Role")[];
        search: string;
    }) => Promise<(IOrganization | IApp | IRole)[]>;
    getRolesByOwner: ({ owner }: { owner: string }) => Promise<IRole[]>;
    getClaimsBySubjects: (subjects: string[]) => Promise<Claim[]>;
    getClaimsByIssuer: ({
        did,
        isAccepted,
        parentNamespace,
    }: {
        did: string;
        isAccepted?: boolean;
        parentNamespace?: string;
    }) => Promise<Claim[]>;
    getClaimsByRequester: ({
        did,
        isAccepted,
        parentNamespace,
    }: {
        did: string;
        isAccepted?: boolean;
        parentNamespace?: string;
    }) => Promise<Claim[]>;
    getClaimsBySubject: ({
        did,
        isAccepted,
        parentNamespace,
    }: {
        did: string;
        isAccepted?: boolean;
        parentNamespace?: string;
    }) => Promise<Claim[]>;
    requestClaim: ({ message, did }: { message: IClaimRequest; did: string }) => Promise<void>;
    issueClaim: ({ message, did }: { message: IClaimIssuance; did: string }) => Promise<void>;
    rejectClaim: ({ message, did }: { message: IClaimRejection; did: string }) => Promise<void>;
    deleteClaim: ({ claimId }: { claimId: string }) => Promise<void>;
    getDIDsForRole: ({ namespace }: { namespace: string }) => Promise<string[]>;
    getDidDocument: ({ did, includeClaims }: { did: string; includeClaims?: boolean }) => Promise<IDIDDocument>;
    addDIDToWatchList: ({ did }: { did: string }) => Promise<void>;
    getOwnedAssets: ({ did }: { did: string }) => Promise<Asset[]>;
    getOfferedAssets: ({ did }: { did: string }) => Promise<Asset[]>;
    getAssetById: ({ id }: { id: string }) => Promise<Asset>;
    getPreviouslyOwnedAssets: ({ owner }: { owner: string }) => Promise<Asset[]>;
    getAssetHistory: ({
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
    }) => Promise<AssetHistory[]>;
}
