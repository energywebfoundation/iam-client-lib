export enum MessagingMethod {
    Nats = "nats",
    // Not implemented yet
    // WebRTC = "webRTC",
    // SmartContractStorage = "smartContractStorage",
}

export interface IMessage {
    id: string;
    requester: string;
    claimIssuer?: string[];
}

export const NATS_EXCHANGE_TOPIC = "claim.exchange";
