import { atom } from 'recoil';

export interface WalletContextType {
  activeAddress: string | null;
}

export const ConnectedWalletAtom = atom<WalletContextType>({
  key: 'connected-wallet-atom',
  default: {
    activeAddress: null,
  },
});
