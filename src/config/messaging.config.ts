import { MessagingMethod } from "../modules/messaging/messaging.types";
import { VOLTA_CHAIN_ID } from "../utils/constants";
import { ChainId } from "./chain.config";

export interface MessagingConfig {
    messagingMethod: MessagingMethod;
    natsServerUrl: string;
    natsEnvironmentName: string;
}

const messagingConfig: Record<ChainId, MessagingConfig> = {
    [VOLTA_CHAIN_ID]: {
        messagingMethod: MessagingMethod.Nats,
        natsServerUrl: "https://identityevents-dev.energyweb.org/",
        natsEnvironmentName: "ewf-volta",
    },
};

/**
 * Used to override existing messaging configuration or add a missing one
 * Configuration must be set before constructing `IAM`
 */
export const setMessagingConfig = (chainId: ChainId, options: Partial<MessagingConfig>) => {
    messagingConfig[chainId] = { ...messagingConfig[chainId], ...options };
};

export const getMessagingConfig = () => ({ ...messagingConfig });
