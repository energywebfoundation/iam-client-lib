export class NotAuthorizedIssuer extends Error {
  constructor(issuer: string, role: string) {
    super(`${issuer} is not authorized to issue ${role}`);
  }
}
