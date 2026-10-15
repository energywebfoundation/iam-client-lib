import {
  DomainReader,
  IRoleDefinitionV2,
} from '@energyweb/credential-governance';
import { Methods } from '@ew-did-registry/did';
import { Wallet, constants, BigNumber } from 'ethers';
import { castToV2 } from '../modules/domains';
import { ChainId, getLogger } from '../config';
import { NamespaceType } from '../modules/domains';
import { isValidDID } from './did';
import { labelhash, namehash } from './ens-hash';
import { initDomains } from './init-domains';

const { AddressZero } = constants;

export const updateLegacyDomains = async ({
  rootDomain,
  signer,
  chainId,
  dryRun = true,
}: {
  rootDomain: string;
  signer: Wallet;
  chainId: ChainId;
  dryRun?: boolean;
}) => {
  const logger = getLogger();
  const {
    transactionFactory,
    chainName,
    provider,
    domainHierarchy,
    domainNotifier,
    domainReader,
    ensRegistry,
    ensResolverV2Address,
  } = await initDomains(signer, chainId);

  const updated: Record<string, unknown>[] = [];
  const update = async (domain: string) => {
    const domainHash = namehash(domain);

    let def;
    try {
      def = await domainReader.read({ node: domainHash });
    } catch (e) {
      // 'apps' and 'roles'
      logger.warn(`Unable to read ${domain}: ${(<Error>e).message}`);
      if (
        !(
          domain.startsWith(NamespaceType.Application) ||
          domain.startsWith(NamespaceType.Role) ||
          domain.startsWith(NamespaceType.Organization)
        )
      ) {
        logger.info(
          `${dryRun ? 'Would delete' : 'Deleting'} malformed ${domain}...`
        );
        !dryRun &&
          (await (
            await ensRegistry.setRecord(
              domainHash,
              AddressZero,
              AddressZero,
              BigNumber.from(0)
            )
          ).wait());
        return;
      }
    }

    // const resolver = await ensRegistry.resolver(domainHash);
    if (!dryRun /*&& resolver !== ensResolverV2Address*/) {
      await (
        await ensRegistry.setResolver(domainHash, ensResolverV2Address)
      ).wait();
      // migrate domain definition
      let updateDomainTx;
      if (def) {
        if (DomainReader.isRoleDefinition(def)) {
          // in some legacy roles issuer.issuerType = {}
          if (def.issuer?.did?.length) {
            def.issuer.issuerType = 'DID';
          } else if (def.issuer.roleName) {
            def.issuer.issuerType = 'ROLE';
          } else {
            throw new Error(`Unable to set issuer type of ${domain}`);
          }
          const {
            issuer: { did },
            version,
          } = def;
          const updatedDef: IRoleDefinitionV2 = castToV2({
            ...def,
            issuer: {
              ...def.issuer,
              did: did?.map((d) =>
                isValidDID(d)
                  ? d
                  : `did:${Methods.Erc1056}:${chainName}:${d
                      .split(':')
                      .slice(-1)}`
              ),
            },
            version: parseInt(version.toString(), 10),
          });
          if (JSON.stringify(def) !== JSON.stringify(updatedDef)) {
            process.stdout.write(
              `${dryRun ? 'Would fix' : 'Fixing'} definition of role ${domain}`
            );
            updated.push({ domain, legacyDef: def, updatedDef });
            updateDomainTx = transactionFactory.newRole({
              domain,
              roleDefinition: updatedDef,
            });
          }
        } else {
          process.stdout.write(
            `${dryRun ? 'Would create' : 'Creating'} new role ${domain}}`
          );
          updateDomainTx = transactionFactory.newDomain({
            domain,
            domainDefinition: def,
          });
        }
        !dryRun &&
          (await (
            await signer.connect(provider).sendTransaction(updateDomainTx)
          ).wait());
      }
    }
    process.stdout.write(
      `${dryRun ? 'Would set' : 'Setting'} name of ${domain}`
    );
    if (!dryRun) {
      await (
        await signer
          .connect(provider)
          .sendTransaction(transactionFactory.setDomainNameTx({ domain }))
      ).wait();
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
    }
    logger.info(`subnodes of ${domain} are: ${subnodes}`);
    for await (const nodeName of subnodes) {
      console.group();
      const label = nodeName.split('.')[0];
      const labelHash = labelhash(label);
      const nodeHash = namehash(nodeName);
      const owner = await ensRegistry.owner(nodeHash);
      process.stdout.write(
        `${dryRun ? 'Would set' : 'Setting'} owner of ${domain}`
      );
      if (!dryRun) {
        await (
          await ensRegistry.setSubnodeOwner(
            domainHash,
            labelHash,
            await signer.getAddress()
          )
        ).wait();
      }
      await update(nodeName);
      if (!dryRun) {
        await (
          await ensRegistry.setSubnodeOwner(domainHash, labelHash, owner)
        ).wait();
      }
      console.groupEnd();
    }
    await (await domainNotifier.domainUpdated(domainHash)).wait();
  };

  await update(rootDomain);
  return updated;
};
