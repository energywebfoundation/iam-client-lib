import { NatsConnection, JSONCodec, Codec, connect, Subscription } from "nats.ws";
import { w3cwebsocket } from "websocket";
import { IMessagesHandler } from "./messaging_factory";

globalThis.WebSocket = w3cwebsocket; /** required by nats.ws to work both - node.js 12+ and browsers */

export class NatsHandler implements IMessagesHandler {
    private _jsonCodec: Codec<Record<string, any>>;
    private _natsConnection: NatsConnection | undefined;
    private static CONNECT_TIMEOUT = 3000;
    private static PING_INTERVAL = 50 * 1000;

    isConnected(): boolean {
        return !!this._natsConnection;
    }

    public publish<T extends Record<string, any>>(subject: string, message: T) {
        this._natsConnection?.publish(subject, this._jsonCodec?.encode(message));
    }

    public subscribe<T extends Record<string, any>>(
        subject: string,
        messageHandler: (data: T) => void,
    ): Subscription | undefined {
        return this._natsConnection?.subscribe(subject, {
            callback: (err, msg) => {
                if (err) {
                    console.error(`Nats error:${err.message}`);
                    return;
                }
                const decodedMessage = this._jsonCodec?.decode(msg.data) as T;
                messageHandler(decodedMessage);
            },
        });
    }

    static async init(natsServerUrl: string): Promise<IMessagesHandler> {
        const handler = new NatsHandler();

        try {
            if (!natsServerUrl) throw new Error("natsServerUrl not provided");
            handler._jsonCodec = JSONCodec();

            const protocol = natsServerUrl.startsWith("https://") ? "wss" : "ws";
            // this race condition duplicate timeout is there because unable to catch the error that occurs when NATS.ws timeouts
            const connection = await Promise.race<NatsConnection | undefined>([
                connect({
                    servers: `${protocol}://${natsServerUrl}`,
                    timeout: NatsHandler.CONNECT_TIMEOUT,
                    pingInterval: NatsHandler.PING_INTERVAL,
                }),
                new Promise<undefined>((resolve) => setTimeout(resolve, NatsHandler.CONNECT_TIMEOUT)),
            ]);
            handler._natsConnection = connection;
        } catch (err) {
            console.log(err);
        }

        return handler;
    }
}
