import { __awaiter, __asyncValues, __rest } from '/home/ubuntu/Develop/energyweb/iam-client-lib/node_modules/tslib/tslib.es6.js';
import { Signer, providers, Wallet, BigNumber, utils, ContractFactory, Contract } from 'ethers';
import base64url from 'base64url';
import WalletConnectProvider from '@walletconnect/ethereum-provider';
import { Chain, Methods, isValidErc1056EWC, isValidErc1056VOLTA } from '@ew-did-registry/did';
import { VoltaAddress1056, addressOf, EwSigner, Operator } from '@ew-did-registry/did-ethr-resolver';
import { VOLTA_ENS_REGISTRY_ADDRESS, VOLTA_RESOLVER_V2_ADDRESS, VOLTA_RESOLVER_V1_ADDRESS, VOLTA_PUBLIC_RESOLVER_ADDRESS, VOLTA_DOMAIN_NOTIFER_ADDRESS, VOLTA_IDENTITY_MANAGER_ADDRESS, VOLTA_CLAIM_MANAGER_ADDRESS, VOLTA_CLAIMS_REVOCATION_REG_ADDR, EWC_CHAIN_ID, EWC_ENS_REGISTRY_ADDRESS, EWC_RESOLVER_V2_ADDRESS, EWC_PUBLIC_RESOLVER_ADDRESS, EWC_DOMAIN_NOTIFER_ADDRESS, EWC_IDENTITY_MANAGER_ADDRESS, EWC_ADDRESS_1056, EWC_CLAIM_MANAGER_ADDRESS, EWC_CLAIMS_REVOCATION_REG_ADDR, VOLTA_CHAIN_ID as VOLTA_CHAIN_ID$1, DomainReader, ResolverContractType, DomainTransactionFactoryV2, DomainHierarchy, PreconditionType } from '@energyweb/credential-governance';
export { PreconditionType } from '@energyweb/credential-governance';
import EKC from '@energyweb/ekc';
import { resolveProperties } from '@ethersproject/properties';
import { computeAddress } from 'ethers/lib/utils';
import detectMetamask from '@metamask/detect-provider';
import WalletConnect from '@walletconnect/client';
import QRCodeModal from '@walletconnect/qrcode-modal';
import { SafeAppProvider } from '@gnosis.pm/safe-apps-provider';
import { CID } from 'multiformats/cid';
import { KeyType, privToPem } from '@ew-did-registry/keys';
import { JWT, Algorithms } from '@ew-did-registry/jwt';
import { ProxyOperator } from '@ew-did-registry/proxyidentity';
import { DIDAttribute, PubKeyType, Encoding, KeyTags, ProviderTypes } from '@ew-did-registry/did-resolver-interface';
export { DIDAttribute, PubKeyType } from '@ew-did-registry/did-resolver-interface';
import { DIDDocumentFull } from '@ew-did-registry/did-document';
import { DidStore } from '@ew-did-registry/did-ipfs-store';
import { ProofVerifier, ClaimsUser, ClaimsIssuer, hashes } from '@ew-did-registry/claims';
import { createCheckers, iface, enumtype, opt } from 'ts-interface-checker';
import { isVerifiableCredential, VC_API_EXCHANGE, VpRequestQueryType, CredentialType } from '@ew-did-registry/credentials-interface';
import { has } from 'lodash';
import { JSONCodec, connect } from 'nats.ws';
import axios from 'axios';
import { stringify } from 'qs';
import setCookie from 'set-cookie-parser';
import axiosRetry from 'axios-retry';
import { SiweMessage } from 'siwe';
import { normalize } from 'eth-ens-namehash';
import jsonwebtoken from 'jsonwebtoken';
import { v4 } from 'uuid';
import { ClaimRevocation } from '@energyweb/onchain-claims';
import { isEIP191Jwt, IpfsCredentialResolver, EthersProviderIssuerResolver, EthersProviderRevokerResolver, RevocationVerification, IssuerVerification } from '@energyweb/vc-verification';
import { StatusListEntryVerification } from '@ew-did-registry/revocation';
import { PEX } from '@sphereon/pex';

var ERROR_MESSAGES;
(function (ERROR_MESSAGES) {
    ERROR_MESSAGES["UNKNOWN_PROVIDER"] = "Unknown provider type";
    ERROR_MESSAGES["ENS_TYPE_NOT_SUPPORTED"] = "ENS type not supported";
    ERROR_MESSAGES["WALLET_PROVIDER_NOT_SUPPORTED"] = "Wallet provider must be a supported value";
    ERROR_MESSAGES["NON_ETH_SIGN_SIGNATURE"] = "Signature is not eth_sign verifiable";
    ERROR_MESSAGES["ORG_WITH_APPS"] = "You are not able to remove organization with registered apps";
    ERROR_MESSAGES["ORG_WITH_ROLES"] = "You are not able to remove organization with registered roles";
    ERROR_MESSAGES["APP_WITH_ROLES"] = "You are not able to remove application with registered roles";
    ERROR_MESSAGES["METAMASK_PROVIDER_NOT_DETECTED"] = "Metamask provider not detected";
    ERROR_MESSAGES["METAMASK_ACCOUNT_NOT_PROVIDED"] = "Metamask account not provided";
    ERROR_MESSAGES["ROLE_PREREQUISITES_NOT_MET"] = "Enrolment subject doesn't have required roles";
    ERROR_MESSAGES["ROLE_NOT_EXISTS"] = "Role you want to enroll to does not exists";
    ERROR_MESSAGES["CAN_NOT_UPDATE_NOT_CONTROLLED_DOCUMENT"] = "Can not update not controlled document";
    ERROR_MESSAGES["CAN_NOT_UPDATE_DOCUMENT_PROPERTIES_INVALID_OR_MISSING"] = "Cannot update document. Properties invalid or missing: ";
    ERROR_MESSAGES["ONCHAIN_ROLE_VERSION_NOT_SPECIFIED"] = "On-chain role version not specified";
    ERROR_MESSAGES["WITHDRAWAL_WAS_NOT_REQUESTED"] = "Stake withdrawal was not requested";
    ERROR_MESSAGES["STAKE_WAS_NOT_PUT"] = "Stake was not put";
    ERROR_MESSAGES["INSUFFICIENT_BALANCE"] = "Signer has insufficient balance";
    ERROR_MESSAGES["NOT_AUTHORIZED_TO_CHANGE_DOMAIN"] = "Not authorized to change domain";
    ERROR_MESSAGES["ERROR_IN_AZURE_PROVIDER"] = "Error in Azure Provider";
    ERROR_MESSAGES["JWT_ALGORITHM_NOT_SUPPORTED"] = "Jwt algorithm not supported";
    ERROR_MESSAGES["CLAIM_WAS_NOT_ISSUED"] = "Claim was not issued";
    ERROR_MESSAGES["PUBLISH_NOT_ISSUED_CLAIM"] = "Claim to publish has not been issued";
    ERROR_MESSAGES["CLAIM_TYPE_REQUIRED_FOR_ON_CHAIN_REGISTRATION"] = "claimType required for on-chain registration";
    ERROR_MESSAGES["TOKEN_REQUIRED_FOR_OFF_CHAIN_REGISTRATION"] = "token required for off-chain registration";
    ERROR_MESSAGES["ENS_OWNER_NOT_VALID_ADDRESS"] = "Provided owner is not a valid address. Owner of ENS domain must be an address";
    ERROR_MESSAGES["IS_ETH_SIGNER_NOT_SET"] = "Can not determine if signer is conformant with eth_sign specification";
    ERROR_MESSAGES["SIGN_TYPED_DATA_NOT_SUPPORTED"] = "Sign typed data not supported";
    ERROR_MESSAGES["CLAIM_TYPE_MISSING"] = "Claim type is required for On-chain registration";
    ERROR_MESSAGES["ERROR_CONTINUING_EXCHANGE"] = "Error continuing exchange";
    ERROR_MESSAGES["ONCHAIN_ROLE_SUBJECT_AGREEMENT_NOT_SPECIFIED"] = "On-chain role subject agreement not specified";
    ERROR_MESSAGES["REVOKE_CLAIM_MISSING_PARAMETERS"] = "Revoke claim missing parameters. Required one of: claimId or claim";
    ERROR_MESSAGES["REVOKE_CLAIM_NOT_FOUND"] = "Could not find claim to revoke";
    ERROR_MESSAGES["DID_DOCUMENT_NOT_UPDATED"] = "DID Document was not updated";
    ERROR_MESSAGES["PROOF_NOT_VERIFIED"] = "Proof not verified";
    ERROR_MESSAGES["OFFCHAIN_ISSUER_NOT_AUTHORIZED"] = "Issuer of OffChain Claim is not authorized";
    ERROR_MESSAGES["NO_CLAIM_RESOLVED"] = "No claim found for given DID and role";
    ERROR_MESSAGES["CREDENTIAL_EXPIRED"] = "Credential Expired";
    ERROR_MESSAGES["NO_ISSUER_SPECIFIED"] = "No issuer specified for credential";
    ERROR_MESSAGES["CLAIM_DOES_NOT_CONTAIN_TOKEN"] = "Claim does not contain token";
    ERROR_MESSAGES["CLAIM_TOKEN_DATA_MISSING"] = "Claim token payload missing required key";
})(ERROR_MESSAGES || (ERROR_MESSAGES = {}));

const emptyAddress = '0x0000000000000000000000000000000000000000';
const VOLTA_CHAIN_ID = 73799;
const defaultBridgeUrl = 'https://bridge.walletconnect.org';
const defaultKmsServerUrl = 'https://km.aws.energyweb.org/connect/new';
const defaultAzureProxyUrl = 'https://azure-proxy-server.energyweb.org/api/v1';

const VOLTA_STAKING_POOL_FACTORY_ADDRESS = '0x4b2A127680320eD980beAa7aD9b2447B96BC32fC';
/**
 * Set of parameters to configure connection to chain with id received from wallet.
 * If configuration for some chain is missing or should be reconfigured use `setChainConfig` before class instantiation
 */
const chainConfig = {
    [VOLTA_CHAIN_ID]: {
        chainName: Chain.VOLTA,
        chainDisplayName: 'Energy Web Volta Testnet',
        rpcUrl: 'https://volta-rpc.energyweb.org/',
        ensRegistryAddress: VOLTA_ENS_REGISTRY_ADDRESS,
        ensResolverV2Address: VOLTA_RESOLVER_V2_ADDRESS,
        ensResolverAddress: VOLTA_RESOLVER_V1_ADDRESS,
        ensPublicResolverAddress: VOLTA_PUBLIC_RESOLVER_ADDRESS,
        domainNotifierAddress: VOLTA_DOMAIN_NOTIFER_ADDRESS,
        assetManagerAddress: VOLTA_IDENTITY_MANAGER_ADDRESS,
        didRegistryAddress: VoltaAddress1056,
        claimManagerAddress: VOLTA_CLAIM_MANAGER_ADDRESS,
        stakingPoolFactoryAddress: VOLTA_STAKING_POOL_FACTORY_ADDRESS,
        // TODO: add addresses to @energyweb/credential-governance
        credentialRevocationRegistryAddress: '0x018Ae0454a3e2f77048a455dD731bB669a218959',
        claimsRevocationRegistryAddress: VOLTA_CLAIMS_REVOCATION_REG_ADDR,
    },
    [EWC_CHAIN_ID]: {
        chainName: Chain.EWC,
        chainDisplayName: 'Energy Web Chain',
        rpcUrl: 'https://rpc.energyweb.org/',
        ensRegistryAddress: EWC_ENS_REGISTRY_ADDRESS,
        ensResolverV2Address: EWC_RESOLVER_V2_ADDRESS,
        ensResolverAddress: EWC_RESOLVER_V2_ADDRESS,
        ensPublicResolverAddress: EWC_PUBLIC_RESOLVER_ADDRESS,
        domainNotifierAddress: EWC_DOMAIN_NOTIFER_ADDRESS,
        assetManagerAddress: EWC_IDENTITY_MANAGER_ADDRESS,
        didRegistryAddress: EWC_ADDRESS_1056,
        claimManagerAddress: EWC_CLAIM_MANAGER_ADDRESS,
        stakingPoolFactoryAddress: '',
        credentialRevocationRegistryAddress: '',
        claimsRevocationRegistryAddress: EWC_CLAIMS_REVOCATION_REG_ADDR,
    },
};
const chainConfigs = () => (Object.assign({}, chainConfig));
/**
 * Used to override existing chain configuration or add a missing one
 * Configuration must be set before constructing `IAM`
 */
const setChainConfig = (chainId, config) => {
    chainConfig[chainId] = Object.assign(Object.assign({}, chainConfig[chainId]), config);
};

var ExecutionEnvironment;
(function (ExecutionEnvironment) {
    ExecutionEnvironment["NODE"] = "ExecutionEnvironment:Node";
    ExecutionEnvironment["BROWSER"] = "ExecutionEnvironment:Browser";
})(ExecutionEnvironment || (ExecutionEnvironment = {}));
const executionEnvironment = () => isNode() && !isBrowser()
    ? ExecutionEnvironment.NODE
    : ExecutionEnvironment.BROWSER;
const isNode = () => typeof process !== 'undefined' &&
    process.versions != null &&
    process.versions.node != null;
const isBrowser = () => typeof window !== 'undefined' && typeof window.document !== 'undefined';

var ProviderType;
(function (ProviderType) {
    ProviderType["WalletConnect"] = "WalletConnect";
    ProviderType["EwKeyManager"] = "EwKeyManager";
    ProviderType["MetaMask"] = "MetaMask";
    ProviderType["PrivateKey"] = "PrivateKey";
    ProviderType["Gnosis"] = "Gnosis";
    ProviderType["EKC"] = "Enterprise Key Connect";
})(ProviderType || (ProviderType = {}));
var ProviderEvent;
(function (ProviderEvent) {
    /**
     * Metamask events https://docs.metamask.io/guide/ethereum-provider.html#events
     */
    ProviderEvent["AccountChanged"] = "accountsChanged";
    ProviderEvent["NetworkChanged"] = "networkChanged";
    /**
     * WalletConnect events https://docs.walletconnect.com/1.0/client-api#register-event-subscription
     */
    ProviderEvent["Disconnected"] = "disconnect";
    ProviderEvent["SessionUpdate"] = "session_update";
})(ProviderEvent || (ProviderEvent = {}));
const PUBLIC_KEY = 'PublicKey';
const IS_ETH_SIGNER = 'isEthSigner';

class ENSTypeNotSupportedError extends Error {
    constructor() {
        super(ERROR_MESSAGES.ENS_TYPE_NOT_SUPPORTED);
    }
}

class MethodNotAvailableInNodeEnvError extends Error {
    constructor(methodName) {
        super(`Method ${methodName} not supported in Node.js env`);
    }
}

class ChangeOwnershipNotPossibleError extends Error {
    constructor({ namespace, notOwnedNamespaces, }) {
        super(`Change ownership of ${namespace} not possible because you're not owner of ${notOwnedNamespaces.join(', ')} ${notOwnedNamespaces.length > 1 ? 'namespaces' : 'namespace'}`);
    }
}

class DeletingNamespaceNotPossibleError extends Error {
    constructor({ namespace, notOwnedNamespaces, }) {
        super(`Deleting ${namespace} not possible because you're not owner of ${notOwnedNamespaces.join(', ')} ${notOwnedNamespaces.length > 1 ? 'namespaces' : 'namespace'}`);
    }
}

class ENSOwnerNotValidAddressError extends Error {
    constructor(providedOwner) {
        super(`Provided owner param: ${providedOwner}. ${ERROR_MESSAGES.ENS_OWNER_NOT_VALID_ADDRESS}`);
    }
}

class MalformedDIDError extends Error {
    constructor(did) {
        super(`${did} is malformed`);
    }
}

class NotAuthorizedIssuer extends Error {
    constructor(issuer, role) {
        super(`${issuer} is not authorized to issue ${role}`);
    }
}

class AssetNotExist extends Error {
    constructor(assetId) {
        super(`Asset ${assetId} doesn not exist`);
    }
}

class InterfaceNotSatisfied extends Error {
    constructor(interf, reason) {
        super(`Interface ${interf} is not satisfied: ${reason}`);
    }
}

class EkcSigner extends Signer {
    constructor(ekc) {
        super();
        this.ekc = ekc;
        this._signer = ekc.getSigner();
        this.provider = ekc._getProvider();
    }
    static create(proxyUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ekc = yield EKC.init({ proxyUrl });
                yield ekc.login({ mode: 'popup' });
                return new EkcSigner(ekc);
            }
            catch (error) {
                throw new Error(ERROR_MESSAGES.ERROR_IN_AZURE_PROVIDER);
            }
        });
    }
    getAddress() {
        return this._signer.getAddress();
    }
    signMessage(message) {
        return this._signer.signMessage(message);
    }
    signTransaction(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const resolvedTx = yield resolveProperties(transaction);
            return this._signer.signTransaction(resolvedTx);
        });
    }
    connect(provider) {
        return this._signer.connect(provider);
    }
    _signTypedData() {
        throw new Error(ERROR_MESSAGES.SIGN_TYPED_DATA_NOT_SUPPORTED);
    }
}

const validators = new Map();
function supportedDIDMethods() {
    return Array.from(validators.keys());
}
function isValidDID(did) {
    return Array.from(validators.values()).some((v) => v(did));
}
function addSupportedDID(methodWithChain, validator) {
    validators.set(methodWithChain, validator);
}
addSupportedDID(`${Methods.Erc1056}:${Chain.EWC}`, isValidErc1056EWC);
addSupportedDID(`${Methods.Erc1056}:${Chain.VOLTA}`, isValidErc1056VOLTA);
// matches both legacy (without chain specifier) and chain specific DID
const didPattern = '^(?:did:(?<method>[a-z0-9]+?):)((?<chain>[a-z0-9]+?):)?(?<id>0x[A-Fa-f0-9]{40})$';
/**
 * @description For verification which envolves legacy and chain-specific DID's
 */
function compareDID(didA, didB) {
    const matchA = didA.match(didPattern);
    if (!(matchA === null || matchA === void 0 ? void 0 : matchA.groups)) {
        throw new MalformedDIDError(didA);
    }
    const matchB = didB.match(didPattern);
    if (!(matchB === null || matchB === void 0 ? void 0 : matchB.groups)) {
        throw new MalformedDIDError(didB);
    }
    const { method: methodA, chain: chainA, id: idA, } = matchA.groups;
    const { method: methodB, chain: chainB, id: idB, } = matchB.groups;
    if (idA !== idB) {
        return false;
    }
    if (methodA !== methodB) {
        return false;
    }
    if (chainA && chainB && chainA !== chainB) {
        return false;
    }
    return true;
}

var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["debug"] = 1] = "debug";
    LogLevel[LogLevel["info"] = 2] = "info";
    LogLevel[LogLevel["warn"] = 3] = "warn";
    LogLevel[LogLevel["error"] = 4] = "error";
})(LogLevel || (LogLevel = {}));
/*
 * Abstract overridable class for logger
 */
class ILogger {
    constructor(_logLevel = LogLevel.debug) {
        this._logLevel = _logLevel;
        this.debug = (message) => this.log(message, LogLevel.debug);
        this.info = (message) => this.log(message, LogLevel.info);
        this.warn = (message) => this.log(message, LogLevel.warn);
        this.error = (message) => this.log(message, LogLevel.error);
        this.log = (message, level) => this._logLevel <= level && this._log(message, level);
    }
}
/*
 * Default Implementation of ILogger streaming logs to console
 */
class ConsoleLogger extends ILogger {
    constructor() {
        super(...arguments);
        this._log = (message, level) => {
            switch (level) {
                case LogLevel.debug:
                    console.debug(message);
                    break;
                case LogLevel.info:
                    console.log(message);
                    break;
                case LogLevel.warn:
                    console.warn(message);
                    break;
                case LogLevel.error:
                default:
                    console.error(message);
                    break;
            }
        };
    }
}

let logger = new ConsoleLogger();
/**
 * Used to override existing console logger with custom logger of any type implementing required ILogger interface
 * Configuration must be set before constructing `IAM`
 */
const setLogger = (newLogger) => (logger = newLogger);
/**
 *
 * Returns currently set up logger. Console Logger By default
 * @returns logger
 */
const getLogger = () => logger;

const { arrayify: arrayify$1, keccak256: keccak256$1, recoverPublicKey, getAddress, hashMessage, verifyMessage, } = utils;
/**
 * Service responsible for signing messages and sending transactions to the blockchain
 *
 * ```typescript
 * const { signerService } = await initWithPrivateKeySigner(privateKey, rpcUrl);
 * signerService.signMessage(...);
 * ```
 */
class SignerService {
    constructor(_signer, _providerType) {
        this._signer = _signer;
        this._providerType = _providerType;
        this._servicesInitializers = [];
        this._walletEventListeners = [];
    }
    init() {
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (executionEnvironment() === ExecutionEnvironment.BROWSER) {
                this._publicKey = localStorage.getItem(PUBLIC_KEY);
            }
            this._address = yield this.signer.getAddress();
            this._chainId = (yield this._signer.provider.getNetwork()).chainId;
            this._chainDisplayName = chainConfigs()[this._chainId].chainDisplayName;
            this._chainName = chainConfigs()[this._chainId].chainName;
            if (this._signer instanceof providers.JsonRpcSigner) {
                this._account = (yield this._signer.provider.listAccounts())[0];
            }
            else if (this._signer instanceof Wallet) {
                this._account = this._address;
            }
            // web app is responsible for clearing of isEthSigner on logout
            if (executionEnvironment() === ExecutionEnvironment.BROWSER) {
                const isEthSigner = localStorage.getItem(IS_ETH_SIGNER);
                if (isEthSigner === 'true') {
                    this._isEthSigner = true;
                }
                else if (isEthSigner === 'false') {
                    this._isEthSigner = false;
                }
            }
            else {
                this._setIsEthrSigner();
            }
            /**
             * @todo provide general way to initialize with previously saved key
             */
            this.initEventHandlers();
            try {
                for (var _b = __asyncValues(this._servicesInitializers), _c; _c = yield _b.next(), !_c.done;) {
                    const initializer = _c.value;
                    yield initializer();
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) yield _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        });
    }
    /**
     * Registers reinitialization of dependent service on signer reconnection
     */
    onInit(initializer) {
        this._servicesInitializers.push(initializer);
    }
    emit(e) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all(this._walletEventListeners
                .map(({ event, cb }) => {
                return e === event ? cb() : null;
            })
                .filter(Boolean));
        });
    }
    on(event, cb) {
        this._walletEventListeners.push({ event, cb });
    }
    /**
     * Add event handler for certain events
     * @requires to be called after the connection to wallet was initialized
     */
    initEventHandlers() {
        const accChangedHandler = () => __awaiter(this, void 0, void 0, function* () {
            yield this.closeConnection();
            yield this.init();
        });
        if (this._providerType === ProviderType.MetaMask) {
            this.on(ProviderEvent.AccountChanged, accChangedHandler);
            this.on(ProviderEvent.NetworkChanged, accChangedHandler);
        }
        else if (this._providerType === ProviderType.WalletConnect) {
            this.on(ProviderEvent.SessionUpdate, accChangedHandler);
            this.on(ProviderEvent.Disconnected, this.closeConnection);
        }
    }
    connect(signer, providerType) {
        return __awaiter(this, void 0, void 0, function* () {
            this._signer = signer;
            this._providerType = providerType;
            yield this.init();
        });
    }
    /**
     * The instance of the `ether` library signer in use by the service
     *
     * ```typescript
     * signerService.signer;
     * ```
     *
     * @return signer
     */
    get signer() {
        return this._signer;
    }
    /**
     * If signer is EIP-191 compliant https://eips.ethereum.org/EIPS/eip-191.
     *
     * ```typescript
     * signerService.isEthSigner;
     * ```
     *
     * @return true if the signer is EIP-191 compliant.
     */
    get isEthSigner() {
        return this._isEthSigner;
    }
    /**
     * Get user address.
     *
     * ```typescript
     * signerService.address;
     * ```
     *
     * @return user address
     */
    get address() {
        return this._address;
    }
    /**
     * Get account info, including chain id, chain name and user address.
     *
     * ```typescript
     * signerService.accountInfo;
     * ```
     *
     * @return account info
     */
    get accountInfo() {
        return {
            account: this._account,
            chainId: this._chainId,
            chainName: this._chainDisplayName,
        };
    }
    /**
     * Get connection provider.
     *
     * ```typescript
     * signerService.provider;
     * ```
     *
     * @return connection provider
     */
    get provider() {
        return this._signer.provider;
    }
    /**
     * Get current connection chain id.
     *
     * ```typescript
     * signerService.chainId;
     * ```
     *
     * @return chain id
     */
    get chainId() {
        return this._chainId;
    }
    /**
     * Get provider type of current signer connection.
     *
     * ```typescript
     * signerService.providerType;
     * ```
     *
     * @return provider type
     */
    get providerType() {
        return this._providerType;
    }
    /**
     * Get current user DID
     *
     * ```typescript
     * signerService.did;
     * ```
     *
     * @return DID
     */
    get did() {
        return `did:${Methods.Erc1056}:${this.chainName()}:${this._address}`;
    }
    /**
     * Get current user DID address with hex representation of the chain id.
     *
     * ```typescript
     * signerService.didHex;
     * ```
     *
     * @return DID address
     */
    get didHex() {
        return `did:${Methods.Erc1056}:${`0x${this.chainId.toString(16)}`}:${this._address.toLowerCase()}`;
    }
    /**
     * Get current user balance.
     *
     * ```typescript
     * signerService.getBalance();
     * ```
     *
     * @return user balance
     */
    balance() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.signer.getBalance();
        });
    }
    /**
     * Send transaction to the blockchain.
     *
     * ```typescript
     * signerService.send({
     *     to: ':0x00...0',
     *     data: contract.interface.encodeFunctionData(...)
     * });
     * ```
     *
     * @param {TransactionRequest} options object with options
     * @return transaction receipt
     */
    send({ to, data, value, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const tx = Object.assign({ to, from: this.address, data }, (value && { value: BigNumber.from(value) }));
            const receipt = yield (yield this._signer.sendTransaction(tx)).wait();
            return receipt;
        });
    }
    /**
     * Makes a (readonly) call to a smart contract.
     * https://docs.ethers.io/v5/single-page/#/v5/api/providers/provider/-%23-Provider-call
     *
     * ```typescript
     * signerService.call({
     *     to: ':0x00...0',
     *     data: contract.interface.encodeFunctionData(...)
     * });
     * ```
     *
     * @param {TransactionRequest} options object with options
     * @return the result of the call
     */
    call({ to, data }) {
        return __awaiter(this, void 0, void 0, function* () {
            const tx = { to, from: this.address, data };
            const result = yield this._signer.call(tx);
            return result;
        });
    }
    /**
     * Tries to create `eth_sign` conformant signature (https://eth.wiki/json-rpc/API#eth_sign).
     * Whether or not to hash the message prior to signature is depends on whether is signer EIP-191 compliant.
     * When running in browser `isEthSigner` variable should be stored in local storage.
     *
     * ```typescript
     * signerService.signMessage(arrayify('Hello World'));
     * ```
     *
     * @param {Uint8Array} message The message to be signed. The message should have binary representation to avoid confusion of text with hexadecimal binary data
     * @return the signature
     */
    signMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._isEthSigner === undefined) {
                throw new Error(ERROR_MESSAGES.IS_ETH_SIGNER_NOT_SET);
            }
            const messageHash = this._isEthSigner
                ? message
                : arrayify$1(hashMessage(message));
            const sig = yield this.signer.signMessage(messageHash);
            if (getAddress(this._address) !== getAddress(verifyMessage(message, sig))) {
                throw new Error(ERROR_MESSAGES.NON_ETH_SIGN_SIGNATURE);
            }
            return sig;
        });
    }
    /**
     * Tries to create conformant EIP-712 signature (https://eips.ethereum.org/EIPS/eip-712).
     *
     * ```typescript
     * signerService.signTypedData(
     *     { name: 'MyToken', version: '1.0' },
     *     { Model: [{ name: 'name', type: 'string' }, { name: 'type', type: 'string' }] },
     *     { name: 'MyToken', type: 'erc721' },
     * );
     * ```
     *
     * @param {TypedDataDomain} domain EIP-712 domain object
     * @param {Record<string, Array<TypedDataField>>} types EIP-712 types object
     * @param {Record<string, unknown>} message EIP-712 message object
     * @return the signature
     */
    signTypedData(domain, types, message) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!((_a = this.signer) === null || _a === void 0 ? void 0 : _a._signTypedData)) {
                throw new Error(ERROR_MESSAGES.SIGN_TYPED_DATA_NOT_SUPPORTED);
            }
            delete types['EIP712Domain'];
            return yield this.signer._signTypedData(domain, types, message);
        });
    }
    /**
     * Close connection with the signer wallet.
     *
     * ```typescript
     * signerService.closeConnection();
     * ```
     *
     * @return true if connection was closed
     */
    closeConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._signer instanceof WalletConnectProvider) {
                yield this._signer.disconnect();
            }
            else if (this._signer instanceof EkcSigner) {
                try {
                    yield this._signer.ekc.logout({ mode: 'popup' });
                    return false;
                }
                catch (error) {
                    getLogger().info(`error in azure logout ${error.message}`);
                }
            }
            return true;
        });
    }
    /**
     * Get current user public key.
     *
     * ```typescript
     * signerService.publicKey();
     * ```
     *
     * @return public key
     */
    publicKey() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._publicKey)
                return this._publicKey;
            else if (this._signer instanceof Wallet) {
                this._publicKey = this._signer.publicKey;
            }
            else {
                this._publicKey = (yield this.publicKeyAndIdentityToken()).publicKey;
            }
            return this._publicKey;
        });
    }
    /**
     * Get current chain name.
     *
     * ```typescript
     * signerService.chainName();
     * ```
     *
     * @return chain name
     */
    chainName() {
        return this._chainName;
    }
    /**
     * Generate public key and identity token for authentication purposes.
     *
     * ```typescript
     * signerService.publicKeyAndIdentityToken();
     * ```
     * @param force when true recalculates token even if it is already present
     * @return object with public key and identity token
     */
    publicKeyAndIdentityToken(force = false) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._publicKey || !this._identityToken || force) {
                yield this._calculatePubKeyAndIdentityToken();
            }
            return {
                publicKey: this._publicKey,
                identityToken: this._identityToken,
            };
        });
    }
    /**
     * Generate public key and identity token for authentication purposes.
     *
     * @return object with public key and identity token
     */
    _calculatePubKeyAndIdentityToken() {
        return __awaiter(this, void 0, void 0, function* () {
            const header = {
                alg: 'ES256',
                typ: 'JWT',
            };
            const encodedHeader = base64url(JSON.stringify(header));
            const address = this._address;
            const payload = {
                iss: `did:${Methods.Erc1056}:${this.chainName()}:${address}`,
                claimData: {
                    blockNumber: yield this._signer.provider.getBlockNumber(),
                },
            };
            const encodedPayload = base64url(JSON.stringify(payload));
            const token = `0x${Buffer.from(`${encodedHeader}.${encodedPayload}`).toString('hex')}`;
            // arrayification is necessary for WalletConnect signatures to work. eth_sign expects message in bytes: https://docs.walletconnect.org/json-rpc-api-methods/ethereum#eth_sign
            // keccak256 hash is applied for Metamask to display a coherent hex value when signing
            const message = arrayify$1(keccak256$1(token));
            // Computation of the digest in order to recover the public key under the assumption
            // that signature was performed as per the eth_sign spec (https://eth.wiki/json-rpc/API#eth_sign)
            const digest = arrayify$1(hashMessage(message));
            const sig = yield this._signer.signMessage(message);
            const keyFromMessage = recoverPublicKey(message, sig);
            const keyFromDigest = recoverPublicKey(digest, sig);
            if (getAddress(this._address) === computeAddress(keyFromMessage)) {
                this._publicKey = keyFromMessage;
                this._isEthSigner = false;
            }
            else if (getAddress(this._address) === computeAddress(keyFromDigest)) {
                this._publicKey = keyFromDigest;
                this._isEthSigner = true;
            }
            else {
                throw new Error(ERROR_MESSAGES.NON_ETH_SIGN_SIGNATURE);
            }
            this._identityToken = `${encodedHeader}.${encodedPayload}.${base64url(sig)}`;
        });
    }
    /**
     * Set `_isEthSigner` value based on a signed message.
     * Generates a test message and signs it.
     */
    _setIsEthrSigner() {
        return __awaiter(this, void 0, void 0, function* () {
            // arrayification is necessary for WalletConnect signatures to work. eth_sign expects message in bytes: https://docs.walletconnect.org/json-rpc-api-methods/ethereum#eth_sign
            // keccak256 hash is applied for Metamask to display a coherent hex value when signing
            const message = arrayify$1(keccak256$1('0x'));
            // Computation of the digest in order to recover the public key under the assumption
            // that signature was performed as per the eth_sign spec (https://eth.wiki/json-rpc/API#eth_sign)
            const digest = arrayify$1(hashMessage(message));
            const sig = yield this._signer.signMessage(message);
            const keyFromMessage = recoverPublicKey(message, sig);
            const keyFromDigest = recoverPublicKey(digest, sig);
            if (getAddress(this._address) === computeAddress(keyFromMessage)) {
                this._publicKey = keyFromMessage;
                this._isEthSigner = false;
            }
            else if (getAddress(this._address) === computeAddress(keyFromDigest)) {
                this._publicKey = keyFromDigest;
                this._isEthSigner = true;
            }
            else {
                throw new Error(ERROR_MESSAGES.NON_ETH_SIGN_SIGNATURE);
            }
        });
    }
}

const { JsonRpcProvider: JsonRpcProvider$1 } = providers;
const fromPrivateKey = (privateKey, rpcUrl) => __awaiter(void 0, void 0, void 0, function* () {
    const provider = new JsonRpcProvider$1({ url: rpcUrl });
    const signerService = new SignerService(new Wallet(privateKey).connect(provider), ProviderType.PrivateKey);
    yield signerService.init();
    return signerService;
});

const fromMetaMask = () => __awaiter(void 0, void 0, void 0, function* () {
    const provider = yield createMetamaskProvider();
    const signer = new providers.Web3Provider(provider).getSigner();
    getLogger().info(`metamask chain id: ${(yield signer.provider.getNetwork()).chainId}}`);
    const signerService = new SignerService(signer, ProviderType.MetaMask);
    provider.on(ProviderEvent.AccountChanged, () => signerService.emit(ProviderEvent.AccountChanged));
    provider.on(ProviderEvent.NetworkChanged, () => signerService.emit(ProviderEvent.NetworkChanged));
    yield signerService.init();
    return signerService;
});
const createMetamaskProvider = () => __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const metamaskProvider = yield detectMetamask({
        mustBeMetaMask: true,
    });
    if (!metamaskProvider) {
        throw new Error(ERROR_MESSAGES.METAMASK_PROVIDER_NOT_DETECTED);
    }
    const requestObject = {
        method: 'eth_accounts',
        params: [
            {
                eth_accounts: {},
            },
        ],
    };
    const accounts = yield metamaskProvider.request(requestObject);
    if (accounts.length < 1) {
        yield metamaskProvider.request({
            method: 'wallet_requestPermissions',
            params: [
                {
                    eth_accounts: {},
                },
            ],
        });
    }
    return metamaskProvider;
});
const isMetamaskExtensionPresent = () => __awaiter(void 0, void 0, void 0, function* () {
    const provider = (yield detectMetamask({ mustBeMetaMask: true }));
    const chainId = provider && 'request' in provider && provider.request instanceof Function
        ? (yield (provider === null || provider === void 0 ? void 0 : provider.request({
            method: 'eth_chainId',
        })))
        : undefined;
    return { isMetamaskPresent: !!provider, chainId };
});

const fromWalletConnectMetamask = (bridge, infuraId) => __awaiter(void 0, void 0, void 0, function* () {
    const walletProvider = createWalletConnectProvider(bridge, infuraId);
    yield walletProvider.enable();
    const provider = new providers.Web3Provider(walletProvider);
    const signerService = new SignerService(provider.getSigner(), ProviderType.WalletConnect);
    walletProvider.on(ProviderEvent.Disconnected, () => signerService.emit(ProviderEvent.Disconnected));
    walletProvider.on(ProviderEvent.SessionUpdate, () => signerService.emit(ProviderEvent.SessionUpdate));
    yield signerService.init();
    return signerService;
});
const createWalletConnectProvider = (bridge, infuraId) => {
    const rpc = Object.entries(chainConfigs()).reduce((urls, [id, config]) => (Object.assign(Object.assign({}, urls), { [id]: config.rpcUrl })), {});
    const walletConnectProvider = new WalletConnectProvider({
        rpc,
        connector: new Connector({ bridge, qrcodeModal: QRCodeModal }),
        infuraId,
    });
    return walletConnectProvider;
};
class Connector extends WalletConnect {
    createSession(opts) {
        const _super = Object.create(null, {
            createSession: { get: () => super.createSession }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.createSession.call(this, opts);
        });
    }
}

function fromKms(bridge, kmsServerUrl, infuraId) {
    return __awaiter(this, void 0, void 0, function* () {
        const walletConnectProvider = createWalletConnectProvider(bridge, infuraId);
        walletConnectProvider.on('display_uri', (_, payload) => {
            const wcUri = payload.params[0];
            const encoded = encodeURIComponent(wcUri);
            const hasQueryString = kmsServerUrl.includes('?');
            const url = `${kmsServerUrl}${hasQueryString ? '&' : '?'}uri=${encoded}`;
            window.open(url, 'ew_key_manager');
        });
        yield walletConnectProvider.enable();
        const provider = new providers.Web3Provider(walletConnectProvider);
        const signerService = new SignerService(provider.getSigner(), ProviderType.WalletConnect);
        yield signerService.init();
        return signerService;
    });
}

/**
 * @description Intended for use in Volta Gnosis web interface(https://volta.gnosis-safe.io/).
 * Dapp should provide SafeAppSdk injected by Gnosis interface
 */
const fromGnosis = (safeAppSdk) => __awaiter(void 0, void 0, void 0, function* () {
    const gnosisProvider = new SafeAppProvider(yield safeAppSdk.safe.getInfo(), safeAppSdk);
    const provider = new providers.Web3Provider(gnosisProvider);
    const signerService = new SignerService(provider.getSigner(), ProviderType.Gnosis);
    return signerService;
});

/* Autogenerated file. Do not edit manually. */
const _abi$4 = [
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "_ownerRole",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "_claimManager",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "sender",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "time",
                type: "uint256",
            },
        ],
        name: "StakeAdded",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "sender",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "StakeWithdrawn",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "funded",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "timestamp",
                type: "uint256",
            },
        ],
        name: "StakingPoolInitialized",
        type: "event",
    },
    {
        inputs: [],
        name: "claimManager",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "ratio",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "principal",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "compoundStart",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "compoundEnd",
                type: "uint256",
            },
        ],
        name: "compound",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "contributionLimit",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "end",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "hardCap",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "hourlyRatio",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_start",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_end",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_hourlyRatio",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_hardCap",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_contributionLimit",
                type: "uint256",
            },
            {
                internalType: "bytes32[]",
                name: "_patronRoles",
                type: "bytes32[]",
            },
        ],
        name: "init",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [],
        name: "stake",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        name: "stakes",
        outputs: [
            {
                internalType: "uint256",
                name: "deposit",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "compounded",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "time",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "futureReward",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "start",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "sweep",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "sweeped",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "terminate",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "total",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "totalStaked",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
        ],
        name: "unstake",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "unstakeAll",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
const _bytecode$4 = "0x60806040523480156200001157600080fd5b5060405162002eb938038062002eb98339818101604052810190620000379190620000b4565b81600881905550806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505062000172565b60008151905062000097816200013e565b92915050565b600081519050620000ae8162000158565b92915050565b60008060408385031215620000ce57620000cd62000139565b5b6000620000de858286016200009d565b9250506020620000f18582860162000086565b9150509250929050565b6000620001088262000119565b9050919050565b6000819050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600080fd5b6200014981620000fb565b81146200015557600080fd5b50565b62000163816200010f565b81146200016f57600080fd5b50565b612d3780620001826000396000f3fe6080604052600436106100fe5760003560e01c806368eb7a6911610095578063a9a36dcd11610064578063a9a36dcd146102c1578063be9a6555146102ec578063eb01393314610317578063efbe1c1c14610342578063fb86a4041461036d576100fe565b806368eb7a69146102035780637332e0771461022e578063817b1cd21461025957806384c18c8914610284576100fe565b80633455b92d116100d15780633455b92d146101af57806335322f37146101cb57806335faa416146101e25780633a4b66f1146101f9576100fe565b80630c08bf881461010357806316934fc41461011a5780632ddbd13a1461015a5780632e17de7814610186575b600080fd5b34801561010f57600080fd5b50610118610398565b005b34801561012657600080fd5b50610141600480360381019061013c9190611efe565b610579565b6040516101519493929190612604565b60405180910390f35b34801561016657600080fd5b5061016f6105a9565b60405161017d9291906125db565b60405180910390f35b34801561019257600080fd5b506101ad60048036038101906101a89190611f58565b61067f565b005b6101c960048036038101906101c49190611fec565b61094e565b005b3480156101d757600080fd5b506101e0610c18565b005b3480156101ee57600080fd5b506101f7610c77565b005b610201610e79565b005b34801561020f57600080fd5b506102186111ec565b60405161022591906125c0565b60405180910390f35b34801561023a57600080fd5b506102436111f2565b60405161025091906125c0565b60405180910390f35b34801561026557600080fd5b5061026e6111f8565b60405161027b91906125c0565b60405180910390f35b34801561029057600080fd5b506102ab60048036038101906102a69190611f85565b6111fe565b6040516102b891906125c0565b60405180910390f35b3480156102cd57600080fd5b506102d661125d565b6040516102e39190612333565b60405180910390f35b3480156102f857600080fd5b50610301611281565b60405161030e91906125c0565b60405180910390f35b34801561032357600080fd5b5061032c611287565b6040516103399190612385565b60405180910390f35b34801561034e57600080fd5b5061035761129a565b60405161036491906125c0565b60405180910390f35b34801561037957600080fd5b506103826112a0565b60405161038f91906125c0565b60405180910390f35b600060015414156103de576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103d590612480565b60405180910390fd5b61042b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff166008543373ffffffffffffffffffffffffffffffffffffffff166112a69092919063ffffffff16565b61046a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161046190612520565b60405180910390fd5b4260015410156104af576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104a6906123e0565b60405180910390fd5b600060095490506000600b60019054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600160009055600260009055600360009055600460009055600560009055600760006105099190611d81565b600b60016101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690558073ffffffffffffffffffffffffffffffffffffffff166108fc839081150290604051600060405180830381858888f19350505050158015610574573d6000803e3d6000fd5b505050565b600c6020528060005260406000206000915090508060000154908060010154908060020154908060030154905084565b6000806000600c60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020604051806080016040529081600082015481526020016001820154815260200160028201548152602001600382015481525050905060008160400151141561063c57600080925092505061067b565b6000600254421161064d5742610651565b6002545b9050600061066b60035484602001518560400151856111fe565b9050826000015181945094505050505b9091565b600060015414156106c5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106bc90612480565b60405180910390fd5b6000806106d06105a9565b9150915060008111610717576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161070e90612440565b60405180910390fd5b8281101561075a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161075190612500565b60405180910390fd5b60008284111561076a578261076c565b835b9050600083851161077e57600061078b565b838561078a9190612732565b5b9050828514156107fc57600c60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000808201600090556001820160009055600282016000905560038201600090555050610867565b61085e82600c60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000015461084d9190612732565b86856108599190612732565b611344565b610866611474565b5b80600a60008282546108799190612732565b9250508190555080600960008282546108929190612732565b9250508190555081600660008282546108ab9190612732565b925050819055503373ffffffffffffffffffffffffffffffffffffffff166108fc869081150290604051600060405180830381858888f193505050501580156108f8573d6000803e3d6000fd5b503373ffffffffffffffffffffffffffffffffffffffff167f8108595eb6bad3acefa9da467d90cc2217686d5c5ac85460f8b7849c840645fc8660405161093f91906125c0565b60405180910390a25050505050565b61099b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff166008543373ffffffffffffffffffffffffffffffffffffffff166112a69092919063ffffffff16565b6109da576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109d190612520565b60405180910390fd5b600060015414610a1f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a1690612400565b60405180910390fd5b42861015610a62576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a5990612560565b60405180910390fd5b620151808686610a729190612732565b1015610ab3576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610aaa90612460565b60405180910390fd5b81831015610af6576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610aed906123c0565b60405180910390fd5b600083610b0586868a8a6111fe565b610b0f9190612732565b905080341015610b54576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b4b906124c0565b60405180910390fd5b86600181905550856002819055508460038190555083600481905550826005819055508160079080519060200190610b8d929190611da2565b503460098190555033600b60016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507f3d828625fed4f186627245530300f39c5b54220393511f345c505ee3ddf6fc603442604051610c079291906125db565b60405180910390a150505050505050565b60006001541415610c5e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c5590612480565b60405180910390fd5b6000610c686105a9565b915050610c748161067f565b50565b60006001541415610cbd576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610cb490612480565b60405180910390fd5b610d0a60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff166008543373ffffffffffffffffffffffffffffffffffffffff166112a69092919063ffffffff16565b610d49576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d4090612520565b60405180910390fd5b600b60009054906101000a900460ff1615610d99576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d9090612580565b60405180910390fd5b600254421015610dde576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610dd5906124e0565b60405180910390fd5b6000600a54600954610df09190612732565b90506001600b60006101000a81548160ff021916908315150217905550600b60019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f19350505050158015610e75573d6000803e3d6000fd5b5050565b33610f1560008054906101000a900473ffffffffffffffffffffffffffffffffffffffff166007805480602002602001604051908101604052809291908181526020018280548015610eea57602002820191906000526020600020905b815481526020019060010190808311610ed6575b50505050508373ffffffffffffffffffffffffffffffffffffffff1661153e9092919063ffffffff16565b610f54576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f4b906123a0565b60405180910390fd5b60006001541415610f9a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f9190612480565b60405180910390fd5b60055434600c60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000154610feb91906126ab565b111561102c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611023906124a0565b60405180910390fd5b600154421015611071576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611068906125a0565b60405180910390fd5b6002544211156110b6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110ad90612420565b60405180910390fd5b346006546004546110c79190612732565b1015611108576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110ff90612540565b60405180910390fd5b60006111126105a9565b91505061117734600c60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000015461116691906126ab565b348361117291906126ab565b611344565b61117f611474565b346006600082825461119191906126ab565b925050819055503373ffffffffffffffffffffffffffffffffffffffff167f270d6dd254edd1d985c81cf7861b8f28fb06b6d719df04d90464034d4341244034426040516111e09291906125db565b60405180910390a25050565b60035481565b60055481565b60065481565b600080610e1084846112109190612732565b61121a9190612701565b905061125261124c61124661122f600161163c565b6112418a670de0b6b3a764000061165f565b6116c7565b8361172e565b86611a43565b915050949350505050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60015481565b600b60009054906101000a900460ff1681565b60025481565b60045481565b6000808390508073ffffffffffffffffffffffffffffffffffffffff166395df7b1e868560016040518463ffffffff1660e01b81526004016112ea9392919061234e565b60206040518083038186803b15801561130257600080fd5b505afa158015611316573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061133a9190611f2b565b9150509392505050565b81600c60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000018190555080600c60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010181905550610e10600c60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020154426114239190612732565b106114705742600c60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600201819055505b5050565b600061147e611afe565b9050600c60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030154600a60008282546114d49190612732565b9250508190555080600a60008282546114ed91906126ab565b9250508190555080600c60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206003018190555050565b600080825114156115525760019050611635565b600083905060005b835181101561162e578173ffffffffffffffffffffffffffffffffffffffff166395df7b1e87868481518110611593576115926128d1565b5b602002602001015160016040518463ffffffff1660e01b81526004016115bb9392919061234e565b60206040518083038186803b1580156115d357600080fd5b505afa1580156115e7573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061160b9190611f2b565b1561161b57600192505050611635565b8080611626906127fb565b91505061155a565b5060009150505b9392505050565b6000677fffffffffffffff82111561165357600080fd5b604082901b9050919050565b60008082141561166e57600080fd5b600061167a8484611ba4565b90506f7fffffffffffffffffffffffffffffff6fffffffffffffffffffffffffffffffff16816fffffffffffffffffffffffffffffffff1611156116bd57600080fd5b8091505092915050565b60008082600f0b84600f0b0190507fffffffffffffffffffffffffffffffff80000000000000000000000000000000600f0b811215801561171b57506f7fffffffffffffffffffffffffffffff600f0b8113155b61172457600080fd5b8091505092915050565b600080600084600f0b12801561174657506001808416145b905060008085600f0b1261175a578461175f565b846000035b6fffffffffffffffffffffffffffffffff1690506000700100000000000000000000000000000000905068010000000000000000821161183957603f82901b91505b6000851461182d57600060018616146117be57607f828202901c90505b607f828302901c9150600060028616146117dc57607f828202901c90505b607f828302901c9150600060048616146117fa57607f828202901c90505b607f828302901c91506000600886161461181857607f828202901c90505b607f828302901c9150600485901c94506117a1565b604081901c90506119d3565b6000603f90506c0100000000000000000000000083101561186257602083901b92506020810390505b6e01000000000000000000000000000083101561188757601083901b92506010810390505b6f010000000000000000000000000000008310156118ad57600883901b92506008810390505b6f100000000000000000000000000000008310156118d357600483901b92506004810390505b6f400000000000000000000000000000008310156118f957600283901b92506002810390505b6f8000000000000000000000000000000083101561191f57600183901b92506001810390505b60005b600087146119ba576040821061193757600080fd5b6000600188161461197857607f848402901c9250818101905070010000000000000000000000000000000083111561197757600183901c92506001810190505b5b607f848502901c9350600182901b915070010000000000000000000000000000000084106119ae57600184901c93506001820191505b600187901c9650611922565b604081106119c757600080fd5b8060400383901c925050505b6000836119e057816119e5565b816000035b90507fffffffffffffffffffffffffffffffff80000000000000000000000000000000600f0b8112158015611a2d57506f7fffffffffffffffffffffffffffffff600f0b8113155b611a3657600080fd5b8094505050505092915050565b600080821415611a565760009050611af8565b600083600f0b1215611a6757600080fd5b600060406fffffffffffffffffffffffffffffffff841685600f0b02901c90506000608084901c85600f0b02905077ffffffffffffffffffffffffffffffffffffffffffffffff811115611aba57600080fd5b604081901b9050817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03811115611af057600080fd5b818101925050505b92915050565b6000600c60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000154611b95600354600c60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010154426002546111fe565b611b9f9190612732565b905090565b600080821415611bb357600080fd5b600077ffffffffffffffffffffffffffffffffffffffffffffffff8411611bf05782604085901b81611be857611be76128a2565b5b049050611d5a565b600060c09050600060c086901c90506401000000008110611c1957602081901c90506020820191505b620100008110611c3157601081901c90506010820191505b6101008110611c4857600881901c90506008820191505b60108110611c5e57600481901c90506004820191505b60048110611c7457600281901c90506002820191505b60028110611c83576001820191505b600160bf830360018703901c018260ff0387901b81611ca557611ca46128a2565b5b0492506fffffffffffffffffffffffffffffffff831115611cc557600080fd5b6000608086901c8402905060006fffffffffffffffffffffffffffffffff871685029050600060c089901c9050600060408a901b905082811015611d0a576001820391505b8281039050608084901b925082811015611d25576001820391505b8281039050608084901c8214611d3e57611d3d612844565b5b888181611d4e57611d4d6128a2565b5b04870196505050505050505b6fffffffffffffffffffffffffffffffff811115611d7757600080fd5b8091505092915050565b5080546000825590600052602060002090810190611d9f9190611def565b50565b828054828255906000526020600020908101928215611dde579160200282015b82811115611ddd578251825591602001919060010190611dc2565b5b509050611deb9190611def565b5090565b5b80821115611e08576000816000905550600101611df0565b5090565b6000611e1f611e1a8461266e565b612649565b90508083825260208201905082856020860282011115611e4257611e41612934565b5b60005b85811015611e725781611e588882611ed4565b845260208401935060208301925050600181019050611e45565b5050509392505050565b600081359050611e8b81612ca5565b92915050565b600082601f830112611ea657611ea561292f565b5b8135611eb6848260208601611e0c565b91505092915050565b600081519050611ece81612cbc565b92915050565b600081359050611ee381612cd3565b92915050565b600081359050611ef881612cea565b92915050565b600060208284031215611f1457611f1361293e565b5b6000611f2284828501611e7c565b91505092915050565b600060208284031215611f4157611f4061293e565b5b6000611f4f84828501611ebf565b91505092915050565b600060208284031215611f6e57611f6d61293e565b5b6000611f7c84828501611ee9565b91505092915050565b60008060008060808587031215611f9f57611f9e61293e565b5b6000611fad87828801611ee9565b9450506020611fbe87828801611ee9565b9350506040611fcf87828801611ee9565b9250506060611fe087828801611ee9565b91505092959194509250565b60008060008060008060c087890312156120095761200861293e565b5b600061201789828a01611ee9565b965050602061202889828a01611ee9565b955050604061203989828a01611ee9565b945050606061204a89828a01611ee9565b935050608061205b89828a01611ee9565b92505060a087013567ffffffffffffffff81111561207c5761207b612939565b5b61208889828a01611e91565b9150509295509295509295565b61209e81612766565b82525050565b6120ad81612778565b82525050565b6120bc81612784565b82525050565b6120cb816127b8565b82525050565b60006120de60198361269a565b91506120e982612954565b602082019050919050565b600061210160108361269a565b915061210c8261297d565b602082019050919050565b6000612124601c8361269a565b915061212f826129a6565b602082019050919050565b600061214760208361269a565b9150612152826129cf565b602082019050919050565b600061216a601c8361269a565b9150612175826129f8565b602082019050919050565b600061218d60128361269a565b915061219882612a21565b602082019050919050565b60006121b060218361269a565b91506121bb82612a4a565b604082019050919050565b60006121d3601c8361269a565b91506121de82612a99565b602082019050919050565b60006121f660258361269a565b915061220182612ac2565b604082019050919050565b6000612219601b8361269a565b915061222482612b11565b602082019050919050565b600061223c601a8361269a565b915061224782612b3a565b602082019050919050565b600061225f602a8361269a565b915061226a82612b63565b604082019050919050565b600061228260178361269a565b915061228d82612bb2565b602082019050919050565b60006122a560148361269a565b91506122b082612bdb565b602082019050919050565b60006122c860358361269a565b91506122d382612c04565b604082019050919050565b60006122eb600f8361269a565b91506122f682612c53565b602082019050919050565b600061230e601c8361269a565b915061231982612c7c565b602082019050919050565b61232d816127ae565b82525050565b60006020820190506123486000830184612095565b92915050565b60006060820190506123636000830186612095565b61237060208301856120b3565b61237d60408301846120c2565b949350505050565b600060208201905061239a60008301846120a4565b92915050565b600060208201905081810360008301526123b9816120d1565b9050919050565b600060208201905081810360008301526123d9816120f4565b9050919050565b600060208201905081810360008301526123f981612117565b9050919050565b600060208201905081810360008301526124198161213a565b9050919050565b600060208201905081810360008301526124398161215d565b9050919050565b6000602082019050818103600083015261245981612180565b9050919050565b60006020820190508181036000830152612479816121a3565b9050919050565b60006020820190508181036000830152612499816121c6565b9050919050565b600060208201905081810360008301526124b9816121e9565b9050919050565b600060208201905081810360008301526124d98161220c565b9050919050565b600060208201905081810360008301526124f98161222f565b9050919050565b6000602082019050818103600083015261251981612252565b9050919050565b6000602082019050818103600083015261253981612275565b9050919050565b6000602082019050818103600083015261255981612298565b9050919050565b60006020820190508181036000830152612579816122bb565b9050919050565b60006020820190508181036000830152612599816122de565b9050919050565b600060208201905081810360008301526125b981612301565b9050919050565b60006020820190506125d56000830184612324565b92915050565b60006040820190506125f06000830185612324565b6125fd6020830184612324565b9392505050565b60006080820190506126196000830187612324565b6126266020830186612324565b6126336040830185612324565b6126406060830184612324565b95945050505050565b6000612653612664565b905061265f82826127ca565b919050565b6000604051905090565b600067ffffffffffffffff82111561268957612688612900565b5b602082029050602081019050919050565b600082825260208201905092915050565b60006126b6826127ae565b91506126c1836127ae565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156126f6576126f5612873565b5b828201905092915050565b600061270c826127ae565b9150612717836127ae565b925082612727576127266128a2565b5b828204905092915050565b600061273d826127ae565b9150612748836127ae565b92508282101561275b5761275a612873565b5b828203905092915050565b60006127718261278e565b9050919050565b60008115159050919050565b6000819050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b60006127c3826127ae565b9050919050565b6127d382612943565b810181811067ffffffffffffffff821117156127f2576127f1612900565b5b80604052505050565b6000612806826127ae565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82141561283957612838612873565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052600160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f5374616b696e67506f6f6c3a204e6f74206120706174726f6e00000000000000600082015250565b7f6861726443617020657863656564656400000000000000000000000000000000600082015250565b7f43616e6e6f74207465726d696e61746520616674657220737461727400000000600082015250565b7f5374616b696e6720506f6f6c20616c726561647920696e697469616c697a6564600082015250565b7f5374616b696e6720706f6f6c20616c7265616479206578706972656400000000600082015250565b7f4e6f2066756e647320617661696c61626c650000000000000000000000000000600082015250565b7f4475726174696f6e2073686f756c64206265206174206c65617374203120646160008201527f7900000000000000000000000000000000000000000000000000000000000000602082015250565b7f5374616b696e6720506f6f6c206e6f7420696e697469616c697a656400000000600082015250565b7f5374616b652067726561746572207468616e20636f6e747269627574696f6e2060008201527f6c696d6974000000000000000000000000000000000000000000000000000000602082015250565b7f52657761726473206c6f776572207468616e2065787065637465640000000000600082015250565b7f43616e6e6f74207377656570206265666f726520657870697279000000000000600082015250565b7f5265717565737465642076616c75652061626f76652074686520636f6d706f7560008201527f6e6465642066756e647300000000000000000000000000000000000000000000602082015250565b7f4f6e6c794f776e65723a204e6f7420616e206f776e6572000000000000000000600082015250565b7f5374616b696e6720706f6f6c2069732066756c6c000000000000000000000000600082015250565b7f537461727420646174652073686f756c64206265206174206c6561737420637560008201527f7272656e7420626c6f636b2074696d657374616d700000000000000000000000602082015250565b7f416c726561647920737765657065640000000000000000000000000000000000600082015250565b7f5374616b696e6720706f6f6c206e6f7420796574207374617274656400000000600082015250565b612cae81612766565b8114612cb957600080fd5b50565b612cc581612778565b8114612cd057600080fd5b50565b612cdc81612784565b8114612ce757600080fd5b50565b612cf3816127ae565b8114612cfe57600080fd5b5056fea26469706673582212206a1db1173a909e6f48c73d86c6a2bbbe88282ea89d79b2a5ef87ce4d8d1dc6c364736f6c63430008060033";
class StakingPool__factory extends ContractFactory {
    constructor(...args) {
        if (args.length === 1) {
            super(_abi$4, _bytecode$4, args[0]);
        }
        else {
            super(...args);
        }
    }
    deploy(_ownerRole, _claimManager, overrides) {
        return super.deploy(_ownerRole, _claimManager, overrides || {});
    }
    getDeployTransaction(_ownerRole, _claimManager, overrides) {
        return super.getDeployTransaction(_ownerRole, _claimManager, overrides || {});
    }
    attach(address) {
        return super.attach(address);
    }
    connect(signer) {
        return super.connect(signer);
    }
    static createInterface() {
        return new utils.Interface(_abi$4);
    }
    static connect(address, signerOrProvider) {
        return new Contract(address, _abi$4, signerOrProvider);
    }
}
StakingPool__factory.bytecode = _bytecode$4;
StakingPool__factory.abi = _abi$4;

var StakeStatus;
(function (StakeStatus) {
    StakeStatus[StakeStatus["NONSTAKING"] = 0] = "NONSTAKING";
    StakeStatus[StakeStatus["STAKING"] = 1] = "STAKING";
    StakeStatus[StakeStatus["WITHDRAWING"] = 2] = "WITHDRAWING";
})(StakeStatus || (StakeStatus = {}));

const { namehash: namehash$2, parseUnits } = utils;
/**
 * Intended for staking pool
 */
class StakingFactoryService {
    constructor(_signerService, _domainsService) {
        this._signerService = _signerService;
        this._domainsService = _domainsService;
    }
    static create(signerService, domainsService) {
        return __awaiter(this, void 0, void 0, function* () {
            const service = new StakingFactoryService(signerService, domainsService);
            return service;
        });
    }
    /**
     * @description Returns all services for which pools are launched
     */
    allServices() {
        return __awaiter(this, void 0, void 0, function* () {
            return [
                {
                    org: yield this._domainsService.readName(namehash$2('energyweb.iam.ewc')),
                    pool: chainConfigs()[this._signerService.chainId]
                        .stakingPoolFactoryAddress,
                    provider: 'empty',
                },
            ];
        });
    }
    /**
     * @description Returns pool launched for energyweb org
     */
    getPool() {
        return __awaiter(this, void 0, void 0, function* () {
            return new StakingPoolService(this._signerService, chainConfigs()[this._signerService.chainId].stakingPoolFactoryAddress);
        });
    }
}
/**
 * Abstraction over staking pool smart contract
 */
class StakingPoolService {
    constructor(signerService, address) {
        this.signerService = signerService;
        this.overrides = {
            gasPrice: parseUnits('0.01', 'gwei'),
            gasLimit: BigNumber.from(490000),
        };
        this.pool = new StakingPool__factory(StakingPool__factory.createInterface(), StakingPool__factory.bytecode).attach(address);
    }
    getStart() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.pool.connect(this.signerService.signer).start();
        });
    }
    getEnd() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.pool.connect(this.signerService.signer).end();
        });
    }
    getHardCap() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.pool.connect(this.signerService.signer).hardCap();
        });
    }
    getContributionLimit() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.pool.connect(this.signerService.signer).contributionLimit();
        });
    }
    getTotalStaked() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.pool.connect(this.signerService.signer).totalStaked();
        });
    }
    getRatio() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.pool.connect(this.signerService.signer).hourlyRatio();
        });
    }
    /**
     * @description
     * @param value
     */
    partialWithdraw(value) {
        return __awaiter(this, void 0, void 0, function* () {
            value = BigNumber.from(value);
            const transaction = yield this.pool
                .connect(this.signerService.signer)
                .unstake(value);
            return transaction.wait();
        });
    }
    /**
     * @description Locks stake and starts accumulating reward
     * @emits StakingPool.StakePut
     */
    putStake(stake) {
        return __awaiter(this, void 0, void 0, function* () {
            stake = BigNumber.from(stake);
            const tx = {
                to: this.pool.address,
                from: this.signerService.address,
                data: this.pool.interface.encodeFunctionData('stake'),
                value: stake,
            };
            const balance = yield this.signerService.balance();
            const gasPrice = yield this.signerService.signer.getGasPrice();
            const gas = yield this.signerService.provider.estimateGas(tx);
            // multiplier 2 chosen arbitrarily because it is not known how reasonably to choose it
            const fee = gasPrice.mul(gas).mul(2);
            const maxStake = balance.sub(fee);
            if (maxStake.lte(0)) {
                throw new Error(ERROR_MESSAGES.INSUFFICIENT_BALANCE);
            }
            tx.value = stake.lt(maxStake) ? stake : maxStake;
            yield this.signerService.send(tx);
        });
    }
    /**
     * Accumulated reward
     */
    checkReward() {
        return __awaiter(this, void 0, void 0, function* () {
            const [staked, compounded] = yield this.pool
                .connect(this.signerService.signer)
                .total();
            return compounded.sub(staked);
        });
    }
    /**
     * @returns Stake
     */
    getStake() {
        return __awaiter(this, void 0, void 0, function* () {
            const [staked] = yield this.pool.connect(this.signerService.signer).total();
            const [start, end] = yield Promise.all([
                this.pool.connect(this.signerService.signer).start(),
                this.pool.connect(this.signerService.signer).end(),
            ]);
            const stakeStatus = staked.gt(0)
                ? StakeStatus.STAKING
                : StakeStatus.NONSTAKING;
            return {
                amount: staked,
                depositStart: start,
                depositEnd: end,
                status: stakeStatus,
            };
        });
    }
    /**
     * @description pays back stake with accumulated reward.
     */
    withdraw() {
        return __awaiter(this, void 0, void 0, function* () {
            const tx = Object.assign({ to: this.pool.address, data: this.pool.interface.encodeFunctionData('unstakeAll') }, this.overrides);
            yield this.signerService.send(tx);
        });
    }
}

const IS_REQ_STRING = 'string';
const { UpdateServicePoint, UpdateDelegate, UpdatePublicKey } = createCheckers({
    UpdateServicePoint: iface([], {
        did: IS_REQ_STRING,
        didAttribute: enumtype({ ServicePoint: DIDAttribute.ServicePoint }),
        data: iface([], {
            type: enumtype({ ServicePoint: DIDAttribute.ServicePoint }),
            value: iface([], {
                id: IS_REQ_STRING,
                hash: IS_REQ_STRING,
                hashAlg: IS_REQ_STRING,
            }),
        }),
    }),
    UpdateDelegate: iface([], {
        did: IS_REQ_STRING,
        didAttribute: enumtype({ Authenticate: DIDAttribute.Authenticate }),
        data: iface([], {
            type: enumtype(PubKeyType),
            value: iface([], {
                id: IS_REQ_STRING,
                hash: IS_REQ_STRING,
                hashAlg: IS_REQ_STRING,
            }),
            delegate: IS_REQ_STRING,
        }),
    }),
    UpdatePublicKey: iface([], {
        did: IS_REQ_STRING,
        didAttribute: enumtype({ PublicKey: DIDAttribute.PublicKey }),
        data: iface([], {
            type: enumtype(PubKeyType),
            algo: opt(enumtype(KeyType)),
            encoding: opt(enumtype(Encoding)),
            value: iface([], {
                publicKey: IS_REQ_STRING,
                tag: IS_REQ_STRING,
            }),
        }),
    }),
});

const { JsonRpcProvider } = providers;
/**
 * Service responsible for handling the DID Document management.
 * See more information about DID in IAM stack [here](https://energy-web-foundation.gitbook.io/energy-web/foundational-concepts/self-sovereign-identity#decentralized-identifiers-dids).
 *
 * ```typescript
 * const { connectToCacheServer } = await initWithPrivateKeySigner(privateKey, rpcUrl);
 * const { connectToDidRegistry } = await connectToCacheServer();
 * const { didRegistry } = await connectToDidRegistry();
 * didRegistry.getDidDocument();
 * ```
 */
class DidRegistry {
    constructor(_signerService, _cacheClient, _assetsService, _ipfsConfig) {
        this._signerService = _signerService;
        this._cacheClient = _cacheClient;
        this._assetsService = _assetsService;
        this._ipfsConfig = _ipfsConfig;
        this._signerService.onInit(this.init.bind(this));
    }
    static connect(signerService, cacheClient, assetsService, ipfsConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            const registry = new DidRegistry(signerService, cacheClient, assetsService, ipfsConfig);
            yield registry.init();
            return registry;
        });
    }
    get jwt() {
        return this._jwt;
    }
    // temporarily, to allow claim service to save claim
    get ipfsStore() {
        return this._ipfsStore;
    }
    get identityOwner() {
        return this._identityOwner;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this._ipfsStore = new DidStore(this._ipfsConfig);
            yield this._setOperator();
            this.setJWT();
            yield this._setDocument();
            this._setClaims();
        });
    }
    /**
     * Retrieve DID Document of the given DID from SSI-Hub if possible, otherwise from blockchain.
     * Optionally include claims object within services in the document.
     *
     * ```typescript
     * didRegistry.getDidDocument({
     *     did: 'did:ethr:volta:0x00...0',
     *     includeClaims: true,
     * });
     * ```
     * @param {GetDIDDocumentOptions} options object with options
     * @return DID document
     */
    getDidDocument({ did = this._did, includeClaims = true, } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            getLogger().info(`Getting DID document for ${did}`);
            if (this._cacheClient) {
                try {
                    const didDoc = yield this._cacheClient.getDidDocument(did, includeClaims);
                    // TODO: implement includeClaims
                    return didDoc;
                }
                catch (err) {
                    getLogger().info(err);
                    throw err;
                }
            }
            const document = yield this._operator.read(did);
            return Object.assign(Object.assign({}, document), { service: includeClaims
                    ? yield this.downloadClaims({
                        services: document.service && document.service.length > 0
                            ? document.service
                            : [],
                    })
                    : [] });
        });
    }
    /**
     * Gets services from DID document of the given DID.
     *
     * ```typescript
     * didRegistry.getServices({
     *     did: 'did:ethr:volta:0x00...0',
     * });
     * ```
     * @param {GetServicesOptions} options object with options
     * @returns list of claims
     */
    getServices({ did = this._signerService.did, } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const didDocument = yield this.getDidDocument({ did });
            return didDocument === null || didDocument === void 0 ? void 0 : didDocument.service;
        });
    }
    /**
     * Gets public keys from DID document of the given DID.
     *
     * ```typescript
     * didRegistry.getDidPublicKeys({
     *     did: 'did:ethr:volta:0x00...0',
     * });
     * ```
     * @param {GetDidPublicKeysOptions} options object with options
     * @returns list of public keys
     */
    getDidPublicKeys({ did = this._signerService.did, } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const didDocument = yield this.getDidDocument({ did });
            return didDocument === null || didDocument === void 0 ? void 0 : didDocument.publicKey;
        });
    }
    /**
     * Gets delegates from DID document of the given DID.
     *
     * ```typescript
     * didRegistry.getDidDelegates({
     *     did: 'did:ethr:volta:0x00...0',
     * });
     * ```
     * @param {GetDidDelegatesOptions} options object with options
     * @returns list of delegates
     */
    getDidDelegates({ did = this._signerService.did, } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const didDocument = yield this.getDidDocument({ did });
            return didDocument === null || didDocument === void 0 ? void 0 : didDocument.delegates;
        });
    }
    get registrySettings() {
        return {
            address: chainConfigs()[this._signerService.chainId].didRegistryAddress,
        };
    }
    /**
     * Create a public claim with provided data.
     *
     * ```typescript
     * didRegistry.createPublicClaim({
     *     data: {
     *         claimType: 'root.roles.energyweb.iam.ewc',
     *         claimTypeVersion: 1,
     *     },
     *     subject: 'did:ethr:volta:0x00...0',
     * });
     * ```
     * @param {CreatePublicClaimOptions} options object with options
     * @return JWT token of created claim
     */
    createPublicClaim({ data, subject, }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (subject) {
                return this._userClaims.createPublicClaim(data, { subject, issuer: '' });
            }
            return this._userClaims.createPublicClaim(data);
        });
    }
    /**
     * If token provided issue new token signed by issuer,
     * otherwise create a new claim token based on provided public claim data.
     *
     * ```typescript
     * didRegistry.issuePublicClaim({
     *     token: 'eyJh...VCJ9.ey...IyfQ.SflK...sw5c',
     *     publicClaim: {
     *         did: 'did:ethr:volta:0x00...0',
     *         signer: 'did:ethr:volta:0x00...1',
     *         claimData: {
     *             claimType: 'root.roles.energyweb.iam.ewc',
     *         },
     *     },
     * });
     * ```
     * @param {IssuePublicClaimOptions} options object with options
     * @return JWT token of created claim
     */
    issuePublicClaim({ token, publicClaim, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = publicClaim || token;
            if (params) {
                return this._issuerClaims.issuePublicClaim(params);
            }
            throw new Error('Unable to issue public claim: `token` or `publicClaim` must be provided');
        });
    }
    /**
     * Verifies issued token of the public claim.
     *
     * ```typescript
     * didRegistry.verifyPublicClaim({
     *     token: 'eyJh...VCJ9.ey...IyfQ.SflK...sw5c',
     *     iss: 'did:ethr:volta:0x00...0',
     * });
     * ```
     * @param {String} token JWT token of the public claim
     * @param {String} iss DID of the issuer
     * @return DID of the authenticated identity on successful verification or null otherwise
     */
    verifyPublicClaim(token, iss) {
        return __awaiter(this, void 0, void 0, function* () {
            const issuerDoc = yield this.getDidDocument({
                did: iss,
                includeClaims: true,
            });
            const verifier = new ProofVerifier(issuerDoc);
            return verifier.verifyAssertionProof(token);
        });
    }
    /**
     * Update DID document of the given DID with provided data.
     *
     * ```typescript
     * didRegistry.updateDocument({
     *     didAttribute: DIDAttribute.PublicKey,
     *     data: publicKey,
     *     validity: 60 * 60 * 1000,
     *     did: 'did:ethr:volta:0x00...0',
     * });
     *
     * @param {UpdateDocumentOptions} options object with options
     * @return true if document was updated successfully
     */
    updateDocument({ didAttribute, data, validity, did = this._signerService.did, }) {
        return __awaiter(this, void 0, void 0, function* () {
            this.validDateUpdateDocumentRequest({
                didAttribute,
                data,
                did,
            });
            const didDocument = yield this.getDIDDocFull(did);
            const updateData = Object.assign({ algo: KeyType.Secp256k1, encoding: Encoding.HEX }, data);
            const update = yield didDocument.update(didAttribute, updateData, validity);
            return update._hex !== BigNumber.from(0)._hex;
        });
    }
    /**
     * Adds public key to the DID document of given DID.
     *
     * ```typescript
     * didRegistry.updateSignedDidPublicKey({
     *     did: 'did:ethr:volta:0x00...0',
     *     publicKey: publicKey,
     *     validity: 60 * 60 * 1000,
     *     algo: KeyType.Secp256k1,
     *     type: PubKeyType.SignatureAuthentication2018,
     *     tag: '#main-key',
     * });
     *
     * @param {UpdateSignedDidPublicKeyOptions} options object with options
     * @return true if document was updated successfully
     */
    updateSignedDidPublicKey({ did = this._signerService.did, publicKey, validity, algo = KeyType.Secp256k1, type = PubKeyType.SignatureAuthentication2018, tag = '', }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!publicKey)
                throw new Error(ERROR_MESSAGES.CAN_NOT_UPDATE_DOCUMENT_PROPERTIES_INVALID_OR_MISSING +
                    'publicKey');
            const didDocument = yield this.getDIDDocFull(did);
            const isDIdDocUpdated = yield didDocument.updatePublicKey({
                publicKey,
                did: this._signerService.did,
                algo,
                type,
                tag,
                validity,
            });
            return Boolean(isDIdDocUpdated);
        });
    }
    /**
     * Updates delegate of the DID document of given DID.
     *
     * ```typescript
     * didRegistry.updateSignedDidDelegate({
     *     did: 'did:ethr:volta:0x00...0',
     *     delegatePublicKey: delegatePublicKey,
     *     validity: 60 * 60 * 1000,
     *     algo: KeyType.Secp256k1,
     *     type: PubKeyType.SignatureAuthentication2018,
     * });
     *
     * @param {UpdateSignedDidDelegateOptions} options object with options
     * @return true if document was updated successfully
     */
    updateSignedDidDelegate({ did = this._signerService.did, delegatePublicKey, validity, algo = KeyType.Secp256k1, type = PubKeyType.SignatureAuthentication2018, }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!delegatePublicKey)
                throw new Error(ERROR_MESSAGES.CAN_NOT_UPDATE_DOCUMENT_PROPERTIES_INVALID_OR_MISSING +
                    'delegatePublicKey');
            const didDocument = yield this.getDIDDocFull(did);
            const isDIdDocUpdated = yield didDocument.updateDelegate({
                delegatePublicKey,
                algo,
                type,
                validity,
            });
            return Boolean(isDIdDocUpdated);
        });
    }
    /**
     * Create DID document of the current user if not exists.
     *
     * ```typescript
     * didRegistry.createDocument();
     * ```
     *
     * @return true if document was created successfully
     */
    createDocument() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._cacheClient) {
                const cachedDoc = yield this._cacheClient.getDidDocument(this._did);
                const pubKey = cachedDoc.publicKey.find((pk) => pk.id.endsWith(KeyTags.OWNER));
                if (!pubKey) {
                    return this._document.create();
                }
                return true;
            }
            return this._document.create();
        });
    }
    /**
     * Revoke DID document of the current user.
     *
     * ```typescript
     * didRegistry.revokeDidDocument();
     * ```
     *
     * @return true if document was revoked successfully
     */
    revokeDidDocument() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._document.deactivate();
            return true;
        });
    }
    /**
     * Validate that claim contains issuer and claimData.
     *
     * ```typescript
     * didRegistry.isClaim(token: Record<string, string | number | object>);
     * ```
     *
     * @return boolean
     */
    isClaim(claim) {
        const { iss, claimData } = claim;
        return !!iss && !!claimData;
    }
    /**
     * Decode JWT token of the public claim.
     *
     * ```typescript
     * didRegistry.decodeJWTToken({
     *     token: 'eyJh...VCJ9.ey...IyfQ.SflK...sw5c',
     * });
     * ```
     * @param {DecodeJWTTokenOptions} options object with options
     * @return payload of the JWT token
     */
    decodeJWTToken({ token }) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._jwt.decode(token);
        });
    }
    /**
     * Get `DIDDocumentFull` class of the given DID
     *
     * ```typescript
     * didRegistry.getDIDDocFull('did:ethr:volta:0x00...0');
     * ```
     * @param {String} did DID of the document
     * @return `DIDDocumentFull` object
     */
    getDIDDocFull(did) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (did === this._signerService.did) {
                return this._document;
            }
            else {
                const assetDID = (_a = (yield this._assetsService.getOwnedAssets()).find((a) => a.document.id === did)) === null || _a === void 0 ? void 0 : _a.id;
                if (!assetDID) {
                    throw new Error(ERROR_MESSAGES.CAN_NOT_UPDATE_NOT_CONTROLLED_DOCUMENT);
                }
                const { didRegistryAddress: didContractAddress } = chainConfigs()[this._signerService.chainId];
                const operator = new ProxyOperator(this._identityOwner, { address: didContractAddress }, addressOf(assetDID));
                return new DIDDocumentFull(did, operator);
            }
        });
    }
    /**
     * Set operator based on current configs
     *
     * ```typescript
     * didRegistry._setOperator();
     * ```
     */
    _setOperator() {
        return __awaiter(this, void 0, void 0, function* () {
            const signer = this._signerService.signer;
            const provider = signer.provider;
            const publicKey = yield this._signerService.publicKey();
            if (signer instanceof Wallet && provider instanceof JsonRpcProvider) {
                this._identityOwner = EwSigner.fromPrivateKey(signer.privateKey, {
                    type: ProviderTypes.HTTP,
                    uriOrInfo: provider.connection.url,
                });
            }
            else if (provider instanceof JsonRpcProvider) {
                this._identityOwner = EwSigner.fromEthersSigner(signer, publicKey);
            }
            else {
                /** @todo from EIP1193Provider */
                throw new Error(ERROR_MESSAGES.UNKNOWN_PROVIDER);
            }
            this._did = `did:${Methods.Erc1056}:${this._signerService.chainName()}:${yield signer.getAddress()}`;
            const address = chainConfigs()[this._signerService.chainId].didRegistryAddress;
            this._operator = new Operator(this._identityOwner, { address });
        });
    }
    /**
     * Set JWT
     *
     * ```typescript
     * didRegistry.setJWT();
     * ```
     */
    setJWT() {
        this._jwt = new JWT(this._identityOwner);
    }
    /**
     * Set document of the current user
     *
     * ```typescript
     * didRegistry._setDocument();
     * ```
     */
    _setDocument() {
        this._document = new DIDDocumentFull(this._did, this._operator);
    }
    /**
     * Set claims user and claims issuer class
     *
     * ```typescript
     * didRegistry._setClaims();
     * ```
     */
    _setClaims() {
        this._userClaims = new ClaimsUser(this._identityOwner, this._document, this._ipfsStore);
        this._issuerClaims = new ClaimsIssuer(this._identityOwner, this._document, this._ipfsStore);
    }
    /**
     * Download document claims from IPFS
     *
     * ```typescript
     * const document = await didRegistry.getDidDocument();
     * didRegistry.downloadClaims(document.services);
     * ```
     *
     * @param {DownloadClaimsOptions} options object with options
     * @returns resolved claims
     */
    downloadClaims({ services, }) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.all(services.map((_a) => { var _b; return __awaiter(this, void 0, void 0, function* () {
                var { serviceEndpoint } = _a, rest = __rest(_a, ["serviceEndpoint"]);
                if (!this.isCID(serviceEndpoint)) {
                    return Object.assign({ serviceEndpoint }, rest);
                }
                const tokenOrVc = yield this._ipfsStore.get(serviceEndpoint);
                if (/(^[\w-]*\.[\w-]*\.[\w-]*$)/.test(tokenOrVc)) {
                    const decodedData = (_b = this._jwt) === null || _b === void 0 ? void 0 : _b.decode(tokenOrVc);
                    if (!decodedData) {
                        return Object.assign({ serviceEndpoint }, rest);
                    }
                    const { claimData } = decodedData, claimRest = __rest(decodedData, ["claimData"]);
                    return Object.assign(Object.assign(Object.assign({ serviceEndpoint }, rest), claimData), claimRest);
                }
                try {
                    const data = JSON.parse(tokenOrVc);
                    if (isVerifiableCredential(data)) {
                        return Object.assign(Object.assign({ serviceEndpoint }, rest), { verifiableCredentials: data });
                    }
                    return Object.assign(Object.assign({ serviceEndpoint }, rest), data);
                }
                catch (_c) {
                    return Object.assign({ serviceEndpoint }, rest);
                }
            }); }));
        });
    }
    /**
     * Validates update document request. Throws error if validation fails.
     *
     * ```typescript
     * didRegistry.validDateUpdateDocumentRequest({
     *     didAttribute: DIDAttribute.PublicKey,
     *     data: publicKey,
     *     did: 'did:ethr:volta:0x00...0',
     * });
     * ```
     *
     * @param {ValidDateUpdateDocumentRequestOptions} options object with options
     *
     */
    validDateUpdateDocumentRequest({ didAttribute, data, did, }) {
        const rq = { didAttribute, data, did };
        try {
            switch (didAttribute) {
                case DIDAttribute.ServicePoint:
                    UpdateServicePoint.check(rq);
                    break;
                case DIDAttribute.Authenticate:
                    UpdateDelegate.check(rq);
                    break;
                case DIDAttribute.PublicKey:
                    UpdatePublicKey.check(rq);
                    break;
                default:
                    throw new Error('didAttribute invalida or missing');
            }
        }
        catch (e) {
            throw new Error(ERROR_MESSAGES.CAN_NOT_UPDATE_DOCUMENT_PROPERTIES_INVALID_OR_MISSING +
                e.message);
        }
    }
    /**
     * Check if given value is a valid IPFS CID.
     *
     * ```typescript
     * didRegistry.isCID('Qm...');
     * ```
     *
     * @param {Any} hash value to check
     *
     */
    isCID(hash) {
        try {
            if (typeof hash === 'string') {
                return Boolean(CID.parse(hash));
            }
            if (hash instanceof Uint8Array) {
                return Boolean(CID.decode(hash));
            }
            return Boolean(CID.asCID(hash));
        }
        catch (e) {
            return false;
        }
    }
}

const isClaimService = (service) => {
    return has(service, 'claimType') && has(service, 'claimTypeVersion');
};

var MessagingMethod;
(function (MessagingMethod) {
    MessagingMethod["Nats"] = "nats";
    // Not implemented yet
    // WebRTC = "webRTC",
    // SmartContractStorage = "smartContractStorage",
})(MessagingMethod || (MessagingMethod = {}));

const messagingConfig = {
    [VOLTA_CHAIN_ID]: {
        messagingMethod: MessagingMethod.Nats,
        natsServerUrl: 'https://identityevents-dev.energyweb.org/',
        natsEnvironmentName: 'ewf-volta',
    },
    [EWC_CHAIN_ID]: {
        messagingMethod: MessagingMethod.Nats,
        natsServerUrl: 'https://identityevents.energyweb.org/',
        natsEnvironmentName: 'ewf-prod',
    },
};
/**
 * Used to override existing messaging configuration or add a missing one
 * Configuration must be set before constructing `IAM`
 */
const setMessagingConfig = (chainId, options) => {
    messagingConfig[chainId] = Object.assign(Object.assign({}, messagingConfig[chainId]), options);
};
const getMessagingConfig = () => (Object.assign({}, messagingConfig));

/**
 * Service responsible for handling the messaging via NATS.
 *
 * ```typescript
 * const { messagingService } = await initWithPrivateKeySigner(privateKey, rpcUrl);
 * messagingService.subscribeTo(...);
 * ```
 */
class MessagingService {
    constructor(_signerService) {
        this._signerService = _signerService;
        this._subscriptions = [];
        this._signerService.onInit(this.init.bind(this));
    }
    static create(signerService) {
        return __awaiter(this, void 0, void 0, function* () {
            const service = new MessagingService(signerService);
            yield service.init();
            return service;
        });
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            // Currently there is no supported messaging method for node.js
            if (executionEnvironment() === ExecutionEnvironment.NODE) {
                return;
            }
            const { messagingMethod, natsServerUrl, natsEnvironmentName } = getMessagingConfig()[this._signerService.chainId];
            if (natsServerUrl && messagingMethod === MessagingMethod.Nats) {
                this._natsEnvironmentName = natsEnvironmentName;
                this._jsonCodec = JSONCodec();
                try {
                    const timeout = 3000;
                    // this race condition duplicate timeout is there because unable to catch the error that occurs when NATS.ws timeouts
                    const connection = yield Promise.race([
                        connect({
                            servers: natsServerUrl.replace('http', 'ws'),
                            timeout,
                            pingInterval: 50 * 1000,
                            reconnect: true,
                            waitOnFirstConnect: true,
                            verbose: true,
                            maxReconnectAttempts: -1,
                        }),
                        new Promise((resolve) => setTimeout(resolve, timeout)),
                    ]);
                    if (!connection)
                        return;
                    this._natsConnection = connection;
                }
                catch (err) {
                    getLogger().info(err);
                }
            }
        });
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
    subscribeTo({ subject = `*.*.${this._signerService.did}.${this._natsEnvironmentName}`, messageHandler, }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._natsConnection) {
                return;
            }
            const subscription = this._natsConnection.subscribe(subject, {
                callback: (err, msg) => {
                    var _a;
                    if (err) {
                        getLogger().error(`Nats error:${err.message}`);
                        return;
                    }
                    const decodedMessage = (_a = this._jsonCodec) === null || _a === void 0 ? void 0 : _a.decode(msg.data);
                    messageHandler(decodedMessage);
                },
            });
            this._subscriptions.push(subscription);
            return subscription.getID();
        });
    }
    /**
     * Unsubscribe from the given subscription id.
     *
     * ```typescript
     * messagingService.unsubscribeFrom(55);
     * ```
     * @param {Number} subscriptionId subscription id
     */
    unsubscribeFrom(subscriptionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const i = this._subscriptions.findIndex((s) => s.getID() === subscriptionId);
            if (i !== -1) {
                this._subscriptions.splice(i, 1)[0].unsubscribe();
            }
        });
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
    publish(subject, data) {
        var _a;
        (_a = this._natsConnection) === null || _a === void 0 ? void 0 : _a.publish(subject, data);
    }
}

const defaultConfig = {
    [VOLTA_CHAIN_ID$1]: {
        url: 'https://identitycache-dev.energyweb.org/v1/',
        cacheServerSupportsAuth: true,
        auth: {
            domain: 'https://switchboard-dev.energyweb.org',
        },
    },
    [EWC_CHAIN_ID]: {
        url: 'https://identitycache.energyweb.org/v1/',
        cacheServerSupportsAuth: true,
        auth: { domain: 'https://switchboard.energyweb.org' },
    },
};
/**
 * Used to override existing cache server configuration or add a missing one
 * Configuration must be set before constructing `IAM`
 */
const setCacheConfig = (chainId, options) => {
    defaultConfig[chainId] = Object.assign(Object.assign({}, defaultConfig[chainId]), options);
};
const cacheConfigs = () => (Object.assign({}, defaultConfig));

const DEFAULT_AUTH_STATUS_PATH = '/auth/status';

/**
 * Provides authentication tokens via SIWE protocol
 */
class SiweAuthTokensClient {
    /**
     *
     * @param signerService service which provides authentication signature
     * @param httpClient http connection which is being authenticated
     * @param options SIWE options
     */
    constructor(signerService, httpClient, { domain, baseUrl }) {
        this.signerService = signerService;
        this.httpClient = httpClient;
        if (!baseUrl) {
            getLogger().warn('Base url of SIWE signing subject is not provided. Using default base url of the http client');
            const clientBaseUrl = this.httpClient.defaults.baseURL;
            if (!clientBaseUrl) {
                throw new Error('Can not create SIWE auth token client. Base url is not provided');
            }
            baseUrl = clientBaseUrl;
        }
        const uri = baseUrl.endsWith('/')
            ? `${baseUrl}login/siwe/verify`
            : `${baseUrl}/login/siwe/verify`;
        this.config = {
            domain,
            uri,
            address: this.signerService.address,
            version: '1',
            chainId: this.signerService.chainId,
        };
    }
    getAuthTokens() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: { nonce }, } = yield this.httpClient.post('/login/siwe/initiate');
            const siweMessage = new SiweMessage(Object.assign(Object.assign({}, this.config), { nonce }));
            const message = siweMessage.prepareMessage();
            const signature = yield this.signerService.signer.signMessage(message);
            return this.httpClient.post('/login/siwe/verify', {
                message,
                signature,
            });
        });
    }
}

/**
 * Configures authentication for the provided http client
 */
class AuthService {
    /**
     *
     * @param signerService service used to sign authentication message
     * @param httpClient http client to which authentication is provided
     * @param authTokenClient client exchanging authentication token on access token
     */
    constructor(signerService, httpClient, { authStatusPath = DEFAULT_AUTH_STATUS_PATH, siweOptions, }) {
        this.signerService = signerService;
        this.httpClient = httpClient;
        this.isAuthenticating = false;
        this.authStatusPath = authStatusPath;
        this.isBrowser = executionEnvironment() === ExecutionEnvironment.BROWSER;
        this.authTokenClient = new SiweAuthTokensClient(signerService, httpClient, siweOptions);
        axiosRetry(this.httpClient, {
            onRetry: (retryCount, error) => {
                console.warn(`[AUTH SERVICE] retrying request to ${error.config.url} for ${retryCount} time`);
            },
            retryCondition: (error) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isRetry = yield this.handleRequestError(error);
                    return isRetry;
                }
                catch (_) {
                    console.warn(`[AUTH SERVICE] Error handling request error to ${error.config.url}`);
                    return true;
                }
            }),
        });
    }
    /**
     * Verifies current session and establishes new one if needed
     * https://energyweb.atlassian.net/wiki/spaces/MYEN/pages/2303295607/ICL-+ICS+Auth+Process
     */
    login() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.isAuthenticated())) {
                yield this.authenticate();
            }
        });
    }
    /**
     * @description Refreshes access token. If login still fails then signs new identity token and requests access token
     * After authentication runs previously failed requests
     */
    authenticate() {
        return __awaiter(this, void 0, void 0, function* () {
            // First try to refresh access token
            try {
                yield this.refreshToken();
            }
            catch (e) {
                getLogger().warn(`[AuthService] failed to refresh tokens: ${e.message}`);
            }
            // If refresh token failed or access token is not valid, then sign new identity token
            if (!(yield this.isAuthenticated())) {
                getLogger().info('[AuthService] obtaining new tokens');
                delete this.httpClient.defaults.headers.common['Authorization'];
                const res = yield this.authTokenClient.getAuthTokens();
                if (!this.isBrowser) {
                    this.setTokens(res);
                }
            }
            getLogger().info('[AuthService] authenticated');
        });
    }
    /**
     * Checks that auth token has been created, has not expired and corresponds to signer.
     * This is done by a request to the server because the auth token is stored in an HTTP-only cookie and
     * so the Javascript has no way to check its validity
     *
     * @return true if cache client is authenticated server
     */
    isAuthenticated() {
        return __awaiter(this, void 0, void 0, function* () {
            getLogger().info('[AuthService] fetching authorization status');
            try {
                const { data } = yield this.httpClient.get(this.authStatusPath);
                const isAuthenticated = data.user
                    ? data.user === this.signerService.did
                    : false;
                getLogger().info(`[AuthService] authorization status: ${isAuthenticated ? 'OK' : 'FAIL'}`);
                return isAuthenticated;
            }
            catch (error) {
                getLogger().info('[AuthService] authorization status: FAIL');
                if (error instanceof Error) {
                    getLogger().error(`[AuthService] error occurred while checking authorization status: ${error.message}`);
                }
                return false;
            }
        });
    }
    refreshToken() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isBrowser && !this.refresh_token)
                return undefined;
            getLogger().info('[AuthService] refreshing tokens');
            const res = yield this.httpClient.get(`/refresh_token${this.isBrowser ? '' : `?refresh_token=${this.refresh_token}`}`);
            getLogger().debug('[AuthService] refreshed tokens fetched');
            if (!this.isBrowser) {
                this.setTokens(res);
            }
        });
    }
    /**
     * Saves access and refresh tokens from login response
     *
     * @param res Response from login request
     */
    setTokens({ headers, data }) {
        let token;
        let refreshToken;
        if (headers['set-cookie']) {
            const cookies = setCookie.parse(headers['set-cookie'], {
                decodeValues: false,
                map: true,
            });
            const tokenCookie = cookies['token'];
            const refreshTokenCookie = cookies['refreshToken'];
            if (tokenCookie && refreshTokenCookie) {
                token = tokenCookie.value;
                refreshToken = refreshTokenCookie.value;
            }
        }
        if (!token || !refreshToken) {
            token = data.token;
            refreshToken = data.refreshToken;
        }
        this.refresh_token = refreshToken;
        this.httpClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    /**
     * Decides whether to retry the request or not based on the given axios error.
     *
     * @param error axios error
     *
     * @return true if request should be retried
     */
    handleRequestError(error) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            if (!axios.isAxiosError(error)) {
                return false;
            }
            const errorDetails = {
                message: error.message,
                url: error.config.url,
                method: error.config.method,
                requestHeaders: Object.assign(Object.assign({}, error.config.headers), { Authorization: ((_a = error.config.headers) === null || _a === void 0 ? void 0 : _a.Authorization) ? '***' : undefined }),
                status: (_b = error.response) === null || _b === void 0 ? void 0 : _b.status,
                statusText: (_c = error.response) === null || _c === void 0 ? void 0 : _c.statusText,
                responseHeaders: (_d = error.response) === null || _d === void 0 ? void 0 : _d.headers,
            };
            getLogger().debug(`[AUTH SERVICE] axios error: ${JSON.stringify(errorDetails)}`);
            const { config, response } = error;
            if (!response) {
                // ECONNREFUSED error handling,
                return true;
            }
            // Retry server errors
            if (response.status >= 500) {
                return true;
            }
            const clientErrorsToRetry = [401, 403, 407, 408, 411, 412, 425, 426];
            const isAuthEndpoint = config.url &&
                (config.url.indexOf('/login/siwe/initiate') >= 0 ||
                    config.url.indexOf('/login/siwe/verify') >= 0 ||
                    config.url.indexOf('/refresh_token') >= 0 ||
                    config.url.indexOf(DEFAULT_AUTH_STATUS_PATH) >= 0);
            if (isAuthEndpoint) {
                return false;
            }
            // Don't retry client errors, except those of them, which can be solved after taking some action, like authentication
            if (response.status >= 400 &&
                !clientErrorsToRetry.includes(response.status)) {
                return false;
            }
            const isAuthError = [401, 403, 407].includes(response.status);
            if (!isAuthError) {
                return true;
            }
            getLogger().debug(`[AUTH SERVICE] axios error unauthorized`);
            if (!this.isAuthenticating) {
                this.isAuthenticating = true;
                this.authenticatePromise = this.authenticate();
            }
            try {
                yield this.authenticatePromise;
            }
            finally {
                this.isAuthenticating = false;
            }
            return true;
        });
    }
}

class CacheClient {
    constructor(_signerService) {
        this._signerService = _signerService;
        this._signerService.onInit(this.init.bind(this));
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            const { url: cacheClientBaseUrl, auth: { baseUrl: siweBaseUrl, domain }, cacheServerSupportsAuth = false, } = cacheConfigs()[this._signerService.chainId];
            if (!cacheClientBaseUrl) {
                throw new Error('Cache client base url is not set');
            }
            this._httpClient = axios.create({
                baseURL: cacheClientBaseUrl,
                withCredentials: true,
            });
            this.authEnabled = cacheServerSupportsAuth;
            const siweOptions = {
                domain: new URL(domain).host,
                baseUrl: siweBaseUrl,
            };
            this.authService = new AuthService(this._signerService, this._httpClient, {
                authStatusPath: DEFAULT_AUTH_STATUS_PATH,
                siweOptions,
            });
        });
    }
    login() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.authService.login();
        });
    }
    authenticate() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.authService.authenticate();
        });
    }
    isAuthenticated() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authService.isAuthenticated();
        });
    }
    get http() {
        return this._httpClient;
    }
    getRoleDefinition(namespace) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this._httpClient.get(`/role/${namespace}`);
            console.dir(data, { depth: 3, colors: true });
            return data === null || data === void 0 ? void 0 : data.definition;
        });
    }
    getRolesDefinition(namespaces) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this._httpClient.get(`/role?namespaces=${namespaces.join(',')}`);
            const rolesWithDefinitions = data === null || data === void 0 ? void 0 : data.map((entry) => ({
                definition: entry.definition,
                role: entry.namespace,
            }));
            return rolesWithDefinitions.reduce((result, { role, definition }) => {
                return Object.assign(Object.assign({}, result), { [role]: definition });
            }, {});
        });
    }
    getOrgDefinition(namespace) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this._httpClient.get(`/org/${namespace}`);
            return data === null || data === void 0 ? void 0 : data.definition;
        });
    }
    getAppDefinition(namespace) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this._httpClient.get(`/app/${namespace}`);
            return data === null || data === void 0 ? void 0 : data.definition;
        });
    }
    getApplicationRoles(namespace) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this._httpClient.get(`/app/${namespace}/roles`);
            return data;
        });
    }
    getOrganizationRoles(namespace) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this._httpClient.get(`/org/${namespace}/roles`);
            return data;
        });
    }
    getOrganizationsByOwner(owner, withRelations = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this._httpClient.get(`/org/owner/${owner}?withRelations=${withRelations}`);
            return data;
        });
    }
    getSubOrganizationsByOrganization(namespace) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this._httpClient.get(`/org/${namespace}/suborgs`);
            return data;
        });
    }
    getOrgHierarchy(namespace) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this._httpClient.get(`/org/${namespace}`);
            return data;
        });
    }
    getNamespaceBySearchPhrase(search, types) {
        return __awaiter(this, void 0, void 0, function* () {
            if (types && types.length > 0) {
                const { data } = yield this._httpClient.get(`/search/${search}`, {
                    params: {
                        types,
                    },
                    paramsSerializer: (params) => {
                        return stringify(params, { arrayFormat: 'brackets' });
                    },
                });
                return data;
            }
            const { data } = yield this._httpClient.get(`/search/${search}`);
            return data;
        });
    }
    getApplicationsByOwner(owner, withRelations = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this._httpClient.get(`/app/owner/${owner}?withRelations=${withRelations}`);
            return data;
        });
    }
    getApplicationsByOrganization(namespace) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this._httpClient.get(`/org/${namespace}/apps`);
            return data;
        });
    }
    getRolesByOwner(owner) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this._httpClient.get(`/role/owner/${owner}`);
            return data;
        });
    }
    getClaimsBySubjects(subjects) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this._httpClient.get('/claim/by/subjects', {
                params: { subjects: subjects.join(',') },
            });
            return data;
        });
    }
    getClaimsByIssuer(issuer, { isAccepted, namespace } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this._httpClient.get(`/claim/issuer/${issuer}`, {
                params: {
                    isAccepted,
                    namespace,
                },
            });
            return data;
        });
    }
    getClaimsByRequester(requester, { isAccepted, namespace } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this._httpClient.get(`/claim/requester/${requester}`, {
                params: {
                    isAccepted,
                    namespace,
                },
            });
            return data;
        });
    }
    getClaimsBySubject(subject, { isAccepted, namespace } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this._httpClient.get(`/claim/subject/${subject}`, {
                params: {
                    isAccepted,
                    namespace,
                },
            });
            return data;
        });
    }
    getRolesByRevoker(revoker) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this._httpClient.get(`/claim/revoker/roles/allowed/${revoker}`);
            return data;
        });
    }
    getClaimsByRevoker(revoker, { namespace } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this._httpClient.get(`/claim/revoker/${revoker}`, {
                params: {
                    namespace,
                },
            });
            return data;
        });
    }
    getClaimById(claimId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this._httpClient.get(`/claim/${claimId}`);
            return data;
        });
    }
    requestClaim(message) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._httpClient.post('/claim/request', message);
        });
    }
    issueClaim(issuer, message) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._httpClient.post(`/claim/issue/${issuer}`, message);
        });
    }
    rejectClaim(issuer, message) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._httpClient.post(`/claim/reject/${issuer}`, message);
        });
    }
    deleteClaim(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._httpClient.delete(`/claim/${id}`);
        });
    }
    getDIDsForRole(namespace) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this._httpClient.get(`/claim/did/${namespace}?accepted=true`);
            return data;
        });
    }
    getDidDocument(did, includeClaims) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this._httpClient.get(`/DID/${did}?includeClaims=${includeClaims || false}`);
            return data;
        });
    }
    getAllowedRolesByIssuer(did) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this._httpClient.get(`/claim/issuer/roles/allowed/${did}`);
            return data;
        });
    }
    addDIDToWatchList(did) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._httpClient.post(`/DID/${did}`);
        });
    }
    getOwnedAssets(did) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this._httpClient.get(`/assets/owner/${did}`);
            return data;
        });
    }
    getOfferedAssets(did) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this._httpClient.get(`/assets/offered_to/${did}`);
            return data;
        });
    }
    getAssetById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this._httpClient.get(`/assets/${id}`);
            return data;
        });
    }
    getPreviouslyOwnedAssets(owner) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this._httpClient.get(`/assets/owner/history/${owner}`);
            return data;
        });
    }
    getAssetHistory(id, { order, take, skip, type } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = stringify({ order, take, skip, type }, { skipNulls: true });
            const { data } = yield this._httpClient.get(`/assets/history/${id}?${query}`);
            return data;
        });
    }
    /**
     * Sets location of the credential status
     *
     * @param credential unsigned credential
     * @return credential with reference to status location
     */
    addStatusToCredential(credential) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this._httpClient.post('/status-list/entries', { options: {}, credential });
            return data;
        });
    }
    /**
     * Get the StatusList2021Credential object to be signed
     *
     * @param verifiableCredential verifiable credential to be revoked
     * @return unsigned status list credential
     */
    initiateCredentialStatusUpdate(verifiableCredential) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this._httpClient.post('/status-list/credentials/status/initiate', {
                options: {},
                verifiableCredential,
            });
            return data;
        });
    }
    /**
     * Persist signed StatusList2021Credential object in storage.
     *
     * @param statusListCredential signed status list
     * @return status list credential
     */
    persistCredentialStatusUpdate(statusListCredential) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this._httpClient.post('/status-list/credentials/status/finalize', {
                options: {},
                statusListCredential,
            });
            return data;
        });
    }
    /**
     * Fetch the StatusList2021Credential object from storage.
     *
     * @param credential verifiable credential with status list 2021
     * @return status list credential if found
     */
    getStatusListCredential(credential) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if (!((_a = credential.credentialStatus) === null || _a === void 0 ? void 0 : _a.statusListCredential)) {
                throw new Error('Missing statusListCredential property in given credential status');
            }
            const response = yield axios.get((_b = credential.credentialStatus) === null || _b === void 0 ? void 0 : _b.statusListCredential);
            return response.status === 200 ? response.data : null;
        });
    }
    isAuthEnabled() {
        return this.authEnabled;
    }
}

var Order;
(function (Order) {
    Order["ASC"] = "ASC";
    Order["DESC"] = "DESC";
})(Order || (Order = {}));
var SearchType;
(function (SearchType) {
    SearchType["App"] = "App";
    SearchType["Org"] = "Org";
    SearchType["Role"] = "Role";
})(SearchType || (SearchType = {}));

/* Autogenerated file. Do not edit manually. */
const _abi$3 = [
    {
        inputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "node",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "address",
                name: "label",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "bool",
                name: "owner",
                type: "address",
            },
        ],
        name: "NewOwner",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "bytes32",
                name: "owner",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "owner",
                type: "address",
            },
        ],
        name: "Transfer",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "address",
                name: "resolver",
                type: "address",
            },
        ],
        name: "NewResolver",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "uint64",
                name: "ttl",
                type: "uint64",
            },
        ],
        name: "NewTTL",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "owner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "operator",
                type: "address",
            },
            {
                indexed: false,
                name: "approved",
                type: "bool",
            },
        ],
        name: "ApprovalForAll",
        type: "event",
    },
    {
        constant: false,
        inputs: [
            {
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                internalType: "address",
                name: "resolver",
                type: "address",
            },
            {
                internalType: "uint64",
                name: "ttl",
                type: "uint64",
            },
        ],
        name: "setRecord",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
            {
                internalType: "bytes32",
                name: "label",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                internalType: "address",
                name: "resolver",
                type: "address",
            },
            {
                internalType: "uint64",
                name: "ttl",
                type: "uint64",
            },
        ],
        name: "setSubnodeRecord",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
        ],
        name: "setOwner",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
            {
                internalType: "bytes32",
                name: "label",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
        ],
        name: "setSubnodeOwner",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "resolver",
                type: "address",
            },
        ],
        name: "setResolver",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
            {
                internalType: "uint64",
                name: "ttl",
                type: "uint64",
            },
        ],
        name: "setTTL",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                internalType: "address",
                name: "operator",
                type: "address",
            },
            {
                internalType: "bool",
                name: "approved",
                type: "bool",
            },
        ],
        name: "setApprovalForAll",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
        ],
        name: "owner",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
        ],
        name: "resolver",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
        ],
        name: "ttl",
        outputs: [
            {
                internalType: "uint64",
                name: "",
                type: "uint64",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                internalType: "bytes32",
                name: "node",
                type: "bytes32",
            },
        ],
        name: "recordExists",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                internalType: "address",
                name: "operator",
                type: "address",
            },
        ],
        name: "isApprovedForAll",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
];
const _bytecode$3 = "0x608060405234801561001057600080fd5b503360008080600102815260200190815260200160002060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550611230806100776000396000f3fe6080604052600436106100ba576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630178b8bf146100bf57806302571be31461013a57806306ab5923146101b557806314ab90381461022e57806316a25cbd1461027d5780631896f70a146102e05780635b0fc9c31461033b5780635ef2c7f014610396578063a22cb4651461042f578063cf4088231461048c578063e985e9c51461051b578063f79fe538146105a4575b600080fd5b3480156100cb57600080fd5b506100f8600480360360208110156100e257600080fd5b81019080803590602001909291905050506105f7565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561014657600080fd5b506101736004803603602081101561015d57600080fd5b8101908080359060200190929190505050610636565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156101c157600080fd5b50610218600480360360608110156101d857600080fd5b810190808035906020019092919080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506106b9565b6040518082815260200191505060405180910390f35b34801561023a57600080fd5b5061027b6004803603604081101561025157600080fd5b8101908080359060200190929190803567ffffffffffffffff169060200190929190505050610870565b005b34801561028957600080fd5b506102b6600480360360208110156102a057600080fd5b8101908080359060200190929190505050610a04565b604051808267ffffffffffffffff1667ffffffffffffffff16815260200191505060405180910390f35b3480156102ec57600080fd5b506103396004803603604081101561030357600080fd5b8101908080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610a37565b005b34801561034757600080fd5b506103946004803603604081101561035e57600080fd5b8101908080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610bfb565b005b3480156103a257600080fd5b5061042d600480360360a08110156103b957600080fd5b810190808035906020019092919080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803567ffffffffffffffff169060200190929190505050610d75565b005b34801561043b57600080fd5b5061048a6004803603604081101561045257600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803515159060200190929190505050610d97565b005b34801561049857600080fd5b50610519600480360360808110156104af57600080fd5b8101908080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803567ffffffffffffffff169060200190929190505050610e98565b005b34801561052757600080fd5b5061058a6004803603604081101561053e57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610eb3565b604051808215151515815260200191505060405180910390f35b3480156105b057600080fd5b506105dd600480360360208110156105c757600080fd5b8101908080359060200190929190505050610f47565b604051808215151515815260200191505060405180910390f35b600080600083815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b60008060008084815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690503073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614156106af5760009150506106b4565b809150505b919050565b600083600080600083815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690503373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614806107b65750600160008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b15156107c157600080fd5b6000868660405160200180838152602001828152602001925050506040516020818303038152906040528051906020012090506107fe8186610fb5565b85877fce0457fe73731f824cc272376169235128c118b49d344817417c6d108d155e8287604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a38093505050509392505050565b81600080600083815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690503373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16148061096b5750600160008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b151561097657600080fd5b837f1d4f9bbfc9cab89d66e1a1562f2233ccbf1308cb4f63de2ead5787adddb8fa6884604051808267ffffffffffffffff1667ffffffffffffffff16815260200191505060405180910390a28260008086815260200190815260200160002060010160146101000a81548167ffffffffffffffff021916908367ffffffffffffffff16021790555050505050565b600080600083815260200190815260200160002060010160149054906101000a900467ffffffffffffffff169050919050565b81600080600083815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690503373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161480610b325750600160008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b1515610b3d57600080fd5b837f335721b01866dc23fbee8b6b2c7b1e14d6f05c28cd35a2c934239f94095602a084604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a28260008086815260200190815260200160002060010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050505050565b81600080600083815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690503373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161480610cf65750600160008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b1515610d0157600080fd5b610d0b8484610fb5565b837fd4735d920b0f87494915f556dd9b54c8f309026070caea5c737245152564d26684604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a250505050565b6000610d828686866106b9565b9050610d8f81848461100d565b505050505050565b80600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3183604051808215151515815260200191505060405180910390a35050565b610ea28484610bfb565b610ead84838361100d565b50505050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b60008073ffffffffffffffffffffffffffffffffffffffff1660008084815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614159050919050565b8060008084815260200190815260200160002060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050565b60008084815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16141515611130578160008085815260200190815260200160002060010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550827f335721b01866dc23fbee8b6b2c7b1e14d6f05c28cd35a2c934239f94095602a083604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a25b60008084815260200190815260200160002060010160149054906101000a900467ffffffffffffffff1667ffffffffffffffff168167ffffffffffffffff161415156111ff578060008085815260200190815260200160002060010160146101000a81548167ffffffffffffffff021916908367ffffffffffffffff160217905550827f1d4f9bbfc9cab89d66e1a1562f2233ccbf1308cb4f63de2ead5787adddb8fa6882604051808267ffffffffffffffff1667ffffffffffffffff16815260200191505060405180910390a25b50505056fea165627a7a7230582097d721e47a9ff4869bbb0b0ed744e17235a8fa4898f18f39cc24cd0f34654f480029";
class ENSRegistry__factory extends ContractFactory {
    constructor(...args) {
        if (args.length === 1) {
            super(_abi$3, _bytecode$3, args[0]);
        }
        else {
            super(...args);
        }
    }
    deploy(overrides) {
        return super.deploy(overrides || {});
    }
    getDeployTransaction(overrides) {
        return super.getDeployTransaction(overrides || {});
    }
    attach(address) {
        return super.attach(address);
    }
    connect(signer) {
        return super.connect(signer);
    }
    static createInterface() {
        return new utils.Interface(_abi$3);
    }
    static connect(address, signerOrProvider) {
        return new Contract(address, _abi$3, signerOrProvider);
    }
}
ENSRegistry__factory.bytecode = _bytecode$3;
ENSRegistry__factory.abi = _abi$3;

// eslint-disable-next-line @typescript-eslint/no-var-requires
const sha3 = require('js-sha3').keccak_256;
function decodeLabelhash(hash) {
    if (!(hash.startsWith('[') && hash.endsWith(']'))) {
        throw Error('Expected encoded labelhash to start and end with square brackets');
    }
    if (hash.length !== 66) {
        throw Error('Expected encoded labelhash to have a length of 66');
    }
    return `${hash.slice(1, -1)}`;
}
function isEncodedLabelhash(hash) {
    return hash.startsWith('[') && hash.endsWith(']') && hash.length === 66;
}
function namehash$1(inputName) {
    let node = '';
    for (let i = 0; i < 32; i++) {
        node += '00';
    }
    if (inputName) {
        const labels = inputName.split('.');
        for (let i = labels.length - 1; i >= 0; i--) {
            let labelSha;
            if (isEncodedLabelhash(labels[i])) {
                labelSha = decodeLabelhash(labels[i]);
            }
            else {
                const normalizedLabel = normalize(labels[i]);
                labelSha = sha3(normalizedLabel);
            }
            node = sha3(Buffer.from(node + labelSha, 'hex'));
        }
    }
    return '0x' + node;
}
function labelhash(unnormalizedLabelOrLabelhash) {
    return isEncodedLabelhash(unnormalizedLabelOrLabelhash)
        ? '0x' + decodeLabelhash(unnormalizedLabelOrLabelhash)
        : '0x' + sha3(normalize(unnormalizedLabelOrLabelhash));
}

var RegistrationTypes;
(function (RegistrationTypes) {
    RegistrationTypes["OffChain"] = "RegistrationTypes::OffChain";
    RegistrationTypes["OnChain"] = "RegistrationTypes::OnChain";
})(RegistrationTypes || (RegistrationTypes = {}));
var ClaimEventType;
(function (ClaimEventType) {
    ClaimEventType["ISSUE_CREDENTIAL"] = "issue-credential";
    ClaimEventType["REJECT_CREDENTIAL"] = "reject-credential";
    ClaimEventType["REQUEST_CREDENTIALS"] = "request-credential";
})(ClaimEventType || (ClaimEventType = {}));
const readyToBeRegisteredOnchain = (claim) => {
    if (!claim)
        return false;
    if (typeof claim !== 'object')
        return false;
    const requiredProps = [
        'claimType',
        'claimTypeVersion',
        'subject',
        'onChainProof',
        'acceptedBy',
    ];
    const claimProps = Object.keys(claim);
    return requiredProps.every((p) => claimProps.includes(p));
};
const typedMsgPrefix = '1901';
const erc712_type_hash = utils.id('EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)');
const agreement_type_hash = utils.id('Agreement(address subject,bytes32 role,uint256 version)');
const proof_type_hash = utils.id('Proof(address subject,bytes32 role,uint256 version,uint256 expiry,address issuer)');
const eternityTimestamp = Number.MAX_SAFE_INTEGER - 1; // constraint of ethers.BigNumber

var NamespaceType;
(function (NamespaceType) {
    NamespaceType["Role"] = "roles";
    NamespaceType["Application"] = "apps";
    NamespaceType["Organization"] = "org";
})(NamespaceType || (NamespaceType = {}));
const NODE_FIELDS_KEY = 'metadata';
// TODO: remove once all of the VOLTA roles have been migrated to v2
function castToV2(roleDef) {
    if (!Object.keys(roleDef).includes('revoker')) {
        const revoker = {
            did: roleDef.issuer.did,
            revokerType: roleDef.issuer.issuerType,
            roleName: roleDef.issuer.roleName,
        };
        return Object.assign(Object.assign({}, roleDef), { revoker });
    }
    else {
        return roleDef;
    }
}

/**
 * Validate that address is valid ethereum address.
 * Expect that error is thrown if not
 * Uses ethers function but encapsulates to be able to swap in the future:
 * https://docs.ethers.io/v5/api/utils/address/#utils-getAddress
 * @param address address to verify
 */
function validateAddress(address) {
    utils.getAddress(address);
}

class UnregisteredResolverError extends Error {
    constructor(domain, resolver) {
        super(`Domain ${domain} is defined on unregistered resolver ${resolver}`);
    }
}

/**
 * Service responsible for handling the request to ENS, creating roles/organizations/applications namespaces.
 * See more information about ENS and domains in IAM stack [here](https://energy-web-foundation.gitbook.io/energy-web/how-tos-and-tutorials/using-the-ethereum-name-service-ens).
 *
 * ```typescript
 * const { connectToCacheServer } = await initWithPrivateKeySigner(privateKey, rpcUrl);
 * const { domainsService } = await connectToCacheServer();
 * domainsService.createOrganization(...);
 * ```
 */
class DomainsService {
    constructor(_signerService, _cacheClient) {
        this._signerService = _signerService;
        this._cacheClient = _cacheClient;
        this._ttl = BigNumber.from(0);
        this._signerService.onInit(this.init.bind(this));
    }
    static create(signerService, cacheClient) {
        return __awaiter(this, void 0, void 0, function* () {
            const service = new DomainsService(signerService, cacheClient);
            yield service.init();
            return service;
        });
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            const chainId = this._signerService.chainId;
            this.chainId = chainId;
            const provider = this._signerService.provider;
            const { ensRegistryAddress, ensResolverV2Address, ensResolverAddress, ensPublicResolverAddress, domainNotifierAddress, } = chainConfigs()[this.chainId];
            this._ensRegistryAddress = ensRegistryAddress;
            this._ensResolver = ensResolverV2Address;
            this._ensResolverV2Address = ensResolverV2Address;
            this._ensResolverAddress = ensResolverAddress;
            this._ensPublicResolverAddress = ensPublicResolverAddress;
            this._ensRegistry = new ENSRegistry__factory(ENSRegistry__factory.createInterface(), ENSRegistry__factory.bytecode)
                .attach(ensRegistryAddress)
                .connect(provider);
            this._domainDefinitionReader = new DomainReader({
                ensRegistryAddress,
                provider,
            });
            this._domainDefinitionReader.addKnownResolver({
                chainId,
                address: ensResolverV2Address,
                type: ResolverContractType.RoleDefinitionResolver_v2,
            });
            // until role definitions are migrated to resolver_v2
            if (chainId === VOLTA_CHAIN_ID$1) {
                this._domainDefinitionReader.addKnownResolver({
                    chainId,
                    address: ensResolverAddress,
                    type: ResolverContractType.RoleDefinitionResolver_v1,
                });
                this._domainDefinitionReader.addKnownResolver({
                    chainId,
                    address: ensPublicResolverAddress,
                    type: ResolverContractType.PublicResolver,
                });
            }
            this._domainDefinitionTransactionFactory = new DomainTransactionFactoryV2({
                domainResolverAddress: ensResolverV2Address,
            });
            this._domainHierarchy = new DomainHierarchy({
                domainReader: this._domainDefinitionReader,
                ensRegistryAddress: ensRegistryAddress,
                provider,
                domainNotifierAddress: domainNotifierAddress,
                publicResolverAddress: ensPublicResolverAddress,
            });
            this._owner = this._signerService.address;
        });
    }
    /**
     * Update ENS domain definition for already created domain.
     *
     * ```typescript
     * domainsService.setRoleDefinition({
     *     name: 'auth.apps.energyweb.iam.ewc',
     *     data: {
     *         appName: 'Auth service',
     *     }
     * });
     * ```
     *
     * @param {SetRoleDefinitionOptions} options object containing options
     */
    setRoleDefinition({ domain, data, }) {
        return __awaiter(this, void 0, void 0, function* () {
            // Special case of updating legacy PublicResolver definitions
            if (yield this.updateLegacyDefinition(domain, data)) {
                return;
            }
            // Standard update
            yield this._signerService.send(Object.assign({}, this._domainDefinitionTransactionFactory.editDomain({
                domain,
                domainDefinition: data,
            })));
        });
    }
    /**
     * Create organization domain with given definition for given namespace.
     * Also includes creating subdomains for roles and applications. (roles.yourOrg.ewc, apps.yourOrg.ewc).
     *
     * ```typescript
     * domainsService.createOrganization({
     *     orgName: 'auth',
     *     namespace: 'energyweb.iam.ewc',
     *     data: {
     *         orgName: 'Auth service',
     *     },
     *     returnSteps: true,
     * });
     * ```
     *
     * @param {CreateOrganizationOptions} options object containing options
     * @returns array of steps if `returnSteps` is true
     */
    createOrganization({ orgName, namespace, data, returnSteps, }) {
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function* () {
            const orgDomain = `${orgName}.${namespace}`;
            const rolesDomain = `${NamespaceType.Role}.${orgDomain}`;
            const appsDomain = `${NamespaceType.Application}.${orgDomain}`;
            if (!(yield this.isOwner({ domain: namespace, user: this._owner }))) {
                throw new Error(ERROR_MESSAGES.NOT_AUTHORIZED_TO_CHANGE_DOMAIN);
            }
            const steps = [
                {
                    tx: this.createSubdomainTx({
                        domain: namespace,
                        nodeName: orgName,
                        owner: this._owner,
                    }),
                    info: 'Create organization subdomain',
                },
                {
                    tx: this._domainDefinitionTransactionFactory.newDomain({
                        domain: orgDomain,
                        domainDefinition: data,
                    }),
                    info: 'Register reverse name and set definition for organization subdomain',
                },
                {
                    tx: this.createSubdomainTx({
                        domain: orgDomain,
                        nodeName: NamespaceType.Role,
                        owner: this._owner,
                    }),
                    info: 'Create roles subdomain for organization',
                },
                {
                    tx: this._domainDefinitionTransactionFactory.setDomainNameTx({
                        domain: rolesDomain,
                    }),
                    info: 'Register reverse name for roles subdomain',
                },
                {
                    tx: this.createSubdomainTx({
                        domain: orgDomain,
                        nodeName: NamespaceType.Application,
                        owner: this._owner,
                    }),
                    info: 'Create app subdomain for organization',
                },
                {
                    tx: this._domainDefinitionTransactionFactory.setDomainNameTx({
                        domain: appsDomain,
                    }),
                    info: 'Register reverse name for app subdomain',
                },
            ].map((step) => (Object.assign(Object.assign({}, step), { next: () => __awaiter(this, void 0, void 0, function* () {
                    yield this._signerService.send(Object.assign({}, step.tx));
                }) })));
            if (returnSteps) {
                return steps;
            }
            else {
                try {
                    for (var steps_1 = __asyncValues(steps), steps_1_1; steps_1_1 = yield steps_1.next(), !steps_1_1.done;) {
                        const step = steps_1_1.value;
                        yield step.next();
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (steps_1_1 && !steps_1_1.done && (_a = steps_1.return)) yield _a.call(steps_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                return;
            }
        });
    }
    /**
     * Create application domain with given definition for given namespace.
     * Also includes creating subdomain for roles. (roles.yourApp.apps.yourOrg.ewc).
     *
     * ```typescript
     * domainsService.createApplication({
     *     appName: 'auth',
     *     namespace: 'apps.energyweb.iam.ewc',
     *     data: {
     *         appName: 'Auth service',
     *     },
     *     returnSteps: true,
     * });
     * ```
     *
     * @param {CreateApplicationOptions} options object containing options
     * @returns array of steps if `returnSteps` is true
     */
    createApplication({ appName, namespace: domain, data, returnSteps, }) {
        var e_2, _a;
        return __awaiter(this, void 0, void 0, function* () {
            const appDomain = `${appName}.${domain}`;
            const from = yield this.getOwner({ namespace: domain });
            const steps = [
                {
                    tx: this.createSubdomainTx({ domain, nodeName: appName, owner: from }),
                    info: 'Set subdomain for application',
                },
                {
                    tx: this._domainDefinitionTransactionFactory.newDomain({
                        domainDefinition: data,
                        domain: appDomain,
                    }),
                    info: 'Set name definition for application',
                },
                {
                    tx: this.createSubdomainTx({
                        domain: appDomain,
                        nodeName: NamespaceType.Role,
                        owner: from,
                    }),
                    info: 'Create roles subdomain for application',
                },
                {
                    tx: this._domainDefinitionTransactionFactory.setDomainNameTx({
                        domain: `${NamespaceType.Role}.${appDomain}`,
                    }),
                    info: 'Set name for roles subdomain for application',
                },
            ].map((step) => (Object.assign(Object.assign({}, step), { next: () => __awaiter(this, void 0, void 0, function* () {
                    yield this._signerService.send(step.tx);
                }) })));
            if (returnSteps) {
                return steps;
            }
            try {
                for (var steps_2 = __asyncValues(steps), steps_2_1; steps_2_1 = yield steps_2.next(), !steps_2_1.done;) {
                    const step = steps_2_1.value;
                    yield step.next();
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (steps_2_1 && !steps_2_1.done && (_a = steps_2.return)) yield _a.call(steps_2);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return;
        });
    }
    /**
     * Create role domain with given definition for given namespace.
     *
     * ```typescript
     * domainsService.createRole({
     *     appName: 'root',
     *     namespace: 'roles.energyweb.iam.ewc',
     *     data: {
     *         version: 1,
     *         issuer: {
     *             issuerType: 'DID',
     *             did: ['did:ethr:volta:0x00...0'],
     *         },
     *         revoker: {
     *             issuerType: 'DID',
     *             did: ['did:ethr:volta:0x00...0'],
     *         },
     *         enrolmentPreconditions: [],
     *     },
     *     returnSteps: true,
     * });
     * ```
     *
     * @param {CreateRoleOptions} options object containing options
     * @returns array of steps if `returnSteps` is true
     */
    createRole({ roleName, namespace, data, returnSteps, }) {
        var e_3, _a;
        return __awaiter(this, void 0, void 0, function* () {
            const dataV2 = castToV2(data);
            const newDomain = `${roleName}.${namespace}`;
            const from = yield this.getOwner({ namespace });
            const steps = [
                {
                    tx: this.createSubdomainTx({
                        domain: namespace,
                        nodeName: roleName,
                        owner: from,
                    }),
                    info: 'Create subdomain for role',
                },
                {
                    tx: this._domainDefinitionTransactionFactory.newRole({
                        domain: newDomain,
                        roleDefinition: dataV2,
                    }),
                    info: 'Set name and definition for role',
                },
            ].map((step) => (Object.assign(Object.assign({}, step), { next: () => __awaiter(this, void 0, void 0, function* () {
                    yield this._signerService.send(step.tx);
                }) })));
            if (returnSteps) {
                return steps;
            }
            try {
                for (var steps_3 = __asyncValues(steps), steps_3_1; steps_3_1 = yield steps_3.next(), !steps_3_1.done;) {
                    const step = steps_3_1.value;
                    yield step.next();
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (steps_3_1 && !steps_3_1.done && (_a = steps_3.return)) yield _a.call(steps_3);
                }
                finally { if (e_3) throw e_3.error; }
            }
            return;
        });
    }
    readName(namehashToRead) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._domainDefinitionReader.readName(namehashToRead);
        });
    }
    /**
     * Change owner of organization domain including all subdomains.
     *
     * ```typescript
     * domainsService.changeOrgOwnership({
     *     namespace: 'energyweb.iam.ewc',
     *     newOwner: '0x00...0',
     *     returnSteps: true,
     *     withSubdomains: true,
     * });
     * ```
     *
     * @param {ChangeOrgOwnershipOptions} options object containing options
     * @returns array of steps if `returnSteps` is true
     */
    changeOrgOwnership({ namespace, newOwner, returnSteps = false, withSubdomains = false, }) {
        var e_4, _a, e_5, _b;
        return __awaiter(this, void 0, void 0, function* () {
            DomainsService.validateOwnerAddress(newOwner);
            const orgNamespaces = [
                `${NamespaceType.Role}.${namespace}`,
                `${NamespaceType.Application}.${namespace}`,
                namespace,
            ];
            const { alreadyFinished, changeOwnerNamespaces, notOwnedNamespaces } = yield this.validateChangeOwnership({
                newOwner,
                namespaces: orgNamespaces,
            });
            if (notOwnedNamespaces.length > 0) {
                throw new ChangeOwnershipNotPossibleError({
                    namespace,
                    notOwnedNamespaces,
                });
            }
            const apps = yield this.getAppsOfOrg(namespace);
            if (apps && apps.length > 0) {
                if (!withSubdomains) {
                    throw new Error('You are not able to change ownership of organization with registered apps');
                }
                else {
                    try {
                        for (var apps_1 = __asyncValues(apps), apps_1_1; apps_1_1 = yield apps_1.next(), !apps_1_1.done;) {
                            const { namespace: ns } = apps_1_1.value;
                            yield this.changeAppOwnership({
                                namespace: ns,
                                newOwner,
                                returnSteps,
                            });
                        }
                    }
                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                    finally {
                        try {
                            if (apps_1_1 && !apps_1_1.done && (_a = apps_1.return)) yield _a.call(apps_1);
                        }
                        finally { if (e_4) throw e_4.error; }
                    }
                }
            }
            if (alreadyFinished.length > 0) {
                getLogger().info(`Already changed ownership of ${alreadyFinished.join(', ')}`);
            }
            const steps = changeOwnerNamespaces.map((nmspace) => {
                const tx = this.changeDomainOwnerTx({ newOwner, namespace: nmspace });
                return {
                    tx,
                    next: ({ retryCheck } = {}) => __awaiter(this, void 0, void 0, function* () {
                        if (retryCheck) {
                            const owner = yield this.getOwner({ namespace: nmspace });
                            if (owner === newOwner)
                                return;
                        }
                        return this._signerService.send(tx);
                    }),
                    info: `Changing ownership of ${nmspace}`,
                };
            });
            if (returnSteps) {
                return steps;
            }
            try {
                for (var steps_4 = __asyncValues(steps), steps_4_1; steps_4_1 = yield steps_4.next(), !steps_4_1.done;) {
                    const step = steps_4_1.value;
                    yield step.next();
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (steps_4_1 && !steps_4_1.done && (_b = steps_4.return)) yield _b.call(steps_4);
                }
                finally { if (e_5) throw e_5.error; }
            }
            return;
        });
    }
    /**
     * Change owner of application domain.
     *
     * ```typescript
     * domainsService.changeAppOwnership({
     *     namespace: 'auth.apps.energyweb.iam.ewc',
     *     newOwner: '0x00...0',
     *     returnSteps: true,
     * });
     * ```
     *
     * @param {ChangeAppOwnershipOptions} options object containing options
     * @returns array of steps if `returnSteps` is true
     */
    changeAppOwnership({ namespace, newOwner, returnSteps, }) {
        var e_6, _a;
        return __awaiter(this, void 0, void 0, function* () {
            DomainsService.validateOwnerAddress(newOwner);
            const roles = yield this.getRolesByNamespace({
                namespace,
                parentType: NamespaceType.Application,
            });
            const appNamespaces = [
                ...roles.map((r) => r.namespace),
                `${NamespaceType.Role}.${namespace}`,
                namespace,
            ];
            const { alreadyFinished, changeOwnerNamespaces, notOwnedNamespaces } = yield this.validateChangeOwnership({
                newOwner,
                namespaces: appNamespaces,
            });
            if (notOwnedNamespaces.length > 0) {
                throw new ChangeOwnershipNotPossibleError({
                    namespace,
                    notOwnedNamespaces,
                });
            }
            if (alreadyFinished.length > 0) {
                getLogger().info(`Already changed ownership of ${alreadyFinished.join(', ')}`);
            }
            const steps = changeOwnerNamespaces.map((name) => {
                const tx = this.changeDomainOwnerTx({ newOwner, namespace: name });
                return {
                    tx,
                    next: ({ retryCheck } = {}) => __awaiter(this, void 0, void 0, function* () {
                        if (retryCheck) {
                            const owner = yield this.getOwner({ namespace: name });
                            if (owner === newOwner)
                                return;
                        }
                        return this._signerService.send(tx);
                    }),
                    info: `Changing ownership of ${name}`,
                };
            });
            if (returnSteps) {
                return steps;
            }
            try {
                for (var steps_5 = __asyncValues(steps), steps_5_1; steps_5_1 = yield steps_5.next(), !steps_5_1.done;) {
                    const step = steps_5_1.value;
                    yield step.next();
                }
            }
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (steps_5_1 && !steps_5_1.done && (_a = steps_5.return)) yield _a.call(steps_5);
                }
                finally { if (e_6) throw e_6.error; }
            }
            return;
        });
    }
    /**
     * Change owner of role domain.
     *
     * ```typescript
     * domainsService.changeRoleOwnership({
     *     namespace: 'root.roles.energyweb.iam.ewc',
     *     newOwner: '0x00...0',
     * });
     * ```
     *
     * @param {ChangeRoleOwnershipOptions} options object containing options
     */
    changeRoleOwnership({ namespace, newOwner, }) {
        return __awaiter(this, void 0, void 0, function* () {
            DomainsService.validateOwnerAddress(newOwner);
            const notOwnedNamespaces = yield this.validateOwnership({
                namespace,
                type: NamespaceType.Role,
            });
            if (notOwnedNamespaces.length > 0) {
                throw new ChangeOwnershipNotPossibleError({
                    namespace,
                    notOwnedNamespaces,
                });
            }
            yield this._signerService.send(this.changeDomainOwnerTx({ namespace, newOwner }));
        });
    }
    /**
     * Delete organization domain and all subdomains.
     *
     * ```typescript
     * domainsService.deleteOrganization({
     *     namespace: 'energyweb.iam.ewc',
     *     returnSteps: true,
     * });
     * ```
     *
     * @param {DeleteOrganizationOptions} options object containing options
     * @returns array of steps if `returnSteps` is true
     */
    deleteOrganization({ namespace, returnSteps = false, }) {
        var e_7, _a;
        return __awaiter(this, void 0, void 0, function* () {
            const apps = this._cacheClient
                ? yield this.getAppsOfOrg(namespace)
                : yield this.getSubdomains({
                    domain: `${NamespaceType.Application}.${namespace}`,
                });
            if (apps && apps.length > 0) {
                throw new Error(ERROR_MESSAGES.ORG_WITH_APPS);
            }
            const roles = this._cacheClient
                ? yield this._cacheClient.getOrganizationRoles(namespace)
                : yield this.getSubdomains({
                    domain: `${NamespaceType.Role}.${namespace}`,
                });
            if (roles && roles.length > 0) {
                throw new Error(ERROR_MESSAGES.ORG_WITH_ROLES);
            }
            const orgNamespaces = [
                `${NamespaceType.Role}.${namespace}`,
                `${NamespaceType.Application}.${namespace}`,
                namespace,
            ];
            const { alreadyFinished, namespacesToDelete, notOwnedNamespaces } = yield this.validateDeletePossibility({
                namespaces: orgNamespaces,
            });
            if (notOwnedNamespaces.length > 0) {
                throw new DeletingNamespaceNotPossibleError({
                    namespace,
                    notOwnedNamespaces,
                });
            }
            if (alreadyFinished.length > 0) {
                getLogger().info(`Already deleted: ${alreadyFinished.join(', ')}`);
            }
            const steps = namespacesToDelete.map((n) => {
                const tx = this.deleteDomainTx({ namespace: n });
                return {
                    tx,
                    next: ({ retryCheck } = {}) => __awaiter(this, void 0, void 0, function* () {
                        if (retryCheck) {
                            const owner = yield this.getOwner({ namespace: n });
                            if (owner === emptyAddress)
                                return;
                        }
                        return this._signerService.send(tx);
                    }),
                    info: `Deleting ${n}`,
                };
            });
            if (returnSteps) {
                return steps;
            }
            try {
                for (var steps_6 = __asyncValues(steps), steps_6_1; steps_6_1 = yield steps_6.next(), !steps_6_1.done;) {
                    const step = steps_6_1.value;
                    yield step.next();
                }
            }
            catch (e_7_1) { e_7 = { error: e_7_1 }; }
            finally {
                try {
                    if (steps_6_1 && !steps_6_1.done && (_a = steps_6.return)) yield _a.call(steps_6);
                }
                finally { if (e_7) throw e_7.error; }
            }
            return;
        });
    }
    /**
     * Delete application domain and all subdomains.
     *
     * ```typescript
     * domainsService.deleteApplication({
     *     namespace: 'auth.apps.energyweb.iam.ewc',
     *     returnSteps: true,
     * });
     * ```
     *
     * @param {DeleteApplicationOptions} options object containing options
     * @returns array of steps if `returnSteps` is true
     */
    deleteApplication({ namespace, returnSteps = false, }) {
        var e_8, _a;
        return __awaiter(this, void 0, void 0, function* () {
            const roles = this._cacheClient
                ? yield this._cacheClient.getApplicationRoles(namespace)
                : yield this.getSubdomains({
                    domain: `${NamespaceType.Role}.${namespace}`,
                });
            if (roles && roles.length > 0) {
                throw new Error(ERROR_MESSAGES.APP_WITH_ROLES);
            }
            const appNamespaces = [`${NamespaceType.Role}.${namespace}`, namespace];
            const { alreadyFinished, namespacesToDelete, notOwnedNamespaces } = yield this.validateDeletePossibility({
                namespaces: appNamespaces,
            });
            if (notOwnedNamespaces.length > 0) {
                throw new DeletingNamespaceNotPossibleError({
                    namespace,
                    notOwnedNamespaces,
                });
            }
            if (alreadyFinished.length > 0) {
                getLogger().info(`Already deleted: ${alreadyFinished.join(', ')}`);
            }
            const steps = namespacesToDelete.map((nspace) => {
                const tx = this.deleteDomainTx({ namespace: nspace });
                return {
                    tx,
                    next: ({ retryCheck } = {}) => __awaiter(this, void 0, void 0, function* () {
                        if (retryCheck) {
                            const owner = yield this.getOwner({ namespace: nspace });
                            if (owner === emptyAddress)
                                return;
                        }
                        return this._signerService.send(tx);
                    }),
                    info: `Deleting ${nspace}`,
                };
            });
            if (returnSteps) {
                return steps;
            }
            try {
                for (var steps_7 = __asyncValues(steps), steps_7_1; steps_7_1 = yield steps_7.next(), !steps_7_1.done;) {
                    const step = steps_7_1.value;
                    yield step.next();
                }
            }
            catch (e_8_1) { e_8 = { error: e_8_1 }; }
            finally {
                try {
                    if (steps_7_1 && !steps_7_1.done && (_a = steps_7.return)) yield _a.call(steps_7);
                }
                finally { if (e_8) throw e_8.error; }
            }
            return;
        });
    }
    /**
     * Delete role domain.
     *
     * ```typescript
     * domainsService.deleteRole({
     *     namespace: 'auth.roles.energyweb.iam.ewc',
     * });
     * ```
     *
     * @param {DeleteRoleOptions} options object containing options
     */
    deleteRole({ namespace }) {
        return __awaiter(this, void 0, void 0, function* () {
            const notOwnedNamespaces = yield this.validateOwnership({
                namespace,
                type: NamespaceType.Role,
            });
            if (notOwnedNamespaces.length > 0) {
                throw new DeletingNamespaceNotPossibleError({
                    namespace,
                    notOwnedNamespaces,
                });
            }
            yield this._signerService.send(this.deleteDomainTx({ namespace }));
        });
    }
    /**
     * Fetch cached domain definition for organization, application or role.
     *
     * ```typescript
     * domainsService.getDefinition({
     *     type: NamespaceType.Role,
     *     namespace: 'auth.roles.energyweb.iam.ewc',
     * });
     * ```
     *
     * @param {DeleteRoleOptions} options object containing options
     * @return domain definition
     */
    getDefinition({ type, namespace, }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (type === NamespaceType.Role) {
                return this._cacheClient.getRoleDefinition(namespace);
            }
            if (type === NamespaceType.Application) {
                return this._cacheClient.getAppDefinition(namespace);
            }
            if (type === NamespaceType.Organization) {
                return this._cacheClient.getOrgDefinition(namespace);
            }
            throw new ENSTypeNotSupportedError();
        });
    }
    /**
     * Fetch all roles subdomains for certain domain.
     *
     * ```typescript
     * domainsService.getRolesByNamespace({
     *     parentType: NamespaceType.Application,
     *     namespace: 'auth.apps.energyweb.iam.ewc',
     * });
     * ```
     *
     * @param {GetRolesByNamespaceOptions} options object containing options
     * @returns array of role subdomains
     */
    getRolesByNamespace({ parentType, namespace, }) {
        if (parentType === NamespaceType.Organization) {
            return this._cacheClient.getOrganizationRoles(namespace);
        }
        if (parentType === NamespaceType.Application) {
            return this._cacheClient.getApplicationRoles(namespace);
        }
        throw new ENSTypeNotSupportedError();
    }
    /**
     * Get all roles that a DID can issue.
     *
     * ```typescript
     * domainsService.getAllowedRolesByIssuer('did:ethr:0x00...0');
     * ```
     *
     * @param {String} did issuer DID
     * @returns array of roles that the DID can issue
     */
    getAllowedRolesByIssuer(did) {
        return this._cacheClient.getAllowedRolesByIssuer(did);
    }
    /**
     * Get all roles that a DID can revoke.
     *
     * ```typescript
     * domainsService.getAllowedRolesByRevoker('did:ethr:0x00...0');
     * ```
     *
     * @param {String} did issuer DID
     * @returns array of roles that the DID can issue
     */
    getAllowedRolesByRevoker(did) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._cacheClient.getRolesByRevoker(did);
        });
    }
    /**
     * Get all organization/application/role for certain owner.
     *
     * ```typescript
     * domainsService.getENSTypesByOwner({
     *     type: NamespaceType.Organization,
     *     owner: '0x00...0',
     *     withRelations: true,
     * });
     * ```
     *
     * @param {GetENSTypesByOwnerOptions} options object containing options
     * @returns array of organizations/applications/roles for certain owner
     */
    getENSTypesByOwner({ type, owner, withRelations = true, }) {
        DomainsService.validateOwnerAddress(owner);
        if (type === NamespaceType.Organization) {
            return this._cacheClient.getOrganizationsByOwner(owner, withRelations);
        }
        if (type === NamespaceType.Application) {
            return this._cacheClient.getApplicationsByOwner(owner, withRelations);
        }
        if (type === NamespaceType.Role) {
            return this._cacheClient.getRolesByOwner(owner);
        }
        throw new ENSTypeNotSupportedError();
    }
    /**
     * Search for organization/application/role with a given search phrase.
     *
     * ```typescript
     * domainsService.getENSTypesBySearchPhrase({
     *     types: [SearchType.App, SearchType.Org, SearchType.Role],
     *     search: 'energyweb',
     * });
     * ```
     *
     * @param {String} search search phrase
     * @param {Array<SearchType>} types ENS types to search
     * @returns array of founded organizations/applications/roles
     */
    getENSTypesBySearchPhrase(search, types) {
        return this._cacheClient.getNamespaceBySearchPhrase(search, types);
    }
    /**
     * Fetch all applications for organization namespace.
     *
     * ```typescript
     * domainsService.getAppsOfOrg('energyweb.iam.ewc');
     * ```
     *
     * @param {String} org organization namespace
     * @returns array of applications
     */
    getAppsOfOrg(org) {
        return this._cacheClient.getApplicationsByOrganization(org);
    }
    /**
     * Fetch all sub-organizations for organization namespace.
     *
     * ```typescript
     * domainsService.getSubOrgsByOrgNamespace('energyweb.iam.ewc');
     * ```
     *
     * @param {String} namespace organization namespace
     * @returns array of sub-organizations
     */
    getSubOrgsByOrgNamespace(namespace) {
        return this._cacheClient.getSubOrganizationsByOrganization(namespace);
    }
    /**
     * Get organization hierarchy. Max 20 levels deep.
     *
     * ```typescript
     * domainsService.getOrgHierarchy('energyweb.iam.ewc');
     * ```
     *
     * @param {String} namespace organization namespace
     * @returns organization with all nested sub-organizations
     */
    getOrgHierarchy(namespace) {
        return __awaiter(this, void 0, void 0, function* () {
            const org = yield this._cacheClient.getOrgHierarchy(namespace);
            [
                org,
                ...(org.subOrgs || []),
                ...(org.apps || []),
                ...(org.roles || []),
            ].forEach((domain) => (domain.isOwnedByCurrentUser = domain.owner === this._owner));
            return org;
        });
    }
    /**
     * Get users did which have certain role.
     *
     * ```typescript
     * domainsService.getDIDsByRole('auth.roles.energyweb.iam.ewc');
     * ```
     *
     * @param {String} role role namespace
     * @returns array of users DID
     */
    getDIDsByRole(role) {
        return this._cacheClient.getDIDsForRole(role);
    }
    /**
     * Fetch subdomains for certain domain.
     *
     * ```typescript
     * domainsService.getSubdomains({
     *     domain: 'energyweb.iam.ewc',
     *     mode: 'ALL',
     * });
     * ```
     *
     * @param {GetSubdomainsOptions} options object containing options
     * @returns array of subdomains
     */
    getSubdomains({ domain, mode = 'FIRSTLEVEL', }) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._domainHierarchy.getSubdomainsUsingResolver({
                domain,
                mode,
            });
        });
    }
    /**
     * Check if domain exists in ENS registry.
     *
     * ```typescript
     * domainsService.checkExistenceOfDomain({
     *     domain: 'some.energyweb.iam.ewc',
     * });
     * ```
     *
     * @param {CheckExistenceOfDomainOptions} options object containing options
     * @return true if domain exists, false otherwise
     */
    checkExistenceOfDomain({ domain, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const domainHash = namehash$1(domain);
            const [exists, isOwned] = yield Promise.all([
                this._ensRegistry.recordExists(domainHash),
                (() => __awaiter(this, void 0, void 0, function* () {
                    const owner = yield this._ensRegistry.owner(domainHash);
                    return owner !== emptyAddress;
                }))(),
            ]);
            return exists && isOwned;
        });
    }
    /**
     * Check if user is owner of the domain.
     *
     * ```typescript
     * domainsService.isOwner({
     *     domain: 'energyweb.iam.ewc',
     *     user: '0x00...0',
     * });
     * ```
     *
     * @param {IsOwnerOptions} options object containing options
     * @return true if user is owner, false otherwise
     */
    isOwner({ domain, user = this._owner, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const domainHash = namehash$1(domain);
            const owner = yield this._ensRegistry.owner(domainHash);
            return owner === user;
        });
    }
    /**
     * Get not owned domains in given namespace for current user.
     *
     * ```typescript
     * domainsService.validateOwnership({
     *     namespace: 'energyweb.iam.ewc',
     *     type: NamespaceType.Organization,
     * });
     * ```
     *
     * @param {ValidateOwnershipOptions} options object containing options
     * @returns array of not owned domains
     */
    validateOwnership({ namespace, type, }) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.nonOwnedNodesOf({ namespace, type, owner: this._owner });
        });
    }
    /**
     * Move domain to latest version of resolver.
     *
     * In initial version, role definitions where contained in ENS PublicResolver.
     * However, in order for key properties of role definitions to be readable on-chain, a new RoleDefinitionResolver is used.
     * This function sets the resolver in the ENS to the new contract for definitions that are pointing to the old contract.
     *
     * ```typescript
     * domainsService.updateLegacyDefinition({
     *     namespace: 'energyweb.iam.ewc',
     *     data: {
     *          orgName: 'Energy Web Foundation',
     *     },
     * });
     *
     * @param {String} domain domain namespace to update
     * @param {DomainDefinition} data definition to apply to domain
     * @return true if domain was updated, false otherwise
     */
    updateLegacyDefinition(domain, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const node = namehash$1(domain);
            const currentResolverAddress = yield this._ensRegistry.resolver(node);
            const { ensResolverV2Address, ensRegistryAddress } = chainConfigs()[this.chainId];
            if (currentResolverAddress !== ensResolverV2Address) {
                const updateResolverTransaction = {
                    to: ensRegistryAddress,
                    data: this._ensRegistry.interface.encodeFunctionData('setResolver', [
                        node,
                        ensResolverV2Address,
                    ]),
                };
                // Need to use newRole/newDomain as need to set reverse domain name
                const updateDomain = DomainReader.isRoleDefinition(data)
                    ? this._domainDefinitionTransactionFactory.newRole({
                        domain,
                        roleDefinition: Object.assign(Object.assign({}, castToV2(data)), { version: parseInt(data.version.toString(), 10) }),
                    })
                    : this._domainDefinitionTransactionFactory.newDomain({
                        domain,
                        domainDefinition: data,
                    });
                yield this._signerService.send(updateResolverTransaction);
                yield this._signerService.send(updateDomain);
                return true;
            }
            return false;
        });
    }
    /**
     * Get possible registration types for given roles.
     *
     * ```typescript
     * domainsService.registrationTypesOfRoles(['root.roles.energyweb.iam.ewc', 'admin.roles.energyweb.iam.ewc']);
     *
     * @param {Array<String>} roles array of roles
     * @return object containing registration types for given roles as keys
     */
    registrationTypesOfRoles(roles) {
        var roles_1, roles_1_1;
        var e_9, _a;
        return __awaiter(this, void 0, void 0, function* () {
            const types = roles.reduce((acc, role) => (Object.assign(Object.assign({}, acc), { [role]: new Set() })), {});
            try {
                for (roles_1 = __asyncValues(roles); roles_1_1 = yield roles_1.next(), !roles_1_1.done;) {
                    const role = roles_1_1.value;
                    const def = yield this.getDefinition({
                        type: NamespaceType.Role,
                        namespace: role,
                    });
                    if (!DomainReader.isRoleDefinition(def)) {
                        continue;
                    }
                    const resolver = yield this._ensRegistry.resolver(namehash$1(role));
                    if ([this._ensResolverAddress, this._ensResolverV2Address].includes(resolver)) {
                        types[role].add(RegistrationTypes.OnChain);
                        types[role].add(RegistrationTypes.OffChain);
                    }
                    else if (resolver === this._ensPublicResolverAddress) {
                        types[role].add(RegistrationTypes.OffChain);
                    }
                    else {
                        throw new UnregisteredResolverError(role, resolver);
                    }
                }
            }
            catch (e_9_1) { e_9 = { error: e_9_1 }; }
            finally {
                try {
                    if (roles_1_1 && !roles_1_1.done && (_a = roles_1.return)) yield _a.call(roles_1);
                }
                finally { if (e_9) throw e_9.error; }
            }
            return types;
        });
    }
    /**
     * Collect related data for given domain. Currently only related data is owner.
     *
     * ```typescript
     * domainsService.namespacesWithRelations(['root.roles.energyweb.iam.ewc', 'admin.roles.energyweb.iam.ewc']);
     *
     * @param {Array<String>} namespaces array of namespaces
     * @return object containing registration types for given roles as keys
     */
    namespacesWithRelations(namespaces) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.all(namespaces.map((namespace) => __awaiter(this, void 0, void 0, function* () {
                const owner = yield this.getOwner({ namespace });
                return {
                    namespace,
                    owner,
                };
            })));
        });
    }
    validateChangeOwnership({ namespaces, newOwner, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const namespacesOwners = yield this.namespacesWithRelations(namespaces);
            return namespacesOwners.reduce((acc, { namespace, owner }) => {
                if (owner === newOwner) {
                    acc.alreadyFinished.push(namespace);
                    return acc;
                }
                if (owner === emptyAddress || owner === this._owner) {
                    acc.changeOwnerNamespaces.push(namespace);
                    return acc;
                }
                acc.notOwnedNamespaces.push(namespace);
                return acc;
            }, {
                notOwnedNamespaces: [],
                alreadyFinished: [],
                changeOwnerNamespaces: [],
            });
        });
    }
    validateDeletePossibility({ namespaces, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const namespacesOwners = yield this.namespacesWithRelations(namespaces);
            return namespacesOwners.reduce((acc, { namespace, owner }) => {
                if (owner === emptyAddress) {
                    acc.alreadyFinished.push(namespace);
                    return acc;
                }
                if (owner === this._owner) {
                    acc.namespacesToDelete.push(namespace);
                    return acc;
                }
                acc.notOwnedNamespaces.push(namespace);
                return acc;
            }, {
                notOwnedNamespaces: [],
                alreadyFinished: [],
                namespacesToDelete: [],
            });
        });
    }
    getOwner({ namespace }) {
        return __awaiter(this, void 0, void 0, function* () {
            const node = namehash$1(namespace);
            return this._ensRegistry.owner(node);
        });
    }
    createSubdomainTx({ domain, nodeName, owner = this._owner, }) {
        return {
            to: this._ensRegistryAddress,
            data: this._ensRegistry.interface.encodeFunctionData('setSubnodeRecord', [
                namehash$1(domain),
                labelhash(nodeName),
                owner,
                this._ensResolver,
                this._ttl,
            ]),
        };
    }
    changeSubdomainOwnerTx({ newOwner, label, namespace, }) {
        return {
            to: this._ensRegistryAddress,
            data: this._ensRegistry.interface.encodeFunctionData('setSubnodeOwner', [
                namehash$1(namespace),
                labelhash(label),
                newOwner,
            ]),
        };
    }
    changeDomainOwnerTx({ newOwner, namespace, }) {
        return {
            to: this._ensRegistryAddress,
            data: this._ensRegistry.interface.encodeFunctionData('setOwner', [
                namehash$1(namespace),
                newOwner,
            ]),
        };
    }
    deleteSubdomainTx({ namespace, }) {
        const namespaceArray = namespace.split('.');
        const node = namespaceArray.slice(1).join('.');
        const label = namespaceArray[0];
        return {
            to: this._ensRegistryAddress,
            data: this._ensRegistry.interface.encodeFunctionData('setSubnodeRecord', [
                namehash$1(node),
                labelhash(label),
                emptyAddress,
                emptyAddress,
                this._ttl,
            ]),
        };
    }
    deleteDomain({ namespace }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._signerService.send(this.deleteDomainTx({ namespace }));
        });
    }
    deleteDomainTx({ namespace }) {
        return {
            to: this._ensRegistryAddress,
            data: this._ensRegistry.interface.encodeFunctionData('setRecord', [
                namehash$1(namespace),
                emptyAddress,
                emptyAddress,
                this._ttl,
            ]),
        };
    }
    deleteSubdomain({ namespace }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._signerService.send(this.deleteSubdomainTx({ namespace }));
        });
    }
    nonOwnedNodesOf({ namespace, type, owner, }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (![
                NamespaceType.Role,
                NamespaceType.Application,
                NamespaceType.Organization,
            ].includes(type)) {
                throw new Error(ERROR_MESSAGES.ENS_TYPE_NOT_SUPPORTED);
            }
            const namespacesToCheck = type === NamespaceType.Role
                ? [namespace]
                : type === NamespaceType.Application
                    ? [namespace, NamespaceType.Application]
                    : [namespace, NamespaceType.Application, NamespaceType.Organization];
            return Promise.all(namespacesToCheck.map((ns) => this.getOwner({ namespace: ns }))).then((owners) => owners.filter((o) => ![owner, emptyAddress].includes(o)));
        });
    }
    /**
     * Checks that a provided owner/newOwner address is a valid ethereum address
     * @param owner owner address to validate
     */
    static validateOwnerAddress(owner) {
        try {
            validateAddress(owner);
        }
        catch (_a) {
            throw new ENSOwnerNotValidAddressError(owner);
        }
    }
    get domainReader() {
        return this._domainDefinitionReader;
    }
}

/* Autogenerated file. Do not edit manually. */
const _abi$2 = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "previousAdmin",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "newAdmin",
                type: "address",
            },
        ],
        name: "AdminChanged",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "beacon",
                type: "address",
            },
        ],
        name: "BeaconUpgraded",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "identity",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "at",
                type: "uint256",
            },
        ],
        name: "IdentityCreated",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "identity",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "oferedto",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "at",
                type: "uint256",
            },
        ],
        name: "IdentityOfferCanceled",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "identity",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "offeredTo",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "at",
                type: "uint256",
            },
        ],
        name: "IdentityOfferRejected",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "identity",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "offeredTo",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "at",
                type: "uint256",
            },
        ],
        name: "IdentityOffered",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "identity",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "at",
                type: "uint256",
            },
        ],
        name: "IdentityTransferred",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint8",
                name: "version",
                type: "uint8",
            },
        ],
        name: "Initialized",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "previousOwner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "OwnershipTransferred",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "implementation",
                type: "address",
            },
        ],
        name: "Upgraded",
        type: "event",
    },
    {
        inputs: [],
        name: "owner",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "proxiableUUID",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "newImplementation",
                type: "address",
            },
        ],
        name: "upgradeTo",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "newImplementation",
                type: "address",
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
        ],
        name: "upgradeToAndCall",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_libraryAddress",
                type: "address",
            },
        ],
        name: "initialize",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "identity",
                type: "address",
            },
        ],
        name: "verified",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "identity",
                type: "address",
            },
        ],
        name: "compliant",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "identity",
                type: "address",
            },
        ],
        name: "identityOwner",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_owner",
                type: "address",
            },
        ],
        name: "createIdentity",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_owner",
                type: "address",
            },
        ],
        name: "identityCreated",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_offeredTo",
                type: "address",
            },
        ],
        name: "identityOffered",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_owner",
                type: "address",
            },
        ],
        name: "identityAccepted",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_offeredTo",
                type: "address",
            },
        ],
        name: "identityRejected",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_offeredTo",
                type: "address",
            },
        ],
        name: "identityOfferCanceled",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "version",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "pure",
        type: "function",
    },
];
const _bytecode$2 = "0x60a06040523073ffffffffffffffffffffffffffffffffffffffff1660809073ffffffffffffffffffffffffffffffffffffffff1660601b81525034801561004657600080fd5b5060805160601c612def610081600039600081816106c301528181610752015281816108720152818161090101526109b10152612def6000f3fe6080604052600436106100fe5760003560e01c8063845de7bc11610095578063d833d04311610064578063d833d043146102fe578063ebdcd2eb1461033b578063f0ba4f6014610364578063f2fde38b1461038d578063fab3157e146103b6576100fe565b8063845de7bc146102445780638733d4e81461026d5780638da5cb5b146102aa578063c4d66de8146102d5576100fe565b806352d1902d116100d157806352d1902d146101ae57806354fd4d50146101d95780635b2ab06c14610204578063715018a61461022d576100fe565b8063062960d4146101035780630db065f41461012c5780633659cfe6146101695780634f1ef28614610192575b600080fd5b34801561010f57600080fd5b5061012a60048036038101906101259190611f9e565b6103df565b005b34801561013857600080fd5b50610153600480360381019061014e9190611f9e565b610668565b60405161016091906123a1565b60405180910390f35b34801561017557600080fd5b50610190600480360381019061018b9190611f9e565b6106c1565b005b6101ac60048036038101906101a79190611fc7565b610870565b005b3480156101ba57600080fd5b506101c36109ad565b6040516101d091906123bc565b60405180910390f35b3480156101e557600080fd5b506101ee610a66565b6040516101fb919061240d565b60405180910390f35b34801561021057600080fd5b5061022b60048036038101906102269190611f9e565b610aa3565b005b34801561023957600080fd5b50610242610c05565b005b34801561025057600080fd5b5061026b60048036038101906102669190611f9e565b610c19565b005b34801561027957600080fd5b50610294600480360381019061028f9190611f9e565b610d3d565b6040516102a19190612386565b60405180910390f35b3480156102b657600080fd5b506102bf610da9565b6040516102cc9190612386565b60405180910390f35b3480156102e157600080fd5b506102fc60048036038101906102f79190611f9e565b610dd3565b005b34801561030a57600080fd5b5061032560048036038101906103209190611f9e565b610f53565b60405161033291906123a1565b60405180910390f35b34801561034757600080fd5b50610362600480360381019061035d9190611f9e565b610fac565b005b34801561037057600080fd5b5061038b60048036038101906103869190611f9e565b611175565b005b34801561039957600080fd5b506103b460048036038101906103af9190611f9e565b6112d0565b005b3480156103c257600080fd5b506103dd60048036038101906103d89190611f9e565b611354565b005b610409337f22bd186d000000000000000000000000000000000000000000000000000000006114af565b610448576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161043f9061242f565b60405180910390fd5b610451336114d4565b156104b657600160ca60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160016101000a81548160ff021916908315150217905550610512565b600160ca60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160026101000a81548160ff0219169083151502179055505b600073ffffffffffffffffffffffffffffffffffffffff1661053333610d3d565b73ffffffffffffffffffffffffffffffffffffffff1614610589576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105809061248f565b60405180910390fd5b8060ca60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160046101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550428173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fb9fb8e551e2c1eca32cadcff5fba92a08c15e5fdb3d0b5b77b3c0c299cb6d4e060405160405180910390a450565b600060ca60008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160019054906101000a900460ff169050919050565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff161415610750576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107479061246f565b60405180910390fd5b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1661078f61152d565b73ffffffffffffffffffffffffffffffffffffffff16146107e5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107dc906124af565b60405180910390fd5b6107ee81611584565b61086d81600067ffffffffffffffff811115610833577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040519080825280601f01601f1916602001820160405280156108655781602001600182028036833780820191505090505b50600061158f565b50565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff1614156108ff576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108f69061246f565b60405180910390fd5b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1661093e61152d565b73ffffffffffffffffffffffffffffffffffffffff1614610994576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161098b906124af565b60405180910390fd5b61099d82611584565b6109a98282600161158f565b5050565b60007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff1614610a3d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a34906124ef565b60405180910390fd5b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b905090565b60606040518060400160405280600481526020017f76302e3100000000000000000000000000000000000000000000000000000000815250905090565b6000610ad060c960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1661170c565b9050600160ca60008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160006101000a81548160ff02191690831515021790555060006040518060400160405280600d81526020017f696e6974286164647265737329000000000000000000000000000000000000008152508051906020012083604051602401610b7d9190612386565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050509050610bff8282604051806060016040528060318152602001612d62603191396117c7565b50505050565b610c0d6117df565b610c17600061185d565b565b610c2233610668565b80610c325750610c3133610f53565b5b610c71576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c689061260f565b60405180910390fd5b600160ca60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160036101000a81548160ff02191690831515021790555042610cd633610d3d565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f06f60810783b48f561226446a054a0a69c6ed28d2dcc1fa121d1c8f75932d44b84604051610d329190612386565b60405180910390a450565b600060ca60008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160049054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b6000609760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60008060019054906101000a900460ff16159050808015610e045750600160008054906101000a900460ff1660ff16105b80610e315750610e1330611923565b158015610e305750600160008054906101000a900460ff1660ff16145b5b610e70576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e679061254f565b60405180910390fd5b60016000806101000a81548160ff021916908360ff1602179055508015610ead576001600060016101000a81548160ff0219169083151502179055505b8160c960006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610ef6611946565b8015610f4f5760008060016101000a81548160ff0219169083151502179055507f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024986001604051610f4691906123f2565b60405180910390a15b5050565b600060ca60008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160029054906101000a900460ff169050919050565b60ca60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160039054906101000a900460ff1661103b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611032906125cf565b60405180910390fd5b8060ca60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160046101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060ca60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160036101000a81548160ff021916908315150217905550428173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f935587b2ac44cbc8f19b54532d7d55c0bfb1f1d498f42f208eaf88fba9c65a6360405160405180910390a450565b60ca60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160039054906101000a900460ff16611204576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111fb906125cf565b60405180910390fd5b600060ca60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160036101000a81548160ff021916908315150217905550428173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167ff8b19edda65b5d62bf5cffc44b06971c852691ffbdc99a3321d80ec842f1dc6d6112b833610d3d565b6040516112c59190612386565b60405180910390a450565b6112d86117df565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415611348576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161133f9061244f565b60405180910390fd5b6113518161185d565b50565b60ca60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160039054906101000a900460ff166113e3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016113da906125cf565b60405180910390fd5b600060ca60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160036101000a81548160ff0219169083151502179055504261144833610d3d565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f02d7c2d528e37f89d262715cd5ed5727bd92404af478372c95f9ea366558794a846040516114a49190612386565b60405180910390a450565b60006114ba8361199f565b80156114cc57506114cb83836119ec565b5b905092915050565b600060ca60008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160009054906101000a900460ff169050919050565b600061155b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b611aab565b60000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b61158c6117df565b50565b6115bb7f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd914360001b611ab5565b60000160009054906101000a900460ff16156115df576115da83611abf565b611707565b8273ffffffffffffffffffffffffffffffffffffffff166352d1902d6040518163ffffffff1660e01b815260040160206040518083038186803b15801561162557600080fd5b505afa92505050801561165657506040513d601f19601f82011682018060405250810190611653919061201b565b60015b611695576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161168c9061256f565b60405180910390fd5b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b81146116fa576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016116f19061252f565b60405180910390fd5b50611706838383611b78565b5b505050565b6000763d602d80600a3d3981f3363d3d373d3d3d363d730000008260601b60e81c176000526e5af43d82803e903d91602b57fd5bf38260781b17602052603760096000f09050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614156117c2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016117b99061250f565b60405180910390fd5b919050565b60606117d68484600085611ba4565b90509392505050565b6117e7611c88565b73ffffffffffffffffffffffffffffffffffffffff16611805610da9565b73ffffffffffffffffffffffffffffffffffffffff161461185b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611852906125af565b60405180910390fd5b565b6000609760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081609760006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b600060019054906101000a900460ff16611995576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161198c9061264f565b60405180910390fd5b61199d611c90565b565b60006119cb827f01ffc9a7000000000000000000000000000000000000000000000000000000006119ec565b80156119e557506119e38263ffffffff60e01b6119ec565b155b9050919050565b6000806301ffc9a760e01b83604051602401611a0891906123d7565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff838183161783525050505090506000806000602060008551602087018a617530fa92503d91506000519050828015611a93575060208210155b8015611a9f5750600081115b94505050505092915050565b6000819050919050565b6000819050919050565b611ac881611923565b611b07576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611afe9061258f565b60405180910390fd5b80611b347f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b611aab565b60000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b611b8183611cf1565b600082511180611b8e5750805b15611b9f57611b9d8383611d40565b505b505050565b6060823073ffffffffffffffffffffffffffffffffffffffff16311015611c00576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611bf7906124cf565b60405180910390fd5b6000808673ffffffffffffffffffffffffffffffffffffffff168587604051611c29919061236f565b60006040518083038185875af1925050503d8060008114611c66576040519150601f19603f3d011682016040523d82523d6000602084013e611c6b565b606091505b5091509150611c7c87838387611e24565b92505050949350505050565b600033905090565b600060019054906101000a900460ff16611cdf576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611cd69061264f565b60405180910390fd5b611cef611cea611c88565b61185d565b565b611cfa81611abf565b8073ffffffffffffffffffffffffffffffffffffffff167fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b60405160405180910390a250565b6060611d4b83611923565b611d8a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611d81906125ef565b60405180910390fd5b6000808473ffffffffffffffffffffffffffffffffffffffff1684604051611db2919061236f565b600060405180830381855af49150503d8060008114611ded576040519150601f19603f3d011682016040523d82523d6000602084013e611df2565b606091505b5091509150611e1a8282604051806060016040528060278152602001612d9360279139611e9a565b9250505092915050565b60608315611e8757600083511415611e7f57611e3f85611923565b611e7e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611e759061262f565b60405180910390fd5b5b829050611e92565b611e918383611ebc565b5b949350505050565b60608315611eaa57829050611eb5565b611eb48383611ebc565b5b9392505050565b600082511115611ecf5781518083602001fd5b806040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611f03919061240d565b60405180910390fd5b6000611f1f611f1a84612694565b61266f565b905082815260208101848484011115611f3757600080fd5b611f4284828561278a565b509392505050565b600081359050611f5981612d33565b92915050565b600081519050611f6e81612d4a565b92915050565b600082601f830112611f8557600080fd5b8135611f95848260208601611f0c565b91505092915050565b600060208284031215611fb057600080fd5b6000611fbe84828501611f4a565b91505092915050565b60008060408385031215611fda57600080fd5b6000611fe885828601611f4a565b925050602083013567ffffffffffffffff81111561200557600080fd5b61201185828601611f74565b9150509250929050565b60006020828403121561202d57600080fd5b600061203b84828501611f5f565b91505092915050565b61204d816126f7565b82525050565b61205c81612709565b82525050565b61206b81612715565b82525050565b61207a8161271f565b82525050565b600061208b826126c5565b61209581856126db565b93506120a5818560208601612799565b80840191505092915050565b6120ba81612778565b82525050565b60006120cb826126d0565b6120d581856126e6565b93506120e5818560208601612799565b6120ee8161282c565b840191505092915050565b6000612106601f836126e6565b91506121118261283d565b602082019050919050565b60006121296026836126e6565b915061213482612866565b604082019050919050565b600061214c602c836126e6565b9150612157826128b5565b604082019050919050565b600061216f6035836126e6565b915061217a82612904565b604082019050919050565b6000612192602c836126e6565b915061219d82612953565b604082019050919050565b60006121b56026836126e6565b91506121c0826129a2565b604082019050919050565b60006121d86038836126e6565b91506121e3826129f1565b604082019050919050565b60006121fb6016836126e6565b915061220682612a40565b602082019050919050565b600061221e6029836126e6565b915061222982612a69565b604082019050919050565b6000612241602e836126e6565b915061224c82612ab8565b604082019050919050565b6000612264602e836126e6565b915061226f82612b07565b604082019050919050565b6000612287602d836126e6565b915061229282612b56565b604082019050919050565b60006122aa6020836126e6565b91506122b582612ba5565b602082019050919050565b60006122cd6028836126e6565b91506122d882612bce565b604082019050919050565b60006122f06026836126e6565b91506122fb82612c1d565b604082019050919050565b60006123136038836126e6565b915061231e82612c6c565b604082019050919050565b6000612336601d836126e6565b915061234182612cbb565b602082019050919050565b6000612359602b836126e6565b915061236482612ce4565b604082019050919050565b600061237b8284612080565b915081905092915050565b600060208201905061239b6000830184612044565b92915050565b60006020820190506123b66000830184612053565b92915050565b60006020820190506123d16000830184612062565b92915050565b60006020820190506123ec6000830184612071565b92915050565b600060208201905061240760008301846120b1565b92915050565b6000602082019050818103600083015261242781846120c0565b905092915050565b60006020820190508181036000830152612448816120f9565b9050919050565b600060208201905081810360008301526124688161211c565b9050919050565b600060208201905081810360008301526124888161213f565b9050919050565b600060208201905081810360008301526124a881612162565b9050919050565b600060208201905081810360008301526124c881612185565b9050919050565b600060208201905081810360008301526124e8816121a8565b9050919050565b60006020820190508181036000830152612508816121cb565b9050919050565b60006020820190508181036000830152612528816121ee565b9050919050565b6000602082019050818103600083015261254881612211565b9050919050565b6000602082019050818103600083015261256881612234565b9050919050565b6000602082019050818103600083015261258881612257565b9050919050565b600060208201905081810360008301526125a88161227a565b9050919050565b600060208201905081810360008301526125c88161229d565b9050919050565b600060208201905081810360008301526125e8816122c0565b9050919050565b60006020820190508181036000830152612608816122e3565b9050919050565b6000602082019050818103600083015261262881612306565b9050919050565b6000602082019050818103600083015261264881612329565b9050919050565b600060208201905081810360008301526126688161234c565b9050919050565b600061267961268a565b905061268582826127cc565b919050565b6000604051905090565b600067ffffffffffffffff8211156126af576126ae6127fd565b5b6126b88261282c565b9050602081019050919050565b600081519050919050565b600081519050919050565b600081905092915050565b600082825260208201905092915050565b60006127028261274b565b9050919050565b60008115159050919050565b6000819050919050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600060ff82169050919050565b60006127838261276b565b9050919050565b82818337600083830152505050565b60005b838110156127b757808201518184015260208101905061279c565b838111156127c6576000848401525b50505050565b6127d58261282c565b810181811067ffffffffffffffff821117156127f4576127f36127fd565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b7f4f6e6c79204f6666657261626c65204964656e7469747920616c6c6f77656400600082015250565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b7f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060008201527f64656c656761746563616c6c0000000000000000000000000000000000000000602082015250565b7f4964656e746974794d616e616765723a204964656e7469747920616c7265616460008201527f7920686173206265656e20726567697374657265640000000000000000000000602082015250565b7f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060008201527f6163746976652070726f78790000000000000000000000000000000000000000602082015250565b7f416464726573733a20696e73756666696369656e742062616c616e636520666f60008201527f722063616c6c0000000000000000000000000000000000000000000000000000602082015250565b7f555550535570677261646561626c653a206d757374206e6f742062652063616c60008201527f6c6564207468726f7567682064656c656761746563616c6c0000000000000000602082015250565b7f455243313136373a20637265617465206661696c656400000000000000000000600082015250565b7f45524331393637557067726164653a20756e737570706f727465642070726f7860008201527f6961626c65555549440000000000000000000000000000000000000000000000602082015250565b7f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160008201527f647920696e697469616c697a6564000000000000000000000000000000000000602082015250565b7f45524331393637557067726164653a206e657720696d706c656d656e7461746960008201527f6f6e206973206e6f742055555053000000000000000000000000000000000000602082015250565b7f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60008201527f6f74206120636f6e747261637400000000000000000000000000000000000000602082015250565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b7f4964656e746974794d616e616765723a204964656e74697479206973206e6f7460008201527f206f666665726564000000000000000000000000000000000000000000000000602082015250565b7f416464726573733a2064656c65676174652063616c6c20746f206e6f6e2d636f60008201527f6e74726163740000000000000000000000000000000000000000000000000000602082015250565b7f4964656e746974794d616e616765723a204e6f7420636f6d706c69616e74206960008201527f64656e746974792063616e2774206265206f6666657265640000000000000000602082015250565b7f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000600082015250565b7f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960008201527f6e697469616c697a696e67000000000000000000000000000000000000000000602082015250565b612d3c816126f7565b8114612d4757600080fd5b50565b612d5381612715565b8114612d5e57600080fd5b5056fe4964656e746974794d616e616765723a2043616e277420696e697469616c697a6520636c6f6e6564206964656e74697479416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a26469706673582212201499aa349e68fd5ab8c1bbb2273a69a46f953d2add86f6a6540e6f16ff3c8bc364736f6c63430008030033";
class IdentityManager__factory extends ContractFactory {
    constructor(...args) {
        if (args.length === 1) {
            super(_abi$2, _bytecode$2, args[0]);
        }
        else {
            super(...args);
        }
    }
    deploy(overrides) {
        return super.deploy(overrides || {});
    }
    getDeployTransaction(overrides) {
        return super.getDeployTransaction(overrides || {});
    }
    attach(address) {
        return super.attach(address);
    }
    connect(signer) {
        return super.connect(signer);
    }
    static createInterface() {
        return new utils.Interface(_abi$2);
    }
    static connect(address, signerOrProvider) {
        return new Contract(address, _abi$2, signerOrProvider);
    }
}
IdentityManager__factory.bytecode = _bytecode$2;
IdentityManager__factory.abi = _abi$2;

/* Autogenerated file. Do not edit manually. */
const _abi$1 = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
        ],
        name: "TransactionSent",
        type: "event",
    },
    {
        inputs: [],
        name: "offeredTo",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "owner",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_owner",
                type: "address",
            },
        ],
        name: "init",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_offeredTo",
                type: "address",
            },
        ],
        name: "offer",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "acceptOffer",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "rejectOffer",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "cancelOffer",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
            {
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
        ],
        name: "sendTransaction",
        outputs: [
            {
                internalType: "bool",
                name: "success",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes4",
                name: "interfaceId",
                type: "bytes4",
            },
        ],
        name: "supportsInterface",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
const _bytecode$1 = "0x608060405234801561001057600080fd5b506114f6806100206000396000f3fe608060405234801561001057600080fd5b50600436106100935760003560e01c80638da5cb5b116100665780638da5cb5b1461011e578063918af2cf1461013c578063ce2d4aca1461015a578063eb62df6114610176578063efd998ad1461018057610093565b806301ffc9a71461009857806319ab453c146100c857806362d05c78146100e45780638afb4913146100ee575b600080fd5b6100b260048036038101906100ad9190610ed5565b61018a565b6040516100bf919061102e565b60405180910390f35b6100e260048036038101906100dd9190610e45565b61026c565b005b6100ec61042e565b005b61010860048036038101906101039190610e6e565b610575565b604051610115919061102e565b60405180910390f35b61012661070d565b6040516101339190611013565b60405180910390f35b610144610731565b6040516101519190611013565b60405180910390f35b610174600480360381019061016f9190610e45565b610757565b005b61017e6108d8565b005b610188610b15565b005b60007f22bd186d000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061025557507f8da5cb5b000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b80610265575061026482610cf0565b5b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16146102fd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102f490611089565b60405180910390fd5b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555033600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663062960d460008054906101000a900473ffffffffffffffffffffffffffffffffffffffff166040518263ffffffff1660e01b81526004016103f99190611013565b600060405180830381600087803b15801561041357600080fd5b505af1158015610427573d6000803e3d6000fd5b5050505050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146104bc576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104b3906110a9565b60405180910390fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663fab3157e600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166040518263ffffffff1660e01b81526004016105399190611013565b600060405180830381600087803b15801561055357600080fd5b505af1158015610567573d6000803e3d6000fd5b50505050610573610d5a565b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610606576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105fd906110a9565b60405180910390fd5b8373ffffffffffffffffffffffffffffffffffffffff166113885a61062b9190611166565b838560405161063a9190610ffc565b600060405180830381858888f193505050503d8060008114610678576040519150601f19603f3d011682016040523d82523d6000602084013e61067d565b606091505b505080915050806106c3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106ba90611069565b60405180910390fd5b81836040516106d29190610ffc565b60405180910390207f101abacb8de0d05456bbaf85756276fd0c5225e9ede84f539855df28aba51a7e60405160405180910390a39392505050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146107e5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107dc906110a9565b60405180910390fd5b80600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663845de7bc600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166040518263ffffffff1660e01b81526004016108a39190611013565b600060405180830381600087803b1580156108bd57600080fd5b505af11580156108d1573d6000803e3d6000fd5b5050505050565b600073ffffffffffffffffffffffffffffffffffffffff16600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141561096a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610961906110c9565b60405180910390fd5b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146109fa576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109f190611049565b60405180910390fd5b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663ebdcd2eb600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166040518263ffffffff1660e01b8152600401610ad99190611013565b600060405180830381600087803b158015610af357600080fd5b505af1158015610b07573d6000803e3d6000fd5b50505050610b13610d5a565b565b600073ffffffffffffffffffffffffffffffffffffffff16600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415610ba7576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b9e906110c9565b60405180910390fd5b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610c37576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c2e90611049565b60405180910390fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663f0ba4f60600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166040518263ffffffff1660e01b8152600401610cb49190611013565b600060405180830381600087803b158015610cce57600080fd5b505af1158015610ce2573d6000803e3d6000fd5b50505050610cee610d5a565b565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b6000600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b6000610db1610dac8461110e565b6110e9565b905082815260208101848484011115610dc957600080fd5b610dd484828561120e565b509392505050565b600081359050610deb8161147b565b92915050565b600081359050610e0081611492565b92915050565b600082601f830112610e1757600080fd5b8135610e27848260208601610d9e565b91505092915050565b600081359050610e3f816114a9565b92915050565b600060208284031215610e5757600080fd5b6000610e6584828501610ddc565b91505092915050565b600080600060608486031215610e8357600080fd5b6000610e9186828701610ddc565b935050602084013567ffffffffffffffff811115610eae57600080fd5b610eba86828701610e06565b9250506040610ecb86828701610e30565b9150509250925092565b600060208284031215610ee757600080fd5b6000610ef584828501610df1565b91505092915050565b610f078161119a565b82525050565b610f16816111ac565b82525050565b6000610f278261113f565b610f31818561114a565b9350610f4181856020860161121d565b80840191505092915050565b6000610f5a603183611155565b9150610f65826112f0565b604082019050919050565b6000610f7d602f83611155565b9150610f888261133f565b604082019050919050565b6000610fa0603783611155565b9150610fab8261138e565b604082019050919050565b6000610fc3602583611155565b9150610fce826113dd565b604082019050919050565b6000610fe6602783611155565b9150610ff18261142c565b604082019050919050565b60006110088284610f1c565b915081905092915050565b60006020820190506110286000830184610efe565b92915050565b60006020820190506110436000830184610f0d565b92915050565b6000602082019050818103600083015261106281610f4d565b9050919050565b6000602082019050818103600083015261108281610f70565b9050919050565b600060208201905081810360008301526110a281610f93565b9050919050565b600060208201905081810360008301526110c281610fb6565b9050919050565b600060208201905081810360008301526110e281610fd9565b9050919050565b60006110f3611104565b90506110ff8282611250565b919050565b6000604051905090565b600067ffffffffffffffff821115611129576111286112b0565b5b611132826112df565b9050602081019050919050565b600081519050919050565b600081905092915050565b600082825260208201905092915050565b600061117182611204565b915061117c83611204565b92508282101561118f5761118e611281565b5b828203905092915050565b60006111a5826111e4565b9050919050565b60008115159050919050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b82818337600083830152505050565b60005b8381101561123b578082015181840152602081019050611220565b8381111561124a576000848401525b50505050565b611259826112df565b810181811067ffffffffffffffff82111715611278576112776112b0565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b7f4f6666657261626c654964656e746974793a2050726f7879206f66666572656460008201527f20746f206f74686572206163636f756e74000000000000000000000000000000602082015250565b7f4f6666657261626c654964656e746974793a204572726f722063616c6c696e6760008201527f206f7468657220636f6e74726163740000000000000000000000000000000000602082015250565b7f4f6666657261626c654964656e746974793a204964656e746974792063616e2060008201527f626520696e697469616c697a65206f6e6c79206f6e6365000000000000000000602082015250565b7f4f6666657261626c654964656e746974793a204f6e6c79206f776e657220616c60008201527f6c6f776564000000000000000000000000000000000000000000000000000000602082015250565b7f4f6666657261626c654964656e746974793a2050726f7879206973206e6f742060008201527f6f66666572656400000000000000000000000000000000000000000000000000602082015250565b6114848161119a565b811461148f57600080fd5b50565b61149b816111b8565b81146114a657600080fd5b50565b6114b281611204565b81146114bd57600080fd5b5056fea26469706673582212200ea1454a14162ad317c8f5542e831345ebc245f5947e8185fd8386ce4d5fd64764736f6c63430008030033";
class OfferableIdentity__factory extends ContractFactory {
    constructor(...args) {
        if (args.length === 1) {
            super(_abi$1, _bytecode$1, args[0]);
        }
        else {
            super(...args);
        }
    }
    deploy(overrides) {
        return super.deploy(overrides || {});
    }
    getDeployTransaction(overrides) {
        return super.getDeployTransaction(overrides || {});
    }
    attach(address) {
        return super.attach(address);
    }
    connect(signer) {
        return super.connect(signer);
    }
    static createInterface() {
        return new utils.Interface(_abi$1);
    }
    static connect(address, signerOrProvider) {
        return new Contract(address, _abi$1, signerOrProvider);
    }
}
OfferableIdentity__factory.bytecode = _bytecode$1;
OfferableIdentity__factory.abi = _abi$1;

/**
 * Service responsible for handling the asset creation and management.
 * See more information about assets in IAM stack [here](../../../docs/guides/asset.md).
 *
 * ```typescript
 * const { connectToCacheServer } = await initWithPrivateKeySigner(privateKey, rpcUrl);
 * const { assetsService } = await connectToCacheServer();
 * assetsService.registerAsset();
 * ```
 */
class AssetsService {
    constructor(_signerService, _cacheClient) {
        this._signerService = _signerService;
        this._cacheClient = _cacheClient;
        this._assetInterface = OfferableIdentity__factory.createInterface();
        this._assetManagerInterface = IdentityManager__factory.createInterface();
        this._signerService.onInit(this.init.bind(this));
    }
    static create(signerService, cacheClient) {
        return __awaiter(this, void 0, void 0, function* () {
            const service = new AssetsService(signerService, cacheClient);
            yield service.init();
            return service;
        });
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            const chainId = this._signerService.chainId;
            this._owner = this._signerService.address;
            this._did = this._signerService.did;
            const chainConfig = chainConfigs()[chainId];
            this._assetManager = chainConfig.assetManagerAddress;
        });
    }
    /**
     * Register a new asset to the user.
     *
     * ```typescript
     * assetsService.registerAsset();
     * ```
     *
     * @return asset address
     */
    registerAsset() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = this._assetManagerInterface.encodeFunctionData('createIdentity', [this._owner]);
            const receipt = yield this._signerService.send({
                to: this._assetManager,
                data,
            });
            const event = receipt.logs
                .map((l) => this._assetManagerInterface.parseLog(l))
                .find((log) => log.name ===
                this._assetManagerInterface.events['IdentityCreated(address,address,uint256)'].name);
            const identity = event.args[0];
            let asset = yield this.getAssetById({
                id: `did:${Methods.Erc1056}:${this._signerService.chainName()}:${identity}`,
            });
            let loops = 0;
            /*
             * we need to wait until cache server will resolve assets did document
             * which is taking some time
             */
            while (!asset && loops < 20) {
                asset = yield this.getAssetById({
                    id: `did:${Methods.Erc1056}:${this._signerService.chainName()}:${identity}`,
                });
                yield new Promise((resolve) => setTimeout(resolve, 1000));
                loops++;
            }
            return identity;
        });
    }
    /**
     * Send an asset offer transfer to a given address
     *
     * ```typescript
     * assetsService.offerAsset({
     *     assetDID: 'did:ethr:volta:0x000...1',
     *     offerTo: '0x000...2',
     * });
     * ```
     *
     * @param {OfferAssetOptions} options object containing options
     */
    offerAsset({ assetDID, offerTo }) {
        return __awaiter(this, void 0, void 0, function* () {
            const assetContractAddress = addressOf(assetDID);
            const tx = this.offerAssetTx({ assetContractAddress, offerTo: offerTo });
            yield this._signerService.send(tx);
        });
    }
    /**
     * Accept an offered asset.
     *
     * ```typescript
     * assetsService.acceptAssetOffer({
     *     assetDID: 'did:ethr:volta:0x000...1',
     * });
     * ```
     *
     * @param {AcceptAssetOfferOptions} options object containing options
     */
    acceptAssetOffer({ assetDID }) {
        return __awaiter(this, void 0, void 0, function* () {
            const assetContractAddress = addressOf(assetDID);
            const tx = this.acceptOfferTx({ assetContractAddress });
            yield this._signerService.send(tx);
        });
    }
    /**
     * Reject an offered asset.
     *
     * ```typescript
     * assetsService.rejectAssetOffer({
     *     assetDID: 'did:ethr:volta:0x000...1',
     * });
     * ```
     *
     * @param {RejectAssetOfferOptions} options object containing options
     */
    rejectAssetOffer({ assetDID }) {
        return __awaiter(this, void 0, void 0, function* () {
            const assetContractAddress = addressOf(assetDID);
            const tx = this.rejectOfferTx({ assetContractAddress });
            yield this._signerService.send(tx);
        });
    }
    /**
     * Cancel an asset offer.
     *
     * ```typescript
     * assetsService.cancelAssetOffer({
     *     assetDID: 'did:ethr:volta:0x000...1',
     * });
     * ```
     *
     * @param {CancelAssetOfferOptions} options object containing options
     */
    cancelAssetOffer({ assetDID }) {
        return __awaiter(this, void 0, void 0, function* () {
            const assetContractAddress = addressOf(assetDID);
            const tx = this.cancelOfferTx({ assetContractAddress });
            yield this._signerService.send(tx);
        });
    }
    /**
     * Retrieve owned assets of the given user.
     *
     * ```typescript
     * assetsService.getOwnedAssets({
     *     did: 'did:ethr:volta:0x000...1',
     * });
     * ```
     *
     * @param {GetOwnedAssetsOptions} options object containing options
     * @returns owned assets
     */
    getOwnedAssets({ did } = { did: this._did }) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._cacheClient.getOwnedAssets(did);
        });
    }
    /**
     * Retrieve assets offered to the given user.
     *
     * ```typescript
     * assetsService.getOfferedAssets({
     *     did: 'did:ethr:volta:0x000...1',
     * });
     * ```
     *
     * @param {GetOwnedAssetsOptions} options object containing options
     * @returns offered assets
     */
    getOfferedAssets({ did = this._did, } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._cacheClient.getOfferedAssets(did);
        });
    }
    /**
     * Retrieve asset by id.
     *
     * ```typescript
     * assetsService.getAssetById({
     *     id: 'did:ethr:volta:0x000...1',
     * });
     * ```
     *
     * @param {GetAssetByIdOptions} options object containing options
     * @return asset
     */
    getAssetById({ id }) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._cacheClient.getAssetById(id);
        });
    }
    /**
     * Retrieve DID of the asset owner of the given asset DID.
     *
     * ```typescript
     * assetsService.getAssetOwner('did:ethr:volta:0x000...1');
     * ```
     *
     * @param {String} id DID of the asset
     * @return asset owner DID
     */
    getAssetOwner(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const asset = yield this.getAssetById({ id });
            if (!asset) {
                throw new AssetNotExist(id);
            }
            return asset.owner;
        });
    }
    /**
     * Retrieve previously owned assets of the given user.
     *
     * ```typescript
     * assetsService.getPreviouslyOwnedAssets({
     *     owner: 'did:ethr:volta:0x000...1',
     * });
     * ```
     *
     * @param {GetPreviouslyOwnedAssetsOptions} options object containing options
     * @returns previously owned assets
     */
    getPreviouslyOwnedAssets({ owner, }) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._cacheClient.getPreviouslyOwnedAssets(owner);
        });
    }
    /**
     * Retrieve history of a given asset DID
     *
     * ```typescript
     * assetsService.getAssetHistory({
     *     id: 'did:ethr:volta:0x000...1',
     *     order: Order.ASC,
     *     take: 5,
     *     skip: 0,
     *     type: AssetHistoryEventType.ASSET_OFFERED,
     * });
     * ```
     *
     * @param {GetAssetHistoryOptions} options object containing options
     * @returns asset history
     */
    getAssetHistory(_a) {
        var { id } = _a, query = __rest(_a, ["id"]);
        return __awaiter(this, void 0, void 0, function* () {
            return this._cacheClient.getAssetHistory(id, Object.assign({}, query));
        });
    }
    /**
     * Create a transaction request to offer an asset to a given DID.
     *
     * @param {OfferAssetTxOptions} options object containing options
     * @returns transaction request
     */
    offerAssetTx({ offerTo, assetContractAddress, }) {
        return {
            data: this._assetInterface.encodeFunctionData('offer', [offerTo]),
            to: assetContractAddress,
        };
    }
    /**
     * Create a transaction request to accept an asset offer.
     *
     * @param {AcceptOfferTxOptions} options object containing options
     * @returns transaction request
     */
    acceptOfferTx({ assetContractAddress, }) {
        return {
            data: this._assetInterface.encodeFunctionData('acceptOffer'),
            to: assetContractAddress,
        };
    }
    /**
     * Create a transaction request to reject an asset offer.
     *
     * @param {RejectOfferTxOptions} options object containing options
     * @returns transaction request
     */
    rejectOfferTx({ assetContractAddress, }) {
        return {
            data: this._assetInterface.encodeFunctionData('rejectOffer'),
            to: assetContractAddress,
        };
    }
    /**
     * Create a transaction request to cancel an asset offer.
     *
     * @param {CancelOfferTxOptions} options object containing options
     * @returns transaction request
     */
    cancelOfferTx({ assetContractAddress, }) {
        return {
            data: this._assetInterface.encodeFunctionData('cancelOffer'),
            to: assetContractAddress,
        };
    }
}

var AssetHistoryEventType;
(function (AssetHistoryEventType) {
    AssetHistoryEventType["ASSET_CREATED"] = "ASSET_CREATED";
    AssetHistoryEventType["ASSET_OFFERED"] = "ASSET_OFFERED";
    AssetHistoryEventType["ASSET_OFFER_CANCELED"] = "ASSET_OFFER_CANCELED";
    AssetHistoryEventType["ASSET_TRANSFERRED"] = "ASSET_TRANSFERRED";
    AssetHistoryEventType["ASSET_OFFER_REJECTED"] = "ASSET_OFFER_REJECTED";
})(AssetHistoryEventType || (AssetHistoryEventType = {}));

/* Autogenerated file. Do not edit manually. */
const _abi = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "previousAdmin",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "newAdmin",
                type: "address",
            },
        ],
        name: "AdminChanged",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "beacon",
                type: "address",
            },
        ],
        name: "BeaconUpgraded",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint8",
                name: "version",
                type: "uint8",
            },
        ],
        name: "Initialized",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "previousOwner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "OwnershipTransferred",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "subject",
                type: "address",
            },
            {
                indexed: false,
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "version",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "expiry",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "address",
                name: "issuer",
                type: "address",
            },
        ],
        name: "RoleRegistered",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "implementation",
                type: "address",
            },
        ],
        name: "Upgraded",
        type: "event",
    },
    {
        inputs: [],
        name: "PROOF_TYPEHASH",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "owner",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        name: "proofHashes",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "proxiableUUID",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "newImplementation",
                type: "address",
            },
        ],
        name: "upgradeTo",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "newImplementation",
                type: "address",
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
        ],
        name: "upgradeToAndCall",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_didRegistry",
                type: "address",
            },
            {
                internalType: "address",
                name: "_ensRegistry",
                type: "address",
            },
        ],
        name: "initialize",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "subject",
                type: "address",
            },
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                internalType: "uint256",
                name: "version",
                type: "uint256",
            },
        ],
        name: "hasRole",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "subject",
                type: "address",
            },
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                internalType: "uint256",
                name: "version",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "expiry",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "issuer",
                type: "address",
            },
            {
                internalType: "bytes",
                name: "subject_agreement",
                type: "bytes",
            },
            {
                internalType: "bytes",
                name: "role_proof",
                type: "bytes",
            },
        ],
        name: "register",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "version",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "pure",
        type: "function",
    },
];
const _bytecode = "0x60a06040523073ffffffffffffffffffffffffffffffffffffffff1660809073ffffffffffffffffffffffffffffffffffffffff1660601b81525034801561004657600080fd5b5060805160601c613faf610081600039600081816102ab0152818161033a0152818161066b015281816106fa01526107aa0152613faf6000f3fe6080604052600436106100a75760003560e01c806361edeec81161006457806361edeec8146101ad578063715018a6146101d65780638b3e3bf6146101ed5780638da5cb5b1461021857806395df7b1e14610243578063f2fde38b14610280576100a7565b80633659cfe6146100ac578063485cc955146100d55780634f1ef286146100fe57806352d1902d1461011a57806354fd4d501461014557806360acc76114610170575b600080fd5b3480156100b857600080fd5b506100d360048036038101906100ce9190612701565b6102a9565b005b3480156100e157600080fd5b506100fc60048036038101906100f7919061275b565b610432565b005b610118600480360381019061011391906128d0565b610669565b005b34801561012657600080fd5b5061012f6107a6565b60405161013c9190613044565b60405180910390f35b34801561015157600080fd5b5061015a61085f565b60405161016791906131d3565b60405180910390f35b34801561017c57600080fd5b5061019760048036038101906101929190612a11565b61089c565b6040516101a49190613029565b60405180910390f35b3480156101b957600080fd5b506101d460048036038101906101cf91906127ee565b6108bc565b005b3480156101e257600080fd5b506101eb610d89565b005b3480156101f957600080fd5b50610202610d9d565b60405161020f9190613044565b60405180910390f35b34801561022457600080fd5b5061022d610dc1565b60405161023a9190612f4d565b60405180910390f35b34801561024f57600080fd5b5061026a6004803603810190610265919061279b565b610deb565b6040516102779190613029565b60405180910390f35b34801561028c57600080fd5b506102a760048036038101906102a29190612701565b610e99565b005b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff161415610338576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161032f906132b5565b60405180910390fd5b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16610377610f1d565b73ffffffffffffffffffffffffffffffffffffffff16146103cd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103c490613315565b60405180910390fd5b6103d681610f74565b61042f81600067ffffffffffffffff8111156103f5576103f46137a2565b5b6040519080825280601f01601f1916602001820160405280156104275781602001600182028036833780820191505090505b506000610f7f565b50565b60008060019054906101000a900460ff161590508080156104635750600160008054906101000a900460ff1660ff16105b806104905750610472306110fc565b15801561048f5750600160008054906101000a900460ff1660ff16145b5b6104cf576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104c690613395565b60405180910390fd5b60016000806101000a81548160ff021916908360ff160217905550801561050c576001600060016101000a81548160ff0219169083151502179055505b8260ff60006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508161010060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555061059761111f565b61060b6040518060400160405280600d81526020017f436c61696d204d616e61676572000000000000000000000000000000000000008152506040518060400160405280600381526020017f312e300000000000000000000000000000000000000000000000000000000000815250611178565b80156106645760008060016101000a81548160ff0219169083151502179055507f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb3847402498600160405161065b91906131b8565b60405180910390a15b505050565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff1614156106f8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106ef906132b5565b60405180910390fd5b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16610737610f1d565b73ffffffffffffffffffffffffffffffffffffffff161461078d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161078490613315565b60405180910390fd5b61079682610f74565b6107a282826001610f7f565b5050565b60007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff1614610836576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161082d90613355565b60405180910390fd5b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b905090565b60606040518060400160405280600481526020017f76302e3100000000000000000000000000000000000000000000000000000000815250905090565b60fe6020528060005260406000206000915054906101000a900460ff1681565b6000808861010060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16630178b8bf8c6040518263ffffffff1660e01b815260040161091c9190613044565b60206040518083038186803b15801561093457600080fd5b505afa158015610948573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061096c919061272e565b73ffffffffffffffffffffffffffffffffffffffff1663338bc8fa8c6040518263ffffffff1660e01b81526004016109a49190613044565b60206040518083038186803b1580156109bc57600080fd5b505afa1580156109d0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109f49190612a6b565b1015610a35576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a2c90613215565b60405180910390fd5b6000610a94610a8f7fb16118fb93c5cd278fa80c5c3a11023e3f2b6b6ba1e8a1b0a9ac23a821df30f18e8e8e604051602001610a74949392919061305f565b604051602081830303815290604052805190602001206111d5565b6111ef565b90506000610af9610af47f58155adb8e63b2801cf4976c036d0ed06b96f1a2cbb86b5d7a93ba394e8a5d108f8f8f8f8f604051602001610ad9969594939291906130a4565b604051602081830303815290604052805190602001206111d5565b6111ef565b90506000151560fe600083815260200190815260200160002060009054906101000a900460ff16151514610b62576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b5990613335565b60405180910390fd5b610bb08289898080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505061121f565b9250610c008187878080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505061121f565b9350600160fe600083815260200190815260200160002060006101000a81548160ff0219169083151502179055505050610c3a8b82611246565b610c79576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c7090613295565b60405180910390fd5b610c838783611246565b610cc2576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610cb990613455565b60405180910390fd5b610ccc8b8b6114de565b610cd6878b61177c565b600060fd60008c815260200190815260200160002060008d73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090508881600001819055508981600101819055507f1ecd600d4f2b81f27694fe111b8c8a1025cacd2e8ebcbddf6eb95436e390fe148c8c8c8c8c604051610d73959493929190612fd6565b60405180910390a1505050505050505050505050565b610d91611b11565b610d9b6000611b8f565b565b7f58155adb8e63b2801cf4976c036d0ed06b96f1a2cbb86b5d7a93ba394e8a5d1081565b6000609760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60008060fd600085815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206040518060400160405290816000820154815260200160018201548152505090506000831415610e775742816000015111915050610e92565b428160000151118015610e8e575082816020015110155b9150505b9392505050565b610ea1611b11565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610f11576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f0890613275565b60405180910390fd5b610f1a81611b8f565b50565b6000610f4b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b611c55565b60000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b610f7c611b11565b50565b610fab7f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd914360001b611c5f565b60000160009054906101000a900460ff1615610fcf57610fca83611c69565b6110f7565b8273ffffffffffffffffffffffffffffffffffffffff166352d1902d6040518163ffffffff1660e01b815260040160206040518083038186803b15801561101557600080fd5b505afa92505050801561104657506040513d601f19601f820116820180604052508101906110439190612a3e565b60015b611085576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161107c906133f5565b60405180910390fd5b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b81146110ea576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110e190613375565b60405180910390fd5b506110f6838383611d22565b5b505050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b600060019054906101000a900460ff1661116e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161116590613495565b60405180910390fd5b611176611d4e565b565b600060019054906101000a900460ff166111c7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111be90613495565b60405180910390fd5b6111d18282611daf565b5050565b60006111e86111e2611e2a565b83611e6a565b9050919050565b6000816040516020016112029190612ef0565b604051602081830303815290604052805190602001209050919050565b600080600061122e8585611e9d565b9150915061123b81611eef565b819250505092915050565b60008060ff60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690508273ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16638733d4e8866040518263ffffffff1660e01b81526004016112be9190612f4d565b60206040518083038186803b1580156112d657600080fd5b505afa1580156112ea573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061130e919061272e565b73ffffffffffffffffffffffffffffffffffffffff16148061140c5750611355847f8da5cb5b0000000000000000000000000000000000000000000000000000000061205d565b801561140b57508373ffffffffffffffffffffffffffffffffffffffff16638da5cb5b6040518163ffffffff1660e01b8152600401602060405180830381600087803b1580156113a457600080fd5b505af11580156113b8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113dc919061272e565b73ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16145b5b806114c357508073ffffffffffffffffffffffffffffffffffffffff1663622b2a3c857f766572694b65790000000000000000000000000000000000000000000000000060001b866040518463ffffffff1660e01b815260040161147293929190612f68565b60206040518083038186803b15801561148a57600080fd5b505afa15801561149e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114c291906129e4565b5b156114d25760019150506114d8565b60009150505b92915050565b600061010060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16630178b8bf836040518263ffffffff1660e01b815260040161153c9190613044565b60206040518083038186803b15801561155457600080fd5b505afa158015611568573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061158c919061272e565b90506000808273ffffffffffffffffffffffffffffffffffffffff1663c986c404856040518263ffffffff1660e01b81526004016115ca9190613044565b60006040518083038186803b1580156115e257600080fd5b505afa1580156115f6573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f8201168201806040525081019061161f9190612988565b9150915060008251141561163557505050611778565b600081611643576001611646565b82515b90506000805b84518110801561165b57508282105b1561172f573073ffffffffffffffffffffffffffffffffffffffff166395df7b1e898784815181106116905761168f613773565b5b602002602001015160006040518463ffffffff1660e01b81526004016116b893929190612f9f565b60206040518083038186803b1580156116d057600080fd5b505afa1580156116e4573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061170891906129e4565b1561171c578180611718906136c2565b9250505b8080611727906136c2565b91505061164c565b50818114611772576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161176990613255565b60405180910390fd5b50505050505b5050565b600061010060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16630178b8bf836040518263ffffffff1660e01b81526004016117da9190613044565b60206040518083038186803b1580156117f257600080fd5b505afa158015611806573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061182a919061272e565b90506000808273ffffffffffffffffffffffffffffffffffffffff1663c53a4413856040518263ffffffff1660e01b81526004016118689190613044565b60006040518083038186803b15801561188057600080fd5b505afa158015611894573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f820116820180604052508101906118bd919061292c565b91509150600082511115611a7657600060ff60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905060005b8351811015611a3a578673ffffffffffffffffffffffffffffffffffffffff1684828151811061192857611927613773565b5b602002602001015173ffffffffffffffffffffffffffffffffffffffff161480611a1857508173ffffffffffffffffffffffffffffffffffffffff1663622b2a3c85838151811061197c5761197b613773565b5b60200260200101517f766572694b65790000000000000000000000000000000000000000000000000060001b8a6040518463ffffffff1660e01b81526004016119c793929190612f68565b60206040518083038186803b1580156119df57600080fd5b505afa1580156119f3573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611a1791906129e4565b5b15611a27575050505050611b0d565b8080611a32906136c2565b9150506118f5565b506040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611a6d906133d5565b60405180910390fd5b60008114611ace57611a8a85826000610deb565b611ac9576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611ac0906132d5565b60405180910390fd5b611b09565b6040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611b00906133b5565b60405180910390fd5b5050505b5050565b611b19612082565b73ffffffffffffffffffffffffffffffffffffffff16611b37610dc1565b73ffffffffffffffffffffffffffffffffffffffff1614611b8d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611b8490613435565b60405180910390fd5b565b6000609760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081609760006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b6000819050919050565b6000819050919050565b611c72816110fc565b611cb1576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611ca890613415565b60405180910390fd5b80611cde7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b611c55565b60000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b611d2b8361208a565b600082511180611d385750805b15611d4957611d4783836120d9565b505b505050565b600060019054906101000a900460ff16611d9d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611d9490613495565b60405180910390fd5b611dad611da8612082565b611b8f565b565b600060019054906101000a900460ff16611dfe576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611df590613495565b60405180910390fd5b6000828051906020012090506000828051906020012090508160c9819055508060ca8190555050505050565b6000611e657f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f611e586121bd565b611e606121c7565b6121d1565b905090565b60008282604051602001611e7f929190612f16565b60405160208183030381529060405280519060200120905092915050565b600080604183511415611edf5760008060006020860151925060408601519150606086015160001a9050611ed38782858561220b565b94509450505050611ee8565b60006002915091505b9250929050565b60006004811115611f0357611f02613744565b5b816004811115611f1657611f15613744565b5b1415611f215761205a565b60016004811115611f3557611f34613744565b5b816004811115611f4857611f47613744565b5b1415611f89576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611f80906131f5565b60405180910390fd5b60026004811115611f9d57611f9c613744565b5b816004811115611fb057611faf613744565b5b1415611ff1576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611fe890613235565b60405180910390fd5b6003600481111561200557612004613744565b5b81600481111561201857612017613744565b5b1415612059576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612050906132f5565b60405180910390fd5b5b50565b6000612068836122ee565b801561207a5750612079838361233b565b5b905092915050565b600033905090565b61209381611c69565b8073ffffffffffffffffffffffffffffffffffffffff167fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b60405160405180910390a250565b60606120e4836110fc565b612123576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161211a90613475565b60405180910390fd5b6000808473ffffffffffffffffffffffffffffffffffffffff168460405161214b9190612ed9565b600060405180830381855af49150503d8060008114612186576040519150601f19603f3d011682016040523d82523d6000602084013e61218b565b606091505b50915091506121b38282604051806060016040528060278152602001613f53602791396123fa565b9250505092915050565b600060c954905090565b600060ca54905090565b600083838346306040516020016121ec959493929190613105565b6040516020818303038152906040528051906020012090509392505050565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a08360001c11156122465760006003915091506122e5565b60006001878787876040516000815260200160405260405161226b9493929190613158565b6020604051602081039080840390855afa15801561228d573d6000803e3d6000fd5b505050602060405103519050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614156122dc576000600192509250506122e5565b80600092509250505b94509492505050565b600061231a827f01ffc9a70000000000000000000000000000000000000000000000000000000061233b565b801561233457506123328263ffffffff60e01b61233b565b155b9050919050565b6000806301ffc9a760e01b83604051602401612357919061319d565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff838183161783525050505090506000806000602060008551602087018a617530fa92503d915060005190508280156123e2575060208210155b80156123ee5750600081115b94505050505092915050565b6060831561240a57829050612415565b612414838361241c565b5b9392505050565b60008251111561242f5781518083602001fd5b806040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161246391906131d3565b60405180910390fd5b600061247f61247a846134da565b6134b5565b905080838252602082019050828560208602820111156124a2576124a16137db565b5b60005b858110156124d257816124b888826125a3565b8452602084019350602083019250506001810190506124a5565b5050509392505050565b60006124ef6124ea84613506565b6134b5565b90508083825260208201905082856020860282011115612512576125116137db565b5b60005b858110156125425781612528888261263e565b845260208401935060208301925050600181019050612515565b5050509392505050565b600061255f61255a84613532565b6134b5565b90508281526020810184848401111561257b5761257a6137e0565b5b61258684828561364f565b509392505050565b60008135905061259d81613ef6565b92915050565b6000815190506125b281613ef6565b92915050565b600082601f8301126125cd576125cc6137d6565b5b81516125dd84826020860161246c565b91505092915050565b600082601f8301126125fb576125fa6137d6565b5b815161260b8482602086016124dc565b91505092915050565b60008151905061262381613f0d565b92915050565b60008135905061263881613f24565b92915050565b60008151905061264d81613f24565b92915050565b60008083601f840112612669576126686137d6565b5b8235905067ffffffffffffffff811115612686576126856137d1565b5b6020830191508360018202830111156126a2576126a16137db565b5b9250929050565b600082601f8301126126be576126bd6137d6565b5b81356126ce84826020860161254c565b91505092915050565b6000813590506126e681613f3b565b92915050565b6000815190506126fb81613f3b565b92915050565b600060208284031215612717576127166137ea565b5b60006127258482850161258e565b91505092915050565b600060208284031215612744576127436137ea565b5b6000612752848285016125a3565b91505092915050565b60008060408385031215612772576127716137ea565b5b60006127808582860161258e565b92505060206127918582860161258e565b9150509250929050565b6000806000606084860312156127b4576127b36137ea565b5b60006127c28682870161258e565b93505060206127d386828701612629565b92505060406127e4868287016126d7565b9150509250925092565b600080600080600080600080600060e08a8c0312156128105761280f6137ea565b5b600061281e8c828d0161258e565b995050602061282f8c828d01612629565b98505060406128408c828d016126d7565b97505060606128518c828d016126d7565b96505060806128628c828d0161258e565b95505060a08a013567ffffffffffffffff811115612883576128826137e5565b5b61288f8c828d01612653565b945094505060c08a013567ffffffffffffffff8111156128b2576128b16137e5565b5b6128be8c828d01612653565b92509250509295985092959850929598565b600080604083850312156128e7576128e66137ea565b5b60006128f58582860161258e565b925050602083013567ffffffffffffffff811115612916576129156137e5565b5b612922858286016126a9565b9150509250929050565b60008060408385031215612943576129426137ea565b5b600083015167ffffffffffffffff811115612961576129606137e5565b5b61296d858286016125b8565b925050602061297e8582860161263e565b9150509250929050565b6000806040838503121561299f5761299e6137ea565b5b600083015167ffffffffffffffff8111156129bd576129bc6137e5565b5b6129c9858286016125e6565b92505060206129da85828601612614565b9150509250929050565b6000602082840312156129fa576129f96137ea565b5b6000612a0884828501612614565b91505092915050565b600060208284031215612a2757612a266137ea565b5b6000612a3584828501612629565b91505092915050565b600060208284031215612a5457612a536137ea565b5b6000612a628482850161263e565b91505092915050565b600060208284031215612a8157612a806137ea565b5b6000612a8f848285016126ec565b91505092915050565b612aa1816135a0565b82525050565b612ab0816135b2565b82525050565b612abf816135be565b82525050565b612ad6612ad1826135be565b61370b565b82525050565b612ae5816135c8565b82525050565b6000612af682613563565b612b008185613579565b9350612b1081856020860161365e565b80840191505092915050565b612b258161362b565b82525050565b612b348161363d565b82525050565b6000612b458261356e565b612b4f8185613584565b9350612b5f81856020860161365e565b612b68816137ef565b840191505092915050565b6000612b80601883613584565b9150612b8b82613800565b602082019050919050565b6000612ba3603583613584565b9150612bae82613829565b604082019050919050565b6000612bc6601f83613584565b9150612bd182613878565b602082019050919050565b6000612be9601c83613595565b9150612bf4826138a1565b601c82019050919050565b6000612c0c603283613584565b9150612c17826138ca565b604082019050919050565b6000612c2f602683613584565b9150612c3a82613919565b604082019050919050565b6000612c52600283613595565b9150612c5d82613968565b600282019050919050565b6000612c75604d83613584565b9150612c8082613991565b606082019050919050565b6000612c98602c83613584565b9150612ca382613a06565b604082019050919050565b6000612cbb602f83613584565b9150612cc682613a55565b604082019050919050565b6000612cde602283613584565b9150612ce982613aa4565b604082019050919050565b6000612d01602c83613584565b9150612d0c82613af3565b604082019050919050565b6000612d24603283613584565b9150612d2f82613b42565b604082019050919050565b6000612d47603883613584565b9150612d5282613b91565b604082019050919050565b6000612d6a602983613584565b9150612d7582613be0565b604082019050919050565b6000612d8d602e83613584565b9150612d9882613c2f565b604082019050919050565b6000612db0602c83613584565b9150612dbb82613c7e565b604082019050919050565b6000612dd3603783613584565b9150612dde82613ccd565b604082019050919050565b6000612df6602e83613584565b9150612e0182613d1c565b604082019050919050565b6000612e19602d83613584565b9150612e2482613d6b565b604082019050919050565b6000612e3c602083613584565b9150612e4782613dba565b602082019050919050565b6000612e5f604883613584565b9150612e6a82613de3565b606082019050919050565b6000612e82602683613584565b9150612e8d82613e58565b604082019050919050565b6000612ea5602b83613584565b9150612eb082613ea7565b604082019050919050565b612ec481613614565b82525050565b612ed38161361e565b82525050565b6000612ee58284612aeb565b915081905092915050565b6000612efb82612bdc565b9150612f078284612ac5565b60208201915081905092915050565b6000612f2182612c45565b9150612f2d8285612ac5565b602082019150612f3d8284612ac5565b6020820191508190509392505050565b6000602082019050612f626000830184612a98565b92915050565b6000606082019050612f7d6000830186612a98565b612f8a6020830185612ab6565b612f976040830184612a98565b949350505050565b6000606082019050612fb46000830186612a98565b612fc16020830185612ab6565b612fce6040830184612b1c565b949350505050565b600060a082019050612feb6000830188612a98565b612ff86020830187612ab6565b6130056040830186612ebb565b6130126060830185612ebb565b61301f6080830184612a98565b9695505050505050565b600060208201905061303e6000830184612aa7565b92915050565b60006020820190506130596000830184612ab6565b92915050565b60006080820190506130746000830187612ab6565b6130816020830186612a98565b61308e6040830185612ab6565b61309b6060830184612ebb565b95945050505050565b600060c0820190506130b96000830189612ab6565b6130c66020830188612a98565b6130d36040830187612ab6565b6130e06060830186612ebb565b6130ed6080830185612ebb565b6130fa60a0830184612a98565b979650505050505050565b600060a08201905061311a6000830188612ab6565b6131276020830187612ab6565b6131346040830186612ab6565b6131416060830185612ebb565b61314e6080830184612a98565b9695505050505050565b600060808201905061316d6000830187612ab6565b61317a6020830186612eca565b6131876040830185612ab6565b6131946060830184612ab6565b95945050505050565b60006020820190506131b26000830184612adc565b92915050565b60006020820190506131cd6000830184612b2b565b92915050565b600060208201905081810360008301526131ed8184612b3a565b905092915050565b6000602082019050818103600083015261320e81612b73565b9050919050565b6000602082019050818103600083015261322e81612b96565b9050919050565b6000602082019050818103600083015261324e81612bb9565b9050919050565b6000602082019050818103600083015261326e81612bff565b9050919050565b6000602082019050818103600083015261328e81612c22565b9050919050565b600060208201905081810360008301526132ae81612c68565b9050919050565b600060208201905081810360008301526132ce81612c8b565b9050919050565b600060208201905081810360008301526132ee81612cae565b9050919050565b6000602082019050818103600083015261330e81612cd1565b9050919050565b6000602082019050818103600083015261332e81612cf4565b9050919050565b6000602082019050818103600083015261334e81612d17565b9050919050565b6000602082019050818103600083015261336e81612d3a565b9050919050565b6000602082019050818103600083015261338e81612d5d565b9050919050565b600060208201905081810360008301526133ae81612d80565b9050919050565b600060208201905081810360008301526133ce81612da3565b9050919050565b600060208201905081810360008301526133ee81612dc6565b9050919050565b6000602082019050818103600083015261340e81612de9565b9050919050565b6000602082019050818103600083015261342e81612e0c565b9050919050565b6000602082019050818103600083015261344e81612e2f565b9050919050565b6000602082019050818103600083015261346e81612e52565b9050919050565b6000602082019050818103600083015261348e81612e75565b9050919050565b600060208201905081810360008301526134ae81612e98565b9050919050565b60006134bf6134d0565b90506134cb8282613691565b919050565b6000604051905090565b600067ffffffffffffffff8211156134f5576134f46137a2565b5b602082029050602081019050919050565b600067ffffffffffffffff821115613521576135206137a2565b5b602082029050602081019050919050565b600067ffffffffffffffff82111561354d5761354c6137a2565b5b613556826137ef565b9050602081019050919050565b600081519050919050565b600081519050919050565b600081905092915050565b600082825260208201905092915050565b600081905092915050565b60006135ab826135f4565b9050919050565b60008115159050919050565b6000819050919050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600060ff82169050919050565b600061363682613614565b9050919050565b60006136488261361e565b9050919050565b82818337600083830152505050565b60005b8381101561367c578082015181840152602081019050613661565b8381111561368b576000848401525b50505050565b61369a826137ef565b810181811067ffffffffffffffff821117156136b9576136b86137a2565b5b80604052505050565b60006136cd82613614565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415613700576136ff613715565b5b600182019050919050565b6000819050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f45434453413a20696e76616c6964207369676e61747572650000000000000000600082015250565b7f436c61696d4d616e616765723a20537563682076657273696f6e206f6620746860008201527f697320726f6c6520646f65736e27742065786973740000000000000000000000602082015250565b7f45434453413a20696e76616c6964207369676e6174757265206c656e67746800600082015250565b7f19457468657265756d205369676e6564204d6573736167653a0a333200000000600082015250565b7f436c61696d4d616e616765723a20456e726f6c6c6d656e74207072657265717560008201527f69736974657320617265206e6f74206d65740000000000000000000000000000602082015250565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b7f1901000000000000000000000000000000000000000000000000000000000000600082015250565b7f436c61696d4d616e616765723a2061677265656d656e74207369676e6572206960008201527f73206e6f7420617574686f72697a656420746f207369676e206f6e206265686160208201527f6c66206f66207375626a65637400000000000000000000000000000000000000604082015250565b7f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060008201527f64656c656761746563616c6c0000000000000000000000000000000000000000602082015250565b7f436c61696d4d616e616765723a2049737375657220646f6573206e6f7420686160008201527f7320726571756972656420726f6c650000000000000000000000000000000000602082015250565b7f45434453413a20696e76616c6964207369676e6174757265202773272076616c60008201527f7565000000000000000000000000000000000000000000000000000000000000602082015250565b7f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060008201527f6163746976652070726f78790000000000000000000000000000000000000000602082015250565b7f436c61696d4d616e616765723a205468652070726f6f6620686173206265656e60008201527f207375626d697474656420616c72656164790000000000000000000000000000602082015250565b7f555550535570677261646561626c653a206d757374206e6f742062652063616c60008201527f6c6564207468726f7567682064656c656761746563616c6c0000000000000000602082015250565b7f45524331393637557067726164653a20756e737570706f727465642070726f7860008201527f6961626c65555549440000000000000000000000000000000000000000000000602082015250565b7f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160008201527f647920696e697469616c697a6564000000000000000000000000000000000000602082015250565b7f436c61696d4d616e616765723a20526f6c65206973737565727320617265206e60008201527f6f74207370656369666965640000000000000000000000000000000000000000602082015250565b7f436c61696d4d616e616765723a20497373756572206973206e6f74206c69737460008201527f656420696e20726f6c652069737375657273206c697374000000000000000000602082015250565b7f45524331393637557067726164653a206e657720696d706c656d656e7461746960008201527f6f6e206973206e6f742055555053000000000000000000000000000000000000602082015250565b7f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60008201527f6f74206120636f6e747261637400000000000000000000000000000000000000602082015250565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b7f436c61696d4d616e616765723a2070726f6f66207369676e6572206973206e6f60008201527f7420617574686f72697a656420746f207369676e206f6e20626568616c66206f60208201527f6620697373756572000000000000000000000000000000000000000000000000604082015250565b7f416464726573733a2064656c65676174652063616c6c20746f206e6f6e2d636f60008201527f6e74726163740000000000000000000000000000000000000000000000000000602082015250565b7f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960008201527f6e697469616c697a696e67000000000000000000000000000000000000000000602082015250565b613eff816135a0565b8114613f0a57600080fd5b50565b613f16816135b2565b8114613f2157600080fd5b50565b613f2d816135be565b8114613f3857600080fd5b50565b613f4481613614565b8114613f4f57600080fd5b5056fe416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a2646970667358221220c5d15993114060abb10709456c076cfbfb580c8ff9e9d2f582cbf2439932eef664736f6c63430008060033";
class ClaimManager__factory extends ContractFactory {
    constructor(...args) {
        if (args.length === 1) {
            super(_abi, _bytecode, args[0]);
        }
        else {
            super(...args);
        }
    }
    deploy(overrides) {
        return super.deploy(overrides || {});
    }
    getDeployTransaction(overrides) {
        return super.getDeployTransaction(overrides || {});
    }
    attach(address) {
        return super.attach(address);
    }
    connect(signer) {
        return super.connect(signer);
    }
    static createInterface() {
        return new utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new Contract(address, _abi, signerOrProvider);
    }
}
ClaimManager__factory.bytecode = _bytecode;
ClaimManager__factory.abi = _abi;

function canonizeSig(sig) {
    let suffix = sig.substr(130);
    if (suffix === '00') {
        suffix = '1b';
    }
    else if (suffix === '01') {
        suffix = '1c';
    }
    return sig.substr(0, 130) + suffix;
}

const { id, keccak256, defaultAbiCoder, solidityKeccak256, namehash, arrayify, } = utils;
/**
 * Service responsible for handling the request and issuance of claims.
 * See more information about claims in IAM stack [here](../../../docs/guides/claim.md).
 *
 * ```typescript
 * const { connectToCacheServer } = await initWithPrivateKeySigner(privateKey, rpcUrl);
 * const { connectToDidRegistry } = await connectToCacheServer();
 * const { claimsService } = await connectToDidRegistry();
 * claimsService.getClaimById(claim.id);
 * ```
 */
class ClaimsService {
    constructor(_signerService, _domainsService, _cacheClient, _didRegistry, _verifiableCredentialService) {
        this._signerService = _signerService;
        this._domainsService = _domainsService;
        this._cacheClient = _cacheClient;
        this._didRegistry = _didRegistry;
        this._verifiableCredentialService = _verifiableCredentialService;
        this._claimManagerInterface = ClaimManager__factory.createInterface();
        this._signerService.onInit(this.init.bind(this));
        this._setIssuerVerifier();
        this._setStatusVerifier();
    }
    static create(signerService, domainsService, cacheClient, didRegistry, verifiableCredentialService) {
        return __awaiter(this, void 0, void 0, function* () {
            const service = new ClaimsService(signerService, domainsService, cacheClient, didRegistry, verifiableCredentialService);
            yield service.init();
            return service;
        });
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            const chainId = this._signerService.chainId;
            this._claimManager = chainConfigs()[chainId].claimManagerAddress;
            const signer = this._signerService.signer;
            const provider = signer.provider;
            const publicKey = yield this._signerService.publicKey();
            let ewSigner;
            if (signer instanceof Wallet &&
                provider instanceof providers.JsonRpcProvider) {
                ewSigner = EwSigner.fromPrivateKey(signer.privateKey, {
                    type: ProviderTypes.HTTP,
                    uriOrInfo: provider.connection.url,
                });
            }
            else if (provider instanceof providers.JsonRpcProvider) {
                ewSigner = EwSigner.fromEthersSigner(signer, publicKey);
            }
            else {
                /** @todo from EIP1193Provider */
                throw new Error(ERROR_MESSAGES.UNKNOWN_PROVIDER);
            }
            this._claimRevocation = new ClaimRevocation(ewSigner, chainConfigs()[chainId].claimsRevocationRegistryAddress);
        });
    }
    /**
     * A utility function to check the blockchain directly if a DID has a role.
     *
     * ```typescript
     * claimsService.hasOnChainRole('did:ethr:ewc:0x00...0', 'email.roles.iam.ewc', 1);
     * ```
     *
     * @param {string} did The ethr DID to check
     * @param {string} role The role to check (the full namespace)
     * @param {number} version The version to check
     * @return `true` if DID has role at the version. `false` if not.
     */
    hasOnChainRole(did, role, version) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: fail if the DID chain ID doesn't match the configured signer network connection
            const data = this._claimManagerInterface.encodeFunctionData('hasRole', [
                addressOf(did),
                namehash(role),
                version,
            ]);
            // Expect result to be either:
            // '0x0000000000000000000000000000000000000000000000000000000000000000'
            // '0x0000000000000000000000000000000000000000000000000000000000000001'
            const result = yield this._signerService.call({
                to: this._claimManager,
                data,
            });
            const intFromHexString = Number.parseInt(result);
            return Boolean(intFromHexString);
        });
    }
    /**
     * Retrieve claims related to a given subjects.
     *
     * ```typescript
     * claimsService.getClaimsBySubjects(['did:ethr:0x00...0', 'did:ethr:0x00...1', ...]);
     * ```
     *
     * @param {Array<string>} subjects list of subjects
     * @returns list of claims
     */
    getClaimsBySubjects(subjects) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._cacheClient.getClaimsBySubjects(subjects);
        });
    }
    /**
     * Retrieve claims requested by a given requester with allowing filter by status and parent namespace.
     *
     * ```typescript
     * claimsService.getClaimsByRequester({
     *     did: 'did:ethr:0x00...0',
     *     isAccepted: false,
     *     namespace: 'energyweb.iam.ewc',
     * });
     * ```
     *
     * @param {GetClaimsByRequesterOptions} options object containing options
     * @returns list of claims
     */
    getClaimsByRequester({ did, isAccepted, namespace, }) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._cacheClient.getClaimsByRequester(did, {
                isAccepted,
                namespace,
            });
        });
    }
    /**
     * Retrieve claims issued by a given issuer with allowing filter by status and parent namespace.
     *
     * ```typescript
     * claimsService.getClaimsByIssuer({
     *     did: 'did:ethr:0x00...0',
     *     isAccepted: false,
     *     namespace: 'energyweb.iam.ewc',
     * });
     * ```
     *
     * @param {GetClaimsByIssuerOptions} options object containing options
     * @returns list of claims
     */
    getClaimsByIssuer({ did, isAccepted, namespace, }) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._cacheClient.getClaimsByIssuer(did, { isAccepted, namespace });
        });
    }
    /**
     * Retrieve claims for given subject with allowing filter by status and parent namespace.
     *
     * ```typescript
     * claimsService.getClaimsBySubject({
     *     did: 'did:ethr:0x00...0',
     *     isAccepted: false,
     *     namespace: 'energyweb.iam.ewc',
     * });
     * ```
     *
     * @param {GetClaimsBySubjectOptions} options object containing options
     * @returns list of claims
     */
    getClaimsBySubject({ did, isAccepted, namespace, }) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._cacheClient.getClaimsBySubject(did, { isAccepted, namespace });
        });
    }
    /**
     * Retrieve all claims that a user can revoke. Allow to filter by namespace
     *
     * ```typescript
     * claimsService.getClaimsByRevoker({
     *  did: 'did:ethr:0x00...0',
     *  namespace: 'energyweb.iam.ewc',
     * });
     * ```
     *
     * @param {GetClaimsByRevokerOptions} options
     * @return list of claims
     */
    getClaimsByRevoker({ did, namespace, }) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._cacheClient.getClaimsByRevoker(did, { namespace });
        });
    }
    /**
     * Retrieve claim with given id.
     *
     * ```typescript
     * const claimId = '7281a130-e2b1-430d-8c14-201010eae901';
     * claimsService.getClaimById(claimId);
     * ```
     *
     * @param {string} claimId claim id
     * @return claim with given id
     */
    getClaimById(claimId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._cacheClient.getClaimById(claimId);
        });
    }
    /**
     * Allows subject to request for credential by creating and sending a claim request to claim issuer.
     *
     * ```typescript
     * claimsService.createClaimRequest({
     *     claim: {
     *          claimType: 'email.roles.energyweb.iam.ewc',
     *          claimTypeVersion: 1,
     *          requestorFields: [{key: 'foo', value: 'bar'}],
     *     };
     *     subject: 'did:ethr:0x00...0',
     *     registrationTypes: [RegistrationTypes.OnChain, RegistrationTypes.OffChain]
     * });
     * ```
     *
     * @param {CreateClaimRequestOptions} options object containing options
     */
    createClaimRequest({ claim, subject = this._signerService.did, registrationTypes = [RegistrationTypes.OffChain], }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { claimType: role, claimTypeVersion: version } = claim;
            const token = yield this._didRegistry.createPublicClaim({
                data: claim,
                subject,
            });
            yield this.verifyEnrolmentPrerequisites({ subject, role });
            // temporarily, until claimIssuer is not removed from Claim entity
            const issuer = [
                `did:${Methods.Erc1056}:${this._signerService.chainName()}:${emptyAddress}`,
            ];
            const message = {
                id: v4(),
                token,
                claimIssuer: issuer,
                requester: this._signerService.did,
                registrationTypes,
                claimType: role,
                claimTypeVersion: version.toString(),
            };
            if (registrationTypes.includes(RegistrationTypes.OnChain)) {
                if (!version) {
                    throw new Error(ERROR_MESSAGES.ONCHAIN_ROLE_VERSION_NOT_SPECIFIED);
                }
                message.subjectAgreement = yield this.approveRolePublishing({
                    subject,
                    role,
                    version,
                });
            }
            yield this._cacheClient.requestClaim(message);
        });
    }
    /**
     * Issue a claim request by signing both off-chain and on-chain request and persisting result to the cache-server.
     * Optionally, issue on-chain role can be submitted to the ClaimManager contract as well.
     * If `credentialStatus` is not overridden then status from ssi-hub will be set.
     *
     * ```typescript
     * const claim: Claim = await claimsService.getClaimById('7281a130-e2b1-430d-8c14-201010eae901');
     * claimsService.issueClaimRequest({
     *     requester: claim.requester,
     *     token: claim.token,
     *     id: claim.id,
     *     subjectAgreement: claim.subjectAgreement,
     *     registrationTypes: claim.registrationTypes;
     *     issuerFields: [{key: 'foo', value: 'bar'}],
     *     publishOnChain: false,
     * });
     * ```
     *
     * @param {IssueClaimRequestOptions} options object containing options
     */
    issueClaimRequest({ requester, token, id: requestId, subjectAgreement, registrationTypes, issuerFields, publishOnChain = true, credentialStatusOverride, expirationTimestamp, }) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { claimData, sub } = this._didRegistry.jwt.decode(token);
            const roleDefinition = yield this._domainsService.getDefinition({
                type: NamespaceType.Role,
                namespace: claimData.claimType,
            });
            yield this.verifyEnrolmentPrerequisites({
                subject: sub,
                role: claimData.claimType,
                roleDefinition,
            });
            const strippedClaimData = this.stripClaimData(claimData);
            const { claimType: role, claimTypeVersion: version } = claimData;
            const message = {
                id: requestId,
                requester,
                claimIssuer: [this._signerService.did],
                acceptedBy: this._signerService.did,
                expirationTimestamp,
            };
            const expiry = expirationTimestamp
                ? Math.floor(expirationTimestamp / 1000)
                : eternityTimestamp;
            if (registrationTypes.includes(RegistrationTypes.OnChain)) {
                const onChainProof = yield this.createOnChainProof(role, version, expiry, sub);
                message.onChainProof = onChainProof;
                if (publishOnChain) {
                    if (!subjectAgreement) {
                        throw new Error(ERROR_MESSAGES.ONCHAIN_ROLE_SUBJECT_AGREEMENT_NOT_SPECIFIED);
                    }
                    yield this.registerOnchain({
                        token,
                        subjectAgreement,
                        onChainProof,
                        acceptedBy: this._signerService.did,
                        expirationTimestamp: expiry,
                    });
                }
            }
            if (registrationTypes.includes(RegistrationTypes.OffChain)) {
                yield this.verifyIssuer(claimData.claimType);
                const vp = yield this.issueVerifiablePresentation({
                    subject: sub,
                    namespace: role,
                    version: version.toString(),
                    issuerFields,
                    credentialStatus: credentialStatusOverride,
                    expirationTimestamp,
                });
                const vpCredentialStatus = (_a = vp === null || vp === void 0 ? void 0 : vp.verifiableCredential[0]) === null || _a === void 0 ? void 0 : _a.credentialStatus;
                const credentialStatus = credentialStatusOverride || vpCredentialStatus;
                const publicClaim = Object.assign({ did: sub, signer: this._signerService.did, exp: expiry, claimData: Object.assign(Object.assign({}, strippedClaimData), (issuerFields && { issuerFields })) }, (credentialStatus && { credentialStatus }));
                const issuedToken = yield this._didRegistry.issuePublicClaim({
                    publicClaim,
                    expirationTimestamp,
                });
                message.issuedToken = issuedToken;
                message.vp = JSON.stringify(vp);
            }
            yield this._cacheClient.issueClaim(this._signerService.did, message);
        });
    }
    /**
     * Register issued on-chain claim on Claim Manager contract Can be used by asset owners to register credentials on-chain for their assets.
     *
     * ```typescript
     * const claim: Claim = await claimsService.getClaimById('7281a130-e2b1-430d-8c14-201010eae901');
     * claimsService.registerOnchain({
     *     claimType: claim.claimType,
     *     claimTypeVersion: claim.claimTypeVersion,
     *     subjectAgreement: claim.subjectAgreement,
     *     onChainProof: claim.onChainProof,
     *     acceptedBy: claim.acceptedBy;
     *     subject: claim.subject,
     * });
     * ```
     *
     * @param {RegisterOnchainOptions} claim object containing options
     */
    registerOnchain(claim) {
        return __awaiter(this, void 0, void 0, function* () {
            // backward compatibility with token
            if (claim.token) {
                claim = Object.assign(Object.assign({}, claim), this.extractClaimRequest(claim.token));
            }
            if (!readyToBeRegisteredOnchain(claim)) {
                throw new Error(ERROR_MESSAGES.CLAIM_WAS_NOT_ISSUED);
            }
            const { subject, claimTypeVersion, claimType, acceptedBy, onChainProof, expirationTimestamp, } = claim;
            let { subjectAgreement } = claim;
            if (yield this.hasOnChainRole(subject, claimType, +claimTypeVersion)) {
                getLogger().warn(`[ClaimsService]: ${claimType} already registered for ${subject}`);
                return;
            }
            if (!subjectAgreement) {
                subjectAgreement = yield this.approveRolePublishing({
                    subject,
                    role: claimType,
                    version: +claimTypeVersion,
                });
            }
            const expiry = expirationTimestamp || eternityTimestamp;
            const data = this._claimManagerInterface.encodeFunctionData('register', [
                addressOf(subject),
                namehash(claimType),
                claimTypeVersion,
                expiry,
                addressOf(acceptedBy),
                subjectAgreement,
                onChainProof,
            ]);
            yield this._signerService.send({
                to: this._claimManager,
                data,
            });
        });
    }
    /**
     * Reject claim request.
     *
     * ```typescript
     * const claim: Claim = await claimsService.getClaimById('7281a130-e2b1-430d-8c14-201010eae901');
     * claimsService.rejectClaimRequest({
     *     id: claim.id,
     *     requesterDID: claim.requester,
     *     rejectionReason: 'some reason',
     * });
     * ```
     *
     * @param {RejectClaimRequestOptions} options object containing options
     */
    rejectClaimRequest({ id: rejectClaimRequestId, requesterDID, rejectionReason, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = {
                id: rejectClaimRequestId,
                requester: requesterDID,
                claimIssuer: [this._signerService.did],
                isRejected: true,
                rejectionReason,
            };
            return this._cacheClient.rejectClaim(this._signerService.did, message);
        });
    }
    /**
     * Delete claim request. Works only for pending claims (not issued or rejected).
     *
     * ```typescript
     * claimsService.deleteClaim({
     *     id: '7281a130-e2b1-430d-8c14-201010eae901',
     * });
     * ```
     *
     * @param {DeleteClaimOptions} options object containing options
     */
    deleteClaim({ id: deleteClaimId }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._cacheClient.deleteClaim(deleteClaimId);
        });
    }
    /**
     * Issue claim without previous request. Option available for issuers only.
     * If `credentialStatus` is not overridden then status from ssi-hub will be set.
     *
     * ```typescript
     * claimsService.issueClaim({
     *     claim: {
     *          claimType: 'email.roles.energyweb.iam.ewc',
     *          claimTypeVersion: 1,
     *          issuerFields: [{key: 'foo', value: 'bar'}],
     *     };
     *     subject: 'did:ethr:0x00...0',
     *     registrationTypes: [RegistrationTypes.OnChain, RegistrationTypes.OffChain]
     * });
     * ```
     *
     * @param {IssueClaimOptions} options object containing options
     * @return Issued token if registrationTypes includes RegistrationTypes.OffChain
     */
    issueClaim({ subject, registrationTypes = [RegistrationTypes.OffChain], claim, credentialStatusOverride, expirationTimestamp, }) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const roleDefinition = yield this._domainsService.getDefinition({
                type: NamespaceType.Role,
                namespace: claim.claimType,
            });
            yield this.verifyIssuer(claim.claimType);
            yield this.verifyEnrolmentPrerequisites({
                subject,
                role: claim.claimType,
                roleDefinition,
            });
            const message = {
                id: v4(),
                requester: subject,
                claimIssuer: [this._signerService.did],
                acceptedBy: this._signerService.did,
                expirationTimestamp,
            };
            const expiry = expirationTimestamp
                ? Math.floor(expirationTimestamp / 1000)
                : eternityTimestamp;
            if (registrationTypes.includes(RegistrationTypes.OffChain)) {
                const vp = yield this.issueVerifiablePresentation({
                    subject,
                    namespace: claim.claimType,
                    version: claim.claimTypeVersion.toString(),
                    issuerFields: claim.issuerFields,
                    credentialStatus: credentialStatusOverride,
                    expirationTimestamp,
                });
                const vpCredentialStatus = (_a = vp === null || vp === void 0 ? void 0 : vp.verifiableCredential[0]) === null || _a === void 0 ? void 0 : _a.credentialStatus;
                const credentialStatus = credentialStatusOverride || vpCredentialStatus;
                const publicClaim = Object.assign({ did: subject, exp: expiry, signer: this._signerService.did, claimData: claim }, (credentialStatus && { credentialStatus }));
                const issuedToken = yield this._didRegistry.issuePublicClaim({
                    publicClaim,
                });
                message.issuedToken = issuedToken;
                message.vp = JSON.stringify(vp);
            }
            if (registrationTypes.includes(RegistrationTypes.OnChain)) {
                const { claimType: role, claimTypeVersion: version } = claim;
                const onChainProof = yield this.createOnChainProof(role, version, expiry, subject);
                message.onChainProof = onChainProof;
                message.claimType = role;
                message.claimTypeVersion = version.toString();
            }
            yield this._cacheClient.issueClaim(this._signerService.did, message);
            return message.issuedToken;
        });
    }
    /**
     * Generates claim id or returns id of existing claim with same data
     * @param {ClaimData} param.claimData - claim data
     * @returns claim identifier
     */
    getClaimId({ claimData }) {
        return __awaiter(this, void 0, void 0, function* () {
            const services = yield this._didRegistry.getServices();
            const service = services.find(({ profile, claimType, claimTypeVersion }) => Boolean(profile) ||
                (claimType === claimData.claimType &&
                    claimTypeVersion === claimData.claimTypeVersion));
            if (!service)
                return v4();
            if (claimData.profile && service.id) {
                return service.id;
            }
            if (claimData.claimType &&
                service.id &&
                claimData.claimTypeVersion === service.claimTypeVersion) {
                return service.id;
            }
            return v4();
        });
    }
    /**
     * Register role to claim manager contract if registrationTypes includes RegistrationTypes.OnChain
     * Publish role to IPFS and add DID document service if registrationTypes includes RegistrationTypes.OffChain
     *
     * ```typescript
     * const claim: Claim = await claimsService.getClaimById('7281a130-e2b1-430d-8c14-201010eae901');
     * claimsService.publishPublicClaim({
     *     claim: {
     *          token: claim.token,
     *          claimType: claim.claimType,
     *     };
     *     registrationTypes: claim.registrationTypes,
     * });
     * ```
     *
     * @param {PublishPublicClaimOptions} options object containing options
     * @return URl to IPFS if registrationTypes includes RegistrationTypes.OffChain
     */
    publishPublicClaim({ token, // backward compatibility
    registrationTypes = [RegistrationTypes.OffChain], claim, }) {
        return __awaiter(this, void 0, void 0, function* () {
            claim.token = claim.token || token;
            const payload = (yield this._didRegistry.decodeJWTToken({
                token: claim.token,
            }));
            const { iss, claimData } = payload;
            let sub = payload === null || payload === void 0 ? void 0 : payload.sub;
            // Initialy subject was ignored because it was requester
            if (!sub || sub.length === 0 || !isValidDID(sub)) {
                sub = this._signerService.did;
            }
            this.validatePublishPublicClaimRequest(registrationTypes, claim);
            let url = undefined;
            if (registrationTypes.includes(RegistrationTypes.OnChain)) {
                if (!claim.claimType) {
                    throw new Error(ERROR_MESSAGES.CLAIM_TYPE_MISSING);
                }
                const claims = yield this.getClaimsBySubject({
                    did: sub,
                    namespace: this.getNamespaceFromClaimType(claim.claimType),
                    isAccepted: true,
                });
                const claimDataForClaimType = claims.find((c) => c.claimType === claim.claimType);
                if (!claimDataForClaimType) {
                    throw new Error(ERROR_MESSAGES.PUBLISH_NOT_ISSUED_CLAIM);
                }
                const expirationTimestamp = claimDataForClaimType.expirationTimestamp
                    ? Math.floor(+claimDataForClaimType.expirationTimestamp / 1000)
                    : undefined;
                yield this.registerOnchain(Object.assign(Object.assign({}, claimDataForClaimType), { expirationTimestamp, onChainProof: claimDataForClaimType.onChainProof, acceptedBy: claimDataForClaimType.acceptedBy }));
            }
            // add scenario for offchain without request based on claimType instead of token
            // can we break API so that register on chain required only claim type and claim type version and subject
            if (registrationTypes.includes(RegistrationTypes.OffChain)) {
                if (!claim.token) {
                    throw new Error(ERROR_MESSAGES.CLAIM_DOES_NOT_CONTAIN_TOKEN);
                }
                if (!this._didRegistry.isClaim(payload)) {
                    throw new Error(ERROR_MESSAGES.CLAIM_TOKEN_DATA_MISSING);
                }
                const claimToken = claim.token;
                const verifiedDid = yield this._didRegistry.verifyPublicClaim(claimToken, iss);
                if (!verifiedDid || !compareDID(verifiedDid, iss)) {
                    throw new Error('Incorrect signature');
                }
                url = yield this._didRegistry.ipfsStore.save(claimToken);
                const data = {
                    type: DIDAttribute.ServicePoint,
                    value: {
                        id: yield this.getClaimId({ claimData: claimData }),
                        serviceEndpoint: url,
                        hash: hashes.SHA256(claimToken),
                        hashAlg: 'SHA256',
                    },
                };
                const isDocUpdated = yield this._didRegistry.updateDocument({
                    didAttribute: DIDAttribute.ServicePoint,
                    data,
                    did: sub,
                });
                if (!isDocUpdated) {
                    throw new Error(ERROR_MESSAGES.DID_DOCUMENT_NOT_UPDATED);
                }
            }
            return url;
        });
    }
    /**
     * Creates self signed off-chain claim with `data` and adds it to `subject` document. Signer must own or control subject.
     *
     * ```typescript
     * claimsService.createSelfSignedClaim({
     *     data: {
     *          claimType: 'email.roles.energyweb.iam.ewc',
     *          claimTypeVersion: 1,
     *          issuerFields: [{key: 'foo', value: 'bar'}],
     *          profile: {
     *              name: 'John Doe',
     *              birthdate: '1990-01-01',
     *              address: '123 Main St',
     *          },
     *     },
     *     subject: 'did:ethr:volta:0x00...0',
     * });
     * ```
     *
     * @param {CreateSelfSignedClaimOptions} options object containing options
     * @return URl to IPFS
     */
    createSelfSignedClaim({ data, subject, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield this._didRegistry.createPublicClaim({ data, subject });
            return (yield this.publishPublicClaim({ claim: { token } }));
        });
    }
    /**
     * Get published off-chain claims of the given subject.
     *
     * ```typescript
     * claimsService.getUserClaims({
     *     did: 'did:ethr:0x00...0',
     * });
     * ```
     *
     * @param {GetUserClaimsOptions} options object containing options
     * @returns Claims containing DID document service endpoints
     */
    getUserClaims({ did = this._signerService.did, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const [services, issuedClaims] = yield Promise.all([
                this._didRegistry.getServices({ did }),
                this.getClaimsBySubject({
                    did,
                    isAccepted: true,
                }),
            ]);
            if (services.length === 0 || issuedClaims.length === 0)
                return [];
            const issuedClaimsTypes = issuedClaims
                .filter((c) => c.registrationTypes.includes(RegistrationTypes.OffChain))
                .map(({ claimType }) => claimType);
            return services
                .filter(isClaimService)
                .filter(({ claimType }) => issuedClaimsTypes.includes(claimType));
        });
    }
    /**
     * Create a public claim to prove identity.
     *
     * ```typescript
     * claimsService.createIdentityProof();
     * ```
     *
     * @return JWT token of created identity
     */
    createIdentityProof() {
        return __awaiter(this, void 0, void 0, function* () {
            const blockNumber = yield this._signerService.provider.getBlockNumber();
            return this._didRegistry.createPublicClaim({
                data: {
                    blockNumber,
                },
            });
        });
    }
    /**
     * Create a public claim to prove identity.
     *
     * ```typescript
     * claimsService.createDelegateProof(
     *     '245a40a9...776071ca57cec',
     *     'did:ethr:0x00...0',
     *     Algorithms.EIP191,
     * );
     * ```
     *
     * @param {String} delegateKey Private key of the delegate in hexadecimal format
     * @param {String} identity DID of the delegate
     * @param {String} algorithm Algorithm used to sign the delegate (EIP191 and ES256 available)
     *
     * @return JWT token of delegate
     */
    createDelegateProof(delegateKey, identity, algorithm = Algorithms.EIP191) {
        return __awaiter(this, void 0, void 0, function* () {
            const provider = this._signerService.provider;
            const blockNumber = (yield provider.getBlockNumber()).toString();
            const payload = {
                iss: identity,
                claimData: {
                    blockNumber,
                },
            };
            if (algorithm === Algorithms.EIP191) {
                return new JWT(new Wallet(delegateKey)).sign(payload, {
                    issuer: identity,
                });
            }
            else if (algorithm === Algorithms.ES256) {
                /** @todo move to @ew-did-registry/jwt */
                return jsonwebtoken.sign(payload, privToPem(delegateKey, KeyType.Secp256r1), {
                    issuer: identity,
                });
            }
            else {
                throw new Error(ERROR_MESSAGES.JWT_ALGORITHM_NOT_SUPPORTED);
            }
        });
    }
    /**
     * Get `namespace` from claim type.
     *
     * ```typescript
     * claimsService.getNamespaceFromClaimType(
     *     'email.roles.energyweb.iam.ewc'
     * );
     * ```
     *
     * @param {String} claimType Private key of the delegate in hexadecimal format
     *
     * @return Namespace of given claim type
     */
    getNamespaceFromClaimType(claimType) {
        return claimType.split('.roles.')[1];
    }
    /**
     * Revoke On-Chain issued claim by `claimId` or given `namespace` and `subject`. Required `claimId` or `claim` parameters.
     *
     * ```typescript
     * claimsService.revokeClaim({
     *     claim: {
     *         namespace: 'root.roles.energyweb.iam.ewc',
     *         subject: 'did:ethr:volta:0x00...0',
     *     },
     *     registrationTypes = [RegistrationTypes.OnChain, RegistrationTypes.OffChain],
     * });
     * ```
     * or
     * ```typescript
     * claimsService.revokeClaim({
     *     claimId: claim.id,
     *     registrationTypes = [RegistrationTypes.OnChain, RegistrationTypes.OffChain],
     * });
     * ```
     *
     * @param {RevokeClaimOptions} options object containing options
     * @return true if claim was revoked
     */
    revokeClaim(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const revoker = this._signerService.did;
            const { namespace, subject } = yield this.getRevocationClaimDetails(options);
            return yield this._claimRevocation.revokeClaim(namespace, subject, revoker);
        });
    }
    /**
     * Revoke On-Chain issued claims of the given namespace for multiple subjects. Namespace must be the same for all subjects.
     * Specify `claims` or `claimIds` parameters.
     *
     * ```typescript
     * claimsService.revokeMultipleClaim({
     *     claims: [{
     *         namespace: 'root.roles.energyweb.iam.ewc',
     *         subject: 'did:ethr:volta:0x00...0',
     *         registrationTypes = [RegistrationTypes.OnChain, RegistrationTypes.OffChain],
     *     },
     *     {
     *         namespace: 'root.roles.energyweb.iam.ewc',
     *         subject: 'did:ethr:volta:0x00...1',
     *         registrationTypes = [RegistrationTypes.OnChain],
     *     }],
     * });
     * ```
     * or
     * ```typescript
     * claimsService.revokeMultipleClaim({
     *     claimIds: ['245a40a9...776071ca57cec', '245a40a9...776071ca57cec'],
     * });
     * ```
     *
     * @param {RevokeMultipleClaimOptions} options object containing options
     */
    revokeMultipleClaim({ claimIds, claims, }) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if (!claimIds && !claims) {
                throw new Error(ERROR_MESSAGES.REVOKE_CLAIM_MISSING_PARAMETERS);
            }
            const revoker = this._signerService.did;
            let claimsDetailsToRevoke = [
                ...(claims || []),
            ];
            let namespace = ((_a = claims === null || claims === void 0 ? void 0 : claims[0]) === null || _a === void 0 ? void 0 : _a.namespace) || '';
            if (claimIds) {
                const claimsDetails = yield Promise.all([
                    ...claimIds.map((claimId) => __awaiter(this, void 0, void 0, function* () {
                        const claim = yield this.getClaimById(claimId);
                        if (!claim)
                            return undefined;
                        return {
                            namespace: claim.claimType,
                            subject: claim.subject,
                        };
                    })),
                ]);
                claimsDetailsToRevoke = [
                    ...claimsDetails.filter((claim) => !!claim),
                ];
                namespace = (_b = claimsDetailsToRevoke[0]) === null || _b === void 0 ? void 0 : _b.namespace;
            }
            yield this._claimRevocation.revokeClaimforDIDs(namespace, claimsDetailsToRevoke.map((claim) => claim.subject), revoker);
        });
    }
    /**
     * Check if On-Chain claim is revoked.
     *
     * ```typescript
     * claimsService.isClaimRevoked({
     *     claim: {
     *         namespace: 'root.roles.energyweb.iam.ewc',
     *         subject: 'did:ethr:volta:0x00...0',
     *     },
     * });
     * ```
     * or
     * ```typescript
     * claimsService.isClaimRevoked({
     *     claimId: claim.id,
     * });
     * ```
     *
     * @param {IsClaimRevokedOptions} options object containing options
     * @return true if claim is revoked
     */
    isClaimRevoked(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { namespace, subject } = yield this.getRevocationClaimDetails(options);
            return this._claimRevocation.isClaimRevoked(namespace, subject);
        });
    }
    /**
     * Get the revocation details for a subject's On-Chain claim. Returns the revoker and revocationTimeStamp for the revocation.
     *
     * ```typescript
     * claimsService.claimRevocationDetails({
     *     claim: {
     *         namespace: 'root.roles.energyweb.iam.ewc',
     *         subject: 'did:ethr:volta:0x00...0',
     *     },
     * });
     * ```
     * or
     * ```typescript
     * claimsService.claimRevocationDetails({
     *     claimId: claim.id,
     * });
     * ```
     *
     * @param {ClaimRevocationDetailsOptions} options object containing options
     * @return revocation details
     */
    claimRevocationDetails(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { namespace, subject } = yield this.getRevocationClaimDetails(options);
            const { 0: revoker, 1: timestamp } = yield this._claimRevocation.getRevocationDetail(namespace, subject);
            if (revoker === emptyAddress) {
                return undefined;
            }
            return {
                revoker,
                timestamp: parseInt(timestamp, 10),
            };
        });
    }
    /**
     * Pick up the claim from the params and return the claim data.
     * Choose `claimId` first, then `claim`. Throw an error if both are missing.
     *
     * @param {GetRevocationClaimDetailsOptions} data claim data or claim id
     * @return claim data
     */
    getRevocationClaimDetails({ claimId, claim, }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!claimId && !claim) {
                throw new Error(ERROR_MESSAGES.REVOKE_CLAIM_MISSING_PARAMETERS);
            }
            let namespace = (claim === null || claim === void 0 ? void 0 : claim.namespace) || '';
            let subject = (claim === null || claim === void 0 ? void 0 : claim.subject) || '';
            if (claimId) {
                const claimData = yield this.getClaimById(claimId);
                if (!claimData) {
                    throw new Error(ERROR_MESSAGES.REVOKE_CLAIM_NOT_FOUND);
                }
                namespace = claimData.claimType;
                subject = claimData.subject;
            }
            return {
                namespace,
                subject,
            };
        });
    }
    /**
     * Remove `fields` from claim data.
     *
     * @param {ClaimData} data Claim data to remove fields from
     * @return Claim data without fields
     */
    stripClaimData(data) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const claimData = __rest(data, ["fields"]);
        return claimData;
    }
    /**
     * Validates publish public claim parameters depending on off-chain or on-chain registration type. Throws relevant error on invalid data.
     *
     * @param {Array<RegistrationTypes>} registrationTypes Registration types of the claim
     * @param {Object} claim `token` and `claimType` of the claim
     */
    validatePublishPublicClaimRequest(registrationTypes, claim) {
        if (registrationTypes.includes(RegistrationTypes.OnChain) &&
            !claim.claimType) {
            throw new Error(ERROR_MESSAGES.CLAIM_TYPE_REQUIRED_FOR_ON_CHAIN_REGISTRATION);
        }
        if (registrationTypes.includes(RegistrationTypes.OffChain) &&
            !claim.token) {
            throw new Error(ERROR_MESSAGES.TOKEN_REQUIRED_FOR_OFF_CHAIN_REGISTRATION);
        }
    }
    /**
     * Verify if the user is an authorized issuer of a role
     *
     * @param {String} role Registration types of the claim
     */
    verifyIssuer(role) {
        return __awaiter(this, void 0, void 0, function* () {
            const verificationResult = yield this._issuerVerification.verifyIssuer(this._signerService.did, role);
            if (!verificationResult.verified) {
                throw new Error(verificationResult.error);
            }
        });
    }
    /**
     * Verify claim request prerequisites for given role and subject. Throws relevant error on invalid data.
     *
     * @param {VerifyEnrolmentPrerequisitesOptions} options object containing options
     */
    verifyEnrolmentPrerequisites({ subject, role, roleDefinition: cachedRoleDefinition, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const roleDefinition = cachedRoleDefinition ||
                (yield this._domainsService.getDefinition({
                    type: NamespaceType.Role,
                    namespace: role,
                }));
            if (!roleDefinition) {
                throw new Error(ERROR_MESSAGES.ROLE_NOT_EXISTS);
            }
            const { enrolmentPreconditions } = roleDefinition;
            if (!enrolmentPreconditions || enrolmentPreconditions.length === 0)
                return;
            const requiredRoles = enrolmentPreconditions
                .filter(({ type }) => type === PreconditionType.Role)
                .map(({ conditions }) => conditions)
                .reduce((all, cur) => all.concat(cur), []);
            yield Promise.all(requiredRoles.map((requiredRole) => __awaiter(this, void 0, void 0, function* () {
                const verificationResult = yield this.resolveCredentialAndVerify(subject, requiredRole);
                if (!verificationResult.isVerified) {
                    throw new Error(ERROR_MESSAGES.ROLE_PREREQUISITES_NOT_MET);
                }
            })));
        });
    }
    /**
     * Create verifiable credential and wrap it into verifiable presentation.
     *
     * @param {VerifyEnrolmentPrerequisitesOptions} options object containing options
     * @return JSON representation of verifiable presentation
     */
    issueVerifiablePresentation(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const vc = yield this._verifiableCredentialService.createRoleVC({
                id: options.subject,
                namespace: options.namespace,
                version: options.version,
                issuerFields: options.issuerFields,
                credentialStatus: options.credentialStatus,
                expirationDate: options.expirationTimestamp
                    ? new Date(options.expirationTimestamp)
                    : undefined,
            });
            return yield this._verifiableCredentialService.createVerifiablePresentation([vc]);
        });
    }
    /**
     * Extract data from claim token.
     *
     * @param {String} token JWT token containing claimType, version and subject
     * @return Claim data
     */
    extractClaimRequest(token) {
        const { claimData, sub } = this._didRegistry.jwt.decode(token);
        return Object.assign(Object.assign({}, claimData), { subject: sub });
    }
    /**
     * Create subject agreement signature.
     *
     * @param {ApproveRolePublishingOptions} options object containing options
     * @return subject agreement signature
     */
    approveRolePublishing({ subject, role, version, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const erc712TypeHash = id('EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)');
            const agreement_type_hash = id('Agreement(address subject,bytes32 role,uint256 version)');
            const chainId = this._signerService.chainId;
            const domainSeparator = keccak256(defaultAbiCoder.encode(['bytes32', 'bytes32', 'bytes32', 'uint256', 'address'], [
                erc712TypeHash,
                id('Claim Manager'),
                id('1.0'),
                chainId,
                this._claimManager,
            ]));
            const messageId = Buffer.from(typedMsgPrefix, 'hex');
            const agreementHash = solidityKeccak256(['bytes', 'bytes32', 'bytes32'], [
                messageId,
                domainSeparator,
                keccak256(defaultAbiCoder.encode(['bytes32', 'address', 'bytes32', 'uint256'], [agreement_type_hash, addressOf(subject), namehash(role), version])),
            ]);
            return canonizeSig(yield this._signerService.signMessage(arrayify(agreementHash)));
        });
    }
    /**
     * Create on-chain proof signature.
     *
     * @param {String} role role claim type
     * @param {Number} version role version
     * @param {Number} expiry time in seconds when the claim expires
     * @param {String} subject DID of the subject
     *
     * @return on-chain proof signature
     */
    createOnChainProof(role, version, expiry, subject) {
        return __awaiter(this, void 0, void 0, function* () {
            const messageId = Buffer.from(typedMsgPrefix, 'hex');
            const chainId = this._signerService.chainId;
            const domainSeparator = utils.keccak256(defaultAbiCoder.encode(['bytes32', 'bytes32', 'bytes32', 'uint256', 'address'], [
                erc712_type_hash,
                utils.id('Claim Manager'),
                utils.id('1.0'),
                chainId,
                this._claimManager,
            ]));
            const proofHash = solidityKeccak256(['bytes', 'bytes32', 'bytes32'], [
                messageId,
                domainSeparator,
                utils.keccak256(defaultAbiCoder.encode(['bytes32', 'address', 'bytes32', 'uint', 'uint', 'address'], [
                    proof_type_hash,
                    addressOf(subject),
                    namehash(role),
                    version,
                    expiry,
                    this._signerService.address,
                ])),
            ]);
            return canonizeSig(yield this._signerService.signMessage(arrayify(proofHash)));
        });
    }
    /**
     * Verifies:
     * - That credential proof is valid
     * - That credential was issued by authorized issuer
     * - That credential was not revoked
     *
     * @param {VerifiableCredential<RoleCredentialSubject} vc to be verified
     * @return Boolean indicating if verified and array of error messages
     */
    verifyVc(vc) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = [];
            const issuerDID = vc.issuer;
            if (!issuerDID) {
                throw new Error(ERROR_MESSAGES.NO_ISSUER_SPECIFIED);
            }
            let proofVerified;
            let issuerVerified = true;
            try {
                proofVerified = yield this._verifiableCredentialService.verify(vc);
            }
            catch (e) {
                proofVerified = false;
                errors.push(e.message);
            }
            if (vc.credentialStatus) {
                try {
                    yield this._statusVerifier.verifyCredentialStatus(vc.credentialStatus);
                }
                catch (e) {
                    issuerVerified = false;
                    errors.push(e.message);
                }
            }
            if (!proofVerified) {
                errors.push(ERROR_MESSAGES.PROOF_NOT_VERIFIED);
            }
            const role = vc.credentialSubject.role.namespace;
            try {
                if (typeof issuerDID === 'string') {
                    yield this._issuerVerification.verifyIssuer(issuerDID, role);
                }
                else {
                    yield this._issuerVerification.verifyIssuer(issuerDID.id, role);
                }
            }
            catch (e) {
                issuerVerified = false;
                errors.push(e.message);
            }
            return {
                errors,
                isVerified: proofVerified && issuerVerified,
            };
        });
    }
    /**
     * Verifies:
     * - That off-chain claim was issued by authorized issuer
     * - That off-chain claim proof is valid
     *
     * @param {OffChainClaim} off chain claim to verify
     * @return Boolean indicating if verified and array of error messages
     */
    verifyRoleEIP191JWT(roleEIP191JWT) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const { payload, eip191Jwt } = roleEIP191JWT;
            const errors = [];
            const issuerDID = (_a = roleEIP191JWT.payload) === null || _a === void 0 ? void 0 : _a.iss;
            if (!issuerDID) {
                throw new Error(ERROR_MESSAGES.NO_ISSUER_SPECIFIED);
            }
            const proofVerified = yield this._didRegistry.verifyPublicClaim(eip191Jwt, payload === null || payload === void 0 ? void 0 : payload.iss);
            if (!proofVerified) {
                errors.push(ERROR_MESSAGES.PROOF_NOT_VERIFIED);
            }
            // Date.now() and JWT expiration time both identify the time elapsed since January 1, 1970 00:00:00 UTC
            const isExpired = (payload === null || payload === void 0 ? void 0 : payload.exp) && (payload === null || payload === void 0 ? void 0 : payload.exp) * 1000 < Date.now();
            if (isExpired) {
                errors.push(ERROR_MESSAGES.CREDENTIAL_EXPIRED);
            }
            const { verified: issuerVerified, error } = yield this._issuerVerification.verifyIssuer(issuerDID, (_b = payload === null || payload === void 0 ? void 0 : payload.claimData) === null || _b === void 0 ? void 0 : _b.claimType);
            if (!issuerVerified && error) {
                throw new Error(ERROR_MESSAGES.NO_ISSUER_SPECIFIED);
            }
            return {
                errors: errors,
                isVerified: !!proofVerified && issuerVerified && !isExpired,
            };
        });
    }
    /**
     * Fetch a credential from storage
     *
     * @param subjectDID The DID to try to resolve a credential for
     * @param roleNamesapce The role to try to get a credential for. Should be a full role namespace (for example, "myrole.roles.myorg.auth.ewc")
     * @return credential if available or undefined if not
     */
    fetchCredential(subjectDID, roleNamespace) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._credentialResolver.getCredential(subjectDID, roleNamespace);
        });
    }
    /**
     * Resolve a credential from storage and verify its proof/signature and its issuer's authority
     *
     * @param subjectDID The DID to try to resolve a credential for
     * @param roleNamesapce The role to try to get a credential for. Should be a full role namespace (for example, "myrole.roles.myorg.auth.ewc")
     * @return void. Returns "Proof Not Verified" error if VC not verified. Returns error if issuer not verified
     */
    resolveCredentialAndVerify(subjectDID, roleNamespace) {
        return __awaiter(this, void 0, void 0, function* () {
            const resolvedCredential = yield this._credentialResolver.getCredential(subjectDID, roleNamespace);
            if (!resolvedCredential) {
                return {
                    isVerified: false,
                    errors: [ERROR_MESSAGES.NO_CLAIM_RESOLVED],
                };
            }
            return isEIP191Jwt(resolvedCredential)
                ? this.verifyRoleEIP191JWT(resolvedCredential)
                : this.verifyVc(resolvedCredential);
        });
    }
    /**
     *
     * Set the Verifier for Claim Issuance.
     *
     */
    _setIssuerVerifier() {
        this._credentialResolver = new IpfsCredentialResolver(this._signerService.provider, this._didRegistry.registrySettings, this._didRegistry.ipfsStore);
        const domainReader = this._domainsService.domainReader;
        this._issuerResolver = new EthersProviderIssuerResolver(domainReader);
        const revokerResolver = new EthersProviderRevokerResolver(domainReader);
        const verifyProof = (vc, proofOptions) => this._verifiableCredentialService.verify(JSON.parse(vc), JSON.parse(proofOptions));
        const revocationVerification = new RevocationVerification(revokerResolver, this._issuerResolver, this._credentialResolver, verifyProof);
        this._issuerVerification = new IssuerVerification(this._issuerResolver, this._credentialResolver, this._signerService.provider, this._didRegistry.registrySettings, revocationVerification, verifyProof);
    }
    _setStatusVerifier() {
        this._statusVerifier = new StatusListEntryVerification((vc) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this._verifiableCredentialService.verify(JSON.parse(vc));
            }
            catch (e) {
                return JSON.stringify({ errors: [e.message] });
            }
            return JSON.stringify({ errors: [] });
        }));
    }
}

const verifiableCredentialEIP712Types = {
    EIP712Domain: [],
    VerifiableCredential: [
        { name: '@context', type: 'string[]' },
        { name: 'id', type: 'string' },
        { name: 'type', type: 'string[]' },
        { name: 'issuer', type: 'string' },
        { name: 'issuanceDate', type: 'string' },
        { name: 'credentialSubject', type: 'CredentialSubject' },
        { name: 'proof', type: 'Proof' },
        { name: 'credentialStatus', type: 'StatusList2021Entry' },
    ],
    EWFRole: [
        { name: 'namespace', type: 'string' },
        { name: 'version', type: 'string' },
    ],
    IssuerFields: [
        { name: 'key', type: 'string' },
        { name: 'value', type: 'string' },
    ],
    CredentialSubject: [
        { name: 'id', type: 'string' },
        { name: 'role', type: 'EWFRole' },
        { name: 'issuerFields', type: 'IssuerFields[]' },
    ],
    StatusList2021Entry: [
        { name: 'id', type: 'string' },
        { name: 'type', type: 'string' },
        { name: 'statusPurpose', type: 'string' },
        { name: 'statusListIndex', type: 'string' },
        { name: 'statusListCredential', type: 'string' },
    ],
    Proof: [
        { name: '@context', type: 'string' },
        { name: 'verificationMethod', type: 'string' },
        { name: 'created', type: 'string' },
        { name: 'proofPurpose', type: 'string' },
        { name: 'type', type: 'string' },
    ],
};
const verifiablePresentationEIP712Types = {
    Proof: verifiableCredentialEIP712Types.Proof,
    VerifiablePresentation: [
        { type: 'string[]', name: '@context' },
        { type: 'string', name: 'id' },
        { type: 'string[]', name: 'type' },
        { type: 'string', name: 'holder' },
        { type: 'Proof', name: 'proof' },
    ],
    EIP712Domain: [],
};
const verifiablePresentationWithCredentialEIP712Types = {
    VC712DomainTypedDataField: [
        { name: 'name', type: 'string' },
        { name: 'type', type: 'string' },
    ],
    VC712DomainData: [],
    VC712DomainSchema: [
        { name: 'StatusList2021Entry', type: 'VC712DomainTypedDataField[]' },
        { name: 'CredentialSubject', type: 'VC712DomainTypedDataField[]' },
        { name: 'EIP712Domain', type: 'VC712DomainTypedDataField[]' },
        { name: 'EWFRole', type: 'VC712DomainTypedDataField[]' },
        { name: 'IssuerFields', type: 'VC712DomainTypedDataField[]' },
        { name: 'Proof', type: 'VC712DomainTypedDataField[]' },
        { name: 'VerifiableCredential', type: 'VC712DomainTypedDataField[]' },
    ],
    VC712Domain: [
        { name: 'domain', type: 'VC712DomainData' },
        { name: 'messageSchema', type: 'VC712DomainSchema' },
        { name: 'primaryType', type: 'string' },
    ],
    EWFRole: verifiableCredentialEIP712Types.EWFRole,
    IssuerFields: verifiableCredentialEIP712Types.IssuerFields,
    CredentialSubject: verifiableCredentialEIP712Types.CredentialSubject,
    StatusList2021Entry: verifiableCredentialEIP712Types.StatusList2021Entry,
    VCProof: [
        ...verifiableCredentialEIP712Types.Proof,
        { type: 'string', name: 'proofValue' },
        { type: 'VC712Domain', name: 'eip712Domain' },
    ],
    VerifiableCredential: [
        { type: 'string[]', name: '@context' },
        { type: 'string', name: 'id' },
        { type: 'string[]', name: 'type' },
        { type: 'string', name: 'issuer' },
        { type: 'string', name: 'issuanceDate' },
        { type: 'CredentialSubject', name: 'credentialSubject' },
        { type: 'StatusList2021Entry', name: 'credentialStatus' },
        { type: 'VCProof', name: 'proof' },
    ],
    Proof: verifiableCredentialEIP712Types.Proof,
    VerifiablePresentation: [
        { type: 'string[]', name: '@context' },
        { type: 'string', name: 'id' },
        { type: 'string[]', name: 'type' },
        { type: 'string', name: 'holder' },
        { type: 'VerifiableCredential[]', name: 'verifiableCredential' },
        { type: 'Proof', name: 'proof' },
    ],
    EIP712Domain: [],
};

function isRoleCredential(credential) {
    const { credentialSubject } = credential;
    return (has(credentialSubject, 'id') &&
        has(credentialSubject, 'role') &&
        has(credentialSubject, 'issuerFields'));
}

const validateRoleCredentialSubject = (subject) => {
    var _a;
    const invalidField = (_a = subject.issuerFields) === null || _a === void 0 ? void 0 : _a.find((field) => !['string', 'number', 'boolean'].includes(typeof field.value));
    if (invalidField) {
        throw new InterfaceNotSatisfied('RoleCredentialSubjectParam', `IssuerFields invalid: ${invalidField.key} is not string or number`);
    }
};

const statusList2021CredentialEIP712Types = {
    EIP712Domain: [],
    VerifiableCredential: [
        { name: '@context', type: 'string[]' },
        { name: 'id', type: 'string' },
        { name: 'type', type: 'string[]' },
        { name: 'issuer', type: 'string' },
        { name: 'issuanceDate', type: 'string' },
        { name: 'credentialSubject', type: 'StatusList2021' },
        { name: 'proof', type: 'Proof' },
    ],
    StatusList2021: [
        { name: 'id', type: 'string' },
        { name: 'type', type: 'string' },
        { name: 'statusPurpose', type: 'string' },
        { name: 'encodedList', type: 'string' },
    ],
    Proof: [
        { name: '@context', type: 'string' },
        { name: 'verificationMethod', type: 'string' },
        { name: 'created', type: 'string' },
        { name: 'proofPurpose', type: 'string' },
        { name: 'type', type: 'string' },
    ],
};

// JSON Web Key (https://datatracker.ietf.org/doc/html/rfc7517) for ethereum keys
const KEY_TYPE = {
    kty: 'EC',
    crv: 'secp256k1',
    alg: 'ES256K-R',
    key_ops: ['signTypedData'],
};

/**
 * Service responsible for managing verifiable credentials and presentations.
 * You can read more about verifiable credentials data model [here](https://www.w3.org/TR/vc-data-model/).
 *
 * ```typescript
 * const { verifiableCredentialsService } = await initWithPrivateKeySigner(privateKey, rpcUrl);
 * verifiableCredentialsService.createRoleVC(...);
 * ```
 * */
class VerifiableCredentialsServiceBase {
    constructor(_signerService, _cacheClient) {
        this._signerService = _signerService;
        this._cacheClient = _cacheClient;
    }
    // * Should be overridden by the implementation
    static create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    signerService, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    cacheClient) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('Not implemented');
        });
    }
    /**
     * Initialize credential exchange. Only vc-api exchanges currently supported.
     *
     * ```typescript
     * verifiableCredentialsService.initiateExchange({
     *     type: VC_API_EXCHANGE,
     *     url: 'http://localhost:3000',
     * });
     * ```
     * @param {ExchangeInvitation} options object with options
     * @returns credentials query with matching verifiable presentations
     */
    initiateExchange({ type, url, }) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (type !== VC_API_EXCHANGE) {
                throw new Error('Only VC-API exchange is supported');
            }
            const { data: { errors, vpRequest }, } = yield axios.post(url);
            if (errors.length > 0) {
                throw new Error(`Error initiating exchange: ${JSON.stringify(errors)}`);
            }
            const credentialQuery = (_a = vpRequest.query.find((q) => q.type === VpRequestQueryType.presentationDefinition)) === null || _a === void 0 ? void 0 : _a.credentialQuery;
            const selections = yield Promise.all(credentialQuery.map(({ presentationDefinition }) => __awaiter(this, void 0, void 0, function* () {
                const presentationDefFiltered = Object.assign(Object.assign({}, presentationDefinition), { input_descriptors: this.filterSelfSignDescriptors(presentationDefinition === null || presentationDefinition === void 0 ? void 0 : presentationDefinition.input_descriptors) });
                const selectResults = yield this.getCredentialsByDefinition(presentationDefFiltered);
                return {
                    presentationDefinition,
                    selectResults,
                };
            })));
            return { vpRequest, selections };
        });
    }
    /**
     * @description Sends credentials requested by issuer and returns either issued credentials or next credentials request
     *
     * @param params.vpRequest credentials required to continue exchange
     * @returns issued credentials or request of additional credentials
     */
    continueExchange({ vpRequest: { challenge, interact: { service }, }, credentials, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const requiredPresentation = yield this.createVerifiablePresentation(credentials, {
                challenge,
            });
            const { data: { errors, vpRequest: nextVpRequest, vp: requestedPresentation }, } = yield axios.put(service[0].serviceEndpoint, {
                presentation: requiredPresentation,
            });
            if (errors.length > 0) {
                console.dir(errors, { depth: 20 });
                throw new Error(ERROR_MESSAGES.ERROR_CONTINUING_EXCHANGE);
            }
            if (nextVpRequest) {
                return nextVpRequest;
            }
            return requestedPresentation;
        });
    }
    /* Create a Energy Web role verifiable credential with EIP712 signature.
     *
     * ```typescript
     * verifiableCredentialsService.createRoleVC({
     *      id: 'did:ethr:volta:0x00...0',
     *      namespace: 'root.roles.energyweb.iam.ewc',
     *      version: '1',
     * });
     * ```
     * @param {RoleCredentialSubjectParams} credentialParams role credential parameters
     * @param {ProofOptions} proofOptions proof options
     * @returns verifiable credential object
     */
    createRoleVC(credentialParams, proofOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            const did = this._signerService.didHex;
            let credentialObject = this.createCredential(credentialParams);
            if (!credentialObject.credentialStatus) {
                credentialObject = yield this._cacheClient.addStatusToCredential(credentialObject);
            }
            const eip712MessageSchema = Object.assign(Object.assign({}, JSON.parse(JSON.stringify(verifiableCredentialEIP712Types))), { EIP712Domain: [] });
            if (credentialParams === null || credentialParams === void 0 ? void 0 : credentialParams.expirationDate) {
                eip712MessageSchema.VerifiableCredential.push({
                    name: 'expirationDate',
                    type: 'string',
                });
            }
            const proofOptionsObject = {
                verificationMethod: (proofOptions === null || proofOptions === void 0 ? void 0 : proofOptions.verificationMethod) || did + '#controller',
                proofPurpose: (proofOptions === null || proofOptions === void 0 ? void 0 : proofOptions.proofPurpose) || 'assertionMethod',
                eip712Domain: {
                    primaryType: 'VerifiableCredential',
                    domain: {},
                    messageSchema: eip712MessageSchema,
                },
            };
            const stringifyCredential = JSON.stringify(credentialObject);
            const preparedVC = yield this.prepareIssueCredential(stringifyCredential, JSON.stringify(proofOptionsObject), JSON.stringify(KEY_TYPE));
            const preparation = JSON.parse(preparedVC);
            const typedData = preparation.signingInput;
            if (!typedData || !typedData.primaryType) {
                throw new Error('Expected EIP-712 TypedData');
            }
            delete typedData.types['EIP712Domain'];
            const signature = yield this._signerService.signTypedData(typedData.domain, typedData.types, typedData.message);
            const signedCredential = yield this.completeIssueCredential(stringifyCredential, preparedVC, signature);
            return JSON.parse(signedCredential);
        });
    }
    /**
     * Create a presentation with given verifiable credentials. Allow create presentation for a given presentation definition.
     *
     * ```typescript
     * verifiableCredentialsService.createPresentation([...credentials]);
     * ```
     * @param {VerifiableCredential<RoleCredentialSubject>[]} verifiableCredential role credential parameters
     * @param {CreatePresentationParams} options presentation options
     * @returns presentation
     */
    createPresentation(verifiableCredential, options) {
        const did = this._signerService.didHex;
        const pex = new PEX();
        if (options === null || options === void 0 ? void 0 : options.presentationDefinition) {
            return Object.assign(Object.assign({}, pex.presentationFrom(options.presentationDefinition, verifiableCredential, did)), { id: 'urn:uuid:' + v4() });
        }
        return {
            '@context': ['https://www.w3.org/2018/credentials/v1'],
            id: 'urn:uuid:' + v4(),
            type: ['VerifiablePresentation'],
            holder: did,
            verifiableCredential,
        };
    }
    /**
     * Create a verifiable presentation with given verifiable credentials and EIP712 signature.
     *
     * ```typescript
     * verifiableCredentialsService.createVerifiablePresentation([...credentials]);
     * ```
     * @param {VerifiableCredential<RoleCredentialSubject>[]} verifiableCredential role credential parameters
     * @param {ProofOptions} options proof options
     * @returns verifiable presentation
     */
    createVerifiablePresentation(verifiableCredential, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const did = this._signerService.didHex;
            // TODO: generate types from the presentation
            const types = JSON.parse(JSON.stringify(verifiablePresentationWithCredentialEIP712Types));
            const { oneVCHasExpirationDate, allVCHaveExpirationDate } = verifiableCredential.reduce((acc, vc) => {
                const hasExpirationDate = !!vc.expirationDate;
                return {
                    oneVCHasExpirationDate: acc.oneVCHasExpirationDate || hasExpirationDate,
                    allVCHaveExpirationDate: acc.allVCHaveExpirationDate && hasExpirationDate,
                };
            }, {
                oneVCHasExpirationDate: false,
                allVCHaveExpirationDate: true,
            });
            if (oneVCHasExpirationDate && !allVCHaveExpirationDate) {
                throw new Error('Expected all Verifiable Credential to have expiration date');
            }
            const presentationTemplate = Object.assign(Object.assign({}, this.createPresentation(verifiableCredential)), { proof: {
                    '@context': 'https://w3id.org/security/suites/eip712sig-2021/v1',
                    type: 'EthereumEip712Signature2021',
                    created: new Date().toISOString(),
                    verificationMethod: (options === null || options === void 0 ? void 0 : options.verificationMethod) || did + '#controller',
                    proofPurpose: (options === null || options === void 0 ? void 0 : options.proofPurpose) || 'authentication',
                } });
            if (allVCHaveExpirationDate) {
                types.VerifiableCredential.push({
                    name: 'expirationDate',
                    type: 'string',
                });
            }
            const signature = yield this._signerService.signTypedData({}, Object.assign({}, types), presentationTemplate);
            return Object.assign(Object.assign({}, presentationTemplate), { proof: Object.assign(Object.assign({}, presentationTemplate.proof), { proofValue: signature, eip712Domain: {
                        domain: {},
                        messageSchema: types,
                        primaryType: 'VerifiablePresentation',
                    } }) });
        });
    }
    /**
     * Verify a given credential or presentation. Throws an error if the credential or presentation proof is not valid.
     *
     * ```typescript
     * await verifiableCredentialsService.verify(credential);
     * await verifiableCredentialsService.verify(presentation);
     * ```
     * @param {VerifiablePresentation | VerifiableCredential} vp verifiable presentation or credential
     * @param {ProofOptions} options proof options
     * @returns true if the proof is valid
     */
    verify(vcOrVp, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let verifyFunc;
            if (vcOrVp.type.includes(CredentialType.VerifiablePresentation)) {
                verifyFunc = this.verifyPresentation;
            }
            else if (vcOrVp.type.includes(CredentialType.VerifiableCredential)) {
                verifyFunc = this.verifyCredential;
            }
            else {
                throw new Error('Unsupported verifiable credential or presentation type');
            }
            const verifyResultsString = yield verifyFunc(JSON.stringify(vcOrVp), JSON.stringify(options || {}));
            const verifyResults = JSON.parse(verifyResultsString);
            if (verifyResults.errors.length) {
                throw new Error(`Verifiable Credential or Presentation is invalid, errors: ${verifyResults.errors.join(', ')}`);
            }
            if (vcOrVp.type.includes(CredentialType.VerifiableCredential) &&
                'expirationDate' in vcOrVp &&
                vcOrVp.expirationDate) {
                const expirationDate = new Date(vcOrVp.expirationDate).getTime();
                const currentDate = Date.now();
                if (expirationDate < currentDate) {
                    throw new Error(`Verifiable Credential is expired.`);
                }
            }
            if (vcOrVp.type.includes(CredentialType.VerifiablePresentation) &&
                'verifiableCredential' in vcOrVp &&
                vcOrVp.verifiableCredential &&
                Array.isArray(vcOrVp.verifiableCredential)) {
                const vcsVerification = yield Promise.all([
                    ...vcOrVp.verifiableCredential.map((vc) => this.verify(vc)),
                ]);
                return vcsVerification.every(Boolean);
            }
            return true;
        });
    }
    /**
     * Returns issued role verifiable credentials which matches definition.
     *
     * ```typescript
     * await verifiableCredentialsService.getCredentialsByDefinition(presentationDefinition);
     * ```
     *
     * @param presentationDefinition credential requirements
     * @returns results of matching each role verifiable credential to definition
     */
    getCredentialsByDefinition(presentationDefinition) {
        return __awaiter(this, void 0, void 0, function* () {
            const claims = yield this._cacheClient.getClaimsBySubject(this._signerService.did, {
                isAccepted: true,
            });
            const claimWithVp = (claim) => !!claim.vp;
            const vc = claims
                .filter(claimWithVp)
                .flatMap((claim) => claim.vp.verifiableCredential);
            const pex = new PEX();
            return pex.selectFrom(presentationDefinition, vc);
        });
    }
    /**
     * Create a credential with given parameters.
     *
     * ```typescript
     * await verifiableCredentialsService.createCredential({
     *     id: 'did:ethr:ewc:0x...00',
     *     namespace: 'root.energyweb.iam.ewc',
     *     version: '1',
     *     issuerFields: [],
     *     expirationDate: new Date(),
     * });
     * ```
     *
     * @param {RoleCredentialSubjectParams} params verifiable credential parameters
     * @returns Energy Web credential
     */
    createCredential(params) {
        validateRoleCredentialSubject(params);
        const credential = {
            // TODO: Host EWF VC Context and Vocabulary
            '@context': ['https://www.w3.org/2018/credentials/v1'],
            id: 'urn:uuid:' + v4(),
            type: ['VerifiableCredential', 'EWFRole'],
            issuer: this._signerService.didHex,
            issuanceDate: new Date().toISOString(),
            credentialSubject: {
                role: {
                    namespace: params.namespace,
                    version: params.version,
                },
                issuerFields: params.issuerFields
                    ? [
                        ...params.issuerFields.map((field) => (Object.assign(Object.assign({}, field), { value: field.value.toString() }))),
                    ]
                    : [],
                id: params.id,
            },
        };
        if (params.expirationDate) {
            credential.expirationDate = params.expirationDate.toISOString();
        }
        if (params.credentialStatus) {
            credential.credentialStatus = params.credentialStatus;
        }
        return credential;
    }
    /**
     * Revoke given verifiable credential with StatusList2021.
     *
     * ```typescript
     * await verifiableCredentialsService.revokeCredential(credential);
     * ```
     *
     * @param {VerifiableCredential<RoleCredentialSubject>} credential verifiable credential
     * @return StatusList2021Credential
     */
    revokeCredential(credential) {
        return __awaiter(this, void 0, void 0, function* () {
            const statusListUnsignedCredential = yield this._cacheClient.initiateCredentialStatusUpdate(credential);
            const proofOptionsObject = {
                verificationMethod: `${statusListUnsignedCredential.issuer}#controller`,
                proofPurpose: 'assertionMethod',
                eip712Domain: {
                    primaryType: 'VerifiableCredential',
                    domain: {},
                    messageSchema: statusList2021CredentialEIP712Types,
                },
            };
            const stringifyCredential = JSON.stringify(statusListUnsignedCredential);
            const preparedVC = yield this.prepareIssueCredential(stringifyCredential, JSON.stringify(proofOptionsObject), JSON.stringify(KEY_TYPE));
            const preparation = JSON.parse(preparedVC);
            const typedData = preparation.signingInput;
            if (!typedData || !typedData.primaryType) {
                throw new Error('Expected EIP-712 TypedData');
            }
            delete typedData.types['EIP712Domain'];
            const signature = yield this._signerService.signTypedData(typedData.domain, typedData.types, typedData.message);
            const signedCredential = yield this.completeIssueCredential(stringifyCredential, preparedVC, signature);
            const statusList2021Credential = JSON.parse(signedCredential);
            return yield this._cacheClient.persistCredentialStatusUpdate(statusList2021Credential);
        });
    }
    /**
     * Check if given verifiable credential is revoked.
     *
     * ```typescript
     * await verifiableCredentialsService.isRevoked(credential);
     * ```
     *
     * @param {VerifiableCredential<RoleCredentialSubject>} credential verifiable credential
     * @return true if credential is revoked
     */
    isRevoked(credential) {
        return __awaiter(this, void 0, void 0, function* () {
            const revocationDetails = yield this.revocationDetails(credential);
            return !!revocationDetails;
        });
    }
    /**
     * Get the credentials revocation details.
     *
     * ```typescript
     * await verifiableCredentialsService.revocationDetails(credential);
     * ```
     *
     * @param {VerifiableCredential<RoleCredentialSubject>} credential verifiable credential
     * @return revoker and revocationTimeStamp for the revocation
     */
    revocationDetails(credential) {
        return __awaiter(this, void 0, void 0, function* () {
            const statusListCredential = yield this._cacheClient.getStatusListCredential(credential);
            if (!statusListCredential)
                return null;
            try {
                yield this.verify(statusListCredential);
                return {
                    revoker: typeof statusListCredential.issuer === 'string'
                        ? statusListCredential.issuer
                        : statusListCredential.issuer.id,
                    timestamp: new Date(statusListCredential.issuanceDate).getTime(),
                };
            }
            catch (_a) {
                return null;
            }
        });
    }
    /**
     * We have observed that pex may have bugs when dealing with subject_is_issuer credentials
     * and when handling a presentation definition with more than one input descriptor.
     * This could be related to these issues:
     *    - https://github.com/Sphereon-Opensource/pex/issues/96
     *    - https://github.com/Sphereon-Opensource/pex/issues/91
     * We are therefore trying to simplify the input to pex so remove the possibility of it generating incorrect results.
     * Once the above issues are fixed, pex can be updated and perhaps this filtering will not needed.
     *
     * @param {InputDescriptorV1 | InputDescriptorV2} descriptors input descriptors
     * @returns filtered input descriptors
     */
    filterSelfSignDescriptors(descriptors) {
        return descriptors === null || descriptors === void 0 ? void 0 : descriptors.filter((desc) => { var _a; return !((_a = desc === null || desc === void 0 ? void 0 : desc.constraints) === null || _a === void 0 ? void 0 : _a.subject_is_issuer); });
    }
}

const getVerifiableCredentialsService = (signerService, cacheClient) => __awaiter(void 0, void 0, void 0, function* () {
    let service;
    if (executionEnvironment() === ExecutionEnvironment.NODE) {
        service = yield import('./verifiable-credentials-node.service-39ce2bd8.js').then((module) => module.VerifiableCredentialsServiceNode.create(signerService, cacheClient));
    }
    else {
        service = yield import('./verifiable-credentials-web.service-88b0636c.js').then((module) => module.VerifiableCredentialsServiceWeb.create(signerService, cacheClient));
    }
    return service;
});

function initWithPrivateKeySigner(privateKey, rpcUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        const signerService = yield fromPrivateKey(privateKey, rpcUrl);
        return init(signerService);
    });
}
function initWithKms({ bridge = defaultBridgeUrl, kmsServerUrl = defaultKmsServerUrl, } = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        return init(yield fromKms(bridge, kmsServerUrl));
    });
}
function initWithMetamask() {
    return __awaiter(this, void 0, void 0, function* () {
        return init(yield fromMetaMask());
    });
}
function initWithWalletConnect(bridge = defaultBridgeUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        return init(yield fromWalletConnectMetamask(bridge));
    });
}
function initWithGnosis(safeAppSdk) {
    return __awaiter(this, void 0, void 0, function* () {
        return init(yield fromGnosis(safeAppSdk));
    });
}
function initWithEKC(proxyUrl = defaultAzureProxyUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        const signerService = new SignerService(yield EkcSigner.create(proxyUrl), ProviderType.EKC);
        yield signerService.init();
        return init(signerService);
    });
}
/**
 * Initializes messaging service and creates initializer of cache client
 *
 * @param signerService initialized instance of signer service
 */
function init(signerService) {
    return __awaiter(this, void 0, void 0, function* () {
        const messagingService = yield MessagingService.create(signerService);
        function connectToCacheServer() {
            return __awaiter(this, void 0, void 0, function* () {
                const chainId = signerService.chainId;
                const stakingPoolFactoryAddress = chainConfigs()[chainId].stakingPoolFactoryAddress;
                const cacheClient = new CacheClient(signerService);
                yield cacheClient.init();
                yield cacheClient.login();
                const verifiableCredentialsService = yield getVerifiableCredentialsService(signerService, cacheClient);
                const domainsService = yield DomainsService.create(signerService, cacheClient);
                const stakingAddressProvided = stakingPoolFactoryAddress && stakingPoolFactoryAddress.length;
                const stakingPoolService = stakingAddressProvided
                    ? yield StakingFactoryService.create(signerService, domainsService)
                    : null;
                const assetsService = yield AssetsService.create(signerService, cacheClient);
                function connectToDidRegistry(ipfsConfig) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const didRegistry = yield DidRegistry.connect(signerService, cacheClient, assetsService, ipfsConfig);
                        const claimsService = yield ClaimsService.create(signerService, domainsService, cacheClient, didRegistry, verifiableCredentialsService);
                        return { didRegistry, claimsService };
                    });
                }
                return {
                    cacheClient,
                    domainsService,
                    assetsService,
                    connectToDidRegistry,
                    stakingPoolService,
                    verifiableCredentialsService,
                };
            });
        }
        return {
            signerService,
            messagingService,
            connectToCacheServer,
        };
    });
}

export { AssetHistoryEventType, AssetNotExist, AssetsService, AuthService, CacheClient, ChangeOwnershipNotPossibleError, ClaimEventType, ClaimsService, ConsoleLogger, DEFAULT_AUTH_STATUS_PATH, DeletingNamespaceNotPossibleError, DidRegistry, DomainsService, ENSOwnerNotValidAddressError, ENSTypeNotSupportedError, ERROR_MESSAGES, EkcSigner, ExecutionEnvironment, ILogger, IS_ETH_SIGNER, InterfaceNotSatisfied, LogLevel, MalformedDIDError, MessagingMethod, MessagingService, MethodNotAvailableInNodeEnvError, NODE_FIELDS_KEY, NamespaceType, NotAuthorizedIssuer, Order, PUBLIC_KEY, ProviderEvent, ProviderType, RegistrationTypes, SearchType, SignerService, SiweAuthTokensClient, StakeStatus, StakingFactoryService, StakingPoolService, VOLTA_CHAIN_ID, VerifiableCredentialsServiceBase, addSupportedDID, agreement_type_hash, cacheConfigs, castToV2, chainConfigs, compareDID, createWalletConnectProvider, defaultAzureProxyUrl, defaultBridgeUrl, defaultKmsServerUrl, didPattern, emptyAddress, erc712_type_hash, eternityTimestamp, executionEnvironment, fromGnosis, fromKms, fromMetaMask, fromPrivateKey, fromWalletConnectMetamask, getLogger, getMessagingConfig, getVerifiableCredentialsService, init, initWithEKC, initWithGnosis, initWithKms, initWithMetamask, initWithPrivateKeySigner, initWithWalletConnect, isClaimService, isMetamaskExtensionPresent, isRoleCredential, isValidDID, proof_type_hash, readyToBeRegisteredOnchain, setCacheConfig, setChainConfig, setLogger, setMessagingConfig, statusList2021CredentialEIP712Types, supportedDIDMethods, typedMsgPrefix, validateRoleCredentialSubject, verifiableCredentialEIP712Types, verifiablePresentationEIP712Types, verifiablePresentationWithCredentialEIP712Types };
//# sourceMappingURL=index.js.map
