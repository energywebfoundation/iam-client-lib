import { ERROR_MESSAGES } from "./ErrorMessages";

export class CacheClientNotProvidedError extends Error {
  constructor() {
    super(ERROR_MESSAGES.CACHE_CLIENT_NOT_PROVIDED);
  }
}
