import { defaultLocker, Locker, lockerState } from 'globalStates/lockerState';
import { nameState } from 'globalStates/nameState';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useRecoilValue, useSetRecoilState } from 'recoil';
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

  const setLockerState = useSetRecoilState<Locker>(lockerState);

  const lockerListFromStorage = Storage.load('locker');
  const [lockerList, setLockerList] = useState<Locker[] | undefined>(
    lockerListFromStorage,
  );

  const [previewLocker, setPreviewLocker] = useState(
    lockerList?.length ? lockerList[0] : defaultLocker,
  );

  useEffect(() => {
    setLockerState(previewLocker);
  }, []);

  const handleClickItemButton = (locker: Locker) => {
    setPreviewLocker(locker);
  };

  const handleDeleteButton = () => {
    if (!lockerList) {
      return;
    }

    const filteredList = lockerList.filter(({ id }) => id !== previewLocker.id);
    setLockerList(filteredList);
    setPreviewLocker(filteredList.length ? filteredList[0] : defaultLocker);

    localStorage.setItem('locker', JSON.stringify(filteredList));
  };

  const locker = useRecoilValue(lockerState);
  const name = useRecoilValue(nameState);

  const { setResult, resultId } = useSetResult({
    locker,
    name,
  });

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
            <NumberInput title="행" defaultValue={previewLocker.row} readOnly />
            <NumberInput
              title="열"
              defaultValue={previewLocker.column}
              readOnly
            />
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
