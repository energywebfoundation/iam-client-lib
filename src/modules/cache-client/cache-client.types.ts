import { AssetHistoryEventType } from '../assets';
import { SiweOptions } from '../auth';

export enum Order {
  'ASC' = 'ASC',
  'DESC' = 'DESC',
}

export interface CacheServerClientOptions {
  url: string;
  cacheServerSupportsAuth?: boolean;
  auth: SiweOptions;
}

export type ClaimsFilter = {
  isAccepted?: boolean;
  namespace?: string;
  /** Number of records to skip (pagination offset) */
  skip?: number;
  /** Maximum number of records to return */
  take?: number;
};

/**
 * Optional pagination filter for domain list endpoints
 * (roles by owner, organizations by owner, applications by owner).
 */
export type DomainsFilter = {
  /** Number of records to skip (pagination offset) */
  skip?: number;
  /** Maximum number of records to return */
  take?: number;
};

export type AssetsFilter = {
  order?: Order;
  take?: number;
  skip?: number;
  type?: AssetHistoryEventType;
};

export enum SearchType {
  App = 'App',
  Org = 'Org',
  Role = 'Role',
}
