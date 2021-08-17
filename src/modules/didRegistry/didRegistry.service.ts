import { Injectable } from "@nestjs/common";
import { IdentityOwner } from "@ew-did-registry/did-ethr-resolver";
import { SignerService } from "../signer/signer.service";
import { Owner } from "./Owner";

@Injectable()
export class DidRegistry {
    private _identityOwner: IdentityOwner;
    constructor(private _signerService: SignerService) {}

    async connectToDIDRegistry() {
        this._identityOwner = new IdentityOwner.fromJsonRpcSigner(
          this._signerService.signer.
        );
        await this.setDocument();
        this.setClaims();
    }
}
