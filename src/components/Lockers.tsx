import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { colors } from 'constants/colors';

export default function Lockers({
  nameList,
  lockerList,
  column,
}: {
  nameList?: string[];
  lockerList: string[];
  column: number;
}) {
  return (
    <div>
      <LockerList column={column}>
        {lockerList.map((lockerName, index) => {
          return (
            <Locker key={index}>
              <div>{nameList?.length && nameList[index]}</div>
              <LockerName>{lockerName}</LockerName>
            </Locker>
          );
        })}
      </LockerList>
    </div>
  );
}

const LockerList = styled.ul<{ column: number }>`
  ${({ column }) => css`
    display: grid;
    grid-template-columns: repeat(${column}, minmax(30px, 80px));
    gap: 10px;
    padding: 0;
    border: none;
    margin: 0 24px;
  `}
`;

const Locker = styled.li`
  background-color: ${colors.grey100};
  color: ${colors.grey900};
  font-weight: 800;
  border-radius: 14px;
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  list-style: none;
  font-size: 20px;
`;

const LockerName = styled.div`
  font-size: 14px;
  color: ${colors.grey300};
  font-weight: normal;
`;
