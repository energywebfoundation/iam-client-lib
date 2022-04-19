# Organization

[Organization Interface](../api/interfaces/modules_domains.IOrganization.md)

**Organization** is basic type in EnergyWeb domains tree. Its main purpose is to be a root that can group other domains, such as apps and roles.
All other domains such as applications and roles should have parent organization.
If needed organization can include other sub-organizations. Organization is represented by
[`IOrganization`](../api/interfaces/modules_domains.IOrganization.md) interface. Organizations can
be created either as way to structure system or group correlated entities along with permissions hierarchy.
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

-   [createOrganization](../api/classes/modules_domains.DomainsService.md#createorganization)
-   [deleteOrganization](../api/classes/modules_domains.DomainsService.md#deleteorganization)
-   [getOrgHierarchy](../api/classes/modules_domains.DomainsService.md#getorghierarchy)
