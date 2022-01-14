export enum MessagingMethod {
  Nats = 'nats',
  // Not implemented yet
  // WebRTC = "webRTC",
  // SmartContractStorage = "smartContractStorage",
}

export interface IMessage {
  id: string;
  requester: string;
  claimIssuer?: string[];
}
