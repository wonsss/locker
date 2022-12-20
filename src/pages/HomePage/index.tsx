import { useNavigate } from 'react-router-dom';

import { Border, Spacing, Title } from 'components';
import FixedBottomButton from 'components/FixedBottomButton';

const HomePage = () => {
  const navigate = useNavigate();
  const handleClickStartButton = () => {
    navigate('/name');
  };

  return (
    <>
      <Spacing size={30} />
      <Title>사물함 배정</Title>
      <Border size={20} />
      <FixedBottomButton onClick={handleClickStartButton}>
        새로 배정하기
      </FixedBottomButton>
    </>
  );
};

export default HomePage;
