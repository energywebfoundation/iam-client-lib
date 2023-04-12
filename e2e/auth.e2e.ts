import { providers, Wallet } from 'ethers';
import nock from 'nock';
import {
  AuthService,
  AuthTokens,
  CacheClient,
  ProviderType,
  setCacheConfig,
  SignerService,
  DEFAULT_AUTH_STATUS_PATH,
} from '../src';
import { rpcUrl } from './utils/setup-contracts';

describe('Authentication tests', () => {
  const SSI_HUB_URL = 'http://identitycache.energyweb.org/v1';
  const provider = new providers.JsonRpcProvider({ url: rpcUrl });
  const domain = 'http://localhost:8080';
  const RETRY_COUNT = 3; // number of retried requests

  let signerService: SignerService;
  let authService: AuthService;
  let cacheClient: CacheClient;

  const getNockScope = (): nock.Scope => nock(SSI_HUB_URL);

  beforeAll(async () => {
    const network = await provider.getNetwork();
    setCacheConfig(network.chainId, {
      url: SSI_HUB_URL,
      auth: {
        domain,
        baseUrl: SSI_HUB_URL,
      },
    });
  });

  beforeEach(async () => {
    const wallet = Wallet.createRandom();
    signerService = new SignerService(
      wallet.connect(provider),
      ProviderType.PrivateKey
    );
    cacheClient = new CacheClient(signerService);
    await signerService.init();

    authService = cacheClient['authService'];
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe('isAuthenticated()', () => {
    let nockScope: nock.Scope;

    afterEach(() => {
      expect(nockScope.isDone()).toBe(true);
    });

    it('should return true if the user is authenticated', async () => {
      nockScope = getNockScope().get(DEFAULT_AUTH_STATUS_PATH).reply(200, {
        user: signerService.did,
      });

      const isAuthenticated = await cacheClient.isAuthenticated();
      expect(isAuthenticated).toBe(true);
    });

    it('should return false if other user is authenticated', async () => {
      nockScope = getNockScope().get(DEFAULT_AUTH_STATUS_PATH).reply(200, {
        user: 'did:ethr:0x0000000000000000000000000000000000000000',
      });

      const isAuthenticated = await cacheClient.isAuthenticated();
      expect(isAuthenticated).toBe(false);
    });

    it('should return false if empty user in response', async () => {
      nockScope = getNockScope().get(DEFAULT_AUTH_STATUS_PATH).reply(200, {
        user: null,
      });

      const isAuthenticated = await cacheClient.isAuthenticated();
      expect(isAuthenticated).toBe(false);
    });

    it('should return false if server error occurred', async () => {
      nockScope = getNockScope().get(DEFAULT_AUTH_STATUS_PATH).reply(500);

      const isAuthenticated = await cacheClient.isAuthenticated();
      expect(isAuthenticated).toBe(false);
    });
  });

  describe('refreshToken()', () => {
    let nockScope: nock.Scope;

    it('should obtain new tokens from auth server', async () => {
      const newTokens = {
        token: 'new-token',
        refreshToken: 'new-refresh-token',
      };
      const oldRefreshToken = 'old-token';

      nockScope = getNockScope()
        .get(`/refresh_token?refresh_token=${oldRefreshToken}`)
        .reply(200, newTokens);

      authService['refresh_token'] = oldRefreshToken;

      await authService['refreshToken']();
      expect(authService['refresh_token']).toStrictEqual(
        newTokens.refreshToken
      );
      expect(
        cacheClient['_httpClient'].defaults.headers.common.Authorization
      ).toBe(`Bearer ${newTokens.token}`);
      expect(nockScope.isDone()).toBe(true);
    });

    it('should not try to obtain new token if missing refresh token', async () => {
      const newTokens = {
        token: 'new-token',
        refreshToken: 'new-refresh-token',
      };
      const oldRefreshToken = 'old-token';

      nockScope
        .get(`/refresh_token?refresh_token=${oldRefreshToken}`)
        .reply(200, newTokens);

      await expect(authService['refreshToken']()).resolves.toBeUndefined();
      expect(nockScope.isDone()).toBe(false);
    });

    it('should throw axios error if occurred', async () => {
      const oldRefreshToken = 'old-token';

      nockScope = getNockScope()
        .get(`/refresh_token?refresh_token=${oldRefreshToken}`)
        .times(RETRY_COUNT + 1)
        .reply(500);

      authService['refresh_token'] = oldRefreshToken;

      await expect(authService['refreshToken']()).rejects.toBeDefined();
      expect(nockScope.isDone()).toBe(true);
    });
  });

  describe('login()', () => {
    it('should not authenticate when client is already authenticated', async () => {
      authService['isAuthenticated'] = jest.fn().mockResolvedValueOnce(true);
      authService['authenticate'] = jest.fn();
      await cacheClient.login();
      expect(authService['authenticate']).not.toHaveBeenCalled();
    });

    it('should authenticate when client is not authenticated yet', async () => {
      authService['isAuthenticated'] = jest.fn().mockResolvedValueOnce(false);
      authService['authenticate'] = jest.fn();
      await cacheClient.login();
      expect(authService['authenticate']).toHaveBeenCalledTimes(1);
    });
  });

  describe('authenticate()', () => {
    let authInitScope: nock.Scope;
    const nonce = 47;

    beforeEach(() => {
      authInitScope = getNockScope()
        .post('/login/siwe/initiate')
        .reply(201, { nonce });
    });

    const checkTokens = (tokens: AuthTokens) => {
      expect(
        cacheClient['_httpClient'].defaults.headers.common.Authorization
      ).toBe(`Bearer ${tokens.token}`);
      expect(authService['refresh_token']).toBe(tokens.refreshToken);
    };

    it('should refresh tokens', async () => {
      const newTokens = {
        token: 'new-token',
        refreshToken: 'new-refresh-token',
      };
      const oldRefreshToken = 'old-token';

      authService['refresh_token'] = oldRefreshToken;

      const refreshScope = getNockScope()
        .get(`/refresh_token?refresh_token=${oldRefreshToken}`)
        .reply(200, newTokens);

      const loginScope = getNockScope()
        .post(`/login/siwe/verify`)
        .reply(200, newTokens);

      const statusScope = getNockScope()
        .get(DEFAULT_AUTH_STATUS_PATH)
        .reply(200, {
          user: signerService.did,
        });

      await cacheClient.authenticate();

      checkTokens(newTokens);

      expect(authInitScope.isDone()).toBe(false);
      expect(refreshScope.isDone()).toBe(true);
      expect(loginScope.isDone()).toBe(false);
      expect(statusScope.isDone()).toBe(true);
    });

    it('should perform login when refresh token is empty', async () => {
      const newTokens = {
        token: 'new-token',
        refreshToken: 'new-refresh-token',
      };

      const refreshScope = getNockScope()
        .get('refresh_token')
        .reply(200, newTokens);

      const loginScope = getNockScope()
        .post(`/login/siwe/verify`)
        .reply(200, newTokens);

      const statusScope = getNockScope()
        .get(DEFAULT_AUTH_STATUS_PATH)
        .once()
        .reply(200, {
          user: null,
        })
        .get(DEFAULT_AUTH_STATUS_PATH)
        .once()
        .reply(200, {
          user: signerService.did,
        });

      await cacheClient.authenticate();

      checkTokens(newTokens);

      expect(refreshScope.isDone()).toBe(false);
      expect(authInitScope.isDone()).toBe(true);
      expect(loginScope.isDone()).toBe(true);
      expect(statusScope.isDone()).toBe(false);
    });

    it('should perform login when refreshing token fails', async () => {
      const newTokens = {
        token: 'new-token',
        refreshToken: 'new-refresh-token',
      };

      const oldRefreshToken = 'old-token';

      authService['refresh_token'] = oldRefreshToken;

      const refreshScope = getNockScope()
        .get(/refresh_token/)
        .reply(500);

      const loginScope = getNockScope()
        .post('/login/siwe/verify')
        .reply(200, newTokens);

      const statusScope = getNockScope()
        .get(DEFAULT_AUTH_STATUS_PATH)
        .once()
        .reply(200, {
          user: null,
        })
        .get(DEFAULT_AUTH_STATUS_PATH)
        .once()
        .reply(200, {
          user: signerService.did,
        });

      await cacheClient.authenticate();

      checkTokens(newTokens);

      expect(refreshScope.isDone()).toBe(true);
      expect(authInitScope.isDone()).toBe(true);
      expect(loginScope.isDone()).toBe(true);
      expect(statusScope.isDone()).toBe(false);
    });

    it('should perform login when refreshing token authorize other user', async () => {
      const newTokens = {
        token: 'new-token',
        refreshToken: 'new-refresh-token',
      };

      const oldRefreshToken = 'old-token';

      authService['refresh_token'] = oldRefreshToken;

      const refreshScope = getNockScope()
        .get(/refresh_token/)
        .reply(200, newTokens);

      const loginScope = getNockScope()
        .post('/login/siwe/verify')
        .reply(200, newTokens);

      const statusScope = getNockScope()
        .get(DEFAULT_AUTH_STATUS_PATH)
        .reply(200, {
          user: 'did:ethr:volta:0x0000000000000000000000000000000000000000',
        });

      await cacheClient.authenticate();

      checkTokens(newTokens);

      expect(refreshScope.isDone()).toBe(true);
      expect(authInitScope.isDone()).toBe(true);
      expect(loginScope.isDone()).toBe(true);
      expect(statusScope.isDone()).toBe(true);
    });

    it('should throw an error when login fails', async () => {
      const loginScope = getNockScope().post(`/login/siwe/verify`).reply(500);

      await expect(cacheClient.authenticate()).rejects.toBeDefined();

      expect(authInitScope.isDone()).toBe(true);
      expect(loginScope.isDone()).toBe(true);
    });
  });

  describe('makeRetryRequest()', () => {
    const roleName = 'test';
    const ROLE_DEF_PATH = `/role/${roleName}`;
    const roleData = { definition: { roleName: 'test' } };

    it('should result with data after successful request', async () => {
      const nockScope = getNockScope().get(ROLE_DEF_PATH).reply(200, roleData);

      const def = await cacheClient.getRoleDefinition(roleName);

      expect(def).toEqual(roleData.definition);
      expect(nockScope.isDone()).toBe(true);
    });

    // unclear how to mock non axios error
    it.skip('should not retry not axios error', async () => {
      const errorMessage = 'Request failed';
      const nockScope = getNockScope()
        .get(ROLE_DEF_PATH)
        .replyWithError(errorMessage);

      await expect(cacheClient.getRoleDefinition(roleName)).rejects.toThrow(
        errorMessage
      );

      expect(nockScope.isDone()).toBe(true);
    });

    it('should retry 500 errors', async () => {
      const nockScope = getNockScope()
        .get(ROLE_DEF_PATH)
        .reply(500)
        .get(ROLE_DEF_PATH)
        .reply(200, roleData);

      const data = await cacheClient.getRoleDefinition(roleName);

      expect(data).toEqual(roleData.definition);
      expect(nockScope.isDone()).toBe(true);
    });

    it('should retry ECONNREFUSED error', async () => {
      const nockScope = getNockScope()
        .get(ROLE_DEF_PATH)
        .replyWithError({
          code: 'ECONNREFUSED',
          errno: 'ECONNREFUSED',
        })
        .get(ROLE_DEF_PATH)
        .reply(200, roleData);

      const def = await cacheClient.getRoleDefinition(roleName);

      expect(def).toEqual(roleData.definition);
      expect(nockScope.isDone()).toBe(true);
    });

    it.each([
      408, 411, 412, 425, 426, 500, 501, 502, 503, 504, 505, 506, 510, 511,
    ])('should retry %i error', async (statusCode) => {
      const nockScope = getNockScope()
        .get(ROLE_DEF_PATH)
        .reply(statusCode)
        .get(ROLE_DEF_PATH)
        .reply(200, roleData);

      const def = await cacheClient.getRoleDefinition(roleName);

      expect(def).toEqual(roleData.definition);
      expect(nockScope.isDone()).toBe(true);
    });

    it.each([
      400, 402, 404, 405, 406, 409, 410, 413, 414, 415, 416, 417, 422, 428, 429,
      431, 451,
    ])('should not retry %i error', async (statusCode) => {
      const nockScope = getNockScope().get(ROLE_DEF_PATH).reply(statusCode);

      await expect(cacheClient.getRoleDefinition(roleName)).rejects.toThrow();

      expect(nockScope.isDone()).toBe(true);
    });

    it('should not retry auth endpoints', async () => {
      const nockScope = getNockScope().post('/login/siwe/initiate').reply(401);

      await expect(cacheClient.authenticate()).rejects.toThrow();

      expect(nockScope.isDone()).toBe(true);
    });

    it('should authenticate when responds with 401 status code', async () => {
      const roleDefScope = getNockScope()
        .get(ROLE_DEF_PATH)
        .reply(401)
        .get(ROLE_DEF_PATH)
        .reply(200, roleData);

      const authStatusScope = getNockScope()
        .get('/auth/status')
        .reply(200, { user: null });
      const nonce = 47;
      const authInitScope = getNockScope()
        .post('/login/siwe/initiate')
        .reply(200, { nonce });
      const tokens: AuthTokens = {
        token: 'access token',
        refreshToken: 'refresh token',
      };
      const authVefifyScope = getNockScope()
        .post('/login/siwe/verify')
        .reply(200, tokens);

      const def = await cacheClient.getRoleDefinition(roleName);

      expect(def).toEqual(roleData.definition);
      expect(roleDefScope.isDone()).toBe(true);
      expect(authInitScope.isDone()).toBe(true);
      expect(authStatusScope.isDone()).toBe(true);
      expect(authVefifyScope.isDone()).toBe(true);
    });

    it('should authenticate once on two unauthenticated requests', async () => {
      const roleDefScope = getNockScope()
        .get(ROLE_DEF_PATH)
        .reply(401)
        .get(ROLE_DEF_PATH)
        .reply(200, roleData);

      const orgName = 'test';
      const ORG_DEF_PATH = `/org/${orgName}`;
      const orgData = { definition: { orgName: 'Org name' } };
      const orgDefScope = getNockScope()
        .get(ORG_DEF_PATH)
        .reply(401)
        .get(ORG_DEF_PATH)
        .reply(200, orgData);

      const nonce = 47;
      const authInitScope = getNockScope()
        .post('/login/siwe/initiate')
        .reply(200, { nonce });
      const tokens: AuthTokens = {
        token: 'access token',
        refreshToken: 'refresh token',
      };
      const authVefifyScope = getNockScope()
        .post('/login/siwe/verify')
        .reply(200, tokens);

      const data = await Promise.all([
        cacheClient.getRoleDefinition(roleName),
        cacheClient.getOrgDefinition(orgName),
      ]);

      expect(data).toStrictEqual(
        expect.arrayContaining([roleData.definition, orgData.definition])
      );
      expect(roleDefScope.isDone()).toBe(true);
      expect(orgDefScope.isDone()).toBe(true);
      expect(authInitScope.isDone()).toBe(true);
      expect(authVefifyScope.isDone()).toBe(true);
    });

    it('should retry when request handler throw error', async () => {
      const roleDefScope = getNockScope()
        .get(ROLE_DEF_PATH)
        .reply(500)
        .get(ROLE_DEF_PATH)
        .reply(200, roleData);

      jest
        .spyOn(authService as any, 'handleRequestError')
        .mockRejectedValueOnce(new Error());

      const def = await cacheClient.getRoleDefinition(roleName);

      expect(def).toEqual(roleData.definition);
      expect(roleDefScope.isDone()).toBe(true);
    });

    it('should retry when login verify endpoint responds with 500 status code', async () => {
      const getRoleScope = getNockScope()
        .get(ROLE_DEF_PATH)
        .reply(401)
        .get(ROLE_DEF_PATH)
        .reply(200, roleData);

      const authStatusScope = getNockScope()
        .get('/auth/status')
        .reply(200, { user: null });
      const authInitScope = getNockScope()
        .post('/login/siwe/initiate')
        .reply(201, { nonce: 47 });
      const tokens: AuthTokens = {
        token: 'access token',
        refreshToken: 'refresh token',
      };
      const authVerifyScope = getNockScope()
        .post('/login/siwe/verify')
        .reply(500)
        .post('/login/siwe/verify')
        .reply(201, tokens);

      const def = await cacheClient.getRoleDefinition(roleName);

      expect(def).toEqual(roleData.definition);
      expect(getRoleScope.isDone()).toBe(true);
      expect(authInitScope.isDone()).toBe(true);
      expect(authVerifyScope.isDone()).toBe(true);
      expect(authStatusScope.isDone()).toBe(true);
    });
  });
});
