// We were previously checking if were inBrowser because there was no way to setup Signer in node.
// However, we can now set the signer by passing in the privateKey and so this check isn't needed.
// TODO: Remove references to this function. One thing to check is that NATS works in node.
export const isBrowser = () => true;
