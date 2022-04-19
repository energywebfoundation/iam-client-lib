export class UnregisteredResolverError extends Error {
  constructor(domain: string, resolver: string) {
    super(`Domain ${domain} is defined on unregistered resolver ${resolver}`);
  }
}
