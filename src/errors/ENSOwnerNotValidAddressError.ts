import { ERROR_MESSAGES } from "./ErrorMessages";

export class ENSOwnerNotValidAddressError extends Error {
    constructor(providedOwner: string) {
        super(`Provided owner param: ${providedOwner}. ${ERROR_MESSAGES.ENS_OWNER_NOT_VALID_ADDRESS}`);
    }
}
