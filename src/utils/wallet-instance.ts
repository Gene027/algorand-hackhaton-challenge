import { PeraWalletConnect } from '@perawallet/connect';

let peraWalletInstance: PeraWalletConnect | null = null;

// Create a singleton pattern to ensure that PeraWalletConnect is only instantiated once. This avoids reinitializing PeraWalletConnect across different parts of your application
export const getPeraWalletInstance = () => {
  if (!peraWalletInstance) {
    peraWalletInstance = new PeraWalletConnect({
      shouldShowSignTxnToast: true,
    });
  }
  return peraWalletInstance;
};
