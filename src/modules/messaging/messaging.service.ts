import { Codec, connect, JSONCodec, NatsConnection, Subscription } from "nats.ws/lib/src/mod.js";
import { messagingConfigs } from "../../config/messaging.config";
import { IMessage, MessagingMethod } from "./messaging.types";
import { SignerService } from "../signer/signer.service";

export class MessagingService {
    private _jsonCodec: Codec<any>;
    private _natsConnection: NatsConnection;
    private _subscriptions: Subscription[] = [];

    constructor(private _signerService: SignerService) {
        this._signerService.onInit(async () => await this.init());
    }

    static async create(signerService: SignerService) {
        const service = new MessagingService(signerService);
        await service.init();
        return service;
    }

    async init() {
        const { messagingMethod, natsServerUrl } = messagingConfigs()[this._signerService.chainId];
        if (natsServerUrl && messagingMethod === MessagingMethod.Nats) {
            this._jsonCodec = JSONCodec();
            try {
                let protocol = "ws";
                if (natsServerUrl.indexOf("https://") === 0) {
                    protocol = "wss";
                }
                const timeout = 3000;
                // this race condition duplicate timeout is there because unable to catch the error that occurs when NATS.ws timeouts
                const connection = await Promise.race<NatsConnection | undefined>([
                    connect({
                        servers: `${protocol}://${natsServerUrl}`,
                        timeout,
                        pingInterval: 50 * 1000,
                    }),
                    new Promise<undefined>((resolve) => setTimeout(resolve, timeout)),
                ]);

                if (!connection) return;
                this._natsConnection = connection;
            } catch (err) {
                console.log(err);
            }
        }
    }

    async subscribeTo({ subject, messageHandler }: { subject: string; messageHandler: (data: IMessage) => void }) {
        if (!this._natsConnection) {
            return;
        }
        const subscription = this._natsConnection.subscribe(subject, {
            callback: (err, msg) => {
                if (err) {
                    console.error(`Nats error:${err.message}`);
                    return;
                }
                const decodedMessage = this._jsonCodec?.decode(msg.data) as IMessage;
                messageHandler(decodedMessage);
            },
        });
        this._subscriptions.push(subscription);
        return subscription.getID();
    }

    async unsubscribeFrom(subscriptionId: number) {
        const i = this._subscriptions.findIndex((s) => s.getID() === subscriptionId);
        if (i !== -1) {
            this._subscriptions.splice(i, 1)[0].unsubscribe();
        }
    }

    async publish(subject: string, data: Uint8Array) {
        this._natsConnection.publish(subject, data);
    }
}
