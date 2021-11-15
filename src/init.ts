import SafeAppSdk from "@gnosis.pm/safe-apps-sdk";
import {
    SignerService,
    ProviderType,
    fromKms,
    fromWalletConnectMetamask,
    fromMetaMask,
    fromPrivateKey,
    fromGnosis,
    EkcSigner,
} from "./modules/signer";
import { StakingService } from "./modules/staking";
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
        const assetsService = await AssetsService.create(signerService, cacheClient);

        async function connectToDidRegistry(ipfsStore?: string) {
            const didRegistry = await DidRegistry.connect(signerService, cacheClient, assetsService, ipfsStore);
            const claimsService = await ClaimsService.create(
                signerService,
                domainsService,
                cacheClient,
                didRegistry,
                messagingService,
            );
            const stakingService = await StakingService.create(
                signerService,
                domainsService,
                cacheClient,
                claimsService,
            );
            return { didRegistry, claimsService, stakingService };
        }
        return { cacheClient, domainsService, assetsService, connectToDidRegistry };
    }

    return {
        signerService,
        messagingService,
        connectToCacheServer,
    };
}
