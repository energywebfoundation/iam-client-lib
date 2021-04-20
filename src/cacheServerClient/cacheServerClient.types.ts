import { IDIDDocument } from "@ew-did-registry/did-resolver-interface";
import { PreconditionTypes } from "../utils/constants";

export interface IRoleDefinition {
  version: string;
  roleType: string;
  roleName: string;
  fields: {
    fieldType: string;
    label: string;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    minValue?: number;
    maxValue?: number;
    minDate?: Date;
    maxDate?: Date;
  }[];
  metadata: Record<string, unknown> | Record<string, unknown>[];
  issuer: {
    issuerType?: string;
    did?: string[];
    roleName?: string;
  };
  enrolmentPreconditions?: { type: PreconditionTypes; conditions: string[] }[];
}

export interface IAppDefinition {
  appName: string;
  logoUrl?: string;
  websiteUrl?: string;
  description?: string;
  others?: Record<string, unknown>;
}

export interface IOrganizationDefinition {
  orgName: string;
  logoUrl?: string;
  websiteUrl?: string;
  description?: string;
  others?: Record<string, unknown>;
}

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

export interface Claim {
  uid: string;
  id: string;
  requester: string;
  subject: string;
  claimIssuer: string[];
  claimType: string;
  token: string;
  issuedToken?: string;
  isAccepted: boolean;
  createdAt: string;
  parentNamespace: string;
  acceptedBy?: string;
  isRejected?: boolean;
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

export enum Order {
  "ASC" = "ASC",
  "DESC" = "DESC"
}

export enum AssetHistoryEventType {
  ASSET_CREATED = "ASSET_CREATED",
  ASSET_OFFERED = "ASSET_OFFERED",
  ASSET_OFFER_CANCELED = "ASSET_OFFER_CANCELED",
  ASSET_TRANSFERRED = "ASSET_TRANSFERRED",
  ASSET_OFFER_REJECTED = "ASSET_OFFER_REJECTED"
}
