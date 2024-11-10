'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getPeraWalletInstance } from '../../utils/wallet-instance';
import { PeraWalletConnect } from '@perawallet/connect';

interface PeraWalletContextType {
  walletInstance: PeraWalletConnect;
}

const PeraWalletContext = createContext<PeraWalletContextType | undefined>(undefined);

export const PeraWalletProvider = ({ children }: { children: React.ReactNode }) => {
  // The PeraWalletConnect instance remains stable as long as it is managed via a singleton pattern like in getPeraWalletInstance()
  const peraWallet = getPeraWalletInstance();
  const value = { walletInstance: peraWallet };

  return <PeraWalletContext.Provider value={value}>{children}</PeraWalletContext.Provider>;
};

// Use usePeraWallet in any component to connect, disconnect, and manage wallet-related state easily.
export const usePeraWallet = () => {
  const context = useContext(PeraWalletContext);
  if (context === undefined) {
    throw new Error('usePeraWallet must be used within a PeraWalletProvider');
  }
  return context;
};
