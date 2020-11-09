export class NATSConnectionNotEstablishedError extends Error {
  constructor() {
    super("NATS connection not established");
  }
}
