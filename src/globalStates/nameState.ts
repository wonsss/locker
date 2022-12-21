import { atom } from 'recoil';

export const nameState = atom<{ title: string; list: string[] }>({
  key: 'nameType',
  default: {
    title: '',
    list: [],
  },
});
