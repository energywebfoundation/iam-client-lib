import { CacheClient } from '../cache-client/cache-client.service';
import { SignerService } from '../signer/signer.service';
import { AcceptAssetOfferOptions, Asset, AssetHistory, CancelAssetOfferOptions, GetAssetByIdOptions, GetAssetHistoryOptions, GetOfferedAssetsOptions, GetOwnedAssetsOptions, GetPreviouslyOwnedAssetsOptions, OfferAssetOptions, RejectAssetOfferOptions } from './assets.types';
/**
 * Service responsible for handling the asset creation and management.
 * See more information about assets in IAM stack [here](../../../docs/guides/asset.md).
 *
 * ```typescript
 * const { connectToCacheServer } = await initWithPrivateKeySigner(privateKey, rpcUrl);
 * const { assetsService } = await connectToCacheServer();
 * assetsService.registerAsset();
 * ```
 */
export declare class AssetsService {
    private _signerService;
    private _cacheClient;
    private _owner;
    private _did;
    private _assetManager;
    private _assetInterface;
    private _assetManagerInterface;
    constructor(_signerService: SignerService, _cacheClient: CacheClient);
    static create(signerService: SignerService, cacheClient: CacheClient): Promise<AssetsService>;
    init(): Promise<void>;
    /**
     * Register a new asset to the user.
     *
     * ```typescript
     * assetsService.registerAsset();
     * ```
     *
     * @return asset address
     */
    registerAsset(): Promise<string>;
    /**
     * Send an asset offer transfer to a given address
     *
     * ```typescript
     * assetsService.offerAsset({
     *     assetDID: 'did:ethr:volta:0x000...1',
     *     offerTo: '0x000...2',
     * });
     * ```
     *
     * @param {OfferAssetOptions} options object containing options
     */
    offerAsset({ assetDID, offerTo }: OfferAssetOptions): Promise<void>;
    /**
     * Accept an offered asset.
     *
     * ```typescript
     * assetsService.acceptAssetOffer({
     *     assetDID: 'did:ethr:volta:0x000...1',
     * });
     * ```
     *
     * @param {AcceptAssetOfferOptions} options object containing options
     */
    acceptAssetOffer({ assetDID }: AcceptAssetOfferOptions): Promise<void>;
    /**
     * Reject an offered asset.
     *
     * ```typescript
     * assetsService.rejectAssetOffer({
     *     assetDID: 'did:ethr:volta:0x000...1',
     * });
     * ```
     *
     * @param {RejectAssetOfferOptions} options object containing options
     */
    rejectAssetOffer({ assetDID }: RejectAssetOfferOptions): Promise<void>;
    /**
     * Cancel an asset offer.
     *
     * ```typescript
     * assetsService.cancelAssetOffer({
     *     assetDID: 'did:ethr:volta:0x000...1',
     * });
     * ```
     *
     * @param {CancelAssetOfferOptions} options object containing options
     */
    cancelAssetOffer({ assetDID }: CancelAssetOfferOptions): Promise<void>;
    /**
     * Retrieve owned assets of the given user.
     *
     * ```typescript
     * assetsService.getOwnedAssets({
     *     did: 'did:ethr:volta:0x000...1',
     * });
     * ```
     *
     * @param {GetOwnedAssetsOptions} options object containing options
     * @returns owned assets
     */
    getOwnedAssets({ did }?: GetOwnedAssetsOptions): Promise<Asset[]>;
    /**
     * Retrieve assets offered to the given user.
     *
     * ```typescript
     * assetsService.getOfferedAssets({
     *     did: 'did:ethr:volta:0x000...1',
     * });
     * ```
     *
     * @param {GetOwnedAssetsOptions} options object containing options
     * @returns offered assets
     */
    getOfferedAssets({ did, }?: GetOfferedAssetsOptions): Promise<Asset[]>;
    /**
     * Retrieve asset by id.
     *
     * ```typescript
     * assetsService.getAssetById({
     *     id: 'did:ethr:volta:0x000...1',
     * });
     * ```
     *
     * @param {GetAssetByIdOptions} options object containing options
     * @return asset
     */
    getAssetById({ id }: GetAssetByIdOptions): Promise<Asset>;
    /**
     * Retrieve DID of the asset owner of the given asset DID.
     *
     * ```typescript
     * assetsService.getAssetOwner('did:ethr:volta:0x000...1');
     * ```
     *
     * @param {String} id DID of the asset
     * @return asset owner DID
     */
    getAssetOwner(id: string): Promise<string>;
    /**
     * Retrieve previously owned assets of the given user.
     *
     * ```typescript
     * assetsService.getPreviouslyOwnedAssets({
     *     owner: 'did:ethr:volta:0x000...1',
     * });
     * ```
     *
     * @param {GetPreviouslyOwnedAssetsOptions} options object containing options
     * @returns previously owned assets
     */
    getPreviouslyOwnedAssets({ owner, }: GetPreviouslyOwnedAssetsOptions): Promise<Asset[]>;
    /**
     * Retrieve history of a given asset DID
     *
     * ```typescript
     * assetsService.getAssetHistory({
     *     id: 'did:ethr:volta:0x000...1',
     *     order: Order.ASC,
     *     take: 5,
     *     skip: 0,
     *     type: AssetHistoryEventType.ASSET_OFFERED,
     * });
     * ```
     *
     * @param {GetAssetHistoryOptions} options object containing options
     * @returns asset history
     */
    getAssetHistory({ id, ...query }: GetAssetHistoryOptions): Promise<AssetHistory[]>;
    /**
     * Create a transaction request to offer an asset to a given DID.
     *
     * @param {OfferAssetTxOptions} options object containing options
     * @returns transaction request
     */
    private offerAssetTx;
    /**
     * Create a transaction request to accept an asset offer.
     *
     * @param {AcceptOfferTxOptions} options object containing options
     * @returns transaction request
     */
    private acceptOfferTx;
    /**
     * Create a transaction request to reject an asset offer.
     *
     * @param {RejectOfferTxOptions} options object containing options
     * @returns transaction request
     */
    private rejectOfferTx;
    /**
     * Create a transaction request to cancel an asset offer.
     *
     * @param {CancelOfferTxOptions} options object containing options
     * @returns transaction request
     */
    private cancelOfferTx;
}
