import { providers, Wallet } from 'ethers';
import { ProviderType, SignerService } from '../src';

describe('Signer tests', () => {
  it('should set `isEthrSigner` for node environment during initialization', async () => {
    const wallet = Wallet.createRandom();
    const provider = new providers.JsonRpcProvider('http://127.0.0.1:8544');
    const service = new SignerService(
      wallet.connect(provider),
      ProviderType.PrivateKey
    );
    expect(service.isEthSigner).toBeUndefined();
    await service.init();
    expect(service.isEthSigner).toBe(true);
  });
});
