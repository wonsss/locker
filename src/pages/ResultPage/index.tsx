import useGetResult from './useGetResult';
import html2canvas from 'html2canvas';
import { getNowDate } from 'utils/date';

import { Title, Spacing, Lockers, Text, FixedBottomButton } from 'components';

import { colors } from 'constants/colors';

const ResultPage = () => {
  const { result } = useGetResult();

  const handleClickCapture = () => {
    const lockerCanvas = document.getElementById('lockerCanvas');
    if (!lockerCanvas) {
      return;
    }
    html2canvas(lockerCanvas).then((canvas) => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL();
      link.download = `사물함 배정결과-${result?.title}.png`;
      link.click();
    });
  };

  return (
    <>
      <Title>{`사물함 배정 결과`}</Title>
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
          {result?.title}
        </Text>
        <Spacing size={3} />
        <Text color={colors.grey400} fontSize="17px" fontWeight="bold">
          {getNowDate()}
        </Text>
        <Spacing size={15} />
        <Lockers
          column={Number(result?.column)}
          lockerNameList={result?.lockerNameList}
          nameList={result?.nameList}
        />
      </div>
      <FixedBottomButton onClick={handleClickCapture}>
        배정결과 이미지 다운로드
      </FixedBottomButton>
    </>
  );
};

export default ResultPage;

export type Result = {
  id: string;
  createdAt: string;
  title: string;
  nameList: string[];
  lockerNameList: string[];
  column: number;
};
