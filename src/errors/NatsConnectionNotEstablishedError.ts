import { ERROR_MESSAGES } from "./ErrorMessages";

export class NATSConnectionNotEstablishedError extends Error {
  constructor() {
    super(ERROR_MESSAGES.NATS_NOT_CONNECTED);
  }
}
