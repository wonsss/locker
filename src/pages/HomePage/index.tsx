import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Storage from 'storage';

import { Result } from 'pages/ResultPage';

import { Border, Spacing, FixedBottomButton, Button, Text } from 'components';

import { colors } from 'constants/colors';

const HomePage = () => {
  const navigate = useNavigate();
  const handleClickStartButton = () => {
    navigate('/name');
  };
  const resultListFromStorage = Storage.load('result') as Result[];
  const [resultList, setResultList] = useState<Result[] | undefined>(
    resultListFromStorage,
  );

  const handleClickResultButton = (result: Result) => {
    navigate(`/result/${result.id}`);
  };

  const handleClickDeleteButton = (targetId: string) => {
    if (!resultList) {
      return;
    }

    const filteredList = resultList.filter(({ id }) => id !== targetId);
    setResultList(filteredList);

    localStorage.setItem('result', JSON.stringify(filteredList));
  };

  return (
    <>
      <Spacing size={30} />
      <div
        style={{
          margin: '0 24px',
        }}
      >
        <Text color={colors.grey900} fontSize="27px" fontWeight="bold">
          사물함 배정
        </Text>
      </div>
      <Border size={20} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          // flexWrap: 'wrap',
          gap: '10px',
          margin: '0 24px',
        }}
      >
        {resultList?.map((result) => (
          <div
            key={result.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: '10px',
              }}
            >
              <Text color={colors.grey400}>{result.createdAt}</Text>
              <Text fontWeight="bold">{result.title}</Text>
            </div>
            <div
              style={{
                display: 'flex',
                gap: '10px',
              }}
            >
              <Button
                onClick={() => handleClickResultButton(result)}
                size="small"
                color={colors.teal300}
              >
                보기
              </Button>
              <Button
                onClick={() => handleClickDeleteButton(result.id)}
                size="small"
                color={colors.teal200}
              >
                삭제
              </Button>
            </div>
          </div>
        ))}
      </div>
      <FixedBottomButton onClick={handleClickStartButton} disabled={false}>
        새로 배정하기
      </FixedBottomButton>
    </>
  );
};

export default HomePage;
