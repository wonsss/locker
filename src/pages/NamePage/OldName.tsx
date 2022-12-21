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
  const setNameState = useSetRecoilState<Name>(nameState);

  const handleClickItemButton = (name: Name) => {
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
    setNameState(previewName);
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
            onClick={() => handleClickItemButton(name)}
            size="medium"
            isActive={previewName.id === name.id}
          >
            {name.title}
          </Button>
        ))}
      </div>
      <Spacing size={20} />
      {!previewName.title ? null : (
        <Banner>
          <Spacing size={10} />
          <div style={{ display: 'flex' }}>
            <Text color={colors.grey900} fontSize="27px" fontWeight="bold">
              {previewName.title}
            </Text>
            {previewName.list.length === 0 ? null : (
              <Text color={colors.teal200} fontSize="27px" fontWeight="bold">
                ({previewName.list.length})
              </Text>
            )}
            <Button
              style={{ marginLeft: '15px' }}
              onClick={handleDeleteButton}
              size="small"
            >
              삭제
            </Button>
          </div>
          <Spacing size={10} />
          <Text>생성시각: {previewName.createdAt}</Text>
          <Spacing size={10} />
          <Chips list={previewName.list} />
        </Banner>
      )}
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
