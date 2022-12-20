import { nameListState } from 'globalStates';
import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { divisor } from 'utils/math';

import {
  Title,
  FixedBottomButton,
  Radio,
  NumberInput,
  Lockers,
  Border,
  Spacing,
} from 'components';

const LockerPage = () => {
  const [option, setOption] = useState('새로 입력');
  const nameListLength = useRecoilValue(nameListState).length;
  const division = divisor(nameListLength);
  const defaultColumn = division[Math.floor(division.length / 2)];
  const defaultRow = nameListLength / defaultColumn;

  const [column, setColumn] = useState(defaultColumn);
  const [row, setRow] = useState(defaultRow);

  const navigate = useNavigate();

  const handleClickNextButton = () => {
    navigate('/locker');
  };

  const handleChangeRadio = (e: ChangeEvent<HTMLInputElement>) => {
    setOption(e.target.value);
  };

  const handleChangeColumnInput = (e: ChangeEvent<HTMLInputElement>) => {
    setColumn(e.target.valueAsNumber);
  };

  const handleChangeRowInput = (e: ChangeEvent<HTMLInputElement>) => {
    setRow(e.target.valueAsNumber);
  };

  let rowCount = 0;
  let columnCount = 0;
  const emptyList = Array.from({ length: column * row }, () => {
    if (columnCount >= column) {
      columnCount = 0;
      rowCount++;
    }
    columnCount++;

    return `${String.fromCharCode(65 + rowCount)}${columnCount}`;
  });

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
              value={column}
            />
            <NumberInput
              title="세로"
              onChange={handleChangeRowInput}
              value={row}
            />
          </div>
          <Border size={20} />
          <Lockers column={column} list={emptyList} />
        </>
      ) : null}
      <FixedBottomButton onClick={handleClickNextButton} disabled={!column}>
        다음
      </FixedBottomButton>
    </>
  );
};

export default LockerPage;
