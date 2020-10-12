export class CacheClientNotProvidedError extends Error {
  constructor(){
    super('Cache client not provided');
  }
}
