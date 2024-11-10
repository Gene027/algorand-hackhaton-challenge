'use client';

import * as algokit from '@algorandfoundation/algokit-utils';
import algosdk from 'algosdk';
import { useCallback } from 'react';
import { getAlgoClientConfig, getAlgodClient } from '@/utils/get-algo-client-config';
import { useClient } from '../../hooks/use-client';
import toast from 'react-hot-toast';
import { AssetResponse } from '../../interface/assest.interface';
import { SignerTransaction } from '@perawallet/connect/dist/util/model/peraWalletModels';
import { PeraWalletConnect } from '@perawallet/connect';
import { NetworkEnvironment } from '../../interface';

export const useAlgoActions = (
  walletInstance: PeraWalletConnect,
  activeAddress: string,
  environment: NetworkEnvironment,
) => {
  const algodClient = getAlgodClient(environment);
  const apiClient = useClient();

  const donateOneAlgo = useCallback(async () => {
    if (!activeAddress || !walletInstance) {
      throw new Error('No wallet connected');
    }

    const sender = { addr: activeAddress };
    const receiver = {
      addr: 'KVFFG5DIEMR5FU4NIXZFYUVXPSNVZSSR64XMJPK566E2VPU5IJESEYOSP4',
      amount: 1000000,
    };

    const paymentTxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      from: sender.addr,
      to: receiver.addr,
      amount: receiver.amount,
      suggestedParams: await algodClient.getTransactionParams().do(),
    });

    const txGroup: SignerTransaction[] = [
      {
        txn: paymentTxn,
        signers: [activeAddress],
        message: 'Donation to Praise',
      },
    ];

    toast.loading('Awaiting transaction signing...', { id: 'donate' });
    const signedTxn = await walletInstance.signTransaction([txGroup]);

    toast.loading('Sending transaction to network...', { id: 'donate' });
    const result = await algodClient.sendRawTransaction(signedTxn).do();

    toast.loading('Awaiting confirmation...', { id: 'donate' });
    await algosdk.waitForConfirmation(algodClient, result.txId, 4);
  }, [activeAddress, walletInstance, algodClient]);

  const fetchVerifiedAssets = useCallback(
    async (nextUrl?: string) => {
      if (!activeAddress) {
        return [];
      }

      const url =
        environment == 'MainNet'
          ? 'https://mainnet.api.perawallet.app/v1/public/assets/?filter=is_verified'
          : 'https://testnet.api.perawallet.app/v1/public/assets/?filter=is_verified';

      const res = await apiClient.get<AssetResponse>(nextUrl ?? url, null, {
        overrideDefaultBaseUrl: true,
      });

      if (res.error) {
        toast.error('Error fetching verified assets');
        return;
      }

      return res.data;
    },
    [activeAddress, environment],
  );

  const optInToAsset = useCallback(
    async (assetId: number) => {
      if (!activeAddress || !walletInstance) {
        throw new Error('No wallet connected');
      }

      const sender = { addr: activeAddress };
      const applicationOptinTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        from: sender.addr,
        to: sender.addr,
        assetIndex: assetId,
        amount: 0,
        suggestedParams: await algodClient.getTransactionParams().do(),
      });

      const txGroup: SignerTransaction[] = [
        {
          txn: applicationOptinTxn,
          signers: [activeAddress],
          message: 'Opt in to asset',
        },
      ];

      toast.loading(`Awaiting transaction signing...`, { id: 'optin' });

      const signedTxn = await walletInstance.signTransaction([txGroup]);

      toast.loading(`Sending transaction to network`, { id: 'optin' });
      const result = await algodClient.sendRawTransaction(signedTxn).do();

      toast.loading(`Awaiting confirmation...`, { id: 'optin' });
      return await algosdk.waitForConfirmation(algodClient, result.txId, 4);
    },
    [activeAddress, walletInstance, algodClient],
  );

  return {
    donateOneAlgo,
    fetchVerifiedAssets,
    optInToAsset,
  };
};
