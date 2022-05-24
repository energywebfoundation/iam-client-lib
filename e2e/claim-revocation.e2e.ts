import { providers, Wallet } from 'ethers';
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
} from '../src';
import { replenish, root, rpcUrl, setupENS } from './utils/setup-contracts';
import { setLogger } from '../src/config/logger.config';
import { ConsoleLogger } from '../src/utils/logger';
import { addressOf } from '@ew-did-registry/did-ethr-resolver';

const provider = new providers.JsonRpcProvider(rpcUrl);

const mockGetRoleDefinition = jest.fn();
const mockRequestClaim = jest.fn();
const mockIssueClaim = jest.fn();
const mockGetAllowedRoles = jest.fn();
const mockGetClaimById = jest.fn();
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

describe('On-chain claim revocation', () => {
  const rootOwner = Wallet.createRandom().connect(provider);

  const initUser = async () => {
    const user = Wallet.createRandom().connect(provider);
    await replenish(user.address);

    const { signerService, messagingService, connectToCacheServer } =
      await initWithPrivateKeySigner(user.privateKey, rpcUrl);
    const { connectToDidRegistry, domainsService, assetsService } =
      await connectToCacheServer();
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
    };
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

    await enrolAndIssue(issuer, subject, `${roleName}.${root}`);

    const claim = {
      namespace: `${roleName}.${root}`,
      subject: subject.signerService.did,
    };

    expect(
      await issuer.claimsService.isClaimRevoked({
        claim,
      })
    ).toBeFalsy();

    expect(await issuer.claimsService.revokeClaim({ claim })).toBeTruthy();

    expect(
      await issuer.claimsService.isClaimRevoked({
        claim,
      })
    ).toBeTruthy();
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

    await enrolAndIssue(issuer, subject, `${roleName}.${root}`);

    const claim = {
      namespace: `${roleName}.${root}`,
      subject: subject.signerService.did,
    };

    expect(
      await issuer.claimsService.isClaimRevoked({
        claim,
      })
    ).toBeFalsy();

    expect(await revoker.claimsService.revokeClaim({ claim })).toBeTruthy();

    expect(
      await issuer.claimsService.isClaimRevoked({
        claim,
      })
    ).toBeTruthy();
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
        did: [issuer.signerService.did],
      }
    );

    mockGetRoleDefinition.mockImplementation(() => roleDefinition);

    await enrolAndIssue(issuer, subject, `${roleName}.${root}`);

    const claim = {
      namespace: `${roleName}.${root}`,
      subject: subject.signerService.did,
    };

    expect(
      await issuer.claimsService.isClaimRevoked({
        claim,
      })
    ).toBeFalsy();

    await expect(
      revoker.claimsService.revokeClaim({ claim })
    ).rejects.toThrow();
  });

  test('throw an error when claim not found', async () => {
    const issuer = await initUser();
    const subject = await initUser();
    const roleName = 'test1';

    await createRole(
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

    const claim = {
      namespace: `${roleName}.${root}`,
      subject: subject.signerService.did,
    };

    await expect(issuer.claimsService.revokeClaim({ claim })).rejects.toThrow();
  });

  test('revoke claim, revoke type DID, claim id', async () => {
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

    const issuedClaim = await enrolAndIssue(
      issuer,
      subject,
      `${roleName}.${root}`
    );

    mockGetClaimById.mockResolvedValue(issuedClaim);

    expect(
      await issuer.claimsService.isClaimRevoked({
        claimId: issuedClaim.id,
      })
    ).toBeFalsy();

    expect(
      await issuer.claimsService.revokeClaim({
        claimId: issuedClaim.id,
      })
    ).toBeTruthy();

    expect(
      await issuer.claimsService.isClaimRevoked({
        claimId: issuedClaim.id,
      })
    ).toBeTruthy();
  });

  test('should throw an error when claim id not found', async () => {
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

    const issuedClaim = await enrolAndIssue(
      issuer,
      subject,
      `${roleName}.${root}`
    );

    mockGetClaimById.mockResolvedValue(undefined);

    await expect(
      issuer.claimsService.isClaimRevoked({
        claimId: issuedClaim.id,
      })
    ).rejects.toThrow();
  });

  test('revoke multiple claim, revoke type DID', async () => {
    const issuer = await initUser();
    const subjects = [await initUser(), await initUser(), await initUser()];
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

    await enrolAndIssue(issuer, subjects[0], `${roleName}.${root}`);

    await enrolAndIssue(issuer, subjects[1], `${roleName}.${root}`);

    await enrolAndIssue(issuer, subjects[2], `${roleName}.${root}`);

    await issuer.claimsService.revokeMultipleClaim({
      claims: [
        {
          namespace: `${roleName}.${root}`,
          subject: subjects[0].signerService.did,
        },
        {
          namespace: `${roleName}.${root}`,
          subject: subjects[1].signerService.did,
        },
        {
          namespace: `${roleName}.${root}`,
          subject: subjects[2].signerService.did,
        },
      ],
    });

    expect(
      await issuer.claimsService.isClaimRevoked({
        claim: {
          namespace: `${roleName}.${root}`,
          subject: subjects[0].signerService.did,
        },
      })
    ).toBeTruthy();

    expect(
      await issuer.claimsService.isClaimRevoked({
        claim: {
          namespace: `${roleName}.${root}`,
          subject: subjects[1].signerService.did,
        },
      })
    ).toBeTruthy();

    expect(
      await issuer.claimsService.isClaimRevoked({
        claim: {
          namespace: `${roleName}.${root}`,
          subject: subjects[2].signerService.did,
        },
      })
    ).toBeTruthy();
  });

  test('revoke multiple claim, revoke type DID, claim id', async () => {
    const issuer = await initUser();
    const subjects = [await initUser(), await initUser(), await initUser()];
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

    const issuedClaims: Array<Awaited<ReturnType<typeof enrolAndIssue>>> = [];
    issuedClaims.push(
      await enrolAndIssue(issuer, subjects[0], `${roleName}.${root}`),
      await enrolAndIssue(issuer, subjects[1], `${roleName}.${root}`),
      await enrolAndIssue(issuer, subjects[2], `${roleName}.${root}`)
    );

    mockGetClaimById.mockImplementation(async (claimId) => {
      return issuedClaims.find((claim) => claim.id === claimId);
    });

    await issuer.claimsService.revokeMultipleClaim({
      claimIds: issuedClaims.map((c) => c.id),
    });

    expect(
      await issuer.claimsService.isClaimRevoked({
        claimId: issuedClaims[0].id,
      })
    ).toBeTruthy();

    expect(
      await issuer.claimsService.isClaimRevoked({
        claimId: issuedClaims[1].id,
      })
    ).toBeTruthy();

    expect(
      await issuer.claimsService.isClaimRevoked({
        claimId: issuedClaims[2].id,
      })
    ).toBeTruthy();
  });

  test('revocation details should match data', async () => {
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

    const issuedClaim = await enrolAndIssue(
      issuer,
      subject,
      `${roleName}.${root}`
    );

    mockGetClaimById.mockResolvedValue(issuedClaim);

    await issuer.claimsService.revokeClaim({
      claimId: issuedClaim.id,
    });

    expect(
      await issuer.claimsService.claimRevocationDetails({
        claimId: issuedClaim.id,
      })
    ).toEqual({
      revoker: addressOf(issuer.signerService.did),
      timestamp: expect.any(Number),
    });
  });

  test('should result with undefined when claim was not revoked', async () => {
    const issuer = await initUser();
    const roleName = 'test1';

    await createRole(
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

    expect(
      await issuer.claimsService.claimRevocationDetails({
        claim: {
          namespace: `${roleName}.${root}`,
          subject: issuer.signerService.did,
        },
      })
    ).toBeUndefined();
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
    await enrolAndIssue(issuer, subject, `${roleName}.${root}`);

    expect(
      await revoker.claimsService.revokeClaim({
        claim: {
          namespace: `${roleName}.${root}`,
          subject: subject.signerService.did,
        },
      })
    ).toBeTruthy();
  });

  test('should throw an error when two params missing', async () => {
    const revoker = await initUser();
    await expect(revoker.claimsService.revokeClaim({})).rejects.toThrow();
  });
});
