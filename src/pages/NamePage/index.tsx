import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Title, FixedBottomButton, Radio } from 'components';

const NamePage = () => {
  const navigate = useNavigate();
  const handleClickNextButton = () => {
    navigate('/locker');
  };

  const [loadNameOption, setLoadNameOption] = useState('새로 입력');

  const handleChangeRadio = (e: ChangeEvent<HTMLInputElement>) => {
    setLoadNameOption(e.target.value);
  };

  return (
    <>
      <Title>{`사물함을 배정할\n크루들의 이름을 입력해주세요`}</Title>
      <div style={{ padding: '0 24px' }}>
        <Radio value={loadNameOption} onChange={handleChangeRadio}>
          <Radio.Option value="새로 입력">새로 입력</Radio.Option>
          <Radio.Option value="불러오기">불러오기</Radio.Option>
        </Radio>
      </div>
      <FixedBottomButton onClick={handleClickNextButton}>
        다음
      </FixedBottomButton>
    </>
  );
};

export default NamePage;
