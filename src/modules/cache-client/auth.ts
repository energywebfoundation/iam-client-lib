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
    console.dir(nonce);
    const siweMessage = new SiweMessage({
      nonce,
      domain: this.config.domain,
      address: this.signerService.address,
      uri: `${cacheConfigs()[this.signerService.chainId].url}login/siwe/verify`,
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
