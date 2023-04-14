import { __awaiter } from '/home/ubuntu/Develop/energyweb/iam-client-lib/node_modules/tslib/tslib.es6.js';
import { completeIssueCredential, prepareIssueCredential, verifyCredential, verifyPresentation } from 'didkit-wasm';
import { prepareIssuePresentation, completeIssuePresentation } from '@spruceid/didkit-wasm';
import { VerifiableCredentialsServiceBase } from './index.js';
import 'ethers';
import 'base64url';
import '@walletconnect/ethereum-provider';
import '@ew-did-registry/did';
import '@ew-did-registry/did-ethr-resolver';
import '@energyweb/credential-governance';
import '@energyweb/ekc';
import '@ethersproject/properties';
import 'ethers/lib/utils';
import '@metamask/detect-provider';
import '@walletconnect/client';
import '@walletconnect/qrcode-modal';
import '@gnosis.pm/safe-apps-provider';
import 'multiformats/cid';
import '@ew-did-registry/keys';
import '@ew-did-registry/jwt';
import '@ew-did-registry/proxyidentity';
import '@ew-did-registry/did-resolver-interface';
import '@ew-did-registry/did-document';
import '@ew-did-registry/did-ipfs-store';
import '@ew-did-registry/claims';
import 'ts-interface-checker';
import '@ew-did-registry/credentials-interface';
import 'lodash';
import 'nats.ws';
import 'axios';
import 'qs';
import 'set-cookie-parser';
import 'axios-retry';
import 'siwe';
import 'eth-ens-namehash';
import 'jsonwebtoken';
import 'uuid';
import '@energyweb/onchain-claims';
import '@energyweb/vc-verification';
import '@ew-did-registry/revocation';
import '@sphereon/pex';

class VerifiableCredentialsServiceWeb extends VerifiableCredentialsServiceBase {
    constructor(_signerService, _cacheClient) {
        super(_signerService, _cacheClient);
        this.completeIssueCredential = completeIssueCredential;
        this.prepareIssueCredential = prepareIssueCredential;
        this.verifyCredential = verifyCredential;
        this.prepareIssuePresentation = prepareIssuePresentation;
        this.completeIssuePresentation = completeIssuePresentation;
        this.verifyPresentation = verifyPresentation;
    }
    static create(signerService, cacheClient) {
        return __awaiter(this, void 0, void 0, function* () {
            const service = new VerifiableCredentialsServiceWeb(signerService, cacheClient);
            return service;
        });
    }
}

export { VerifiableCredentialsServiceWeb };
//# sourceMappingURL=verifiable-credentials-web.service-88b0636c.js.map
