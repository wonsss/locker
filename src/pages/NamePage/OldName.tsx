import { defaultName, Name, nameState } from 'globalStates/nameState';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import Storage from 'storage';

import {
  Banner,
  Button,
  Chips,
  FixedBottomButton,
  Spacing,
  Text,
} from 'components';

import { colors } from 'constants/colors';

const OldName = () => {
  const nameListFromStorage = Storage.load('name');
  const [nameList, setNameList] = useState<Name[] | undefined>(
    nameListFromStorage,
  );
  const [previewName, setPreviewName] = useState<Name>(
    nameList?.length ? nameList[0] : defaultName,
  );
  const setTargetName = useSetRecoilState<Name>(nameState);

  const handleClickNameButton = (name: Name) => {
    setPreviewName(name);
  };

  const handleDeleteButton = () => {
    if (!nameList) {
      return;
    }

    const filteredNameList = nameList.filter(({ id }) => id !== previewName.id);
    setNameList(filteredNameList);
    setPreviewName(filteredNameList.length ? filteredNameList[0] : defaultName);

    localStorage.setItem('name', JSON.stringify(filteredNameList));
  };

  const navigate = useNavigate();

  const handleClickNextButton = () => {
    setTargetName(previewName);
    navigate('/locker');
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          margin: '0 24px',
        }}
      >
        {nameList?.map((name) => (
          <Button
            key={name.id}
            onClick={() => handleClickNameButton(name)}
            size="medium"
            isActive={previewName.id === name.id}
          >
            {name.title}
          </Button>
        ))}
      </div>
      <Spacing size={20} />
      <Banner>
        <Button onClick={handleDeleteButton} size="small">
          삭제
        </Button>
        <Spacing size={10} />
        <Text color={colors.grey300}>미리보기</Text>
        <Spacing size={10} />
        <Text>
          그룹명: {previewName.title}({previewName.list.length}명)
        </Text>
        <Spacing size={10} />
        <Chips list={previewName.list} />
      </Banner>
      <FixedBottomButton
        onClick={handleClickNextButton}
        disabled={!previewName.title}
      >
        다음
      </FixedBottomButton>
    </>
  );
};

export default OldName;
