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
    ASSET_CREATED = "asset-created",
    ASSET_OFFERED = "asset-offered",
    ASSET_OFFER_CANCELED = "asset-offer-canceled",
    ASSET_TRANSFERRED = "asset-transfered",
    ASSET_OFFER_REJECTED = "asset-offer-rejected",
}
