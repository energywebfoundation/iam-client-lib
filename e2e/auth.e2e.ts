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
  const SSI_HUB_URL = 'http://identitycache-dev.energyweb.org/v1';
  const provider = new providers.JsonRpcProvider({ url: rpcUrl });
  const domain = 'https://switchboard-dev.energyweb.org';

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

    beforeEach(() => {
      nockScope = getNockScope();
    });

    afterEach(() => {
      expect(nockScope.isDone()).toBe(true);
    });

    it('should return true if the user is authenticated', async () => {
      nockScope.get(DEFAULT_AUTH_STATUS_PATH).reply(200, {
        user: signerService.did,
      });

      const isAuthenticated = await cacheClient.isAuthenticated();
      expect(isAuthenticated).toBe(true);
    });

    it('should return false if other user is authenticated', async () => {
      nockScope.get(DEFAULT_AUTH_STATUS_PATH).reply(200, {
        user: 'did:ethr:0x0000000000000000000000000000000000000000',
      });

      const isAuthenticated = await cacheClient.isAuthenticated();
      expect(isAuthenticated).toBe(false);
    });

    it('should return false if empty user in response', async () => {
      nockScope.get(DEFAULT_AUTH_STATUS_PATH).reply(200, {
        user: null,
      });

      const isAuthenticated = await cacheClient.isAuthenticated();
      expect(isAuthenticated).toBe(false);
    });

    it('should return false if server error occurred', async () => {
      nockScope.get(DEFAULT_AUTH_STATUS_PATH).reply(500);

      const isAuthenticated = await cacheClient.isAuthenticated();
      expect(isAuthenticated).toBe(false);
    });
  });

  describe('refreshToken()', () => {
    let nockScope: nock.Scope;

    beforeEach(() => {
      nockScope = getNockScope();
    });

    it('should obtain new tokens from auth server', async () => {
      const newTokens = {
        token: 'new-token',
        refreshToken: 'new-refresh-token',
      };
      const oldRefreshToken = 'old-token';

      nockScope
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

      nockScope
        .get(`/refresh_token?refresh_token=${oldRefreshToken}`)
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
    const MOCK_REQUEST_PATH = '/api/v1/test';
    const mockRequest = jest.fn().mockImplementation(async () => {
      const { data } = await cacheClient['_httpClient'].get<{
        success: boolean;
      }>(MOCK_REQUEST_PATH);

      if (!data.success) {
        throw new Error('Request failed');
      }

      return data;
    });

    afterEach(() => {
      mockRequest.mockClear();
    });

    it('should result with data after successful request', async () => {
      const nockScope = getNockScope().get(MOCK_REQUEST_PATH).reply(200, {
        success: true,
      });

      const data = await cacheClient['makeRetryRequest'](mockRequest);

      expect(data).toEqual({ success: true });
      expect(mockRequest).toHaveBeenCalledTimes(1);
      expect(nockScope.isDone()).toBe(true);
    });

    it('should not retry not axios error', async () => {
      const nockScope = getNockScope().get(MOCK_REQUEST_PATH).reply(200, {
        success: false,
      });

      await expect(
        cacheClient['makeRetryRequest'](mockRequest)
      ).rejects.toThrow('Request failed');

      expect(mockRequest).toHaveBeenCalledTimes(1);
      expect(nockScope.isDone()).toBe(true);
    });

    it('should retry 5xx errors', async () => {
      const nockScope = getNockScope()
        .get(MOCK_REQUEST_PATH)
        .reply(500)
        .get(MOCK_REQUEST_PATH)
        .reply(200, {
          success: true,
        });

      const data = await cacheClient['makeRetryRequest'](mockRequest);

      expect(data).toEqual({ success: true });
      expect(mockRequest).toHaveBeenCalledTimes(2);
      expect(nockScope.isDone()).toBe(true);
    });

    it('should retry ECONNREFUSED error', async () => {
      const nockScope = getNockScope()
        .get(MOCK_REQUEST_PATH)
        .replyWithError({
          code: 'ECONNREFUSED',
          errno: 'ECONNREFUSED',
        })
        .get(MOCK_REQUEST_PATH)
        .reply(200, {
          success: true,
        });

      const data = await cacheClient['makeRetryRequest'](mockRequest);

      expect(data).toEqual({ success: true });
      expect(mockRequest).toHaveBeenCalledTimes(2);
      expect(nockScope.isDone()).toBe(true);
    });

    it.each([
      408, 411, 412, 425, 426, 500, 501, 502, 503, 504, 505, 506, 510, 511,
    ])('should retry %i error', async (statusCode) => {
      const nockScope = getNockScope()
        .get(MOCK_REQUEST_PATH)
        .reply(statusCode)
        .get(MOCK_REQUEST_PATH)
        .reply(200, {
          success: true,
        });

      const data = await cacheClient['makeRetryRequest'](mockRequest);

      expect(data).toEqual({ success: true });
      expect(mockRequest).toHaveBeenCalledTimes(2);
      expect(nockScope.isDone()).toBe(true);
    });

    it.each([
      400, 402, 404, 405, 406, 409, 410, 413, 414, 415, 416, 417, 422, 428, 429,
      431, 451,
    ])('should not retry %i error', async (statusCode) => {
      const nockScope = getNockScope().get(MOCK_REQUEST_PATH).reply(statusCode);

      await expect(
        cacheClient['makeRetryRequest'](mockRequest)
      ).rejects.toThrow();

      expect(mockRequest).toHaveBeenCalledTimes(1);
      expect(nockScope.isDone()).toBe(true);
    });

    it('should not retry auth endpoints', async () => {
      const nockScope = getNockScope().post('/login/siwe/initiate').reply(401);

      const authMockRequest = jest.fn().mockImplementation(async () => {
        return await cacheClient['_httpClient'].post<{
          success: boolean;
        }>('/login/siwe/initiate');
      });

      await expect(
        cacheClient['makeRetryRequest'](authMockRequest)
      ).rejects.toThrow();

      expect(authMockRequest).toHaveBeenCalledTimes(1);
      expect(nockScope.isDone()).toBe(true);
    });

    it('should authenticate when 401 error occurred', async () => {
      const nockScope = getNockScope()
        .get(MOCK_REQUEST_PATH)
        .reply(401)
        .get(MOCK_REQUEST_PATH)
        .reply(200, {
          success: true,
        });

      cacheClient['authenticate'] = jest.fn().mockImplementation(async () => {
        return await new Promise((resolve) => {
          setTimeout(() => {
            resolve(0);
          }, 100);
        });
      });

      const data = await cacheClient['makeRetryRequest'](mockRequest);

      expect(data).toEqual({ success: true });
      expect(mockRequest).toHaveBeenCalledTimes(2);
      expect(nockScope.isDone()).toBe(true);
      expect(cacheClient['authenticate']).toHaveBeenCalledTimes(1);
    });

    it('should authenticate once when 401 error occurred in other request during ongoing authentication process', async () => {
      const nockScope = getNockScope()
        .get(MOCK_REQUEST_PATH)
        .reply(401)
        .get(MOCK_REQUEST_PATH)
        .reply(200, {
          success: true,
        });

      const mockOtherRequestPath = '/api/v1/test2';
      const nockScope2 = getNockScope()
        .get(mockOtherRequestPath)
        .reply(401)
        .get(mockOtherRequestPath)
        .reply(200, {
          success: true,
        });

      const mockOtherRequest = jest.fn().mockImplementation(async () => {
        const { data } = await cacheClient['_httpClient'].get<{
          success: boolean;
        }>(mockOtherRequestPath);
        return data;
      });

      cacheClient['authenticate'] = jest.fn().mockImplementation(async () => {
        return await new Promise((resolve) => {
          setTimeout(() => {
            resolve(0);
          }, 1000);
        });
      });

      const data = await Promise.all([
        cacheClient['makeRetryRequest'](mockRequest),
        cacheClient['makeRetryRequest'](mockOtherRequest),
      ]);

      expect(data).toStrictEqual(
        expect.arrayContaining([{ success: true }, { success: true }])
      );
      expect(mockRequest).toHaveBeenCalledTimes(2);
      expect(mockOtherRequest).toHaveBeenCalledTimes(2);
      expect(nockScope.isDone()).toBe(true);
      expect(nockScope2.isDone()).toBe(true);
      expect(cacheClient['authenticate']).toHaveBeenCalledTimes(1);
    });

    it('should retry when handler request threw error', async () => {
      const nockScope = getNockScope()
        .get(MOCK_REQUEST_PATH)
        .reply(500)
        .get(MOCK_REQUEST_PATH)
        .reply(200, {
          success: true,
        });

      cacheClient['handleRequestError'] = jest.fn().mockRejectedValue('error');

      const data = await cacheClient['makeRetryRequest'](mockRequest);

      expect(data).toEqual({ success: true });
      expect(mockRequest).toHaveBeenCalledTimes(2);
      expect(nockScope.isDone()).toBe(true);
    });

    it('should retry when auth endpoint threw 5xx error', async () => {
      const requestScope = getNockScope()
        .get(MOCK_REQUEST_PATH)
        .reply(401)
        .get(MOCK_REQUEST_PATH)
        .reply(401)
        .get(MOCK_REQUEST_PATH)
        .reply(200, {
          success: true,
        });

      const authInitScope = getNockScope()
        .post('/login/siwe/initiate')
        .once()
        .reply(201, { nonce: 47 })
        .post('/login/siwe/initiate')
        .once()
        .reply(201, { nonce: 48 });
      const loginScope = getNockScope()
        .post('/login/siwe/verify')
        .reply(500)
        .post('/login/siwe/verify')
        .reply(201, {
          success: true,
        });

      const data = await cacheClient['makeRetryRequest'](mockRequest);

      expect(data).toEqual({ success: true });
      expect(mockRequest).toHaveBeenCalledTimes(3);
      expect(requestScope.isDone()).toBe(true);
      expect(authInitScope.isDone()).toBe(true);
      expect(loginScope.isDone()).toBe(true);
    });
  });
});
