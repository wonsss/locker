import { Locker } from 'globalStates/lockerState';

export const getLockerNameList = (locker: Locker) => {
  let rowCount = 0;
  let columnCount = 0;

  return Array.from(
    { length: Number(locker.column) * Number(locker.row) },
    () => {
      if (columnCount >= locker.column) {
        columnCount = 0;
        rowCount++;
      }
      columnCount++;

      return `${String.fromCharCode(65 + rowCount)}${columnCount}`;
    },
  );
};
