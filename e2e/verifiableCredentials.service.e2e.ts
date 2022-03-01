import { Wallet } from 'ethers';
import { v4 as uuid } from 'uuid';
import { invalidExampleExternalVC, validExampleExternalVC } from './fixtures';
import { replenish, rpcUrl, setupENS } from './utils/setup_contracts';
import { fromPrivateKey } from '../src';
import {
  getVerifiableCredentialsService,
  VerifiableCredentialsServiceBase,
} from '../src/modules/verifiableCredentials';

describe('Verifiable credentials tests', () => {
  let verifiableCredentialsService: VerifiableCredentialsServiceBase;
  let rootOwnerDid: string;
  const rootOwnerWallet = Wallet.createRandom();
  const rootOwnerAddress = rootOwnerWallet.address;

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

  test('should create a VC proof', async () => {
    const credential = {
      '@context': [
        'https://www.w3.org/2018/credentials/v1',
        'https://tzprofiles.com/2021/ethereum-address-control-v1.jsonld',
      ],
      id: 'urn:uuid:' + uuid(),
      issuer: rootOwnerDid,
      issuanceDate: new Date().toISOString(),
      type: ['VerifiableCredential', 'EthereumAddressControl'],
      credentialSubject: {
        address: rootOwnerAddress,
        sameAs: rootOwnerDid,
      },
    };

    const vc = await verifiableCredentialsService.signVerifiableCredential(
      credential
    );

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
    const credential = {
      '@context': [
        'https://www.w3.org/2018/credentials/v1',
        'https://tzprofiles.com/2021/ethereum-address-control-v1.jsonld',
      ],
      id: 'urn:uuid:' + uuid(),
      issuer: rootOwnerDid,
      issuanceDate: new Date().toISOString(),
      type: ['VerifiableCredential', 'EthereumAddressControl'],
      credentialSubject: {
        address: rootOwnerAddress,
        sameAs: rootOwnerDid,
      },
    };

    const vc = await verifiableCredentialsService.signVerifiableCredential(
      credential
    );

    expect(vc).toBeDefined();

    await verifiableCredentialsService.verifyVerifiableCredential(vc);
  });

  test('should throw an error for invalid VC during verification', async () => {
    const credential = {
      '@context': [
        'https://www.w3.org/2018/credentials/v1',
        'https://tzprofiles.com/2021/ethereum-address-control-v1.jsonld',
      ],
      id: 'urn:uuid:' + uuid(),
      issuer: rootOwnerDid,
      issuanceDate: new Date().toISOString(),
      type: ['VerifiableCredential', 'EthereumAddressControl'],
      credentialSubject: {
        address: rootOwnerAddress,
        sameAs: rootOwnerDid,
      },
    };

    const vc = await verifiableCredentialsService.signVerifiableCredential(
      credential
    );

    vc.id = 'urn:uuid:' + uuid();

    expect(vc).toBeDefined();

    await expect(
      verifiableCredentialsService.verifyVerifiableCredential(vc)
    ).rejects.toMatchObject({
      message: expect.stringContaining('Verifiable Credential is invalid'),
    });
  });

  test('should verify valid external VC', async () => {
    const isValid =
      await verifiableCredentialsService.verifyVerifiableCredential(
        validExampleExternalVC
      );

    expect(isValid).toBe(true);
  });

  test('should throw an error for invalid external VC', async () => {
    await expect(
      verifiableCredentialsService.verifyVerifiableCredential(
        invalidExampleExternalVC
      )
    ).rejects.toMatchObject({
      message: expect.stringContaining('Verifiable Credential is invalid'),
    });
  });
});
