import { Wallet, utils } from 'ethers';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import {
  exampleExternalVCWithInvalidSubjectId,
  validExampleExternalVC,
  bloxmoveVpRequest,
  customerRoleClaim,
  presentationDefinition,
  selectResults,
  claimsBySubject,
} from './fixtures';
import { replenish, rpcUrl, setupENS } from './utils/setup-contracts';
import { CacheClient, fromPrivateKey } from '../src';
import {
  getVerifiableCredentialsService,
  IssuerFields,
  RoleCredentialSubject,
  VerifiableCredentialsServiceBase,
} from '../src/modules/verifiable-credentials';
import {
  VC_API_EXCHANGE,
  VerifiableCredential,
  VpRequest,
  VpRequestInteractServiceType,
  VpRequestQueryType,
  Credential,
  CredentialStatusPurpose,
  StatusListEntryType,
} from '@ew-did-registry/credentials-interface';
import { IPresentationDefinition } from '@sphereon/pex';

const { id } = utils;

jest.mock('axios');
const getClaimsBySubject = jest.fn();
jest.mock('../src/modules/cache-client/cache-client.service', () => {
  return {
    CacheClient: jest.fn().mockImplementation(() => {
      return {
        getClaimsBySubject,
        addStatusToCredential: (
          credential: Credential<RoleCredentialSubject>
        ): Credential<RoleCredentialSubject> => {
          return {
            ...credential,
            credentialStatus: {
              id: `https://energyweb.org/credential/${id(
                JSON.stringify(credential)
              )}#list`,
              type: StatusListEntryType.Entry2021,
              statusPurpose: CredentialStatusPurpose.REVOCATION,
              statusListIndex: '1',
              statusListCredential: `https://identitycache.org/v1/status-list/${credential.id}`,
            },
          };
        },
      };
    }),
  };
});

describe('Verifiable credentials tests', () => {
  let verifiableCredentialsService: VerifiableCredentialsServiceBase;
  let rootOwnerDid: string;
  const rootOwnerWallet = Wallet.createRandom();
  const rootOwnerAddress = rootOwnerWallet.address;

  const namespace = 'test.iam.ewc';
  const createExampleSignedCredential = async (
    issuerFields: IssuerFields[],
    expirationDate?: Date
  ) => {
    return await verifiableCredentialsService.createRoleVC({
      id: rootOwnerDid,
      namespace,
      version: '1',
      issuerFields,
      expirationDate,
    });
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    await replenish(rootOwnerAddress);
    await setupENS(rootOwnerAddress);
    const signerService = await fromPrivateKey(
      rootOwnerWallet.privateKey,
      rpcUrl
    );
    await signerService.publicKeyAndIdentityToken();
    rootOwnerDid = signerService.didHex;

    const cacheClient = new CacheClient(signerService);
    verifiableCredentialsService = await getVerifiableCredentialsService(
      signerService,
      cacheClient
    );
  });

  describe('Verifiable credentials', () => {
    test('should create a VC proof', async () => {
      const vc = await createExampleSignedCredential([]);

      expect(vc).toBeDefined();
      expect(vc.proof).toStrictEqual(
        expect.objectContaining({
          '@context': 'https://w3id.org/security/suites/eip712sig-2021/v1',
          type: 'EthereumEip712Signature2021',
          proofPurpose: 'assertionMethod',
          proofValue: expect.any(String),
          verificationMethod: `${rootOwnerDid}#controller`,
          created: expect.any(String),
          eip712Domain: expect.anything(),
        })
      );
    });

    test('should verify a valid VC', async () => {
      const vc = await createExampleSignedCredential([]);

      expect(vc).toBeDefined();

      const result = await verifiableCredentialsService.verify(vc);
      expect(result).toBe(true);
    });

    test('should create a VC proof with issuer fields', async () => {
      const issuerFields = [{ key: 'foo', value: 'bar' }];
      const vc = await createExampleSignedCredential(issuerFields);

      expect(vc).toBeDefined();

      expect(vc.credentialSubject.issuerFields).toBeDefined();
      expect(vc.credentialSubject.issuerFields).toStrictEqual(issuerFields);
      expect(vc.proof).toStrictEqual(
        expect.objectContaining({
          '@context': 'https://w3id.org/security/suites/eip712sig-2021/v1',
          type: 'EthereumEip712Signature2021',
          proofPurpose: 'assertionMethod',
          proofValue: expect.any(String),
          verificationMethod: `${rootOwnerDid}#controller`,
          created: expect.any(String),
          eip712Domain: expect.anything(),
        })
      );
    });

    test('should verify a valid VC with issuer fields', async () => {
      const vc = await createExampleSignedCredential([
        { key: 'foo', value: 'bar' },
      ]);

      expect(vc).toBeDefined();

      const result = await verifiableCredentialsService.verify(vc);
      expect(result).toBe(true);
    });

    test('should throw an error for invalid VC during verification', async () => {
      const vc = await createExampleSignedCredential([]);

      vc.id = 'urn:uuid:' + uuid();

      expect(vc).toBeDefined();

      await expect(
        verifiableCredentialsService.verify(vc)
      ).rejects.toMatchObject({
        message: expect.stringContaining(
          'Verifiable Credential or Presentation is invalid'
        ),
      });
    });

    test('should verify valid external VC', async () => {
      const isValid = await verifiableCredentialsService.verify(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        validExampleExternalVC as any
      );

      expect(isValid).toBe(true);
    });

    test('should throw an error for invalid external VC', async () => {
      await expect(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        verifiableCredentialsService.verify(
          exampleExternalVCWithInvalidSubjectId as never
        )
      ).rejects.toMatchObject({
        message: expect.stringContaining(
          'Verifiable Credential or Presentation is invalid'
        ),
      });
    });

    test('should throw an error when credential is expired', async () => {
      const vc = await createExampleSignedCredential(
        [],
        new Date(Date.now() - 10000)
      );

      await expect(
        verifiableCredentialsService.verify(vc)
      ).rejects.toMatchObject({
        message: expect.stringContaining('Verifiable Credential is expired'),
      });
    });

    test('should not throw an error when credential is not expired', async () => {
      const vc = await createExampleSignedCredential(
        [],
        new Date(Date.now() + 10000)
      );

      await expect(
        verifiableCredentialsService.verify(vc)
      ).resolves.toBeTruthy();
    });
  });

  describe('Verifiable presentations', () => {
    test('should create a unsigned VP', async () => {
      const vc = await createExampleSignedCredential([]);

      const vp = verifiableCredentialsService.createPresentation([vc]);

      expect(vp).toBeDefined();
      expect(vp['proof']).toBeUndefined();
      expect(vp.verifiableCredential).toStrictEqual([vc]);
    });

    test('should create a unsigned VP with credential with expiration', async () => {
      const vc1 = await createExampleSignedCredential([]);
      const vc2 = await createExampleSignedCredential(
        [],
        new Date(Date.now() + 10000)
      );

      const vp = verifiableCredentialsService.createPresentation([vc1, vc2]);

      expect(vp).toBeDefined();
      expect(vp['proof']).toBeUndefined();
      expect(vp.verifiableCredential).toStrictEqual([vc1, vc2]);
    });

    test('should create a VP proof', async () => {
      const vc = await createExampleSignedCredential([]);

      const vp =
        await verifiableCredentialsService.createVerifiablePresentation([vc]);

      expect(vp).toBeDefined();
      expect(vp.proof).toEqual(
        expect.objectContaining({
          '@context': 'https://w3id.org/security/suites/eip712sig-2021/v1',
          type: 'EthereumEip712Signature2021',
          proofPurpose: 'authentication',
          proofValue: expect.any(String),
          verificationMethod: `${rootOwnerDid}#controller`,
          created: expect.any(String),
          eip712Domain: expect.any(Object),
        })
      );
    });

    test('should create a VP proof with credential with expiration', async () => {
      const vc = await createExampleSignedCredential(
        [],
        new Date(Date.now() + 10000)
      );

      const vp =
        await verifiableCredentialsService.createVerifiablePresentation([vc]);

      expect(vp).toBeDefined();
      expect(vp.proof).toEqual(
        expect.objectContaining({
          '@context': 'https://w3id.org/security/suites/eip712sig-2021/v1',
          type: 'EthereumEip712Signature2021',
          proofPurpose: 'authentication',
          proofValue: expect.any(String),
          verificationMethod: `${rootOwnerDid}#controller`,
          created: expect.any(String),
          eip712Domain: expect.any(Object),
        })
      );
    });

    test('should throw an error during creation when a VP has mixed VC and VC with expiration time', async () => {
      const vc1 = await createExampleSignedCredential([]);
      const vc2 = await createExampleSignedCredential(
        [],
        new Date(Date.now() + 10000)
      );

      await expect(
        verifiableCredentialsService.createVerifiablePresentation([vc1, vc2])
      ).rejects.toMatchObject({
        message: expect.stringContaining(
          'Expected all Verifiable Credential to have expiration date'
        ),
      });
    });

    test('should verify a valid VP', async () => {
      const vc = await createExampleSignedCredential([]);
      const vp =
        await verifiableCredentialsService.createVerifiablePresentation([vc]);

      await verifiableCredentialsService.verify(vp);
    });

    test('should verify a valid VP with not expired VC', async () => {
      const vc = await createExampleSignedCredential(
        [],
        new Date(Date.now() + 10000)
      );
      const vp =
        await verifiableCredentialsService.createVerifiablePresentation([vc]);

      await verifiableCredentialsService.verify(vp);
    });

    test('should verify a valid VP with issuer fields', async () => {
      const vc = await createExampleSignedCredential([
        { key: 'foo', value: 'bar' },
      ]);
      const vp =
        await verifiableCredentialsService.createVerifiablePresentation([vc]);

      await verifiableCredentialsService.verify(vp);
    });

    test('should verify a valid VP without verifiable credentials', async () => {
      const vp =
        await verifiableCredentialsService.createVerifiablePresentation([]);
      await verifiableCredentialsService.verify(vp);
    });

    test('should throw an error when one of the VC is invalid', async () => {
      const vc = await createExampleSignedCredential([
        { key: 'foo', value: 'bar' },
      ]);

      vc.id = 'urn:uuid:' + uuid();

      expect(vc).toBeDefined();

      const vp =
        await verifiableCredentialsService.createVerifiablePresentation([vc]);

      await expect(
        verifiableCredentialsService.verify(vp)
      ).rejects.toMatchObject({
        message: expect.stringContaining(
          'Verifiable Credential or Presentation is invalid'
        ),
      });
    });
  });

  describe('Verifiable credentials exchange', () => {
    const vpRequest: VpRequest = {
      query: [
        {
          type: VpRequestQueryType.presentationDefinition,
          credentialQuery: [
            {
              presentationDefinition: {
                id: '286bc1e0-f1bd-488a-a873-8d71be3c690e',
                input_descriptors: [
                  {
                    id: '<DESCRIPTOR ID>',
                    name: 'Descriptor name',
                    purpose: 'Descriptor purpose',
                    constraints: {
                      fields: [
                        {
                          path: ['$.credentialSubject.role.namespace'],
                          filter: {
                            type: 'string',
                            const: namespace,
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        },
      ],
      interact: {
        service: [
          {
            serviceEndpoint: '',
            type: VpRequestInteractServiceType.unmediatedPresentation,
          },
        ],
      },
      challenge: '',
    };
    const exchangeUrl = 'http://vc-api/exchanges/exchangeId';
    let requiredCredentials: VerifiableCredential<RoleCredentialSubject>;
    const issuedPresentation = jest.fn();

    beforeEach(async () => {
      requiredCredentials = await createExampleSignedCredential([]);
      const vp =
        await verifiableCredentialsService.createVerifiablePresentation([
          requiredCredentials,
        ]);
      (axios as jest.Mocked<typeof axios>).post.mockImplementation((url) => {
        return Promise.resolve({
          data: url === exchangeUrl ? { errors: [], vpRequest } : '',
        });
      });
      getClaimsBySubject.mockResolvedValue([{ vp }]);
    });
    test('getCredentialsByDefinition() should return matching select results from Sphereon library', async () => {
      getClaimsBySubject.mockResolvedValue(claimsBySubject);
      const result =
        await verifiableCredentialsService.getCredentialsByDefinition(
          presentationDefinition as IPresentationDefinition
        );
      expect(result).toEqual(selectResults);
    });

    test('initiateExchange() should return presentation matching presentation request', async () => {
      const {
        selections: [{ selectResults }],
      } = await verifiableCredentialsService.initiateExchange({
        type: VC_API_EXCHANGE,
        url: exchangeUrl,
      });
      expect(selectResults.verifiableCredential).toHaveLength(1);
    });
    test('initiateExchange() should filter self-sign data input_descriptors before fetching credentials and selecting matches', async () => {
      /*
       * For rationale for this behaviour, see the comment on `verifiable-credentials-base.filterSelfSignDescriptors()`
       */
      const vpRequest: VpRequest = bloxmoveVpRequest as VpRequest;
      (axios as jest.Mocked<typeof axios>).post.mockImplementation(() => {
        return Promise.resolve({
          data: { errors: [], vpRequest },
        });
      });
      getClaimsBySubject.mockResolvedValue(customerRoleClaim);
      const getCredentialsByDefinitionSpy = jest.spyOn(
        verifiableCredentialsService,
        'getCredentialsByDefinition'
      );
      const {
        selections: [{ selectResults }],
      } = await verifiableCredentialsService.initiateExchange({
        type: VC_API_EXCHANGE,
        url: exchangeUrl,
      });
      expect(getCredentialsByDefinitionSpy).toHaveBeenCalledWith({
        id: 'did:ethr:blxm-dev:0xE8538b4D84816Cc38D5CB4379e6b4fDf81d52d2a',
        input_descriptors: [
          {
            id: 'energy_supplier_customer_contract',
            name: 'Energy Supplier Customer Contract',
            purpose:
              'An energy supplier contract is needed for Rebeam authorization',
            constraints: {
              fields: [
                {
                  path: ['$.credentialSubject.role.namespace'],
                  filter: {
                    type: 'string',
                    const: 'customer.roles.rebeam.apps.eliagroup.iam.ewc',
                  },
                },
              ],
            },
          },
        ],
      });
      expect(selectResults.matches).toHaveLength(1);
    });
    test('continueExchange() should return issued credentials', async () => {
      const {
        selections: [{ selectResults }],
      } = await verifiableCredentialsService.initiateExchange({
        type: VC_API_EXCHANGE,
        url: exchangeUrl,
      });

      (axios as jest.Mocked<typeof axios>).put.mockImplementationOnce((url) =>
        Promise.resolve({
          data:
            url === vpRequest.interact.service[0].serviceEndpoint
              ? { errors: [], vp: issuedPresentation, vpRequest: undefined }
              : null,
        })
      );

      expect(
        await verifiableCredentialsService.continueExchange({
          vpRequest,
          credentials:
            selectResults.verifiableCredential as VerifiableCredential<RoleCredentialSubject>[],
        })
      ).toEqual(issuedPresentation);
    });
  });
});