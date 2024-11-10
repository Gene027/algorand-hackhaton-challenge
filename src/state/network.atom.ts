import { atom } from 'recoil';
import { NetworkEnvironment } from '../interface';

export const NetworkEnvironmentAtom = atom<NetworkEnvironment>({
  key: 'network',
  default: 'TestNet',
});
