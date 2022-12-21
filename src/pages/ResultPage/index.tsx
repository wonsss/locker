import { lockerState } from 'globalStates/lockerState';
import { nameState } from 'globalStates/nameState';
import shuffle from 'lodash.shuffle';
import { useRecoilValue } from 'recoil';

import useNewLocker from 'pages/LockerPage/useNewLocker';

import { Title, Spacing, Lockers } from 'components';

const ResultPage = () => {
  const locker = useRecoilValue(lockerState);
  const name = useRecoilValue(nameState);

  const filledNameList = name.list.concat(
    Array.from(
      { length: Number(locker.column) * Number(locker.row) - name.list.length },
      () => '',
    ),
  );
  const shuffledNameList = shuffle(filledNameList);

  const { lockerList } = useNewLocker();

  return (
    <>
      <Title linkTo="/locker">{`사물함 배정 결과`}</Title>
      <Spacing size={20} />
      <Lockers
        column={Number(locker.column)}
        lockerList={lockerList}
        nameList={shuffledNameList}
      />
    </>
  );
};

export default ResultPage;
