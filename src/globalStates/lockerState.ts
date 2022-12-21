import { atom } from 'recoil';

export const lockerState = atom<{ title: string; column: number; row: number }>(
  {
    key: 'lockerType',
    default: {
      title: '',
      column: 0,
      row: 0,
    },
  },
);
