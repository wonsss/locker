import { lockerState } from 'globalStates/lockerState';
import { nameState } from 'globalStates/nameState';
import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import Storage from 'storage';
import { getNowDate } from 'utils/date';
import { getLockerNameList, setShuffledResult } from 'utils/locker';
import { v4 as uuidv4 } from 'uuid';

import {
  NumberInput,
  Lockers,
  Border,
  Text,
  UnderLineInput,
  FixedBottomButton,
  Spacing,
} from 'components';

import { colors } from 'constants/colors';

export default function NewLocker() {
  const navigate = useNavigate();

  const [message, setMessage] = useState('');
  const [currentLocker, setCurrentLocker] = useRecoilState(lockerState);
  const currentName = useRecoilValue(nameState);

  const nameInfo = currentName.title
    ? `${currentName.title} ${currentName.list.length}명을 위한 사물함 고르기`
    : '뒤로 가서 사물함을 배정할 그룹을 먼저 정해주세요';

  const lockerNameList = getLockerNameList(currentLocker);

  const handleChangeMatrixInput = (
    e: ChangeEvent<HTMLInputElement>,
    matrix: 'row' | 'column',
  ) => {
    const value = Number.isNaN(e.target.valueAsNumber)
      ? ''
      : Math.floor(e.target.valueAsNumber);

    if (value > 26 || value < 0) {
      setMessage('26 이하의 양의 정수를 입력해주세요');
      return;
    }

    if (matrix === 'column') {
      setCurrentLocker((prev) => ({ ...prev, column: value }));
      return;
    }
    if (matrix === 'row') {
      setCurrentLocker((prev) => ({ ...prev, row: value }));
      return;
    }
  };

  const handleChangeTitleInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setMessage('사물함의 이름을 입력해주세요');
    } else {
      setMessage('');
    }
    setCurrentLocker((prev) => ({ ...prev, title: e.target.value }));
  };

  const handleClickNextButton = () => {
    const lockerId = uuidv4();
    const newLocker = {
      ...currentLocker,
      id: lockerId,
      createdAt: getNowDate(),
    };
    Storage.save('locker', newLocker);

    const resultId = uuidv4();
    setShuffledResult({ resultId, name: currentName, locker: currentLocker });
    navigate(`/result/${resultId}`);
  };

  return (
    <>
      <Text
        color={colors.grey700}
        fontSize="18px"
        fontWeight="bold"
        marginLeft="30px"
      >
        {nameInfo}
      </Text>
      <Spacing size={20} />
      <div style={{ display: 'flex', alignItems: 'center', margin: '0 24px' }}>
        <NumberInput
          title="행"
          onChange={(e) => handleChangeMatrixInput(e, 'row')}
          value={currentLocker.row}
          autoFocus
        />
        <NumberInput
          title="열"
          onChange={(e) => handleChangeMatrixInput(e, 'column')}
          value={currentLocker.column}
        />
        <UnderLineInput
          onChange={handleChangeTitleInput}
          value={currentLocker.title}
          placeholder="사물함 이름"
        />
      </div>
      <div style={{ display: 'flex', margin: '12px 30px 0' }}>
        <Text color={colors.teal200} fontSize="15px">
          {message}
        </Text>
      </div>
      <Border size={20} />
      <Lockers
        column={Number(currentLocker.column)}
        lockerNameList={lockerNameList}
      />
      <FixedBottomButton
        onClick={handleClickNextButton}
        disabled={!(currentLocker.column && currentLocker.title)}
      >
        랜덤으로 배정하기
      </FixedBottomButton>
    </>
  );
}
