import { SiweMessage } from 'siwe';
import { AssetHistoryEventType } from '../assets';

export enum Order {
  'ASC' = 'ASC',
  'DESC' = 'DESC',
}

export type SiweOptions = Pick<SiweMessage, 'domain'>;

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

export const TEST_LOGIN_ENDPOINT = '/auth/status';

export interface AuthTokens {
  token: string;
  refreshToken: string;
}
