export class MalformedDIDError extends Error {
    constructor(did: string) {
        super(`${did} is malformed`);
    }
}
