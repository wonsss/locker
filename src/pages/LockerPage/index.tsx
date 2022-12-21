import { lockerState } from 'globalStates/lockerState';
import { nameState } from 'globalStates/nameState';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
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
  UnderLineInput,
} from 'components';

import { colors } from 'constants/colors';

const LockerPage = () => {
  const navigate = useNavigate();
  const [option, setOption] = useState('새로 입력');
  const [warning, setWarning] = useState('');
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

  const handleClickNextButton = () => {
    navigate('/locker');
  };

  const handleChangeRadio = (e: ChangeEvent<HTMLInputElement>) => {
    setOption(e.target.value);
  };

  const handleChangeColumnInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number.isNaN(e.target.valueAsNumber)
      ? ''
      : Math.floor(e.target.valueAsNumber);
    if (value > 30 || value < 0) {
      setWarning('30 이하의 양의 정수를 입력해주세요');
      return;
    }
    setWarning('');
    setLocker((prev) => ({ ...prev, column: value }));
  };

  const handleChangeRowInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number.isNaN(e.target.valueAsNumber)
      ? ''
      : Math.floor(e.target.valueAsNumber);
    if (value > 26 || value < 0) {
      setWarning('26 이하의 양의 정수를 입력해주세요');
      return;
    }
    setWarning('');
    setLocker((prev) => ({ ...prev, row: value }));
  };

  const lockerNameList = useMemo(() => {
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

  const handleChangeTitleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setLocker((prev) => ({ ...prev, title: e.target.value }));
  };

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
          <div
            style={{ display: 'flex', alignItems: 'center', margin: '0 24px' }}
          >
            <NumberInput
              title="행"
              onChange={handleChangeRowInput}
              value={locker.row}
            />
            <NumberInput
              title="열"
              onChange={handleChangeColumnInput}
              value={locker.column}
            />
            <UnderLineInput
              onChange={handleChangeTitleInput}
              value={locker.title}
              placeholder="사물함 이름"
            />
          </div>
          <div style={{ display: 'flex', margin: '12px 30px 0' }}>
            <Text color={colors.red200} fontSize="15px">
              {warning}
            </Text>
          </div>
          <Border size={20} />
          <Lockers
            column={Number(locker.column)}
            lockerNameList={lockerNameList}
          />
        </>
      ) : null}
      <FixedBottomButton
        onClick={handleClickNextButton}
        disabled={!(locker.column && locker.title)}
      >
        다음
      </FixedBottomButton>
    </>
  );
};

export default LockerPage;
