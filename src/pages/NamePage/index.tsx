import { nameState } from 'globalStates/nameState';
import { ChangeEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import {
  Title,
  FixedBottomButton,
  Radio,
  Chips,
  Textarea,
  UnderLineInput,
  Spacing,
  Banner,
  Text,
} from 'components';

import { colors } from 'constants/colors';

const NamePage = () => {
  const [loadNameOption, setLoadNameOption] = useState('새로 입력');
  const [name, setName] = useRecoilState(nameState);

  const textarea = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();

  const handleClickNextButton = () => {
    navigate('/locker');
  };

  const handleChangeRadio = (e: ChangeEvent<HTMLInputElement>) => {
    setLoadNameOption(e.target.value);
  };

  const handleChangeNameTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const nameList = e.target.value.split(' ');
    setName((prev) => ({ title: prev.title, list: nameList }));
    if (textarea.current) {
      textarea.current.style.height = 'auto';
      textarea.current.style.height = textarea.current.scrollHeight + 'px';
    }
  };

  const handleChangeTitleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setName((prev) => ({ title: e.target.value, list: prev.list }));
  };

  return (
    <>
      <Title linkTo="/home">{`배정 대상`}</Title>
      <Radio value={loadNameOption} onChange={handleChangeRadio}>
        <Radio.Option value="새로 입력">새로 입력</Radio.Option>
        <Radio.Option value="불러오기">불러오기</Radio.Option>
      </Radio>
      <Spacing size={20} />
      {loadNameOption === '새로 입력' ? (
        <div>
          <UnderLineInput
            onChange={handleChangeTitleInput}
            value={name.title}
            placeholder="그룹명"
          />
          <Spacing size={20} />
          <Textarea
            ref={textarea}
            onChange={handleChangeNameTextarea}
            value={name.list.join(' ')}
            rows={2}
            placeholder="이름을 띄어써서 입력해주세요"
          />
          <Spacing size={20} />
          <Banner>
            <Text color={colors.grey300}>미리보기</Text>
            <Spacing size={10} />
            <Text>
              그룹명: {name.title}({name.list.length}명)
            </Text>
            <Spacing size={10} />
            <Chips list={name.list} />
          </Banner>
        </div>
      ) : null}
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
