import {
  ChainId,
  IAppDefinition,
  IOrganizationDefinition,
  IRoleDefinition,
} from '..';
import { Wallet } from 'ethers';
import { namehash, labelhash } from './ens-hash';
import { getLogger } from '../config/logger.config';
import { initDomains } from './init-domains';
import {
  DomainReader,
  IIssuerDefinition,
  IRevokerDefinition,
} from '@energyweb/credential-governance';

export const transferDomain = async ({
  rootDomain,
  signer,
  newOwner,
  chainId,
  dryRun = true,
}: {
  rootDomain: string;
  signer: Wallet;
  newOwner: string;
  chainId: ChainId;
  dryRun?: boolean;
}) => {
  const logger = getLogger();
  const { domainHierarchy, ensRegistry, domainReader } = await initDomains(
    signer,
    chainId
  );
  console.time('getSubdomains');
  const domains = await domainHierarchy.getSubdomainsUsingResolver({
    domain: rootDomain,
    mode: 'ALL',
  });
  console.timeEnd('getSubdomains');
  // complement nodes to obtain connected tree
  for (const d of domains) {
    if (d === rootDomain) {
      continue;
    }
    const parent = d.slice(d.indexOf('.') + 1);
    if (parent === rootDomain) {
      continue;
    }
    if (!domains.includes(parent)) {
      domains.push(parent);
    }
  }
  console.dir(domains.sort(), {
    depth: Infinity,
    colors: true,
  });

  const transferred: Array<Record<string, unknown>> = [];
  const transfer = async (domain: string) => {
    const domainHash = namehash(domain);
    const owner = await ensRegistry.owner(domainHash);
    const log: {
      owner: string;
      issuer?: IIssuerDefinition;
      revoker?: IRevokerDefinition;
    } = { owner };
    let def: IRoleDefinition | IAppDefinition | IOrganizationDefinition;
    try {
      def = await domainReader.read({ node: domainHash });
      if (DomainReader.isRoleDefinition(def)) {
        log.issuer = def.issuer;
      }
      if (DomainReader.isRoleDefinitionV2(def)) {
        log.revoker = def.revoker;
      }
    } catch (_) {
      // ignore read metadomain definition error
    }
    transferred.push({ [domain]: log });

    const level = domain.split('.').length;
    const subnodes = domains
      .filter((d) => d.endsWith(domain))
      .filter((d) => d.split('.').length === level + 1);
    logger.info(`Subnodes of ${domain} are ${subnodes}`);
    for await (const node of subnodes) {
      console.group();
      const label = node.split('.')[0];
      const labelHash = labelhash(label);
      console.log(
        `${dryRun ? 'Would transfer' : 'Transferring'} ${node} to root owner`
      );
      if (!dryRun) {
        // transferring node to root owner to be able to transfer to him subnodes of node. This transfer is needed, because not all nodes in tree can belong to owner of tree root
        await (
          await ensRegistry.setSubnodeOwner(
            domainHash,
            labelHash,
            await signer.getAddress()
          )
        ).wait();
      }
      await transfer(node);
      console.groupEnd();
    }
    console.log(
      `${dryRun ? 'Would transfer' : 'Transferring'} ${domain} to new owner`
    );
    if (!dryRun) {
      await (await ensRegistry.setOwner(domainHash, newOwner)).wait();
    }
  };

  await transfer(rootDomain);
  console.dir(transferred.sort(), { depth: Infinity, colors: true });
};
