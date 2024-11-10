'use client';

import styles from './index.module.scss';
import { AlgorandIcon } from '@/assets';
import NetworkBadge from '../badge/network-badge';
import { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { WalletConnectModal } from '../wallet-connect-modal';
import { PeraWalletConnect } from '@perawallet/connect';
import { NetworkEnvironment } from '../../interface';

interface Props {
  walletInstance: PeraWalletConnect;
  activeAddress: string | null;
  setActiveAddress: (address: string) => void;
  environment: NetworkEnvironment;
  setEnvironment: (env: NetworkEnvironment) => void;
}

export const TopNav = ({
  walletInstance,
  activeAddress,
  setActiveAddress,
  environment,
  setEnvironment,
}: Props) => {
  const [connectionLoading, setConnectionLoading] = useState(false);
  const [availableAccounts, setAvailableAccounts] = useState<string[]>([]);
  const [showAccountSelection, setShowAccountSelection] = useState(false);

  const connectWithPera = async () => {
    if (!walletInstance) {
      toast.error('Wallet instance is not initialized');
      return;
    }

    setConnectionLoading(true);
    try {
      // Connect with Pera Wallet
      const accounts = await walletInstance.connect();

      if (accounts && accounts.length > 1) {
        setAvailableAccounts(accounts);
        setShowAccountSelection(true);
      } else if (accounts && accounts.length === 1) {
        setActiveAddress(accounts[0]);
      }
      walletInstance.connector?.on('disconnect', disconnectPera);
    } catch (e: any) {
      if (e?.data?.type !== 'CONNECT_CANCELLED') {
        toast.error(e.toString());
      } else {
        toast.error('Connection Cancelled');
      }
    }
    setConnectionLoading(false);
  };

  const handleAccountSelection = (account: string) => {
    if (!walletInstance) return;
    setActiveAddress(account);

    setShowAccountSelection(false);
  };

  const disconnectPera = async () => {
    if (!walletInstance) return;
    setConnectionLoading(true);
    try {
      await walletInstance.disconnect();
      setActiveAddress('');

      setAvailableAccounts([]);
    } catch (e) {
      console.error(e);
    }
    setConnectionLoading(false);
  };

  useEffect(() => {
    if (!walletInstance) return;

    // handles wallet reconnection on refresh
    walletInstance
      .reconnectSession()
      .then((accounts) => {
        if (accounts.length > 0) {
          setAvailableAccounts(accounts);
          setActiveAddress(accounts[0]);
        }

        walletInstance.connector?.on('disconnect', disconnectPera);
      })
      .catch((e) => {
        toast.error('Failed to reconnect to Pera Wallet');
      });
  }, []);

  return (
    <nav className={styles.container}>
      <div className="flex gap-5">
        <AlgorandIcon />
        <NetworkBadge env={environment} setEnvironment={(env) => setEnvironment(env)} />
      </div>
      <div className={styles.right}>
        <button
          onClick={() => {
            if (activeAddress) {
              disconnectPera();
            } else {
              connectWithPera();
            }
          }}
          className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
        >
          <div className="flex gap-2 items-center">
            {connectionLoading ? <FaSpinner className="animate-spin" /> : null}
            {activeAddress ? `Disconnect ${activeAddress.slice(0, 10)}...` : 'Connect With Pera'}
          </div>
        </button>

        {showAccountSelection && (
          <WalletConnectModal
            availableAccounts={availableAccounts}
            handleAccountSelection={handleAccountSelection}
          />
        )}
      </div>
    </nav>
  );
};
