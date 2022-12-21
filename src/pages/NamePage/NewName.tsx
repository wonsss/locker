import useNewName from './useNewName';
import { nameState } from 'globalStates/nameState';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
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
  const targetName = useRecoilValue(nameState);
  const { name, textarea, handleChangeNameTextarea, handleChangeTitleInput } =
    useNewName();

  const handleClickNextButton = () => {
    const nameId = uuidv4();
    const newTargetName = {
      ...targetName,
      id: nameId,
      createdAt: getNowDate(),
    };
    Storage.save('name', newTargetName);

    navigate('/locker');
  };

  return (
    <>
      <UnderLineInput
        onChange={handleChangeTitleInput}
        value={name.title}
        placeholder="그룹명"
        autoFocus
      />
      <Spacing size={20} />
      <Textarea
        ref={textarea}
        onChange={handleChangeNameTextarea}
        value={name.list.join(' ')}
        rows={2}
        placeholder="이름을 띄어써서 입력해주세요"
      />
      <Spacing size={20} />
      <Banner>
        <Text color={colors.grey300}>미리보기</Text>
        <Spacing size={10} />
        <div style={{ display: 'flex' }}>
          <Text color={colors.grey900} fontSize="27px" fontWeight="bold">
            {name.title}
          </Text>
          {name.list.length === 0 ? null : (
            <Text color={colors.teal200} fontSize="27px" fontWeight="bold">
              ({name.list.length})
            </Text>
          )}
        </div>
        <Spacing size={10} />
        <Spacing size={10} />
        <Chips list={name.list} />
      </Banner>
      <FixedBottomButton
        onClick={handleClickNextButton}
        disabled={!(targetName.list.length && targetName.title)}
      >
        다음
      </FixedBottomButton>
    </>
  );
}
