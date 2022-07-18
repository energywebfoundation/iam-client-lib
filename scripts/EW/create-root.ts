import { chainConfigs, initWithPrivateKeySigner } from '../../src';
import {
  ENERGYWEB_OWNER,
  AUTH_EWC,
  KYC_OWNER,
  ENERGYWEB,
  ewOwnerKey,
  CHAIN_ID,
} from './constants';
import { getLogger } from '../../src/config/logger.config';

const rpcUrl = chainConfigs()[CHAIN_ID].rpcUrl;

/**
 * Creates apps and roles for the staking use case under the energyweb org
 * Assumes that the auth.ewc org is already created
 * For description of roles, see https://energyweb.atlassian.net/wiki/spaces/EWTS/pages/2960228364/SB+setup
 *
 * Before running this script and `transferEW.ts` values for root domain of energyweb and private key of its owner should be set in `./constants.ts`
 */
(async function () {
  const logger = getLogger();
  const { connectToCacheServer } = await initWithPrivateKeySigner(
    ewOwnerKey,
    rpcUrl
  );
  const { domainsService } = await connectToCacheServer();

  const ENERGYWEB_AUTH_EWC = `${ENERGYWEB}.${AUTH_EWC}`;
  await domainsService.createOrganization({
    orgName: ENERGYWEB,
    namespace: `${AUTH_EWC}`,
    data: { orgName: ENERGYWEB, websiteUrl: 'https://www.energyweb.org/' },
  });
  logger.info(`>>> ${ENERGYWEB_AUTH_EWC} is created`);

  const stakingApp = 'staking';
  await domainsService.createApplication({
    appName: stakingApp,
    namespace: `apps.${ENERGYWEB_AUTH_EWC}`,
    data: { appName: stakingApp, websiteUrl: 'http://stake-ewt.io/' },
  });
  logger.info(`>>> Application ${stakingApp} is created`);
  const stakingOwnerRole = 'owner';
  await domainsService.createRole({
    roleName: stakingOwnerRole,
    namespace: `roles.${stakingApp}.apps.${ENERGYWEB_AUTH_EWC}`,
    data: {
      roleName: stakingOwnerRole,
      roleType: 'app',
      version: 1,
      enrolmentPreconditions: [],
      issuerFields: [],
      metadata: {},
      issuer: { issuerType: 'DID', did: [ENERGYWEB_OWNER] },
    },
  });
  logger.info(`>>> Role ${stakingOwnerRole} is created`);

  const verificationApp = 'verification';
  await domainsService.createApplication({
    appName: verificationApp,
    namespace: `apps.${ENERGYWEB_AUTH_EWC}`,
    data: { appName: verificationApp },
  });
  logger.info(`>>> Application ${verificationApp} is created`);
  const emailRole = 'email';
  await domainsService.createRole({
    roleName: emailRole,
    namespace: `roles.${verificationApp}.apps.${ENERGYWEB_AUTH_EWC}`,
    data: {
      roleName: emailRole,
      roleType: 'app',
      version: 1,
      enrolmentPreconditions: [],
      issuerFields: [],
      metadata: {},
      issuer: { issuerType: 'DID', did: [KYC_OWNER] },
    },
  });
  logger.info(`>>> Role ${emailRole} is created`);
})();
