import SafeAppSdk from "@gnosis.pm/safe-apps-sdk";
import {
    EkcSigner,
    fromGnosis,
    fromKms,
    fromMetaMask,
    fromPrivateKey,
    fromWalletConnectMetamask,
    ProviderType,
    SignerService,
} from "./modules/signer";
import { StakingFactoryService } from "./modules/staking";
import { DidRegistry } from "./modules/didRegistry";
import { MessagingService } from "./modules/messaging";
import { CacheClient } from "./modules/cacheClient";
import { DomainsService } from "./modules/domains";
import { AssetsService } from "./modules/assets";
import { ClaimsService } from "./modules/claims";
import { defaultAzureProxyUrl, defaultBridgeUrl, defaultKmsServerUrl } from "./utils";

export async function initWithPrivateKeySigner(privateKey: string, rpcUrl: string) {
    const signerService = await fromPrivateKey(privateKey, rpcUrl);
    return init(signerService);
}

export async function initWithKms({ bridge = defaultBridgeUrl, kmsServerUrl = defaultKmsServerUrl } = {}) {
    return init(await fromKms(bridge, kmsServerUrl));
}

export async function initWithMetamask() {
    return init(await fromMetaMask());
}

export async function initWithWalletConnect(bridge = defaultBridgeUrl) {
    return init(await fromWalletConnectMetamask(bridge));
}

export async function initWithGnosis(safeAppSdk: SafeAppSdk) {
    return init(await fromGnosis(safeAppSdk));
}

export async function initWithEKC(proxyUrl = defaultAzureProxyUrl) {
    const signerService = new SignerService(await EkcSigner.create(proxyUrl), ProviderType.EKC);
    await signerService.init();
    return init(signerService);
}

export async function init(signerService: SignerService) {
    const messagingService = await MessagingService.create(signerService);

    async function connectToCacheServer() {
        const cacheClient = new CacheClient(signerService);
        await cacheClient.init();
        await cacheClient.login();
        const domainsService = await DomainsService.create(signerService, cacheClient);
        // const stakingService = await StakingService.create(signerService, domainsService);
        const stakingPoolService = await StakingFactoryService.create(signerService, domainsService);
        const assetsService = await AssetsService.create(signerService, cacheClient);

        async function connectToDidRegistry(
            ipfsStore?: string,
        ): Promise<{ didRegistry: DidRegistry; claimsService: ClaimsService }> {
            const didRegistry = await DidRegistry.connect(signerService, cacheClient, assetsService, ipfsStore);
            const claimsService = await ClaimsService.create(signerService, domainsService, cacheClient, didRegistry);
            return { didRegistry, claimsService };
        }
        return { cacheClient, domainsService, assetsService, connectToDidRegistry, stakingPoolService };
    }

    return {
        signerService,
        messagingService,
        connectToCacheServer,
    };
}
