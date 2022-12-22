import { Locker } from 'globalStates/lockerState';
import { Name } from 'globalStates/nameState';
import shuffle from 'lodash.shuffle';
import Storage from 'storage';
import { getNowDate } from 'utils/date';
import { getLockerNameList } from 'utils/locker';
import { v4 as uuidv4 } from 'uuid';

const useSetResult = ({ locker, name }: { locker: Locker; name: Name }) => {
  const lockerNameList = getLockerNameList(locker);

  const filledNameList = name.list.concat(
    Array.from(
      { length: Number(locker.column) * Number(locker.row) - name.list.length },
      () => '',
    ),
  );
  const shuffledNameList = shuffle(filledNameList);

  const resultTitle = `${name.title}-${locker.title}`;

  const resultId = uuidv4();

  const setResult = () => {
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
  return { setResult, resultId };
};

export default useSetResult;
