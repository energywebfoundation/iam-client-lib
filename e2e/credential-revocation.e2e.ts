import { providers, Wallet } from 'ethers';
import {
  CredentialStatusPurpose,
  Credential,
  VerifiablePresentation,
  VerifiableCredential,
  StatusListEntryType,
} from '@ew-did-registry/credentials-interface';
import {
  initWithPrivateKeySigner,
  ProviderType,
  RegistrationTypes,
  SignerService,
  MessagingService,
  IClaimIssuance,
  DomainsService,
  CacheClient,
  IIssuerDefinition,
  IRevokerDefinition,
  RoleCredentialSubject,
} from '../src';
import { replenish, root, rpcUrl, setupENS } from './utils/setup-contracts';
import { setLogger } from '../src/config/logger.config';
import { ConsoleLogger } from '../src/utils/logger';
import { STATUS_LIST_CREDENTIAL } from './fixtures';

const provider = new providers.JsonRpcProvider(rpcUrl);

const mockGetRoleDefinition = jest.fn();
const mockRequestClaim = jest.fn();
const mockIssueClaim = jest.fn();
const mockGetAllowedRoles = jest.fn();
const mockGetClaimById = jest.fn();
const mockInitiateCredentialStatusUpdate = jest.fn();
const mockGetStatusListCredential = jest.fn();

jest.mock('../src/modules/cache-client/cache-client.service', () => {
  return {
    CacheClient: jest.fn().mockImplementation(() => {
      return {
        getRoleDefinition: mockGetRoleDefinition,
        init: jest.fn(),
        login: jest.fn(),
        requestClaim: mockRequestClaim,
        issueClaim: mockIssueClaim,
        getAllowedRolesByIssuer: mockGetAllowedRoles,
        getClaimById: mockGetClaimById,
        getStatusListCredential: mockGetStatusListCredential,
        initiateCredentialStatusUpdate: mockInitiateCredentialStatusUpdate,
        persistCredentialStatusUpdate: (credential: unknown) => credential,
        addStatusToCredential: (
          credential: Credential<RoleCredentialSubject>
        ): Credential<RoleCredentialSubject> => {
          return {
            ...credential,
            credentialStatus: {
              id: `https://identitycache.org/v1/status-list/${credential.id}`,
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

MessagingService.create = (signerService: SignerService) =>
  Promise.resolve(new MessagingService(signerService));
jest.mock('../src/modules/messaging/messaging.service', () => {
  return {
    MessagingService: jest.fn().mockImplementation(() => {
      return { publish: jest.fn() };
    }),
  };
});

describe('Off-chain credential revocation', () => {
  const rootOwner = Wallet.createRandom().connect(provider);

  const initUser = async () => {
    const user = Wallet.createRandom().connect(provider);
    await replenish(user.address);

    const { signerService, messagingService, connectToCacheServer } =
      await initWithPrivateKeySigner(user.privateKey, rpcUrl);
    const {
      connectToDidRegistry,
      domainsService,
      assetsService,
      verifiableCredentialsService,
    } = await connectToCacheServer();
    const { didRegistry, claimsService } = await connectToDidRegistry();

    await signerService.publicKeyAndIdentityToken();

    return {
      user,
      signerService,
      messagingService,
      didRegistry,
      claimsService,
      domainsService,
      assetsService,
      verifiableCredentialsService,
    };
  };

  type User = Awaited<ReturnType<typeof initUser>>;

  const createRole = async (
    roleName: string,
    issuer: IIssuerDefinition,
    revoker: IRevokerDefinition
  ) => {
    await replenish(rootOwner.address);
    const signerService = new SignerService(rootOwner, ProviderType.PrivateKey);
    await signerService.connect(rootOwner, ProviderType.PrivateKey);
    const domainsService = new DomainsService(
      signerService,
      {} as unknown as CacheClient
    );
    await domainsService.init();

    const data = {
      roleName,
      roleType: 'org',
      issuerFields: [],
      enrolmentPreconditions: [],
      issuer,
      version: 1,
      metadata: {},
      revoker,
    };

    await domainsService.createRole({
      roleName: roleName,
      namespace: root,
      data,
      returnSteps: false,
    });

    return { roleDefinition: data };
  };

  const enrolAndIssue = async (
    issuer: User,
    subject: User,
    claimType: string
  ) => {
    mockGetAllowedRoles.mockResolvedValueOnce([{ namespace: claimType }]);
    await subject.claimsService.createClaimRequest({
      claim: { claimType, claimTypeVersion: 1 },
      registrationTypes: [
        RegistrationTypes.OnChain,
        RegistrationTypes.OffChain,
      ],
      subject: subject.signerService.did,
    });
    const [message] = mockRequestClaim.mock.calls.pop();

    await issuer.claimsService.issueClaimRequest({
      publishOnChain: true,
      ...message,
    });

    const { 1: issuedClaim } = <[string, Required<IClaimIssuance>]>(
      mockIssueClaim.mock.calls.pop()
    );

    expect(issuedClaim).toBeDefined();

    return {
      ...issuedClaim,
      subject: subject.signerService.did,
      namespace: claimType,
      claimType,
    };
  };

  const extractCredential = (
    claim: IClaimIssuance
  ): VerifiableCredential<RoleCredentialSubject> => {
    const { vp } = claim;
    expect(vp).toBeDefined();

    const presentation = JSON.parse(vp || '') as VerifiablePresentation;
    expect(presentation).toBeDefined();

    return presentation
      .verifiableCredential[0] as VerifiableCredential<RoleCredentialSubject>;
  };

  const mockCredentialInitiate = (issuerDid: string) => {
    mockInitiateCredentialStatusUpdate.mockImplementationOnce(
      (credential: Credential<RoleCredentialSubject>) => {
        return {
          '@context': [
            'https://www.w3.org/2018/credentials/v1',
            'https://w3id.org/vc/status-list/2021/v1',
          ],
          id: `https://identitycache.org/v1/status-list/${credential.id}`,
          type: ['VerifiableCredential', 'StatusList2021Credential'],
          credentialSubject: {
            id: `https://identitycache.org/v1/status-list/${credential.id}`,
            type: 'StatusList2021',
            statusPurpose: 'revocation',
            encodedList: 'H4sIAAAAAAAAA2MEABvfBaUBAAAA',
          },
          issuer: issuerDid,
          issuanceDate: new Date().toISOString(),
        };
      }
    );
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    await setupENS(await rootOwner.getAddress());
    setLogger(new ConsoleLogger());
  });

  test('revoke claim, revoke type DID, issuer is revoker', async () => {
    const issuer = await initUser();
    const subject = await initUser();
    const roleName = 'test1';

    const { roleDefinition } = await createRole(
      roleName,
      {
        issuerType: 'DID',
        did: [issuer.signerService.did],
      },
      {
        revokerType: 'DID',
        did: [issuer.signerService.did],
      }
    );

    mockGetRoleDefinition.mockImplementation(() => roleDefinition);

    const claim = await enrolAndIssue(issuer, subject, `${roleName}.${root}`);
    const verifiableCredential = extractCredential(claim);

    mockCredentialInitiate(issuer.signerService.didHex);

    expect(
      await issuer.verifiableCredentialsService.revokeCredential(
        verifiableCredential
      )
    ).toBeDefined();
  });

  test('revoke claim, revoke type DID, issuer is not revoker', async () => {
    const issuer = await initUser();
    const subject = await initUser();
    const revoker = await initUser();
    const roleName = 'test1';

    const { roleDefinition } = await createRole(
      roleName,
      {
        issuerType: 'DID',
        did: [issuer.signerService.did],
      },
      {
        revokerType: 'DID',
        did: [revoker.signerService.did],
      }
    );

    mockGetRoleDefinition.mockImplementation(() => roleDefinition);

    const claim = await enrolAndIssue(issuer, subject, `${roleName}.${root}`);

    const verifiableCredential = extractCredential(claim);

    mockCredentialInitiate(issuer.signerService.didHex);

    expect(
      await revoker.verifiableCredentialsService.revokeCredential(
        verifiableCredential
      )
    ).toBeDefined();
  });

  test('throw an error when revoker is not authorized', async () => {
    const issuer = await initUser();
    const subject = await initUser();
    const revoker = await initUser();
    const roleName = 'test1';

    const { roleDefinition } = await createRole(
      roleName,
      {
        issuerType: 'DID',
        did: [issuer.signerService.did],
      },
      {
        revokerType: 'DID',
        did: [revoker.signerService.did],
      }
    );

    mockGetRoleDefinition.mockImplementation(() => roleDefinition);

    const claim = await enrolAndIssue(issuer, subject, `${roleName}.${root}`);

    const verifiableCredential = extractCredential(claim);

    mockInitiateCredentialStatusUpdate.mockRejectedValueOnce(
      new Error('Revoker unauthorized')
    );

    await expect(
      revoker.verifiableCredentialsService.revokeCredential(
        verifiableCredential
      )
    ).rejects.toThrowError();
  });

  test('revocation details should match data', async () => {
    const issuer = await initUser();

    mockGetStatusListCredential.mockResolvedValueOnce(STATUS_LIST_CREDENTIAL);

    expect(
      await issuer.verifiableCredentialsService.revocationDetails({
        id: 'a',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any)
    ).toEqual({
      revoker: 'did:ethr:0x12047:0x5f757211976c68136041c439c3b3e699b3312882',
      timestamp: new Date('2022-06-17T08:21:36.298Z').getTime(),
    });
  });

  test('credentials should be revoked', async () => {
    const issuer = await initUser();

    mockGetStatusListCredential.mockResolvedValueOnce(STATUS_LIST_CREDENTIAL);

    expect(
      await issuer.verifiableCredentialsService.isRevoked({
        id: 'a',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any)
    ).toBeTruthy();
  });

  test('credentials should not be revoked', async () => {
    const issuer = await initUser();

    mockGetStatusListCredential.mockResolvedValueOnce(null);

    expect(
      await issuer.verifiableCredentialsService.isRevoked({
        id: 'a',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any)
    ).toBeFalsy();
  });

  test('revoke claim, revoke type ROLE, issuer is revoker', async () => {
    const issuer = await initUser();
    const revoker = await initUser();
    const subject = await initUser();
    const roleName = 'test1';
    const revokerRoleName = 'test1';

    const { roleDefinition: revokerRoleDefinition } = await createRole(
      revokerRoleName,
      {
        issuerType: 'DID',
        did: [issuer.signerService.did],
      },
      {
        revokerType: 'DID',
        did: [],
      }
    );
    mockGetRoleDefinition.mockImplementation(() => revokerRoleDefinition);
    await enrolAndIssue(issuer, revoker, `${revokerRoleName}.${root}`);

    const { roleDefinition } = await createRole(
      roleName,
      {
        issuerType: 'DID',
        did: [issuer.signerService.did],
      },
      {
        revokerType: 'ROLE',
        roleName: `${revokerRoleName}.${root}`,
      }
    );
    mockGetRoleDefinition.mockImplementation(() => roleDefinition);
    const claim = await enrolAndIssue(issuer, subject, `${roleName}.${root}`);

    const verifiableCredential = extractCredential(claim);

    mockCredentialInitiate(revoker.signerService.didHex);

    expect(
      await revoker.verifiableCredentialsService.revokeCredential(
        verifiableCredential
      )
    ).toBeDefined();
  });
});
