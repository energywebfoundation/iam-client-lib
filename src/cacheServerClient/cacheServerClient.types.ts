import { IDIDDocument } from "@ew-did-registry/did-resolver-interface";
import { IRoleDefinition, IAppDefinition, IOrganizationDefinition } from "@energyweb/iam-contracts";

export interface IRole {
    uid: string;
    name: string;
    namespace: string;
    owner: string;
    definition: IRoleDefinition;
    isOwnedByCurrentUser?: boolean;
}

export interface IOrganization {
    uid: string;
    name: string;
    namespace: string;
    owner: string;
    definition: IOrganizationDefinition;
    apps?: IApp[];
    roles?: IRole[];
    subOrgs?: IOrganization[];
    isOwnedByCurrentUser?: boolean;
}

export interface IApp {
    uid: string;
    name: string;
    namespace: string;
    owner: string;
    definition: IAppDefinition;
    roles?: IRole[];
    isOwnedByCurrentUser?: boolean;
}

export enum RegistrationTypes {
    OffChain = "RegistrationTypes::OffChain",
    OnChain = "RegistrationTypes::OnChain",
}

export interface Claim {
    id: string;
    requester: string;
    subject: string;
    claimIssuer: string[];
    claimType: string;
    claimTypeVersion: string;
    registrationTypes: RegistrationTypes[];
    token: string;
    subjectAgreement?: string;
    onChainProof?: string;
    issuedToken?: string;
    isAccepted: boolean;
    acceptedBy?: string;
    isRejected?: boolean;
    namespace: string;
}

export interface Asset {
    id: string;
    owner: string;
    offeredTo?: string;
    document: IDIDDocument;
}

export interface AssetHistory {
    id: number;
    emittedBy: string;
    relatedTo?: string;
    at: number;
    timestamp: string;
    assetId?: string;
}

export interface AssetProfile {
    name?: string;
    icon?: string;
}

export interface AssetProfiles {
    [key: string]: AssetProfile;
}

export interface Profile {
    name?: string;
    birthdate?: string;
    address?: string;
    assetProfiles?: AssetProfiles;
}

export interface ClaimData extends Record<string, unknown> {
    profile?: Profile;
    claimType?: string;
    claimTypeVersion?: number;
}

export enum Order {
    "ASC" = "ASC",
    "DESC" = "DESC",
}

export enum AssetHistoryEventType {
    ASSET_CREATED = "ASSET_CREATED",
    ASSET_OFFERED = "ASSET_OFFERED",
    ASSET_OFFER_CANCELED = "ASSET_OFFER_CANCELED",
    ASSET_TRANSFERRED = "ASSET_TRANSFERRED",
    ASSET_OFFER_REJECTED = "ASSET_OFFER_REJECTED",
}
