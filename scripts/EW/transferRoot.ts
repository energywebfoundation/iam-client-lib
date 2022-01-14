import { addressOf } from "@ew-did-registry/did-ethr-resolver";
import { chainConfigs, initWithPrivateKeySigner } from "../../src";
import { ENERGYWEB_RECEIVER, AUTH_EWC, ewOwnerKey, ENERGYWEB, CHAIN_ID } from "./constants";

const rpcUrl = chainConfigs()[CHAIN_ID].rpcUrl;

/**
 * Transfers energyweb domains to `ENERGYWEB_RECEIVER`
 */
(async function () {
    const { connectToCacheServer } = await initWithPrivateKeySigner(ewOwnerKey, rpcUrl);
    const { domainsService } = await connectToCacheServer();

    await domainsService.changeOrgOwnership({
        namespace: AUTH_EWC,
        newOwner: addressOf(ENERGYWEB_RECEIVER),
        returnSteps: false,
        withSubdomains: true,
    });

    await domainsService.changeOrgOwnership({
        namespace: `${ENERGYWEB}.${AUTH_EWC}`,
        newOwner: addressOf(ENERGYWEB_RECEIVER),
        returnSteps: false,
        withSubdomains: true,
    });
})();
