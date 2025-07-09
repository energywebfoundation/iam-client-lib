import { IDidStore } from "@ew-did-registry/did-store-interface";
import { CacheClient } from '../cache-client/cache-client.service';
import { DidStoreType } from "./did.types";

export class DidStoreProxy implements IDidStore {

  constructor(private type: DidStoreType, private _cacheClient: CacheClient) {
  }

  async save(claim: string): Promise<string> {
    return this._cacheClient.addStoreClaim(claim, this.type);
  }

  async get(uri: string): Promise<string> {
    return this._cacheClient.getStoreClaim(uri);
  }

  async delete(uri: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}