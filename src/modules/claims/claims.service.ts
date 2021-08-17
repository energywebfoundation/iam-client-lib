import { IRoleDefinition, PreconditionType } from "@energyweb/iam-contracts";
import { addressOf } from "@ew-did-registry/did-ethr-resolver";
import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { LazyModuleLoader } from "@nestjs/core";
import { utils } from "ethers";
import { ERROR_MESSAGES } from "../../errors";
import { erc712_type_hash, proof_type_hash, typedMsgPrefix } from "../../utils/constants";
import { canonizeSig } from "../../utils/enrollment";
import { CacheClientModule } from "../cacheClient/cacheClient.module";
import { CacheClient, CacheServerClientOptions } from "../cacheClient/cacheClient.service";
import { RegistrationTypes } from "../cacheClient/cacheClient.types";
import { DomainsService, ENSNamespaceTypes } from "../domains/domains.service";
import { SignerService } from "../signer/signer.service";

const { id, keccak256, defaultAbiCoder, solidityKeccak256, namehash, arrayify } = utils;

@Injectable()
export class ClaimsService implements OnModuleInit {
    private chainId: number;

    constructor(
        private signerService: SignerService,
        private domainsService: DomainsService,
        private cacheClient: CacheClient,
    ) {}

    async onModuleInit() {
        this.chainId = (await this.signerService.signer.provider.getNetwork()).chainId;
    }

    private async verifyEnrolmentPrerequisites({ subject, role }: { subject: string; role: string }) {
        const roleDefinition = await this.domainsService.getDefinition({
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
        for (const role in requiredRoles) {
            if (!enroledRoles.has(role)) {
                throw new Error(ERROR_MESSAGES.ROLE_PREREQUISITES_NOT_MET);
            }
        }
    }

    async getClaimsBySubjects(subjects: string[]) {
        return this.cacheClient.getClaimsBySubjects(subjects);
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
        return this.cacheClient.getClaimsByRequester({ did, isAccepted, namespace });
    }

    /**
     * @description - Returns claims for given issuer. Allows filtering by status and parent namespace
     */
    async getClaimsByIssuer({ did, isAccepted, namespace }: { did: string; isAccepted?: boolean; namespace?: string }) {
        return this.cacheClient.getClaimsByIssuer({ did, isAccepted, namespace });
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
        return this.cacheClient.getClaimsBySubject({ did, isAccepted, namespace });
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

        const domainSeparator = keccak256(
            defaultAbiCoder.encode(
                ["bytes32", "bytes32", "bytes32", "uint256", "address"],
                [erc712_type_hash, id("Claim Manager"), id("1.0"), this.chainId, this.claimManager.address],
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

        return canonizeSig(await this.signerService.signer.signMessage(arrayify(agreementHash)));
    }

    private async createOnChainProof(role: string, version: number, expiry: number, subject: string): Promise<string> {
        const messageId = Buffer.from(typedMsgPrefix, "hex");

        const domainSeparator = utils.keccak256(
            defaultAbiCoder.encode(
                ["bytes32", "bytes32", "bytes32", "uint256", "address"],
                [erc712_type_hash, utils.id("Claim Manager"), utils.id("1.0"), this.chainId, this.claimManager.address],
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
                        [proof_type_hash, addressOf(subject), namehash(role), version, expiry, this.address],
                    ),
                ),
            ],
        );

        return canonizeSig(await this.signer.signMessage(arrayify(proofHash)));
    }

    async createClaimRequest({
        claim,
        subject,
        registrationTypes = [RegistrationTypes.OffChain],
    }: {
        claim: { claimType: string; claimTypeVersion: number; fields: { key: string; value: string | number }[] };
        subject?: string;
        registrationTypes?: RegistrationTypes[];
    }) {
        if (!subject) {
            subject = this.address;
        }

        const { claimType: role, claimTypeVersion: version } = claim;
        const token = await this.createPublicClaim({ data: claim, subject });

        await this.verifyEnrolmentPrerequisites({ subject, role });

        // temporarily, until claimIssuer is not removed from Claim entity
        const issuer = [`did:${Methods.Erc1056}:${emptyAddress}`];

        const message: IClaimRequest = {
            id: uuid(),
            token,
            claimIssuer: issuer,
            requester: this._did,
            registrationTypes,
        };

        if (registrationTypes.includes(RegistrationTypes.OnChain)) {
            if (!version) {
                throw new Error(ERROR_MESSAGES.ONCHAIN_ROLE_VERSION_NOT_SPECIFIED);
            }
            message.subjectAgreement = await this.approveRolePublishing({ subject, role, version });
        }

        if (this._natsConnection) {
            issuer.map((issuerDID) =>
                this._natsConnection?.publish(`${issuerDID}.${NATS_EXCHANGE_TOPIC}`, this._jsonCodec?.encode(message)),
            );
        } else if (this._cacheClient) {
            await this._cacheClient.requestClaim({ did: subject, message });
        } else {
            throw new NATSConnectionNotEstablishedError();
        }
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
        if (!this._did) {
            throw new Error(ERROR_MESSAGES.USER_NOT_LOGGED_IN);
        }
        if (!this._jwt) {
            throw new Error(ERROR_MESSAGES.JWT_NOT_INITIALIZED);
        }
        if (!this._signer) {
            throw new Error(ERROR_MESSAGES.SIGNER_NOT_INITIALIZED);
        }

        const { claimData, sub } = this._jwt.decode(token) as {
            claimData: { claimType: string; claimTypeVersion: number; expiry: number };
            sub: string;
        };

        await this.verifyEnrolmentPrerequisites({ subject: sub, role: claimData.claimType });

        const message: IClaimIssuance = {
            id,
            requester,
            claimIssuer: [this._did],
            acceptedBy: this._did,
        };
        if (registrationTypes.includes(RegistrationTypes.OffChain)) {
            const publicClaim: IPublicClaim = {
                did: sub,
                signer: this._did,
                claimData,
            };
            message.issuedToken = await this.issuePublicClaim({
                publicClaim,
            });
        }
        if (registrationTypes.includes(RegistrationTypes.OnChain)) {
            const { claimType: role, claimTypeVersion: version } = claimData;
            const expiry = claimData.expiry === undefined ? defaultClaimExpiry : claimData.expiry;
            const onChainProof = await this.createOnChainProof(role, version, expiry, sub);
            await (
                await this._claimManager.register(
                    addressOf(sub),
                    namehash(role),
                    version,
                    expiry,
                    addressOf(this._did),
                    subjectAgreement,
                    onChainProof,
                )
            ).wait();
            message.onChainProof = onChainProof;
        }

        if (this._natsConnection) {
            const dataToSend = this._jsonCodec?.encode(message);
            this._natsConnection.publish(`${requester}.${NATS_EXCHANGE_TOPIC}`, dataToSend);
        } else if (this._cacheClient) {
            return this._cacheClient.issueClaim({ did: this._did, message });
        } else {
            throw new NATSConnectionNotEstablishedError();
        }
    }

    async rejectClaimRequest({ id, requesterDID }: { id: string; requesterDID: string }) {
        if (!this._did) {
            throw new Error(ERROR_MESSAGES.USER_NOT_LOGGED_IN);
        }

        const preparedData: IClaimRejection = {
            id,
            requester: requesterDID,
            claimIssuer: [this._did],
            isRejected: true,
        };

        if (!this._natsConnection) {
            if (this._cacheClient) {
                return this._cacheClient.rejectClaim({ did: this._did, message: preparedData });
            }
            throw new NATSConnectionNotEstablishedError();
        }

        const dataToSend = this._jsonCodec?.encode(preparedData);
        this._natsConnection.publish(`${requesterDID}.${NATS_EXCHANGE_TOPIC}`, dataToSend);
    }

    async deleteClaim({ id }: { id: string }) {
        if (this._cacheClient) {
            await this._cacheClient.deleteClaim({ claimId: id });
        } else {
            throw new CacheClientNotProvidedError();
        }
    }

    async registrationTypesOfRoles(roles: string[]): Promise<Record<string, Set<RegistrationTypes>>> {
        const types: Record<string, Set<RegistrationTypes>> = roles.reduce(
            (acc, role) => ({ ...acc, [role]: new Set() }),
            {},
        );
        for await (const role of roles) {
            const def = await this.getDefinition({ type: ENSNamespaceTypes.Roles, namespace: role });
            if (!DomainReader.isRoleDefinition(def)) {
                continue;
            }
            const resolver = await this._ensRegistry.resolver(namehash(role));
            const { chainId } = await this._provider.getNetwork();
            const { ensResolverAddress, ensPublicResolverAddress } = chainConfigs[chainId];
            if (resolver === ensResolverAddress) {
                types[role].add(RegistrationTypes.OnChain);
                types[role].add(RegistrationTypes.OffChain);
            } else if (resolver === ensPublicResolverAddress) {
                types[role].add(RegistrationTypes.OffChain);
            }
        }
        return types;
    }

    /**
     * createPublicClaim
     *
     * @description create a public claim based on data provided
     * @returns JWT token of created claim
     *
     */
    async createPublicClaim({ data, subject }: { data: ClaimData; subject?: string }) {
        if (this._userClaims) {
            if (subject) {
                return this._userClaims.createPublicClaim(data, { subject, issuer: "" });
            }
            return this._userClaims.createPublicClaim(data);
        }
        throw new Error(ERROR_MESSAGES.CLAIMS_NOT_INITIALIZED);
    }

    private async getClaimId({ claimData }: { claimData: ClaimData }) {
        const { service = [] } = await this.getDidDocument();
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
        return uuid();
    }

    /**
     * publishPublicClaim
     *
     * @description store claim data in ipfs and save url to DID document services
     * @returns ulr to ipfs
     *
     */
    async publishPublicClaim({ token }: { token: string }) {
        if (!this._did) {
            throw new Error(ERROR_MESSAGES.USER_NOT_LOGGED_IN);
        }
        if (!this._didSigner) {
            throw new Error(ERROR_MESSAGES.SIGNER_NOT_INITIALIZED);
        }
        if (!this._userClaims) {
            throw new Error(ERROR_MESSAGES.CLAIMS_NOT_INITIALIZED);
        }
        if (!this._document) {
            throw new Error(ERROR_MESSAGES.DID_DOCUMENT_NOT_INITIALIZED);
        }

        const payload = (await this.decodeJWTToken({ token })) as {
            iss: string;
            sub: string;
            claimData: ClaimData;
        };
        const { iss, claimData } = payload;
        let sub = payload.sub;
        // Initial claim design assumed that role subject is requester because of which
        // sub filed was ignored
        if (!sub || sub.length === 0 || !isValidDID(sub)) {
            sub = this._did;
        }

        if (!(await this._userClaims.verifySignature(token, iss))) {
            throw new Error("Incorrect signature");
        }

        let document: DIDDocumentFull;
        if (sub === this._did) {
            document = this._document;
        } else if ((await this.getOwnedAssets({})).find((a) => a.document.id === sub)) {
            const operator = new ProxyOperator(this._didSigner, this._registrySetting, addressOf(sub));
            document = new DIDDocumentFull(sub, operator);
        } else {
            throw new Error(ERROR_MESSAGES.CLAIM_PUBLISHER_NOT_REQUESTER);
        }

        const url = await this._ipfsStore.save(token);
        const claimId = await this.getClaimId({ claimData });
        await document.update(DIDAttribute.ServicePoint, {
            type: DIDAttribute.ServicePoint,
            value: {
                id: claimId,
                serviceEndpoint: url,
                hash: hashes.SHA256(token),
                hashAlg: "SHA256",
            },
        });

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
        if (this._userClaims) {
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
            return this._userClaims?.createProofClaim(claimUrl, encryptedSaltedFields);
        }
        throw new Error(ERROR_MESSAGES.CLAIMS_NOT_INITIALIZED);
    }

    /**
     * issuePublicClaim
     *
     * @description issue a public claim
     * @returns return issued token
     *
     */
    async issuePublicClaim({ token, publicClaim }: { token?: string; publicClaim?: IPublicClaim }) {
        if (this._issuerClaims) {
            if (publicClaim) {
                return this._issuerClaims.issuePublicClaim(publicClaim);
            }
            if (token) {
                return this._issuerClaims.issuePublicClaim(token);
            }
            throw new Error("unable to issue Public Claim");
        }
        throw new Error(ERROR_MESSAGES.CLAIMS_NOT_INITIALIZED);
    }

    /**
     * verifyPublicClaim
     *
     * @description verifies issued token of claim
     * @returns public claim data
     *
     */
    async verifyPublicClaim({ issuedToken }: { issuedToken: string }) {
        if (this._verifierClaims) {
            return this._verifierClaims.verifyPublicProof(issuedToken);
        }
        throw new Error(ERROR_MESSAGES.CLAIMS_NOT_INITIALIZED);
    }

    /**
     * createSelfSignedClaim
     *
     * @description creates self signed claim and upload the data to ipfs
     *
     */
    async createSelfSignedClaim({ data, subject }: { data: ClaimData; subject?: string }) {
        if (this._userClaims) {
            const token = await this.createPublicClaim({ data, subject });
            return this.publishPublicClaim({ token });
        }
        throw new Error(ERROR_MESSAGES.CLAIMS_NOT_INITIALIZED);
    }

    /**
     * getUserClaims
     *
     * @description get user claims
     *
     */
    async getUserClaims({ did = this.did }: { did?: string } | undefined = {}) {
        const { service } = (await this.getDidDocument({ did })) || {};
        return service;
    }
}
