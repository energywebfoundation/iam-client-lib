export enum ExecutionEnvironment {
    NODE = "ExecutionEnvironment:Node",
    BROWSER = "ExecutionEnvironment:Browser",
}

export const executionEnvironment = () =>
    isNode() && !isBrowser() ? ExecutionEnvironment.NODE : ExecutionEnvironment.BROWSER;

const isNode = () => typeof process !== "undefined" && process.versions != null && process.versions.node != null;

const isBrowser = () => typeof window !== "undefined" && typeof window.document !== "undefined";
