// Source: https://github.com/spruceid/ssi/blob/3745b7dfdd18e1b27c6135f8036470efde596f35/did-pkh/tests/vc-eth-eip712sig.jsonld

export const validExampleExternalVC = {
  '@context': ['https://www.w3.org/2018/credentials/v1'],
  type: ['VerifiableCredential'],
  credentialSubject: {
    id: 'did:example:foo',
  },
  issuer: 'did:pkh:eth:0x2fbf1be19d90a29aea9363f4ef0b6bf1c4ff0758',
  issuanceDate: '2021-03-18T16:38:25Z',
  proof: {
    '@context': 'https://demo.spruceid.com/ld/eip712sig-2021/v0.1.jsonld',
    type: 'EthereumEip712Signature2021',
    proofPurpose: 'assertionMethod',
    proofValue:
      '0x9abee96d684a146aa0b30498d8799ee9a4f8f54488c73d4a4fba3a6fb94eca8764af54f15a24deba0dd9ee2f460d1f6bd174a4ca7504a72d6b1fe9b739d613fe1b',
    verificationMethod:
      'did:pkh:eth:0x2fbf1be19d90a29aea9363f4ef0b6bf1c4ff0758#Recovery2020',
    created: '2021-06-17T17:16:39.791Z',
    eip712Domain: {
      domain: {
        name: 'EthereumEip712Signature2021',
      },
      messageSchema: {
        CredentialSubject: [
          {
            name: 'id',
            type: 'string',
          },
        ],
        EIP712Domain: [
          {
            name: 'name',
            type: 'string',
          },
        ],
        Proof: [
          {
            name: '@context',
            type: 'string',
          },
          {
            name: 'verificationMethod',
            type: 'string',
          },
          {
            name: 'created',
            type: 'string',
          },
          {
            name: 'proofPurpose',
            type: 'string',
          },
          {
            name: 'type',
            type: 'string',
          },
        ],
        VerifiableCredential: [
          {
            name: '@context',
            type: 'string[]',
          },
          {
            name: 'type',
            type: 'string[]',
          },
          {
            name: 'issuer',
            type: 'string',
          },
          {
            name: 'issuanceDate',
            type: 'string',
          },
          {
            name: 'credentialSubject',
            type: 'CredentialSubject',
          },
          {
            name: 'proof',
            type: 'Proof',
          },
        ],
      },
      primaryType: 'VerifiableCredential',
    },
  },
};

export const exampleExternalVCWithInvalidSubjectId = {
  '@context': ['https://www.w3.org/2018/credentials/v1'],
  type: ['VerifiableCredential'],
  credentialSubject: {
    id: 'did:example:wrong',
  },
  issuer: 'did:pkh:eth:0x2fbf1be19d90a29aea9363f4ef0b6bf1c4ff0758',
  issuanceDate: '2021-03-18T16:38:25Z',
  proof: {
    '@context': 'https://demo.spruceid.com/ld/eip712sig-2021/v0.1.jsonld',
    type: 'EthereumEip712Signature2021',
    proofPurpose: 'assertionMethod',
    proofValue:
      '0x9abee96d684a146aa0b30498d8799ee9a4f8f54488c73d4a4fba3a6fb94eca8764af54f15a24deba0dd9ee2f460d1f6bd174a4ca7504a72d6b1fe9b739d613fe1b',
    verificationMethod:
      'did:pkh:eth:0x2fbf1be19d90a29aea9363f4ef0b6bf1c4ff0758#Recovery2020',
    created: '2021-06-17T17:16:39.791Z',
    eip712Domain: {
      domain: {
        name: 'EthereumEip712Signature2021',
      },
      messageSchema: {
        CredentialSubject: [
          {
            name: 'id',
            type: 'string',
          },
        ],
        EIP712Domain: [
          {
            name: 'name',
            type: 'string',
          },
        ],
        Proof: [
          {
            name: '@context',
            type: 'string',
          },
          {
            name: 'verificationMethod',
            type: 'string',
          },
          {
            name: 'created',
            type: 'string',
          },
          {
            name: 'proofPurpose',
            type: 'string',
          },
          {
            name: 'type',
            type: 'string',
          },
        ],
        VerifiableCredential: [
          {
            name: '@context',
            type: 'string[]',
          },
          {
            name: 'type',
            type: 'string[]',
          },
          {
            name: 'issuer',
            type: 'string',
          },
          {
            name: 'issuanceDate',
            type: 'string',
          },
          {
            name: 'credentialSubject',
            type: 'CredentialSubject',
          },
          {
            name: 'proof',
            type: 'Proof',
          },
        ],
      },
      primaryType: 'VerifiableCredential',
    },
  },
};
