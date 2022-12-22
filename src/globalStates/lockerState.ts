import { atom } from 'recoil';

export type Locker = {
  id: string;
  createdAt: string;
  title: string;
  column: number | '';
  row: number | '';
};

export const defaultLocker: Locker = {
  id: '',
  createdAt: '',
  title: '',
  column: '',
  row: '',
};

export const lockerState = atom<Locker>({
  key: 'lockerType',
  default: defaultLocker,
});
