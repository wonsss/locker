import useNewName from './useNewName';

import {
  Chips,
  Textarea,
  UnderLineInput,
  Spacing,
  Banner,
  Text,
} from 'components';

import { colors } from 'constants/colors';

export default function NewName() {
  const { name, textarea, handleChangeNameTextarea, handleChangeTitleInput } =
    useNewName();

  return (
    <div>
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
        <Text>
          그룹명: {name.title}({name.list.length}명)
        </Text>
        <Spacing size={10} />
        <Chips list={name.list} />
      </Banner>
    </div>
  );
}
