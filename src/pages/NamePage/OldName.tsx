import { defaultName, Name, nameState } from 'globalStates/nameState';
import { useNavigate } from 'react-router';
import { useSetRecoilState } from 'recoil';

import { useLoadPreview } from 'hooks/useLoadPreview';

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
  const setNameState = useSetRecoilState<Name>(nameState);
  const {
    list: nameList,
    preview: previewName,
    handleClickItemButton,
    handleDeleteButton,
  } = useLoadPreview({
    key: 'name',
    defaultData: defaultName,
    setRecoilState: setNameState,
  });

  const navigate = useNavigate();

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
