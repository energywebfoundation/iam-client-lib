'use strict';

var tslib_es6_js = require('/home/ubuntu/Develop/energyweb/iam-client-lib/node_modules/tslib/tslib.es6.js');
var didkitWasm = require('didkit-wasm');
var didkitWasm$1 = require('@spruceid/didkit-wasm');
var index = require('./index.js');
require('ethers');
require('base64url');
require('@walletconnect/ethereum-provider');
require('@ew-did-registry/did');
require('@ew-did-registry/did-ethr-resolver');
require('@energyweb/credential-governance');
require('@energyweb/ekc');
require('@ethersproject/properties');
require('ethers/lib/utils');
require('@metamask/detect-provider');
require('@walletconnect/client');
require('@walletconnect/qrcode-modal');
require('@gnosis.pm/safe-apps-provider');
require('multiformats/cid');
require('@ew-did-registry/keys');
require('@ew-did-registry/jwt');
require('@ew-did-registry/proxyidentity');
require('@ew-did-registry/did-resolver-interface');
require('@ew-did-registry/did-document');
require('@ew-did-registry/did-ipfs-store');
require('@ew-did-registry/claims');
require('ts-interface-checker');
require('@ew-did-registry/credentials-interface');
require('lodash');
require('nats.ws');
require('axios');
require('qs');
require('set-cookie-parser');
require('axios-retry');
require('siwe');
require('eth-ens-namehash');
require('jsonwebtoken');
require('uuid');
require('@energyweb/onchain-claims');
require('@energyweb/vc-verification');
require('@ew-did-registry/revocation');
require('@sphereon/pex');

class VerifiableCredentialsServiceWeb extends index.VerifiableCredentialsServiceBase {
    constructor(_signerService, _cacheClient) {
        super(_signerService, _cacheClient);
        this.completeIssueCredential = didkitWasm.completeIssueCredential;
        this.prepareIssueCredential = didkitWasm.prepareIssueCredential;
        this.verifyCredential = didkitWasm.verifyCredential;
        this.prepareIssuePresentation = didkitWasm$1.prepareIssuePresentation;
        this.completeIssuePresentation = didkitWasm$1.completeIssuePresentation;
        this.verifyPresentation = didkitWasm.verifyPresentation;
    }
    static create(signerService, cacheClient) {
        return tslib_es6_js.__awaiter(this, void 0, void 0, function* () {
            const service = new VerifiableCredentialsServiceWeb(signerService, cacheClient);
            return service;
        });
    }
}

exports.VerifiableCredentialsServiceWeb = VerifiableCredentialsServiceWeb;
//# sourceMappingURL=verifiable-credentials-web.service-468516dc.js.map
