import { ERROR_MESSAGES } from "./ErrorMessages";

export class ENSTypeNotSupportedError extends Error {
    constructor() {
        super(ERROR_MESSAGES.ENS_TYPE_NOT_SUPPORTED);
    }
}
