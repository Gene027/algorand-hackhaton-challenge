'use client';
import { FC } from 'react';
import toast from 'react-hot-toast';
import { NetworkEnvironment } from '../../interface';

interface Props {
  env: NetworkEnvironment;
  setEnvironment: (env: NetworkEnvironment) => void;
}

const NetworkBadge: FC<Props> = ({
  env: currentNetwork,
  setEnvironment: setCurrentNetwork,
}: Props) => {
  const handleSetNetwork = () => {
    setCurrentNetwork(currentNetwork === 'MainNet' ? 'TestNet' : 'MainNet');
    toast.success(`Switched to ${currentNetwork === 'MainNet' ? 'TestNet' : 'MainNet'}`);
  };

  return (
    <div
      className={`${
        currentNetwork === 'MainNet' ? 'bg-green-500' : 'bg-yellow-500'
      } px-2 py-1 rounded-lg cursor-pointer hover:bg-opacity-80`}
      onClick={handleSetNetwork}
      aria-label="Switch Network"
    >
      {currentNetwork}
    </div>
  );
};

export default NetworkBadge;
