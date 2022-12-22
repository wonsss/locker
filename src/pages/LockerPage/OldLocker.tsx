import { defaultLocker, Locker, lockerState } from 'globalStates/lockerState';
import { nameState } from 'globalStates/nameState';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useRecoilState, useRecoilValue } from 'recoil';
import Storage from 'storage';

import useSetResult from 'pages/ResultPage/useSetResult';

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
  const currentName = useRecoilValue(nameState);

  const { setResult, resultId } = useSetResult({
    locker: currentLocker,
    name: currentName,
  });

  useEffect(() => {
    const initialLocker = lockerList?.length ? lockerList[0] : defaultLocker;
    setCurrentLocker(initialLocker);
  }, []);

  const handleClickItemButton = (locker: Locker) => {
    setCurrentLocker(locker);
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
    setResult();
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
            isActive={currentLocker.id === locker.id}
          >
            {locker.title}
          </Button>
        ))}
      </div>
      <Spacing size={20} />
      {!currentLocker.title ? null : (
        <Banner>
          <Spacing size={10} />
          <div style={{ display: 'flex' }}>
            <Text color={colors.grey900} fontSize="27px" fontWeight="bold">
              {currentLocker.title}
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
          <Text>생성시각: {currentLocker.createdAt}</Text>
          <Spacing size={20} />
          <div style={{ display: 'flex' }}>
            <NumberInput title="행" defaultValue={currentLocker.row} readOnly />
            <NumberInput
              title="열"
              defaultValue={currentLocker.column}
              readOnly
            />
          </div>
        </Banner>
      )}
      <FixedBottomButton
        onClick={handleClickNextButton}
        disabled={!currentLocker.title}
      >
        랜덤으로 배정하기
      </FixedBottomButton>
    </>
  );
}
