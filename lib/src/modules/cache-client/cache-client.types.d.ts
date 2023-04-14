import { AssetHistoryEventType } from '../assets';
import { SiweOptions } from '../auth';
export declare enum Order {
    'ASC' = "ASC",
    'DESC' = "DESC"
}
export interface CacheServerClientOptions {
    url: string;
    cacheServerSupportsAuth?: boolean;
    auth: SiweOptions;
}
export declare type ClaimsFilter = {
    isAccepted?: boolean;
    namespace?: string;
};
export declare type AssetsFilter = {
    order?: Order;
    take?: number;
    skip?: number;
    type?: AssetHistoryEventType;
};
export declare enum SearchType {
    App = "App",
    Org = "Org",
    Role = "Role"
}
