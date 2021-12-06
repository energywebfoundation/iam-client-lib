import { Methods, Chain, isValidErc1056EWC, isValidErc1056VOLTA } from "@ew-did-registry/did";

const validators = new Map<string, (did: string) => boolean>();

export function supportedDIDMethods(): string[] {
    return Array.from(validators.keys());
}

export function isValidDID(did: string): boolean {
    return Array.from(validators.values()).some((v) => v(did));
}

export function addSupportedDID(methodWithChain: string, validator: (did: string) => boolean) {
    validators.set(methodWithChain, validator);
}

addSupportedDID(`${Methods.Erc1056}:${Chain.EWC}`, isValidErc1056EWC);
addSupportedDID(`${Methods.Erc1056}:${Chain.VOLTA}`, isValidErc1056VOLTA);
