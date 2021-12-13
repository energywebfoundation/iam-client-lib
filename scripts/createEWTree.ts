import { VOLTA_CHAIN_ID } from "@energyweb/iam-contracts";
import { chainConfigs, initWithPrivateKeySigner } from "../src";
import { ENERGYWEB_OWNER, ENERGYWEB_ROOT, KYC_OWNER_DID } from "./constants";

/**
 * Creates apps and roles for the staking use case under the energyweb org
 * Assumes that the energyweb org is already created
 * For description of roles, see https://energyweb.atlassian.net/wiki/spaces/EWTS/pages/2960228364/SB+setup
 */

const ewOwnerKey = "1aec3458500362c0a0f1772ab724a71b0f9d7da418a2d86d5954ab3f4b58ec4e";
const chainConfig = chainConfigs()[VOLTA_CHAIN_ID];
const rpcUrl = chainConfig.rpcUrl;

(async function () {
    const { connectToCacheServer } = await initWithPrivateKeySigner(ewOwnerKey, rpcUrl);
    const { domainsService } = await connectToCacheServer();

    const stakingApp = "staking";
    await domainsService.createApplication({
        appName: stakingApp,
        namespace: `apps.${ENERGYWEB_ROOT}`,
        data: { appName: stakingApp, websiteUrl: "https://staking-staging.energyweb.org/" },
    });
    console.log(`Application ${stakingApp} is created`);
    const verificationApp = "verification";
    await domainsService.createApplication({
        appName: verificationApp,
        namespace: `apps.${ENERGYWEB_ROOT}`,
        data: { appName: verificationApp },
    });
    console.log(`Application ${verificationApp} is created`);
    console.log("apps of energyweb root:", await domainsService.getAppsOfOrg(ENERGYWEB_ROOT));

    const stakingOwnerRole = "owner";
    await domainsService.createRole({
        roleName: stakingOwnerRole,
        namespace: `roles.${stakingApp}.apps.${ENERGYWEB_ROOT}`,
        data: {
            roleName: stakingOwnerRole,
            roleType: "app",
            version: 1,
            enrolmentPreconditions: [],
            fields: [],
            metadata: {},
            issuer: { issuerType: "DID", did: [ENERGYWEB_OWNER] },
        },
    });
    console.log(`Role ${stakingOwnerRole} is created`);

    const emailRole = "email";
    await domainsService.createRole({
        roleName: emailRole,
        namespace: `roles.${verificationApp}.apps.${ENERGYWEB_ROOT}`,
        data: {
            roleName: emailRole,
            roleType: "app",
            version: 1,
            enrolmentPreconditions: [],
            fields: [],
            metadata: {},
            issuer: { issuerType: "DID", did: [ENERGYWEB_OWNER, KYC_OWNER_DID] },
        },
    });
    console.log(`Role ${emailRole} is created`);
})();
