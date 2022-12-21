import { atom } from 'recoil';

export type Name = { title: string; list: string[] };

export const nameState = atom<Name>({
  key: 'nameType',
  default: {
    title: '',
    list: [],
  },
});
