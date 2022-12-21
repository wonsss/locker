import { lockerState } from 'globalStates/lockerState';
import { nameState } from 'globalStates/nameState';
import html2canvas from 'html2canvas';
import shuffle from 'lodash.shuffle';
import { useRecoilValue } from 'recoil';
import { getNowDate } from 'utils/date';

import useNewLocker from 'pages/LockerPage/useNewLocker';

import { Title, Spacing, Lockers, Text, FixedBottomButton } from 'components';

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
  const resultTitle = `${name.title}-${locker.title}`;

  const handleClickCapture = () => {
    const lockerCanvas = document.getElementById('lockerCanvas');
    if (!lockerCanvas) {
      return;
    }
    html2canvas(lockerCanvas).then((canvas) => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL();
      link.download = `사물함 배정결과-${resultTitle}.png`;
      link.click();
    });
  };

  return (
    <>
      <Title linkTo="/locker">{`사물함 배정 결과`}</Title>
      <div
        id="lockerCanvas"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '30px',
        }}
      >
        <Text color={colors.grey900} fontSize="20px" fontWeight="bold">
          {resultTitle}
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
      <FixedBottomButton onClick={handleClickCapture}>
        배정결과 이미지 다운로드
      </FixedBottomButton>
    </>
  );
};

export default ResultPage;
