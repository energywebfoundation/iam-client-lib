export const selectResults = {
  errors: [],
  matches: [
    {
      name: 'Energy Supplier Customer Contract',
      rule: 'all',
      vc_path: ['$.verifiableCredential[0]'],
    },
  ],
  areRequiredCredentialsPresent: 'info',
  verifiableCredential: [
    {
      id: 'urn:uuid:88dbacbe-97b1-4a9d-9eff-0a72ca9d85a5',
      type: ['VerifiableCredential', 'EWFRole'],
      proof: {
        type: 'EthereumEip712Signature2021',
        created: '2022-06-01T09:13:21.022Z',
        '@context': 'https://w3id.org/security/suites/eip712sig-2021/v1',
        proofValue:
          '0xd3d66b7b310f6da0813cf5c6c9a1b59b160fe06f81701b337ce17a63b931a2cf30c67d7b4f902f19d3e75f1e3a48af5accd593c09ec6df5b2f5c289a348b4e581b',
        eip712Domain: {
          domain: {},
          primaryType: 'VerifiableCredential',
          messageSchema: {
            Proof: [
              { name: '@context', type: 'string' },
              { name: 'verificationMethod', type: 'string' },
              { name: 'created', type: 'string' },
              { name: 'proofPurpose', type: 'string' },
              { name: 'type', type: 'string' },
            ],
            EWFRole: [
              { name: 'namespace', type: 'string' },
              { name: 'version', type: 'string' },
            ],
            EIP712Domain: [],
            IssuerFields: [
              { name: 'key', type: 'string' },
              { name: 'value', type: 'string' },
            ],
            CredentialSubject: [
              { name: 'id', type: 'string' },
              { name: 'role', type: 'EWFRole' },
              { name: 'issuerFields', type: 'IssuerFields[]' },
            ],
            VerifiableCredential: [
              { name: '@context', type: 'string[]' },
              { name: 'id', type: 'string' },
              { name: 'type', type: 'string[]' },
              { name: 'issuer', type: 'string' },
              { name: 'issuanceDate', type: 'string' },
              { name: 'credentialSubject', type: 'CredentialSubject' },
              { name: 'proof', type: 'Proof' },
            ],
          },
        },
        proofPurpose: 'assertionMethod',
        verificationMethod:
          'did:ethr:0x012047:0x2670a5f431f0b444329db18b3bd07ccfe6bf4cf3#controller',
      },
      issuer: 'did:ethr:0x012047:0x2670a5f431f0b444329db18b3bd07ccfe6bf4cf3',
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      issuanceDate: '2022-06-01T09:13:21.018Z',
      credentialSubject: {
        id: 'did:ethr:volta:0x06Bdb40FE8bD203aD7Af211ba1fF67f83F09A6D1',
        role: {
          version: '1',
          namespace: 'customer.roles.rebeam.apps.eliagroup.iam.ewc',
        },
        issuerFields: [{ key: 'iscustomer', value: 'true' }],
      },
    },
  ],
  warnings: [],
};
