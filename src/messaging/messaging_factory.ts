import { Subscription } from "nats.ws";
import { MessagingOptions } from "../iam/chainConfig";
import { MessagingMethod } from "../utils/constants";
import { NatsHandler } from "./nats_handler";
import { NoHandler } from "./no_handler";

export interface IMessagesHandler {
    publish<T extends Record<string, any>>(topic: string, message: T);
    subscribe<T extends Record<string, any>>(
        subject: string,
        messageHandler: (data: T) => void,
    ): Subscription | undefined;
    isConnected(): boolean;
}

export class MessagingFactory {
    static async build(options?: MessagingOptions): Promise<IMessagesHandler> {
        switch (options?.messagingMethod) {
            case MessagingMethod.Nats:
                return await NatsHandler.init(options.natsServerUrl);
            default:
                console.info(`no handler configured for '${options?.messagingMethod}'`);
                return new NoHandler();
        }
    }
}
