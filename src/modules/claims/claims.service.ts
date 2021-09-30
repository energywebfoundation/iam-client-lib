import { utils } from "ethers";
import { v4 } from "uuid";
import { JSONCodec } from "nats.ws";
import { IRoleDefinition, PreconditionType } from "@energyweb/iam-contracts";
import { Methods } from "@ew-did-registry/did";
import { addressOf } from "@ew-did-registry/did-ethr-resolver";
import { hashes, IProofData, IPublicClaim, ISaltedFields } from "@ew-did-registry/claims";
import { DIDAttribute } from "@ew-did-registry/did-resolver-interface";
import { ClaimManager } from "../../../ethers/ClaimManager";
import { ClaimManager__factory } from "../../../ethers/factories/ClaimManager__factory";
import { ERROR_MESSAGES } from "../../errors";
import { emptyAddress } from "../../utils/constants";
import { canonizeSig } from "../../utils/enrollment";
import { CacheClient } from "../cacheClient/cacheClient.service";
import { DomainsService } from "../domains/domains.service";
import { ENSNamespaceTypes } from "../domains/domains.types";
import { SignerService } from "../signer/signer.service";
import { chainConfigs } from "../../config/chain.config";
import {
    IClaimIssuance,
    IClaimRejection,
    IClaimRequest,
    RegistrationTypes,
    defaultClaimExpiry,
    erc712_type_hash,
    proof_type_hash,
    typedMsgPrefix,
} from "./claims.types";
import { DidRegistry } from "../didRegistry/didRegistry.service";
import { ClaimData } from "../didRegistry/did.types";
import { MessagingService } from "../messaging/messaging.service";
import { NATS_EXCHANGE_TOPIC } from "../messaging/messaging.types";
import { isValidDID } from "../../utils/did";

const { id, keccak256, defaultAbiCoder, solidityKeccak256, namehash, arrayify } = utils;

export class ClaimsService {
    private _claimManager: ClaimManager;
    private _jsonCodec = JSONCodec();

    constructor(
        private _signerService: SignerService,
        private _domainsService: DomainsService,
        private _cacheClient: CacheClient,
        private _didRegistry: DidRegistry,
        private _messagingService: MessagingService,
    ) {
        this._signerService.onInit(async () => this.init());
    }

    static async create(
        signerService: SignerService,
        domainsService: DomainsService,
        cacheClient: CacheClient,
        didRegistry: DidRegistry,
        messagingService: MessagingService,
    ) {
        const service = new ClaimsService(signerService, domainsService, cacheClient, didRegistry, messagingService);
        await service.init();
        return service;
    }

    async init() {
        const chainId = this._signerService.chainId;
        const { claimManagerAddress } = chainConfigs()[chainId];
        this._claimManager = new ClaimManager__factory().attach(claimManagerAddress);
    }

    async getClaimsBySubjects(subjects: string[]) {
        return this._cacheClient.getClaimsBySubjects(subjects);
    }

    /**
     * @description - Returns claims for given requester. Allows filtering by status and parent namespace
     */
    async getClaimsByRequester({
        did,
        isAccepted,
        namespace,
    }: {
        did: string;
        isAccepted?: boolean;
        namespace?: string;
    }) {
        return this._cacheClient.getClaimsByRequester({ did, isAccepted, namespace });
    }

    /**
     * @description - Returns claims for given issuer. Allows filtering by status and parent namespace
     */
    async getClaimsByIssuer({ did, isAccepted, namespace }: { did: string; isAccepted?: boolean; namespace?: string }) {
        return this._cacheClient.getClaimsByIssuer({ did, isAccepted, namespace });
    }

    /**
     * @description - Returns claims for given subject. Allows filtering by status and parent namespace
     */
    async getClaimsBySubject({
        did,
        isAccepted,
        namespace,
    }: {
        did: string;
        isAccepted?: boolean;
        namespace?: string;
    }) {
        return this._cacheClient.getClaimsBySubject({ did, isAccepted, namespace });
    }

    async createClaimRequest({
        claim,
        subject = this._didRegistry.did,
        registrationTypes = [RegistrationTypes.OffChain],
    }: {
        claim: { claimType: string; claimTypeVersion: number; fields: { key: string; value: string | number }[] };
        subject?: string;
        registrationTypes?: RegistrationTypes[];
    }) {
        const { claimType: role, claimTypeVersion: version } = claim;
        const token = await this.createPublicClaim({ data: claim, subject });

        await this.verifyEnrolmentPrerequisites({ subject, role });

        // temporarily, until claimIssuer is not removed from Claim entity
        const issuer = [`did:${Methods.Erc1056}:${emptyAddress}`];

        const message: IClaimRequest = {
            id: v4(),
            token,
            claimIssuer: issuer,
            requester: this._didRegistry.did,
            registrationTypes,
        };

        if (registrationTypes.includes(RegistrationTypes.OnChain)) {
            if (!version) {
                throw new Error(ERROR_MESSAGES.ONCHAIN_ROLE_VERSION_NOT_SPECIFIED);
            }
            message.subjectAgreement = await this.approveRolePublishing({ subject, role, version });
        }

        issuer.map((issuerDID) =>
            this._messagingService.publish(`${issuerDID}.${NATS_EXCHANGE_TOPIC}`, this._jsonCodec.encode(message)),
        );
    }

    async issueClaimRequest({
        requester,
        token,
        id,
        subjectAgreement,
        registrationTypes,
    }: {
        requester: string;
        token: string;
        id: string;
        subjectAgreement: string;
        registrationTypes: RegistrationTypes[];
    }) {
        const { claimData, sub } = this._didRegistry.jwt.decode(token) as {
            claimData: { claimType: string; claimTypeVersion: number; expiry: number };
            sub: string;
        };

        await this.verifyEnrolmentPrerequisites({ subject: sub, role: claimData.claimType });

        const message: IClaimIssuance = {
            id,
            requester,
            claimIssuer: [this._didRegistry.did],
            acceptedBy: this._didRegistry.did,
        };
        if (registrationTypes.includes(RegistrationTypes.OffChain)) {
            const publicClaim: IPublicClaim = {
                did: sub,
                signer: this._didRegistry.did,
                claimData,
            };
            message.issuedToken = await this._didRegistry.issuePublicClaim({
                publicClaim,
            });
        }
        if (registrationTypes.includes(RegistrationTypes.OnChain)) {
            const { claimType: role, claimTypeVersion: version } = claimData;
            const expiry = claimData.expiry === undefined ? defaultClaimExpiry : claimData.expiry;
            const onChainProof = await this.createOnChainProof(role, version, expiry, sub);
            const data = this._claimManager.interface.encodeFunctionData("register", [
                addressOf(sub),
                namehash(role),
                version,
                expiry,
                addressOf(this._didRegistry.did),
                subjectAgreement,
                onChainProof,
            ]);
            await this._signerService.send({
                to: this._claimManager.address,
                data,
            });
            message.onChainProof = onChainProof;
        }

        const dataToSend = this._jsonCodec?.encode(message);
        this._messagingService.publish(`${requester}.${NATS_EXCHANGE_TOPIC}`, dataToSend);
    }

    async rejectClaimRequest({ id, requesterDID }: { id: string; requesterDID: string }) {
        const preparedData: IClaimRejection = {
            id,
            requester: requesterDID,
            claimIssuer: [this._didRegistry.did],
            isRejected: true,
        };

        const dataToSend = this._jsonCodec?.encode(preparedData);
        this._messagingService.publish(`${requesterDID}.${NATS_EXCHANGE_TOPIC}`, dataToSend);
    }

    async deleteClaim({ id }: { id: string }) {
        await this._cacheClient.deleteClaim({ claimId: id });
    }

    /**
     * createPublicClaim
     *
     * @description create a public claim based on data provided
     * @returns JWT token of created claim
     *
     */
    async createPublicClaim({ data, subject }: { data: ClaimData; subject?: string }) {
        return this._didRegistry.createPublicClaim({ data, subject });
    }

    async getClaimId({ claimData }: { claimData: ClaimData }) {
        const { service = [] } = await this._didRegistry.getDidDocument();
        const { id, claimTypeVersion } =
            service.find(
                ({ profile, claimType, claimTypeVersion }) =>
                    Boolean(profile) ||
                    (claimType === claimData.claimType && claimTypeVersion === claimData.claimTypeVersion),
            ) || {};

        if (claimData.profile && id) {
            return id;
        }

        if (claimData.claimType && id && claimData.claimTypeVersion === claimTypeVersion) {
            return id;
        }
        return v4();
    }

    /**
     * publishPublicClaim
     *
     * @description store claim data in ipfs and save url to DID document services
     * @returns ulr to ipfs
     *
     */
    async publishPublicClaim({ token }: { token: string }) {
        const payload = (await this._didRegistry.decodeJWTToken({ token })) as {
            iss: string;
            sub: string;
            claimData: ClaimData;
        };
        const { iss, claimData } = payload;
        let sub = payload.sub;
        // Initialy subject was ignored because it was requester
        if (!sub || sub.length === 0 || !isValidDID(sub)) {
            sub = this._didRegistry.did;
        }

        if (!(await this._didRegistry.verifyPublicClaim(token, iss))) {
            throw new Error("Incorrect signature");
        }

        const url = await this._didRegistry.ipfsStore.save(token);
        const data = {
            type: DIDAttribute.ServicePoint,
            value: {
                id: await this.getClaimId({ claimData }),
                serviceEndpoint: url,
                hash: hashes.SHA256(token),
                hashAlg: "SHA256",
            },
        };
        await this._didRegistry.updateDocument({ didAttribute: DIDAttribute.ServicePoint, data, did: sub });

        return url;
    }

    /**
     * createProofClaim
     *
     * @description creates a proof of a claim
     * @returns proof token
     *
     */
    async createProofClaim({ claimUrl, saltedFields }: { claimUrl: string; saltedFields: ISaltedFields }) {
        const encryptedSaltedFields: IProofData = {};
        let counter = 0;
        Object.entries(saltedFields).forEach(([key, value]) => {
            if (counter % 2 === 0) {
                encryptedSaltedFields[key] = {
                    value,
                    encrypted: true,
                };
            } else {
                encryptedSaltedFields[key] = {
                    value,
                    encrypted: false,
                };
            }
            counter++;
        });
        return this._didRegistry.createProofClaim({ claimUrl, encryptedSaltedFields });
    }

    /**
     * createSelfSignedClaim
     *
     * @description creates self signed claim and upload the data to ipfs
     *
     */
    async createSelfSignedClaim({ data, subject }: { data: ClaimData; subject?: string }) {
        const token = await this.createPublicClaim({ data, subject });
        return this.publishPublicClaim({ token });
    }

    /**
     * getUserClaims
     *
     * @description get user claims
     *
     */
    async getUserClaims({ did = this._didRegistry.did }: { did?: string } | undefined = {}) {
        const { service } = (await this._didRegistry.getDidDocument({ did })) || {};
        return service;
    }

    private async verifyEnrolmentPrerequisites({ subject, role }: { subject: string; role: string }) {
        const roleDefinition = await this._domainsService.getDefinition({
            type: ENSNamespaceTypes.Roles,
            namespace: role,
        });

        if (!roleDefinition) {
            throw new Error(ERROR_MESSAGES.ROLE_NOT_EXISTS);
        }

        const { enrolmentPreconditions } = roleDefinition as IRoleDefinition;

        if (!enrolmentPreconditions || enrolmentPreconditions.length === 0) return;

        const enroledRoles = new Set(
            (await this.getClaimsBySubject({ did: subject, isAccepted: true })).map(({ claimType }) => claimType),
        );
        const requiredRoles = new Set(
            enrolmentPreconditions
                .filter(({ type }) => type === PreconditionType.Role)
                .map(({ conditions }) => conditions)
                .reduce((all, cur) => all.concat(cur), []),
        );
        if (Array.from(requiredRoles).some((role) => !enroledRoles.has(role))) {
            throw new Error(ERROR_MESSAGES.ROLE_PREREQUISITES_NOT_MET);
        }
    }

    private async createOnChainProof(role: string, version: number, expiry: number, subject: string): Promise<string> {
        const messageId = Buffer.from(typedMsgPrefix, "hex");

        const chainId = await this._signerService.chainId;
        const domainSeparator = utils.keccak256(
            defaultAbiCoder.encode(
                ["bytes32", "bytes32", "bytes32", "uint256", "address"],
                [erc712_type_hash, utils.id("Claim Manager"), utils.id("1.0"), chainId, this._claimManager.address],
            ),
        );

        const proofHash = solidityKeccak256(
            ["bytes", "bytes32", "bytes32"],
            [
                messageId,
                domainSeparator,
                utils.keccak256(
                    defaultAbiCoder.encode(
                        ["bytes32", "address", "bytes32", "uint", "uint", "address"],
                        [
                            proof_type_hash,
                            addressOf(subject),
                            namehash(role),
                            version,
                            expiry,
                            this._signerService.address,
                        ],
                    ),
                ),
            ],
        );

        return canonizeSig(await this._signerService.signMessage(arrayify(proofHash)));
    }

    private async approveRolePublishing({
        subject,
        role,
        version,
    }: {
        subject: string;
        role: string;
        version: number;
    }) {
        const erc712_type_hash = id(
            "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)",
        );
        const agreement_type_hash = id("Agreement(address subject,bytes32 role,uint256 version)");

        const chainId = await this._signerService.chainId;
        const domainSeparator = keccak256(
            defaultAbiCoder.encode(
                ["bytes32", "bytes32", "bytes32", "uint256", "address"],
                [erc712_type_hash, id("Claim Manager"), id("1.0"), chainId, this._claimManager.address],
            ),
        );

        const messageId = Buffer.from(typedMsgPrefix, "hex");

        const agreementHash = solidityKeccak256(
            ["bytes", "bytes32", "bytes32"],
            [
                messageId,
                domainSeparator,
                keccak256(
                    defaultAbiCoder.encode(
                        ["bytes32", "address", "bytes32", "uint256"],
                        [agreement_type_hash, addressOf(subject), namehash(role), version],
                    ),
                ),
            ],
        );

        return canonizeSig(await this._signerService.signer.signMessage(arrayify(agreementHash)));
    }
}
