import { Locker } from 'globalStates/lockerState';
import { Name } from 'globalStates/nameState';
import shuffle from 'lodash.shuffle';
import Storage from 'storage';
import { getNowDate } from 'utils/date';

export const setShuffledResult = ({
  resultId,
  locker,
  name,
}: {
  resultId: string;
  locker: Locker;
  name: Name;
}) => {
  const lockerNameList = getLockerNameList(locker);

  const filledNameList = name.list.concat(
    Array.from(
      { length: Number(locker.column) * Number(locker.row) - name.list.length },
      () => '',
    ),
  );

  const shuffledNameList = shuffle(filledNameList);

  const resultTitle = `${name.title}-${locker.title}`;

  const newResult = {
    id: resultId,
    createdAt: getNowDate(),
    title: resultTitle,
    nameList: shuffledNameList,
    lockerNameList: lockerNameList,
    column: Number(locker.column),
  };
  Storage.save('result', newResult);
};

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
