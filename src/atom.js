import { atom } from 'recoil'

export const logInInfo = atom({
  key: 'logInState',
  default: {
    state: false,
    memberId: '',
    thumbnail: '',
    registDate: '',
    userName: '',
  }
})
