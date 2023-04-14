import { AxiosInstance, AxiosResponse } from 'axios';
import { SignerService } from '../signer';
import { SiweOptions } from './types';
/**
 * Configures authentication for the provided http client
 */
export declare class AuthService {
    private signerService;
    private httpClient;
    isBrowser: boolean;
    authEnabled: boolean;
    refresh_token: string | undefined;
    private readonly authStatusPath;
    private readonly authTokenClient;
    private authenticatePromise;
    private isAuthenticating;
    /**
     *
     * @param signerService service used to sign authentication message
     * @param httpClient http client to which authentication is provided
     * @param authTokenClient client exchanging authentication token on access token
     */
    constructor(signerService: SignerService, httpClient: AxiosInstance, { authStatusPath, siweOptions, }: {
        authStatusPath?: string;
        siweOptions: SiweOptions;
    });
    /**
     * Verifies current session and establishes new one if needed
     * https://energyweb.atlassian.net/wiki/spaces/MYEN/pages/2303295607/ICL-+ICS+Auth+Process
     */
    login(): Promise<void>;
    /**
     * @description Refreshes access token. If login still fails then signs new identity token and requests access token
     * After authentication runs previously failed requests
     */
    authenticate(): Promise<void>;
    /**
     * Checks that auth token has been created, has not expired and corresponds to signer.
     * This is done by a request to the server because the auth token is stored in an HTTP-only cookie and
     * so the Javascript has no way to check its validity
     *
     * @return true if cache client is authenticated server
     */
    isAuthenticated(): Promise<boolean>;
    refreshToken(): Promise<void>;
    /**
     * Saves access and refresh tokens from login response
     *
     * @param res Response from login request
     */
    setTokens({ headers, data }: AxiosResponse): void;
    /**
     * Decides whether to retry the request or not based on the given axios error.
     *
     * @param error axios error
     *
     * @return true if request should be retried
     */
    private handleRequestError;
}
