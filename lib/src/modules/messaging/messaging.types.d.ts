export declare enum MessagingMethod {
    Nats = "nats"
}
export interface IMessage {
    id: string;
    requester: string;
    claimIssuer?: string[];
}
export declare type MessageHandler = (message: IMessage) => void;
export interface SubscribeToOptions {
    subject?: string;
    messageHandler: MessageHandler;
}
