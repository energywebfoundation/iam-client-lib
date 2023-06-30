import { ChainId } from '..';
import { Wallet } from 'ethers';
import { namehash, labelhash } from './ens-hash';
import { getLogger } from '../config/logger.config';
import { DomainReader } from '@energyweb/credential-governance';
import { initDomains } from './init-domains';

/**
 * @description - Checks that role issuers of all roles under `rootDomain` contains method-specific-id and adds it if missing
 * `signer` must own `rootDomain` on `targetChain`
 */

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
  const { domainHierarchy, domainReader, ensRegistry } = await initDomains(
    signer,
    chainId
  );
  const transferred: Record<string, unknown>[] = [];
  const transfer = async (domain: string) => {
    const domainHash = namehash(domain);

    let def;
    try {
      def = await domainReader.read({ node: domainHash });
    } catch (e) {
      // 'apps' and 'roles'
      logger.warn(`Unable to read ${domain}: ${(<Error>e).message}`);
    }

    const subnodes = await domainHierarchy.getSubdomainsUsingResolver({
      domain,
      mode: 'FIRSTLEVEL',
    });
    if (def) {
      if (
        DomainReader.isOrgDefinition(def) ||
        DomainReader.isAppDefinition(def)
      ) {
        subnodes.push(`roles.${domain}`);
      }
      if (DomainReader.isOrgDefinition(def)) {
        subnodes.push(`apps.${domain}`);
      }
      if (domain === 'engie.auth.ewc') {
        subnodes.push(`orgs.${domain}`);
      }
    }
    logger.info(`Subnodes of ${domain} are ${subnodes ?? 'not set'}`);
    for await (const nodeName of subnodes) {
      console.group();
      const label = nodeName.split('.')[0];
      const labelHash = labelhash(label);
      console.log(`${dryRun ? 'Would transfer' : 'Transferring'} ${nodeName}`);
      if (!dryRun) {
        await (
          await ensRegistry.setSubnodeOwner(
            domainHash,
            labelHash,
            await signer.getAddress()
          )
        ).wait();
      }
      await transfer(nodeName);
      console.groupEnd();
    }
    console.log(`${dryRun ? 'Would transfer' : 'Transferring'} ${domain}`);
    if (!dryRun) {
      await (await ensRegistry.setOwner(domainHash, newOwner)).wait();
    }
    return transferred;
  };

  await transfer(rootDomain);
};
