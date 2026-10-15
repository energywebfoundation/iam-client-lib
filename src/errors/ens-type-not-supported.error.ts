import { ERROR_MESSAGES } from './error-messages';

export class ENSTypeNotSupportedError extends Error {
  constructor() {
    super(ERROR_MESSAGES.ENS_TYPE_NOT_SUPPORTED);
  }
}
