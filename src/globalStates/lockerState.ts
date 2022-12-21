import { atom } from 'recoil';

export const lockerState = atom<{
  title: string;
  column: number | '';
  row: number | '';
}>({
  key: 'lockerType',
  default: {
    title: '',
    column: '',
    row: '',
  },
});
