import { Wallet } from 'ethers';
import { v4 } from 'uuid';
import { replenish, rpcUrl, setupENS } from './utils/setup_contracts';
import { CacheClient, fromPrivateKey } from '../src';
import {
  getVerifiableCredentialsService,
  IssuerFields,
  VerifiableCredentialsServiceBase,
  WebNodeResponseObject,
  WebNodeWriteMessage,
} from '../src/modules/verifiable-credentials';
import VCStorageClient from '../src/modules/verifiable-credentials/storage-client';

describe('Verifiable credentials storage', () => {
  let verifiableCredentialsService: VerifiableCredentialsServiceBase;
  let rootOwnerDid: string;
  const axiosPostMock = jest.fn();
  const axiosGetMock = jest.fn();
  const rootOwnerWallet = Wallet.createRandom();
  const rootOwnerAddress = rootOwnerWallet.address;

  const namespace = 'test.iam.ewc';
  const createExampleSignedCredential = async (
    issuerFields: IssuerFields[]
  ) => {
    return await verifiableCredentialsService.createRoleVC({
      id: rootOwnerDid,
      namespace,
      version: '1',
      issuerFields,
    });
  };

  beforeAll(async () => {
    await replenish(rootOwnerAddress);
    await setupENS(rootOwnerAddress);
    const signerService = await fromPrivateKey(
      rootOwnerWallet.privateKey,
      rpcUrl
    );
    await signerService.publicKeyAndIdentityToken();
    rootOwnerDid = signerService.didHex;

    const storage = new VCStorageClient({} as CacheClient, signerService);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    storage['_http'] = {
      post: axiosPostMock,
      get: axiosGetMock,
    };
    verifiableCredentialsService = await getVerifiableCredentialsService(
      signerService,
      storage
    );
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('store credentials', () => {
    test('should store a credential', async () => {
      axiosPostMock.mockImplementationOnce(async (_, data) => {
        const result: WebNodeResponseObject<WebNodeWriteMessage[]> = {
          requestId: v4(),
          replies: (
            data as { messages: Array<WebNodeWriteMessage> }
          ).messages.map((message) => {
            return {
              messageId: v4(),
              status: {
                code: 200,
                message: 'OK',
              },
              entries: [message],
            };
          }),
        };
        return Promise.resolve({ data: result });
      });

      const vc1 = await createExampleSignedCredential([]);
      const vc2 = await createExampleSignedCredential([]);
      vc2.id = `id:${vc2.id}`; // id:urn:uuid:...
      const vc3 = await createExampleSignedCredential([]);
      vc3.id = vc3.id.split('urn:uuid:')[1];

      const result = await verifiableCredentialsService.storeCredential([
        vc1,
        vc2,
        vc3,
      ]);

      [vc1, vc2].forEach((vc) => {
        expect(result.find((r) => vc.id.includes(r.vcId))).toEqual({
          vcId: expect.any(String),
          status: 'OK',
        });
      });

      expect(result).toHaveLength(3);
      expect(result.every((r) => r.status === 'OK')).toBeTruthy();
    });

    test('should result with failed status when status code in entry is not in range 200-300', async () => {
      axiosPostMock.mockImplementationOnce(async (_, data) => {
        const result: WebNodeResponseObject<WebNodeWriteMessage[]> = {
          requestId: v4(),
          replies: (
            data as { messages: Array<WebNodeWriteMessage> }
          ).messages.map((message) => {
            return {
              messageId: v4(),
              status: {
                code: 401,
                message: 'Error',
              },
              entries: [message],
            };
          }),
        };
        return Promise.resolve({ data: result });
      });

      const vc1 = await createExampleSignedCredential([]);

      const result = await verifiableCredentialsService.storeCredential([vc1]);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        vcId: expect.stringContaining(vc1.id.split('urn:uuid:')[1]),
        status: 'FAILED',
      });
    });

    test('should throw an error when request status code is not in range 200-300', async () => {
      axiosPostMock.mockImplementationOnce(async () => {
        const result: WebNodeResponseObject<WebNodeWriteMessage[]> = {
          requestId: v4(),
          status: {
            code: 401,
            message: 'Error',
          },
        };
        return Promise.resolve({ data: result });
      });

      expect(verifiableCredentialsService.storeCredential([])).rejects.toThrow(
        'Error'
      );
    });

    test('should throw an error when replies is not presented for valid request', async () => {
      axiosPostMock.mockImplementationOnce(async () => {
        const result: WebNodeResponseObject<WebNodeWriteMessage[]> = {
          requestId: v4(),
        };
        return Promise.resolve({ data: result });
      });

      expect(verifiableCredentialsService.storeCredential([])).rejects.toThrow(
        'No replies in response'
      );
    });
  });
});
