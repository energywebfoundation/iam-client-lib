import { Module } from "@nestjs/common";

@Module({
    providers: [AssetsService],
    exports: [AssetsService],
})
export class AssetsModule {}
