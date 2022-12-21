import { PropsWithChildren } from 'react';

import styled from '@emotion/styled';

import { colors } from 'constants/colors';

export default function Banner({ children }: PropsWithChildren) {
  return <Wrapper>{children}</Wrapper>;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.grey100};
  border-radius: 20px;
  padding: 24px;
  margin: 0 24px;
`;
