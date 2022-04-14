import {
  PresentationDefinition,
  VerifiableCredential,
  CredentialSubject,
} from '@ew-did-registry/credentials-interface';
import { AxiosInstance } from 'axios';
import { CacheClient } from '../cacheClient';

export default class VCStorageClient {
  private _http: AxiosInstance;

  constructor(cacheClient: CacheClient) {
    this._http = cacheClient.http;
  }

  async getCredentialsByPresentationDefinition(
    definition: PresentationDefinition
  ): Promise<VerifiableCredential<CredentialSubject>[]> {
    const { data } = await this._http.post<
      VerifiableCredential<CredentialSubject>[]
    >(`/vp/match`, definition);

    return data;
  }
}
