import {
  IIssuerDefinition,
  IRoleDefinitionV2,
} from '@energyweb/credential-governance';
import { IssuerResolver } from '@energyweb/vc-verification';
import { DomainsService, NamespaceType } from '../domains';

export class CachedIssuerResolver implements IssuerResolver {
  constructor(private readonly domainsService: DomainsService) {}

  async getIssuerDefinition(namespace: string): Promise<IIssuerDefinition> {
    const role = (await this.domainsService.getDefinition({
      type: NamespaceType.Role,
      namespace,
    })) as IRoleDefinitionV2;
    return role.issuer;
  }
}
