import { utils, providers } from 'ethers';
import { Methods } from '@ew-did-registry/did';
import { addressOf } from '@ew-did-registry/did-ethr-resolver';
import { IdentityManager__factory } from '../../../ethers/factories/IdentityManager__factory';
import { OfferableIdentity__factory } from '../../../ethers/factories/OfferableIdentity__factory';
import { ChainConfig, chainConfigs } from '../../config/chain.config';
import { CacheClient } from '../cache-client/cache-client.service';
import { SignerService } from '../signer/signer.service';
import {
  AcceptAssetOfferOptions,
  AcceptOfferTxOptions,
  Asset,
  AssetHistory,
  CancelAssetOfferOptions,
  CancelOfferTxOptions,
  GetAssetByIdOptions,
  GetAssetHistoryOptions,
  GetOfferedAssetsOptions,
  GetOwnedAssetsOptions,
  GetPreviouslyOwnedAssetsOptions,
  OfferAssetOptions,
  OfferAssetTxOptions,
  RejectAssetOfferOptions,
  RejectOfferTxOptions,
} from './assets.types';
import { AssetNotExist } from '../../errors/asset-not-exist';

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
export class AssetsService {
  private _owner: string;
  private _did: string;
  private _assetManager: string;
  private _assetInterface = OfferableIdentity__factory.createInterface();
  private _assetManagerInterface = IdentityManager__factory.createInterface();

  constructor(
    private _signerService: SignerService,
    private _cacheClient: CacheClient
  ) {
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
    this._did = this._signerService.did;
    const chainConfig = chainConfigs()[chainId] as ChainConfig;
    this._assetManager = chainConfig.assetManagerAddress;
  }

  /**
   * Register a new asset to the user.
   *
   * ```typescript
   * assetsService.registerAsset();
   * ```
   *
   * @return asset address
   */
  async registerAsset(): Promise<string> {
    const data = this._assetManagerInterface.encodeFunctionData(
      'createIdentity',
      [this._owner]
    );
    const receipt = await this._signerService.send({
      to: this._assetManager,
      data,
    });
    const event = receipt.logs
      .map((l) => this._assetManagerInterface.parseLog(l))
      .find(
        (log) =>
          log.name ===
          this._assetManagerInterface.events[
            'IdentityCreated(address,address,uint256)'
          ].name
      ) as utils.LogDescription;
    const identity = event.args[0] as string;
    let asset = await this.getAssetById({
      id: `did:${
        Methods.Erc1056
      }:${this._signerService.chainName()}:${identity}`,
    });
    let loops = 0;
    /*
     * we need to wait until cache server will resolve assets did document
     * which is taking some time
     */
    while (!asset && loops < 20) {
      asset = await this.getAssetById({
        id: `did:${
          Methods.Erc1056
        }:${this._signerService.chainName()}:${identity}`,
      });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      loops++;
    }
    return identity;
  }

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
  async offerAsset({ assetDID, offerTo }: OfferAssetOptions): Promise<void> {
    const assetContractAddress = addressOf(assetDID);
    const tx = this.offerAssetTx({ assetContractAddress, offerTo: offerTo });
    await this._signerService.send(tx);
  }

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
  async acceptAssetOffer({ assetDID }: AcceptAssetOfferOptions): Promise<void> {
    const assetContractAddress = addressOf(assetDID);
    const tx = this.acceptOfferTx({ assetContractAddress });
    await this._signerService.send(tx);
  }

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
  async rejectAssetOffer({ assetDID }: RejectAssetOfferOptions): Promise<void> {
    const assetContractAddress = addressOf(assetDID);
    const tx = this.rejectOfferTx({ assetContractAddress });
    await this._signerService.send(tx);
  }

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
  async cancelAssetOffer({ assetDID }: CancelAssetOfferOptions): Promise<void> {
    const assetContractAddress = addressOf(assetDID);
    const tx = this.cancelOfferTx({ assetContractAddress });
    await this._signerService.send(tx);
  }

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
  async getOwnedAssets(
    { did }: GetOwnedAssetsOptions = { did: this._did }
  ): Promise<Asset[]> {
    return this._cacheClient.getOwnedAssets(did);
  }

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
  async getOfferedAssets({
    did = this._did,
  }: GetOfferedAssetsOptions): Promise<Asset[]> {
    return this._cacheClient.getOfferedAssets(did);
  }

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
  async getAssetById({ id }: GetAssetByIdOptions): Promise<Asset> {
    return this._cacheClient.getAssetById(id);
  }

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
  async getAssetOwner(id: string) {
    const asset = await this.getAssetById({ id });
    if (!asset) {
      throw new AssetNotExist(id);
    }
    return asset.owner;
  }

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
  async getPreviouslyOwnedAssets({
    owner,
  }: GetPreviouslyOwnedAssetsOptions): Promise<Asset[]> {
    return this._cacheClient.getPreviouslyOwnedAssets(owner);
  }

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
  async getAssetHistory({
    id,
    ...query
  }: GetAssetHistoryOptions): Promise<AssetHistory[]> {
    return this._cacheClient.getAssetHistory(id, { ...query });
  }

  /**
   * Create a transaction request to offer an asset to a given DID.
   *
   * @param {OfferAssetTxOptions} options object containing options
   * @returns transaction request
   */
  private offerAssetTx({
    offerTo,
    assetContractAddress,
  }: OfferAssetTxOptions): providers.TransactionRequest {
    return {
      data: this._assetInterface.encodeFunctionData('offer', [offerTo]),
      to: assetContractAddress,
    };
  }

  /**
   * Create a transaction request to accept an asset offer.
   *
   * @param {AcceptOfferTxOptions} options object containing options
   * @returns transaction request
   */
  private acceptOfferTx({
    assetContractAddress,
  }: AcceptOfferTxOptions): providers.TransactionRequest {
    return {
      data: this._assetInterface.encodeFunctionData('acceptOffer'),
      to: assetContractAddress,
    };
  }

  /**
   * Create a transaction request to reject an asset offer.
   *
   * @param {RejectOfferTxOptions} options object containing options
   * @returns transaction request
   */
  private rejectOfferTx({
    assetContractAddress,
  }: RejectOfferTxOptions): providers.TransactionRequest {
    return {
      data: this._assetInterface.encodeFunctionData('rejectOffer'),
      to: assetContractAddress,
    };
  }

  /**
   * Create a transaction request to cancel an asset offer.
   *
   * @param {CancelOfferTxOptions} options object containing options
   * @returns transaction request
   */
  private cancelOfferTx({
    assetContractAddress,
  }: CancelOfferTxOptions): providers.TransactionRequest {
    return {
      data: this._assetInterface.encodeFunctionData('cancelOffer'),
      to: assetContractAddress,
    };
  }
}
