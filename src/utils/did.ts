import { Methods, Chain, isValidErc1056EWC, isValidErc1056VOLTA } from "@ew-did-registry/did";
import { MalformedDIDError } from "../errors";

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

// matches both legacy (without chain specifier) and chain specific DID
export const didPattern = "^(?:did:(?<method>[a-z0-9]+?):)((?<chain>[a-z0-9]+?):)?(?<id>0x[A-Fa-f0-9]{40})$";

/**
 * @description For verification which envolves legacy and chain-specific DID's
 */
export function compareDID(didA: string, didB: string): boolean {
    const matchA = didA.match(didPattern);
    if (!matchA?.groups) {
        throw new MalformedDIDError(didA);
    }
    const matchB = didB.match(didPattern);
    if (!matchB?.groups) {
        throw new MalformedDIDError(didB);
    }
    const { method: methodA, chain: chainA, id: idA } = <{ method: Methods; chain: Chain; id: string }>matchA.groups;
    const { method: methodB, chain: chainB, id: idB } = <{ method: Methods; chain: Chain; id: string }>matchB.groups;

    if (idA !== idB) {
        return false;
    }
    if (methodA !== methodB) {
        return false;
    }
    if (chainA && chainB && chainA !== chainB) {
        return false;
    }
    return true;
}
