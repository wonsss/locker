import { atom } from 'recoil';

export type Name = {
  id: string;
  title: string;
  list: string[];
  createdAt: string;
};

export const defaultName = { id: '', title: '', list: [], createdAt: '' };

export const nameState = atom<Name>({
  key: 'nameType',
  default: defaultName,
});
