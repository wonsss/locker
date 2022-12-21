import NewLocker from './NewLocker';
import { lockerState } from 'globalStates/lockerState';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { useRadioOption } from 'hooks/useRadioOption';

import { Title, FixedBottomButton, Radio, Spacing } from 'components';

const LockerPage = () => {
  const navigate = useNavigate();
  const locker = useRecoilValue(lockerState);
  const { option, handleChangeRadio } = useRadioOption('새로 입력');

  const handleClickNextButton = () => {
    navigate('/result');
  };

  return (
    <>
      <Title linkTo="/name">{`사물함 종류`}</Title>
      <Radio value={option} onChange={handleChangeRadio}>
        <Radio.Option value="새로 입력">새로 입력</Radio.Option>
        <Radio.Option value="불러오기">불러오기</Radio.Option>
      </Radio>
      <Spacing size={20} />
      {option === '새로 입력' ? <NewLocker /> : null}
      <FixedBottomButton
        onClick={handleClickNextButton}
        disabled={!(locker.column && locker.title)}
      >
        랜덤으로 배정하기
      </FixedBottomButton>
    </>
  );
};

export default LockerPage;
