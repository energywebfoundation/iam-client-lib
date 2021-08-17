import { Methods } from "@ew-did-registry/did";
import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { IdentityManager__factory } from "../../../ethers/factories/IdentityManager__factory";
import { IdentityManager } from "../../../ethers/IdentityManager";
import { OfferableIdentityFactory } from "../../../ethers/OfferableIdentityFactory";
import { ChainConfig } from "../../config/chain.config";
import { ERROR_MESSAGES } from "../../errors";
import { CacheClient } from "../cacheClient/cacheClient.service";
import { AssetHistoryEventType, Order } from "../cacheClient/cacheClient.types";
import { EncodedCall, SignerService } from "../signer/signer.service";

@Injectable()
export class AssetsService implements OnModuleInit {
    private owner: string;
    private did: string;
    private assetManager: IdentityManager;

    constructor(
        private signerService: SignerService,
        private configService: ConfigService,
        private cacheClient: CacheClient,
    ) {}

    async onModuleInit() {
        const signer = this.signerService.signer;
        this.owner = await signer.getAddress();
        this.did = `did:${Methods.Erc1056}:${this.owner}`;
        const chainId = (await signer.provider.getNetwork()).chainId;
        const chainConfig = this.configService.get("chainConfig")[chainId] as ChainConfig;
        const { assetManagerAddress } = chainConfig;
        this.assetManager = new IdentityManager__factory(signer).attach(assetManagerAddress);
    }

    public async registerAsset() {
        try {
            const event = (await (await this.assetManager.createIdentity(this.owner)).wait()).events?.find(
                (e) => e.event === this.assetManager.interface.events.IdentityCreated.name,
            );
            const identity = (event?.args as string[])[0];

            let asset = await this.getAssetById({ id: `did:ethr:${identity}` });
            let loops = 0;
            /*
             * we need to wait until cache server will resolve assets did document
             * which is taking some time
             */
            while (!asset && loops < 20) {
                asset = await this.getAssetById({ id: `did:${Methods.Erc1056}:${identity}` });
                await new Promise((resolve) => setTimeout(resolve, 1000));
                loops++;
            }
            return identity;
        } catch (e) {
            throw new Error(e);
        }
    }

    public async offerAsset({ assetDID, offerTo }: { assetDID: string; offerTo: string }) {
        const [, , offerToAddress] = offerTo.split(":");
        const [, , assetContractAddress] = assetDID.split(":");
        const tx = this.offerAssetTx({ assetContractAddress, offerTo: offerToAddress });
        await this.signerService.send({
            calls: [tx],
            from: this.owner,
        });
    }

    public async acceptAssetOffer({ assetDID }: { assetDID: string }) {
        const [, , assetContractAddress] = assetDID.split(":");
        const tx = this.acceptOfferTx({ assetContractAddress });
        await this.signerService.send({
            calls: [tx],
            from: this.owner,
        });
    }

    public async rejectAssetOffer({ assetDID }: { assetDID: string }) {
        const [, , assetContractAddress] = assetDID.split(":");
        const tx = this.rejectOfferTx({ assetContractAddress });
        await this.signerService.send({
            calls: [tx],
            from: this.owner,
        });
    }

    public async cancelAssetOffer({ assetDID }: { assetDID: string }) {
        const [, , assetContractAddress] = assetDID.split(":");
        const tx = this.cancelOfferTx({ assetContractAddress });
        await this.signerService.send({ calls: [tx], from: this.owner });
    }

    public async getOwnedAssets({ did = this.did }: { did?: string } = {}) {
        if (!did) {
            throw new Error(ERROR_MESSAGES.USER_NOT_LOGGED_IN);
        }
        return this.cacheClient.getOwnedAssets({ did });
    }

    public async getOfferedAssets({ did = this.did }: { did?: string } = {}) {
        if (!did) {
            throw new Error(ERROR_MESSAGES.USER_NOT_LOGGED_IN);
        }
        return this.cacheClient.getOfferedAssets({ did });
    }

    public async getAssetById({ id }: { id: string }) {
        if (this.cacheClient) {
            return this.cacheClient.getAssetById({ id });
        }
        throw new Error(ERROR_MESSAGES.CACHE_CLIENT_NOT_PROVIDED);
    }

    public async getPreviouslyOwnedAssets({ owner }: { owner: string }) {
        if (this.cacheClient) {
            return this.cacheClient.getPreviouslyOwnedAssets({ owner });
        }
        throw new Error(ERROR_MESSAGES.CACHE_CLIENT_NOT_PROVIDED);
    }

    public async getAssetHistory({
        id,
        ...query
    }: {
        id: string;
        order?: Order;
        take?: number;
        skip?: number;
        type?: AssetHistoryEventType;
    }) {
        if (this.cacheClient) {
            return this.cacheClient.getAssetHistory({ id, ...query });
        }
        throw new Error(ERROR_MESSAGES.CACHE_CLIENT_NOT_PROVIDED);
    }

    protected offerAssetTx({
        offerTo,
        assetContractAddress,
    }: {
        offerTo: string;
        assetContractAddress: string;
    }): EncodedCall {
        const asset = OfferableIdentityFactory.connect(assetContractAddress, this.signerService.signer);
        return {
            data: asset.interface.functions.offer.encode([offerTo]),
            to: assetContractAddress,
        };
    }

    protected acceptOfferTx({ assetContractAddress }: { assetContractAddress: string }): EncodedCall {
        const asset = OfferableIdentityFactory.connect(assetContractAddress, this.signerService.signer);
        return {
            data: asset.interface.functions.acceptOffer.encode([]),
            to: assetContractAddress,
        };
    }

    protected rejectOfferTx({ assetContractAddress }: { assetContractAddress: string }): EncodedCall {
        const asset = OfferableIdentityFactory.connect(assetContractAddress, this.signerService.signer);
        return {
            data: asset.interface.functions.rejectOffer.encode([]),
            to: assetContractAddress,
        };
    }

    protected cancelOfferTx({ assetContractAddress }: { assetContractAddress: string }): EncodedCall {
        const asset = OfferableIdentityFactory.connect(assetContractAddress, this.signerService.signer);
        return {
            data: asset.interface.functions.cancelOffer.encode([]),
            to: assetContractAddress,
        };
    }
}
