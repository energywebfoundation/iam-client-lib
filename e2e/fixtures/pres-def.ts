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
    }
  ],
};
