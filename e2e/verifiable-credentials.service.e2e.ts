import { Wallet } from 'ethers';
import { v4 as uuid } from 'uuid';
import { invalidExampleExternalVC, validExampleExternalVC } from './fixtures';
import { replenish, rpcUrl, setupENS } from './utils/setup_contracts';
import { fromPrivateKey } from '../src';
import {
  getVerifiableCredentialsService,
  IssuerFields,
  VerifiableCredentialsServiceBase,
} from '../src/modules/verifiable-credentials';

describe('Verifiable credentials tests', () => {
  let verifiableCredentialsService: VerifiableCredentialsServiceBase;
  let rootOwnerDid: string;
  const rootOwnerWallet = Wallet.createRandom();
  const rootOwnerAddress = rootOwnerWallet.address;

  const createExampleSignedCredential = async (
    issuerFields: IssuerFields[]
  ) => {
    return await verifiableCredentialsService.createVerifiableCredential({
      subject: rootOwnerDid,
      namespace: 'test.iam.ewc',
      version: '1',
      issuerFields,
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
    verifiableCredentialsService = await getVerifiableCredentialsService(
      signerService
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
        verifiableCredentialsService.verify(invalidExampleExternalVC as any)
      ).rejects.toMatchObject({
        message: expect.stringContaining(
          'Verifiable Credential or Presentation is invalid'
        ),
      });
    });
  });

  describe('Verifiable presentations', () => {
    test('should create a unsigned VP', async () => {
      const vc = await createExampleSignedCredential([]);

      const vp = await verifiableCredentialsService.createPresentation([vc]);

      expect(vp).toBeDefined();
      expect(vp['proof']).toBeUndefined();
      expect(vp.verifiableCredential).toStrictEqual([vc]);
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

    test('should verify a valid VP', async () => {
      const vc = await createExampleSignedCredential([]);
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
});
