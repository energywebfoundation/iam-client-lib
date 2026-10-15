import {
  Codec,
  connect,
  JSONCodec,
  NatsConnection,
  Subscription,
} from 'nats.ws';
import { getMessagingConfig } from '../../config/messaging.config';
import {
  IMessage,
  MessagingMethod,
  SubscribeToOptions,
} from './messaging.types';
import { SignerService } from '../signer/signer.service';
import {
  executionEnvironment,
  ExecutionEnvironment,
} from '../../utils/detect-environment';
import { getLogger } from '../../config/logger.config';

/**
 * Service responsible for handling the messaging via NATS.
 *
 * ```typescript
 * const { messagingService } = await initWithPrivateKeySigner(privateKey, rpcUrl);
 * messagingService.subscribeTo(...);
 * ```
 */
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

  /**
   * Subscribe to messages on the given subject.
   *
   * ```typescript
   * messagingService.subscribeTo({
   *     subject: '*.*.did:ethr:volta:0x00..0.ewf-volta',
   *     messageHandler: (data) => console.log(data),
   * });
   * ```
   * @param {SubscribeToOptions} options object with options
   * @return subscription id
   */
  async subscribeTo({
    subject = `*.*.${this._signerService.did}.${this._natsEnvironmentName}`,
    messageHandler,
  }: SubscribeToOptions): Promise<number | undefined> {
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

  /**
   * Unsubscribe from the given subscription id.
   *
   * ```typescript
   * messagingService.unsubscribeFrom(55);
   * ```
   * @param {Number} subscriptionId subscription id
   */
  async unsubscribeFrom(subscriptionId: number): Promise<void> {
    const i = this._subscriptions.findIndex(
      (s) => s.getID() === subscriptionId
    );
    if (i !== -1) {
      this._subscriptions.splice(i, 1)[0].unsubscribe();
    }
  }

  /**
   * Publish a message with data to the given subject.
   *
   * ```typescript
   * messagingService.publish('*.*.did:ethr:volta:0x00..0.ewf-volta', Uint8Array.from('Hello World'));
   * ```
   * @param {String} subject message subject
   * @param {Uint8Array} data message data
   */
  publish(subject: string, data: Uint8Array): void {
    this._natsConnection?.publish(subject, data);
  }
}
