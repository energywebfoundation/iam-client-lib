import { CacheModule, Module } from "@nestjs/common";
import { DomainsModule } from "../domains/domains.module";
import { SignerModule } from "../signer/signer.module";
import { ClaimsService } from "./claims.service";

@Module({
    providers: [ClaimsService],
    exports: [ClaimsService],
    imports: [SignerModule, DomainsModule, CacheModule],
})
export class ClaimsModule {}
