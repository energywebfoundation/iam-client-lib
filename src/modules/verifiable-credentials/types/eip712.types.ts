export const verifiableCredentialEIP712Types = {
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
