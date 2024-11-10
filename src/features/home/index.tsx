'use client';

import { AlgorandIcon } from '@/assets';
import styles from './index.module.scss';
import { TopNav } from '@/components/top-nav';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useAlgoActions } from '../../actions/algo';
import { Table } from '../../components/table';
import { LOADING_STATUS } from '../../enums/loading.enum';
import { TableColumn } from '../../interface/table-column.interface';
import { AssetResponse, AssetResponseData } from '../../interface/assest.interface';
import { FaSpinner } from 'react-icons/fa';
import { NetworkEnvironment } from '../../interface';
import RecoilContextProvider from '../../providers/recoil-provider';
import { usePeraWallet } from '../../providers/wallet-provider/wallet-provider';

const headers = ['ID', 'Logo', 'Name', 'USD Value'];

export const Home = () => {
  const { walletInstance } = usePeraWallet();
  const [activeAddress, setActiveAddress] = useState<string>('');
  const [environment, setEnvironment] = useState<NetworkEnvironment>('TestNet');
  const [donating, setDonating] = useState(false);
  const [loadingAssets, setLoadingAssets] = useState(false);
  const [optingIn, setOptingIn] = useState(false);
  const [assets, setAssets] = useState<AssetResponseData[]>([]);
  const [assetRes, setAssetRes] = useState<AssetResponse | undefined>(undefined);
  const { donateOneAlgo, fetchVerifiedAssets, optInToAsset } = useAlgoActions(
    walletInstance,
    activeAddress,
    environment,
  );

  const handleDonation = async () => {
    if (donating) return;

    setDonating(true);
    toast.loading('Donating 1 Algo...', { id: 'donate' });

    try {
      await donateOneAlgo();

      toast.success(`Donation successful!`);
      setDonating(false);
      toast.dismiss('donate');
    } catch (error: any) {
      console.log(error);
      setDonating(false);
      toast.error(`Error making Donation:, ${error.toString()}`);
      toast.dismiss('donate');
    }
  };

  const fetchAssests = async () => {
    if (loadingAssets) return;

    setLoadingAssets(true);

    const data = (await fetchVerifiedAssets()) as AssetResponse | undefined;

    if (data?.results) {
      setAssets(data.results);
      setAssetRes(data);
    }
    setLoadingAssets(false);
  };

  const handleAssetOptIn = async (asset: AssetResponseData) => {
    if (optingIn) return;

    setOptingIn(true);
    toast.loading(`Opting into ${asset.name}`, { id: 'optin' });

    try {
      const res = await optInToAsset(asset.asset_id);

      if (res) {
        toast.success(`Opted in to asset ${asset.name}`);
      }
      setOptingIn(false);
      toast.dismiss('optin');
    } catch (error: any) {
      console.log(error);
      toast.error(`Error opting in to asset ${asset.name}: ${error.toString()}`);
      setOptingIn(false);
      toast.dismiss('optin');
    }
  };

  const columns: TableColumn[] = [
    {
      render: (data: AssetResponseData) => {
        return data?.asset_id;
      },
    },
    {
      render: (data: AssetResponseData) => {
        return (
          <img
            alt="Asset Logo"
            src={
              data?.logo ||
              'https://storage.googleapis.com/ezetradein-gs-cld/ezetradein-website/products/noImage.svg'
            }
            height={50}
            width={50}
            className="object-contain"
          />
        );
      },
    },
    {
      render: (data: AssetResponseData) => {
        return data?.name || 'N/A';
      },
    },
    {
      render: (data: AssetResponseData) => {
        return data?.usd_value || 'N/A';
      },
    },
  ];

  useEffect(() => {
    if (activeAddress) {
      fetchAssests();
    }
  }, [activeAddress, environment]);

  return (
    <RecoilContextProvider>
      <TopNav
        walletInstance={walletInstance}
        activeAddress={activeAddress}
        setActiveAddress={(address: string) => setActiveAddress(address)}
        environment={environment}
        setEnvironment={(env: NetworkEnvironment) => setEnvironment(env)}
      />
      <div className={styles.container}>
        <main>
          <AlgorandIcon className={styles.AlgorandIcon} />
          <ul>
            <li>Welcome to Gene027 Pera Connect</li>
            <li>
              {activeAddress
                ? `Your wallet address is: ${activeAddress.slice(0, 10)}...`
                : `Get started by connecting your wallet.`}
            </li>
          </ul>

          {!!activeAddress && (
            <div className={styles['button-group']}>
              <button
                onClick={handleDonation}
                disabled={donating}
                className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
              >
                <div className="flex gap-2 items-center">
                  {donating ? <FaSpinner className="animate-spin" /> : null}

                  <>Donate 1 ALGO</>
                </div>
              </button>
            </div>
          )}

          {!!activeAddress && (
            <>
              <div className={styles.table_subject}>Select a verified asset to opt-in to</div>
              <Table
                status={loadingAssets ? LOADING_STATUS.PENDING : LOADING_STATUS.SUCCESS}
                headers={headers}
                columns={columns}
                data={assets}
                currentPage={1}
                rowClickHandler={handleAssetOptIn}
              />
            </>
          )}
        </main>
      </div>
    </RecoilContextProvider>
  );
};
