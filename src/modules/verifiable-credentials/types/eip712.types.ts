export const verifiableCredentialEIP712Types = {
  EIP712Domain: [],
  VerifiableCredential: [
    { name: '@context', type: 'string[]' },
    { name: 'id', type: 'string' },
    { name: 'type', type: 'string[]' },
    { name: 'issuer', type: 'string' },
    { name: 'issuanceDate', type: 'string' },
    { name: 'credentialSubject', type: 'CredentialSubject' },
    { name: 'credentialStatus', type: 'CredentialStatus' },
    { name: 'proof', type: 'Proof' },
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
  CredentialStatus: [
    { name: 'id', type: 'string' },
    { name: 'type', type: 'string' },
    { name: 'chainId', type: 'string' },
    { name: 'contractAddress', type: 'address' },
  ],
  Proof: [
    { name: '@context', type: 'string' },
    { name: 'verificationMethod', type: 'string' },
    { name: 'created', type: 'string' },
    { name: 'proofPurpose', type: 'string' },
    { name: 'type', type: 'string' },
  ],
};

export const verifiablePresentationEIP712Types = {
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

export const verifiablePresentationWithCredentialEIP712Types = {
  VC712DomainTypedDataField: [
    { name: 'name', type: 'string' },
    { name: 'type', type: 'string' },
  ],
  VC712DomainData: [],
  VC712DomainSchema: [
    { name: 'CredentialSubject', type: 'VC712DomainTypedDataField[]' },
    { name: 'EIP712Domain', type: 'VC712DomainTypedDataField[]' },
    { name: 'EWFRole', type: 'VC712DomainTypedDataField[]' },
    { name: 'IssuerFields', type: 'VC712DomainTypedDataField[]' },
    { name: 'Proof', type: 'VC712DomainTypedDataField[]' },
    { name: 'VerifiableCredential', type: 'VC712DomainTypedDataField[]' },
    { name: 'CredentialStatus', type: 'VC712DomainTypedDataField[]' },
  ],
  VC712Domain: [
    { name: 'domain', type: 'VC712DomainData' },
    { name: 'messageSchema', type: 'VC712DomainSchema' },
    { name: 'primaryType', type: 'string' },
  ],
  EWFRole: verifiableCredentialEIP712Types.EWFRole,
  IssuerFields: verifiableCredentialEIP712Types.IssuerFields,
  CredentialSubject: verifiableCredentialEIP712Types.CredentialSubject,
  CredentialStatus: verifiableCredentialEIP712Types.CredentialStatus,
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
    { type: 'CredentialStatus', name: 'credentialStatus' },
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
