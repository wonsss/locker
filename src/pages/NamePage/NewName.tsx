import { nameState } from 'globalStates/nameState';
import { ChangeEvent, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import Storage from 'storage';
import { getNowDate } from 'utils/date';
import { v4 as uuidv4 } from 'uuid';

import {
  Chips,
  Textarea,
  UnderLineInput,
  Spacing,
  Banner,
  Text,
  FixedBottomButton,
} from 'components';

import { colors } from 'constants/colors';

export default function NewName() {
  const navigate = useNavigate();

  const [currentName, setCurrentName] = useRecoilState(nameState);
  const textarea = useRef<HTMLTextAreaElement>(null);

  const handleChangeNameTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const nameList = e.target.value.split(' ');
    setCurrentName((prev) => ({ ...prev, list: nameList }));
    if (textarea.current) {
      textarea.current.style.height = 'auto';
      textarea.current.style.height = textarea.current.scrollHeight + 'px';
    }
  };

  const handleChangeTitleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentName((prev) => ({ ...prev, title: e.target.value }));
  };

  const handleClickNextButton = () => {
    const nameId = uuidv4();
    const newName = {
      ...currentName,
      id: nameId,
      createdAt: getNowDate(),
    };
    Storage.save('name', newName);

    navigate('/locker');
  };

  return (
    <>
      <UnderLineInput
        onChange={handleChangeTitleInput}
        value={currentName.title}
        placeholder="그룹명"
        autoFocus
      />
      <Spacing size={20} />
      <Textarea
        ref={textarea}
        onChange={handleChangeNameTextarea}
        value={currentName.list.join(' ')}
        rows={2}
        placeholder="이름을 띄어써서 입력해주세요"
      />
      <Spacing size={20} />
      <Banner>
        <Text color={colors.grey300}>미리보기</Text>
        <Spacing size={10} />
        <div style={{ display: 'flex' }}>
          <Text color={colors.grey900} fontSize="27px" fontWeight="bold">
            {currentName.title}
          </Text>
          {currentName.list.length === 0 ? null : (
            <Text color={colors.teal200} fontSize="27px" fontWeight="bold">
              ({currentName.list.length})
            </Text>
          )}
        </div>
        <Spacing size={10} />
        <Spacing size={10} />
        <Chips list={currentName.list} />
      </Banner>
      <FixedBottomButton
        onClick={handleClickNextButton}
        disabled={!(currentName.list.length && currentName.title)}
      >
        다음
      </FixedBottomButton>
    </>
  );
}
