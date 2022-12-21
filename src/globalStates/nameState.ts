import { atom } from 'recoil';

export type Name = { id: string; title: string; list: string[] };

export const defaultName = { id: '', title: '', list: [] };

export const nameState = atom<Name>({
  key: 'nameType',
  default: defaultName,
});
