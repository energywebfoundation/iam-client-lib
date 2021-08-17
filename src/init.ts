import { LazyModuleLoader, NestFactory } from "@nestjs/core";
import { INestApplicationContext, Provider } from "@nestjs/common";
import { AppModule } from "./app.module";
import { SignerService } from "./modules/signer/signer.service";
import { ConfigService } from "@nestjs/config";
import { StakingService } from "./modules/staking/staking.service";
import { ClaimsService } from "./modules/claims/claims.service";
import { CacheClient, CacheServerClientOptions } from "./modules/cacheClient/cacheClient.service";
import { CacheClientModule } from "./modules/cacheClient/cacheClient.module";

let app: INestApplicationContext;

export async function initWithPrivateKeySigner(privateKey: string) {
    return await init({
        provide: SignerService,
        useFactory: (configService) => SignerService.initPrivateKeySigner(configService, privateKey),
        inject: [ConfigService],
    });
}

async function getClaimsService(): Promise<ClaimsService> {
    const cacheConfig = app.get(ConfigService).get("cacheConfig") as Record<number, CacheServerClientOptions>;
    const signerService = app.get(SignerService);
    const chainId = (await signerService.signer.provider.getNetwork()).chainId;
    const { url, cacheServerSupportsAuth } = cacheConfig[chainId];
    const lazyLoader = app.get(LazyModuleLoader);
    lazyLoader.load(() => ({
        module: CacheClientModule,
        providers: [
            {
                provide: CacheClient,
                useValue: new CacheClient({ url, cacheServerSupportsAuth }, signerService.signer),
            },
        ],
    }));
    return app.get(ClaimsService);
}

async function init(signerProvider: Provider) {
    app = await NestFactory.createApplicationContext({
        module: AppModule,
        providers: [signerProvider],
    });
    const stakingService = app.get(StakingService);
    const configService = app.get(ConfigService);
    return { stakingService, configService, getClaimsService };
}
