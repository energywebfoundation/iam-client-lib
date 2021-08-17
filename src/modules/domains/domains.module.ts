import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CacheClientModule } from "../cacheClient/cacheClient.module";
import { SignerModule } from "../signer/signer.module";
import { DomainsService } from "./domains.service";

@Module({
    providers: [DomainsService],
    imports: [SignerModule, ConfigModule, CacheClientModule],
    exports: [DomainsService],
})
export class DomainsModule {}
