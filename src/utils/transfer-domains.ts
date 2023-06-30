import { ChainId } from '..';
import { Wallet } from 'ethers';
import { namehash, labelhash } from './ens-hash';
import { getLogger } from '../config/logger.config';
import { initDomains } from './init-domains';

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
  const { domainHierarchy, ensRegistry } = await initDomains(signer, chainId);
  console.time('getSubdomains');
  let domains = await domainHierarchy.getSubdomainsUsingResolver({
    domain: rootDomain,
    mode: 'ALL',
  });
  console.timeEnd('getSubdomains');
  // domains which does not have definitions, like those which starts from `apps`, `orgs` and `roles`
  const metadomains: Array<string> = [];
  for (let d of domains) {
    while (![...domains, ...metadomains].includes(d)) {
      metadomains.push(d);
      d = d.slice(0, d.lastIndexOf('.'));
    }
  }
  domains = [...domains, ...metadomains];
  console.dir([...domains].sort(), { depth: Infinity, colors: true });

  const transferred: Array<string> = [];
  const transfer = async (domain: string) => {
    const domainHash = namehash(domain);

    const level = domain.split('.').length;
    const subnodes = domains
      .filter((d) => d.startsWith(domain))
      .filter((d) => d.split('.').length === level + 1);
    logger.info(`Subnodes of ${domain} are ${subnodes ?? 'not set'}`);
    for await (const node of subnodes) {
      console.group();
      const label = node.split('.')[0];
      const labelHash = labelhash(label);
      console.log(
        `${dryRun ? 'Would transfer' : 'Transferring'} ${node} to root owner`
      );
      if (!dryRun) {
        // transferring node to root owner to be able to transfer to him subnodes of node. This transfer is needed, because not all nodes in tree can belong to tree owner
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
      transferred.push(domain);
    }
  };

  await transfer(rootDomain);
  console.dir(transferred.sort(), { depth: Infinity, colors: true });
};
