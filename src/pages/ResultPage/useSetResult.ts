import { lockerState } from 'globalStates/lockerState';
import { nameState } from 'globalStates/nameState';
import shuffle from 'lodash.shuffle';
import { useRecoilValue } from 'recoil';
import Storage from 'storage';
import { getNowDate } from 'utils/date';
import { v4 as uuidv4 } from 'uuid';

import useNewLocker from 'pages/LockerPage/useNewLocker';

const useSetResult = () => {
  const locker = useRecoilValue(lockerState);
  const name = useRecoilValue(nameState);

  const { lockerList } = useNewLocker();

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
      lockerList: lockerList,
      column: Number(locker.column),
    };
    Storage.save('result', newResult);
  };
  return { setResult, resultId };
};

export default useSetResult;
