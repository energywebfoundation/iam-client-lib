import { MessagingMethod } from '../modules/messaging/messaging.types';
import { ChainId } from './chain.config';
export interface MessagingConfig {
    messagingMethod: MessagingMethod;
    natsServerUrl: string;
    natsEnvironmentName: string;
}
/**
 * Used to override existing messaging configuration or add a missing one
 * Configuration must be set before constructing `IAM`
 */
export declare const setMessagingConfig: (chainId: ChainId, options: Partial<MessagingConfig>) => void;
export declare const getMessagingConfig: () => {
    [x: number]: MessagingConfig;
};
