import { AxiosInstance, AxiosResponse } from 'axios';
import { SiweMessage } from 'siwe';
import { cacheConfigs } from '../../config';
import { SignerService } from '../signer';
import { AuthTokens } from './cache-client.types';

/**
 * Provides authentication methods to ssi-hub
 *
 * @todo Move here authentication parts of `CacheClient`
 * @todo Make this class top-level module in order to use in application
 */
export class SsiAuth {
  private readonly config: Partial<SiweMessage>;

  constructor(
    private signerService: SignerService,
    private http: AxiosInstance
  ) {
    const { uri, domain } = cacheConfigs()[this.signerService.chainId].auth;
    this.config = {
      domain: new URL(domain).host,
      uri:
        uri ||
        new URL(
          '/v1/login/siwe/verify',
          new URL(cacheConfigs()[this.signerService.chainId].url).origin
        ).href,
      address: this.signerService.address,
      version: '1',
      chainId: this.signerService.chainId,
    };
  }

  /**
   * Signs in to ssi-hub. Authentication method configurations are looked for in `cacheConfigs`
   *
   * @returns authentication tokens
   */
  async signIn(): Promise<AxiosResponse<AuthTokens>> {
    const {
      data: { nonce },
    } = await this.http.post<{ nonce: string }>('/login/siwe/initiate');

    const siweMessage = new SiweMessage({
      ...this.config,
      nonce,
    });
    const message = siweMessage.prepareMessage();

    const signature = await this.signerService.sign(message);

    return this.http.post<AuthTokens>('/login/siwe/verify', {
      message,
      signature,
    });
  }
}
