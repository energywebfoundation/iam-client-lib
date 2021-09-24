import { messagingOptions } from "../src/iam/chainConfig";
import { VOLTA_CHAIN_ID } from "../src/utils/constants";
import { MessagingFactory } from "../src/messaging/messaging_factory";

export const messagingTests = () => {
    test("nats - handler publish and subcribe succesfully", async () => {
        const _messagingOptions = messagingOptions[VOLTA_CHAIN_ID];
        const messageHandler = await MessagingFactory.build(_messagingOptions);

        await expect(messageHandler.isConnected()).toBeTruthy();

        const results = await Promise.all([
            new Promise((resolve) => {
                messageHandler.subscribe<any>("testchannel", (msgStr) => resolve(msgStr));
            }),
            messageHandler?.publish("testchannel", { message: "NATS IS WORKING ON NODE.JS" }),
        ]);
        await expect(results[0]).toEqual({ message: "NATS IS WORKING ON NODE.JS" });
    });

    test("nats - no handler returned if messaging options missing", async () => {
        const messageHandler = await MessagingFactory.build(undefined);
        await expect(messageHandler.isConnected()).toBeFalsy();
    });
};
