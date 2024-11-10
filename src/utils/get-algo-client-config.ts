'use client';

import { ALGO_CLIENT_CONFIG } from '@/constants/algo-client-config.constant';
import algosdk from 'algosdk';
import { NetworkEnvironment } from '../interface';

export const getAlgoClientConfig = (environment: NetworkEnvironment) => {
  return {
    environment,
    config: ALGO_CLIENT_CONFIG[environment],
  };
};

export const getAlgodClient = (environment: NetworkEnvironment) => {
  const { config } = getAlgoClientConfig(environment);
  const algodConfig = config.algod;
  const client = new algosdk.Algodv2(algodConfig.token, algodConfig.server, algodConfig.port);
  return client;
};
