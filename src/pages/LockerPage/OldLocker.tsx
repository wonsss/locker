import { defaultLocker, Locker, lockerState } from 'globalStates/lockerState';
import { useSetRecoilState } from 'recoil';

import { useLoadPreview } from 'hooks/useLoadPreview';

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
  const setLockerState = useSetRecoilState<Locker>(lockerState);
  const {
    list: lockerList,
    preview: previewLocker,
    handleClickItemButton,
    handleDeleteButton,
    handleClickNextButton,
  } = useLoadPreview({
    key: 'locker',
    defaultData: defaultLocker,
    nextPath: '/result',
    setRecoilState: setLockerState,
  });

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
            <NumberInput title="행" defaultValue={previewLocker.row} />
            <NumberInput title="열" defaultValue={previewLocker.column} />
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
