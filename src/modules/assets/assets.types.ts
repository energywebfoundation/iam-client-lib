import { IDIDDocument } from '@ew-did-registry/did-resolver-interface';
import { Order } from '../cache-client';

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
  type: AssetHistoryEventType;
}

export enum AssetHistoryEventType {
  ASSET_CREATED = 'ASSET_CREATED',
  ASSET_OFFERED = 'ASSET_OFFERED',
  ASSET_OFFER_CANCELED = 'ASSET_OFFER_CANCELED',
  ASSET_TRANSFERRED = 'ASSET_TRANSFERRED',
  ASSET_OFFER_REJECTED = 'ASSET_OFFER_REJECTED',
}

export interface OfferAssetOptions {
  /** DID of offered asset */
  assetDID: string;

  /** Address of offer recipient */
  offerTo: string;
}

export interface AcceptAssetOfferOptions {
  /** DID of offered asset */
  assetDID: string;
}

export interface RejectAssetOfferOptions {
  /** DID of offered asset */
  assetDID: string;
}

export interface CancelAssetOfferOptions {
  /** DID of offered asset */
  assetDID: string;
}

export interface GetOwnedAssetsOptions {
  /** DID of the user */
  did: string;
}

export interface GetOfferedAssetsOptions {
  /** DID of the user */
  did?: string;
}

export interface GetAssetByIdOptions {
  /** DID of the asset */
  id: string;
}

export interface GetPreviouslyOwnedAssetsOptions {
  /** DID of the user */
  owner: string;
}

export interface GetAssetHistoryOptions {
  /** DID of the asset */
  id: string;

  /** Order "ASC" (Ascending) || "DESC" (Descending) */
  order?: Order;

  /** Number of items to take */
  take?: number;

  /** Number of items to skip */
  skip?: number;

  /** Asset history event Type */
  type?: AssetHistoryEventType;
}

export interface OfferAssetTxOptions {
  offerTo: string;
  assetContractAddress: string;
}

export interface AcceptOfferTxOptions {
  assetContractAddress: string;
}

export interface RejectOfferTxOptions {
  assetContractAddress: string;
}

export interface CancelOfferTxOptions {
  assetContractAddress: string;
}
