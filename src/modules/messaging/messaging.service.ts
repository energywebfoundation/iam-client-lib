import {
  Codec,
  connect,
  JSONCodec,
  NatsConnection,
  Subscription,
} from 'nats.ws';
import { getMessagingConfig } from '../../config/messaging.config';
import { IMessage, MessagingMethod } from './messaging.types';
import { SignerService } from '../signer/signer.service';
import {
  executionEnvironment,
  ExecutionEnvironment,
} from '../../utils/detectEnvironment';
import { getLogger } from '../../config/logger.config';

export class MessagingService {
  private _jsonCodec: Codec<unknown>;
  private _natsConnection: NatsConnection;
  private _subscriptions: Subscription[] = [];
  private _natsEnvironmentName: string;
  constructor(private _signerService: SignerService) {
    this._signerService.onInit(this.init.bind(this));
  }

  static async create(signerService: SignerService) {
    const service = new MessagingService(signerService);
    await service.init();
    return service;
  }

  async init() {
    // Currently there is no supported messaging method for node.js
    if (executionEnvironment() === ExecutionEnvironment.NODE) {
      return;
    }
    const { messagingMethod, natsServerUrl, natsEnvironmentName } =
      getMessagingConfig()[this._signerService.chainId];
    if (natsServerUrl && messagingMethod === MessagingMethod.Nats) {
      this._natsEnvironmentName = natsEnvironmentName;
      this._jsonCodec = JSONCodec();
      try {
        const timeout = 3000;
        // this race condition duplicate timeout is there because unable to catch the error that occurs when NATS.ws timeouts
        const connection = await Promise.race<NatsConnection | undefined>([
          connect({
            servers: natsServerUrl.replace('http', 'ws'),
            timeout,
            pingInterval: 50 * 1000,
            reconnect: true,
            waitOnFirstConnect: true,
            verbose: true,
            maxReconnectAttempts: -1,
          }),
          new Promise<undefined>((resolve) => setTimeout(resolve, timeout)),
        ]);

        if (!connection) return;
        this._natsConnection = connection;
      } catch (err) {
        getLogger().info(err);
      }
    }
  }

  async subscribeTo({
    subject = `*.*.${this._signerService.did}.${this._natsEnvironmentName}`,
    messageHandler,
  }: {
    subject?: string;
    messageHandler: (data: IMessage) => void;
  }) {
    if (!this._natsConnection) {
      return;
    }
    const subscription = this._natsConnection.subscribe(subject, {
      callback: (err, msg) => {
        if (err) {
          getLogger().error(`Nats error:${err.message}`);
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
    const i = this._subscriptions.findIndex(
      (s) => s.getID() === subscriptionId
    );
    if (i !== -1) {
      this._subscriptions.splice(i, 1)[0].unsubscribe();
    }
  }

  async publish(subject: string, data: Uint8Array) {
    this._natsConnection?.publish(subject, data);
  }
}
