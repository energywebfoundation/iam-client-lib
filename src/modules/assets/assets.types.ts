import { IDIDDocument } from "@ew-did-registry/did-resolver-interface";

export interface Asset {
    id: string;
    owner: string;
    offeredTo?: string;
    document: IDIDDocument;
    updatedAt: string;
    createdAt: string;
}

export interface AssetHistory {
    id: number;
    emittedBy: string;
    relatedTo?: string;
    at: number;
    timestamp: string;
    assetId?: string;
}

export enum AssetHistoryEventType {
    ASSET_CREATED = "ASSET_CREATED",
    ASSET_OFFERED = "ASSET_OFFERED",
    ASSET_OFFER_CANCELED = "ASSET_OFFER_CANCELED",
    ASSET_TRANSFERRED = "ASSET_TRANSFERRED",
    ASSET_OFFER_REJECTED = "ASSET_OFFER_REJECTED",
}
