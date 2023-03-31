import { AxiosInstance, AxiosResponse } from 'axios';
import setCookie from 'set-cookie-parser';
import { getLogger } from '../../config';
import { ExecutionEnvironment, executionEnvironment } from '../../utils';
import { SignerService } from '../signer';
import { AuthTokens, DEFAULT_AUTH_STATUS_PATH, SiweOptions } from './types';
import { SiweAuthTokensClient } from './siwe-auth-token-client';

/**
 * Configures authentication for the provided http client
 */
export class AuthService {
  isBrowser: boolean;
  authEnabled: boolean;
  refresh_token: string | undefined;
  private readonly authStatusPath: string;
  private readonly authTokenClient: SiweAuthTokensClient;

  /**
   *
   * @param signerService service used to sign authentication message
   * @param httpClient http client to which authentication is provided
   * @param authTokenClient client exchanging authentication token on access token
   */
  constructor(
    private signerService: SignerService,
    private httpClient: AxiosInstance,
    {
      authStatusPath = DEFAULT_AUTH_STATUS_PATH,
      siweOptions,
    }: { authStatusPath?: string; siweOptions: SiweOptions }
  ) {
    this.authStatusPath = authStatusPath;
    this.isBrowser = executionEnvironment() === ExecutionEnvironment.BROWSER;
    this.authTokenClient = new SiweAuthTokensClient(
      signerService,
      httpClient,
      siweOptions
    );
  }

  /**
   * Verifies current session and establishes new one if needed
   * https://energyweb.atlassian.net/wiki/spaces/MYEN/pages/2303295607/ICL-+ICS+Auth+Process
   */
  async login() {
    if (!(await this.isAuthenticated())) {
      await this.authenticate();
    }
  }

  /**
   * @description Refreshes access token. If login still fails then signs new identity token and requests access token
   * After authentication runs previously failed requests
   */
  async authenticate() {
    // First try to refresh access token
    try {
      await this.refreshToken();
    } catch (e) {
      getLogger().warn(
        '[AuthService] failed to refresh tokens: ${(e as AxiosError).message}'
      );
    }

    // If refresh token failed or access token is not valid, then sign new identity token
    if (!(await this.isAuthenticated())) {
      getLogger().info('[AuthService] obtaining new tokens');
      delete this.httpClient.defaults.headers.common['Authorization'];
      const res = await this.authTokenClient.getAuthTokens();
      if (!this.isBrowser) {
        this.setTokens(res);
      }
    }
    getLogger().info('[AuthService] authenticated');
  }

  /**
   * Checks that auth token has been created, has not expired and corresponds to signer.
   * This is done by a request to the server because the auth token is stored in an HTTP-only cookie and
   * so the Javascript has no way to check its validity
   *
   * @return true if cache client is authenticated server
   */
  async isAuthenticated(): Promise<boolean> {
    getLogger().info('[AuthService] fetching authorization status');
    try {
      const { data } = await this.httpClient.get<{
        user: string | null;
      }>(this.authStatusPath);
      const isAuthenticated = data.user
        ? data.user === this.signerService.did
        : false;
      getLogger().info(
        `[AuthService] authorization status: ${isAuthenticated ? 'OK' : 'FAIL'}`
      );
      return isAuthenticated;
    } catch (error) {
      getLogger().info('[AuthService] authorization status: FAIL');
      if (error instanceof Error) {
        getLogger().error(
          `[AuthService] error occurred while checking authorization status: ${error.message}`
        );
      }
      return false;
    }
  }

  async refreshToken(): Promise<void> {
    if (!this.isBrowser && !this.refresh_token) return undefined;
    getLogger().info('[AuthService] refreshing tokens');
    const res = await this.httpClient.get<AuthTokens>(
      `/refresh_token${
        this.isBrowser ? '' : `?refresh_token=${this.refresh_token}`
      }`
    );
    getLogger().debug('[AuthService] refreshed tokens fetched');
    if (!this.isBrowser) {
      this.setTokens(res);
    }
  }

  /**
   * Saves access and refresh tokens from login response
   *
   * @param res Response from login request
   */
  setTokens({ headers, data }: AxiosResponse) {
    let token: AuthTokens['token'] | undefined;
    let refreshToken: AuthTokens['refreshToken'] | undefined;
    if (headers['set-cookie']) {
      const cookies = setCookie.parse(headers['set-cookie'], {
        decodeValues: false,
        map: true,
      });
      const tokenCookie = cookies['token'];
      const refreshTokenCookie = cookies['refreshToken'];

      if (tokenCookie && refreshTokenCookie) {
        token = tokenCookie.value;
        refreshToken = refreshTokenCookie.value;
      }
    }
    if (!token || !refreshToken) {
      token = data.token;
      refreshToken = data.refreshToken;
    }
    this.refresh_token = refreshToken;
    this.httpClient.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${token}`;
  }
}
