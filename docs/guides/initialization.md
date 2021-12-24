# Establishing blockchain connection

Blockchain provider and signer are base componenents. Library allows different signer types.
Supported initializers are exported from `init` module. For example initializing library
with MetaMask signer looks like this

```typescript
import { initWithMetaMask } from "iam-client-lib";

const { signerService } = await initWithMetaMask();
```

```typescript
iam.closeConnection();
```
