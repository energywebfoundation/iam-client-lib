import { Methods, isValidErc1056 } from "@ew-did-registry/did";

const validators = new Map<Methods, (did: string) => boolean>();

export function supportedDIDMethods(): Methods[] {
    return Array.from(validators.keys());
}

export function isValidDID(did: string): boolean {
    return Array.from(validators.values()).some((v) => v(did));
}

export function addSupportedDID(method: Methods, validator: (did: string) => boolean) {
    validators.set(method, validator);
}

export function parseDID(did: string) {
    const didRegex = new RegExp(`^did:${Methods.Erc1056}:`);
    if (did && didRegex.test(did) === true) {
        return did.split(":")[2];
    }
    return did;
}

addSupportedDID(Methods.Erc1056, isValidErc1056);
