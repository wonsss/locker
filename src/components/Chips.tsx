import styled from '@emotion/styled';

import { colors } from 'constants/colors';

type ChipsProps = {
  list: string[];
};

export default function Chips({ list }: ChipsProps) {
  return (
    <Container>
      {list.map((name, index) => {
        return <Chip key={index}>{name}</Chip>;
      })}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

const Chip = styled.div`
  background-color: ${colors.grey500};
  color: ${colors.white};
  border-radius: 12px;
  padding: 5px;
  font-size: 18px;
`;
