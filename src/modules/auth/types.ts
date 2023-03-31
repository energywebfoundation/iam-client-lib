import { AxiosResponse } from 'axios';
export type SiweOptions = {
  /**
   * host name of the service requesting signing
   * */
  domain: string;
  /**
   * base Url of the subject of the signing
   * */
  baseUrl?: string;
};

export const DEFAULT_AUTH_STATUS_PATH = '/auth/status';

export interface AuthTokens {
  token: string;
  refreshToken: string;
}

export interface ILogin {
  login(): Promise<void>;
}

export interface IAuthTokensClient {
  getAuthTokens(): Promise<AxiosResponse<AuthTokens>>;
}
