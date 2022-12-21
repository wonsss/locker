import { Name, nameState } from 'globalStates/nameState';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import Storage from 'storage';

import { Banner, Button, Chips, Spacing, Text } from 'components';

import { colors } from 'constants/colors';

const OldName = () => {
  const nameList = Storage.load('name') as Name[];
  const [name, setName] = useRecoilState<Name>(nameState);
  const [selectedNameIndex, setSelectedNameIndex] = useState(0);
  const handleClickNameButton = (name: Name, index: number) => {
    setName(name);
    setSelectedNameIndex(index);
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
        {nameList.map((name, index) => (
          <Button
            key={`${name.title}-${index}`}
            onClick={() => handleClickNameButton(name, index)}
            size="medium"
            isActive={selectedNameIndex === index}
          >
            {name.title}
          </Button>
        ))}
      </div>
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
    </>
  );
};

export default OldName;
