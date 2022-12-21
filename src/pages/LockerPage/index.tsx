import { lockerState } from 'globalStates/lockerState';
import { nameState } from 'globalStates/nameState';
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { divisor } from 'utils/math';

import {
  Title,
  FixedBottomButton,
  Radio,
  NumberInput,
  Lockers,
  Border,
  Spacing,
  Text,
} from 'components';

import { colors } from 'constants/colors';

const LockerPage = () => {
  const navigate = useNavigate();
  const [option, setOption] = useState('새로 입력');
  const [warning, setWarning] = useState('');
  const [locker, setLocker] = useRecoilState(lockerState);
  const nameListLength = useRecoilValue(nameState).list.length;

  const division = divisor(nameListLength);
  const defaultColumn = division[Math.floor(division.length / 2)];
  const defaultRow = nameListLength / defaultColumn;

  useEffect(() => {
    setLocker((prev) => ({ ...prev, column: defaultColumn, row: defaultRow }));
  }, []);

  const handleClickNextButton = () => {
    navigate('/locker');
  };

  const handleChangeRadio = (e: ChangeEvent<HTMLInputElement>) => {
    setOption(e.target.value);
  };

  const handleChangeColumnInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Math.floor(e.target.valueAsNumber);
    if (value > 30 || value < 0) {
      setWarning('30 이하의 양의 정수를 입력해주세요');
      return;
    }
    setWarning('');
    setLocker((prev) => ({ ...prev, column: value }));
  };

  const handleChangeRowInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Math.floor(e.target.valueAsNumber);
    if (value > 26 || value < 0) {
      setWarning('26 이하의 양의 정수를 입력해주세요');
      return;
    }
    setWarning('');
    setLocker((prev) => ({ ...prev, row: value }));
  };

  let rowCount = 0;
  let columnCount = 0;
  const lockerNameList = Array.from(
    { length: locker.column * locker.row },
    () => {
      if (columnCount >= locker.column) {
        columnCount = 0;
        rowCount++;
      }
      columnCount++;

      return `${String.fromCharCode(65 + rowCount)}${columnCount}`;
    },
  );

  return (
    <>
      <Title linkTo="/name">{`사물함 종류`}</Title>
      <Radio value={option} onChange={handleChangeRadio}>
        <Radio.Option value="새로 입력">새로 입력</Radio.Option>
        <Radio.Option value="불러오기">불러오기</Radio.Option>
      </Radio>
      <Spacing size={20} />
      {option === '새로 입력' ? (
        <>
          <div style={{ display: 'flex', margin: '0 24px' }}>
            <NumberInput
              title="가로"
              onChange={handleChangeColumnInput}
              value={locker.column}
            />
            <NumberInput
              title="세로"
              onChange={handleChangeRowInput}
              value={locker.row}
            />
          </div>
          <div style={{ display: 'flex', margin: '12px 30px 0' }}>
            <Text color={colors.red200} fontSize="15px">
              {warning}
            </Text>
          </div>
          <Border size={20} />
          <Lockers column={locker.column} lockerNameList={lockerNameList} />
        </>
      ) : null}
      <FixedBottomButton
        onClick={handleClickNextButton}
        disabled={!locker.column}
      >
        다음
      </FixedBottomButton>
    </>
  );
};

export default LockerPage;
