export enum ERROR_MESSAGES {
    SIGNER_NOT_INITIALIZED = "Signer not initialized",
    NOT_CONNECTED_TO_VOLTA = "Not connected to volta network",
    CLAIMS_NOT_INITIALIZED = "User claims not initialized",
    JWT_NOT_INITIALIZED = "JWT was not initialized",
    PROVIDER_NOT_INITIALIZED = "Provider not initialized",
    DID_DOCUMENT_NOT_INITIALIZED = "DID document not initialized",
    ENS_TYPE_NOT_SUPPORTED = "ENS type not supported",
    USER_NOT_LOGGED_IN = "User not logged in",
    NO_PROVIDER = "Initialization of singer failed due to no provider",
    PRIVATE_KEY_NOT_PROVIDED = "IAM can not be initialized in Node.js environment without private key",
    RPC_URL_NOT_PROVIDED = "IAM can not be initialized in Node.js environment without rpc url",
    NO_RPC_URL = "Rpc url needed to initialize provider in node js environment",
    CACHE_CLIENT_NOT_PROVIDED = "Cache client not provided",
    ENS_REGISTRY_NOT_INITIALIZED = "ENS registry not initialized",
    ENS_RESOLVER_NOT_INITIALIZED = "ENS resolver not initialized",
    NATS_NOT_CONNECTED = "NATS connection not established",
    WALLET_PROVIDER_NOT_SUPPORTED = "Wallet provider must be a supported value",
    WALLET_TYPE_NOT_PROVIDED = "A wallet provider type or a private key must be provided",
    ENS_REGISTRY_CONTRACT_NOT_INITIALIZED = "ENS Registry contract not initialized",
    PUBLIC_KEY_NOT_RECOVERED = "Public key not recovered",
    UNABLE_TO_OBTAIN_PUBLIC_KEY = "Enable to obtain public key",
    ORG_WITH_APPS = "You are not able to remove organization with registered apps",
    ORG_WITH_ROLES = "You are not able to remove organization with registered roles",
    APP_WITH_ROLES = "You are not able to remove application with registered roles",
    METAMASK_EXTENSION_NOT_AVAILABLE = "Selected Metamask provider but Metamask not available",
    ROLE_PREREQUISITES_NOT_MET = "Enrolment subject doesn't have required roles",
    ROLE_NOT_EXISTS = "Role you want to enroll to does not exists",
    CLAIM_PUBLISHER_NOT_REQUESTER = "Claim subject is not controlled by publisher",
    ONCHAIN_ROLE_VERSION_NOT_SPECIFIED = "On-chain role version not specified",
    CACHE_SERVER_NOT_REGISTERED = "Cache server for this chain is not registered",
    WITHDRAWAL_WAS_NOT_REQUESTED = "Stake withdrawal was not requested",
    STAKE_WAS_NOT_PUT = "Stake was not put",
    INSUFFICIENT_BALANCE = "Signer has insufficient balance",
}
