import { Methods, isValidErc1056EWC, isValidErc1056VOLTA } from "@ew-did-registry/did";

const validators = new Map<string, (did: string) => boolean>();

export function supportedDIDMethods(): string[] {
    return Array.from(validators.keys());
}

export function isValidDID(did: string): boolean {
    return Array.from(validators.values()).some((v) => v(did));
}

export function addSupportedDID(method: string, validator: (did: string) => boolean) {
    validators.set(method, validator);
}

addSupportedDID(`${Methods.Erc1056}:ewc`, isValidErc1056EWC);
addSupportedDID(`${Methods.Erc1056}:volta`, isValidErc1056VOLTA);
