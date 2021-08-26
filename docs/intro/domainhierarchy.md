# Domains

Currently the iam-client library supports two domains: **[Organization](../guides/organization.md)** and **[Application](../guides/application/md)**. 

## Domain Hierarchy

![Domain Hierarchy](../images/domainHierarchy.png)

Organization is the top-level domain. It can have an unlimited number of sub-organizations underneath of it. 

An Application is nested under an Organization or a Sub-organization. An Organization or Sub Organization can have an unlimited number of Applications. 

**A [Role](../guides/roles.md)** is nested under an Organization or an Application. A Role is used to determine an actor within an organization or an application, and criteria for participation. A user can submit claims (verifiable credentials) to prove that they meet the criteria that the Role requires. Other parties can verify these claims.



