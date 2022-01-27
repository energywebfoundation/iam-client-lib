import { addressOf } from '@ew-did-registry/did-ethr-resolver';
import { utils } from 'ethers';

const { defaultAbiCoder, solidityKeccak256, namehash, id, arrayify, verifyMessage  } = utils;

export const typedMsgPrefix = '1901';
export const erc712_type_hash = utils.id(
  'EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)'
);
export const agreement_type_hash = utils.id(
  'Agreement(address subject,bytes32 role,uint256 version)'
);
export const proof_type_hash = utils.id(
  'Proof(address subject,bytes32 role,uint256 version,uint256 expiry,address issuer)'
);

/**
 * 
 * @param request 
 * @param chainId 
 * @returns 
 */
export function typedClaimRequestHash(
  request: {
    role: string;
    version: number;
    expiry: number;
    subject: string;
    issuer: string;
    claimManager: string;
  },
  chainId: number
) {
  const messageId = Buffer.from(typedMsgPrefix, 'hex');
  const domainSeparator = utils.keccak256(
    defaultAbiCoder.encode(
      ['bytes32', 'bytes32', 'bytes32', 'uint256', 'address'],
      [erc712_type_hash, id('Claim Manager'), id('1.0'), chainId, request.claimManager]
    )
  );

  return solidityKeccak256(
    ['bytes', 'bytes32', 'bytes32'],
    [
      messageId,
      domainSeparator,
      utils.keccak256(
        defaultAbiCoder.encode(
          ['bytes32', 'address', 'bytes32', 'uint', 'uint', 'address'],
          [
            proof_type_hash,
            addressOf(request.subject),
            namehash(request.role),
            request.version,
            request.expiry,
            addressOf(request.issuer),
          ]
        )
      ),
    ]
  );
}

export function recoverOnChainProofSigner(
  proof: string,
  request: {
    role: string;
    version: number;
    expiry: number;
    subject: string;
    issuer: string;
    claimManager: string;
  },
  chainId: number
) {
  return verifyMessage(arrayify(typedClaimRequestHash(request, chainId)), proof);
}
