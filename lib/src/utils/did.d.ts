export declare function supportedDIDMethods(): string[];
export declare function isValidDID(did: string): boolean;
export declare function addSupportedDID(methodWithChain: string, validator: (did: string) => boolean): void;
export declare const didPattern = "^(?:did:(?<method>[a-z0-9]+?):)((?<chain>[a-z0-9]+?):)?(?<id>0x[A-Fa-f0-9]{40})$";
/**
 * @description For verification which envolves legacy and chain-specific DID's
 */
export declare function compareDID(didA: string, didB: string): boolean;
