import useNewLocker from './useNewLocker';
import { useNavigate } from 'react-router-dom';
import Storage from 'storage';
import { getNowDate } from 'utils/date';
import { v4 as uuidv4 } from 'uuid';

import useSetResult from 'pages/ResultPage/useSetResult';

import {
  NumberInput,
  Lockers,
  Border,
  Text,
  UnderLineInput,
  FixedBottomButton,
} from 'components';

import { colors } from 'constants/colors';

export default function NewLocker() {
  const {
    message,
    locker,
    lockerList,
    handleChangeMatrixInput,
    handleChangeTitleInput,
  } = useNewLocker();
  const { setResult, resultId } = useSetResult();
  const navigate = useNavigate();

  const handleClickNextButton = () => {
    const lockerId = uuidv4();
    const newLocker = {
      ...locker,
      id: lockerId,
      createdAt: getNowDate(),
    };
    Storage.save('locker', newLocker);

    setResult();
    navigate(`/result/${resultId}`);
  };

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', margin: '0 24px' }}>
        <NumberInput
          title="행"
          onChange={(e) => handleChangeMatrixInput(e, 'row')}
          value={locker.row}
          autoFocus
        />
        <NumberInput
          title="열"
          onChange={(e) => handleChangeMatrixInput(e, 'column')}
          value={locker.column}
        />
        <UnderLineInput
          onChange={handleChangeTitleInput}
          value={locker.title}
          placeholder="사물함 이름"
        />
      </div>
      <div style={{ display: 'flex', margin: '12px 30px 0' }}>
        <Text color={colors.teal200} fontSize="15px">
          {message}
        </Text>
      </div>
      <Border size={20} />
      <Lockers column={Number(locker.column)} lockerList={lockerList} />
      <FixedBottomButton
        onClick={handleClickNextButton}
        disabled={!(locker.column && locker.title)}
      >
        랜덤으로 배정하기
      </FixedBottomButton>
    </>
  );
}
