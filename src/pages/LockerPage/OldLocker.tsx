import { defaultLocker, Locker, lockerState } from 'globalStates/lockerState';
import { nameState } from 'globalStates/nameState';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useRecoilState, useRecoilValue } from 'recoil';
import Storage from 'storage';
import { setShuffledResult } from 'utils/locker';
import { v4 as uuidv4 } from 'uuid';

import {
  Banner,
  Button,
  FixedBottomButton,
  NumberInput,
  Spacing,
  Text,
} from 'components';

import { colors } from 'constants/colors';

export default function OldLocker() {
  const navigate = useNavigate();

  const lockerListFromStorage = Storage.load('locker');
  const [lockerList, setLockerList] = useState<Locker[] | undefined>(
    lockerListFromStorage,
  );

  const [currentLocker, setCurrentLocker] = useRecoilState<Locker>(lockerState);

  const initialLocker = lockerList?.length ? lockerList[0] : defaultLocker;
  const [previewLocker, setPreviewLocker] = useState<Locker>(initialLocker);

  const currentName = useRecoilValue(nameState);

  const handleClickItemButton = (locker: Locker) => {
    setPreviewLocker(locker);
  };

  const handleDeleteButton = () => {
    if (!lockerList) {
      return;
    }

    const filteredList = lockerList.filter(({ id }) => id !== currentLocker.id);
    setLockerList(filteredList);
    setCurrentLocker(filteredList.length ? filteredList[0] : defaultLocker);

    localStorage.setItem('locker', JSON.stringify(filteredList));
  };

  const handleClickNextButton = () => {
    const resultId = uuidv4();

    setShuffledResult({ resultId, name: currentName, locker: previewLocker });

    navigate(`/result/${resultId}`);
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
        {lockerList?.map((locker) => (
          <Button
            key={locker.id}
            onClick={() => handleClickItemButton(locker)}
            size="medium"
            isActive={previewLocker.id === locker.id}
          >
            {locker.title}
          </Button>
        ))}
      </div>
      <Spacing size={20} />
      {!previewLocker.title ? null : (
        <Banner>
          <Spacing size={10} />
          <div style={{ display: 'flex' }}>
            <Text color={colors.grey900} fontSize="27px" fontWeight="bold">
              {previewLocker.title}
            </Text>

            <Button
              style={{ marginLeft: '15px' }}
              onClick={handleDeleteButton}
              size="small"
              color={colors.teal200}
            >
              삭제
            </Button>
          </div>
          <Spacing size={10} />
          <Text>생성시각: {previewLocker.createdAt}</Text>
          <Spacing size={20} />
          <div style={{ display: 'flex' }}>
            <NumberInput title="행" value={previewLocker.row} readOnly />
            <NumberInput title="열" value={previewLocker.column} readOnly />
          </div>
        </Banner>
      )}
      <FixedBottomButton
        onClick={handleClickNextButton}
        disabled={!previewLocker.title}
      >
        랜덤으로 배정하기
      </FixedBottomButton>
    </>
  );
}
