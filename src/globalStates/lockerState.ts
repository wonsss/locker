import { atom } from 'recoil';

export type Locker = {
  title: string;
  column: number | '';
  row: number | '';
};

export const lockerState = atom<Locker>({
  key: 'lockerType',
  default: {
    title: '',
    column: '',
    row: '',
  },
});
