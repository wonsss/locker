import { defaultName, Name, nameState } from 'globalStates/nameState';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useRecoilState } from 'recoil';
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
  const navigate = useNavigate();

  const nameListFromStorage = Storage.load('name');
  const [nameList, setNameList] = useState<Name[] | undefined>(
    nameListFromStorage,
  );

  const [currentName, setCurrentName] = useRecoilState<Name>(nameState);

  useEffect(() => {
    const initialName = nameList?.length ? nameList[0] : defaultName;
    setCurrentName(initialName);
  }, []);

  const handleClickItemButton = (name: Name) => {
    setCurrentName(name);
  };

  const handleDeleteButton = () => {
    if (!nameList) {
      return;
    }

    const filteredList = nameList.filter(({ id }) => id !== currentName.id);
    setNameList(filteredList);
    setCurrentName(filteredList.length ? filteredList[0] : defaultName);

    localStorage.setItem('name', JSON.stringify(filteredList));
  };

  const handleClickNextButton = () => {
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
            isActive={currentName.id === name.id}
          >
            {name.title}
          </Button>
        ))}
      </div>
      <Spacing size={20} />
      {!currentName.title ? null : (
        <Banner>
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
            <Button
              style={{ marginLeft: '15px' }}
              onClick={handleDeleteButton}
              size="small"
            >
              삭제
            </Button>
          </div>
          <Spacing size={10} />
          <Text>생성시각: {currentName.createdAt}</Text>
          <Spacing size={10} />
          <Chips list={currentName.list} />
        </Banner>
      )}
      <FixedBottomButton
        onClick={handleClickNextButton}
        disabled={!currentName.title}
      >
        다음
      </FixedBottomButton>
    </>
  );
};

export default OldName;
