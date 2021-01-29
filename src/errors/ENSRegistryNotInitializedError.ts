import { ERROR_MESSAGES } from "./ErrorMessages";

export class ENSRegistryNotInitializedError extends Error {
  constructor() {
    super(ERROR_MESSAGES.ENS_REGISTRY_NOT_INITIALIZED);
  }
}
