export enum Order {
    "ASC" = "ASC",
    "DESC" = "DESC",
}

export interface CacheServerClientOptions {
    url: string;
    cacheServerSupportsAuth?: boolean;
}
