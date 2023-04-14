import { SubscribeToOptions } from './messaging.types';
import { SignerService } from '../signer/signer.service';
/**
 * Service responsible for handling the messaging via NATS.
 *
 * ```typescript
 * const { messagingService } = await initWithPrivateKeySigner(privateKey, rpcUrl);
 * messagingService.subscribeTo(...);
 * ```
 */
export declare class MessagingService {
    private _signerService;
    private _jsonCodec;
    private _natsConnection;
    private _subscriptions;
    private _natsEnvironmentName;
    constructor(_signerService: SignerService);
    static create(signerService: SignerService): Promise<MessagingService>;
    init(): Promise<void>;
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
    subscribeTo({ subject, messageHandler, }: SubscribeToOptions): Promise<number | undefined>;
    /**
     * Unsubscribe from the given subscription id.
     *
     * ```typescript
     * messagingService.unsubscribeFrom(55);
     * ```
     * @param {Number} subscriptionId subscription id
     */
    unsubscribeFrom(subscriptionId: number): Promise<void>;
    /**
     * Publish a message with data to the given subject.
     *
     * ```typescript
     * messagingService.publish('*.*.did:ethr:volta:0x00..0.ewf-volta', Uint8Array.from('Hello World'));
     * ```
     * @param {String} subject message subject
     * @param {Uint8Array} data message data
     */
    publish(subject: string, data: Uint8Array): void;
}
