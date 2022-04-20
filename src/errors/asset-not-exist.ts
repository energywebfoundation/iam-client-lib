export class AssetNotExist extends Error {
  constructor(assetId: string) {
    super(`Asset ${assetId} doesn not exist`);
  }
}
