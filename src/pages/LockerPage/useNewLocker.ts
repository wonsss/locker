import { lockerState } from 'globalStates/lockerState';
import { nameState } from 'globalStates/nameState';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { divisor } from 'utils/math';

const useNewLocker = () => {
  const [warning, setWarning] = useState('사물함의 이름을 입력해주세요');
  const [locker, setLocker] = useRecoilState(lockerState);
  const nameListLength = useRecoilValue(nameState).list.length;

  useEffect(() => {
    const division = divisor(nameListLength);
    const defaultColumn =
      nameListLength === 0 ? 4 : division[Math.floor(division.length / 2)];
    const defaultRow =
      nameListLength === 0 ? 3 : nameListLength / defaultColumn;
    setLocker((prev) => ({ ...prev, column: defaultColumn, row: defaultRow }));
  }, [nameListLength]);

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
      setWarning('26 이하의 양의 정수를 입력해주세요');
      return;
    }
    if (value === '' || value === 0) {
      setWarning('26 이하의 양의 정수를 입력해주세요');
    } else {
      setWarning('');
    }

    if (matrix === 'column') {
      setLocker((prev) => ({ ...prev, column: value }));
      return;
    }
    if (matrix === 'row') {
      setLocker((prev) => ({ ...prev, row: value }));
      return;
    }
  };

  const handleChangeTitleInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setWarning('사물함의 이름을 입력해주세요');
    } else {
      setWarning('');
    }
    setLocker((prev) => ({ ...prev, title: e.target.value }));
  };

  return {
    warning,
    locker,
    lockerList,
    handleChangeMatrixInput,
    handleChangeTitleInput,
  };
};

export default useNewLocker;
