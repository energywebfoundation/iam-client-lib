export enum ExecutionEnvironment {
    NODE = "ExecutionEnvironment:Node",
    BROWSER = "ExecutionEnvironment:Browser",
}

export const detectExecutionEnvironment = () =>
    (isNode() && ExecutionEnvironment.NODE) || (isBrowser() && ExecutionEnvironment.BROWSER);

const isNode = () => new Function("return this===global");

const isBrowser = () => new Function("return this===window");
