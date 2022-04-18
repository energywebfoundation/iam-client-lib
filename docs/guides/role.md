# Roles

[Role Interface](../api/interfaces/IRole.md)

**Role** is leaf in EnergyWeb domains tree. Its main purpose is to distribute responsibilities
and permissions in some domain. As part of its definition, role determines the permissions of its
issuance and revoсation. In particular requesting of role can require prequisite assignment
of some other role.
Similarly, a role can also be used a prerequisite for issuance.
A role can be placed under organization or
application thus defining its scope.
Role is represented by [`IRole`](../api/interfaces/IRole.md) interface.
Example of role

```
{
  "id": 580,
  "name": "email",
  "namespace": "email.roles.verification.apps.energyweb.iam.ewc",
  "namehash": "0x7309fb6c9050c8da31473134bb210fe29586cbd6fe98004193a8b25d6689e29e",
  "owner": "0x627306090abaB3A6e1400e9345bC60c78a8BEf57",
  "definition": {
    "fields": [
      {
        "label": "email",
        "pattern": "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])",
        "required": true,
        "fieldType": "text",
        "maxLength": null,
        "minLength": null
      }
    ],
    "issuer": {
      "did": [
        "did:ethr:volta:0x627306090abaB3A6e1400e9345bC60c78a8BEf57",
        "did:ethr:volta:0x8D891A60ae4cE38cA22975cF7182298CC64B1F5f",
        "did:ethr:volta:0x5f757211976c68136041C439c3b3e699b3312882"
      ],
      "issuerType": "DID"
    },
    "version": 1,
    "roleName": "email",
    "roleType": "app",
    "issuerFields": [],
    "enrolmentPreconditions": []
  }
}
```

## Public APIs:

-   [createRole](../api/classes/DomainsService.md#createrole)
-   [setRoleDefinition](../api/classes/DomainsService.md#setroledefinition)
-   [getRolesByNameSpace](../api/classes/DomainsService.md#getrolesbynamespace)
-   [getRoleDIDs](../api/classes/DomainsService.md#getroledids)
-   [changeRoleOwnership](../api/classes/DomainsService.md#changeroleownership)
-   [deleteRole](../api/classes/DomainsService.md#deleterole)
