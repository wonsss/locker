import { lockerState } from 'globalStates/lockerState';
import { nameState } from 'globalStates/nameState';
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import Storage from 'storage';
import { getNowDate } from 'utils/date';
import { getLockerNameList } from 'utils/locker';
import { divisor } from 'utils/math';
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
  const navigate = useNavigate();

  const [message, setMessage] = useState('');
  const [currentLocker, setCurrentLocker] = useRecoilState(lockerState);
  const currentName = useRecoilValue(nameState);

  const { setResult, resultId } = useSetResult({
    locker: currentLocker,
    name: currentName,
  });

  const lockerNameList = getLockerNameList(currentLocker);

  useEffect(() => {
    if (!currentName.list.length) {
      return;
    }

    const division = divisor(currentName.list.length);
    const defaultColumn =
      currentName.list.length === 0
        ? 4
        : division[Math.floor(division.length / 2)];
    const defaultRow =
      currentName.list.length === 0
        ? 3
        : currentName.list.length / defaultColumn;
    setMessage(
      `선택하신 ${currentName.title} 그룹은 ${currentName.list.length}명이므로 ${defaultRow}행 ${defaultColumn}열의 사물함을 추천합니다.`,
    );
  }, [currentName]);

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
    if (value === '' || value === 0) {
      setMessage('26 이하의 양의 정수를 입력해주세요');
    } else {
      setMessage('');
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
    setResult();
    navigate(`/result/${resultId}`);
  };

  return (
    <>
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
