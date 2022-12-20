import { ChangeEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Title, FixedBottomButton, Radio, Chips, Textarea } from 'components';

const NamePage = () => {
  const navigate = useNavigate();
  const handleClickNextButton = () => {
    navigate('/locker');
  };

  const [loadNameOption, setLoadNameOption] = useState('새로 입력');
  const [nameList, setNameList] = useState<string[]>([]);
  const handleChangeRadio = (e: ChangeEvent<HTMLInputElement>) => {
    setLoadNameOption(e.target.value);
  };
  const textarea = useRef<HTMLTextAreaElement>(null);

  const handleChangeNameInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const nameList = e.target.value.split(' ');
    setNameList(nameList);
    if (textarea.current) {
      textarea.current.style.height = 'auto';
      textarea.current.style.height = textarea.current.scrollHeight + 'px';
    }
  };

  return (
    <div style={{ padding: '0 24px' }}>
      <Title>{`사물함을 배정할\n크루들의 이름을 입력해주세요`}</Title>
      <Radio value={loadNameOption} onChange={handleChangeRadio}>
        <Radio.Option value="새로 입력">새로 입력</Radio.Option>
        <Radio.Option value="불러오기">불러오기</Radio.Option>
      </Radio>
      {loadNameOption === '새로 입력' ? (
        <>
          <Textarea
            ref={textarea}
            onChange={handleChangeNameInput}
            value={nameList.join(' ')}
            rows={2}
            placeholder="이름을 띄어써서 입력해주세요"
          />
          <Chips list={nameList} />
        </>
      ) : null}
      <FixedBottomButton onClick={handleClickNextButton}>
        다음
      </FixedBottomButton>
    </div>
  );
};

export default NamePage;
