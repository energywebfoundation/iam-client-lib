import SafeAppSdk from '@gnosis.pm/safe-apps-sdk';
import { bigNumberify } from 'ethers/utils';
import { IApp, IOrganization, IRole } from './cacheServerClient/cacheServerClient.types';
import { CacheClientNotProvidedError, ERROR_MESSAGES } from './errors';
import { ENSNamespaceTypes, IAM } from './iam';
import { ConnectionOptions, Transaction } from './iam/iam-base';

/**
 * @class GnosisIam
 * @description Intended for use in Volta Gnosis web interface(https://volta.gnosis-safe.io/).
 * Dapp should provide this class with SafeAppSdk injected by Gnosis interface. This class intoduces
 * notion of controlled domain as that which is owned by gnosis wallet controlled by Iam signer.
 * The domain ownership functionality has been redefined accordingly.
 */
export class GnosisIam extends IAM {
  protected _safeAddress = '';

  constructor(private safeAppSdk: SafeAppSdk, iamOpts: ConnectionOptions) {
    super(iamOpts);
  }

  protected async send(tx: Transaction) {
    const safeTxGas = bigNumberify(await this._transactionOverrides.gasLimit || '').toNumber();

    if (tx.from === this._safeAddress) {
      await this.safeAppSdk.txs.send({
        txs: tx.calls.map((tx) => ({ ...tx, value: tx.value || '0' })),
        params: {
          safeTxGas
        }
      });
    }
    else if (tx.from === this._address) {
      await super.send(tx);
    }
  }

  protected async setAddress() {
    await super.setAddress();
    this._safeAddress = (await this.safeAppSdk.getSafeInfo()).safeAddress;
  }

  get safeAddress() {
    return this._safeAddress;
  }

  getENSTypesByOwner({ type, owner }: { type: ENSNamespaceTypes, owner: string }) {
    if (!this._cacheClient) {
      throw new CacheClientNotProvidedError();
    }
    switch (type) {
      case ENSNamespaceTypes.Organization:
        return Promise.all([
          super.getENSTypesByOwner({ type, owner }) as Promise<IOrganization[]>,
          super.getENSTypesByOwner({ type, owner: this._safeAddress }) as Promise<IOrganization[]>
        ])
          .then(([owned, controlled]) => [...owned, ...controlled]);
      case ENSNamespaceTypes.Application:
        return Promise.all([
          super.getENSTypesByOwner({ type, owner }) as Promise<IApp[]>,
          super.getENSTypesByOwner({ type, owner: this._safeAddress }) as Promise<IApp[]>
        ])
          .then(([owned, controlled]) => [...owned, ...controlled]);
      case ENSNamespaceTypes.Roles:
        return Promise.all([
          super.getENSTypesByOwner({ type, owner }) as Promise<IRole[]>,
          super.getENSTypesByOwner({ type, owner: this._safeAddress }) as Promise<IRole[]>
        ])
          .then(([owned, controlled]) => [...owned, ...controlled]);
    }
  }

  async validateOwnership(
    { namespace, type }: { namespace: string; type: ENSNamespaceTypes }
  ) {
    if (this._address && this._safeAddress) {
      const notOwnedByOwner = await super.nonOwnedNodesOf({ namespace, type, owner: this._address });
      const notOwnedBySafe = await super.nonOwnedNodesOf({ namespace, type, owner: this._safeAddress });
      if (notOwnedByOwner.length < notOwnedBySafe.length) {
        return notOwnedByOwner;
      } else {
        return notOwnedBySafe;
      }
    } else {
      throw new Error(ERROR_MESSAGES.USER_NOT_LOGGED_IN);
    }
  }

  /**
   * @description Checks whether the `domain` is owned by `user` or by 
   * gnosis wallet controlled by `user`
   */
  async isOwner({ domain, user = this._address }: { domain: string; user?: string }) {
    return await super.isOwner({ domain, user }) ||
      user === this._address && await super.isOwner({ domain, user: this._safeAddress });
  }
}