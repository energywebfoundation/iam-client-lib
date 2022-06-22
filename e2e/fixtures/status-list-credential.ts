export const STATUS_LIST_CREDENTIAL = {
  id: 'http://localhost:3000/v1/status-list/urn:uuid:75563904-3c70-411a-aeda-af08aa6be4ec',
  type: ['VerifiableCredential', 'StatusList2021Credential'],
  proof: {
    type: 'EthereumEip712Signature2021',
    created: '2022-06-17T08:21:36.301Z',
    '@context': 'https://w3id.org/security/suites/eip712sig-2021/v1',
    proofValue:
      '0x97cf504db6e8683115bc36aa7264787d3c31b693d55e811c7160ba3653f5d3b0654741f1afb0cd9d1e2b168f01e261578634e4e631d8475e5a081f71b70d59451b',
    eip712Domain: {
      domain: {},
      primaryType: 'VerifiableCredential',
      messageSchema: {
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
        EIP712Domain: [],
        StatusList2021: [
          {
            name: 'id',
            type: 'string',
          },
          {
            name: 'type',
            type: 'string',
          },
          {
            name: 'statusPurpose',
            type: 'string',
          },
          {
            name: 'encodedList',
            type: 'string',
          },
        ],
        VerifiableCredential: [
          {
            name: '@context',
            type: 'string[]',
          },
          {
            name: 'id',
            type: 'string',
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
            type: 'StatusList2021',
          },
          {
            name: 'proof',
            type: 'Proof',
          },
        ],
      },
    },
    proofPurpose: 'assertionMethod',
    verificationMethod:
      'did:ethr:0x12047:0x5f757211976c68136041c439c3b3e699b3312882#controller',
  },
  issuer: 'did:ethr:0x12047:0x5f757211976c68136041c439c3b3e699b3312882',
  '@context': [
    'https://www.w3.org/2018/credentials/v1',
    'https://w3id.org/vc/status-list/2021/v1',
  ],
  issuanceDate: '2022-06-17T08:21:36.298Z',
  credentialSubject: {
    id: 'http://localhost:3000/v1/status-list/urn:uuid:75563904-3c70-411a-aeda-af08aa6be4ec',
    type: 'StatusList2021',
    encodedList: 'H4sIAAAAAAAAA2MEABvfBaUBAAAA',
    statusPurpose: 'revocation',
  },
};
