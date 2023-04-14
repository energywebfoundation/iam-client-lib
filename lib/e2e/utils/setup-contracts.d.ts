import { providers, BigNumber } from 'ethers';
export declare const rpcUrl: string;
export declare const deployer: providers.JsonRpcSigner;
export declare const root = "ewc";
export declare const replenish: (acc: string, amount?: BigNumber | string) => Promise<void>;
export declare const setupENS: (rootOwner: string) => Promise<void>;
