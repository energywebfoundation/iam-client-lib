import { AxiosInstance, AxiosResponse } from 'axios';
import { SiweMessage } from 'siwe';
import { cacheConfigs } from '../../config';
import { SignerService } from '../signer';
import { AuthTokens, SiweOptions } from './cache-client.types';

/**
 * Provides authentication methods to ssi-hub
 *
 * @todo Move here authentication parts of `CacheClient`
 * @todo Make this class top-level module in order to use in application
 */
export class SsiAuth {
  private readonly config: SiweOptions;

  constructor(
    private signerService: SignerService,
    private http: AxiosInstance
  ) {
    this.config = cacheConfigs()[this.signerService.chainId].auth;
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
    const uri = new URL(
      '/login/siwe/verify',
      cacheConfigs()[this.signerService.chainId].url
    ).href;
    const siweMessage = new SiweMessage({
      nonce,
      domain: new URL(this.config.domain).host,
      address: this.signerService.address,
      uri,
      version: '1',
      chainId: this.signerService.chainId,
    });
    const message = siweMessage.prepareMessage();

    const signature = await this.signerService.signer.signMessage(message);

    return this.http.post<AuthTokens>('/login/siwe/verify', {
      message,
      signature,
    });
  }
}
