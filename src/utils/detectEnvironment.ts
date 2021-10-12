import detectEthereumProvider from "@metamask/detect-provider";

export enum ExecutionEnvironment {
    NODE = "ExecutionEnvironment:Node",
    BROWSER = "ExecutionEnvironment:Browser",
}

export const executionEnvironment = () =>
    (isNode() && ExecutionEnvironment.NODE) || (isBrowser() && ExecutionEnvironment.BROWSER);

const isNode = new Function("try { return this === global } catch(e) { return false; }");

const isBrowser = new Function("try { return this === window } catch(e) { return false; }");

export const isMetamaskExtensionPresent = async () => {
    const provider = (await detectEthereumProvider({ mustBeMetaMask: true })) as
        | {
              request: any;
          }
        | undefined;

    const chainId = (await provider?.request({
        method: "eth_chainId",
    })) as number | undefined;

    return { isMetamaskPresent: !!provider, chainId };
};
