import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { colors } from 'constants/colors';

export default function Lockers({
  list,
  column,
}: {
  list: string[];
  column: number;
}) {
  return (
    <div>
      <LockerList column={column}>
        {list.map((item, index) => {
          return <Locker key={index}>{item}</Locker>;
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
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  list-style: none;
  font-size: 20px;
`;
