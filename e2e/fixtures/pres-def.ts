export const presentationDefinition = {
  id: 'did:ethr:blxm-dev:0xCacb1C56Bd397e0bA48306926EFdD97026ce4bcd',
  input_descriptors: [
    {
      id: 'energy_supplier_customer_contract',
      name: 'Energy Supplier Customer Contract',
      purpose: 'An energy supplier contract is needed for Rebeam authorization',
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
      purpose: 'Data needs to be signed by the user to start the charging',
      constraints: {
        subject_is_issuer: 'required',
        fields: [
          {
            path: ['$.credentialSubject.chargingData.contractDID'],
            filter: {
              type: 'string',
              const:
                'did:ethr:blxm-dev:0xCacb1C56Bd397e0bA48306926EFdD97026ce4bcd',
            },
          },
          {
            path: ['$.credentialSubject.chargingData.evseId'],
            filter: {
              type: 'string',
              const: '892',
            },
          },
          {
            path: ['$.credentialSubject.chargingData.timeStamp'],
            filter: {
              type: 'string',
              const: '2022-06-13T07:19:35.929Z',
            },
          },
        ],
      },
    },
  ],
};
