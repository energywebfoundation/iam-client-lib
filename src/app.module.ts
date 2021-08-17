import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import chainConfiguration from "./config/chain.config";
import cacheConfiguration from "./config/cache.config";
import messagingConfiguration from "./config/messaging.config";
import { StakingModule } from "./modules/staking/staking.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [chainConfiguration, cacheConfiguration, messagingConfiguration],
        }),
        StakingModule,
    ],
})
export class AppModule {}
