import { AxiosInstance, AxiosResponse } from 'axios';
import { SiweMessage } from 'siwe';
import { SignerService } from '../signer';
import { AuthTokens, IAuthTokensClient, SiweOptions } from '.';
import { getLogger } from '../../config';

/**
 * Provides authentication tokens via SIWE protocol
 */
export class SiweAuthTokensClient implements IAuthTokensClient {
  private readonly config: Partial<SiweMessage>;

  /**
   *
   * @param signerService service which provides authentication signature
   * @param httpClient http connection which is being authenticated
   * @param options SIWE options
   */
  constructor(
    private signerService: SignerService,
    private httpClient: AxiosInstance,
    { domain, baseUrl }: SiweOptions
  ) {
    if (!baseUrl) {
      getLogger().warn(
        'Base url of SIWE signing subject is not provided. Using default base url of the http client'
      );
      const clientBaseUrl = this.httpClient.defaults.baseURL;
      if (!clientBaseUrl) {
        throw new Error(
          'Can not create SIWE auth token client. Base url is not provided'
        );
      }
      baseUrl = clientBaseUrl;
    }
    const uri = baseUrl.endsWith('/')
      ? `${baseUrl}login/siwe/verify`
      : `${baseUrl}/login/siwe/verify`;
    this.config = {
      domain,
      uri,
      address: this.signerService.address,
      version: '1',
      chainId: this.signerService.chainId,
    };
  }

  async getAuthTokens(): Promise<AxiosResponse<AuthTokens>> {
    const {
      data: { nonce },
    } = await this.httpClient.post<{ nonce: string }>('/login/siwe/initiate');

    const siweMessage = new SiweMessage({
      ...this.config,
      nonce,
    });
    const message = siweMessage.prepareMessage();

    const signature = await this.signerService.signer.signMessage(message);

    return this.httpClient.post<AuthTokens>('/login/siwe/verify', {
      message,
      signature,
    });
  }
}
