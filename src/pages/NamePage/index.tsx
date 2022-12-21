import NewName from './NewName';
import { nameState } from 'globalStates/nameState';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { useRadioOption } from 'hooks/useRadioOption';

import { Title, FixedBottomButton, Radio, Spacing } from 'components';

const NamePage = () => {
  const navigate = useNavigate();
  const name = useRecoilValue(nameState);
  const { option, handleChangeRadio } = useRadioOption('새로 입력');

  const handleClickNextButton = () => {
    navigate('/locker');
  };

  return (
    <>
      <Title linkTo="/home">{`배정 대상`}</Title>
      <Radio value={option} onChange={handleChangeRadio}>
        <Radio.Option value="새로 입력">새로 입력</Radio.Option>
        <Radio.Option value="불러오기">불러오기</Radio.Option>
      </Radio>
      <Spacing size={20} />
      {option === '새로 입력' ? <NewName /> : null}
      <FixedBottomButton
        onClick={handleClickNextButton}
        disabled={!(name.list.length && name.title)}
      >
        다음
      </FixedBottomButton>
    </>
  );
};

export default NamePage;
