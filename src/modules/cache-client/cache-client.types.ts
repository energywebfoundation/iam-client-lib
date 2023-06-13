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
