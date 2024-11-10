'use client';
import { BackgroundOverlay } from '../background-overlay';
import styles from './index.module.scss';

interface Props {
  handleAccountSelection: (account: string) => void;
  availableAccounts: string[];
}

export const WalletConnectModal = ({ availableAccounts, handleAccountSelection }: Props) => {
  return (
    <BackgroundOverlay onClose={() => null}>
      <div className={styles.container}>
        <div className={styles.title}>
          <h3>Select an Account</h3>
        </div>
        <div className={styles.wallets}>
          <ul className="flex flex-col gap-2">
            {availableAccounts.map((account) => (
              <li key={account}>
                <button
                  onClick={() => handleAccountSelection(account)}
                  className="rounded border border-gray-300 py-2 px-4 hover:bg-gray-200 w-full text-left"
                >
                  {account.slice(0, 15)}...
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </BackgroundOverlay>
  );
};
