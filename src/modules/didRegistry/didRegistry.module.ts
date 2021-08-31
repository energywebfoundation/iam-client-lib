import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CacheClient } from "../cacheClient/cacheClient.service";
import { SignerService } from "../signer/signer.service";
import { DidRegistry } from "./didRegistry.service";

@Module({
    providers: [
        {
            provide: DidRegistry,
            useFactory: (
                signerService: SignerService,
                configService: ConfigService,
                ipfsUrl: string,
                cacheClient: CacheClient,
            ) => new DidRegistry(signerService, configService, ipfsUrl, cacheClient),
        },
    ],
})
export class DidRegistryModule {}
