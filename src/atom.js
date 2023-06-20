import { atom } from 'recoil';

import { decodeToken } from './util/util';

export const tokenInfo = atom({
  key: 'tokenState',
  default: {
    state: decodeToken().state,
    role: '',
  },
});

export const needGoBack = atom({
  key: 'needGoBack',
  default: false,
})
