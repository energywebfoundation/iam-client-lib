export class ENSRegistryNotInitializedError extends Error {
  constructor() {
    super("ENS registry not initialized");
  }
}
