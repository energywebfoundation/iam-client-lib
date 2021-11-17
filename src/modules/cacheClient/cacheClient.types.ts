import { AssetHistoryEventType } from "../assets";

export enum Order {
    "ASC" = "ASC",
    "DESC" = "DESC",
}

export interface CacheServerClientOptions {
    url: string;
    cacheServerSupportsAuth?: boolean;
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
    App = "App",
    Org = "Org",
    Role = "Role",
}

export const TEST_LOGIN_NAMESPACE = "testing.if.logged.in";
