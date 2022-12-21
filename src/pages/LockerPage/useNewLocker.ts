import { lockerState } from 'globalStates/lockerState';
import { nameState } from 'globalStates/nameState';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { divisor } from 'utils/math';

const useNewLocker = () => {
  const [message, setMessage] = useState('');
  const [locker, setLocker] = useRecoilState(lockerState);
  const name = useRecoilValue(nameState);

  useEffect(() => {
    if (!name.list.length) {
      return;
    }

    const division = divisor(name.list.length);
    const defaultColumn =
      name.list.length === 0 ? 4 : division[Math.floor(division.length / 2)];
    const defaultRow =
      name.list.length === 0 ? 3 : name.list.length / defaultColumn;
    setMessage(
      `선택하신 ${name.title} 그룹은 ${name.list.length}명이므로 ${defaultRow}행 ${defaultColumn}열의 사물함을 추천합니다.`,
    );
  }, [name]);

  const lockerList = useMemo(() => {
    let rowCount = 0;
    let columnCount = 0;

    return Array.from(
      { length: Number(locker.column) * Number(locker.row) },
      () => {
        if (columnCount >= locker.column) {
          columnCount = 0;
          rowCount++;
        }
        columnCount++;

        return `${String.fromCharCode(65 + rowCount)}${columnCount}`;
      },
    );
  }, [locker.column, locker.row]);

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
      setLocker((prev) => ({ ...prev, column: value }));
      console.log('칼럼', locker);
      return;
    }
    if (matrix === 'row') {
      setLocker((prev) => ({ ...prev, row: value }));
      console.log('로우', locker);

      return;
    }
  };

  const handleChangeTitleInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setMessage('사물함의 이름을 입력해주세요');
    } else {
      setMessage('');
    }
    setLocker((prev) => ({ ...prev, title: e.target.value }));
  };

  return {
    message,
    locker,
    lockerList,
    handleChangeMatrixInput,
    handleChangeTitleInput,
  };
};

export default useNewLocker;
