import { Module } from "@nestjs/common";
import { SignerModule } from "../signer/signer.module";
import { CacheClient } from "./cacheClient.service";

@Module({
    providers: [CacheClient],
    exports: [CacheClient],
    imports: [SignerModule],
})
export class CacheClientModule {}
