import { AxiosInstance, AxiosResponse } from 'axios';
import { SignerService } from '../signer';
import { AuthTokens, IAuthTokensClient, SiweOptions } from '.';
/**
 * Provides authentication tokens via SIWE protocol
 */
export declare class SiweAuthTokensClient implements IAuthTokensClient {
    private signerService;
    private httpClient;
    private readonly config;
    /**
     *
     * @param signerService service which provides authentication signature
     * @param httpClient http connection which is being authenticated
     * @param options SIWE options
     */
    constructor(signerService: SignerService, httpClient: AxiosInstance, { domain, baseUrl }: SiweOptions);
    getAuthTokens(): Promise<AxiosResponse<AuthTokens>>;
}
