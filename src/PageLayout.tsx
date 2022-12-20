import { ReactNode } from 'react';

import styled from '@emotion/styled';

import { colors } from 'constants/colors';

export function PageLayout({ children }: { children: ReactNode }) {
  return <Wrapper>{children}</Wrapper>;
}

const Wrapper = styled.div`
  max-width: 100%;
  width: 100%;
  padding: 0 0 100px 0;
  margin: 0;
  height: auto;
  background: ${colors.white};
`;
