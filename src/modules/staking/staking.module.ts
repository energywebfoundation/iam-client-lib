import { Module } from "@nestjs/common";
import { SignerService } from "../signer/signer.service";
import { StakingService } from "./staking.service";

@Module({
    providers: [
        {
            provide: StakingService,
            useFactory: StakingService.init,
            inject: [SignerService],
        },
    ],
    exports: [StakingService],
})
export class StakingModule {}
