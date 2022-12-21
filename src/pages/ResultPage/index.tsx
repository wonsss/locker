import { lockerState } from 'globalStates/lockerState';
import { nameState } from 'globalStates/nameState';
import shuffle from 'lodash.shuffle';
import { useRecoilValue } from 'recoil';
import { getNowDate } from 'utils/date';

import useNewLocker from 'pages/LockerPage/useNewLocker';

import { Title, Spacing, Lockers, Text } from 'components';

import { colors } from 'constants/colors';

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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Text color={colors.grey900} fontSize="20px" fontWeight="bold">
          {name.title} {locker.title}
        </Text>
        <Spacing size={3} />
        <Text color={colors.grey300} fontSize="17px" fontWeight="bold">
          {getNowDate()}
        </Text>
        <Spacing size={15} />
        <Lockers
          column={Number(locker.column)}
          lockerList={lockerList}
          nameList={shuffledNameList}
        />
      </div>
    </>
  );
};

export default ResultPage;
