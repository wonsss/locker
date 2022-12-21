import { defaultLocker, Locker, lockerState } from 'globalStates/lockerState';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import Storage from 'storage';

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
  const lockerListFromStorage = Storage.load('locker');
  const [lockerList, setLockerList] = useState<Locker[] | undefined>(
    lockerListFromStorage,
  );
  const [previewLocker, setPreviewLocker] = useState<Locker>(
    lockerList?.length ? lockerList[0] : defaultLocker,
  );
  const setLockerState = useSetRecoilState<Locker>(lockerState);

  const handleClickItemButton = (locker: Locker) => {
    setPreviewLocker(locker);
  };

  const handleDeleteButton = () => {
    if (!lockerList) {
      return;
    }

    const filteredLockerList = lockerList.filter(
      ({ id }) => id !== previewLocker.id,
    );
    setLockerList(filteredLockerList);
    setPreviewLocker(
      filteredLockerList.length ? filteredLockerList[0] : defaultLocker,
    );

    localStorage.setItem('locker', JSON.stringify(filteredLockerList));
  };

  const navigate = useNavigate();

  const handleClickNextButton = () => {
    setLockerState(previewLocker);
    navigate('/result');
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
            >
              삭제
            </Button>
          </div>
          <Spacing size={10} />
          <Text>생성시각: {previewLocker.createdAt}</Text>
          <Spacing size={20} />
          <div style={{ display: 'flex' }}>
            <NumberInput title="행" value={previewLocker.row} />
            <NumberInput title="열" value={previewLocker.column} />
          </div>
        </Banner>
      )}
      <FixedBottomButton
        onClick={handleClickNextButton}
        disabled={!previewLocker.title}
      >
        다음
      </FixedBottomButton>
    </>
  );
}
