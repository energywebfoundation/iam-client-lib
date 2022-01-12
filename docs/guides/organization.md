# Organization

[Organization Interface](../api/interfaces/cacheServerClient_cacheServerClient_types.IOrganization.md)

**Organization** is basic type in EnergyWeb domains tree. Its main purpose is to be a host.
All other domains such as applications and roles should have parent organization.
If needed organization can include other sub-organizations.Organization is represented by
[`IOrganization`](../api/interfaces/IOrganization.md) interface. Organization can
be created either as way to structure system or group correlated entities along with permissions hieararchy.
Organization owner as well as its components owners can be changed.
Example of organization

```
{
  "id": 544,
  "name": "OKE",
  "namespace": "OKE.iam.ewc",
  "namehash": "0x01894757df8b51871036dd8042c86214cb286d7fb30f6ce868b6d337885ca1cb",
  "owner": "0x5f7***",
  "definition": {
    "orgName": "OKE"
  },
  "apps": [
    ...
  ],
  "subOrgs": [],
  "roles": [
    ...
  ]
}
```

## Public APIs:

-   [createOrganization](../api/classes/iam.IAM.md#createorganization)
-   [deleteOrganization](../api/classes/iam.IAM.md#deleteorganization)
-   [getOrgHierarchy](../api/classes/iam.IAM.md#getorghierarchy)
