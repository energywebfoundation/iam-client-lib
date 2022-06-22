export const bloxmoveVpRequest = {
  challenge: '7d78e167-fb86-42c8-9442-e3cd44062893',
  query: [
    {
      type: 'PresentationDefinition',
      credentialQuery: [
        {
          presentationDefinition: {
            id: 'did:ethr:blxm-dev:0xE8538b4D84816Cc38D5CB4379e6b4fDf81d52d2a',
            input_descriptors: [
              {
                id: 'energy_supplier_customer_contract',
                name: 'Energy Supplier Customer Contract',
                purpose:
                  'An energy supplier contract is needed for Rebeam authorization',
                constraints: {
                  fields: [
                    {
                      path: ['$.credentialSubject.role.namespace'],
                      filter: {
                        type: 'string',
                        const: 'customer.roles.rebeam.apps.eliagroup.iam.ewc',
                      },
                    },
                  ],
                },
              },
              {
                id: 'charging_data',
                name: 'Data needs to be signed by the user',
                purpose:
                  'Data needs to be signed by the user to start the charging',
                constraints: {
                  subject_is_issuer: 'required',
                  fields: [
                    {
                      path: ['$.credentialSubject.chargingData.contractDID'],
                      filter: {
                        type: 'string',
                        const:
                          'did:ethr:blxm-dev:0xE8538b4D84816Cc38D5CB4379e6b4fDf81d52d2a',
                      },
                    },
                    {
                      path: ['$.credentialSubject.chargingData.evseId'],
                      filter: { type: 'string', const: '892' },
                    },
                    {
                      path: ['$.credentialSubject.chargingData.timeStamp'],
                      filter: {
                        type: 'string',
                        const: '2022-06-13T07:17:47.163Z',
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  ],
  interact: {
    service: [
      {
        type: 'UnmediatedHttpPresentationService2021',
        serviceEndpoint:
          'https://vc-api-dev.energyweb.org/vc-api/exchanges/did:ethr:blxm-dev:0xE8538b4D84816Cc38D5CB4379e6b4fDf81d52d2a/9df5d73c-2b54-4edf-9617-b627b1dd42f5',
      },
    ],
  },
};
