# Application

[Application Interface](../api/interfaces/modules_domains.IApp.md)

**Application** represents service provided by parent organization. The only domain type contained by application is Role.
Application domain is described by [IApplication](../api/interfaces/modules_domains.IApp.md).
Example of application

```
{
  "id": 347,
  "name": "verification",
  "owner": "0x627306090abaB3A6e1400e9345bC60c78a8BEf57",
  "namespace": "verification.apps.energyweb.iam.ewc",
  "namehash": "0x39f219f48798d619edc9d5ab0f5f802a86383b57a99965722a4cb9d83d3fd16a",
  "definition": {
    "appName": "IAM KYC App",
    "logoUrl": "",
    "websiteUrl": "https://www.energyweb.org/",
    "description": ""
  }
}
```

`namespace` is ENS name of application

## Public APIs

-   [getAppsByOrgNamespace](../api/classes/modules_domains.DomainsService.md#getAppsOfOrg)
-   [createApplication](../api/classes/modules_domains.DomainsService.md#createApplication)
-   [deleteApplication](../api/classes/modules_domains.DomainsService.md#deleteApplication)
