import {
  CredentialSubject,
  PresentationDefinition,
  VerifiableCredential,
} from '@ew-did-registry/credentials-interface';
import { SelectResults } from '@sphereon/pex';
import { AxiosInstance } from 'axios';
import { CacheClient } from '../cache-client';
import { CID } from 'multiformats/cid';
import * as json from 'multiformats/codecs/json';
import { sha256 } from 'multiformats/hashes/sha2';
import { v4 } from 'uuid';
import {
  WebNodeRequestObject,
  WebNodeResponseObject,
  StoreVcResult,
  WebNodeWriteMessage,
} from './types';

export default class VCStorageClient {
  private _http: AxiosInstance;

  constructor(cacheClient: CacheClient) {
    this._http = cacheClient.http;
  }

  async getCredentialsByPresentationDefinition(
    definition: PresentationDefinition
  ): Promise<SelectResults> {
    const { data } = await this._http.post<SelectResults>(
      `/vp/match`,
      definition
    );

    return data;
  }

  async storeCredentials(
    credentials: VerifiableCredential<CredentialSubject>[]
  ): Promise<StoreVcResult[]> {
    const extractId = (credential: VerifiableCredential<CredentialSubject>) => {
      const isUuid = credential.id.search('urn:uuid:') > -1;
      if (isUuid) {
        return credential.id.split('urn:uuid:').pop() || v4();
      }
      return v4();
    };

    const messages = await Promise.all(
      credentials.map(async (credential) => {
        const data = Buffer.from(JSON.stringify(credential), 'utf8').toString(
          'base64'
        );

        const message: WebNodeWriteMessage = {
          data,
          descriptor: {
            method: 'CollectionsWrite',
            objectId: extractId(credential),
            schema: 'https://www.w3.org/2018/credentials#VerifiableCredential',
            dateCreated: new Date(credential.issuanceDate).getTime(),
            datePublished: Date.now(),
            dataFormat: 'application/ld+json',
            cid: await this.generateCid(credential),
          },
        };

        return message;
      })
    );

    const request: WebNodeRequestObject = {
      requestId: v4(),
      target: 'vp',
      messages,
    };

    const { data: response } = await this._http.post<
      WebNodeResponseObject<[WebNodeWriteMessage]>
    >(`/`, request, {
      baseURL: 'webnode',
    });

    if (response?.status?.code && response.status.code >= 400) {
      throw new Error(response.status.message || 'Unknown error');
    }

    if (!response?.replies) {
      throw new Error('No replies in response');
    }

    return response?.replies.map((reply) => {
      if (reply?.status?.code && reply.status.code >= 400) {
        throw new Error(reply.status.message || 'Unknown error');
      }

      return {
        vcId:
          reply.entries?.[0].descriptor.objectId ||
          'Unknown verifiable credential id',
        status:
          reply.status?.code && reply.status.code <= 300 ? 'OK' : 'FAILED',
      };
    });
  }

  private async generateCid(data: Record<string, unknown>) {
    const bytes = json.encode(data);
    const hash = await sha256.digest(bytes);
    const cid = CID.create(1, json.code, hash);
    return cid.toString();
  }
}
