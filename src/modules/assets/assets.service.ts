import { utils, providers } from "ethers";
import { Methods } from "@ew-did-registry/did";
import { IdentityManager__factory } from "../../../ethers/factories/IdentityManager__factory";
import { OfferableIdentity__factory } from "../../../ethers/factories/OfferableIdentity__factory";
import { ChainConfig, chainConfigs } from "../../config/chain.config";
import { CacheClient } from "../cacheClient/cacheClient.service";
import { Order } from "../cacheClient/cacheClient.types";
import { SignerService } from "../signer/signer.service";
import { AssetHistoryEventType } from "./assets.types";

export class AssetsService {
    private _owner: string;
    private _did: string;
    private _assetManager: string;
    private _assetInterface = OfferableIdentity__factory.createInterface();
    private _assetManagerInterface = IdentityManager__factory.createInterface();

    constructor(private _signerService: SignerService, private _cacheClient: CacheClient) {
        this._signerService.onInit(this.init.bind(this));
    }

    static async create(signerService: SignerService, cacheClient: CacheClient) {
        const service = new AssetsService(signerService, cacheClient);
        await service.init();
        return service;
    }

    async init() {
        const chainId = this._signerService.chainId;
        this._owner = this._signerService.address;
        this._did = `did:${Methods.Erc1056}:${this._owner}`;
        const chainConfig = chainConfigs()[chainId] as ChainConfig;
        this._assetManager = chainConfig.assetManagerAddress;
    }

    async registerAsset(): Promise<string> {
        const data = this._assetManagerInterface.encodeFunctionData("createIdentity", [this._owner]);
        const receipt = await this._signerService.send({ to: this._assetManager, data });
        const event = receipt.logs
            .map((l) => this._assetManagerInterface.parseLog(l))
            .find(
                (log) =>
                    log.name === this._assetManagerInterface.events["IdentityCreated(address,address,uint256)"].name,
            ) as utils.LogDescription;
        const identity = event.args[0] as string;
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
    }

    /**
     * @param offerTo - recepient address
     */
    async offerAsset({ assetDID, offerTo }: { assetDID: string; offerTo: string }) {
        const [, , assetContractAddress] = assetDID.split(":");
        const tx = this.offerAssetTx({ assetContractAddress, offerTo: offerTo });
        await this._signerService.send(tx);
    }

    async acceptAssetOffer({ assetDID }: { assetDID: string }) {
        const [, , assetContractAddress] = assetDID.split(":");
        const tx = this.acceptOfferTx({ assetContractAddress });
        await this._signerService.send(tx);
    }

    async rejectAssetOffer({ assetDID }: { assetDID: string }) {
        const [, , assetContractAddress] = assetDID.split(":");
        const tx = this.rejectOfferTx({ assetContractAddress });
        await this._signerService.send(tx);
    }

    async cancelAssetOffer({ assetDID }: { assetDID: string }) {
        const [, , assetContractAddress] = assetDID.split(":");
        const tx = this.cancelOfferTx({ assetContractAddress });
        await this._signerService.send(tx);
    }

    async getOwnedAssets({ did = this._did }: { did?: string } = {}) {
        return this._cacheClient.getOwnedAssets(did);
    }

    async getOfferedAssets({ did = this._did }: { did?: string } = {}) {
        return this._cacheClient.getOfferedAssets(did);
    }

    async getAssetById({ id }: { id: string }) {
        return this._cacheClient.getAssetById(id);
    }

    async getPreviouslyOwnedAssets({ owner }: { owner: string }) {
        return this._cacheClient.getPreviouslyOwnedAssets(owner);
    }

    async getAssetHistory({
        id,
        ...query
    }: {
        id: string;
        order?: Order;
        take?: number;
        skip?: number;
        type?: AssetHistoryEventType;
    }) {
        return this._cacheClient.getAssetHistory(id, { ...query });
    }

    private offerAssetTx({
        offerTo,
        assetContractAddress,
    }: {
        offerTo: string;
        assetContractAddress: string;
    }): providers.TransactionRequest {
        return {
            data: this._assetInterface.encodeFunctionData("offer", [offerTo]),
            to: assetContractAddress,
        };
    }

    private acceptOfferTx({ assetContractAddress }: { assetContractAddress: string }): providers.TransactionRequest {
        return {
            data: this._assetInterface.encodeFunctionData("acceptOffer"),
            to: assetContractAddress,
        };
    }

    private rejectOfferTx({ assetContractAddress }: { assetContractAddress: string }): providers.TransactionRequest {
        return {
            data: this._assetInterface.encodeFunctionData("rejectOffer"),
            to: assetContractAddress,
        };
    }

    private cancelOfferTx({ assetContractAddress }: { assetContractAddress: string }): providers.TransactionRequest {
        return {
            data: this._assetInterface.encodeFunctionData("cancelOffer"),
            to: assetContractAddress,
        };
    }
}
