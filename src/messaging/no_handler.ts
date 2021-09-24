import { Subscription } from "nats.ws";
import { IMessagesHandler } from "./messaging_factory";

export class NoHandler implements IMessagesHandler {
    isConnected = (): boolean => false;

    public publish = <T extends Record<string, any>>(subject: string, message: T) => void 0;

    public subscribe = <T extends Record<string, any>>(
        subject: string,
        messageHandler: (data: T) => void,
    ): Subscription | undefined => undefined;
}
