export enum ExecutionEnvironment {
    NODE = "ExecutionEnvironment:Node",
    BROWSER = "ExecutionEnvironment:Browser",
}

export const detectExecutionEnvironment = () =>
    (isNode() && ExecutionEnvironment.NODE) || (isBrowser() && ExecutionEnvironment.BROWSER);

const isNode = new Function("try { return this === global } catch(e) { return false; }");

const isBrowser = new Function("try { return this === window } catch(e) { return false; }");
