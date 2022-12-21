import NewName from './NewName';
import OldName from './OldName';
import { nameState } from 'globalStates/nameState';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import Storage from 'storage';
import { v4 as uuidv4 } from 'uuid';

import { useRadioOption } from 'hooks/useRadioOption';

import { Title, FixedBottomButton, Radio, Spacing } from 'components';

const NamePage = () => {
  // const navigate = useNavigate();
  // const [targetName, setTargetName] = useRecoilState(nameState);
  const { option, handleChangeRadio } = useRadioOption('새로 입력');

  // const nameId = uuidv4();

  // const handleClickNextButton = () => {
  //   if (option === '새로 입력') {
  //     setTargetName((prev) => ({ ...prev, id: nameId }));
  //     Storage.save('name', targetName);
  //   }
  //   navigate('/locker');
  // };

  return (
    <>
      <Title linkTo="/home">{`배정 대상`}</Title>
      <Radio value={option} onChange={handleChangeRadio}>
        <Radio.Option value="새로 입력">새로 입력</Radio.Option>
        <Radio.Option value="불러오기">불러오기</Radio.Option>
      </Radio>
      <Spacing size={20} />
      {option === '새로 입력' ? <NewName /> : <OldName />}
      {/* <FixedBottomButton
        onClick={handleClickNextButton}
        disabled={!(targetName.list.length && targetName.title)}
      >
        다음
      </FixedBottomButton> */}
    </>
  );
};

export default NamePage;
