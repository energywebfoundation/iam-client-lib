import { ERROR_MESSAGES } from "./ErrorMessages";

export class ENSResolverNotInitializedError extends Error {
  constructor() {
    super(ERROR_MESSAGES.ENS_RESOLVER_NOT_INITIALIZED);
  }
}
