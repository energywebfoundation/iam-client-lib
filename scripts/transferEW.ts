import { addressOf } from "@ew-did-registry/did-ethr-resolver";
import { chainConfigs, initWithPrivateKeySigner, VOLTA_CHAIN_ID } from "../src";
import { ENERGYWEB_RECEIVER, ENERGYWEB_ROOT, ewOwnerKey } from "./constants";

const rpcUrl = chainConfigs()[VOLTA_CHAIN_ID].rpcUrl;

(async function () {
    const { connectToCacheServer } = await initWithPrivateKeySigner(ewOwnerKey, rpcUrl);
    const { domainsService } = await connectToCacheServer();
    await domainsService.changeOrgOwnership({
        namespace: ENERGYWEB_ROOT,
        newOwner: addressOf(ENERGYWEB_RECEIVER),
        returnSteps: false,
        withSubdomains: true,
    });
})();
