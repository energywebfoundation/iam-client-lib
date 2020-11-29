# Roles

*Role* is used to authorize within a certain domain. Currently there 
are two domains supported by the library: Organization and Application. Before
creating a role, there must be a domain under which this role will be defined. 
For domain and role creation library provides
[createOrganization](../api/classes/iam.md#createorganization),
[createApplication](../api/classes/iam.md#createapplication) and 
[createRole](../api/classes/iam.md#createrole) functions.

This roles can be assigned to identity to grant it some priveledges. Role 
posession can be verified by [getENSTypeByOwner](../api/classes/iam.md#getenstypebyowner)


