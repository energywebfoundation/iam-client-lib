import { SignerService } from "./modules/signer/signer.service";
import { StakingService } from "./modules/staking/staking.service";
import { detectExecutionEnvironment, ExecutionEnvironment } from "./utils/detectEnvironment";
import { PUBLIC_KEY, WALLET_PROVIDER } from "./modules/signer";
import { fromPrivateKey } from "./modules/signer";
import { DidRegistry } from "./modules/didRegistry/didRegistry.service";
import { MessagingService } from "./modules/messaging/messaging.service";
import { CacheClient } from "./modules/cacheClient/cacheClient.service";
import { DomainsService } from "./modules/domains/domains.service";
import { AssetsService } from "./modules/assets/assets.service";
import { ClaimsService } from "./modules/claims/claims.service";

export async function initWithPrivateKeySigner(privateKey: string, rpcUrl: string) {
    const signerService = await fromPrivateKey(privateKey, rpcUrl);
    return init(signerService);
}

export async function init(signerService: SignerService) {
    const messagingService = await MessagingService.create(signerService);

    async function connectToCacheServer() {
        const cacheClient = new CacheClient(signerService);
        await cacheClient.init();
        await cacheClient.login();
        const domainsService = await DomainsService.create(signerService, cacheClient);
        const stakingService = await StakingService.create(signerService, domainsService);
        const assetsService = await AssetsService.create(signerService, cacheClient);

        async function connectToDidRegistry(
            ipfsStore?: string,
        ): Promise<{ didRegistry: DidRegistry; claimsService: ClaimsService }> {
            const didRegistry = await DidRegistry.connect(signerService, cacheClient, assetsService, ipfsStore);
            const claimsService = await ClaimsService.create(
                signerService,
                domainsService,
                cacheClient,
                didRegistry,
                messagingService,
            );
            return { didRegistry, claimsService };
        }
        return { cacheClient, domainsService, stakingService, assetsService, connectToDidRegistry };
    }

    /**
     * Check if session is active
     *
     * @returns boolean that indicates the session state
     */
    async function isSessionActive() {
        return Boolean(await signerService.publicKey()) && Boolean(signerService.providerType);
    }

    async function storeSession() {
        if (detectExecutionEnvironment() === ExecutionEnvironment.BROWSER) {
            localStorage.setItem(WALLET_PROVIDER, signerService.providerType);
            localStorage.setItem(PUBLIC_KEY, await signerService.publicKey());
        }
    }

    return {
        signerService,
        messagingService,
        connectToCacheServer,
        isSessionActive,
        storeSession,
    };
}
