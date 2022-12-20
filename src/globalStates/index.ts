import { atom } from 'recoil';

export const titleState = atom<string>({
  key: 'titleType',
  default: '',
});

export const nameListState = atom<string[]>({
  key: 'nameListType',
  default: [],
});
