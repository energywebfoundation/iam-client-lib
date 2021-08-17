import { MessagingMethod } from "../utils/constants";
import { VOLTA_CHAIN_ID } from "../constants";

export interface MessagingConfig {
    messagingMethod: MessagingMethod;
    natsServerUrl: string;
}

export default () => ({ ...messagingConfig });

const messagingConfig: Record<number, MessagingConfig> = {
    [VOLTA_CHAIN_ID]: {
        messagingMethod: MessagingMethod.Nats,
        natsServerUrl: "https://volta-identityevents.energyweb.org/",
    },
};

/**
 * Used to override existing messaging configuration or add a missing one
 * Configuration must be set before constructing `IAM`
 */
export const setMessagingConfig = (chainId: number, options: Partial<MessagingConfig>) => {
    messagingConfig[chainId] = { ...messagingConfig[chainId], ...options };
};
