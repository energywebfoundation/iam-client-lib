import {
  PresentationDefinition,
  VerifiableCredential,
  CredentialSubject,
} from '@ew-did-registry/credentials-interface';
import { AxiosInstance } from 'axios';
import { CID } from 'multiformats/cid';
import * as json from 'multiformats/codecs/json';
import { sha256 } from 'multiformats/hashes/sha2';
import { v4 } from 'uuid';
import { CacheClient } from '../cacheClient';
import { SignerService } from '../signer';
import {
  WebNodeRequestObject,
  WebNodeResponseObject,
  StoreVcResult,
  WebNodeWriteMessage,
  WebNodeQueryMessage,
  WebNodeReply,
} from './types';

export default class VCStorageClient {
  private readonly _http: AxiosInstance;
  private readonly _signerService: SignerService;

  constructor(cacheClient: CacheClient, signerService: SignerService) {
    this._http = cacheClient.http;
    this._signerService = signerService;
  }

  async getCredentialsByPresentationDefinition(
    definition: PresentationDefinition
  ): Promise<VerifiableCredential<CredentialSubject>[]> {
    const { data } = await this._http.post<
      VerifiableCredential<CredentialSubject>[]
    >(`/vp/match`, definition);

    return data;
  }

  async getAllCredentials(): Promise<
    VerifiableCredential<CredentialSubject>[]
  > {
    const queryMessage: WebNodeQueryMessage = {
      descriptor: {
        method: 'CollectionsQuery',
        schema: 'https://www.w3.org/2018/credentials#VerifiableCredential',
        dataFormat: 'application/ld+json',
      },
    };
    const request: WebNodeRequestObject = {
      requestId: v4(),
      target: this._signerService.did,
      messages: [queryMessage],
    };

    const response = await this.makeWebNodeRequest<WebNodeWriteMessage[]>(
      request
    );

    const filterOutEmptyValues = (
      value?: VerifiableCredential<CredentialSubject>
    ): value is VerifiableCredential<CredentialSubject> => {
      return Boolean(value);
    };

    return (
      response.replies[0].entries
        ?.map((entry) => {
          const data = entry.data;
          if (!data) {
            return undefined;
          }

          return JSON.parse(
            Buffer.from(data, 'base64').toString('utf8')
          ) as VerifiableCredential<CredentialSubject>;
        })
        .filter(filterOutEmptyValues) || []
    );
  }

  async store(
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
      target: this._signerService.did,
      messages,
    };

    const response = await this.makeWebNodeRequest<WebNodeWriteMessage[]>(
      request
    );

    return response?.replies.map((reply) => {
      return {
        vcId:
          reply.entries?.[0].descriptor.objectId ||
          'Unknown verifiable credential id',
        status:
          reply.status?.code && reply.status.code <= 300 ? 'OK' : 'FAILED',
      };
    });
  }

  private async makeWebNodeRequest<T = WebNodeWriteMessage[]>(
    request: WebNodeRequestObject
  ) {
    const { data: response } = await this._http.post<WebNodeResponseObject<T>>(
      `/webnode`,
      request
    );

    if (response?.status?.code && response.status.code >= 400) {
      throw new Error(response.status.message || 'Unknown error');
    }

    if (!response?.replies) {
      throw new Error('No replies in response');
    }

    return response as WebNodeResponseObject<T> & {
      replies: WebNodeReply<T>[];
    };
  }

  private async generateCid(data: Record<string, unknown>) {
    const bytes = json.encode(data);
    const hash = await sha256.digest(bytes);
    const cid = CID.create(1, json.code, hash);
    return cid.toString();
  }
}
