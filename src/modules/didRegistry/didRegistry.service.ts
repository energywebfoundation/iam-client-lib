import { Injectable } from "@nestjs/common";
import { Wallet, providers } from "ethers";
import { EwJsonRpcSigner, EwPrivateKeySigner, IdentityOwner } from "@ew-did-registry/did-ethr-resolver";
import { ProviderTypes } from "@ew-did-registry/did-resolver-interface";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { SignerService } from "../signer/signer.service";
import { ERROR_MESSAGES } from "../../errors";

const { JsonRpcProvider, Web3Provider } = providers;
@Injectable()
export class DidRegistry {
    private _identityOwner: IdentityOwner;
    constructor(private _signerService: SignerService) {}

    async connectToDIDRegistry() {
        const signer = this._signerService.signer;
        const provider = signer.provider;
        const publicKey = this._signerService.publicKey;
        if (signer instanceof Wallet && provider instanceof JsonRpcProvider) {
            this._identityOwner = IdentityOwner.fromPrivateKeySigner(
                new EwPrivateKeySigner(signer.privateKey, {
                    type: ProviderTypes.HTTP,
                    uriOrInfo: provider.connection.url,
                }),
            );
        } else if (provider instanceof WalletConnectProvider) {
            this._identityOwner = IdentityOwner.fromJsonRpcSigner(new EwJsonRpcSigner(provider), publicKey);
        } else if (provider instanceof Web3Provider) {
            this._identityOwner = IdentityOwner.fromJsonRpcSigner(
                new EwJsonRpcSigner(provider.jsonRpcFetchFunc),
                publicKey,
            );
        } else {
            throw new Error(ERROR_MESSAGES.PROVIDER_NOT_INITIALIZED);
        }
    }
}
