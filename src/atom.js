import { atom } from 'recoil';

import { decodeToken } from './util/util';
import { TOKEN_NAME, USER_INFO } from './constants/constant';

export const tokenInfo = atom({
  key: 'tokenState',
  default: {
    state: decodeToken().state,
    role: '',
  },
});
